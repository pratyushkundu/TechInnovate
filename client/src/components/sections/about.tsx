// export default function About() {
//   return (
//     <section id="about" className="py-20 bg-gradient-hero">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           <div className="space-y-8">
//             <h2 className="text-4xl lg:text-5xl font-bold" data-testid="about-title">About Hukitola Solutions</h2>
//             <p className="text-xl text-slate-300 dark:text-slate-300 leading-relaxed" data-testid="about-description">
//               Since 2022, we've been at the forefront of digital transformation, helping businesses leverage cutting-edge technology to achieve unprecedented growth and efficiency.
//             </p>
//             <p className="text-lg text-slate-400 dark:text-slate-400 leading-relaxed" data-testid="about-mission">
//               Our team of expert developers, designers, and consultants work collaboratively to deliver solutions that not only meet your current needs but scale with your future ambitions.
//             </p>
//             <div className="grid grid-cols-2 gap-6">
//               <div data-testid="stat-experience">
//                 <h3 className="text-2xl font-bold text-tech-green mb-2">3+ Years</h3>
//                 <p className="text-slate-400 dark:text-slate-400">Industry Experience</p>
//               </div>
//               <div data-testid="stat-team">
//                 <h3 className="text-2xl font-bold text-tech-cyan mb-2">15+ Team</h3>
//                 <p className="text-slate-400 dark:text-slate-400">Expert Professionals</p>
//               </div>
//               <div data-testid="stat-awards">
//                 <h3 className="text-2xl font-bold text-tech-purple mb-2">2+ Awards</h3>
//                 <p className="text-slate-400 dark:text-slate-400">Industry Recognition</p>
//               </div>
//               <div data-testid="stat-uptime">
//                 <h3 className="text-2xl font-bold text-tech-blue mb-2">95% Uptime</h3>
//                 <p className="text-slate-400 dark:text-slate-400">Service Reliability</p>
//               </div>
//             </div>
//           </div>
//           <div className="space-y-6">
//             <img 
//               src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500" 
//               alt="Modern office with cutting-edge technology setup" 
//               className="rounded-2xl shadow-2xl"
//               data-testid="about-main-image"
//             />
            
//             <div className="grid grid-cols-2 gap-4">
//               <img 
//                 src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
//                 alt="Tech team collaborating on innovative solutions" 
//                 className="rounded-xl shadow-lg"
//                 data-testid="about-team-image"
//               />
//               <img 
//                 src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
//                 alt="Developers working on advanced programming projects" 
//                 className="rounded-xl shadow-lg"
//                 data-testid="about-dev-image"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import  pratimg from './../../assets/prat.jpeg';
export default function About() {
  return (
    <section id="about" className="py-20 bg-gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold" data-testid="about-title">About Hukitola Solutions</h2>
            <p className="text-xl text-slate-300 dark:text-slate-300 leading-relaxed" data-testid="about-description">
              Since 2022, we've been at the forefront of digital transformation, helping businesses leverage cutting-edge technology to achieve unprecedented growth and efficiency.
            </p>
            <p className="text-lg text-slate-400 dark:text-slate-400 leading-relaxed" data-testid="about-mission">
              Our team of expert developers, designers, and consultants work collaboratively to deliver solutions that not only meet your current needs but scale with your future ambitions.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div data-testid="stat-experience">
                <h3 className="text-2xl font-bold text-tech-green mb-2">3+ Years</h3>
                <p className="text-slate-400 dark:text-slate-400">Industry Experience</p>
              </div>
              <div data-testid="stat-team">
                <h3 className="text-2xl font-bold text-tech-cyan mb-2">15+ Team</h3>
                <p className="text-slate-400 dark:text-slate-400">Expert Professionals</p>
              </div>
              <div data-testid="stat-awards">
                <h3 className="text-2xl font-bold text-tech-purple mb-2">2+ Awards</h3>
                <p className="text-slate-400 dark:text-slate-400">Industry Recognition</p>
              </div>
              <div data-testid="stat-uptime">
                <h3 className="text-2xl font-bold text-tech-blue mb-2">92% Uptime</h3>
                <p className="text-slate-400 dark:text-slate-400">Service Reliability</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500" 
              alt="Modern office with cutting-edge technology setup" 
              className="rounded-2xl shadow-2xl"
              data-testid="about-main-image"
            />
            
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Tech team collaborating on innovative solutions" 
                className="rounded-xl shadow-lg"
                data-testid="about-team-image"
              />
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Developers working on advanced programming projects" 
                className="rounded-xl shadow-lg"
                data-testid="about-dev-image"
              />
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="team-title">Meet Our Expert Team</h3>
            <p className="text-xl text-slate-300 dark:text-slate-300 max-w-3xl mx-auto" data-testid="team-description">
              Industry leaders and innovators driving technological excellence across every project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Pratyush",
                role: "Project Manager",
                // image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
                image:pratimg,
                expertise: ["AI/CRM", "FullStack/Blockchain", "Team Leadership"]
              },
              {
                name: "Ionsu",
                role: "Lead Developer",
                // image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
                expertise: ["AI", "Shopify/WordPress", "DevOps"]
              },
              {
                name: "Pratik",
                role: "Project Planner",
                // image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
                expertise: ["SalesForce", "User Research", "Prototyping","Architecture"]
              },
              {
                name: "Biswajit M",
                role: "Senior Data Engineer",
                // image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
                expertise: ["Data Science", "Analytics", "Machine Learning"]
              }
            ].map((member, index) => (
              <div key={index} className="text-center group" data-testid={`team-member-${index}`}>
                <div className="relative mb-6">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-tech-blue/30 group-hover:border-tech-blue/60 transition-all duration-300"
                    data-testid={`team-member-image-${index}`}
                  />
                  <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-gradient-to-tr from-tech-blue/20 to-tech-purple/20 group-hover:from-tech-blue/30 group-hover:to-tech-purple/30 transition-all duration-300"></div>
                </div>
                <h4 className="text-xl font-bold mb-2 text-foreground" data-testid={`team-member-name-${index}`}>
                  {member.name}
                </h4>
                <p className="text-tech-cyan mb-4 font-medium" data-testid={`team-member-role-${index}`}>
                  {member.role}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {member.expertise.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="text-xs px-3 py-1 bg-tech-slate/60 rounded-full text-slate-300 border border-slate-600/50"
                      data-testid={`team-member-skill-${index}-${skillIndex}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

