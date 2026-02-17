import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Button } from "@/components/ui/button";

export default function SponsorPage() {
  const tiers = [
    {
      icon: "💎",
      name: "Platinum",
      price: "$2,500 USD",
      color: "bg-secondary-purple",
      benefits: [
        "Everything in Gold +",
        'Event naming: "SheShips powered by [Brand]"',
        "Main logo on all branding",
        "Opening keynote (10 min)",
        "Sponsor-named award category",
      ],
    },
    {
      icon: "🥇",
      name: "Gold",
      price: "$1,500 USD",
      color: "bg-sunny-yellow",
      benefits: [
        "Featured logo on all communications (social media, landing page, livestream, speaker backgrounds)",
        "Mention during opening and closing",
        "40-45 min talk or workshop on the agenda",
        "Access to participant database (with consent)",
        "Dedicated social media post",
        "Logo on communications (digital brochures, certificates)",
      ],
    },
    {
      icon: "🥈",
      name: "Silver",
      price: "$500 USD",
      color: "bg-neutral-light",
      benefits: [
        "Logo on landing page and social media",
        "Mention during the event",
        "Logo on communications (digital brochures)",
        "Mention in thank you post",
      ],
    },
  ];

  return (
    <>
      <Nav />
      <main>
        <SectionWrapper
          variant="pink"
          className="min-h-[60vh] flex items-center"
        >
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-[family-name:var(--font-title)] text-6xl font-black tracking-tight text-primary-black md:text-7xl lg:text-8xl uppercase mb-6">
              Be a <span className="text-white">Sponsor</span>
            </h1>
            <p className="text-2xl text-primary-black/90 mb-10 font-medium">
              Support 200 women builders and help make She Ships possible.
              Partner with us to empower the next generation of creators.
            </p>
            <Button asChild variant="default" size="lg">
              <a
                href="https://luma.com/ytl522gp"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply as Sponsor
              </a>
            </Button>
          </div>
        </SectionWrapper>

        <SectionWrapper variant="cream" bordered className="!bg-[#FAF9F6]">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-[family-name:var(--font-title)] text-5xl font-black text-primary-black uppercase mb-4 text-center md:text-6xl">
              Sponsorship Tiers
            </h2>
            <p className="text-center text-xl text-primary-black/70 mb-16">
              Choose the package that best fits your goals
            </p>

            <div className="space-y-8">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`${tier.color} border-4 border-primary-black p-8 md:p-10`}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-5xl">{tier.icon}</span>
                        <h3 className="font-[family-name:var(--font-title)] text-4xl font-black text-primary-black uppercase">
                          {tier.name}
                        </h3>
                      </div>
                      <p className="font-[family-name:var(--font-title)] text-3xl font-bold text-primary-black">
                        {tier.price}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-2 h-2 bg-primary-black mt-2"></span>
                        <span className="text-lg text-primary-black font-medium">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <div className="inline-block bg-white border-4 border-primary-black p-8 max-w-2xl">
                <h3 className="font-[family-name:var(--font-title)] text-2xl font-black text-primary-black uppercase mb-4">
                  Custom Packages
                </h3>
                <p className="text-lg text-primary-black/80 mb-6">
                  Need a custom sponsorship package? We're happy to work with
                  you to create a partnership that aligns with your goals.
                </p>
                <Button asChild variant="pink" size="lg">
                  <a
                    href="https://luma.com/ytl522gp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contact Us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
