"use client"

import Image from "next/image"
import { ArrowRight, Play, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import heroData from "@/data/hero.json"
import processData from "@/data/process.json"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />

      {/* Animated decorative blobs with cyan/blue */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-20 -right-20 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-8 shadow-lg shadow-cyan-500/10">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-300">{heroData.badge}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance">
              <span className="text-white">{heroData.title}</span>{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent animate-gradient">
                {heroData.titleHighlight}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 max-w-xl mb-10 leading-relaxed text-pretty">
              {heroData.description}
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-900 font-semibold px-8 h-14 text-base shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all hover:scale-105"
                asChild
              >
                <a href={heroData.primaryCTA.href} target="_blank" rel="noopener noreferrer">
                  {heroData.primaryCTA.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/10 px-8 h-14 text-base group bg-transparent text-white"
                asChild
              >
                <a href={heroData.secondaryCTA.href} target="_blank" rel="noopener noreferrer">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mr-2 group-hover:scale-110 transition-transform">
                    <Play className="h-3 w-3 text-slate-900 fill-slate-900 ml-0.5" />
                  </div>
                  {heroData.secondaryCTA.text}
                </a>
              </Button>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto animate-float">
              <Image
                src={heroData.image || "/placeholder.svg"}
                alt="Team collaboration illustration"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {processData.heroFlow.map((item, index) => (
            <div key={item.step} className="relative group">
              <div className="text-center p-6 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/40 transition-all shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-colors">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <span className="text-base font-semibold text-white">{item.step}</span>
              </div>
              {index < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
