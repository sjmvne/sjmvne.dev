import { AboutSection } from "@/components/sections/about";
import { CertificationsSection } from "@/components/sections/certifications";
import { ContactSection } from "@/components/sections/contact";
import { CvSection } from "@/components/sections/cv";
import { DogsTeaserSection } from "@/components/sections/dogs-teaser";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects";
import { HeroSection } from "@/components/sections/hero";
import { InterestsSection } from "@/components/sections/interests";
import { PhotographySection } from "@/components/sections/photography";
import { SideProjectsSection } from "@/components/sections/side-projects";
import { SkillsSection } from "@/components/sections/skills";
import { TimelineSection } from "@/components/sections/timeline";
import { TravelsSection } from "@/components/sections/travels";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <HeroSection />
        <AboutSection />
        <TimelineSection />
        <SkillsSection />
        <FeaturedProjectsSection />
        <SideProjectsSection />
        <CertificationsSection />
        <TravelsSection />
        <DogsTeaserSection />
        <PhotographySection />
        <InterestsSection />
        <CvSection />
        <ContactSection />
      </main>
    </>
  );
}
