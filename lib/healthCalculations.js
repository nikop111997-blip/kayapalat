

export function generateHealthReportData(userData) {
  // 1. Basic Parse
  const weight = parseFloat(userData.weight);
  const heightCm = parseFloat(userData.height);
  const heightM = heightCm / 100;
  const waist = parseFloat(userData.waist);
  const age = parseInt(userData.age);
  const gender = userData.gender;

  // 2. Calculate BMI & Weight Category
  const bmi = (weight / (heightM * heightM)).toFixed(1);
  let weightCategory = "Normal weight";
  if (bmi < 18.5) weightCategory = "Underweight";
  else if (bmi >= 25 && bmi < 29.9) weightCategory = "Overweight";
  else if (bmi >= 30) weightCategory = "Obesity Risk"; // Using 'Risk' for compliance

  // 3. Waist-to-Height Ratio & Abdominal Fat Risk Indicator
  const whtr = (waist / heightCm).toFixed(2);
  let abdominalFatRisk = "Low Risk";
  if (whtr >= 0.5 && whtr < 0.6) abdominalFatRisk = "Moderate Risk";
  else if (whtr >= 0.6) abdominalFatRisk = "High Risk";
const targetMinWeight = Number(
    (18.5 * heightM * heightM).toFixed(1)
  );

  const targetMaxWeight = Number(
    (24.9 * heightM * heightM).toFixed(1)
  );

  const targetWaist = Number(
    (heightCm * 0.53).toFixed(1)
  );

  const targetZone = {
    weight: {
      current: weight,
      min: targetMinWeight,
      max: targetMaxWeight,
      unit: "kg",
      status:
        weight < targetMinWeight
          ? "Below reference range"
          : weight > targetMaxWeight
          ? "Above reference range"
          : "Within reference range",
    },

    waist: {
      current: waist,
      targetMax: targetWaist,
      unit: "cm",
      status:
        waist <= targetWaist
          ? "Within reference zone"
          : "Above reference zone",
    },

    bmi: {
      current: Number(bmi),
      min: 18.5,
      max: 24.9,
      unit: "BMI",
    },

    waistToHeightRatio: {
      current: Number(whtr),
      targetMax: 0.53,
      unit: "ratio",
    },

    // Helpful progress numbers for the UI
    weightGap:
      weight > targetMaxWeight
        ? Number((weight - targetMaxWeight).toFixed(1))
        : 0,

    waistGap:
      waist > targetWaist
        ? Number((waist - targetWaist).toFixed(1))
        : 0,
  };
  // 4. Mock Wellness Score Calculation (Out of 100)
  // In a real app, you would weight these based on Kayapalat's specific methodology
  let score = 100;
  
  // Deduct points based on lifestyle inputs
  if (bmi >= 25) score -= 10;
  if (whtr >= 0.5) score -= 10;
  if (userData.activity && userData.activity.includes('Sedentary')) score -= 15;
  if (userData.sleep === 'Poor') score -= 10;
  if (userData.stress === 'High' || userData.stress === 'Very High') score -= 10;
  if (userData.eating && userData.eating.includes('Processed')) score -= 10;
  
  // Ensure score stays within bounds
  score = Math.max(10, Math.min(score, 100));

  // 5. Future Outlook (Strictly using "May increase the likelihood of...")
  const futureRisks = [];
  if (score < 60) {
    futureRisks.push("Progressive weight gain");
    futureRisks.push("Reduced energy");
  }
  if (abdominalFatRisk === "High Risk") {
    futureRisks.push("Higher cardiometabolic risk");
    futureRisks.push("Increased abdominal fat");
  }
  if (userData.activity && userData.activity.includes('Sedentary')) {
    futureRisks.push("Loss of muscle strength");
    futureRisks.push("Declining mobility");
  }

  // 6. Action Plan Recommendations
  const actionPlan = [];
  if (userData.activity && userData.activity.includes('Sedentary')) {
    actionPlan.push("Increase daily movement with a 20-minute walk.");
  }
  if (userData.sleep === 'Poor' || userData.sleep === 'Average') {
    actionPlan.push("Improve sleep consistency by setting a strict bedtime.");
  }
  if (userData.eating && userData.eating.includes('Processed')) {
    actionPlan.push("Reduce processed foods and prioritize whole, balanced meals.");
  }
  
  // Default recommendations if none triggered
  if (actionPlan.length === 0) {
    actionPlan.push("Maintain your current active lifestyle.");
    actionPlan.push("Begin structured strength training.");
  }
  
  // Always include coaching CTA
  actionPlan.push("Seek accountability through professional coaching.");

  // 7. Membership Recommendation
  const recommendedMembership = score >= 70 ? "🔵 Elite Membership" : "🟢 Gold Membership";

  // Return the compiled data payload ready for the Report UI
  return {
  personal: {
    name: userData.name,
    email: userData.email,
    age,
    gender,
  },

  metrics: {
    wellnessScore: score,
    bmi: Number(bmi),
    weightCategory,
    waistToHeightRatio: Number(whtr),
    abdominalFatRisk,
    height: heightCm,
    weight,
    waist,
  },
targetZone,
  lifestyle: {
    activity: userData.activity,
    exerciseFrequency: userData.exerciseFrequency,
    sleep: userData.sleep,
    stress: userData.stress,
    eating: userData.eating,
    energy: userData.energy,
    challenge: userData.challenge,
  },

  analysis: {
    futureOutlook: futureRisks,
    actionPlan,
  },

  membership: {
    plan: recommendedMembership,
    reason:
      score >= 70
        ? "User has a solid health foundation but would benefit from structured coaching."
        : "User requires closer guidance to improve health indicators.",
  },
};
}