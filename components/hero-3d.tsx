"use client"

import { useEffect, useRef, useState } from "react"

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: -8, y: 12 })
  const [isHovering, setIsHovering] = useState(false)

  // Mouse parallax
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / rect.width
      const dy = (e.clientY - cy) / rect.height
      setRotate({ x: -8 + dy * -10, y: 12 + dx * 18 })
    }
    const onLeave = () => setRotate({ x: -8, y: 12 })
    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
    return () => {
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  // auto slow orbit when not hovering
  useEffect(() => {
    if (isHovering) return
    let raf = 0
    let angle = 0
    const tick = () => {
      angle += 0.12
      const y = 12 + Math.sin(angle * 0.015) * 6
      const x = -8 + Math.cos(angle * 0.01) * 3
      setRotate({ x, y })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isHovering])

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative w-full aspect-square max-w-[560px] mx-auto select-none"
      style={{ perspective: "1200px", perspectiveOrigin: "50% 45%" }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[70%] rounded-[40px] bg-cyan-400/10 blur-[50px]" />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-gradient-to-t from-cyan-500/15 to-transparent blur-2xl rounded-full" />
        {/* floor grid */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-[55%] opacity-30"
          style={{
            backgroundImage: `linear-gradient(rgba(56,189,248,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.15) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
            transform: "rotateX(65deg)",
            transformOrigin: "center bottom",
          }}
        />
        {/* floor ellipse */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[78%] h-[22%] rounded-[50%] bg-gradient-to-b from-cyan-300/10 to-blue-900/0 blur-[1px] border border-cyan-400/10" />
      </div>

      {/* 3D stage */}
      <div
        className="absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: isHovering ? "transform 0.15s linear" : "transform 0.8s ease-out",
        }}
      >
        {/* === PERSON LEFT (back view, orange shirt, green pants) === */}
        <div
          className="absolute left-[2%] bottom-[18%] w-[28%] h-[68%]"
          style={{ transformStyle: "preserve-3d", transform: "translateZ(28px)" }}
        >
          <div className="absolute inset-0 animate-bob" style={{ transformStyle: "preserve-3d" }}>
            {/* shadow on floor */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[70%] h-[14px] bg-black/40 blur-[10px] rounded-full" />
            {/* legs green */}
            <div
              className="absolute bottom-[0%] left-[12%] w-[38%] h-[36%] rounded-t-[18px] rounded-b-[6px]"
              style={{
                background: "linear-gradient(180deg, #0f5a4a 0%, #083e33 100%)",
                boxShadow: "inset -8px 0 12px rgba(0,0,0,0.25), inset 6px 0 10px rgba(255,255,255,0.07)",
                transform: "translateZ(2px)",
              }}
            />
            <div
              className="absolute bottom-[0%] right-[14%] w-[38%] h-[36%] rounded-t-[18px] rounded-b-[6px]"
              style={{
                background: "linear-gradient(180deg, #0f5a4a 0%, #083e33 100%)",
                boxShadow: "inset -8px 0 12px rgba(0,0,0,0.25)",
                transform: "translateZ(2px)",
              }}
            />
            {/* torso orange - back view */}
            <div
              className="absolute bottom-[30%] left-[8%] w-[84%] h-[48%]"
              style={{
                background: "linear-gradient(180deg, #ff7a50 0%, #f85a3c 55%, #e94a2c 100%)",
                borderRadius: "28px 28px 18px 18px",
                boxShadow:
                  "inset -12px 0 18px rgba(0,0,0,0.18), inset 8px 8px 16px rgba(255,255,255,0.18), 0 12px 24px rgba(248,90,64,0.25)",
                transform: "translateZ(14px)",
              }}
            >
              {/* collar */}
              <div className="absolute -top-[4px] left-1/2 -translate-x-1/2 w-[34%] h-[14px] bg-[#e94a2c] rounded-b-[8px] border border-black/10" />
              {/* highlight */}
              <div className="absolute top-[12%] left-[12%] w-[18%] h-[55%] bg-white/12 rounded-full blur-[6px]" />
            </div>
            {/* left arm hanging */}
            <div
              className="absolute bottom-[34%] left-[2%] w-[18%] h-[42%] rotate-[6deg]"
              style={{
                background: "linear-gradient(180deg, #ff7a50, #e94a2c)",
                borderRadius: "16px",
                boxShadow: "inset -6px 0 10px rgba(0,0,0,0.2)",
                transform: "translateZ(10px)",
              }}
            />
            {/* right arm raised */}
            <div
              className="absolute bottom-[42%] right-[6%] w-[19%] h-[44%] rotate-[-14deg] origin-bottom"
              style={{
                background: "linear-gradient(180deg, #ff7a50, #e94a2c)",
                borderRadius: "16px",
                boxShadow: "inset -6px 0 10px rgba(0,0,0,0.2)",
                transform: "translateZ(18px)",
              }}
            />
            {/* hand */}
            <div
              className="absolute top-[8%] right-[12%] w-[18px] h-[22px] rounded-full"
              style={{
                background: "linear-gradient(180deg, #ffc9c9, #e8a8a8)",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                transform: "translateZ(26px)",
              }}
            />
            {/* head */}
            <div
              className="absolute top-[2%] left-1/2 -translate-x-1/2 w-[44%] h-[24%]"
              style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
            >
              {/* neck */}
              <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-[28%] h-[10px] bg-[#e8a8a8] rounded-full" />
              {/* face side */}
              <div
                className="absolute inset-0 rounded-[18px]"
                style={{
                  background: "radial-gradient(ellipse at 70% 40%, #ffd0cc 0%, #ffb6b6 60%, #e8a8a8 100%)",
                  boxShadow: "inset -8px -6px 12px rgba(0,0,0,0.12), 0 6px 16px rgba(0,0,0,0.2)",
                }}
              />
              {/* hair dark green - 3d bob */}
              <div
                className="absolute -top-[8%] -left-[8%] w-[118%] h-[78%] rounded-[22px]"
                style={{
                  background: "linear-gradient(180deg, #0e6a59 0%, #0a4d44 55%, #06352f 100%)",
                  boxShadow: "inset -10px -8px 14px rgba(0,0,0,0.32), inset 6px 6px 10px rgba(255,255,255,0.08)",
                  transform: "translateZ(6px)",
                }}
              />
              <div className="absolute top-[32%] -left-[6%] w-[18%] h-[34%] bg-[#06352f] rounded-full blur-[1px]" />
            </div>
          </div>
        </div>

        {/* === PERSON RIGHT (facing left, orange crop, green pants, ponytail) === */}
        <div
          className="absolute right-[2%] bottom-[16%] w-[30%] h-[72%]"
          style={{ transformStyle: "preserve-3d", transform: "translateZ(42px)" }}
        >
          <div className="absolute inset-0 animate-bob-delayed" style={{ transformStyle: "preserve-3d" }}>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[72%] h-[14px] bg-black/40 blur-[10px] rounded-full" />
            {/* legs wide */}
            <div
              className="absolute bottom-[0%] left-[6%] w-[36%] h-[38%] rounded-t-[14px]"
              style={{
                background: "linear-gradient(180deg, #0f5a4a 0%, #083e33 100%)",
                transform: "skewX(-6deg) translateZ(4px)",
                boxShadow: "inset -8px 0 12px rgba(0,0,0,0.25)",
              }}
            />
            <div
              className="absolute bottom-[0%] right-[8%] w-[36%] h-[38%] rounded-t-[14px]"
              style={{
                background: "linear-gradient(180deg, #0f5a4a 0%, #083e33 100%)",
                transform: "skewX(6deg) translateZ(4px)",
                boxShadow: "inset -8px 0 12px rgba(0,0,0,0.25)",
              }}
            />
            {/* crop top orange */}
            <div
              className="absolute bottom-[36%] left-[10%] w-[80%] h-[30%] rounded-t-[22px] rounded-b-[10px]"
              style={{
                background: "linear-gradient(180deg, #ff7a50 0%, #f85a3c 60%, #e94a2c 100%)",
                boxShadow:
                  "inset -10px 0 16px rgba(0,0,0,0.18), inset 6px 6px 14px rgba(255,255,255,0.14), 0 10px 22px rgba(248,90,64,0.25)",
                transform: "translateZ(16px)",
              }}
            >
              <div className="absolute top-[18%] left-[10%] w-[16%] h-[45%] bg-white/12 rounded-full blur-[5px]" />
              {/* waist skin */}
              <div className="absolute -bottom-[8px] left-[18%] right-[18%] h-[10px] bg-[#e8a8a8] rounded-full blur-[0.5px]" />
            </div>
            {/* left arm extended forward */}
            <div
              className="absolute bottom-[48%] left-[-2%] w-[46%] h-[16%] rotate-[-18deg] origin-right"
              style={{
                background: "linear-gradient(180deg, #ff7a50, #e94a2c)",
                borderRadius: "14px",
                boxShadow: "inset -6px 0 10px rgba(0,0,0,0.18)",
                transform: "translateZ(22px)",
              }}
            />
            <div
              className="absolute bottom-[46%] left-[-6%] w-[18px] h-[18px] rounded-full"
              style={{ background: "#e8a8a8", transform: "translateZ(28px)", boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}
            />
            {/* right arm behind back */}
            <div
              className="absolute bottom-[50%] right-[4%] w-[18%] h-[32%] rotate-[12deg]"
              style={{
                background: "linear-gradient(180deg, #ff7a50, #e94a2c)",
                borderRadius: "14px",
                transform: "translateZ(8px)",
              }}
            />
            {/* head */}
            <div
              className="absolute top-[4%] left-1/2 -translate-x-1/2 w-[42%] h-[22%]"
              style={{ transform: "translateZ(20px)" }}
            >
              <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-[30%] h-[10px] bg-[#c48a8a] rounded-full" />
              <div
                className="absolute inset-0 rounded-[16px]"
                style={{
                  background: "radial-gradient(ellipse at 30% 40%, #ffd0cc, #b78a8a)",
                  boxShadow: "inset -6px -4px 10px rgba(0,0,0,0.18)",
                }}
              />
              {/* hair voluminous ponytail */}
              <div
                className="absolute -top-[6%] -left-[6%] w-[114%] h-[76%] rounded-[18px]"
                style={{
                  background: "linear-gradient(180deg, #0e6a59, #0a4d44 60%, #06352f)",
                  boxShadow: "inset -8px -6px 12px rgba(0,0,0,0.35)",
                  transform: "translateZ(8px)",
                }}
              />
              {/* ponytail hanging */}
              <div
                className="absolute top-[18%] -right-[18%] w-[42%] h-[140%] rounded-full"
                style={{
                  background: "linear-gradient(180deg, #0e6a59, #06352f)",
                  borderRadius: "40% 50% 30% 40%",
                  transform: "translateZ(4px) rotate(8deg)",
                  boxShadow: "inset -6px 0 10px rgba(0,0,0,0.3)",
                }}
              />
              {/* hair bow */}
              <div className="absolute -top-[8%] right-[10%] w-[18px] h-[10px]">
                <div className="absolute left-0 w-[8px] h-[10px] bg-[#ff6b4a] rounded-full rotate-[-18deg]" />
                <div className="absolute right-0 w-[8px] h-[10px] bg-[#ff6b4a] rounded-full rotate-[18deg]" />
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[5px] h-[5px] bg-[#ff3b1f] rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* === FLOATING DATA PANELS 3D === */}
        {/* Top panel - near left person */}
        <div
          className="absolute left-[28%] top-[8%] w-[32%] h-[22%]"
          style={{ transformStyle: "preserve-3d", transform: "translateZ(58px)" }}
        >
          <div className="absolute inset-0 animate-float-panel" style={{ transformStyle: "preserve-3d" }}>
            {/* panel card 3d */}
            <div
              className="absolute inset-0 rounded-[14px] p-[10%]"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(230,235,245,0.96))",
                boxShadow:
                  "0 18px 36px rgba(0,0,0,0.35), 0 2px 0 rgba(255,255,255,1) inset, 0 -1px 0 rgba(0,0,0,0.08) inset",
                transform: "translateZ(12px)",
                border: "1px solid rgba(255,255,255,0.8)",
              }}
            >
              {/* small dot */}
              <div className="absolute -top-[14%] right-[18%] w-[18px] h-[18px] rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.25),0_1px_0_white_inset] border border-slate-200" />
              {/* bars */}
              <div className="w-full h-full flex flex-col justify-center gap-[12%]">
                <div className="w-[68%] h-[10%] rounded-full bg-slate-200 overflow-hidden">
                  <div className="w-full h-full bg-[#e6e8ec] rounded-full" />
                </div>
                <div className="w-full h-[10%] rounded-full bg-slate-200 overflow-hidden">
                  <div className="w-full h-full bg-white border border-slate-200 rounded-full" />
                </div>
                <div className="w-full h-[10%] rounded-full bg-slate-200 overflow-hidden flex">
                  <div className="flex-1 bg-white border border-slate-200 rounded-full" />
                  <div className="flex-1 bg-[#ff5a3c] rounded-full -ml-[1px] animate-bar-fill" />
                </div>
              </div>
            </div>
            {/* side thickness */}
            <div
              className="absolute inset-0 rounded-[14px]"
              style={{
                background: "#d7dbe3",
                transform: "translateZ(-6px)",
                filter: "brightness(0.85)",
              }}
            />
            <div
              className="absolute top-[6px] bottom-[6px] -right-[6px] w-[6px] rounded-r-[14px]"
              style={{ background: "#c8ccd6", transform: "translateZ(3px) rotateY(90deg)", transformOrigin: "left center" }}
            />
          </div>
          {/* glow under */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[70%] h-[12px] bg-cyan-400/20 blur-[10px] rounded-full" />
        </div>

        {/* Bottom panel - near right person */}
        <div
          className="absolute right-[28%] bottom-[28%] w-[34%] h-[22%]"
          style={{ transformStyle: "preserve-3d", transform: "translateZ(64px)" }}
        >
          <div className="absolute inset-0 animate-float-panel-delayed" style={{ transformStyle: "preserve-3d" }}>
            <div
              className="absolute inset-0 rounded-[14px] p-[10%]"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(230,235,245,0.98))",
                boxShadow:
                  "0 18px 36px rgba(0,0,0,0.35), 0 2px 0 rgba(255,255,255,1) inset, 0 -1px 0 rgba(0,0,0,0.08) inset",
                transform: "translateZ(12px)",
                border: "1px solid rgba(255,255,255,0.9)",
              }}
            >
              <div className="absolute -top-[14%] left-[18%] w-[18px] h-[18px] rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.25)] border border-slate-200" />
              <div className="w-full h-full flex flex-col justify-center gap-[12%]">
                <div className="w-[62%] h-[10%] rounded-full bg-slate-200 ml-auto overflow-hidden">
                  <div className="w-full h-full bg-white border border-slate-200 rounded-full" />
                </div>
                <div className="w-full h-[10%] rounded-full bg-slate-200 overflow-hidden flex">
                  <div className="w-[65%] h-full bg-white border border-slate-200 rounded-full" />
                  <div className="flex-1" />
                </div>
                <div className="w-full h-[10%] rounded-full bg-slate-200 overflow-hidden flex">
                  <div className="w-[42%] h-full bg-[#ff5a3c] rounded-full animate-bar-fill-reverse" />
                  <div className="flex-1 bg-white border border-slate-200 rounded-full -ml-[1px]" />
                </div>
              </div>
            </div>
            <div
              className="absolute inset-0 rounded-[14px]"
              style={{ background: "#d7dbe3", transform: "translateZ(-6px)", filter: "brightness(0.85)" }}
            />
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[70%] h-[12px] bg-orange-400/15 blur-[10px] rounded-full" />
        </div>

        {/* === CENTRAL HUB 3D === */}
        <div
          className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[9%] h-[9%]"
          style={{ transformStyle: "preserve-3d", transform: "translateZ(48px)" }}
        >
          <div className="absolute inset-0 animate-hub-pulse" style={{ transformStyle: "preserve-3d" }}>
            {/* outer glow */}
            <div className="absolute -inset-3 rounded-full bg-cyan-400/20 blur-[12px] animate-ping-slow" />
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle at 30% 30%, #7a7a90 0%, #5a586e 35%, #3f3d56 70%, #2a2940 100%)",
                boxShadow:
                  "inset -6px -6px 12px rgba(0,0,0,0.5), inset 4px 4px 10px rgba(255,255,255,0.18), 0 12px 24px rgba(0,0,0,0.4), 0 0 0 2px rgba(255,255,255,0.08)",
                transform: "translateZ(16px)",
              }}
            >
              <div className="absolute top-[22%] left-[22%] w-[32%] h-[32%] bg-white/22 rounded-full blur-[3px]" />
            </div>
            {/* thickness */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: "#2a2940", transform: "translateZ(-8px)", filter: "brightness(0.7)" }}
            />
          </div>
        </div>

        {/* === CURVED ARROWS WITH PARTICLES === */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 560 380"
          style={{ transform: "translateZ(40px)", overflow: "visible" }}
        >
          <defs>
            <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6b7280" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#6b7280" stopOpacity="0.3" />
            </linearGradient>
            <marker id="arrowHead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="#8b8ba3" />
            </marker>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Top curve: from hub to top panel */}
          <path
            d="M 287 158 C 250 148, 220 110, 205 78"
            fill="none"
            stroke="url(#arrowGrad)"
            strokeWidth="1.8"
            strokeDasharray="6 4"
            markerEnd="url(#arrowHead)"
            opacity="0.9"
            className="animate-dash"
          />
          {/* Bottom curve: from hub to bottom panel */}
          <path
            d="M 283 170 C 265 195, 275 210, 300 235"
            fill="none"
            stroke="url(#arrowGrad)"
            strokeWidth="1.8"
            strokeDasharray="6 4"
            markerEnd="url(#arrowHead)"
            opacity="0.9"
            className="animate-dash-reverse"
          />

          {/* traveling dots */}
          <circle r="4.5" fill="#ff5a3c" filter="url(#glow)" className="dot-travel-top">
            <animateMotion dur="2.2s" repeatCount="indefinite" rotate="auto">
              <mpath href="#motionTop" />
            </animateMotion>
          </circle>
          <circle r="3.5" fill="#22d3ee" filter="url(#glow)" opacity="0.9" className="dot-travel-bottom">
            <animateMotion dur="2.4s" repeatCount="indefinite" rotate="auto" begin="0.6s">
              <mpath href="#motionBottom" />
            </animateMotion>
          </circle>

          {/* hidden paths for motion */}
          <path id="motionTop" d="M 287 158 C 250 148, 220 110, 205 78" fill="none" stroke="none" />
          <path id="motionBottom" d="M 283 170 C 265 195, 275 210, 300 235" fill="none" stroke="none" />
        </svg>

        {/* floating particles around hub */}
        <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2" style={{ transform: "translateZ(52px)" }}>
          <div className="absolute w-[3px] h-[3px] bg-white rounded-full animate-orbit-1 shadow-[0_0_6px_white]" />
          <div className="absolute w-[2px] h-[2px] bg-cyan-300 rounded-full animate-orbit-2 shadow-[0_0_6px_#22d3ee]" />
          <div className="absolute w-[2.5px] h-[2.5px] bg-orange-300 rounded-full animate-orbit-3 shadow-[0_0_6px_#ff7a50]" />
        </div>
      </div>

      {/* vignette */}
      <div className="absolute inset-0 rounded-[28px] pointer-events-none border border-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />

      <style>{`
        @keyframes bob {
          0%, 100% { transform: translateY(0px) translateZ(0); }
          50% { transform: translateY(-6px) translateZ(0); }
        }
        @keyframes floatPanel {
          0%, 100% { transform: translateY(0px) translateZ(12px) rotateX(2deg); }
          50% { transform: translateY(-8px) translateZ(18px) rotateX(-1deg); }
        }
        @keyframes hubPulse {
          0%, 100% { transform: scale(1) translateZ(16px); }
          50% { transform: scale(1.08) translateZ(20px); }
        }
        @keyframes pingSlow {
          0% { transform: scale(0.9); opacity: 0.6; }
          70%, 100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes dash { to { stroke-dashoffset: -20; } }
        @keyframes orbit1 {
          0% { transform: rotate(0deg) translateX(34px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: rotate(360deg) translateX(34px) rotate(-360deg); opacity: 0; }
        }
        @keyframes orbit2 {
          0% { transform: rotate(120deg) translateX(42px) rotate(-120deg); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: rotate(480deg) translateX(42px) rotate(-480deg); opacity: 0; }
        }
        @keyframes orbit3 {
          0% { transform: rotate(240deg) translateX(38px) rotate(-240deg); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: rotate(600deg) translateX(38px) rotate(-600deg); opacity: 0; }
        }
        @keyframes barFill {
          0% { transform: scaleX(0.7); transform-origin: left; }
          50% { transform: scaleX(1); }
          100% { transform: scaleX(0.85); transform-origin: left; }
        }
        .animate-bob { animation: bob 3.2s ease-in-out infinite; }
        .animate-bob-delayed { animation: bob 3.2s ease-in-out infinite 0.6s; }
        .animate-float-panel { animation: floatPanel 4s ease-in-out infinite; }
        .animate-float-panel-delayed { animation: floatPanel 4s ease-in-out infinite 1.1s; }
        .animate-hub-pulse { animation: hubPulse 2s ease-in-out infinite; }
        .animate-ping-slow { animation: pingSlow 2.2s cubic-bezier(0,0,0.2,1) infinite; }
        .animate-dash { animation: dash 0.8s linear infinite; }
        .animate-dash-reverse { animation: dash 0.8s linear infinite reverse; }
        .animate-orbit-1 { animation: orbit1 3s linear infinite; }
        .animate-orbit-2 { animation: orbit2 3.6s linear infinite; }
        .animate-orbit-3 { animation: orbit3 4.2s linear infinite; }
        .animate-bar-fill { animation: barFill 2.4s ease-in-out infinite; }
        .animate-bar-fill-reverse { animation: barFill 2.6s ease-in-out infinite reverse; }
      `}</style>
    </div>
  )
}
