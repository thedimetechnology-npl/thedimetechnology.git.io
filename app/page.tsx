import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Clients } from "@/components/clients"
import { Stats } from "@/components/stats"
import { Services } from "@/components/services"
import { Process } from "@/components/process"
import { Team } from "@/components/team"
import { Testimonials } from "@/components/testimonials"
import { TechStack } from "@/components/tech-stack"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <Clients />
      <Stats />
      <Services />
      <Process />
      <Team />
      <Testimonials />
      <TechStack />
      <Contact />
      <Footer />
    </main>
  )
}
