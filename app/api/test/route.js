import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  try {
    const response = await client.responses.create({
      model: "gpt-5.6",
      input: "Say hello"
    });

    return Response.json({
      success: true,
      text: response.output_text
    });
  } catch (err) {
    return Response.json({
      success: false,
      error: err.message
    });
  }
}