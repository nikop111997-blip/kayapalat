import BlogHeader from "@/component/BlogHeader";
import BlogCarousel from "@/component/Blogcarousel";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

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
  keywords: ["Kayapalat blogs", "Wellness tips", "Health advice"],
  openGraph: {
    title: "Kayapalat Blogs | Wellness & Health Insights",
    description:
      "Read the latest blogs on wellness, health, and lifestyle tips from Kayapalat.",
    url: "https://www.kayapalat.in/blogs",
    siteName: "Kayapalat",
    images: [{ url: "/logo.webp", width: 1200, height: 630, alt: "Kayapalat Blogs" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kayapalat Blogs | Wellness & Health Insights",
    description:
      "Stay updated with expert blogs on wellness, health, and lifestyle tips from Kayapalat.",
    images: ["https://www.kayapalat.in/logo.webp"],
  },
  alternates: { canonical: "https://www.kayapalat.in/blogs" },
};

/* ---------- helpers ---------- */
const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : "";

const readTime = (blog) => {
  if (blog.readTime) return `${blog.readTime} min read`;
  const words = (blog.content || blog.metaDescription || "")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

const Meta = ({ blog, className = "" }) => (
  <p className={`flex items-center gap-1.5 text-[11px] ${className}`}>
    <span>{formatDate(blog.createdAt)}</span>
    <span className="h-[3px] w-[3px] rounded-full bg-current opacity-60" />
    <span>{readTime(blog)}</span>
  </p>
);

const Category = ({ blog }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-[11px] font-medium text-gray-800">
    <span className="h-2.5 w-2.5 rounded-full bg-[#9a3f1d]" />
    {blog.category?.name || blog.category || "Category"}
  </span>
);

// "Read more" button: yellow colour slides in from the left when the card is hovered
const ReadMore = () => (
  <span className="relative mt-5 inline-flex items-center gap-2 overflow-hidden rounded-full border border-gray-900 px-4 py-2 text-xs font-semibold text-gray-900 transition-colors duration-500 group-hover:border-[#f9cf01]">
    <span className="absolute inset-0 -translate-x-full bg-[#f9cf01] transition-transform duration-500 ease-out group-hover:translate-x-0" />
    <span className="relative">Read more</span>
    <ArrowRight className="relative h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
  </span>
);

const img = (blog) => blog.featuredImage || "/default.jpg";

/* ---------- page ---------- */
export default async function BlogsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams?.page) || 1;
  const blogs = await getBlogs(page);

  const all = blogs?.data || [];
  const featured = all[0];
  const latest = all.slice(1, 5);
  const founders = all.slice(5);
  const totalPages = blogs?.pagination?.totalPages || 1;

  return (
    <div className="min-h-screen bg-white font-sans pb-16">
      <BlogHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Featured + Latest */}
        {featured && (
          <section className="grid grid-cols-1 lg:grid-cols-[1.75fr_1fr] gap-8">
            <Link
              href={`/blogs/${featured.slug}`}
              className="relative block h-[380px] md:h-[360px] overflow-hidden rounded-3xl"
            >
              <img
                src={img(featured)}
                alt={featured.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Category blog={featured} />
                <h2 className="mt-4 max-w-xl text-2xl md:text-[28px] font-medium leading-snug text-white">
                  {featured.title}
                </h2>
                <Meta blog={featured} className="mt-3 text-white/80" />
              </div>
            </Link>

            <aside>
              <h3 className="text-xl font-semibold text-gray-900 mb-5">Latest post</h3>
              <div className="flex flex-col gap-5">
                {latest.map((blog) => (
                  <Link
                    key={blog._id}
                    href={`/blogs/${blog.slug}`}
                    className="flex items-start gap-4"
                  >
                    <img
                      src={img(blog)}
                      alt={blog.title}
                      className="h-[60px] w-[100px] shrink-0 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-medium leading-snug text-gray-900 line-clamp-3">
                        {blog.title}
                      </h4>
                      <Meta blog={blog} className="mt-1.5 text-gray-500" />
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
          </section>
        )}

        <hr className="mt-12 border-gray-200" />

        {/* Founders corner */}
        {founders.length > 0 && (
          <section className="mt-10">
            <BlogCarousel title="Wellness corner">
              {founders.map((blog) => (
                <Link
                  key={blog._id}
                  href={`/blogs/${blog.slug}`}
                  className="group w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start rounded-2xl bg-[#FAF8F6] p-1.5 pb-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="overflow-hidden rounded-xl">
                    <img
                      src={img(blog)}
                      alt={blog.title}
                      className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="px-4 pt-4">
                    <Category blog={blog} />
                    <h3 className="mt-4 text-lg font-semibold leading-snug text-gray-900 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-500 line-clamp-3">
                      {blog.metaDescription}
                    </p>
                    <div className="flex justify-between">
                    <Meta blog={blog} className="mt-4 text-gray-500" />
                    <ReadMore />
                    </div>
                  </div>
                </Link>
              ))}
            </BlogCarousel>
          </section>
        )}

        {/* Empty state */}
        {all.length === 0 && (
          <div className="py-24 text-center">
            <h3 className="text-lg font-medium text-gray-900">No blogs published yet</h3>
            <p className="mt-1 text-gray-500">Check back later for new updates from Kayapalat.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <>
            <hr className="mt-12 border-gray-200" />
            <nav className="mt-8 flex items-center justify-between">
              <Link
                href={`?page=${page - 1}`}
                scroll={false}
                aria-label="Previous page"
                className={`p-2 text-gray-500 ${page === 1 ? "pointer-events-none opacity-40" : "hover:text-gray-900"}`}
              >
                <ChevronLeft className="h-4 w-4" />
              </Link>

              <div className="flex items-center gap-3">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`?page=${p}`}
                    scroll={false}
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
                      p === page
                        ? "bg-gray-900 text-white"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {p}
                  </Link>
                ))}
              </div>

              <Link
                href={`?page=${page + 1}`}
                scroll={false}
                aria-label="Next page"
                className={`p-2 text-gray-500 ${page === totalPages ? "pointer-events-none opacity-40" : "hover:text-gray-900"}`}
              >
                <ChevronRight className="h-4 w-4" />
              </Link>
            </nav>
          </>
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