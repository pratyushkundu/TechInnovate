import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$2,999",
      period: "per project",
      features: [
        "Responsive Web Design",
        "SEO Optimization",
        "Basic Analytics",
        "3 Months Support",
        "Content Management"
      ],
      buttonClass: "bg-tech-blue/20 text-tech-blue hover:bg-tech-blue hover:text-white",
      popular: false
    },
    {
      name: "Professional",
      price: "$7,999",
      period: "per project",
      features: [
        "Full-Stack Development",
        "AI Integration",
        "Cloud Deployment",
        "12 Months Support",
        "Advanced Analytics",
        "API Development"
      ],
      buttonClass: "bg-gradient-tech hover:scale-105",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      features: [
        "Custom Solutions",
        "Dedicated Team",
        "Priority Support 24/7",
        "Scalable Architecture",
        "Security Compliance",
        "SLA Guarantee"
      ],
      buttonClass: "bg-tech-cyan/20 text-tech-cyan hover:bg-tech-cyan hover:text-white",
      popular: false
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="py-20 bg-tech-slate/50 dark:bg-tech-slate/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="pricing-title">Flexible Pricing Plans</h2>
          <p className="text-xl text-slate-300 dark:text-slate-300 max-w-3xl mx-auto" data-testid="pricing-description">
            Choose the perfect plan for your business needs. All plans include our expert support and cutting-edge technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`${
                plan.popular 
                  ? "bg-gradient-to-br from-tech-purple/20 to-tech-blue/20 border-2 border-tech-purple/50 hover:border-tech-purple transform scale-105 relative" 
                  : "bg-tech-slate/80 dark:bg-tech-slate/80 backdrop-blur-md border border-slate-700/50 hover:border-tech-blue/50"
              } transition-all duration-300`}
              data-testid={`pricing-plan-${index}`}
            >
              {plan.popular && (
                <Badge 
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-tech px-6 py-2 text-sm font-semibold"
                  data-testid="popular-badge"
                >
                  Most Popular
                </Badge>
              )}
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-foreground" data-testid={`plan-name-${index}`}>
                    {plan.name}
                  </h3>
                  <div className={`text-5xl font-bold mb-2 ${
                    plan.name === 'Professional' ? 'text-tech-purple' : 
                    plan.name === 'Enterprise' ? 'text-tech-cyan' : 'text-tech-blue'
                  }`} data-testid={`plan-price-${index}`}>
                    {plan.price}
                  </div>
                  <div className="text-slate-400 dark:text-slate-400" data-testid={`plan-period-${index}`}>
                    {plan.period}
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center" data-testid={`plan-feature-${index}-${featureIndex}`}>
                      <Check className="w-5 h-5 text-tech-green mr-3 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${plan.buttonClass}`}
                  onClick={() => scrollToSection("contact")}
                  data-testid={`plan-cta-${index}`}
                >
                  {plan.name === 'Starter' ? 'Get Started' : 
                   plan.name === 'Professional' ? 'Start Project' : 'Contact Sales'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
