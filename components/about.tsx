"use client"

import Image from "next/image"
import { CheckCircle, Play, Zap } from "lucide-react"
import aboutData from "@/data/about.json"
import siteConfig from "@/data/site-config.json"

export function About() {
  return (
    <section id="about" className="py-24 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold tracking-wider uppercase mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            About Us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{aboutData.sectionTitle}</h2>
          <p className="text-slate-400 text-lg leading-relaxed">{aboutData.sectionDescription}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left - Images */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/10 border-2 sm:border-4 border-cyan-500/20">
              <Image
                src={aboutData.images.main || "/placeholder.svg"}
                alt="The Dime Technology - Your Freelance Tech Partner"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 font-bold text-sm sm:text-base md:text-lg shadow-lg">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden xs:inline">{siteConfig.company.name.toUpperCase()}</span>
                  <span className="xs:hidden">THE DIME TECHNOLOGY</span>
                </div>
                <p className="text-slate-300 mt-2 text-xs sm:text-sm font-medium">{siteConfig.company.tagline.toUpperCase()}</p>
              </div>
            </div>
            {/* Decorative blob */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl -z-10" />
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">{aboutData.contentTitle}</h3>
            {aboutData.contentParagraphs.map((paragraph, index) => (
              <p key={index} className="text-slate-400 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}

            <div className="mb-6 sm:mb-8">
              <p className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Key Values at a Glance
              </p>
              <div className="space-y-2 sm:space-y-3">
                {aboutData.keyValues.map((value, index) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3 group">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-slate-900" />
                    </div>
                    <span className="text-slate-300 text-sm sm:text-base">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{aboutData.closingNote}</p>
          </div>
        </div>

        {/* Video Section */}
        <div className="mt-12 sm:mt-16 relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/10">
          <Image
            src={aboutData.images.video || "/placeholder.svg"}
            alt="Team collaboration"
            width={1200}
            height={500}
            className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-blue-900/80 flex items-center justify-center">
            <a
              href={siteConfig.company.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-2xl animate-pulse-glow"
            >
              <Play className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-cyan-500 fill-cyan-500 ml-0.5 sm:ml-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
