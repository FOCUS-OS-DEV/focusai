export default function FrontendLoading() {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      dir="rtl"
      style={{ background: 'linear-gradient(180deg, #f7f0fe 0%, #ede4fa 100%)' }}
    >
      <div className="text-center">
        {/* Animated Gradient Spinner */}
        <div
          className="w-16 h-16 mx-auto mb-4 rounded-full animate-spin"
          style={{
            background: 'conic-gradient(from 0deg, transparent, #b86cff, #ff4fd8)',
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))',
          }}
        />
        <p className="text-gray-700 font-medium">טוען את הדף...</p>
      </div>
    </main>
  )
}
