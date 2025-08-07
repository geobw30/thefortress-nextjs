import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import ValuesSection from '../components/sections/ValuesSection'
import ImpactSection from '../components/sections/ImpactSection'
import ProgramsSection from '../components/sections/ProgramsSection'
import DonateSection from '../components/sections/DonateSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ValuesSection />
      <ImpactSection />
      <ProgramsSection />
      <DonateSection />
    </main>
  )
}