"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, Play, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import heroData from "@/data/hero.json"
import processData from "@/data/process.json"
import siteConfig from "@/data/site-config.json"

export function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
    return match ? match[1] : null
  }

  const youtubeId = getYouTubeId(siteConfig.company.youtubeUrl)

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
                className="relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 text-slate-900 font-semibold px-8 h-14 text-base shadow-lg shadow-cyan-500/30 transition-all hover:scale-105 group"
                asChild
              >
                <a href={heroData.primaryCTA.href} target="_blank" rel="noopener noreferrer">
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-blaze" />
                  <span className="relative z-10 flex items-center group-hover:text-white transition-colors">
                    {heroData.primaryCTA.text}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="relative overflow-hidden border-2 border-cyan-500/30 hover:border-orange-500/60 px-8 h-14 text-base group bg-transparent text-white transition-all"
                onClick={() => setIsVideoOpen(true)}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-blaze" />
                <div className="relative z-10 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:from-orange-500 group-hover:to-red-500 flex items-center justify-center mr-2 transition-all duration-300 group-hover:animate-fire-pulse">
                    <Play className="h-3 w-3 text-slate-900 fill-slate-900 ml-0.5" />
                  </div>
                  {heroData.secondaryCTA.text}
                </div>
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

        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {processData.heroFlow.map((item, index) => (
            <div key={item.step} className="relative group">
              <div className="text-center p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/40 transition-all shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-2 sm:mb-3 md:mb-4 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-colors">
                  <span className="text-lg sm:text-xl md:text-2xl">{item.icon}</span>
                </div>
                <span className="text-xs sm:text-sm md:text-base font-semibold text-white line-clamp-2">{item.step}</span>
              </div>
              {index < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-5xl w-[95vw] p-0 bg-slate-950 border-cyan-500/30 overflow-hidden">
          <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-slate-900/80 p-2 text-white hover:bg-slate-800 transition-colors border border-cyan-500/30 hover:border-cyan-500/60">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <div className="relative w-full aspect-video">
            {youtubeId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <video
                controls
                autoPlay
                className="w-full h-full object-cover"
              >
                <source src={heroData.secondaryCTA.href} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
