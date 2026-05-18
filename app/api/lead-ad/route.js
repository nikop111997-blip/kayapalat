import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const body = await req.json();

    // ================= GET DATA =================
    const {
      fullName,
      phone,
      email,
      city,
      goal,
      currentWeight,
      source,

      // Tracking
      utm_source,
      utm_medium,
      utm_campaign,
    } = body;

    // ================= CLEAN =================
    const trimmedName = fullName?.trim();
    const trimmedEmail = email?.trim();
    const trimmedCity = city?.trim();

    let cleanedPhone = phone?.replace(/\D/g, "");

    // Remove country code if present
    if (cleanedPhone?.startsWith("91") && cleanedPhone.length > 10) {
      cleanedPhone = cleanedPhone.slice(-10);
    }

    // ================= VALIDATION =================

    // Name
    if (!trimmedName) {
      return Response.json(
        {
          success: false,
          message: "Name is required",
        },
        { status: 400 }
      );
    }

    // Email
    if (!trimmedEmail) {
      return Response.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      return Response.json(
        {
          success: false,
          message: "Please enter a valid email address",
        },
        { status: 400 }
      );
    }

    // Phone
    if (!cleanedPhone) {
      return Response.json(
        {
          success: false,
          message: "Phone number is required",
        },
        { status: 400 }
      );
    }

    // Indian mobile validation
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(cleanedPhone)) {
      return Response.json(
        {
          success: false,
          message:
            "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9",
        },
        { status: 400 }
      );
    }

    // City
    if (!trimmedCity) {
      return Response.json(
        {
          success: false,
          message: "City is required",
        },
        { status: 400 }
      );
    }

    // Goal
    if (!goal) {
      return Response.json(
        {
          success: false,
          message: "Please select your goal",
        },
        { status: 400 }
      );
    }

    // Source
    if (!source) {
      return Response.json(
        {
          success: false,
          message: "Please select where you heard about us",
        },
        { status: 400 }
      );
    }

    // ================= META =================
    const forwarded = req.headers.get("x-forwarded-for");

    const ip = forwarded
      ? forwarded.split(",")[0]
      : req.headers.get("x-real-ip") || "Unknown";

    const userAgent = req.headers.get("user-agent") || "Unknown";

    // ================= DATABASE =================
    const client = await clientPromise;

    const db = client.db("kayakalap");

    const result = await db.collection("lead_ad").insertOne({
      fullName: trimmedName,
      email: trimmedEmail,
      phone: cleanedPhone,
      city: trimmedCity,
      goal: goal || null,
      currentWeight: currentWeight || null,
      source: source || null,

      // UTM Tracking
      utm_source: utm_source || "direct",
      utm_medium: utm_medium || "website",
      utm_campaign: utm_campaign || "default",

      ip,
      userAgent,

      createdAt: new Date(),
    });

    // ================= RESPONSE =================
    return Response.json(
      {
        success: true,
        message: "Lead submitted successfully",
        insertedId: result.insertedId,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Lead API Error:", error);

    return Response.json(
      {
        success: false,
        message: "Server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
