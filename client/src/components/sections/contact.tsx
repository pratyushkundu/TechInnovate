// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Card, CardContent } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";
// import { apiRequest } from "@/lib/queryClient";
// import { Phone, Mail, MapPin, Linkedin, Twitter, Github } from "lucide-react";

// export default function Contact() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     projectType: "",
//     budget: "",
//     description: ""
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { toast } = useToast();

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.firstName || !formData.lastName || !formData.email || !formData.projectType || !formData.budget || !formData.description) {
//       toast({
//         title: "Error",
//         description: "Please fill in all required fields.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const response = await apiRequest("POST", "/api/contact", formData);
//       const data = await response.json();

//       if (data.success) {
//         toast({
//           title: "Success!",
//           description: "Your message has been sent successfully. We'll get back to you soon!",
//         });

//         // Reset form
//         setFormData({
//           firstName: "",
//           lastName: "",
//           email: "",
//           projectType: "",
//           budget: "",
//           description: ""
//         });
//       } else {
//         throw new Error(data.message || "Failed to send message");
//       }
//     } catch (error) {
//       console.error("Contact form error:", error);
//       toast({
//         title: "Error",
//         description: "Failed to send message. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const contactInfo = [
//     {
//       icon: Phone,
//       title: "Phone",
//       value: "+91 9078064335",
//       bgColor: "bg-tech-purple/20",
//       iconColor: "text-tech-purple"
//     },
//     {
//       icon: Mail,
//       title: "Email",
//       value: "info@hukitola.com",
//       bgColor: "bg-tech-blue/20",
//       iconColor: "text-tech-blue"
//     },
//     {
//       icon: MapPin,
//       title: "Office",
//       value: "Bhubaneswar,Odisha",
//       bgColor: "bg-tech-cyan/20",
//       iconColor: "text-tech-cyan"
//     }
//   ];

//   const socialLinks = [
//     { icon: Linkedin, href: "#", bgColor: "bg-tech-purple/20", hoverColor: "hover:bg-tech-purple/40", iconColor: "text-tech-purple" },
//     { icon: Twitter, href: "#", bgColor: "bg-tech-blue/20", hoverColor: "hover:bg-tech-blue/40", iconColor: "text-tech-blue" },
//     { icon: Github, href: "#", bgColor: "bg-tech-green/20", hoverColor: "hover:bg-tech-green/40", iconColor: "text-tech-green" }
//   ];

//   return (
//     <section id="contact" className="py-20 bg-gradient-hero">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-12">
//           <div className="space-y-8">
//             <h2 className="text-4xl lg:text-5xl font-bold" data-testid="contact-title">
//               Let's Build Something Amazing Together
//             </h2>
//             <p className="text-xl text-slate-300 dark:text-slate-300 leading-relaxed" data-testid="contact-description">
//               Ready to transform your business? Get in touch with our expert team to discuss your project and discover how we can help you achieve your goals.
//             </p>

//             <div className="space-y-6">
//               {contactInfo.map((info, index) => (
//                 <div key={index} className="flex items-center space-x-4" data-testid={`contact-info-${index}`}>
//                   <div className={`w-12 h-12 ${info.bgColor} rounded-xl flex items-center justify-center`}>
//                     <info.icon className={`h-6 w-6 ${info.iconColor}`} />
//                   </div>
//                   <div>
//                     <div className="font-semibold text-foreground" data-testid={`contact-info-title-${index}`}>
//                       {info.title}
//                     </div>
//                     <div className="text-slate-300 dark:text-slate-300" data-testid={`contact-info-value-${index}`}>
//                       {info.value}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="flex space-x-4">
//               {socialLinks.map((social, index) => (
//                 <a
//                   key={index}
//                   href={social.href}
//                   className={`w-12 h-12 ${social.bgColor} rounded-xl flex items-center justify-center ${social.hoverColor} transition-colors duration-300`}
//                   data-testid={`social-link-${index}`}
//                 >
//                   <social.icon className={`h-6 w-6 ${social.iconColor}`} />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Contact Form */}
//           <Card className="bg-tech-slate/80 dark:bg-tech-slate/80 backdrop-blur-md border border-slate-700/50">
//             <CardContent className="p-8">
//               <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium mb-2 text-foreground">First Name *</label>
//                     <Input
//                       type="text"
//                       value={formData.firstName}
//                       onChange={(e) => handleInputChange("firstName", e.target.value)}
//                       className="bg-background/50 border-border focus:border-tech-purple"
//                       placeholder="John"
//                       required
//                       data-testid="input-firstName"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2 text-foreground">Last Name *</label>
//                     <Input
//                       type="text"
//                       value={formData.lastName}
//                       onChange={(e) => handleInputChange("lastName", e.target.value)}
//                       className="bg-background/50 border-border focus:border-tech-purple"
//                       placeholder="Doe"
//                       required
//                       data-testid="input-lastName"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-foreground">Email *</label>
//                   <Input
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => handleInputChange("email", e.target.value)}
//                     className="bg-background/50 border-border focus:border-tech-purple"
//                     placeholder="john@example.com"
//                     required
//                     data-testid="input-email"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-foreground">Project Type *</label>
//                   <Select value={formData.projectType} onValueChange={(value) => handleInputChange("projectType", value)} required>
//                     <SelectTrigger className="bg-background/50 border-border focus:border-tech-purple" data-testid="select-projectType">
//                       <SelectValue placeholder="Select a service" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="web-development">Web Development</SelectItem>
//                       <SelectItem value="mobile-app">Mobile App</SelectItem>
//                       <SelectItem value="cloud-solutions">Cloud Solutions</SelectItem>
//                       <SelectItem value="ai-integration">AI Integration</SelectItem>
//                       <SelectItem value="other">Other</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-foreground">Project Budget *</label>
//                   <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)} required>
//                     <SelectTrigger className="bg-background/50 border-border focus:border-tech-purple" data-testid="select-budget">
//                       <SelectValue placeholder="Select budget range" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="5k-10k">$5K - $10K</SelectItem>
//                       <SelectItem value="10k-25k">$10K - $25K</SelectItem>
//                       <SelectItem value="25k-50k">$25K - $50K</SelectItem>
//                       <SelectItem value="50k+">$50K+</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-foreground">Project Description *</label>
//                   <Textarea
//                     value={formData.description}
//                     onChange={(e) => handleInputChange("description", e.target.value)}
//                     className="bg-background/50 border-border focus:border-tech-purple resize-none"
//                     placeholder="Tell us about your project..."
//                     rows={4}
//                     required
//                     data-testid="textarea-description"
//                   />
//                 </div>

//                 <Button 
//                   type="submit" 
//                   disabled={isSubmitting}
//                   className="w-full bg-gradient-tech py-4 rounded-xl font-semibold hover:scale-105 transition-transform duration-300"
//                   data-testid="button-submit"
//                 >
//                   {isSubmitting ? "Sending..." : "Send Message"}
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </section>
//   );
// }
// <-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Card, CardContent } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";
// import { apiRequest } from "@/lib/queryClient";
// import { Phone, Mail, MapPin, Linkedin, Twitter, Github } from "lucide-react";

// export default function Contact() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     projectType: "",
//     budget: "",
//     description: ""
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { toast } = useToast();

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.firstName || !formData.lastName || !formData.email || !formData.projectType || !formData.budget || !formData.description) {
//       toast({
//         title: "Error",
//         description: "Please fill in all required fields.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const response = await apiRequest("POST", "/api/contact", formData);
//       const data = await response.json();

//       if (data.success) {
//         toast({
//           title: "Success!",
//           description: "Your message has been sent successfully. We'll get back to you soon!",
//         });

//         // Reset form
//         setFormData({
//           firstName: "",
//           lastName: "",
//           email: "",
//           projectType: "",
//           budget: "",
//           description: ""
//         });
//       } else {
//         throw new Error(data.message || "Failed to send message");
//       }
//     } catch (error) {
//       console.error("Contact form error:", error);
//       toast({
//         title: "Error",
//         description: "Failed to send message. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const contactInfo = [
//     {
//       icon: Phone,
//       title: "Phone",
//       value: "+91 9078064335",
//       bgColor: "bg-tech-purple/20",
//       iconColor: "text-tech-purple"
//     },
//     {
//       icon: Mail,
//       title: "Email",
//       value: "hukitola.dev@gmail.com | info@hukitola.com ",
//       bgColor: "bg-tech-blue/20",
//       iconColor: "text-tech-blue"
//     },
//     {
//       icon: MapPin,
//       title: "Office",
//       value: "Bhubaneswar, Odisha",
//       bgColor: "bg-tech-cyan/20",
//       iconColor: "text-tech-cyan"
//     }
//   ];

//   const socialLinks = [
//     { icon: Linkedin, href: "https://www.linkedin.com/company/hukitola09/?viewAsMember=true", bgColor: "bg-tech-purple/20", hoverColor: "hover:bg-tech-purple/40", iconColor: "text-tech-purple" },
//     { icon: Twitter, href: "#", bgColor: "bg-tech-blue/20", hoverColor: "hover:bg-tech-blue/40", iconColor: "text-tech-blue" },
//     { icon: Github, href: "https://github.com/pratyushkundu", bgColor: "bg-tech-green/20", hoverColor: "hover:bg-tech-green/40", iconColor: "text-tech-green" }
//   ];

//   return (
//     <section id="contact" className="py-20 bg-gradient-hero">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-12">
//           <div className="space-y-8">
//             <h2 className="text-4xl lg:text-5xl font-bold" data-testid="contact-title">
//               Let's Build Something Amazing Together
//             </h2>
//             <p className="text-xl text-slate-300 dark:text-slate-300 leading-relaxed" data-testid="contact-description">
//               Ready to transform your business? Get in touch with our expert team to discuss your project and discover how we can help you achieve your goals.
//             </p>

//             <div className="space-y-6">
//               {contactInfo.map((info, index) => (
//                 <div key={index} className="flex items-center space-x-4" data-testid={`contact-info-${index}`}>
//                   <div className={`w-12 h-12 ${info.bgColor} rounded-xl flex items-center justify-center`}>
//                     <info.icon className={`h-6 w-6 ${info.iconColor}`} />
//                   </div>
//                   <div>
//                     <div className="font-semibold text-foreground" data-testid={`contact-info-title-${index}`}>
//                       {info.title}
//                     </div>
//                     <div className="text-slate-300 dark:text-slate-300" data-testid={`contact-info-value-${index}`}>
//                       {info.value}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="flex space-x-4">
//               {socialLinks.map((social, index) => (
//                 <a
//                   key={index}
//                      target="_blank"    
//                   href={social.href}
//                   className={`w-12 h-12 ${social.bgColor} rounded-xl flex items-center justify-center ${social.hoverColor} transition-colors duration-300`}
//                   data-testid={`social-link-${index}`}
//                 >
//                   <social.icon className={`h-6 w-6 ${social.iconColor}`} />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Contact Form */}
//           <Card className="bg-tech-slate/80 dark:bg-tech-slate/80 backdrop-blur-md border border-slate-700/50">
//             <CardContent className="p-8">
//               <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium mb-2 text-foreground">First Name *</label>
//                     <Input
//                       type="text"
//                       value={formData.firstName}
//                       onChange={(e) => handleInputChange("firstName", e.target.value)}
//                       className="bg-slate-900/80 border-slate-600 text-white placeholder:text-slate-400 focus:border-tech-purple focus:ring-1 focus:ring-tech-purple"
//                       placeholder="John"
//                       required
//                       data-testid="input-firstName"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2 text-foreground">Last Name *</label>
//                     <Input
//                       type="text"
//                       value={formData.lastName}
//                       onChange={(e) => handleInputChange("lastName", e.target.value)}
//                       className="bg-slate-900/80 border-slate-600 text-white placeholder:text-slate-400 focus:border-tech-purple focus:ring-1 focus:ring-tech-purple"
//                       placeholder="Doe"
//                       required
//                       data-testid="input-lastName"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-foreground">Email *</label>
//                   <Input
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => handleInputChange("email", e.target.value)}
//                     className="bg-slate-900/80 border-slate-600 text-white placeholder:text-slate-400 focus:border-tech-purple focus:ring-1 focus:ring-tech-purple"
//                     placeholder="john@example.com"
//                     required
//                     data-testid="input-email"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-foreground">Project Type *</label>
//                   <Select value={formData.projectType} onValueChange={(value) => handleInputChange("projectType", value)} required>
//                     <SelectTrigger className="bg-slate-900/80 border-slate-600 text-white focus:border-tech-purple focus:ring-1 focus:ring-tech-purple" data-testid="select-projectType">
//                       <SelectValue placeholder="Select a service" className="placeholder:text-slate-400" />
//                     </SelectTrigger>
//                     <SelectContent className="bg-slate-900 border-slate-600">
//                       <SelectItem value="web-development" className="text-white hover:bg-slate-800">Web Development</SelectItem>
//                       <SelectItem value="mobile-app" className="text-white hover:bg-slate-800">Mobile App</SelectItem>
//                       <SelectItem value="cloud-solutions" className="text-white hover:bg-slate-800">Cloud Solutions</SelectItem>
//                       <SelectItem value="ai-integration" className="text-white hover:bg-slate-800">AI Integration</SelectItem>
//                       <SelectItem value="other" className="text-white hover:bg-slate-800">Other</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-foreground">Project Budget *</label>
//                   <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)} required>
//                     <SelectTrigger className="bg-slate-900/80 border-slate-600 text-white focus:border-tech-purple focus:ring-1 focus:ring-tech-purple" data-testid="select-budget">
//                       <SelectValue placeholder="Select budget range" className="placeholder:text-slate-400" />
//                     </SelectTrigger>
//                     <SelectContent className="bg-slate-900 border-slate-600">
//                       <SelectItem value="5k-10k" className="text-white hover:bg-slate-800">$5K - $10K</SelectItem>
//                       <SelectItem value="10k-25k" className="text-white hover:bg-slate-800">$10K - $25K</SelectItem>
//                       <SelectItem value="25k-50k" className="text-white hover:bg-slate-800">$25K - $50K</SelectItem>
//                       <SelectItem value="50k+" className="text-white hover:bg-slate-800">$50K+</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-foreground">Project Description *</label>
//                   <Textarea
//                     value={formData.description}
//                     onChange={(e) => handleInputChange("description", e.target.value)}
//                     className="bg-slate-900/80 border-slate-600 text-white placeholder:text-slate-400 focus:border-tech-purple focus:ring-1 focus:ring-tech-purple resize-none"
//                     placeholder="Tell us about your project..."
//                     rows={4}
//                     required
//                     data-testid="textarea-description"
//                   />
//                 </div>

//                 <Button 
//                   type="submit" 
//                   disabled={isSubmitting}
//                   className="w-full bg-gradient-tech py-4 rounded-xl font-semibold hover:scale-105 transition-transform duration-300"
//                   data-testid="button-submit"
//                 >
//                   {isSubmitting ? "Sending..." : "Send Message"}
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </section>
//   );
// }

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Card, CardContent } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";
// import { apiRequest } from "@/lib/queryClient";
// import { Phone, Mail, MapPin, Linkedin, Twitter, Github } from "lucide-react";
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"; // Shadcn toggle group

// export default function Contact() {
//   const [formType, setFormType] = useState<"client" | "developer">("client"); // default client

//   const [formData, setFormData] = useState<any>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     projectType: "",
//     budget: "",
//     description: "",
//     experience: "",
//     expertise: "",
//     resume: null,
//     proposal: "",
//     biddingBudget: ""
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { toast } = useToast();

//   const handleInputChange = (field: string, value: any) => {
//     setFormData((prev: any) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Basic validation depending on form type
//     if (formType === "client") {
//       if (!formData.firstName || !formData.lastName || !formData.email || !formData.projectType || !formData.budget || !formData.description) {
//         toast({ title: "Error", description: "Please fill in all required fields.", variant: "destructive" });
//         return;
//       }
//     } else {
//       if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.experience || !formData.expertise || !formData.proposal) {
//         toast({ title: "Error", description: "Please fill in all required developer fields.", variant: "destructive" });
//         return;
//       }
//     }

//     setIsSubmitting(true);

//     try {
//       const payload = { ...formData, formType };
//       const response = formType === 'client' ? await apiRequest("POST", "/api/contact/client", payload):await apiRequest("POST", "/api/contact/developer", payload)
//       const data = await response.json();

//       if (data.success) {
//         toast({
//           title: "Success!",
//           description: "Your message has been sent successfully. We'll get back to you soon!",
//         });
//         setFormData({
//           firstName: "", lastName: "", email: "", phone: "", projectType: "",
//           budget: "", description: "", experience: "", expertise: "", resume: null,
//           proposal: "", biddingBudget: ""
//         });
//       } else throw new Error(data.message || "Failed to send message");
//     } catch (error) {
//       console.error("Contact form error:", error);
//       toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };


//   const contactInfo = [
//     {
//       icon: Phone,
//       title: "Phone",
//       value: "+91 9078064335",
//       bgColor: "bg-tech-purple/20",
//       iconColor: "text-tech-purple"
//     },
//     {
//       icon: Mail,
//       title: "Email",
//       value: "hukitola.dev@gmail.com | info@hukitola.com ",
//       bgColor: "bg-tech-blue/20",
//       iconColor: "text-tech-blue"
//     },
//     {
//       icon: MapPin,
//       title: "Office",
//       value: "Bhubaneswar, Odisha",
//       bgColor: "bg-tech-cyan/20",
//       iconColor: "text-tech-cyan"
//     }
//   ];

//   const socialLinks = [
//     { icon: Linkedin, href: "https://www.linkedin.com/company/hukitola09/?viewAsMember=true", bgColor: "bg-tech-purple/20", hoverColor: "hover:bg-tech-purple/40", iconColor: "text-tech-purple" },
//     { icon: Twitter, href: "#", bgColor: "bg-tech-blue/20", hoverColor: "hover:bg-tech-blue/40", iconColor: "text-tech-blue" },
//     { icon: Github, href: "https://github.com/pratyushkundu", bgColor: "bg-tech-green/20", hoverColor: "hover:bg-tech-green/40", iconColor: "text-tech-green" }
//   ];

//   return (
//     <section id="contact" className="py-20 bg-gradient-hero">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-12">
//           {/* LEFT SIDE */}
//           <div className="space-y-8">
//             <h2 className="text-4xl lg:text-5xl font-bold" data-testid="contact-title">
//               Let&apos;s Build Something Amazing Together
//             </h2>
//             <p
//               className="text-xl text-slate-300 dark:text-slate-300 leading-relaxed"
//               data-testid="contact-description"
//             >
//               Ready to transform your business? Get in touch with our expert team to
//               discuss your project and discover how we can help you achieve your goals.
//             </p>

//             {/* Contact Info */}
//             <div className="space-y-6">
//               {contactInfo.map((info, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center space-x-4"
//                   data-testid={`contact-info-${index}`}
//                 >
//                   <div
//                     className={`w-12 h-12 ${info.bgColor} rounded-xl flex items-center justify-center`}
//                   >
//                     <info.icon className={`h-6 w-6 ${info.iconColor}`} />
//                   </div>
//                   <div>
//                     <div
//                       className="font-semibold text-foreground"
//                       data-testid={`contact-info-title-${index}`}
//                     >
//                       {info.title}
//                     </div>
//                     <div
//                       className="text-slate-300 dark:text-slate-300"
//                       data-testid={`contact-info-value-${index}`}
//                     >
//                       {info.value}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Social Links */}
//             <div className="flex space-x-4">
//               {socialLinks.map((social, index) => (
//                 <a
//                   key={index}
//                   target="_blank"
//                   href={social.href}
//                   className={`w-12 h-12 ${social.bgColor} rounded-xl flex items-center justify-center ${social.hoverColor} transition-colors duration-300`}
//                   data-testid={`social-link-${index}`}
//                 >
//                   <social.icon className={`h-6 w-6 ${social.iconColor}`} />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* RIGHT SIDE (Form with Toggle) */}
//           <Card className="bg-tech-slate/80 backdrop-blur-md border border-slate-700/50">
//             <CardContent className="p-8">
//               {/* Toggle Inside Card */}
//               <div className="flex justify-center mb-6">
//                 <ToggleGroup
//                   type="single"
//                   value={formType}
//                   onValueChange={(val) => setFormType(val as any)}
//                   className="gap-2"
//                 >
//                   <ToggleGroupItem
//                     value="client"
//                     className="px-4 py-2 rounded-xl data-[state=on]:bg-tech-purple/80 data-[state=on]:text-white"
//                   >
//                     Client
//                   </ToggleGroupItem>
//                   <ToggleGroupItem
//                     value="developer"
//                     className="px-4 py-2 rounded-xl data-[state=on]:bg-tech-blue/80 data-[state=on]:text-white"
//                   >
//                     Developer
//                   </ToggleGroupItem>
//                 </ToggleGroup>
//               </div>

//               {/* FORM */}
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Common Fields */}
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium mb-2 text-foreground">
//                       First Name *
//                     </label>
//                     <Input
//                       value={formData.firstName}
//                       onChange={(e) => handleInputChange("firstName", e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2 text-foreground">
//                       Last Name *
//                     </label>
//                     <Input
//                       value={formData.lastName}
//                       onChange={(e) => handleInputChange("lastName", e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-foreground">
//                     Email *
//                   </label>
//                   <Input
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => handleInputChange("email", e.target.value)}
//                     required
//                   />
//                 </div>

//                 {/* Conditional Fields */}
//                 {formType === "client" ? (
//                   <>
//                     {/* Client Form */}
//                     <Select
//                       value={formData.projectType}
//                       onValueChange={(v) => handleInputChange("projectType", v)}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select project type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="web">Web Development</SelectItem>
//                         <SelectItem value="mobile">Mobile App</SelectItem>
//                         <SelectItem value="cloud">Cloud Solutions</SelectItem>
//                         <SelectItem value="ai">AI Integration</SelectItem>
//                       </SelectContent>
//                     </Select>

//                     <Select
//                       value={formData.budget}
//                       onValueChange={(v) => handleInputChange("budget", v)}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select budget" />
//                       </SelectTrigger>
//                       <SelectContent>
//                           <SelectItem value="less than 5k">less than $5k</SelectItem>
//                         <SelectItem value="5k-10k">$5K - $10K</SelectItem>
//                         <SelectItem value="10k-25k">$10K - $25K</SelectItem>
//                         <SelectItem value="25k-50k">$25K - $50K</SelectItem>
//                         <SelectItem value="50k+">$50K+</SelectItem>
//                       </SelectContent>
//                     </Select>

//                     <Textarea
//                       value={formData.description}
//                       onChange={(e) => handleInputChange("description", e.target.value)}
//                       placeholder="Tell us about your project..."
//                       rows={4}
//                     />
//                   </>
//                 ) : (
//                   <>
//                     {/* Developer Form */}
//                     <div>
//                       <label className="block text-sm font-medium mb-2 text-foreground">
//                         Phone No *
//                       </label>
//                       <Input
//                         type="tel"
//                         value={formData.phone}
//                         onChange={(e) => handleInputChange("phone", e.target.value)}
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-2 text-foreground">
//                         Experience *
//                       </label>
//                       <Input
//                         value={formData.experience}
//                         onChange={(e) => handleInputChange("experience", e.target.value)}
//                         required
//                         placeholder="e.g. 3 years"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-2 text-foreground">
//                         Expertise / Tech Stack *
//                       </label>
//                       <Input
//                         value={formData.expertise}
//                         onChange={(e) => handleInputChange("expertise", e.target.value)}
//                         required
//                         placeholder="React, Node.js, AWS..."
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-2 text-foreground">
//                         Upload Resume
//                       </label>
//                       <Input
//                         type="file"
//                         accept=".pdf,.doc,.docx"
//                         className="cursor-pointer file:mr-4 file:py-2 file:px-4 
//                         file:rounded-md file:border-0 
//                         file:text-sm file:font-semibold 
//                         file:bg-tech-purple/80 file:text-white 
//                         hover:file:bg-tech-purple/90"
//                         onChange={(e) => handleInputChange("resume", e.target.files?.[0])}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-2 text-foreground">
//                         Proposal Description *
//                       </label>
//                       <Textarea
//                         value={formData.proposal}
//                         onChange={(e) => handleInputChange("proposal", e.target.value)}
//                         rows={4}
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-2 text-foreground">
//                         Bidding Budget (optional)
//                       </label>
//                       <Input
//                         value={formData.biddingBudget}
//                         onChange={(e) =>
//                           handleInputChange("biddingBudget", e.target.value)
//                         }
//                         placeholder="$5000"
//                       />
//                     </div>
//                   </>
//                 )}

//                 {/* Submit */}
//                 <Button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full bg-gradient-tech py-4 rounded-xl"
//                 >
//                   {isSubmitting ? "Sending..." : "Send Message"}
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </section>
//   );

// }

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Phone, Mail, MapPin, Linkedin, Twitter, Github } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Contact() {
  const [formType, setFormType] = useState<"client" | "developer">("client");

  // Separate states
  const [clientFormData, setClientFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    projectType: "",
    budget: "",
    description: "",
  });

  const [developerFormData, setDeveloperFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    experience: "",
    expertise: "",
    resume: null as File | null,
    proposalDescription: "",
    biddingBudget: "",
    projectApplicationFor:""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // handle input change for client/dev
  const handleInputChange = (form: "client" | "developer", field: string, value: any) => {
    if (form === "client") {
      setClientFormData((prev) => ({ ...prev, [field]: value }));
    } else {
      setDeveloperFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let payload: any;
      let response: Response;

      if (formType === "client") {
        const { firstName, lastName, email, projectType, budget, description } = clientFormData;
        if (!firstName || !lastName || !email || !projectType || !budget || !description) {
          toast({ title: "Error", description: "Please fill in all client fields.", variant: "destructive" });
          setIsSubmitting(false);
          return;
        }
        payload = clientFormData;
        response = await apiRequest("POST", "/api/contact/client", payload);
      } else {
        const { firstName, lastName, email, phoneNo, experience, expertise, proposalDescription, resume,projectApplicationFor,biddingBudget } = developerFormData;
        if (!firstName || !lastName || !email || !phoneNo || !experience || !expertise || !proposalDescription || !resume || !projectApplicationFor) {
          toast({ title: "Error", description: "Please fill in all developer fields.", variant: "destructive" });
          setIsSubmitting(false);
          return;
        }

        // Developer uses FormData (for file upload)
        const fd = new FormData();
        Object.entries(developerFormData).forEach(([key, val]) => {
          if (val) fd.append(key, val as any);
        });
        response = await fetch("/api/contact/developer", {
          method: "POST",
          body: fd,
        });
      }

      const data = await response.json();
      if (data.success) {
        toast({ title: "Success!", description: "Your message has been sent!" });
        setClientFormData({ firstName: "", lastName: "", email: "", projectType: "", budget: "", description: "" });
        setDeveloperFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNo: "",
          experience: "",
          expertise: "",
          resume: null,
          proposalDescription: "",
          biddingBudget: "",
          projectApplicationFor:""
        });
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (err) {
      console.error("Form error:", err);
      toast({ title: "Error", description: "Failed to send message.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact Info + Social Links same as before...
  const contactInfo = [
    { icon: Phone, title: "Phone", value: "+91 9078064335", bgColor: "bg-tech-purple/20", iconColor: "text-tech-purple" },
    { icon: Mail, title: "Email", value: "hukitola.dev@gmail.com | info@hukitola.com ", bgColor: "bg-tech-blue/20", iconColor: "text-tech-blue" },
    { icon: MapPin, title: "Office", value: "Bhubaneswar, Odisha", bgColor: "bg-tech-cyan/20", iconColor: "text-tech-cyan" },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/company/hukitola09/?viewAsMember=true", bgColor: "bg-tech-purple/20", hoverColor: "hover:bg-tech-purple/40", iconColor: "text-tech-purple" },
    { icon: Twitter, href: "#", bgColor: "bg-tech-blue/20", hoverColor: "hover:bg-tech-blue/40", iconColor: "text-tech-blue" },
    { icon: Github, href: "https://github.com/pratyushkundu", bgColor: "bg-tech-green/20", hoverColor: "hover:bg-tech-green/40", iconColor: "text-tech-green" },
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* LEFT SIDE with contact info + socials (unchanged) */}
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold">Let&apos;s Build Something Amazing Together</h2>
            <p className="text-xl text-slate-300 leading-relaxed">
              Ready to transform your business? Get in touch with our expert team.
            </p>

            <div className="space-y-6">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${info.bgColor} rounded-xl flex items-center justify-center`}>
                    <info.icon className={`h-6 w-6 ${info.iconColor}`} />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{info.title}</div>
                    <div className="text-slate-300">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-4">
              {socialLinks.map((social, idx) => (
                <a key={idx} href={social.href} target="_blank" className={`w-12 h-12 ${social.bgColor} rounded-xl flex items-center justify-center ${social.hoverColor}`}>
                  <social.icon className={`h-6 w-6 ${social.iconColor}`} />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <Card className="bg-tech-slate/80 backdrop-blur-md border border-slate-700/50">
            <CardContent className="p-8">
              <div className="flex justify-center mb-6">
                <ToggleGroup type="single" value={formType} onValueChange={(val) => setFormType(val as any)} className="gap-2">
                  <ToggleGroupItem value="client" className="px-4 py-2 rounded-xl data-[state=on]:bg-tech-purple/80 data-[state=on]:text-white">Client</ToggleGroupItem>
                  <ToggleGroupItem value="developer" className="px-4 py-2 rounded-xl data-[state=on]:bg-tech-blue/80 data-[state=on]:text-white">Developer</ToggleGroupItem>
                </ToggleGroup>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Common Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Input placeholder="First Name *" value={formType === "client" ? clientFormData.firstName : developerFormData.firstName}
                    onChange={(e) => handleInputChange(formType, "firstName", e.target.value)} />
                  <Input placeholder="Last Name *" value={formType === "client" ? clientFormData.lastName : developerFormData.lastName}
                    onChange={(e) => handleInputChange(formType, "lastName", e.target.value)} />
                </div>
                <Input type="email" placeholder="Email *" value={formType === "client" ? clientFormData.email : developerFormData.email}
                  onChange={(e) => handleInputChange(formType, "email", e.target.value)} />

                {formType === "client" ? (
                  <>
                    <Select value={clientFormData.projectType} onValueChange={(v) => handleInputChange("client", "projectType", v)}>
                      <SelectTrigger><SelectValue placeholder="Select project type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web">Web Development</SelectItem>
                        <SelectItem value="mobile">Mobile App</SelectItem>
                        <SelectItem value="cloud">Cloud Solutions</SelectItem>
                        <SelectItem value="ai">AI Integration</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={clientFormData.budget} onValueChange={(v) => handleInputChange("client", "budget", v)}>
                      <SelectTrigger><SelectValue placeholder="Select budget" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less than 5k">less than $5k</SelectItem>
                        <SelectItem value="5k-10k">$5K - $10K</SelectItem>
                        <SelectItem value="10k-25k">$10K - $25K</SelectItem>
                        <SelectItem value="25k-50k">$25K - $50K</SelectItem>
                        <SelectItem value="50k+">$50K+</SelectItem>
                      </SelectContent>
                    </Select>
                    <Textarea placeholder="Tell us about your project..." value={clientFormData.description} onChange={(e) => handleInputChange("client", "description", e.target.value)} />
                  </>
                ) : (
                  <>
                    <Input placeholder="Phone No *" value={developerFormData.phoneNo} onChange={(e) => handleInputChange("developer", "phoneNo", e.target.value)} />
                    <Input placeholder="Applying For : Frontend (React),Blockchain" value={developerFormData.projectApplicationFor} onChange={(e) => handleInputChange("developer", "projectApplicationFor", e.target.value)} />
                    <Input placeholder="Experience : 4 yr. *" value={developerFormData.experience} onChange={(e) => handleInputChange("developer", "experience", e.target.value)} />
                    <Input placeholder="Expertise: React, Blockchain *" value={developerFormData.expertise} onChange={(e) => handleInputChange("developer", "expertise", e.target.value)} />
                    <Input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleInputChange("developer", "resume", e.target.files?.[0] || null)} />
                    <Textarea placeholder="Proposal Description *" value={developerFormData.proposalDescription} onChange={(e) => handleInputChange("developer", "proposalDescription", e.target.value)} />
                    <Input placeholder="Bidding Budget (optional)" value={developerFormData.biddingBudget} onChange={(e) => handleInputChange("developer", "biddingBudget", e.target.value)} />
                  </>
                )}

                <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-tech py-4 rounded-xl">
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

