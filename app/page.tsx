import { Nav } from "@/components/sections/nav"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { GlobalEvent } from "@/components/sections/global-event"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Features } from "@/components/sections/features"
import { CTA } from "@/components/sections/cta"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <GlobalEvent />
        <HowItWorks />
        <Features />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
