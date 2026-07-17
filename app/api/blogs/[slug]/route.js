import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Slug is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("kayakalap");

    const blogCollection = db.collection("blogs");
    const categoryCollection = db.collection("categories");

    // Find blog by slug
    const blog = await blogCollection.findOne({
      slug,
      status: "published",
    });

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    // Fetch category
    let category = null;

    if (blog.category) {
      try {
        category = await categoryCollection.findOne({
          _id: new ObjectId(blog.category),
        });
      } catch {
        // In case category is stored as a string instead of ObjectId
        category = await categoryCollection.findOne({
          slug: blog.category,
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        _id: blog._id,
        title: blog.title,
        slug: blog.slug,
        content: blog.content,
        metaTitle: blog.metaTitle,
        metaDescription: blog.metaDescription,
        featuredImage: blog.featuredImage,
        createdAt: blog.createdAt,

        category: {
          id: category?._id || null,
          name: category?.name || null,
          slug: category?.slug || null,
        },
      },
    });
  } catch (error) {
    console.error("BLOG DETAIL API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blog",
      },
      { status: 500 }
    );
  }
}