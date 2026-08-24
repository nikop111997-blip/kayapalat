import { handleUpload } from "@vercel/blob/client";
import { del } from "@vercel/blob";

export async function POST(request) {
  try {
    const body = await request.json();

    const jsonResponse = await handleUpload({
      request,
      body,

      onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
          ],
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({
            pathname,
          }),
        };
      },

      onUploadCompleted: async ({ blob }) => {
        console.log("Uploaded:", blob.url);
      },
    });

    return Response.json(jsonResponse);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return Response.json(
        { error: "Blob URL is required" },
        { status: 400 }
      );
    }

    await del(url);

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error("Blob delete error:", error);

    return Response.json(
      {
        error: error?.message || "Failed to delete image",
      },
      {
        status: 500,
      }
    );
  }
}