import { Code, Linkedin, Twitter, Github } from "lucide-react";

export default function Footer() {
  const footerSections = [
    {
      title: "Services",
      links: [
        "Web Development",
        "Mobile Apps", 
        "Cloud Solutions",
        "AI Integration",
        "Cybersecurity"
      ]
    },
    {
      title: "Company", 
      links: [
        "About Us",
        "Careers",
        "Blog", 
        "Press",
        "Partners"
      ]
    },
    {
      title: "Support",
      links: [
        "Help Center",
        "Documentation",
        "Status",
        "Privacy Policy", 
        "Terms of Service"
      ]
    }
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", color: "hover:text-tech-purple" },
    { icon: Twitter, href: "#", color: "hover:text-tech-blue" },
    { icon: Github, href: "#", color: "hover:text-tech-green" }
  ];

  return (
    <footer className="bg-tech-dark dark:bg-tech-dark border-t border-slate-700/50 py-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-tech rounded-lg flex items-center justify-center">
                <Code className="text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-tech bg-clip-text text-transparent">
                TechFlow
              </span>
            </div>
            <p className="text-slate-400 dark:text-slate-400" data-testid="footer-description">
              Transforming businesses through innovative technology solutions and exceptional digital experiences.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`text-slate-400 dark:text-slate-400 ${social.color} transition-colors duration-300`}
                  data-testid={`footer-social-${index}`}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="font-bold mb-4 text-foreground" data-testid={`footer-section-title-${sectionIndex}`}>
                {section.title}
              </h3>
              <ul className="space-y-2 text-slate-400 dark:text-slate-400">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="hover:text-white dark:hover:text-white transition-colors duration-300"
                      data-testid={`footer-link-${sectionIndex}-${linkIndex}`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-700/50 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 dark:text-slate-400" data-testid="footer-copyright">
            © 2024 TechFlow Solutions. All rights reserved.
          </p>
          <p className="text-slate-400 dark:text-slate-400 text-sm mt-4 md:mt-0" data-testid="footer-tagline">
            Designed and developed with <span className="text-red-500">♥</span> for the future of technology
          </p>
        </div>
      </div>
    </footer>
  );
}
