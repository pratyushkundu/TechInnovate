// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { ArrowRight } from "lucide-react";

// export default function Projects() {
//   const featuredProjects = [
//     {
//       title: "E-Commerce Platform Transformation",
//       description: "Complete digital transformation of a retail platform, increasing sales by 300% and improving user experience.",
//       image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
//       tags: ["React", "Node.js", "AWS", "AI/ML"],
//       borderColor: "hover:border-tech-purple/50",
//       buttonColor: "text-tech-purple hover:text-white"
//     },
//     {
//       title: "AI-Powered Analytics Suite",
//       description: "Custom AI solution for real-time business intelligence, reducing decision-making time by 80%.",
//       image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
//       tags: ["Python", "TensorFlow", "Docker", "GraphQL"],
//       borderColor: "hover:border-tech-cyan/50",
//       buttonColor: "text-tech-cyan hover:text-white"
//     }
//   ];

//   const smallProjects = [
//     {
//       title: "FinTech Mobile App",
//       description: "Secure banking solution with biometric authentication",
//       tags: ["React Native", "Blockchain"]
//     },
//     {
//       title: "Healthcare Management",
//       description: "HIPAA-compliant patient management system",
//       tags: ["Vue.js", "PostgreSQL"]
//     },
//     {
//       title: "IoT Dashboard",
//       description: "Real-time monitoring for smart city infrastructure",
//       tags: ["Angular", "MongoDB"]
//     }
//   ];

//   return (
//     <section id="projects" className="py-20 bg-tech-slate/50 dark:bg-tech-slate/50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="projects-title">Featured Projects</h2>
//           <p className="text-xl text-slate-300 dark:text-slate-300 max-w-3xl mx-auto" data-testid="projects-description">
//             Showcasing our expertise through successful digital transformations and innovative solutions.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8 mb-12">
//           {featuredProjects.map((project, index) => (
//             <Card 
//               key={index}
//               className={`bg-tech-slate/80 dark:bg-tech-slate/80 rounded-2xl overflow-hidden border border-slate-700/50 ${project.borderColor} transition-all duration-300 group`}
//               data-testid={`featured-project-${index}`}
//             >
//               <img 
//                 src={project.image}
//                 alt={project.title}
//                 className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
//                 data-testid={`project-image-${index}`}
//               />
//               <CardContent className="p-8">
//                 <h3 className="text-2xl font-bold mb-4 text-foreground" data-testid={`project-title-${index}`}>
//                   {project.title}
//                 </h3>
//                 <p className="text-slate-300 dark:text-slate-300 mb-6" data-testid={`project-description-${index}`}>
//                   {project.description}
//                 </p>
//                 <div className="flex flex-wrap gap-2 mb-6">
//                   {project.tags.map((tag, tagIndex) => (
//                     <Badge 
//                       key={tagIndex}
//                       variant="secondary"
//                       className="bg-tech-purple/20 text-tech-purple dark:bg-tech-purple/20 dark:text-tech-purple"
//                       data-testid={`project-tag-${index}-${tagIndex}`}
//                     >
//                       {tag}
//                     </Badge>
//                   ))}
//                 </div>
//                 <Button 
//                   variant="ghost"
//                   className={`${project.buttonColor} transition-colors duration-300 font-semibold p-0`}
//                   data-testid={`project-cta-${index}`}
//                 >
//                   View Case Study <ArrowRight className="ml-2 h-4 w-4" />
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {smallProjects.map((project, index) => (
//             <Card 
//               key={index}
//               className="bg-tech-slate/60 dark:bg-tech-slate/60 border border-slate-700/30 hover:border-tech-blue/50 transition-all duration-300"
//               data-testid={`small-project-${index}`}
//             >
//               <CardContent className="p-6">
//                 <h4 className="font-bold mb-2 text-foreground" data-testid={`small-project-title-${index}`}>
//                   {project.title}
//                 </h4>
//                 <p className="text-sm text-slate-400 dark:text-slate-400 mb-4" data-testid={`small-project-description-${index}`}>
//                   {project.description}
//                 </p>
//                 <div className="text-xs space-x-2">
//                   {project.tags.map((tag, tagIndex) => (
//                     <span 
//                       key={tagIndex}
//                       className={tagIndex === 0 ? "text-tech-blue" : "text-tech-green"}
//                       data-testid={`small-project-tag-${index}-${tagIndex}`}
//                     >
//                       {tag}{tagIndex < project.tags.length - 1 ? " • " : ""}
//                     </span>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import crmimg from './../../assets/crm.jpg'
export default function Projects() {
  const featuredProjects = [
    {
      title: "E-Commerce Platform Transformation",
      description: "Complete digital transformation of a retail platform, increasing sales by and improving user experience.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      tags: ["React", "Node.js", "AWS", "AI/ML"],
      borderColor: "hover:border-tech-purple/50",
      buttonColor: "text-tech-purple hover:text-white"
    },
    {
      title: "AI-Powered Analytics Suite",
      description: "Custom AI solution for real-time business intelligence, reducing decision-making time .",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      tags: ["Python", "TensorFlow", "Docker", "GraphQL"],
      borderColor: "hover:border-tech-cyan/50",
      buttonColor: "text-tech-cyan hover:text-white"
    },
    {
      title: "Angular CRM Dashboard",
      description: "A fully-featured customer relationship management system built in Angular with role-based access, real-time analytics, and seamless integration with REST APIs.",
      image:'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400', // Unsplash image
      tags: ["Angular", "TypeScript", "REST API", "NgRx"],
      borderColor: "hover:border-tech-green/50",
      buttonColor: "text-tech-green hover:text-white"
    },

    {
      title: "Enterprise Blockchain Solution",
      description: "Secure supply chain tracking system using blockchain technology, reducing fraud and increasing transparency.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      tags: ["Blockchain", "Solidity", "Web3", "TypeScript"],
      borderColor: "hover:border-tech-green/50",
      buttonColor: "text-tech-green hover:text-white"
    }
  ];

  // const smallProjects = [
  //   {
  //     title: "FinTech Mobile App",
  //     description: "Secure banking solution with biometric authentication",
  //     tags: ["React Native", "Blockchain"]
  //   },
  //   {
  //     title: "Decentralized Trading Platform",
  //     description: "A blockchain-powered trading platform with a sleek, interactive UI for secure crypto and token trading, real-time price charts, and wallet integration.",
  //     tags: ["Blockchain", "Ethereum", "Web3.js", "React", "TailwindCSS"],

  //   },

  //   {
  //     title: "Healthcare Management",
  //     description: "HIPAA-compliant patient management system",
  //     tags: ["Vue.js", "PostgreSQL"]
  //   },
  //   {
  //     title: "IoT Dashboard",
  //     description: "Real-time monitoring for smart city infrastructure",
  //     tags: ["Angular", "MongoDB"]
  //   },
  //   {
  //     title: "Education Platform",
  //     description: "Interactive learning management system with AI tutoring",
  //     tags: ["React", "Python"]
  //   },
  //   {
  //     title: "Logistics Optimizer",
  //     description: "Route optimization system reducing delivery costs by 40%",
  //     tags: ["Machine Learning", "APIs"]
  //   },
  //   {
  //     title: "Social Commerce App",
  //     description: "Community-driven marketplace with integrated social features",
  //     tags: ["Flutter", "Firebase"]
  //   }
  // ];
const smallProjects = [
  {
    title: "FinTech Mobile App",
    description: "Secure banking solution with biometric authentication",
    tags: ["React Native", "Blockchain"]
  },
  {
    title: "Decentralized Trading Platform",
    description: "A blockchain-powered trading platform with a sleek, interactive UI for secure crypto and token trading, real-time price charts, and wallet integration.",
    tags: ["Blockchain", "Ethereum", "Web3.js", "React", "TailwindCSS"]
  },
  {
    title: "Healthcare Management",
    description: "HIPAA-compliant patient management system",
    tags: ["Vue.js", "PostgreSQL"]
  },
  {
    title: "Smart Contract Management",
    description: "Automated smart contracts for secure transactions and decentralized applications",
    tags: ["Solidity", "Ethereum", "Web3.js", "Node.js"]
  },
  {
    title: "CRM Automation Platform",
    description: "Customer relationship management with AI-driven insights and workflow automation",
    tags: ["Node.js", "React", "AI", "APIs"]
  },
  {
    title: "AI-Powered Education Platform",
    description: "Interactive learning management system with personalized AI tutoring",
    tags: ["React", "Python", "AI"]
  },
  {
    title: "Social Commerce App",
    description: "Community-driven marketplace with integrated social features",
    tags: ["Flutter", "Firebase"]
  }
];

  return (
    <section id="projects" className="py-20 bg-tech-slate/50 dark:bg-tech-slate/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="projects-title">Featured Projects</h2>
          <p className="text-xl text-slate-300 dark:text-slate-300 max-w-3xl mx-auto" data-testid="projects-description">
            Showcasing our expertise through successful digital transformations and innovative solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <Card
              key={index}
              className={`bg-tech-slate/80 dark:bg-tech-slate/80 rounded-2xl overflow-hidden border border-slate-700/50 ${project.borderColor} transition-all duration-300 group`}
              data-testid={`featured-project-${index}`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                data-testid={`project-image-${index}`}
              />
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-foreground" data-testid={`project-title-${index}`}>
                  {project.title}
                </h3>
                <p className="text-slate-300 dark:text-slate-300 mb-6" data-testid={`project-description-${index}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="secondary"
                      className="bg-tech-purple/20 text-tech-purple dark:bg-tech-purple/20 dark:text-tech-purple"
                      data-testid={`project-tag-${index}-${tagIndex}`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  className={`${project.buttonColor} transition-colors duration-300 font-semibold p-0`}
                  data-testid={`project-cta-${index}`}
                >
                  View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {smallProjects.map((project, index) => (
            <Card
              key={index}
              className="bg-tech-slate/60 dark:bg-tech-slate/60 border border-slate-700/30 hover:border-tech-blue/50 transition-all duration-300"
              data-testid={`small-project-${index}`}
            >
              <CardContent className="p-6">
                <h4 className="font-bold mb-2 text-foreground" data-testid={`small-project-title-${index}`}>
                  {project.title}
                </h4>
                <p className="text-sm text-slate-400 dark:text-slate-400 mb-4" data-testid={`small-project-description-${index}`}>
                  {project.description}
                </p>
                <div className="text-xs space-x-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={tagIndex === 0 ? "text-tech-blue" : "text-tech-green"}
                      data-testid={`small-project-tag-${index}-${tagIndex}`}
                    >
                      {tag}{tagIndex < project.tags.length - 1 ? " • " : ""}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
