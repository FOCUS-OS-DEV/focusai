export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100" dir="rtl">
      <div className="text-center">
        {/* Spinner */}
        <div className="w-16 h-16 mx-auto mb-4 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
        <p className="text-gray-600 font-medium">טוען...</p>
      </div>
    </main>
  )
}
