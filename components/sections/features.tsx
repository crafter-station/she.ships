import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Eye, Cpu, Code2, Megaphone, Heart } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Mentorship",
    description:
      "Connect with experienced builders who guide you from idea to launch. At your pace, on your terms.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "A global network of women building together, sharing wins, solving problems, and celebrating every ship.",
  },
  {
    icon: Eye,
    title: "Visibility",
    description:
      "Show your work to an audience that cares. Stand out, get noticed, put your product in front of people.",
  },
  {
    icon: Cpu,
    title: "AI Tools",
    description:
      "Access AI-native platforms to build real products, from UI to backend, without writing code.",
  },
  {
    icon: Code2,
    title: "No Code",
    description:
      "You don't need to be a developer. Our tools and community meet you where you are. Zero prerequisites.",
  },
  {
    icon: Megaphone,
    title: "Ship in Public",
    description:
      "Build in the open. Share your progress, get early feedback, and inspire others while you create.",
  },
];

export function Features() {
  return (
    <SectionWrapper variant="beige" id="features">
      <div className="text-center mb-16">
        <span className="data-label mb-4 block">What You Get</span>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          Everything you need to <span className="text-rose-coral">ship.</span>
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="border-t-4 border-t-rose-coral border-x-warm-beige/50 border-b-warm-beige/50 bg-off-white shadow-sm"
          >
            <CardContent className="pt-6">
              <feature.icon className="mb-4 size-7 text-rose-coral" />
              <h3 className="mb-2 text-lg font-semibold text-charcoal">
                {feature.title}
              </h3>
              <p className="text-charcoal/70 leading-relaxed">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
