import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import ValuesSection from "../components/sections/ValuesSection";
import ImpactSection from "../components/sections/ImpactSection";
import ProgramsSection from "../components/sections/ProgramsSection";
import DonateSection from "../components/sections/DonateSection";
import AnimatedSection from "../components/sections/AnimatedSection";
import SectionDivider from "../components/layout/SectionDivider";
import ChallengeSection from "@/components/sections/ChallengeSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SectionDivider bgColor="#F8F9F9" flipColor="#FFF" />
      <AnimatedSection delay={100}>
        <AboutSection />
      </AnimatedSection>
      <SectionDivider flip bgColor="#FFF" flipColor="#F8F9F9" />
      <AnimatedSection delay={200}>
        <ChallengeSection />
      </AnimatedSection>
      <SectionDivider flip bgColor="#F7F4F2" flipColor="#FFF" />
      <AnimatedSection delay={300}>
        <ValuesSection />
      </AnimatedSection>
      <SectionDivider bgColor="#eef2ff" flipColor="#F7F4F2" />
      <AnimatedSection delay={500}>
        <ImpactSection />
      </AnimatedSection>
      <SectionDivider flip bgColor="#FFFFFF" flipColor="#eef2ff" />
      <AnimatedSection delay={700}>
        <ProgramsSection />
      </AnimatedSection>
      <SectionDivider bgColor="#e6e8ecff" flipColor="#FFFFFF" />
      <AnimatedSection delay={900}>
        <DonateSection />
      </AnimatedSection>
    </main>
  );
}
