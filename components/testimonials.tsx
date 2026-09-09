"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import fallbackData from "@/data/testimonials.json"

export function Testimonials() {
  const [testimonialsData, setTestimonialsData] = useState(fallbackData)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)
  const [direction, setDirection] = useState<'left' | 'right'>('right')

  // Fetch live data from public API so admin edits appear without rebuild
  useEffect(() => {
    fetch("/api/public/data/testimonials.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => { if (Array.isArray(j) && j.length) setTestimonialsData(j) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = Math.max(0, testimonialsData.length - itemsPerView)
  useEffect(() => { setCurrentIndex((c) => Math.min(c, maxIndex)) }, [maxIndex])

  const next = () => {
    if (currentIndex < maxIndex) {
      setDirection('right')
      setCurrentIndex((prev) => Math.min(prev + 3, maxIndex))
    }
  }

  const prev = () => {
    if (currentIndex > 0) {
      setDirection('left')
      setCurrentIndex((prev) => Math.max(prev - 3, 0))
    }
  }

  const goToPage = (pageIndex: number) => {
    const targetIndex = pageIndex * itemsPerView
    setDirection(targetIndex > currentIndex ? 'right' : 'left')
    setCurrentIndex(targetIndex)
  }

  const visibleTestimonials = testimonialsData.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <section id="testimonials" className="py-24 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-wider uppercase mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Testimonials
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
            <p className="text-slate-400 text-lg">
              We value the trust our clients place in us and are proud to have contributed to their success.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              disabled={currentIndex === 0}
              className="border-cyan-500/30 hover:bg-cyan-500/10 hover:border-cyan-500/60 disabled:opacity-50 rounded-full bg-transparent text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              disabled={currentIndex >= maxIndex}
              className="border-cyan-500/30 hover:bg-cyan-500/10 hover:border-cyan-500/60 disabled:opacity-50 rounded-full bg-transparent text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={`${currentIndex}-${index}`}
                className={`relative p-8 rounded-3xl bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 ${direction === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}
                style={{
                  animationDelay: `${index * 80}ms`,
                  animationFillMode: 'both'
                }}
              >
                <Quote className="absolute top-6 right-6 h-12 w-12 text-cyan-500/20" />

                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Feedback */}
                <p className="text-slate-300 leading-relaxed mb-6 line-clamp-4">&ldquo;{testimonial.feedback}&rdquo;</p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-500/30 p-0.5 bg-gradient-to-br from-cyan-500 to-blue-500">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-slate-400">
                      {testimonial.company ? `${testimonial.company} - ` : ""}
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {[...Array(Math.ceil(testimonialsData.length / itemsPerView))].map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`h-2 rounded-full transition-all duration-300 ${Math.floor(currentIndex / itemsPerView) === index
                ? "w-8 bg-gradient-to-r from-cyan-500 to-blue-500"
                : "w-2 bg-slate-600 hover:bg-slate-500"
                }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
