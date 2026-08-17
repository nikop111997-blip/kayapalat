import puppeteer from "puppeteer";

export async function GET() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    await page.goto("http://localhost:3000/test-pay", {
      waitUntil: "networkidle0",
    });

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

    return new Response(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="Health-Reality-Report.pdf"',
      },
    });
  } finally {
    await browser.close();
  }
}