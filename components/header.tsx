"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import siteConfig from "@/data/site-config.json"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-slate-900/90 backdrop-blur-lg border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-shadow">
              <span className="text-slate-900 font-bold text-lg">{siteConfig.company.logo}</span>
            </div>
            <span className="text-xl font-semibold text-white">
              {siteConfig.company.name.replace("Technology", "")}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Tech</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {siteConfig.navigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-gradient-to-r after:from-cyan-500 after:to-blue-500 after:transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button
              className="relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 text-slate-900 font-semibold shadow-lg shadow-cyan-500/30 transition-all hover:scale-105 group"
              asChild
            >
              <a href={siteConfig.company.freelanceLink} target="_blank" rel="noopener noreferrer">
                <span className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-blaze" />
                <span className="relative z-10 group-hover:text-white transition-colors">Let's Get Started</span>
              </a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white p-2 rounded-lg hover:bg-cyan-500/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-cyan-500/20 pt-4 bg-slate-900/95 backdrop-blur-lg -mx-6 px-6 rounded-b-2xl shadow-xl shadow-cyan-500/10">
            <div className="flex flex-col gap-4">
              {siteConfig.navigation.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-300 hover:text-cyan-400 transition-colors py-2 hover:bg-cyan-500/10 px-4 rounded-lg -mx-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                className="relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 text-slate-900 font-semibold w-full mt-2 group"
                asChild
              >
                <a href={siteConfig.company.freelanceLink} target="_blank" rel="noopener noreferrer">
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-blaze" />
                  <span className="relative z-10 group-hover:text-white transition-colors">Let's Get Started</span>
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
