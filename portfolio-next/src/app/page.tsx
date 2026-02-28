import Nav from "@/components/Nav";
import HeroColumns from "@/components/HeroColumns";
import Journey from "@/components/Journey";
import WorkSection from "@/components/WorkSection";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Nav />
      <HeroColumns />
      <Journey />
      <WorkSection />
      <About />
      <Contact />
    </main>
  );
}
