"use client"

import type React from "react"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Github, Heart } from "lucide-react"
import siteConfig from "@/data/site-config.json"

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
}

export function Footer() {
  return (
    <footer className="py-16 px-6 bg-slate-950 border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-shadow">
                <span className="text-slate-900 font-bold text-xl">{siteConfig.company.logo}</span>
              </div>
              <span className="text-2xl font-semibold text-white">
                Dime
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Tech</span>
              </span>
            </Link>
            <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
              {siteConfig.company.tagline} dedicated to driving business transformation through innovative technology
              solutions.
            </p>
            <div className="flex items-center gap-3">
              {Object.entries(siteConfig.social).map(([platform, url]) => {
                const Icon = socialIcons[platform]
                return Icon ? (
                  <a
                    key={platform}
                    href={url}
                    className="w-11 h-11 rounded-xl bg-slate-800/50 border border-cyan-500/20 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-500 hover:border-transparent transition-all hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/30"
                    aria-label={platform}
                  >
                    <Icon size={18} />
                  </a>
                ) : null
              })}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {siteConfig.footerLinks.quickLinks.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-slate-400 hover:text-cyan-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-slate-400">
              <li>{siteConfig.contact.address}</li>
              <li>{siteConfig.contact.phone}</li>
              <li>{siteConfig.contact.email}</li>
              <li>{siteConfig.contact.workingHours}</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm flex items-center gap-1">
            &copy; {new Date().getFullYear()} {siteConfig.company.name}. Made with{" "}
            <Heart className="h-4 w-4 text-cyan-500 fill-cyan-500 inline" /> in Nepal
          </p>
          <div className="flex items-center gap-6 text-sm">
            {siteConfig.footerLinks.legal.map((link) => (
              <a key={link.label} href={link.href} className="text-slate-400 hover:text-cyan-400 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
