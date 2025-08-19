import { Card, CardContent } from "@/components/ui/card";
import { Code, Cloud, Bot, Smartphone, Shield, Headphones, Check } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom web applications built with modern frameworks like React, Next.js, and Node.js for optimal performance.",
      gradient: "from-tech-purple to-tech-blue",
      borderColor: "hover:border-tech-purple/50",
      features: ["Responsive Design", "SEO Optimization", "Performance Tuning"]
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure on AWS, Azure, and GCP with automated deployment and monitoring.",
      gradient: "from-tech-cyan to-tech-blue",
      borderColor: "hover:border-tech-cyan/50",
      features: ["Auto-scaling", "24/7 Monitoring", "Disaster Recovery"]
    },
    {
      icon: Bot,
      title: "AI Integration",
      description: "Intelligent automation and AI-powered features to streamline operations and enhance user experience.",
      gradient: "from-tech-green to-tech-cyan",
      borderColor: "hover:border-tech-green/50",
      features: ["Chatbot Development", "Process Automation", "Data Analytics"]
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications for iOS and Android with seamless user experiences.",
      gradient: "from-tech-purple to-tech-blue",
      borderColor: "hover:border-tech-purple/50",
      features: ["Native iOS/Android", "React Native", "App Store Optimization"]
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Comprehensive security audits, penetration testing, and implementation of robust security measures.",
      gradient: "from-tech-cyan to-tech-green",
      borderColor: "hover:border-tech-cyan/50",
      features: ["Security Audits", "Threat Detection", "Compliance"]
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock technical support and maintenance to ensure your systems run smoothly.",
      gradient: "from-tech-blue to-tech-purple",
      borderColor: "hover:border-tech-blue/50",
      features: ["24/7 Monitoring", "Rapid Response", "Preventive Maintenance"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-tech-slate/50 dark:bg-tech-slate/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="services-title">Our Services</h2>
          <p className="text-xl text-slate-300 dark:text-slate-300 max-w-3xl mx-auto" data-testid="services-description">
            Comprehensive IT solutions tailored to your business needs, powered by cutting-edge technology and expert knowledge.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className={`bg-tech-slate/80 dark:bg-tech-slate/80 backdrop-blur-md border border-slate-700/50 ${service.borderColor} transition-all duration-300 hover:scale-105`}
              data-testid={`service-card-${index}`}
            >
              <CardContent className="p-8">
                <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6`}>
                  <service.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground" data-testid={`service-title-${index}`}>
                  {service.title}
                </h3>
                <p className="text-slate-300 dark:text-slate-300 mb-6" data-testid={`service-description-${index}`}>
                  {service.description}
                </p>
                <ul className="text-sm text-slate-400 dark:text-slate-400 space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center" data-testid={`service-feature-${index}-${featureIndex}`}>
                      <Check className="w-4 h-4 text-tech-green mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
