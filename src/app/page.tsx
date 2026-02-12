import Hero from '@/components/hero/Hero';
import ProfessionalSummary from '@/components/sections/ProfessionalSummary';
import Skills from '@/components/sections/Skills';
import Companies from '@/components/sections/Companies';
import Education from '@/components/sections/Education';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';

export default function Page() {
  return (
    <main>
      <Hero />
      <ProfessionalSummary />
      <Skills />
      <Companies />
      <Projects />
      <Education />
      <Contact />
    </main>
  );
}
