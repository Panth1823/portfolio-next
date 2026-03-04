import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WorkSection from "@/components/WorkSection";
import Journey from "@/components/Journey";
import About from "@/components/About";
import Curiosity from "@/components/Curiosity";
import BeyondWork from "@/components/BeyondWork";
import Polaroid from "@/components/Polaroid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Nav />
      <Hero />
      <WorkSection />
      <Journey />
      <About />
      <Curiosity />
      <BeyondWork />
      <Polaroid />
      <Footer />
    </main>
  );
}
