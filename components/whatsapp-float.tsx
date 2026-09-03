"use client"

export function WhatsAppFloat() {
  const phone = "9779801024024"
  const displayPhone = "+977 9801024024"
  const message = encodeURIComponent("Hello The Dime Technology! I'm interested in your services. 👋")
  const href = `https://wa.me/${phone}?text=${message}`

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[9999] flex flex-col items-end gap-3 pointer-events-none">
      {/* Premium Tooltip - flat, appears on hover */}
      <div className="hidden sm:block pointer-events-auto group/tooltip">
        <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full border border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.35)] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[13px] font-semibold tracking-tight">Chat on WhatsApp</span>
          <span className="text-[11px] font-medium text-white/60 bg-white/10 px-2 py-0.5 rounded-full border border-white/10">{displayPhone}</span>
        </div>
      </div>

      {/* Premium Circle - FLAT (no 3D) */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat on WhatsApp - ${displayPhone}`}
        className="pointer-events-auto relative group"
      >
        {/* subtle premium glow */}
        <span aria-hidden className="absolute inset-0 rounded-full bg-emerald-500/20 blur-[14px] scale-110 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        {/* soft ping ring - premium flat */}
        <span aria-hidden className="absolute inset-0 rounded-full border border-emerald-500/20 animate-[whatsapp-ping_2.6s_cubic-bezier(0,0,0.2,1)_infinite]" />

        {/* Circle button - flat premium */}
        <span className="relative flex items-center justify-center w-[60px] h-[60px] sm:w-[64px] sm:h-[64px] rounded-full bg-[#25D366] border-[3px] border-white shadow-[0_8px_24px_rgba(37,211,102,0.32),0_4px_10px_rgba(0,0,0,0.18)] group-hover:shadow-[0_12px_32px_rgba(37,211,102,0.42),0_6px_14px_rgba(0,0,0,0.2)] group-hover:scale-[1.04] group-active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
          {/* flat icon - centered, no 3D */}
          <svg width="30" height="30" viewBox="0 0 24 24" fill="white" className="w-[28px] h-[28px] sm:w-[30px] sm:h-[30px]">
            <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2C6.55 2 2.07 6.45 2.07 11.9c0 1.75.46 3.45 1.32 4.95L2 22l5.26-1.38a9.87 9.87 0 0 0 4.77 1.21h.01c5.47 0 9.95-4.45 9.95-9.9 0-2.64-1.03-5.13-2.9-7.02zm-7.02 15.13h-.01a8.15 8.15 0 0 1-4.15-1.13l-.3-.18-3.12.82.83-3.03-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.41a8.2 8.2 0 0 1 2.41 5.8c0 4.54-3.7 8.23-8.27 8.23zm6.74-6.16c-.37-.18-2.2-1.08-2.54-1.21-.34-.12-.59-.18-.84.18-.24.37-.96 1.21-1.18 1.46-.22.24-.44.27-.81.09-.37-.19-1.56-.57-2.96-1.82-1.1-.97-1.84-2.17-2.05-2.54-.22-.37-.02-.57.16-.75.16-.16.37-.42.56-.63.18-.2.24-.37.37-.61.12-.24.06-.46-.03-.64-.09-.18-.84-2.02-1.15-2.76-.3-.72-.61-.62-.84-.63l-.72-.01c-.24 0-.64.09-.97.46s-1.28 1.25-1.28 3.04 1.31 3.53 1.49 3.77c.18.24 2.57 3.93 6.42 5.51.9.38 1.6.61 2.14.78.9.29 1.72.25 2.37.15.72-.11 2.2-.9 2.51-1.76.31-.87.31-1.61.22-1.77-.1-.16-.34-.24-.71-.43z" />
          </svg>
        </span>

        {/* online dot - premium flat */}
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 border-[2.5px] border-white shadow-[0_2px_8px_rgba(16,185,129,0.5)] flex items-center justify-center">
          <span className="absolute w-full h-full rounded-full bg-emerald-500 animate-ping opacity-30" />
        </span>
      </a>

      {/* Mobile label */}
      <div className="sm:hidden pointer-events-auto bg-slate-900 text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-white/10 shadow-lg">
        WhatsApp Us
      </div>
    </div>
  )
}
