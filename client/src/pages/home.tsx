import Navigation from "@/components/navigation";
import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import About from "@/components/sections/about";
import Projects from "@/components/sections/projects";
import Testimonials from "@/components/sections/testimonials";
import Pricing from "@/components/sections/pricing";
import Contact from "@/components/sections/contact";
import Footer from "@/components/footer";
import Chatbot from "@/components/chatbot";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth" data-testid="home-page">
      <Navigation />
      <main>
        <Hero />
        <Services />
        <About />
        <Projects />
        <Testimonials />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
