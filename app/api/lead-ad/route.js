
import clientPromise from "@/lib/mongodb";
import { sendMetaEvent } from "@/lib/metaCapi";
import { randomUUID } from "crypto";

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
      metaAttribution,
      utm_source,
      utm_medium,
      utm_campaign,
    } = body;

    // ================= CLEAN =================
    const trimmedName = fullName?.trim();
    const trimmedEmail = email?.trim().toLowerCase();
    const trimmedCity = city?.trim();

    let cleanedPhone = phone?.replace(/\D/g, "");

    if (cleanedPhone?.startsWith("91") && cleanedPhone.length > 10) {
      cleanedPhone = cleanedPhone.slice(-10);
    }

    // ================= VALIDATION =================

    if (!trimmedName) {
      return Response.json(
        { success: false, message: "Name is required" },
        { status: 400 }
      );
    }

    if (!trimmedEmail) {
      return Response.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      return Response.json(
        { success: false, message: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    if (!cleanedPhone) {
      return Response.json(
        { success: false, message: "Phone number is required" },
        { status: 400 }
      );
    }

    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(cleanedPhone)) {
      return Response.json(
        {
          success: false,
          message: "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9",
        },
        { status: 400 }
      );
    }

    if (!trimmedCity) {
      return Response.json(
        { success: false, message: "City is required" },
        { status: 400 }
      );
    }

    if (!goal) {
      return Response.json(
        { success: false, message: "Please select your goal" },
        { status: 400 }
      );
    }

    if (!source) {
      return Response.json(
        { success: false, message: "Please select where you heard about us" },
        { status: 400 }
      );
    }

    // ================= REQUEST DETAILS =================

    const forwarded = req.headers.get("x-forwarded-for");

    const ip = forwarded
      ? forwarded.split(",")[0].trim()
      : req.headers.get("x-real-ip") || null;

    const userAgent = req.headers.get("user-agent") || null;

    const eventSourceUrl =
      req.headers.get("referer") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      null;

    // ================= META ATTRIBUTION =================

    const attribution = {
      fbclid: metaAttribution?.fbclid || null,
      fbp: metaAttribution?.fbp || null,
      fbc: metaAttribution?.fbc || null,
      capturedAt: new Date(),
    };

    // Unique event ID shared with browser Pixel for deduplication
    const eventId = randomUUID();

    // ================= DATABASE =================

    const client = await clientPromise;
    const db = client.db("kayakalap");

    const leadDocument = {
      fullName: trimmedName,
      email: trimmedEmail,
      phone: cleanedPhone,
      city: trimmedCity,
      goal,
      currentWeight: currentWeight || null,
      source,

      metaAttribution: attribution,

      utm_source: utm_source || "direct",
      utm_medium: utm_medium || "website",
      utm_campaign: utm_campaign || "default",

      ip,
      userAgent,

      // Meta conversion tracking
      metaCapi: {
        eventId,
        eventName: "Lead",
        status: "pending",
        sentAt: null,
        response: null,
      },

      createdAt: new Date(),
    };

    const result = await db
      .collection("lead_ad")
      .insertOne(leadDocument);

    // ================= META CONVERSIONS API =================

    let metaStatus = "pending";

    if (
      process.env.META_PIXEL_ID &&
      process.env.META_ACCESS_TOKEN
    ) {
      try {
        const metaResponse = await sendMetaEvent({
          eventName: "Lead",
          eventId,
          lead: {
            email: trimmedEmail,
            phone: cleanedPhone,
          },
          metaAttribution: attribution,
          clientIp: ip,
          userAgent,
          eventSourceUrl,
        });

        metaStatus = "sent";

        await db.collection("lead_ad").updateOne(
          { _id: result.insertedId },
          {
            $set: {
              "metaCapi.status": "sent",
              "metaCapi.sentAt": new Date(),
              "metaCapi.response": {
                events_received: metaResponse.events_received,
                fbtrace_id: metaResponse.fbtrace_id,
              },
            },
          }
        );

      } catch (metaError) {
        console.error(
          "Meta CAPI delivery failed:",
          metaError.message
        );

        metaStatus = "failed";

        await db.collection("lead_ad").updateOne(
          { _id: result.insertedId },
          {
            $set: {
              "metaCapi.status": "failed",
              "metaCapi.lastError": metaError.message,
            },
          }
        );
      }
    } else {
      metaStatus = "not_configured";
    }

    // ================= RESPONSE =================

    return Response.json(
      {
        success: true,
        message: "Lead submitted successfully",
        insertedId: result.insertedId,
        eventId,
        metaStatus,
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
