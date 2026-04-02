import { Nav } from "@/components/sections/nav";
import { LandingHero } from "@/components/sections/landing-hero";
import { LandingAbout } from "@/components/sections/landing-about";
import { LandingUpcomingEvents } from "@/components/sections/landing-upcoming-events";
import { LandingPastEvents } from "@/components/sections/landing-past-events";
import { LandingSponsors } from "@/components/sections/landing-sponsors";
import { LandingCommunity } from "@/components/sections/landing-community";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="overflow-x-clip min-w-0">
        <LandingHero />
        <LandingAbout />
        <LandingUpcomingEvents />
        <LandingPastEvents />
        <LandingSponsors />
        <LandingCommunity />
        <Footer />
      </main>
    </>
  );
}
