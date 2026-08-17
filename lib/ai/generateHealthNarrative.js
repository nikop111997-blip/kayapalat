import { openai } from "@/lib/openai";

import { HEALTH_REPORT_SYSTEM_PROMPT } from "./systemPrompt";
import { REPORT_SCHEMA } from "./reportSchema";
import { FALLBACK_REPORT } from "./fallback";
export async function generateHealthNarrative(report) {
  try {
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",

      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: HEALTH_REPORT_SYSTEM_PROMPT,
            },
          ],
        },

        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: JSON.stringify(report, null, 2),
            },
          ],
        },
      ],

      text: {
        format: {
          type: "json_schema",

          name: "health_report",

          strict: true,

          schema: REPORT_SCHEMA,
        },
      },
    });

    const output = response.output_text;

    if (!output) {
      return FALLBACK_REPORT;
    }

    const parsed = JSON.parse(output);

    return {
      ...FALLBACK_REPORT,
      ...parsed,
    };
  } catch (error) {
    console.error("Health AI Error");

    console.error(error);

    return FALLBACK_REPORT;
  }
}