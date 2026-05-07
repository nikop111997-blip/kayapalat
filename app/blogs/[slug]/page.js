import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ChevronRight, Home, List, ClipboardCheck } from "lucide-react";
import EditorRenderer from "@/component/EditorRenderer";
import ShareButtons from "@/component/ShareButtons";
import { ActionButton } from "@/component/HeroSection";
// Fetch blog data
async function getBlog(slug) {
  try {
    const res = await fetch(`${process.env.PUBLIC_API_URL}/api/blogs/${slug}`, { 
      cache: "no-store" 
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (err) { 
    console.error("Failed to fetch blog:", err);
    return null; 
  }
}

// Generate Dynamic Metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Kayapalat",
      description: "The requested blog could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = blog.metaTitle || blog.title;
  const description = blog.metaDescription;
  const url = `https://kayapalat.in/blogs/${slug}`;
  const image = `${blog.featuredImage}`;

  return {
    title,
    description,

    keywords: [
        "Kayapalat blog",
    ],

    metadataBase: new URL("https://kayapalat.in"),

    alternates: {
      canonical: url,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    openGraph: {
      title,
      description,
      url,
      siteName: "Kayapalat",
      type: "article",
      locale: "en_IN",
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },

    icons: {
      icon: "/favicon.ico",
    },

    authors: [
      {
        name: "Kayapalat",
        url: "https://kayapalat.in",
      },
    ],

    category: "Real Estate",

    other: {
      "article:author": "Kayapalat",
      "article:section": "Home Inspection",
    },
  };
}

// Main Page Component
export default async function BlogPage({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return notFound();
  // Extract headings for Table of Contents
  const headings = blog?.content?.blocks?.filter((b) => b.type === "header") || [];
  const currentUrl = `https://kayapalat.in/blogs/${slug}`;

  // Comprehensive SEO Schema (Breadcrumbs + Article)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kayapalat.in" },
          { "@type": "ListItem", "position": 2, "name": "Blogs", "item": "https://kayapalat.in/blogs" },
          { "@type": "ListItem", "position": 3, "name": blog.title, "item": currentUrl }
        ]
      },
      {
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": currentUrl
        },
        "headline": blog.metaTitle || blog.title,
        "description": blog.metaDescription,
        "image": `${blog.featuredImage}`,
        "datePublished": blog.createdAt,
        "dateModified": blog.updatedAt || blog.createdAt,
        "author": { 
          "@type": "Organization", 
          "name": "Kayapalat Editorial Team",
          "url": "https://kayapalat.in"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Kayapalat",
          "logo": {
            "@type": "ImageObject",
            "url": "https://kayapalat.in/logo.png" // Update with your actual logo URL
          }
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] font-manrope selection:bg-[#f9cf01]/20 selection:text-green-900 ">
      {/* Inject Schema */}
     

      {/* Breadcrumbs Navigation */}
    <nav aria-label="Breadcrumb" className="border-b border-gray-100 py-3">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <ol className="flex items-center gap-2 text-xs md:text-sm text-gray-500 overflow-x-auto whitespace-nowrap scrollbar-hide">
      
      {/* Home Link */}
      <li className="flex items-center">
        <Link href="/" className="hover:text-[#f9cf01] transition-colors flex items-center font-medium shrink-0">
          <Home className="w-3.5 h-3.5 mr-1.5 mb-0.5" /> Home
        </Link>
      </li>

      <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" aria-hidden="true" />

      {/* Category Link */}
      <li className="flex items-center">
        <Link href="/blogs" className="hover:text-[#f9cf01] transition-colors font-medium shrink-0 relative z-10">
          Blogs
        </Link>
      </li>

      <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" aria-hidden="true" />

      {/* Current Page */}
      <li className="text-gray-900 font-semibold truncate max-w-[200px] md:max-w-md shrink-0" aria-current="page">
        {blog.title}
      </li>
      
    </ol>
  </div>
</nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Article Header */}
        <header className="mb-10 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4 font-bold">
               <span className="bg-[#f9cf01] text-white text-[10px] px-2.5 py-1 rounded uppercase tracking-widest">
                 Kayapalat Blog
               </span>
               <div className="flex items-center text-gray-400 text-xs gap-3">
                 <span className="flex items-center gap-1">
                   <Calendar className="w-3.5 h-3.5" /> 
                   {new Date(blog.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                 </span>
                 <span className="flex items-center gap-1">
                   <Clock className="w-3.5 h-3.5" /> 5 min read
                 </span>
               </div>
            </div>
            
            {/* Desktop Share Buttons */}
            <div className="hidden sm:block">
              <ShareButtons url={currentUrl} title={blog.title} />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-[1.15] tracking-tight mb-6">
            {blog.title}
          </h1>
          
          <p className=" text-gray-500 leading-relaxed max-w-7xl italic border-l-4 border-[#f9cf01] pl-6">
            {blog.metaDescription}
          </p>
        </header>

        {/* Hero Image */}
        <div className="relative aspect-[15/6] mb-12 rounded-[1rem] overflow-hidden group">
          <Image 
            src={`${blog.featuredImage}`} 
            alt={blog.title} 
            fill 
            priority 
            className="object-cover group-hover:scale-105 transition-transform duration-700" 
          />
        </div>

        {/* Table of Contents Section */}
        {headings.length > 0 && (
          <div className="mb-16 bg-gray-50 p-6 md:p-8 rounded-[1rem] border border-gray-100">
            <div className="flex items-center gap-3 mb-6 font-black text-gray-900 uppercase tracking-widest text-xs">
              <div className="bg-[#f9cf01] p-1.5 rounded-md text-white shadow-md">
                <List className="w-4 h-4" />
              </div>
              Contents
            </div>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              {headings.map((h, i) => (
                <a 
                  key={i} 
                  href={`#section-${i}`} 
                  className="group flex items-start gap-3 text-gray-600 hover:text-green-600 transition-all text-sm font-bold"
                >
                  <span className="text-green-600/30 group-hover:text-green-600 mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span 
                    className="group-hover:underline underline-offset-4 decoration-2" 
                    dangerouslySetInnerHTML={{ __html: h.data.text }} 
                  />
                </a>
              ))}
            </nav>
          </div>
        )}

        {/* Article Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Main Prose Content */}
          <article className="flex-1 max-w-none prose prose-green prose-lg prose-p:my-0 prose-headings:my-0 prose-img:my-0 prose-li:my-0">
            <EditorRenderer content={blog.content} />
            
            {/* Mobile Share Buttons (Shows at bottom of article on small screens) */}
            <div className="mt-12 pt-8 border-t border-gray-100 sm:hidden">
              <p className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">Share this article</p>
              <ShareButtons url={currentUrl} title={blog.title} />
            </div>
          </article>

          {/* Sticky Sidebar */}
          <aside className="lg:w-80 shrink-0">
  <div className="sticky top-24">
    {/* Light themed card matching the uploaded design */}
    <div className="bg-white rounded-[1rem] border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden flex flex-col relative z-10">
      
      {/* 1. Image/Illustration Area */}
      <div className=" relative flex items-center justify-center">
        {/* You can replace this img with your own isometric house illustration */}
        <Image 
          src="https://framerusercontent.com/images/dpoEu6bAixQRYKwFTttRq5qg84U.jpg?scale-down-to=1024&width=1200&height=1298" 
          alt="kayapalat" 
          width={200}
          height={200}
          className="object-contain w-full rounded " 
        />
        
        {/* Dark Badge (Top Right) */}
        <div className="absolute top-4 right-4 bg-gray-900 text-white rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold shadow-sm">
          <Clock className="w-3.5 h-3.5" />
          24h Consultation
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="p-6 pb-5">
        <h4 className="text-[1.25rem] font-bold text-gray-900 mb-2.5 leading-tight">
          Start Your Transformation
        </h4>
        <p className="text-gray-500 text-sm leading-relaxed">
          At Kayapalat, we don’t rely on shortcuts or extremes. Our structured and science-backed approach helps you build habits that actually fit your lifestyle to deliver lasting results.
        </p>
        <Link href="/pricing" className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-[#f9cf01] hover:text-[#f9cf01]/80 transition-colors">
          View Plans
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

    

    </div>
  </div>
</aside>
            
        </div>
         <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
      />
      </main>
    </div>
  );
}