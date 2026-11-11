
import crypto from "crypto";

const META_API_VERSION = "v26.0";

async function sha256(value) {
  return crypto
    .createHash("sha256")
    .update(value)
    .digest("hex");
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function normalizeIndianPhone(phone) {
  let digits = String(phone || "").replace(/\D/g, "");

  // Assumes a 10-digit number is an Indian mobile number.
  if (digits.length === 10) digits = `91${digits}`;

  return digits;
}

export async function sendMetaEvent({
  eventName,
  eventId,
  lead,
  metaAttribution,
  clientIp,
  userAgent,
  eventSourceUrl,
}) {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    throw new Error("Meta CAPI environment variables are missing.");
  }

  const userData = {};

  const email = normalizeEmail(lead.email);
  const phone = normalizeIndianPhone(lead.phone);

  if (email) userData.em = [await sha256(email)];
  if (phone) userData.ph = [await sha256(phone)];

  if (metaAttribution?.fbp) {
    userData.fbp = metaAttribution.fbp;
  }

  if (metaAttribution?.fbc) {
    userData.fbc = metaAttribution.fbc;
  }

  if (clientIp && !["::1", "127.0.0.1"].includes(clientIp)) {
    userData.client_ip_address = clientIp;
  }

  if (userAgent) {
    userData.client_user_agent = userAgent;
  }

  const event = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    action_source: "website",
    user_data: userData,
  };

  if (eventSourceUrl) {
    event.event_source_url = eventSourceUrl;
  }

  const payload = {
    data: [event],
  };

  // Include only while testing. Remove this in production.
  if (process.env.META_TEST_EVENT_CODE) {
    payload.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  const response = await fetch(
    `https://graph.facebook.com/${META_API_VERSION}/${pixelId}/events`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        access_token: accessToken,
      }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    console.error("Meta CAPI error:", result);
    throw new Error(
      result?.error?.message || "Meta Conversions API request failed."
    );
  }

  return result;
}
