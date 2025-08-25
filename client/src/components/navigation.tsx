// import { useState, useEffect } from "react";
// import { Link, useLocation } from "wouter";
// import { Button } from "@/components/ui/button";
// import { useTheme } from "@/components/theme-provider";
// import { Moon, Sun, Menu, X, Code } from "lucide-react";

// export default function Navigation() {
//   const [location] = useLocation();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { theme, setTheme } = useTheme();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 100);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToSection = (sectionId: string) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//     setIsMobileMenuOpen(false);
//   };

//   const navItems = [
//     { id: "services", label: "Services" },
//     { id: "about", label: "About" },
//     { id: "projects", label: "Projects" },
//     { id: "testimonials", label: "Reviews" },
//     { id: "pricing", label: "Pricing" },
//     { id: "contact", label: "Contact" },
//   ];

//   return (
//     <nav 
//       className={`fixed w-full top-0 z-50 transition-all duration-300 ${
//         isScrolled 
//           ? "bg-tech-dark/80 dark:bg-tech-dark/80 backdrop-blur-md border-b border-slate-700/50" 
//           : "bg-transparent"
//       }`}
//       data-testid="navigation"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center py-4">
//           {/* Logo */}
//           <Link href="/" className="flex items-center space-x-3" data-testid="logo-link">
//             <div className="w-10 h-10 bg-gradient-tech rounded-lg flex items-center justify-center">
//               <Code className="text-white text-lg" />
//             </div>
//             <span className="text-2xl font-bold bg-gradient-tech bg-clip-text text-transparent">
//   Hukitola
//             </span>
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => scrollToSection(item.id)}
//                 className="text-foreground hover:text-tech-blue transition-colors duration-300"
//                 data-testid={`nav-${item.id}`}
//               >
//                 {item.label}
//               </button>
//             ))}
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setTheme(theme === "light" ? "dark" : "light")}
//               className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors duration-300"
//               data-testid="theme-toggle"
//             >
//               {/* {theme === "light" ? (
//                 <Moon className="h-5 w-5" />
//               ) : (
//                 <Sun className="h-5 w-5" />
//               )} */}
//                {/* <Moon className="h-5 w-5" /> */}
//             </Button>
//             <Button 
//               className="bg-gradient-tech hover:scale-105 transition-transform duration-300 font-medium"
//               onClick={() => scrollToSection("contact")}
//               data-testid="cta-button"
//             >
//               Get Started
//             </Button>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center space-x-2">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setTheme(theme === "light" ? "dark" : "light")}
//               className="p-2 rounded-lg hover:bg-slate-700/50"
//               data-testid="mobile-theme-toggle"
//             >
//               {/* {theme === "light" ? (
//                 <Moon className="h-5 w-5" />
//               ) : (
//                 <Sun className="h-5 w-5" />
//               )} */}
//             </Button>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="p-2 rounded-lg hover:bg-slate-700/50"
//               data-testid="mobile-menu-toggle"
//             >
//               {isMobileMenuOpen ? (
//                 <X className="h-5 w-5" />
//               ) : (
//                 <Menu className="h-5 w-5" />
//               )}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden pb-4 border-t border-slate-700/50 backdrop-blur-md" data-testid="mobile-menu">
//             <div className="flex flex-col space-y-4 pt-4">
//               {navItems.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => scrollToSection(item.id)}
//                   className="text-left text-foreground hover:text-tech-blue transition-colors duration-300"
//                   data-testid={`mobile-nav-${item.id}`}
//                 >
//                   {item.label}
//                 </button>
//               ))}
//               <Button 
//                 className="bg-gradient-tech mt-4 font-medium"
//                 onClick={() => scrollToSection("contact")}
//                 data-testid="mobile-cta-button"
//               >
//                 Get Started
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }


import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun, Menu, X, Code } from "lucide-react";

export default function Navigation() {
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "testimonials", label: "Reviews" },
    { id: "pricing", label: "Pricing" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (sectionId: string) => {
    if (location !== "/") {
      // Go to homepage first, then scroll
      setLocation("/"); 
      // Scroll after a short delay to allow Home component to render
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-tech-dark/80 dark:bg-tech-dark/80 backdrop-blur-md border-b border-slate-700/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-tech rounded-lg flex items-center justify-center">
              <Code className="text-white text-lg" />
            </div>
            <span className="text-2xl font-bold bg-gradient-tech bg-clip-text text-transparent">
              Hukitola
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-foreground hover:text-tech-blue transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {/* Theme icon */}
            </Button>

            <Button
              className="bg-gradient-tech hover:scale-105 transition-transform duration-300 font-medium"
              onClick={() => handleNavClick("contact")}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {/* Theme icon */}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-slate-700/50 backdrop-blur-md">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="text-left text-foreground hover:text-tech-blue transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
              <Button
                className="bg-gradient-tech mt-4 font-medium"
                onClick={() => handleNavClick("contact")}
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
