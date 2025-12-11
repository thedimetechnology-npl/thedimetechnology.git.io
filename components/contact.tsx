"use client"

import type React from "react"
import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import siteConfig from "@/data/site-config.json"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const contactItems = [
    { icon: MapPin, label: "Location", value: siteConfig.contact.address },
    { icon: Phone, label: "Phone", value: siteConfig.contact.phone },
    { icon: Mail, label: "Email", value: siteConfig.contact.email },
    { icon: Clock, label: "Working Hours", value: siteConfig.contact.workingHours },
  ]

  return (
    <section id="contact" className="py-24 px-6 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <p className="text-sm font-semibold tracking-wider uppercase mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Contact
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ask us anything.</h2>
            <p className="text-slate-400 text-lg mb-8">
              Are you a company or brand seeking tech services? An agency looking to scale? A creative mind, a
              strategist? Let&apos;s connect.
            </p>

            <div className="space-y-6">
              {contactItems.map((item, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                    <item.icon className="h-6 w-6 text-slate-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{item.label}</h4>
                    <p className="text-slate-400">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 rounded-3xl bg-slate-800/50 border border-cyan-500/20 shadow-2xl shadow-cyan-500/5">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-cyan-400" />
              <h3 className="text-xl font-semibold text-white">
                Ready to experience our services? Let&apos;s start planning.
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-slate-900/50 border-cyan-500/20 focus:border-cyan-500/60 focus:ring-cyan-500/20 text-white placeholder:text-slate-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-slate-900/50 border-cyan-500/20 focus:border-cyan-500/60 focus:ring-cyan-500/20 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-white mb-2">
                  Organization
                </label>
                <Input
                  id="organization"
                  placeholder="Your company name"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="bg-slate-900/50 border-cyan-500/20 focus:border-cyan-500/60 focus:ring-cyan-500/20 text-white placeholder:text-slate-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your project..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-slate-900/50 border-cyan-500/20 focus:border-cyan-500/60 focus:ring-cyan-500/20 text-white placeholder:text-slate-500 resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-900 font-semibold h-14 text-base shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all hover:scale-[1.02]"
              >
                Send Message
                <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
