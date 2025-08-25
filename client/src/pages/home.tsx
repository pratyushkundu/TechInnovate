// import Navigation from "@/components/navigation";
// import Hero from "@/components/sections/hero";
// import Services from "@/components/sections/services";
// import About from "@/components/sections/about";
// import Projects from "@/components/sections/projects";
// import Testimonials from "@/components/sections/testimonials";
// import Pricing from "@/components/sections/pricing";
// import Contact from "@/components/sections/contact";
// import Footer from "@/components/footer";
// import Chatbot from "@/components/chatbot";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-background text-foreground scroll-smooth" data-testid="home-page">
//       <Navigation />
//       <main>
//         <Hero />
//         <Services />
//         <About />
//         <Projects />
//         <Testimonials />
//         <Pricing />
//         <Contact />
//       </main>
//       <Footer />
//       <Chatbot />
//     </div>
//   );
// }


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
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      <Helmet>
        {/* Primary SEO */}
        <title>Hukitola Solutions - Premier IT & Technology Services</title>
        <meta
          name="description"
          content="Hukitola Solutions offers Web Development, Blockchain, AI Integration, SEO, Mobile Apps, E-Commerce & more. Contact us for consultation."
        />
        <link rel="canonical" href="https://www.hukitola.com" />

        {/* Open Graph */}
        <meta property="og:title" content="Hukitola Solutions - Premier IT & Technology Services" />
        <meta
          property="og:description"
          content="We offer Web Development, Blockchain, AI Integration, SEO, Mobile Apps, E-Commerce & more. Contact us for consultation."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.hukitola.com" />
        <meta property="og:image" content="/logo.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hukitola Solutions - Premier IT & Technology Services" />
        <meta
          name="twitter:description"
          content="We offer Web Development, Blockchain, AI Integration, SEO, Mobile Apps, E-Commerce & more. Contact us for consultation."
        />
        <meta name="twitter:image" content="/logo.jpg" />

        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Hukitola Solutions",
            "url": "https://www.hukitola.com",
            "logo": "https://www.hukitola.com/logo.jpg",
            "sameAs": [
              "https://www.linkedin.com/company/hukitola-solutions",
              "https://twitter.com/hukitola"
            ]
          })}
        </script>
      </Helmet>

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
