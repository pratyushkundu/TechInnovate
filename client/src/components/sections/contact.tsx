import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Phone, Mail, MapPin, Linkedin, Twitter, Github } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    projectType: "",
    budget: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.projectType || !formData.budget || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiRequest("POST", "/api/contact", formData);
      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success!",
          description: "Your message has been sent successfully. We'll get back to you soon!",
        });
        
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          projectType: "",
          budget: "",
          description: ""
        });
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      bgColor: "bg-tech-purple/20",
      iconColor: "text-tech-purple"
    },
    {
      icon: Mail,
      title: "Email",
      value: "hello@techflowsolutions.com",
      bgColor: "bg-tech-blue/20",
      iconColor: "text-tech-blue"
    },
    {
      icon: MapPin,
      title: "Office",
      value: "123 Tech Street, Innovation District, CA 94105",
      bgColor: "bg-tech-cyan/20",
      iconColor: "text-tech-cyan"
    }
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", bgColor: "bg-tech-purple/20", hoverColor: "hover:bg-tech-purple/40", iconColor: "text-tech-purple" },
    { icon: Twitter, href: "#", bgColor: "bg-tech-blue/20", hoverColor: "hover:bg-tech-blue/40", iconColor: "text-tech-blue" },
    { icon: Github, href: "#", bgColor: "bg-tech-green/20", hoverColor: "hover:bg-tech-green/40", iconColor: "text-tech-green" }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold" data-testid="contact-title">
              Let's Build Something Amazing Together
            </h2>
            <p className="text-xl text-slate-300 dark:text-slate-300 leading-relaxed" data-testid="contact-description">
              Ready to transform your business? Get in touch with our expert team to discuss your project and discover how we can help you achieve your goals.
            </p>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-4" data-testid={`contact-info-${index}`}>
                  <div className={`w-12 h-12 ${info.bgColor} rounded-xl flex items-center justify-center`}>
                    <info.icon className={`h-6 w-6 ${info.iconColor}`} />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground" data-testid={`contact-info-title-${index}`}>
                      {info.title}
                    </div>
                    <div className="text-slate-300 dark:text-slate-300" data-testid={`contact-info-value-${index}`}>
                      {info.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-12 h-12 ${social.bgColor} rounded-xl flex items-center justify-center ${social.hoverColor} transition-colors duration-300`}
                  data-testid={`social-link-${index}`}
                >
                  <social.icon className={`h-6 w-6 ${social.iconColor}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-tech-slate/80 dark:bg-tech-slate/80 backdrop-blur-md border border-slate-700/50">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">First Name *</label>
                    <Input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="bg-background/50 border-border focus:border-tech-purple"
                      placeholder="John"
                      required
                      data-testid="input-firstName"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Last Name *</label>
                    <Input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="bg-background/50 border-border focus:border-tech-purple"
                      placeholder="Doe"
                      required
                      data-testid="input-lastName"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-background/50 border-border focus:border-tech-purple"
                    placeholder="john@example.com"
                    required
                    data-testid="input-email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Project Type *</label>
                  <Select value={formData.projectType} onValueChange={(value) => handleInputChange("projectType", value)} required>
                    <SelectTrigger className="bg-background/50 border-border focus:border-tech-purple" data-testid="select-projectType">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-development">Web Development</SelectItem>
                      <SelectItem value="mobile-app">Mobile App</SelectItem>
                      <SelectItem value="cloud-solutions">Cloud Solutions</SelectItem>
                      <SelectItem value="ai-integration">AI Integration</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Project Budget *</label>
                  <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)} required>
                    <SelectTrigger className="bg-background/50 border-border focus:border-tech-purple" data-testid="select-budget">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5k-10k">$5K - $10K</SelectItem>
                      <SelectItem value="10k-25k">$10K - $25K</SelectItem>
                      <SelectItem value="25k-50k">$25K - $50K</SelectItem>
                      <SelectItem value="50k+">$50K+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Project Description *</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="bg-background/50 border-border focus:border-tech-purple resize-none"
                    placeholder="Tell us about your project..."
                    rows={4}
                    required
                    data-testid="textarea-description"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-tech py-4 rounded-xl font-semibold hover:scale-105 transition-transform duration-300"
                  data-testid="button-submit"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
