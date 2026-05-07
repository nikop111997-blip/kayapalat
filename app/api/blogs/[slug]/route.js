import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

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
    const collection = db.collection("blogs");

    // Find blog by slug
    const blog = await collection.findOne({
      slug: slug,
      status: "published",
    });

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
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