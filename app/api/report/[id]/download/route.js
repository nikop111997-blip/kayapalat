import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  let browser;

  try {
    const { id } = await params;

    const client = await clientPromise;

    const db = client.db("kayakalap");

    const reportDoc =
      await db.collection("health_reports").findOne({
        _id: new ObjectId(id),
      });

    if (!reportDoc) {
      return NextResponse.json(
        {
          error: "Report not found",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * Open browser
     */
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ],
    });

    const page = await browser.newPage();

    /*
     * Open your report-print page
     */
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      "https://www.kayapalat.in";

    await page.goto(
      `${baseUrl}/report/print/${id}`,
      {
        waitUntil: "networkidle0",
      }
    );

    /*
     * Generate A4 PDF
     */
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,

      margin: {
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
      },
    });

    await browser.close();

    return new NextResponse(pdf, {
      status: 200,

      headers: {
        "Content-Type": "application/pdf",

        "Content-Disposition": `attachment; filename="Kayapalat-Health-Report-${id}.pdf"`,

        "Content-Length": pdf.length.toString(),
      },
    });

  } catch (error) {
    console.error(
      "PDF generation error:",
      error
    );

    if (browser) {
      await browser.close();
    }

    return NextResponse.json(
      {
        error: "Failed to generate PDF",
      },
      {
        status: 500,
      }
    );
  }
}