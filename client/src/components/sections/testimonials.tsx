import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      rating: 5,
      content: "TechFlow completely transformed our digital presence. The AI integration has automated 60% of our customer service inquiries, and our conversion rates have increased by 250%.",
      name: "Sarah Chen",
      role: "CEO, RetailFlow Inc",
      initials: "SC"
    },
    {
      rating: 5,
      content: "The cloud migration was seamless, and our system performance has improved dramatically. Their 24/7 support team is incredibly responsive and knowledgeable.",
      name: "Michael Rodriguez",
      role: "CTO, DataSync Solutions",
      initials: "MR"
    },
    {
      rating: 5,
      content: "Outstanding mobile app development! The user interface is intuitive, and the performance is flawless. Our user retention has increased by 180% since launch.",
      name: "Amanda Johnson",
      role: "Product Manager, HealthTech Pro",
      initials: "AJ"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="testimonials-title">Client Success Stories</h2>
          <p className="text-xl text-slate-300 dark:text-slate-300 max-w-3xl mx-auto" data-testid="testimonials-description">
            Hear from our satisfied clients about their transformative experiences with TechFlow Solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="bg-tech-slate/80 dark:bg-tech-slate/80 backdrop-blur-md border border-slate-700/50"
              data-testid={`testimonial-card-${index}`}
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="flex text-yellow-400" data-testid={`testimonial-rating-${index}`}>
                    {[...Array(testimonial.rating)].map((_, starIndex) => (
                      <Star key={starIndex} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="ml-3 text-slate-300 dark:text-slate-300">5.0</span>
                </div>
                <p className="text-slate-300 dark:text-slate-300 mb-6 leading-relaxed" data-testid={`testimonial-content-${index}`}>
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-tech rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold" data-testid={`testimonial-initials-${index}`}>
                      {testimonial.initials}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground" data-testid={`testimonial-name-${index}`}>
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-slate-400 dark:text-slate-400" data-testid={`testimonial-role-${index}`}>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
