// app/sitemap.js

import clientPromise from "@/lib/mongodb";

export default async function sitemap() {
  const baseUrl = "https://kayapalat.in";

  // ✅ Static Pages
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // ✅ MongoDB Dynamic Blogs
  let blogPages = [];

  try {
    const client = await clientPromise;
    const db = client.db("kayakalap");

    const blogs = await db
      .collection("blogs")
      .find({ status: "published" })
      .project({ slug: 1, updatedAt: 1 })
      .toArray();

    blogPages = blogs.map((blog) => ({
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: blog.updatedAt
        ? new Date(blog.updatedAt)
        : new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Sitemap Error:", error);
  }

  return [...staticPages, ...blogPages];
}