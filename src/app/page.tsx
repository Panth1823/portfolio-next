import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WorkSection from "@/components/WorkSection";
import Journey from "@/components/Journey";
import TechStack from "@/components/TechStack";
import About from "@/components/About";
import Curiosity from "@/components/Curiosity";
import BeyondWork from "@/components/BeyondWork";
import Polaroid from "@/components/Polaroid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[var(--bg-primary)] min-h-screen">
      <Nav />
      <Hero />
      <WorkSection />
      <TechStack />
      <Journey />
      <About />
      <Curiosity />
      <BeyondWork />
      <Polaroid />
      <Footer />
    </main>
  );
}
