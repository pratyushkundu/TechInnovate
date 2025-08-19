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
                <h3 className="text-2xl font-bold text-tech-blue mb-2">95% Uptime</h3>
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
      </div>
    </section>
  );
}
