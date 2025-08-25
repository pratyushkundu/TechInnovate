import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <section className="pt-24 pb-20 bg-gradient-to-r from-tech-purple/10 to-tech-blue/10">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-center mb-10">
              Terms & Conditions
            </h1>
            <p className="text-center text-slate-400 mb-12">
              Last updated: <span className="font-semibold">January 25, 2025</span>
            </p>

            <div className="space-y-10 text-lg leading-relaxed text-slate-300">
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-tech-green">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By using <span className="font-semibold">Hukitola Solutions</span>’s website 
                  (<a href="https://hukitola.com" className="text-tech-cyan underline">https://hukitola.com</a>), 
                  you agree to comply with and be bound by these Terms and Conditions. 
                  If you disagree with any part, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-tech-blue">
                  2. Use of Website
                </h2>
                <p>
                  You agree to use our website only for lawful purposes and in a way that does not 
                  infringe upon the rights of others or restrict their enjoyment of the site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-tech-purple">
                  3. Intellectual Property
                </h2>
                <p>
                  All content, logos, trademarks, and materials on this site are owned by 
                  Hukitola Solutions unless otherwise stated. You may not reproduce or exploit 
                  materials without prior written consent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-tech-green">
                  4. Limitation of Liability
                </h2>
                <p>
                  We strive to provide accurate and up-to-date content, but we do not guarantee 
                  error-free service. Hukitola Solutions is not responsible for damages arising 
                  from the use of this site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-tech-cyan">
                  5. Privacy
                </h2>
                <p>
                  Your use of this website is governed by our{" "}
                  <a href="/privacy" className="text-tech-blue underline">
                    Privacy Policy
                  </a>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-tech-purple">
                  6. Updates to Terms
                </h2>
                <p>
                  We reserve the right to update these Terms at any time. Any changes will 
                  be effective immediately upon posting on this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-tech-green">
                  7. Contact Us
                </h2>
                <p>
                  For any questions about these Terms, please contact us at: <br />
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
