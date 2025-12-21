'use client'

const logos = [
  'https://focusai.co.il/wp-content/uploads/2025/11/32-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/33-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/34-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/37-1-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/36-1-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/33-1-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/29-1-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/28-1-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/27-1-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/25-1-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/635434-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/123546321-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/22456-1-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/38-1-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/35-1-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/31-1-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/30-1-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/26-1-150x150.png',
  'https://focusai.co.il/wp-content/uploads/2025/11/unnamed-file-1-150x150.png',
]

const LogoSet = () => (
  <div className="flex items-center gap-12 md:gap-20 px-6 shrink-0">
    {logos.map((logo, i) => (
      <img
        key={i}
        src={logo}
        alt=""
        className="shrink-0 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain hover:scale-110 transition-all duration-300"
      />
    ))}
  </div>
)

const BrandsCarousel = () => {
  return (
    <section
      className="w-full relative py-12 md:py-16 overflow-hidden"
      style={{
        background: 'rgba(250, 248, 255, 0.85)',
      }}
    >
      {/* Title */}
      <div className="text-center mb-10 md:mb-12 px-4">
        <p className="text-purple-500 text-sm uppercase tracking-[0.3em] mb-3 font-medium">Trusted By</p>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
          חלק מהארגונים שסומכים עלינו
        </h3>
      </div>

      {/* Carousel */}
      <div
        className="w-full overflow-hidden"
        dir="ltr"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div
          className="flex w-fit hover:[animation-play-state:paused]"
          style={{
            animation: 'logosScrollRight 45s linear infinite',
            transform: 'translateX(-33.333%)',
          }}
        >
          <LogoSet />
          <LogoSet />
          <LogoSet />
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes logosScrollRight {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  )
}

export default BrandsCarousel
