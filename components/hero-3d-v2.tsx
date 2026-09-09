"use client"

import { useEffect, useRef, useState } from "react"

export function Hero3DV2() {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: -6, y: 10 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height
      setTilt({ x: -6 + dy * -12, y: 10 + dx * 16 })
    }
    const onLeave = () => setTilt({ x: -6, y: 10 })
    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
    return () => {
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="relative w-full aspect-square max-w-[560px] mx-auto select-none"
      style={{ perspective: "1100px", perspectiveOrigin: "50% 50%" }}
    >
      {/* === BACKDROP: isometric grid + neon orbs === */}
      <div className="absolute inset-0 overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-950 via-[#0f1e3a] to-slate-900 border border-white/[0.07] shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]">
        {/* glow orbs */}
        <div className="absolute -top-10 -left-10 w-[320px] h-[320px] bg-cyan-400/18 rounded-full blur-[48px]" />
        <div className="absolute -bottom-10 -right-10 w-[360px] h-[360px] bg-blue-500/14 rounded-full blur-[48px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[360px] bg-gradient-to-r from-cyan-500/8 via-blue-500/8 to-teal-500/8 blur-[40px] rounded-full" />

        {/* isometric grid */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: `linear-gradient(rgba(56,189,248,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.22) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
            transform: "perspective(600px) rotateX(58deg) scale(1.4)",
            transformOrigin: "center bottom",
          }}
        />
        {/* floor glass */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[88%] h-[34%] rounded-t-[28px] bg-gradient-to-t from-white/[0.06] to-transparent border-t border-white/10 backdrop-blur-[2px]" />
        {/* scan line */}
        <div className="absolute inset-0 opacity-20" style={{ background: `repeating-linear-gradient(0deg, transparent 0 2px, rgba(255,255,255,0.03) 2px 3px)` }} />
      </div>

      {/* === 3D STAGE === */}
      <div
        className="absolute inset-0 p-2"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.12s linear",
        }}
      >
        {/* — PERSON LEFT - isometric block avatar in glass base — */}
        <div className="absolute left-[4%] bottom-[14%] w-[26%] h-[62%] " style={{ transform: "translateZ(24px)", transformStyle: "preserve-3d" }}>
          <div className="absolute inset-0 animate-v2-bob" style={{ transformStyle: "preserve-3d" }}>
            {/* base shadow / platform */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[82%] h-[16px] bg-black/40 blur-[10px] rounded-full" />
            <div
              className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[86%] h-[10%] rounded-[12px] backdrop-blur-xl border border-white/15"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.04))",
                boxShadow: "0 8px 22px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.22)",
                transform: "translateZ(6px)",
              }}
            />
            {/* body block */}
            <div
              className="absolute bottom-[14%] left-[12%] right-[12%] top-[32%] rounded-[20px] overflow-hidden border border-white/10"
              style={{
                background: "linear-gradient(180deg, #ff7a50 0%, #f55a33 60%, #d9401e 100%)",
                boxShadow: "0 14px 28px rgba(245,90,51,0.35), inset 0 1px 0 rgba(255,255,255,0.28), inset -10px -8px 18px rgba(0,0,0,0.18)",
                transform: "translateZ(14px)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/18 via-transparent to-black/10" />
              <div className="absolute top-[10%] left-[14%] w-[20%] h-[40%] bg-white/16 rounded-full blur-[6px]" />
            </div>
            {/* head orb */}
            <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[46%] h-[26%] rounded-[18px] border border-white/18 overflow-hidden" style={{ background: "radial-gradient(ellipse at 30% 20%, #fff 0%, #ffd6d0 18%, #ffb6b6 55%, #e9a8a8 100%)", boxShadow: "0 10px 20px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.7)", transform: "translateZ(18px)" }}>
              <div className="absolute -top-[8%] -left-[8%] w-[120%] h-[74%] rounded-[18px]" style={{ background: "linear-gradient(180deg, #0f6b5a, #0a4d44 70%, #06352f)", boxShadow: "inset -8px -6px 12px rgba(0,0,0,0.35)" }} />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[36%] h-[6px] bg-[#e8b0b0] rounded-full blur-[0.5px]" />
            </div>
            {/* arm raised */}
            <div className="absolute top-[34%] -right-[2%] w-[18%] h-[36%] rounded-full border border-white/10" style={{ background: "linear-gradient(180deg,#ff7a50,#e04a2a)", transform: "translateZ(16px) rotate(-14deg)", boxShadow: "0 8px 16px rgba(0,0,0,0.22)" }} />
            <div className="absolute top-[30%] -right-[1%] w-[14px] h-[14px] rounded-full bg-[#ffcfc6] border border-white/40 shadow-[0_4px_10px_rgba(0,0,0,0.25)]" style={{ transform: "translateZ(22px)" }} />
          </div>
        </div>

        {/* — PERSON RIGHT - glass platform + ponytail — */}
        <div className="absolute right-[4%] bottom-[12%] w-[28%] h-[66%]" style={{ transform: "translateZ(36px)", transformStyle: "preserve-3d" }}>
          <div className="absolute inset-0 animate-v2-bob-delayed" style={{ transformStyle: "preserve-3d" }}>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[82%] h-[16px] bg-black/40 blur-[10px] rounded-full" />
            <div
              className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[86%] h-[10%] rounded-[12px] backdrop-blur-xl border border-white/15"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.04))",
                boxShadow: "0 8px 22px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.22)",
                transform: "translateZ(6px)",
              }}
            />
            {/* body */}
            <div
              className="absolute bottom-[14%] left-[10%] right-[10%] top-[30%] rounded-[20px] border border-white/12 overflow-hidden"
              style={{
                background: "linear-gradient(180deg, #ff7a50 0%, #f55a33 65%, #d9401e 100%)",
                boxShadow: "0 14px 28px rgba(245,90,51,0.32), inset 0 1px 0 rgba(255,255,255,0.26)",
                transform: "translateZ(14px)",
              }}
            >
              <div className="absolute -bottom-[8px] left-[22%] right-[22%] h-[10px] bg-[#e8a8a8] rounded-full" />
              <div className="absolute top-[12%] left-[12%] w-[18%] h-[38%] bg-white/16 rounded-full blur-[6px]" />
            </div>
            {/* extended arm */}
            <div className="absolute top-[46%] -left-[14%] w-[42%] h-[14%] rounded-full border border-white/10" style={{ background: "linear-gradient(90deg,#ff7a50,#e04a2a)", transform: "translateZ(18px) rotate(-14deg)", boxShadow: "0 8px 16px rgba(0,0,0,0.22)" }} />
            <div className="absolute top-[46%] -left-[16%] w-[13px] h-[13px] rounded-full bg-[#ffcfc6] border border-white/50" style={{ transform: "translateZ(24px)" }} />
            {/* head */}
            <div className="absolute top-[6%] left-1/2 -translate-x-1/2 w-[44%] h-[24%] rounded-[16px] border border-white/18 overflow-hidden" style={{ background: "radial-gradient(ellipse at 30% 20%, #fff 0%, #ffd6d0 20%, #c49a9a 70%)", boxShadow: "0 10px 20px rgba(0,0,0,0.28)", transform: "translateZ(18px)" }}>
              <div className="absolute -top-[6%] -left-[6%] w-[116%] h-[72%] rounded-[16px]" style={{ background: "linear-gradient(180deg,#0f6b5a,#0a4d44 70%, #06352f)", boxShadow: "inset -8px -6px 12px rgba(0,0,0,0.35)" }} />
              <div className="absolute top-[18%] -right-[18%] w-[40%] h-[120%] rounded-full" style={{ background: "linear-gradient(180deg,#0f6b5a,#06352f)", transform: "rotate(8deg)" }} />
              {/* bow */}
              <div className="absolute -top-[6%] right-[10%] w-[14px] h-[8px]">
                <div className="absolute left-0 w-[7px] h-[8px] bg-[#ff6b4a] rounded-full -rotate-12" />
                <div className="absolute right-0 w-[7px] h-[8px] bg-[#ff6b4a] rounded-full rotate-12" />
              </div>
            </div>
          </div>
        </div>

        {/* — GLASS DATA CARDS — */}
        {/* Top card */}
        <div className="absolute left-[30%] top-[7%] w-[34%] h-[20%]" style={{ transform: "translateZ(52px)", transformStyle: "preserve-3d" }}>
          <div className="absolute inset-0 animate-v2-float" style={{ transformStyle: "preserve-3d" }}>
            <div
              className="absolute inset-0 rounded-[16px] p-[9%] backdrop-blur-xl border border-white/18 overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(240,245,255,0.86))",
                boxShadow: "0 16px 36px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.6) inset, 0 1px 0 rgba(255,255,255,0.9) inset",
                transform: "translateZ(10px)",
              }}
            >
              {/* neon top edge */}
              <div className="absolute top-0 left-[8%] right-[8%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
              <div className="absolute -top-[12%] right-[12%] w-[16px] h-[16px] rounded-full bg-white border border-slate-200 shadow-[0_6px_16px_rgba(0,0,0,0.22)]" />
              <div className="w-full h-full flex flex-col justify-center gap-[12%]">
                <div className="h-[9%] w-[62%] rounded-full bg-slate-200/80" />
                <div className="h-[9%] w-full rounded-full bg-white border border-slate-200/80 shadow-sm" />
                <div className="h-[9%] w-full rounded-full overflow-hidden flex bg-slate-100 border border-slate-200/60">
                  <div className="flex-1 bg-white" />
                  <div className="flex-1 bg-gradient-to-r from-[#ff5a3c] to-[#ff7a50] animate-v2-bar" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
            <div className="absolute inset-0 rounded-[16px] bg-slate-300/90" style={{ transform: "translateZ(-6px)", filter: "brightness(0.92)" }} />
          </div>
        </div>

        {/* Bottom card */}
        <div className="absolute right-[28%] bottom-[26%] w-[36%] h-[20%]" style={{ transform: "translateZ(58px)", transformStyle: "preserve-3d" }}>
          <div className="absolute inset-0 animate-v2-float-delayed" style={{ transformStyle: "preserve-3d" }}>
            <div
              className="absolute inset-0 rounded-[16px] p-[9%] backdrop-blur-xl border border-white/18 overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.94), rgba(240,245,255,0.88))",
                boxShadow: "0 16px 36px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.6) inset",
                transform: "translateZ(10px)",
              }}
            >
              <div className="absolute top-0 left-[8%] right-[8%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
              <div className="absolute -top-[12%] left-[12%] w-[16px] h-[16px] rounded-full bg-white border border-slate-200 shadow-[0_6px_16px_rgba(0,0,0,0.22)]" />
              <div className="w-full h-full flex flex-col justify-center gap-[12%]">
                <div className="h-[9%] w-[60%] rounded-full bg-white border border-slate-200/70 ml-auto" />
                <div className="h-[9%] w-full rounded-full bg-white border border-slate-200/70" />
                <div className="h-[9%] w-full rounded-full overflow-hidden flex bg-slate-100 border border-slate-200/60">
                  <div className="w-[42%] bg-gradient-to-r from-[#ff5a3c] to-[#ff7a50] animate-v2-bar-rev" />
                  <div className="flex-1 bg-white" />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 rounded-[16px] bg-slate-300/90" style={{ transform: "translateZ(-6px)", filter: "brightness(0.92)" }} />
          </div>
        </div>

        {/* — CENTRAL ORB — */}
        <div className="absolute left-1/2 top-[41%] -translate-x-1/2 -translate-y-1/2 w-[9.5%] h-[9.5%]" style={{ transform: "translateZ(44px)", transformStyle: "preserve-3d" }}>
          <div className="absolute inset-0 animate-v2-hub" style={{ transformStyle: "preserve-3d" }}>
            <div className="absolute -inset-4 rounded-full bg-cyan-400/15 blur-[14px] animate-v2-ping" />
            <div className="absolute -inset-6 rounded-full border border-cyan-300/12 animate-v2-ring" />
            <div
              className="absolute inset-0 rounded-full border border-white/20 overflow-hidden"
              style={{
                background: "radial-gradient(circle at 30% 28%, #ffffff 0%, #8be9ff 12%, #22d3ee 28%, #0e7490 55%, #082f49 85%)",
                boxShadow: "inset -8px -8px 16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.7), 0 12px 24px rgba(6,182,212,0.35), 0 0 24px rgba(34,211,238,0.45)",
                transform: "translateZ(12px)",
              }}
            >
              <div className="absolute top-[18%] left-[18%] w-[32%] h-[32%] bg-white/55 rounded-full blur-[2px]" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/18 to-transparent" />
            </div>
            <div className="absolute inset-0 rounded-full bg-[#0e3a4a]" style={{ transform: "translateZ(-8px)", filter: "brightness(0.6)" }} />
          </div>
        </div>

        {/* — BEAMS — */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 560 380" style={{ transform: "translateZ(38px)", overflow: "visible" }}>
          <defs>
            <linearGradient id="v2-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.05" />
            </linearGradient>
            <filter id="v2-glow"><feGaussianBlur stdDeviation="2" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          {/* glow beam */}
          <path d="M 287 157 C 250 147, 220 110, 205 78" fill="none" stroke="#22d3ee" strokeWidth="4.5" opacity="0.14" strokeLinecap="round" />
          <path d="M 283 169 C 265 194, 275 210, 300 235" fill="none" stroke="#22d3ee" strokeWidth="4.5" opacity="0.14" strokeLinecap="round" />
          {/* core */}
          <path d="M 287 157 C 250 147, 220 110, 205 78" fill="none" stroke="url(#v2-grad)" strokeWidth="1.8" strokeDasharray="7 5" opacity="0.95" className="v2-dash" />
          <path d="M 283 169 C 265 194, 275 210, 300 235" fill="none" stroke="url(#v2-grad)" strokeWidth="1.8" strokeDasharray="7 5" opacity="0.95" className="v2-dash-rev" />
          {/* traveling lights */}
          <circle r="5" fill="#ff5a3c" filter="url(#v2-glow)" opacity="0.98"><animateMotion dur="2s" repeatCount="indefinite" rotate="auto"><mpath href="#v2-m1" /></animateMotion></circle>
          <circle r="4" fill="#22d3ee" filter="url(#v2-glow)"><animateMotion dur="2.3s" begin="0.7s" repeatCount="indefinite"><mpath href="#v2-m2" /></animateMotion></circle>
          <path id="v2-m1" d="M 287 157 C 250 147, 220 110, 205 78" fill="none" stroke="none" />
          <path id="v2-m2" d="M 283 169 C 265 194, 275 210, 300 235" fill="none" stroke="none" />
        </svg>
      </div>

      <style>{`
        @keyframes v2-bob { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-5px)} }
        @keyframes v2-float { 0%,100%{ transform: translateY(0) translateZ(10px) rotateX(1deg)} 50%{ transform: translateY(-7px) translateZ(16px) rotateX(-1deg)} }
        @keyframes v2-hub { 0%,100%{ transform: scale(1) translateZ(12px)} 50%{ transform: scale(1.07) translateZ(16px)} }
        @keyframes v2-ping { 0%{ transform: scale(0.92); opacity:0.55} 70%,100%{ transform: scale(1.65); opacity:0} }
        @keyframes v2-ring { 0%{ transform: scale(0.9); opacity:0.5 } 100%{ transform: scale(1.35); opacity:0 } }
        @keyframes v2-dash { to{ stroke-dashoffset:-24 } }
        @keyframes v2-bar { 0%{ transform: scaleX(0.75)} 50%{ transform: scaleX(1)} 100%{ transform: scaleX(0.82)} }
        .animate-v2-bob{ animation: v2-bob 3s ease-in-out infinite }
        .animate-v2-bob-delayed{ animation: v2-bob 3s ease-in-out infinite 0.5s }
        .animate-v2-float{ animation: v2-float 3.8s ease-in-out infinite }
        .animate-v2-float-delayed{ animation: v2-float 3.8s ease-in-out infinite 1s }
        .animate-v2-hub{ animation: v2-hub 2s ease-in-out infinite }
        .animate-v2-ping{ animation: v2-ping 2.1s cubic-bezier(0,0,0.2,1) infinite }
        .animate-v2-ring{ animation: v2-ring 2.1s linear infinite }
        .v2-dash{ animation: v2-dash 0.7s linear infinite }
        .v2-dash-rev{ animation: v2-dash 0.7s linear infinite reverse }
        .animate-v2-bar{ animation: v2-bar 2.3s ease-in-out infinite; transform-origin:left }
        .animate-v2-bar-rev{ animation: v2-bar 2.5s ease-in-out infinite reverse; transform-origin:left }
      `}</style>
    </div>
  )
}
