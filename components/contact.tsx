"use client"

import type React from "react"
import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CountrySelect, type Country } from "@/components/ui/country-select"
import siteConfig from "@/data/site-config.json"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    country: "NP",
    phone: "",
    message: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setStatus(null)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const j = await res.json()
      if (!res.ok) throw new Error(j.error || "Failed")
      setStatus({ type: "success", msg: "Message sent successfully! We'll get back to you soon." })
      setFormData({ name: "", email: "", organization: "", country: "NP", phone: "", message: "" })
    } catch (err: any) {
      setStatus({ type: "error", msg: err.message || "Something went wrong" })
    } finally {
      setSubmitting(false)
    }
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
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Contact Info */}
          <div>
            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Contact
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">Ask us anything.</h2>
            <p className="text-slate-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
              Are you a company or brand seeking tech services? An agency looking to scale? A creative mind, a
              strategist? Let&apos;s connect.
            </p>

            <div className="space-y-4 sm:space-y-6">
              {contactItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4 group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-slate-900" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">{item.label}</h4>
                    <p className="text-slate-400 text-xs sm:text-sm break-words">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-slate-800/50 border border-cyan-500/20 shadow-2xl shadow-cyan-500/5">
            <div className="flex items-start sm:items-center gap-2 mb-5 sm:mb-6">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 flex-shrink-0 mt-0.5 sm:mt-0" />
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white leading-tight">
                Ready to experience our services? Let&apos;s start planning.
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-white mb-2">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-slate-900/50 border-cyan-500/20 focus:border-cyan-500/60 focus:ring-cyan-500/20 text-white placeholder:text-slate-500 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-white mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-slate-900/50 border-cyan-500/20 focus:border-cyan-500/60 focus:ring-cyan-500/20 text-white placeholder:text-slate-500 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="organization" className="block text-xs sm:text-sm font-medium text-white mb-2">
                  Organization
                </label>
                <Input
                  id="organization"
                  placeholder="Your company name"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="bg-slate-900/50 border-cyan-500/20 focus:border-cyan-500/60 focus:ring-cyan-500/20 text-white placeholder:text-slate-500 text-sm sm:text-base"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-white mb-2">
                    Country
                  </label>
                  <CountrySelect
                    value={formData.country}
                    onValueChange={(country: Country) =>
                      setFormData({ ...formData, country: country.code })
                    }
                    placeholder="Search country..."
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-white mb-2">
                    Phone
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9801024024"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-slate-900/50 border-cyan-500/20 focus:border-cyan-500/60 focus:ring-cyan-500/20 text-white placeholder:text-slate-500 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-white mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your project..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-slate-900/50 border-cyan-500/20 focus:border-cyan-500/60 focus:ring-cyan-500/20 text-white placeholder:text-slate-500 resize-none text-sm sm:text-base"
                />
              </div>

              {status && (
                <div className={`text-sm px-4 py-3 rounded-xl border ${status.type === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
                  {status.msg}
                </div>
              )}
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-900 font-semibold h-12 sm:h-14 text-sm sm:text-base shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all hover:scale-[1.02] disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Send Message"}
                <Send className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
