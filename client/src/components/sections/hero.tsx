import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="pt-24 pb-20 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-tech-purple/10 to-tech-blue/10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Transform Your
              <span className="bg-gradient-tech bg-clip-text text-transparent"> Digital Future</span>
            </h1>
            <p className="text-xl text-slate-300 dark:text-slate-300 leading-relaxed max-w-lg">
              Cutting-edge IT solutions that drive innovation, streamline operations, and accelerate your business growth with AI-powered technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-gradient-tech px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-tech-purple/25"
                onClick={() => scrollToSection("contact")}
                data-testid="start-project-button"
              >
                Start Your Project
              </Button>
              <Button 
                variant="outline"
                className="border border-slate-600 px-8 py-4 rounded-xl font-semibold hover:bg-slate-700/50 transition-colors duration-300"
                onClick={() => scrollToSection("projects")}
                data-testid="view-work-button"
              >
                View Our Work
              </Button>
            </div>
            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-tech-green" data-testid="stat-projects">30+</div>
                <div className="text-sm text-slate-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-tech-cyan" data-testid="stat-clients">15+</div>
                <div className="text-sm text-slate-400">Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-tech-blue" data-testid="stat-satisfaction">92%</div>
                <div className="text-sm text-slate-400">Satisfaction</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="IT professionals collaborating on technology solutions" 
              className="rounded-2xl shadow-2xl shadow-tech-purple/20"
              data-testid="hero-image"
            />
            <div className="absolute -bottom-6 -left-6 bg-tech-slate/90 dark:bg-tech-slate/90 backdrop-blur-md p-6 rounded-xl border border-slate-700/50">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-tech-green rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">AI Assistant Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
