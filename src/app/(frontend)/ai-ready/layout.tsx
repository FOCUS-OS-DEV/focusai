import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import Script from 'next/script'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'AI Ready - הכשרה מקצועית לשימוש בכלי AI | Focus AI',
  description: 'הכשרה ייחודית בת 8 מפגשים להטמעת AI בעבודה היומיומית. למדו את הכלים המתקדמים ביותר מהמומחים המובילים בישראל.',
}

// Generate Meta Pixel script
function getMetaPixelScript(pixelId: string) {
  return `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${pixelId}');
    fbq('track', 'PageView');
  `
}

// Generate TikTok Pixel script
function getTikTokPixelScript(pixelId: string) {
  return `
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
      ttq.load('${pixelId}');
      ttq.page();
    }(window, document, 'ttq');
  `
}

// Generate Google Analytics script
function getGoogleAnalyticsScript(measurementId: string) {
  return `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}');
  `
}

export default async function AIReadyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch site settings for scripts
  let siteSettings: any = null
  try {
    const payload = await getPayload({ config })
    siteSettings = await payload.findGlobal({ slug: 'site-settings' })
  } catch (e) {
    console.error('Failed to fetch site settings:', e)
  }

  const tracking = siteSettings?.tracking || {}
  const scripts = siteSettings?.scripts || {}
  const pixels = siteSettings?.pixels || []

  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

        {/* Custom head scripts from CMS */}
        {scripts.headScripts && (
          <div dangerouslySetInnerHTML={{ __html: scripts.headScripts }} />
        )}

        {/* Meta Pixel from tracking field */}
        {tracking.metaPixel && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {getMetaPixelScript(tracking.metaPixel)}
          </Script>
        )}

        {/* TikTok Pixel from tracking field */}
        {tracking.tiktokPixel && (
          <Script id="tiktok-pixel" strategy="afterInteractive">
            {getTikTokPixelScript(tracking.tiktokPixel)}
          </Script>
        )}

        {/* Google Analytics from tracking field */}
        {tracking.googleAnalytics && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${tracking.googleAnalytics}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {getGoogleAnalyticsScript(tracking.googleAnalytics)}
            </Script>
          </>
        )}

        {/* Structured pixels from array */}
        {pixels
          .filter((p: any) => p.enabled)
          .map((pixel: any, index: number) => {
            if (pixel.platform === 'meta' && pixel.pixelId) {
              return (
                <Script key={`pixel-${index}`} id={`meta-pixel-${index}`} strategy="afterInteractive">
                  {getMetaPixelScript(pixel.pixelId)}
                </Script>
              )
            }
            if (pixel.platform === 'tiktok' && pixel.pixelId) {
              return (
                <Script key={`pixel-${index}`} id={`tiktok-pixel-${index}`} strategy="afterInteractive">
                  {getTikTokPixelScript(pixel.pixelId)}
                </Script>
              )
            }
            if (pixel.platform === 'google' && pixel.pixelId) {
              return (
                <React.Fragment key={`pixel-${index}`}>
                  <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${pixel.pixelId}`}
                    strategy="afterInteractive"
                  />
                  <Script id={`ga-${index}`} strategy="afterInteractive">
                    {getGoogleAnalyticsScript(pixel.pixelId)}
                  </Script>
                </React.Fragment>
              )
            }
            if (pixel.platform === 'custom' && pixel.customScript) {
              return (
                <Script key={`pixel-${index}`} id={`custom-pixel-${index}`} strategy="afterInteractive">
                  {pixel.customScript}
                </Script>
              )
            }
            return null
          })}

        {/* Meta Pixel noscript fallback */}
        {tracking.metaPixel && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${tracking.metaPixel}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}
      </head>
      <body className="bg-white text-gray-900 font-heebo antialiased">
        {/* Body start scripts from CMS */}
        {scripts.bodyStartScripts && (
          <div dangerouslySetInnerHTML={{ __html: scripts.bodyStartScripts }} />
        )}

        {children}

        {/* Footer scripts from CMS */}
        {scripts.footerScripts && (
          <div dangerouslySetInnerHTML={{ __html: scripts.footerScripts }} />
        )}
      </body>
    </html>
  )
}
