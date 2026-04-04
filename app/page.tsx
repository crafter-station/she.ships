import { Nav } from "@/components/sections/nav";
import { OrgHero } from "@/components/sections/org-hero";
import { OrgStory } from "@/components/sections/org-story";
import { Programs } from "@/components/sections/programs";
import { Workshops } from "@/components/sections/workshops";
import { LandingUpcomingEvents } from "@/components/sections/landing-upcoming-events";
import { PastEvents } from "@/components/sections/past-events";
import { CommunityJoin } from "@/components/sections/community-join";
import { LandingSponsors } from "@/components/sections/landing-sponsors";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="overflow-x-clip min-w-0">
        <OrgHero />
        <OrgStory />
        <Programs />
        <LandingUpcomingEvents />
        <Workshops />
        <PastEvents />
        <CommunityJoin />
        <LandingSponsors />
        <Footer />
      </main>
    </>
  );
}
