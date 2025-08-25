import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <section className="pt-24 pb-20 bg-gradient-to-r from-tech-purple/10 to-tech-blue/10">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-center mb-10">
              Privacy Policy
            </h1>
            <p className="text-center text-slate-400 mb-12">
              Last updated: <span className="font-semibold">January 25, 2025</span>
            </p>

            <div className="space-y-10 text-lg leading-relaxed text-slate-300">
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-tech-green">
                  1. Information Collection
                </h2>
                <p>
                  We collect personal information such as your name, email, and any details you provide when contacting <span className="font-semibold">Hukitola Solutions</span>. 
                  This helps us improve our services and provide personalized support.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-tech-blue">
                  2. Use of Information
                </h2>
                <p>
                  Your information is used to respond to inquiries, deliver services, and enhance the overall experience on our website. 
                  We do not sell or trade your personal data to third parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-tech-purple">
                  3. Cookies & Tracking
                </h2>
                <p>
                  Our website may use cookies and similar tracking technologies to analyze trends, improve usability, and track user interactions. 
                  You can control cookies through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-tech-green">
                  4. Data Security
                </h2>
                <p>
                  We implement appropriate security measures to protect your information from unauthorized access, alteration, or disclosure. 
                  However, no system is completely secure, and we cannot guarantee absolute protection.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-tech-cyan">
                  5. Third-Party Services
                </h2>
                <p>
                  We may use third-party services to enhance our website or deliver services. These services have their own privacy policies. 
                  Please review them before interacting with third-party tools.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-tech-purple">
                  6. Changes to Privacy Policy
                </h2>
                <p>
                  We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with the updated date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-tech-green">
                  7. Contact Us
                </h2>
                <p>
                  For questions or concerns regarding this Privacy Policy, contact us at: <br />
                  <span className="font-semibold">hukitola.dev@gmail.com</span>
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
