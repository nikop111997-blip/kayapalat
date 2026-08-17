export const REPORT_SCHEMA = {
  type: "object",

  additionalProperties: false,

  properties: {
    coverHeadline: {
      type: "string",
    },

    executiveSummary: {
      type: "string",
    },

    healthSnapshot: {
      type: "string",
    },

    bodyAnalysis: {
      type: "string",
    },

    lifestyleAnalysis: {
      type: "string",
    },

    scoreExplanation: {
      type: "string",
    },

    hiddenPatterns: {
      type: "string",
    },

    futureStory: {
      type: "object",

      additionalProperties: false,

      properties: {
        ifNoChange: {
          type: "string",
        },

        ifImproved: {
          type: "string",
        },
      },

      required: [
        "ifNoChange",
        "ifImproved",
      ],
    },

    healthPotentialStory: {
      type: "string",
    },

    coachSummary: {
      type: "string",
    },

    motivation: {
      type: "string",
    },

    coachLetter: {
      type: "string",
    },

    strengths: {
      type: "array",

      items: {
        type: "string",
      },
    },

    attentionAreas: {
      type: "array",

      items: {
        type: "string",
      },
    },

    priorityActions: {
      type: "array",

      items: {
        type: "string",
      },
    },

    riskFactors: {
      type: "array",

      items: {
        type: "string",
      },
    },

    positiveHabits: {
      type: "array",

      items: {
        type: "string",
      },
    },

    healthInsights: {
      type: "array",

      items: {
        type: "string",
      },
    },

    achievementHighlights: {
      type: "array",

      items: {
        type: "string",
      },
    },

    mythsToKnow: {
      type: "array",

      items: {
        type: "object",

        additionalProperties: false,

        properties: {
          title: {
            type: "string",
          },

          fact: {
            type: "string",
          },
        },

        required: [
          "title",
          "fact",
        ],
      },
    },

    nextMilestones: {
      type: "array",

      items: {
        type: "string",
      },
    },

    pdfHighlights: {
      type: "array",

      items: {
        type: "object",

        additionalProperties: false,

        properties: {
          title: {
            type: "string",
          },

          description: {
            type: "string",
          },
        },

        required: [
          "title",
          "description",
        ],
      },
    },
  },

  required: [
    "coverHeadline",
    "executiveSummary",
    "healthSnapshot",
    "bodyAnalysis",
    "lifestyleAnalysis",
    "scoreExplanation",
    "hiddenPatterns",
    "futureStory",
    "healthPotentialStory",
    "coachSummary",
    "motivation",
    "coachLetter",
    "strengths",
    "attentionAreas",
    "priorityActions",
    "riskFactors",
    "positiveHabits",
    "healthInsights",
    "achievementHighlights",
    "mythsToKnow",
    "nextMilestones",
    "pdfHighlights",
  ],
};