"use client"

import type React from "react"
import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, Sparkles, CheckCircle2, AlertCircle, Loader2, Code, Search, Users, Wrench, Rocket, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import siteConfig from "@/data/site-config.json"
import servicesData from "@/data/services.json"

const serviceOptions = servicesData.services.map((s) => s.title)
const budgetOptions = ["< $1k", "$1k - $5k", "$5k - $15k", "$15k - $50k", "$50k+", "Not sure"]

// icon map for service tiles
const serviceIcons: Record<string, any> = { Code, Search, Users, Wrench, Rocket, Lightbulb }

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    services: [] as string[],
    buildRequirement: "",
    budget: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ type: "success" | "error"; text: string; waLink?: string } | null>(null)

  const toggleService = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(title) ? prev.services.filter((s) => s !== title) : [...prev.services, title],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setResult(null)
    if (formData.services.length === 0) {
      setResult({ type: "error", text: "Please select at least one service." })
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to send inquiry")

      setResult({
        type: "success",
        text: data.demo
          ? "Inquiry received! Owner will get full details on WhatsApp after bot is configured (demo mode)."
          : "Inquiry sent! Owner got your services + build details on WhatsApp +977 9801024024 ✅",
        waLink: data.waLink,
      })
      setFormData({ name: "", email: "", organization: "", services: [], buildRequirement: "", budget: "", message: "" })
    } catch (err: any) {
      setResult({ type: "error", text: err.message || "Could not send inquiry. Try again." })
    } finally {
      setLoading(false)
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
              Select services, tell us what you want to build — our bot instantly forwards everything to WhatsApp.
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

            <div className="mt-8 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <Send className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-emerald-300 text-sm font-semibold">WhatsApp Bot Active</p>
                <p className="text-emerald-200/70 text-xs leading-relaxed mt-1">
                  Services + build details → instantly to <span className="text-white font-bold">+977 9801024024</span> via bot.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-slate-800/50 border border-cyan-500/20 shadow-2xl shadow-cyan-500/5">
            <div className="flex items-start sm:items-center gap-2 mb-5 sm:mb-6">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 flex-shrink-0 mt-0.5 sm:mt-0" />
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white leading-tight">
                Tell us what to build — bot sends to WhatsApp.
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-white mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-slate-900/50 border-cyan-500/20 focus:border-cyan-500/60 focus:ring-cyan-500/20 text-white placeholder:text-slate-500 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-white mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    required
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

              {/* Services - list */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-white mb-2">
                  Services Interested * <span className="text-slate-500 font-normal">— select one or more</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {serviceOptions.map((title) => {
                    const Icon = serviceIcons[servicesData.services.find((s) => s.title === title)?.icon || "Code"] || Code
                    const active = formData.services.includes(title)
                    return (
                      <button
                        key={title}
                        type="button"
                        onClick={() => toggleService(title)}
                        className={`text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${active ? "bg-cyan-500 text-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/20 scale-[1.01]" : "bg-slate-900/50 text-slate-300 border-cyan-500/20 hover:border-cyan-500/40 hover:text-white"}`}
                      >
                        <Icon className={`h-4 w-4 flex-shrink-0 ${active ? "text-slate-900" : "text-cyan-400"}`} />
                        <span className="leading-tight">{title}</span>
                        {active && <CheckCircle2 className="h-4 w-4 ml-auto text-slate-900 flex-shrink-0" />}
                      </button>
                    )
                  })}
                </div>
                {formData.services.length > 0 && (
                  <p className="text-[11px] text-emerald-300 mt-2">{formData.services.length} selected → will be sent to WhatsApp</p>
                )}
              </div>

              {/* What to build */}
              <div>
                <label htmlFor="buildRequirement" className="block text-xs sm:text-sm font-medium text-white mb-2">
                  What do you want us to build? *
                </label>
                <Textarea
                  id="buildRequirement"
                  placeholder="E.g., E-commerce website with payment gateway, mobile app for delivery, cloud migration..."
                  rows={3}
                  required
                  value={formData.buildRequirement}
                  onChange={(e) => setFormData({ ...formData, buildRequirement: e.target.value })}
                  className="bg-slate-900/50 border-cyan-500/20 focus:border-cyan-500/60 focus:ring-cyan-500/20 text-white placeholder:text-slate-500 resize-none text-sm sm:text-base"
                />
                <p className="text-[11px] text-slate-500 mt-1.5">Min 10 characters — sent as *What to Build* on WhatsApp.</p>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-white mb-2">Estimated Budget</label>
                <Select value={formData.budget} onValueChange={(v) => setFormData({ ...formData, budget: v })}>
                  <SelectTrigger className="bg-slate-900/50 border-cyan-500/20 text-white text-sm sm:text-base">
                    <SelectValue placeholder="Select budget (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetOptions.map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-white mb-2">
                  Additional Details *
                </label>
                <Textarea
                  id="message"
                  placeholder="Timeline, features, reference links..."
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-slate-900/50 border-cyan-500/20 focus:border-cyan-500/60 focus:ring-cyan-500/20 text-white placeholder:text-slate-500 resize-none text-sm sm:text-base"
                />
              </div>

              {result && (
                <div
                  className={`flex gap-3 p-3 rounded-xl border text-sm leading-relaxed ${result.type === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-200" : "bg-red-500/10 border-red-500/20 text-red-200"}`}
                >
                  {result.type === "success" ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p>{result.text}</p>
                    {result.waLink && result.type === "success" && (
                      <a href={result.waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 text-xs font-bold bg-white text-emerald-700 px-3 py-1 rounded-full hover:bg-emerald-50 transition-colors">
                        View WhatsApp preview ↗
                      </a>
                    )}
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-900 font-semibold h-12 sm:h-14 text-sm sm:text-base shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                    Sending to WhatsApp Bot...
                  </>
                ) : (
                  <>
                    Send to WhatsApp Bot
                    <Send className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </>
                )}
              </Button>
              <p className="text-center text-[11px] text-slate-500">Services + Build Details → WhatsApp +977 9801024024 • Encrypted</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
