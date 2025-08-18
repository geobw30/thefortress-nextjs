import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import ValuesSection from '../components/sections/ValuesSection'
import ImpactSection from '../components/sections/ImpactSection'
import ProgramsSection from '../components/sections/ProgramsSection'
import DonateSection from '../components/sections/DonateSection'
import AnimatedSection from '../components/sections/AnimatedSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AnimatedSection delay={200}>
        <AboutSection />
      </AnimatedSection>
      <AnimatedSection delay={400}>
        <ValuesSection />
      </AnimatedSection>
      <AnimatedSection delay={600}>
        <ImpactSection />
      </AnimatedSection>
      <AnimatedSection delay={800}>
        <ProgramsSection />
      </AnimatedSection>
      <AnimatedSection delay={1000}>
        <DonateSection />
      </AnimatedSection>
    </main>
  )
}