import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("kayakalap");
    const blogsCol = db.collection("blogs");
    const categoriesCol = db.collection("categories"); // change if your collection name differs

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    // Only published blogs
    const filter = { status: "published" };

    // Get blogs (content is needed only to calculate read time)
    const blogs = await blogsCol
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .project({
        title: 1,
        slug: 1,
        metaDescription: 1,
        featuredImage: 1,
        createdAt: 1,
        category: 1,
        content: 1,
      })
      .toArray();

    // Look up category names in one query
    const categoryIds = [
      ...new Set(blogs.map((b) => b.category).filter(Boolean)),
    ]
      .filter((id) => ObjectId.isValid(id))
      .map((id) => new ObjectId(id));

    const categories = categoryIds.length
      ? await categoriesCol.find({ _id: { $in: categoryIds } }).toArray()
      : [];

    const categoryMap = {};
    categories.forEach((c) => {
      categoryMap[c._id.toString()] = c.name; // change "name" if your field is different
    });

    // Add category name + read time, and drop the heavy content field
    const data = blogs.map(({ content, category, ...blog }) => {
      const wordCount = JSON.stringify(content || "").split(" ").length;
      const readTime = Math.max(1, Math.ceil(wordCount / 200));

      return {
        ...blog,
        category: categoryMap[category?.toString()] || "Uncategorized",
        readTime,
      };
    });

    // Total count for pagination
    const total = await blogsCol.countDocuments(filter);

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("BLOG API ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}