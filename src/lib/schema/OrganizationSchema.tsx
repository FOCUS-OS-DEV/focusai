import Script from 'next/script'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://focusai.co.il'

interface OrganizationSchemaProps {
  name?: string
  description?: string
  logo?: string
  phone?: string
  email?: string
  address?: {
    street?: string
    city?: string
    country?: string
  }
  socialLinks?: {
    facebook?: string
    instagram?: string
    linkedin?: string
    youtube?: string
  }
}

export function OrganizationSchema({
  name = 'Focus AI Academy',
  description = 'האקדמיה המובילה בישראל להכשרות בינה מלאכותית',
  logo = `${BASE_URL}/logo.png`,
  phone = '+972-54-123-4567',
  email = 'info@focusai.co.il',
  address = {
    street: 'אריה שנקר 14',
    city: 'הרצליה פיתוח',
    country: 'IL',
  },
  socialLinks = {},
}: OrganizationSchemaProps) {
  const sameAs = [
    socialLinks.facebook,
    socialLinks.instagram,
    socialLinks.linkedin,
    socialLinks.youtube,
  ].filter(Boolean)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name,
    description,
    url: BASE_URL,
    logo,
    telephone: phone,
    email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      addressCountry: address.country,
    },
    ...(sameAs.length > 0 && { sameAs }),
    areaServed: {
      '@type': 'Country',
      name: 'Israel',
    },
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'AI Training',
      'Business Automation',
      'ChatGPT',
      'AI Tools',
    ],
  }

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
