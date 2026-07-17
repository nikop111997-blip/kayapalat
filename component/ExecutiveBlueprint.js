
import clientPromise from "@/lib/mongodb";
import Image from "next/image";
import Link from "next/link";

async function getBlogs() {
  const client = await clientPromise;
  const db = client.db("kayakalap");

  const blogs = await db
    .collection("blogs")
    .find({ status: "published" })
    .sort({ createdAt: -1 })
    .limit(3)
    .toArray();

  return JSON.parse(JSON.stringify(blogs));
}

export default async function ExecutiveBlueprint() {
  const articles = await getBlogs();

  return (
    <section className="bg-[#FAF9F6] py-8 px-4 md:px-8 font-manrope">
      <div className="max-w-[1600px] mx-auto">

        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-[48px] font-bold text-gray-900 mb-4 tracking-tight">
            Kayapalat Blogs
          </h2>

          <p className="text-lg text-gray-500 leading-relaxed font-semibold">
            Expert perspectives on metabolic health,
            psychological resilience,
            <br className="hidden md:block" />
            and the clinical science of sustainable
            high-performance living.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article._id}
              href={`/blogs/${article.slug}`}
              className="relative w-full h-[300px] rounded-2xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={
                  article.featuredImage ||
                  article.image ||
                  "/placeholder-blog.jpg"
                }
                fill
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end">
                <div>
                  <span className="inline-block px-3 py-1 bg-[#FFD600] text-gray-900 text-xs font-semibold rounded-sm mb-4">
                    {"Blog"}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 leading-snug pr-4">
                  {article.title}
                </h3>

                <p className="text-sm text-gray-300 pr-2 line-clamp-3">
                  {article.metaDescription ||
                    article.excerpt ||
                    ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}