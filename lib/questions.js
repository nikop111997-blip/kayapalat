
export const steps = [
  {
    id: "intro",
    type: "bot",
    bot: () =>
      "Hey, I'm here to help you take your Health Reality Check — it takes about 3 minutes, and you'll get a personalised report at the end. No judgement, just an honest look at where you stand today.",
  },
  {
    id: "age",
    key: "age",
    type: "number",
    bot: () => "Let's start simple — how old are you?",
    unit: "years",
    placeholder: "e.g. 34",
  },
  {
    id: "gender",
    key: "gender",
    type: "choice",
    bot: (a) => `Got it${a.age ? `, ${a.age}` : ""}. And how do you identify?`,
    options: ["Male", "Female", "Prefer not to say"],
  },
  {
    id: "height",
    key: "height",
    type: "number",
    bot: () => "How tall are you? (in centimetres)",
    unit: "cm",
    placeholder: "e.g. 172",
      helperTools:[
        "convert",
        "measure"
    ]
  },
  {
    id: "weight",
    key: "weight",
    type: "number",
    bot: () => "And what's your current weight? (in kilograms)",
    unit: "kg",
    placeholder: "e.g. 78",
  },
  {
    id: "waist",
    key: "waist",
    type: "number",
    bot: () =>
      "One more measurement — what's your waist circumference in centimetres? Measure around your navel while standing normally.",
    unit: "cm",
    placeholder: "e.g. 90",
    helper: "Measure around your navel while standing normally.",
      helperTools:[
        "convert",
        "measure"
    ]
  },
  {
    id: "activityLevel",
    key: "activityLevel",
    type: "choice",
    bot: () => "Nice, thanks for those. Now let's talk about your day-to-day — how physically active are you generally?",
    options: ["Sedentary", "Lightly Active", "Moderately Active", "Highly Active"],
  },
  {
    id: "exerciseFrequency",
    key: "exerciseFrequency",
    type: "choice",
    bot: () => "On average, how many days a week do you actually exercise?",
    options: ["Never", "1–2 Days", "3–4 Days", "5+ Days"],
  },
  {
    id: "energyLevel",
    key: "energyLevel",
    type: "slider",
    bot: () => "If you had to rate your daily energy on a scale of 1 to 10, where would you land?",
    min: 1,
    max: 10,
  },
  {
    id: "sleepQuality",
    key: "sleepQuality",
    type: "choice",
    bot: () => "How would you describe your sleep lately?",
    options: ["Excellent", "Good", "Average", "Poor"],
  },
  {
    id: "stressLevel",
    key: "stressLevel",
    type: "choice",
    bot: () => "And your stress levels day to day?",
    options: ["Low", "Moderate", "High", "Very High"],
  },
  {
    id: "eatingHabits",
    key: "eatingHabits",
    type: "choice",
    bot: () => "How would you describe your eating habits right now?",
    options: [
      "Mostly Whole & Balanced",
      "Fairly Good",
      "Inconsistent",
      "Mostly Processed / Unplanned",
    ],
  },
  {
    id: "primaryChallenge",
    key: "primaryChallenge",
    type: "choice",
    bot: () => "If you had to name just one thing — what's your biggest health challenge today?",
    options: [
      "Weight Loss",
      "Belly Fat",
      "Low Energy",
      "Poor Fitness",
      "Joint Pain",
      "Lifestyle Diseases",
      "Stress",
      "Staying Consistent",
      "Building Muscle",
      "Other",
    ],
  },
  {
    id: "goals",
    key: "goals",
    type: "multi",
    bot: () =>
      "Last one on this topic — what would you like to achieve over the next 6 months? Pick as many as you like.",
    options: [
      "Lose Weight",
      "Reduce Belly Fat",
      "Improve Overall Health",
      "Increase Energy",
      "Improve Fitness & Stamina",
      "Build Strength",
      "Improve Mobility",
      "Improve Sleep",
      "Reduce Stress",
      "Better Manage Lifestyle Conditions",
      "Feel More Confident",
      "Develop Better Eating Habits",
      "Build Consistency",
      "Prepare for a Fitness Event",
      "Maintain My Current Health",
    ],
  },
 {
  id: "photos",
  key: "photos",
  type: "photo",
  bot: () =>
    "You're almost done — your report is already coming together. Want a more detailed posture and body shape read? You can upload a front-view and side-view photo. Totally optional.",
},
  {
    id: "contact",
    type: "contact",
    bot: () => "Last step! Where should I send your personalised Health Reality Report?",
  },
  {
    id: "report",
    type: "report",
    bot: () => "Here's what your Health Reality Report is telling me:",
  },
];
