import BlogHeader from "@/component/BlogHeader";
import { ArrowRight, PaperclipIcon } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

// Fetch blogs with pagination
async function getBlogs(page = 1) {
  try {
    const res = await fetch(
      `${process.env.PUBLIC_API_URL}/api/blogs?page=${page}`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch blogs");

    return res.json();
  } catch (error) {
    console.error(error);
    return { data: [], pagination: {} };
  }
}
export const metadata = {
  title: "Kayapalat Blogs | Wellness & Health Insights",
  description:
    "Stay updated with the latest blogs on wellness, health, and lifestyle tips from Kayapalat.",
  
  keywords: [
    "Kayapalat blogs",
    "Wellness tips",
    "Health advice",
  ],

  openGraph: {
    title: "Kayapalat Blogs | Wellness & Health Insights",
    description:
      "Read the latest blogs on wellness, health, and lifestyle tips from Kayapalat.",
    url: "https://kayapalat.in/blogs",
    siteName: "Kayapalat",
    images: [
      {
        url: "https://kayapalat.in/blog-header.jpg", // change if needed
        width: 1200,
        height: 630,
        alt: "Kayapalat Blogs",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Kayapalat Blogs | Wellness & Health Insights",
    description:
      "Stay updated with expert blogs on wellness, health, and lifestyle tips from Kayapalat.",
    images: ["https://kayapalat.in/default-blog.jpg"],
  },

  alternates: {
    canonical: "https://kayapalat.in/blogs",
  },
};
export default async function BlogsPage({ searchParams }) {
 const resolvedParams = await searchParams;
const page = Number(resolvedParams?.page) || 1;
  const blogs = await getBlogs(page);

  return (
    <div className="min-h-screen bg-[#FAF8F5] font-manrope">
      
      {/* Header */}
      <BlogHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16">
        
        {/* Title */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Latest Blogs from <span className="text-[#f9cf01]">Kayapalat</span>
          </h2>
          <hr className="border-b-4 mt-3 w-20 border-[#f9cf01] rounded-full" />
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.data?.map((blog) => (
            <Link
              href={`/blogs/${blog.slug}`}
              key={blog._id}
              className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden w-full">
                <img
                  src={
                    blog.featuredImage
                      ? `${blog.featuredImage}`
                      : "/default.jpg"
                  }
                  alt={blog.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-[#f9cf01] transition-colors">
                  {blog.title}
                </h3>

                <p className="text-sm mt-3 text-gray-600 line-clamp-3 flex-grow">
                  {blog.metaDescription}
                </p>

                <div className="mt-6 text-sm font-bold flex gap-2 items-center text-gray-900">
                  <span>Read article</span>
                  <div className="rounded-full p-1.5 bg-gray-50 group-hover:bg-[#f9cf01] group-hover:text-white transition-all">
                    <ArrowRight className="h-4 w-4 transform group-hover:-rotate-45 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {blogs?.data?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-2xl mt-8">
            <span className="text-4xl mb-4">
              <PaperclipIcon />
            </span>
            <h3 className="text-lg font-medium text-gray-900">
              No blogs published yet
            </h3>
            <p className="mt-1 text-gray-500">
              Check back later for new updates from Tiklo.
            </p>
          </div>
        )}

        {/* Pagination */}
        {blogs?.pagination?.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
            
            {/* Prev */}
            <Link
              href={`?page=${page - 1}`}
              scroll={false}
              className={`px-4 py-2 border rounded-lg text-sm ${
                page === 1
                  ? "pointer-events-none opacity-50"
                  : "hover:bg-gray-100"
              }`}
            >
              Prev
            </Link>

            {/* Page Numbers */}
            {Array.from(
              { length: blogs.pagination.totalPages },
              (_, i) => i + 1
            ).map((p) => (
              <Link
                key={p}
                href={`?page=${p}`}
                scroll={false}
                className={`px-4 py-2 border rounded-lg text-sm ${
                  p === page
                    ? "bg-green-600 text-white border-green-600"
                    : "hover:bg-gray-100"
                }`}
              >
                {p}
              </Link>
            ))}

            {/* Next */}
            <Link
              href={`?page=${page + 1}`}
              scroll={false}
              className={`px-4 py-2 border rounded-lg text-sm ${
                page === blogs.pagination.totalPages
                  ? "pointer-events-none opacity-50"
                  : "hover:bg-gray-100"
              }`}
            >
              Next
            </Link>
          </div>
        )}
      
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Kayapalat Blogs",
      url: "https://kayapalat.in/blogs",
    }),
  }}
/>
      </main>
    </div>
  );
}