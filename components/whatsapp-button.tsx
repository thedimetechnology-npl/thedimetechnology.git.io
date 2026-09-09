"use client"

import { usePathname } from "next/navigation"

export function WhatsAppButton() {
  const pathname = usePathname()
  if (pathname?.startsWith("/admin")) return null
  const phone = "9779801024024"
  const message = "Hello The Dime Technology, I want to discuss a project."
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp +9779801024024"
      className="fixed bottom-6 right-6 z-[60] group flex items-center gap-3"
    >
      {/* Number pill - shows on hover, always visible on mobile as tooltip */}
      <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-white shadow-xl border border-green-100 text-sm font-semibold text-slate-800 opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        +977 9801024024
      </div>

      {/* Premium button */}
      <div className="relative">
        {/* pulse rings */}
        <span className="absolute inset-0 rounded-full bg-green-500/30 animate-ping" style={{ animationDuration: "2s" }} />
        <span className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }} />
        {/* outer glow */}
        <span className="absolute -inset-1 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
        {/* button core */}
        <div className="relative w-[60px] h-[60px] sm:w-[64px] sm:h-[64px] rounded-full bg-gradient-to-br from-[#25D366] via-[#25D366] to-[#128C7E] flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.5),0_4px_12px_rgba(0,0,0,0.2)] border border-white/20 group-hover:scale-105 group-hover:shadow-[0_12px_32px_rgba(37,211,102,0.6)] transition-all duration-300">
          {/* glass highlight */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-[8%] left-[18%] w-[42%] h-[28%] bg-white/25 rounded-full blur-[2px] pointer-events-none" />
          {/* WhatsApp icon */}
          <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-sm relative z-10" fill="currentColor">
            <path d="M19.05 4.94A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.26-1.38a9.87 9.87 0 0 0 4.71 1.2h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.84-6.97zm-7.01 15.24h-.01a8.13 8.13 0 0 1-4.15-1.14l-.3-.18-3.11.82.83-3.02-.19-.31a8.21 8.21 0 0 1-1.27-4.44c0-4.54 3.69-8.23 8.23-8.23 2.2 0 4.26.86 5.81 2.41a8.17 8.17 0 0 1 2.41 5.81c0 4.54-3.69 8.23-8.25 8.23zm6.74-6.15c-.37-.19-2.19-1.08-2.53-1.2-.34-.12-.59-.19-.84.19-.24.37-.96 1.2-1.18 1.45-.22.24-.44.27-.81.09-.37-.19-1.57-.58-2.98-1.84-1.1-.98-1.84-2.19-2.06-2.56-.22-.37-.02-.57.16-.76.16-.16.37-.44.56-.66.19-.22.24-.37.37-.62.12-.24.06-.46-.03-.64-.09-.19-.84-2.02-1.15-2.76-.3-.72-.61-.62-.84-.63l-.72-.01c-.24 0-.64.09-.97.46-.34.37-1.28 1.25-1.28 3.05s1.31 3.54 1.49 3.78c.19.24 2.58 3.93 6.42 5.52.9.39 1.6.62 2.14.79.9.29 1.72.25 2.36.15.72-.11 2.19-.9 2.5-1.76.31-.87.31-1.61.22-1.76-.09-.15-.34-.24-.71-.43z" />
          </svg>
        </div>
        {/* small dot */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        </span>
      </div>

      {/* Mobile number bubble below button on small screens - visible */}
      <span className="sm:hidden absolute -top-8 right-0 bg-slate-900 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg whitespace-nowrap border border-slate-700">
        +977 9801024024
      </span>
    </a>
  )
}
