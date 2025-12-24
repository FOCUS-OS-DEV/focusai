import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

// n8n webhook URL from the original HTML
const N8N_WEBHOOK_URL = 'https://focus2025.app.n8n.cloud/webhook/73743602-8af3-42d1-90fe-503bd60bf68e'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form fields
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const company = formData.get('company') as string
    const role = formData.get('role') as string
    const track = formData.get('track') as string
    const message = formData.get('message') as string
    const source = formData.get('source') as string || 'website'
    const formType = formData.get('formType') as string || 'full-form'

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, phone' },
        { status: 400 }
      )
    }

    // Save to Payload Contacts collection
    try {
      const payload = await getPayload({ config })

      // Build message with additional info
      const fullMessage = [
        message || '',
        role ? `תפקיד: ${role}` : null,
        track ? `מסלול מועדף: ${track}` : null,
        formType ? `סוג טופס: ${formType}` : null,
      ].filter(Boolean).join('\n') || undefined

      await payload.create({
        collection: 'contacts',
        data: {
          name,
          email,
          phone,
          company: company || undefined,
          message: fullMessage,
          source,
        },
      })
    } catch (payloadError) {
      console.error('Error saving to Payload:', payloadError)
      // Continue even if Payload save fails - we'll still forward to n8n
    }

    // Forward to n8n webhook
    try {
      const webhookFormData = new FormData()
      webhookFormData.append('name', name)
      webhookFormData.append('email', email)
      webhookFormData.append('phone', phone)
      webhookFormData.append('track', track || '')
      webhookFormData.append('company', company || '')
      webhookFormData.append('role', role || '')
      webhookFormData.append('message', message || '')
      webhookFormData.append('source', source)
      webhookFormData.append('formType', formType)
      webhookFormData.append('timestamp', new Date().toISOString())

      await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        body: webhookFormData,
      })
    } catch (webhookError) {
      console.error('Error forwarding to n8n:', webhookError)
      // Continue even if webhook fails
    }

    // Redirect to thank you page
    // Get the proper origin from headers (handles proxy scenarios like Railway)
    const forwardedHost = request.headers.get('x-forwarded-host')
    const forwardedProto = request.headers.get('x-forwarded-proto') || 'https'
    const host = forwardedHost || request.headers.get('host') || 'localhost:3000'
    const origin = `${forwardedProto}://${host}`

    const thankYouUrl = new URL('/thank-you', origin)
    thankYouUrl.searchParams.set('name', name)
    thankYouUrl.searchParams.set('source', source)

    return NextResponse.redirect(thankYouUrl, { status: 303 })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Also support JSON requests for AJAX submissions
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
