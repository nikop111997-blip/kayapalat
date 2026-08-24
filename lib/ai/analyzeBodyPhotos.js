import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeBodyPhotos({
  frontUrl,
  sideUrl,
  answers = {},
}) {
  if (!frontUrl && !sideUrl) {
    return {
      available: false,
      reason: "No body photos were uploaded.",
    };
  }

  const imageInputs = [];

  if (frontUrl) {
    imageInputs.push({
      type: "input_image",
      image_url: frontUrl,
      detail: "high",
    });
  }

  if (sideUrl) {
    imageInputs.push({
      type: "input_image",
      image_url: sideUrl,
      detail: "high",
    });
  }

  const prompt = `
You are analyzing optional front-view and side-view body photos
for a wellness and posture assessment.

IMPORTANT:
- This is a visual wellness assessment, not a medical diagnosis.
- Do not diagnose diseases or medical conditions.
- Do not estimate exact body fat percentage from photographs.
- Do not make claims about internal health.
- Do not identify the person.
- Only describe visible physical characteristics that can reasonably
  be observed from the provided images.
- If something cannot be confidently assessed, return null or
  "insufficient_information".
- Be neutral, respectful and non-judgmental.
- Do not make attractiveness judgments.

The user's measured information is:

Height: ${answers.height ?? "not provided"}
Weight: ${answers.weight ?? "not provided"}
Waist: ${answers.waist ?? "not provided"}
Chest: ${answers.chest ?? "not provided"}
Hip: ${answers.hip ?? "not provided"}

Analyze the uploaded images and return ONLY valid JSON.

Use this exact structure:

{
  "available": true,

  "imageQuality": {
    "front": {
      "quality": "good | fair | poor | insufficient_information",
      "issues": []
    },
    "side": {
      "quality": "good | fair | poor | insufficient_information",
      "issues": []
    }
  },

  "bodyShape": {
    "overall": "string or insufficient_information",
    "upperBody": "string or insufficient_information",
    "midsection": "string or insufficient_information",
    "lowerBody": "string or insufficient_information",
    "symmetry": "string or insufficient_information"
  },

  "posture": {
    "overall": "good | mildly_imperfect | noticeably_imperfect | insufficient_information",

    "headPosition": {
      "observation": "string",
      "confidence": 0.0
    },

    "shoulders": {
      "observation": "string",
      "confidence": 0.0
    },

    "upperBack": {
      "observation": "string",
      "confidence": 0.0
    },

    "lowerBack": {
      "observation": "string",
      "confidence": 0.0
    },

    "pelvis": {
      "observation": "string",
      "confidence": 0.0
    },

    "knees": {
      "observation": "string",
      "confidence": 0.0
    },

    "feet": {
      "observation": "string",
      "confidence": 0.0
    }
  },

  "visibleObservations": [
    "string"
  ],

  "possiblePosturePatterns": [
    {
      "pattern": "string",
      "evidence": "string",
      "confidence": 0.0
    }
  ],

  "strengths": [
    "string"
  ],

  "areasToImprove": [
    "string"
  ],

  "recommendations": [
    {
      "area": "posture | mobility | general_fitness | lifestyle",
      "recommendation": "string"
    }
  ],

  "limitations": [
    "string"
  ],

  "summary": "string"
}

Confidence must be between 0 and 1.

Do not invent measurements that cannot be obtained from the photos.
`;

  try {
    const response = await openai.responses.create({
      model: "gpt-5-nano",

      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: prompt,
            },

            ...imageInputs,
          ],
        },
      ],
    });

    const text = response.output_text?.trim();

    if (!text) {
      throw new Error("AI returned an empty response.");
    }

    // Remove markdown JSON fences if the model returns them
    const cleaned = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const analysis = JSON.parse(cleaned);

    return analysis;
  } catch (error) {
    console.error(
      "Body photo analysis failed:",
      error
    );

    return {
      available: false,
      error: "Unable to analyze body photos.",
    };
  }
}