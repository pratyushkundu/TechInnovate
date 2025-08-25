import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Helmet } from "react-helmet-async";

const blogPosts = [
  {
    title: "How AI is Transforming Web Development",
    excerpt: "Discover how AI technologies can help build smarter, faster, and more efficient web applications.",
    date: "Jan 05, 2023",
    color: "text-tech-green"
  },
  {
    title: "Blockchain in Modern Business",
    excerpt: "Learn how blockchain technology is revolutionizing data security and business operations across industries.",
    date: "June 20, 2024",
    color: "text-tech-blue"
  },
  {
    title: "CRM Systems for Effective Customer Management",
    excerpt: "Explore how modern CRM systems can streamline customer relationships, increase sales, and improve customer retention.",
    date: "May 15, 2025",
    color: "text-tech-purple"
  },
  {
    title: "Integrating Blockchain with CRM",
    excerpt: "Understand the potential of integrating blockchain technology with CRM for enhanced security and data integrity.",
    date: "August 10, 2025",
    color: "text-tech-green"
  },
  {
    title: "Decentralized Applications (DApps) in Business",
    excerpt: "Discover how DApps built on blockchain can transform traditional business processes and improve transparency.",
    date: "June 5, 2023",
    color: "text-tech-blue"
  },
  {
    title: "Future of CRM with AI and Blockchain",
    excerpt: "Learn how the convergence of AI and blockchain is shaping the next generation of CRM solutions for enterprises.",
    date: "August 1, 2024",
    color: "text-tech-purple"
  }
];

export default function Blog() {
  return (
    <>
     <Helmet>
        <title>Hukitola Solutions Blog - CRM, Blockchain & AI Insights</title>
        <meta name="description" content="Read the latest blog posts on CRM systems, blockchain integration, AI-powered business solutions, and more from Hukitola Solutions." />
        <link rel="canonical" href="https://www.hukitola.com/blog" />
        <meta property="og:title" content="Hukitola Solutions Blog - CRM, Blockchain & AI Insights" />
        <meta property="og:description" content="Read the latest blog posts on CRM systems, blockchain integration, AI-powered business solutions, and more from Hukitola Solutions." />
        <meta property="og:url" content="https://www.hukitola.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.hukitola.com/hukitolalogo.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Hukitola Solutions Blog",
            "url": "https://www.hukitola.com/blog",
            "blogPost": blogPosts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "url": "https://www.hukitola.com/blog",
              "datePublished": post.date,
              "author": {
                "@type": "Organization",
                "name": "Hukitola Solutions"
              },
              "description": post.excerpt
            }))
          })}
        </script>
      </Helmet>
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <section className="pt-24 pb-20 bg-gradient-to-r from-tech-purple/10 to-tech-blue/10">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-center mb-10">
              Our Blog
            </h1>
            <p className="text-center text-slate-400 mb-12">
              Latest news, tutorials, and insights from Hukitola Solutions.
            </p>

            <div className="space-y-10">
              {blogPosts.map((post, index) => (
                <article 
                  key={index} 
                  className="border border-slate-700/30 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <h2 className={`text-2xl font-semibold mb-2 ${post.color}`}>
                    {post.title}
                  </h2>
                  <p className="text-slate-300 mb-3">
                    {post.excerpt}
                  </p>
                  <p className="text-sm text-slate-500">Published: {post.date}</p>
                </article>
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
