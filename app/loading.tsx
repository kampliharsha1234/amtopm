export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#E8DFD3] border-t-[#E85D2C] rounded-full animate-spin mx-auto" />
        <p className="body-text-sm mt-4 text-[#6B6B6B]">Loading...</p>
      </div>
    </div>
  )
}