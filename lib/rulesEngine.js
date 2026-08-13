// ReportData shape (plain object, no TS types since this is a JS project):
// {
//   score, scoreLabel, scoreColor: "green"|"yellow"|"orange"|"red",
//   bmi, bmiCategory, whtr, whtrRisk, bodyShape, lifestyleSummary,
//   strengths: string[], areasForAttention: string[], futureOutlook: string[],
//   actionPlan: string[], membership: "Gold"|"Elite", membershipReason,
//   breakdown: { label, value }[]
// }

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function calcBMI(weightKg, heightCm) {
  if (!weightKg || !heightCm) return null;
  const h = heightCm / 100;
  return Math.round((weightKg / (h * h)) * 10) / 10;
}

function bmiCategory(bmi) {
  if (bmi === null) return "Not available";
  if (bmi < 18.5) return "Below typical range";
  if (bmi < 25) return "Within typical range";
  if (bmi < 30) return "Above typical range";
  return "Well above typical range";
}

function calcWHtR(waistCm, heightCm) {
  if (!waistCm || !heightCm) return null;
  return Math.round((waistCm / heightCm) * 100) / 100;
}

function whtrRisk(ratio) {
  if (ratio === null) return "Not available";
  if (ratio < 0.46) return "Lower relative risk";
  if (ratio < 0.53) return "Moderate relative risk";
  if (ratio < 0.58) return "Elevated relative risk";
  return "High relative risk";
}

function bodyShape(ratio) {
  if (ratio === null) return "Not assessed";
  if (ratio < 0.46) return "Lean, balanced proportions";
  if (ratio < 0.53) return "Balanced proportions";
  if (ratio < 0.58) return "Central-weighted proportions";
  return "Strongly central-weighted proportions";
}

const activityScore = {
  Sedentary: 20,
  "Lightly Active": 50,
  "Moderately Active": 75,
  "Highly Active": 95,
};

const freqScore = {
  Never: 15,
  "1–2 Days": 45,
  "3–4 Days": 75,
  "5+ Days": 95,
};

const sleepScore = {
  Excellent: 95,
  Good: 75,
  Average: 50,
  Poor: 20,
};

const stressScoreMap = {
  Low: 90,
  Moderate: 65,
  High: 35,
  "Very High": 15,
};

const eatingScore = {
  "Mostly Whole & Balanced": 95,
  "Fairly Good": 70,
  Inconsistent: 45,
  "Mostly Processed / Unplanned": 20,
};

function scoreColorFor(score) {
  if (score >= 80) return "green";
  if (score >= 60) return "yellow";
  if (score >= 40) return "orange";
  return "red";
}

function scoreLabelFor(score) {
  if (score >= 80) return "Thriving";
  if (score >= 60) return "Building Momentum";
  if (score >= 40) return "Needs Attention";
  return "Time to Act";
}

export function generateReport(a) {
  const bmi = calcBMI(a.weight, a.height);
  const whtr = calcWHtR(a.waist, a.height);
  const bmiCat = bmiCategory(bmi);
  const whtrLevel = whtrRisk(whtr);
  const shape = bodyShape(whtr);

  const activity = a.activityLevel ? activityScore[a.activityLevel] ?? 50 : 50;
  const freq = a.exerciseFrequency ? freqScore[a.exerciseFrequency] ?? 50 : 50;
  const energy = a.energyLevel ? a.energyLevel * 10 : 50;
  const sleep = a.sleepQuality ? sleepScore[a.sleepQuality] ?? 50 : 50;
  const stress = a.stressLevel ? stressScoreMap[a.stressLevel] ?? 50 : 50;
  const eating = a.eatingHabits ? eatingScore[a.eatingHabits] ?? 50 : 50;

  let bodyComposite = 70;
  if (bmi !== null) {
    if (bmi < 18.5) bodyComposite = 60;
    else if (bmi < 25) bodyComposite = 90;
    else if (bmi < 30) bodyComposite = 60;
    else bodyComposite = 35;
  }
  if (whtr !== null) {
    if (whtr < 0.46) bodyComposite = (bodyComposite + 90) / 2;
    else if (whtr < 0.53) bodyComposite = (bodyComposite + 75) / 2;
    else if (whtr < 0.58) bodyComposite = (bodyComposite + 45) / 2;
    else bodyComposite = (bodyComposite + 25) / 2;
  }

  const lifestyleComposite =
    activity * 0.22 +
    freq * 0.18 +
    energy * 0.15 +
    sleep * 0.18 +
    stress * 0.15 +
    eating * 0.12;

  const overall = clamp(Math.round(bodyComposite * 0.45 + lifestyleComposite * 0.55), 5, 98);

  const strengths = [];
  const attention = [];

  if (activity >= 70) strengths.push("A genuinely active daily routine");
  else attention.push("Physical activity levels lower than ideal");

  if (freq >= 70) strengths.push("Consistent exercise frequency");
  else if (freq < 45) attention.push("Infrequent structured exercise");

  if (sleep >= 70) strengths.push("Healthy, restorative sleep habits");
  else attention.push("Sleep quality that could be improved");

  if (stress >= 65) strengths.push("Well-managed stress levels");
  else attention.push("Elevated day-to-day stress");

  if (eating >= 70) strengths.push("A mostly whole-food, balanced diet");
  else attention.push("Eating patterns that are inconsistent or processed-heavy");

  if (energy >= 65) strengths.push("Strong, steady daily energy");
  else attention.push("Energy levels that dip through the day");

  if (bmi !== null && bmi >= 18.5 && bmi < 25) strengths.push("A body weight within a typical, healthy range");
  if (whtr !== null && whtr >= 0.53) attention.push("Abdominal fat sitting above a healthy proportion for your height");
  if (whtr !== null && whtr < 0.46) strengths.push("Strong body proportions relative to your height");

  const futureOutlook = [];
  if (activity < 70 || freq < 70) futureOutlook.push("Progressive loss of fitness and muscle tone");
  if (whtr !== null && whtr >= 0.53) futureOutlook.push("Continued increase in abdominal fat");
  if (eating < 70) futureOutlook.push("Slow, steady weight gain over time");
  if (sleep < 70 || stress < 65) futureOutlook.push("Reduced energy and higher day-to-day fatigue");
  if (bmi !== null && bmi >= 25) futureOutlook.push("Greater strain on joints and mobility");
  futureOutlook.push("Higher long-term cardiometabolic risk if patterns continue");
  futureOutlook.push("A gradual decline in overall quality of life");

  const actionPlan = [];
  if (activity < 70 || freq < 70) actionPlan.push("Add short daily movement sessions — even 20 minutes of brisk walking counts");
  if (sleep < 70) actionPlan.push("Build a consistent wind-down routine to protect sleep quality");
  if (eating < 70) actionPlan.push("Reduce processed foods and anchor meals around whole ingredients");
  if (stress < 65) actionPlan.push("Introduce a short daily stress-reset practice — breathwork, a walk, or journaling");
  if (whtr !== null && whtr >= 0.53) actionPlan.push("Begin structured strength training to support a healthier waist-to-height ratio");
  actionPlan.push("Get accountability and a personalised plan through Kayapalat coaching");

  const lifestyleSummary =
    lifestyleComposite >= 75
      ? "Your daily habits are largely working in your favour."
      : lifestyleComposite >= 50
      ? "Your daily habits show a mix of strong and shaky foundations."
      : "Your daily habits are currently working against your long-term health.";

  const membership = overall < 55 || (whtr !== null && whtr >= 0.53) ? "Elite" : "Gold";
  const membershipReason =
    membership === "Elite"
      ? "Your results suggest you'd benefit from closer, higher-touch guidance to reverse current trends quickly."
      : "Your results suggest steady, guided coaching will help you build on the momentum you already have.";

  return {
    score: overall,
    scoreLabel: scoreLabelFor(overall),
    scoreColor: scoreColorFor(overall),
    bmi,
    bmiCategory: bmiCat,
    whtr,
    whtrRisk: whtrLevel,
    bodyShape: shape,
    lifestyleSummary,
    strengths: strengths.slice(0, 4),
    areasForAttention: attention.slice(0, 4),
    futureOutlook: futureOutlook.slice(0, 5),
    actionPlan: actionPlan.slice(0, 5),
    membership,
    membershipReason,
    breakdown: [
      { label: "Weight Status", value: bmi !== null ? clamp(Math.round(bodyComposite), 5, 98) : 50 },
      { label: "Abdominal Fat Risk", value: whtr !== null ? clamp(100 - Math.round((whtr - 0.4) * 200), 5, 98) : 50 },
      { label: "Lifestyle", value: clamp(Math.round(lifestyleComposite), 5, 98) },
      { label: "Sleep & Energy", value: clamp(Math.round((sleep + energy) / 2), 5, 98) },
      { label: "Stress Balance", value: clamp(Math.round(stress), 5, 98) },
    ],
  };
}
