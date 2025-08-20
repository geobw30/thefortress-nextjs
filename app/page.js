import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import ValuesSection from "../components/sections/ValuesSection";
import ImpactSection from "../components/sections/ImpactSection";
import ProgramsSection from "../components/sections/ProgramsSection";
import DonateSection from "../components/sections/DonateSection";
import AnimatedSection from "../components/sections/AnimatedSection";
import SectionDivider from "../components/layout/SectionDivider";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SectionDivider bgColor="#F8F9F9"  flipColor="#f4f5f7ff"/>
      <AnimatedSection delay={100}>
        <AboutSection />
      </AnimatedSection>
      <SectionDivider flip bgColor="#F7F4F2" flipColor="#FAFAFA" />
      <AnimatedSection delay={200}>
        <ValuesSection />
      </AnimatedSection>
      <SectionDivider bgColor="#AF887E" flipColor="#F7F4F2" />
      <AnimatedSection delay={400}>
        <ImpactSection />
      </AnimatedSection>
      <SectionDivider flip bgColor="#FFFFFF" flipColor="#AF887E" />
      <AnimatedSection delay={600}>
        <ProgramsSection />
      </AnimatedSection>
      <SectionDivider bgColor="#e6e8ecff" flipColor="#FFFFFF" />
      <AnimatedSection delay={800}>
        <DonateSection />
      </AnimatedSection>
    </main>
  );
}
