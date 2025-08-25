import { Helmet } from "react-helmet-async";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

const docsSections = [
    {
        title: "Getting Started",
        content: "Learn how to quickly set up your projects with Hukitola Solutions' tools and services. Step-by-step guides for seamless integration."
    },
    {
        title: "API Reference",
        content: "Detailed API documentation including endpoints, parameters, response objects, authentication, and usage examples."
    },
    {
        title: "Blockchain Integration",
        content: "Guides and tutorials on integrating blockchain technology into your business workflows, smart contracts, and token management."
    },
    {
        title: "CRM Configuration",
        content: "Documentation on configuring and optimizing CRM solutions, workflow automation, and customer engagement strategies."
    },
    {
        title: "Troubleshooting",
        content: "Common issues and their resolutions to help you solve problems quickly and keep your applications running smoothly."
    }
];

export default function Documentation() {
    return (
        <>

            <Helmet>
                <title>Hukitola Solutions Documentation</title>
                <meta name="description" content="Explore Hukitola Solutions documentation including APIs, CRM, blockchain integration, and troubleshooting guides." />
                <link rel="canonical" href="https://www.hukitola.com/documentation" />

                {/* JSON-LD for structured data */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "TechArticle",
                        "headline": "Hukitola Solutions Documentation",
                        "description": "Explore Hukitola Solutions documentation including APIs, CRM, blockchain integration, and troubleshooting guides.",
                        "author": {
                            "@type": "Organization",
                            "name": "Hukitola Solutions"
                        },
                        "url": "https://www.hukitola.com/documentation",
                        "datePublished": "2024-04-24",
                        "articleSection": docsSections.map(section => section.title)
                    })}
                </script>
            </Helmet>
            <div className="min-h-screen bg-background text-foreground flex flex-col">
                <Navigation />



                <main className="flex-grow">
                    <section className="pt-24 pb-20 bg-gradient-to-r from-tech-purple/10 to-tech-blue/10">
                        <div className="max-w-5xl mx-auto px-6 lg:px-8">
                            <h1 className="text-4xl lg:text-6xl font-bold mb-12 text-center">
                                Documentation
                            </h1>

                            <div className="space-y-10">
                                {docsSections.map((section, index) => (
                                    <section key={index} className="bg-slate-800 p-6 rounded-xl shadow-lg">
                                        <h2 className="text-2xl font-semibold text-tech-blue mb-3">{section.title}</h2>
                                        <p className="text-slate-300">{section.content}</p>
                                    </section>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </>
    );
}
