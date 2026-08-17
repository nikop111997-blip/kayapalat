
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
function estimateBiologicalAge({
  actualAge,
  bmi,
  whtr,
  activityScore,
  sleepScore,
  stressScore,
  eatingScore,
}) {
  let bioAge = actualAge;

  // BMI
  if (bmi >= 30) bioAge += 5;
  else if (bmi >= 25) bioAge += 2;
  else if (bmi >= 18.5 && bmi < 25) bioAge -= 1;

  // Waist-to-height ratio
  if (whtr >= 0.60) bioAge += 4;
  else if (whtr >= 0.53) bioAge += 2;
  else if (whtr < 0.46) bioAge -= 1;

  // Activity
  if (activityScore >= 75) bioAge -= 2;
  else if (activityScore <= 30) bioAge += 2;

  // Sleep
  if (sleepScore >= 75) bioAge -= 1;
  else if (sleepScore <= 30) bioAge += 1;

  // Stress
  if (stressScore <= 35) bioAge += 1;

  // Eating
  if (eatingScore >= 75) bioAge -= 1;
  else if (eatingScore <= 30) bioAge += 1;

  return Math.max(18, Math.round(bioAge));
} 

function estimateBodyFat({ bmi, age, gender }) {
  let bodyFat = 0;

  if (gender === "Male") {
    bodyFat = 1.2 * bmi + 0.23 * age - 16.2;
  } else {
    bodyFat = 1.2 * bmi + 0.23 * age - 5.4;
  }

  bodyFat = Math.max(5, Math.min(bodyFat, 50));

  return Math.round(bodyFat * 10) / 10;
} 

function bodyFatCategory(bodyFat, gender) {
  if (gender === "Male") {
    if (bodyFat < 10) return "Essential";
    if (bodyFat < 18) return "Athletic";
    if (bodyFat < 25) return "Healthy";
    if (bodyFat < 30) return "Above Healthy";
    return "Higher Body Fat";
  }

  if (bodyFat < 18) return "Essential";
  if (bodyFat < 25) return "Athletic";
  if (bodyFat < 32) return "Healthy";
  if (bodyFat < 38) return "Above Healthy";
  return "Higher Body Fat";
} 

function bodyFatScore(bodyFat, gender) {
  const category = bodyFatCategory(bodyFat, gender);

  switch (category) {
    case "Athletic":
      return 95;

    case "Healthy":
      return 85;

    case "Above Healthy":
      return 60;

    case "Higher Body Fat":
      return 35;

    default:
      return 70;
  }
} 
function generateHealthTimeline(a, report) {
  return [
    {
      month: 0,
      title: "Today",
      score: report.score,
      description:
        "Your health assessment establishes your current baseline."
    },

    {
      month: 1,
      title: "30 Days",
      description:
        "Small lifestyle improvements may begin increasing daily energy and consistency."
    },

    {
      month: 3,
      title: "90 Days",
      description:
        "Regular healthy habits may improve fitness, recovery and body composition."
    },

    {
      month: 6,
      title: "180 Days",
      description:
        "Maintaining positive habits may noticeably improve your health score."
    },

    {
      month: 12,
      title: "1 Year",
      description:
        "Long-term consistency may significantly improve overall wellbeing and future health outlook."
    }
  ];
}
function generateImprovementSimulator(a, report) {
  const improvements = [];

  if (report.whtr >= 0.53) {
    improvements.push({
      title: "Reduce Waist by 5 cm",
      impact: "+12",
      scoreGain: 12,
      difficulty: "Medium",
      timeframe: "8–12 Weeks",
      description:
        "Reducing abdominal fat may significantly improve your overall health score and lower future health risks."
    });
  }

  if (a.activityLevel === "Sedentary") {
    improvements.push({
      title: "Become Lightly Active",
      impact: "+10",
      scoreGain: 10,
      difficulty: "Easy",
      timeframe: "2–4 Weeks",
      description:
        "Adding regular movement may improve energy, cardiovascular fitness and overall wellness."
    });
  }

  if (a.exerciseFrequency === "Never") {
    improvements.push({
      title: "Exercise 3 Days / Week",
      impact: "+9",
      scoreGain: 9,
      difficulty: "Medium",
      timeframe: "4–6 Weeks",
      description:
        "Regular exercise supports muscle strength, metabolism and long-term health."
    });
  }

  if (a.sleepQuality === "Poor") {
    improvements.push({
      title: "Improve Sleep Quality",
      impact: "+8",
      scoreGain: 8,
      difficulty: "Easy",
      timeframe: "2 Weeks",
      description:
        "Better sleep improves recovery, focus, energy and stress resilience."
    });
  }

  if (
    a.eatingHabits === "Mostly Processed / Unplanned" ||
    a.eatingHabits === "Inconsistent"
  ) {
    improvements.push({
      title: "Improve Food Quality",
      impact: "+8",
      scoreGain: 8,
      difficulty: "Medium",
      timeframe: "4 Weeks",
      description:
        "A balanced eating pattern may support weight management and sustained energy."
    });
  }

  if (
    a.stressLevel === "High" ||
    a.stressLevel === "Very High"
  ) {
    improvements.push({
      title: "Reduce Daily Stress",
      impact: "+6",
      scoreGain: 6,
      difficulty: "Medium",
      timeframe: "3 Weeks",
      description:
        "Managing stress supports better sleep, recovery and overall wellbeing."
    });
  }

  return improvements.sort((a, b) => b.scoreGain - a.scoreGain);
}
function generateFutureProjection(a, report) {
  const projection = [];

  const currentWeight = Number(a.weight);
  const currentScore = report.score;

  let yearlyWeightGain = 0;

  // Estimate annual weight trend
  if (a.activityLevel === "Sedentary") yearlyWeightGain += 2.5;
  else if (a.activityLevel === "Lightly Active") yearlyWeightGain += 1;

  if (
    a.eatingHabits === "Mostly Processed / Unplanned" ||
    a.eatingHabits === "Inconsistent"
  ) {
    yearlyWeightGain += 2;
  }

  if (a.exerciseFrequency === "Never") {
    yearlyWeightGain += 1.5;
  }

  const yearlyScoreLoss =
    yearlyWeightGain >= 4
      ? 5
      : yearlyWeightGain >= 2
      ? 3
      : 1;

  [1, 3, 5].forEach((years) => {
    projection.push({
      years,
      estimatedWeight: Number(
        (currentWeight + yearlyWeightGain * years).toFixed(1)
      ),
      estimatedScore: Math.max(
        20,
        currentScore - yearlyScoreLoss * years
      ),
    });
  });

  return projection;
}

function generateBadges(a, report) {
  const badges = [];

  // Healthy BMI
  if (report.bmi >= 18.5 && report.bmi < 25) {
    badges.push({
      title: "Healthy Weight",
      icon: "⚖️",
      color: "green",
      description: "Your BMI is within the typical healthy range."
    });
  }

  // Active Lifestyle
  if (
    a.activityLevel === "Moderately Active" ||
    a.activityLevel === "Highly Active"
  ) {
    badges.push({
      title: "Active Lifestyle",
      icon: "🏃",
      color: "blue",
      description: "You maintain a physically active lifestyle."
    });
  }

  // Exercise Habit
  if (
    a.exerciseFrequency === "3–4 Days" ||
    a.exerciseFrequency === "5+ Days"
  ) {
    badges.push({
      title: "Exercise Habit",
      icon: "💪",
      color: "orange",
      description: "You exercise consistently every week."
    });
  }

  // Healthy Sleep
  if (
    a.sleepQuality === "Good" ||
    a.sleepQuality === "Excellent"
  ) {
    badges.push({
      title: "Healthy Sleeper",
      icon: "🌙",
      color: "purple",
      description: "Your sleep supports recovery and wellbeing."
    });
  }

  // Stress Management
  if (a.stressLevel === "Low") {
    badges.push({
      title: "Stress Master",
      icon: "🧘",
      color: "teal",
      description: "You manage daily stress effectively."
    });
  }

  // Healthy Eating
  if (
    a.eatingHabits === "Mostly Whole & Balanced"
  ) {
    badges.push({
      title: "Smart Nutrition",
      icon: "🥗",
      color: "emerald",
      description: "Your eating habits support long-term health."
    });
  }

  // Waist Risk
  if (report.whtr < 0.46) {
    badges.push({
      title: "Healthy Waist",
      icon: "📏",
      color: "cyan",
      description: "Your waist-to-height ratio is in a healthy range."
    });
  }

  // Excellent Score
  if (report.score >= 80) {
    badges.push({
      title: "Health Champion",
      icon: "🏆",
      color: "gold",
      description: "Your overall health score is excellent."
    });
  }

  return badges;
}

export function generateCharts(report) {
  const getBreakdownValue = (label) => {
    return report.breakdown?.find((item) => item.label === label)?.value || 0;
  };

  // Health Radar
  const radar = [
    {
      subject: "Weight",
      score: getBreakdownValue("Weight Status"),
      fullMark: 100,
    },
    {
      subject: "Waist",
      score: getBreakdownValue("Abdominal Fat Risk"),
      fullMark: 100,
    },
    {
      subject: "Lifestyle",
      score: getBreakdownValue("Lifestyle"),
      fullMark: 100,
    },
    {
      subject: "Sleep",
      score: getBreakdownValue("Sleep & Energy"),
      fullMark: 100,
    },
    {
      subject: "Stress",
      score: getBreakdownValue("Stress Balance"),
      fullMark: 100,
    },
  ];

  // Overall Gauge
  const gauge = {
    score: report.score,
    label: report.scoreLabel,
    color: report.scoreColor,
  };

  // BMI Progress
  const bmi = {
    value: report.bmi,
    category: report.bmiCategory,
    min: 15,
    max: 40,
  };

  // WHtR Progress
  const whtr = {
    value: report.whtr,
    risk: report.whtrRisk,
    min: 0.3,
    max: 0.7,
  };

  // Body Fat
  const bodyFat = report.bodyFat
    ? {
        value: report.bodyFat.value,
        category: report.bodyFat.category,
        score: report.bodyFat.score,
      }
    : null;

  // Biological Age
  const biologicalAge = report.biologicalAge
    ? {
        biological: report.biologicalAge,
        actual: report.age,
        difference: report.biologicalAge - report.age,
      }
    : null;

  // Score Breakdown
  const breakdown = report.breakdown.map((item) => ({
    label: item.label,
    score: item.value,
  }));

  // Future Projection
  const projection = report.futureProjection
    ? report.futureProjection.map((item) => ({
        label:
          item.years === 1
            ? "1 Year"
            : item.years === 3
            ? "3 Years"
            : "5 Years",

        healthScore: item.estimatedScore,
        weight: item.estimatedWeight,
      }))
    : [];

  // Improvement Simulator
  const simulator = report.simulator
    ? report.simulator.map((item) => ({
        improvement: item.title,
        gain: item.scoreGain,
      }))
    : [];

  return {
    radar,
    gauge,
    bmi,
    whtr,
    bodyFat,
    biologicalAge,
    breakdown,
    projection,
    simulator,
  };
} 

export function generateInsights(a, report) {
  const insights = [];

  // Body Weight
  if (report.bmi >= 25) {
    insights.push({
      type: "warning",
      title: "Weight Trend",
      message:
        "Your BMI is above the typical healthy range, which may increase the likelihood of future health challenges if current habits continue.",
      priority: 1,
    });
  } else {
    insights.push({
      type: "positive",
      title: "Healthy Weight",
      message:
        "Your BMI is currently within the typical healthy range, providing a strong foundation for long-term wellbeing.",
      priority: 5,
    });
  }

  // Waist
  if (report.whtr >= 0.53) {
    insights.push({
      type: "warning",
      title: "Waist Health",
      message:
        "Your waist measurement appears to have the greatest influence on your current health score.",
      priority: 1,
    });
  }

  // Activity
  if (
    a.activityLevel === "Sedentary" ||
    a.exerciseFrequency === "Never"
  ) {
    insights.push({
      type: "warning",
      title: "Movement",
      message:
        "Increasing daily movement is likely to have one of the biggest positive impacts on your overall health score.",
      priority: 2,
    });
  }

  // Sleep
  if (
    a.sleepQuality === "Poor" ||
    a.sleepQuality === "Average"
  ) {
    insights.push({
      type: "warning",
      title: "Recovery",
      message:
        "Your sleep quality may be limiting recovery, energy levels and long-term health.",
      priority: 3,
    });
  }

  // Stress
  if (
    a.stressLevel === "High" ||
    a.stressLevel === "Very High"
  ) {
    insights.push({
      type: "warning",
      title: "Stress",
      message:
        "High daily stress may reduce energy and make healthy habits harder to maintain.",
      priority: 4,
    });
  }

  // Eating
  if (
    a.eatingHabits === "Mostly Processed / Unplanned" ||
    a.eatingHabits === "Inconsistent"
  ) {
    insights.push({
      type: "warning",
      title: "Nutrition",
      message:
        "Improving food quality may positively influence both your body composition and energy.",
      priority: 3,
    });
  }

  // Excellent Score
  if (report.score >= 80) {
    insights.push({
      type: "positive",
      title: "Excellent Progress",
      message:
        "Your assessment suggests your current lifestyle is supporting your long-term health.",
      priority: 5,
    });
  }

  return insights.sort((a, b) => a.priority - b.priority);
}
export function generateScoreDrivers(a, report) {
  const drivers = [];

  // BMI
  if (report.bmi >= 18.5 && report.bmi < 25) {
    drivers.push({
      factor: "Healthy BMI",
      impact: +18,
      type: "positive",
      description:
        "Your BMI is within the typical healthy range."
    });
  } else if (report.bmi >= 25 && report.bmi < 30) {
    drivers.push({
      factor: "BMI Above Healthy Range",
      impact: -10,
      type: "negative",
      description:
        "Body weight is above the typical healthy range."
    });
  } else if (report.bmi >= 30) {
    drivers.push({
      factor: "High BMI",
      impact: -18,
      type: "negative",
      description:
        "Higher BMI reduced your overall health score."
    });
  }

  // Waist
  if (report.whtr < 0.46) {
    drivers.push({
      factor: "Healthy Waist Ratio",
      impact: +12,
      type: "positive",
      description:
        "Waist-to-height ratio supports good metabolic health."
    });
  } else if (report.whtr >= 0.53) {
    drivers.push({
      factor: "Higher Waist Ratio",
      impact: -12,
      type: "negative",
      description:
        "Abdominal fat reduced your health score."
    });
  }

  // Activity
  if (a.activityLevel === "Sedentary") {
    drivers.push({
      factor: "Sedentary Lifestyle",
      impact: -15,
      type: "negative",
      description:
        "Low daily movement significantly lowered your score."
    });
  } else if (
    a.activityLevel === "Moderately Active" ||
    a.activityLevel === "Highly Active"
  ) {
    drivers.push({
      factor: "Active Lifestyle",
      impact: +12,
      type: "positive",
      description:
        "Regular movement improved your score."
    });
  }

  // Exercise
  if (a.exerciseFrequency === "Never") {
    drivers.push({
      factor: "No Weekly Exercise",
      impact: -10,
      type: "negative",
      description:
        "Lack of structured exercise affected your score."
    });
  } else if (
    a.exerciseFrequency === "3–4 Days" ||
    a.exerciseFrequency === "5+ Days"
  ) {
    drivers.push({
      factor: "Regular Exercise",
      impact: +10,
      type: "positive",
      description:
        "Exercise consistency improved your score."
    });
  }

  // Sleep
  if (a.sleepQuality === "Poor") {
    drivers.push({
      factor: "Poor Sleep",
      impact: -10,
      type: "negative",
      description:
        "Sleep quality affected recovery and energy."
    });
  } else if (
    a.sleepQuality === "Good" ||
    a.sleepQuality === "Excellent"
  ) {
    drivers.push({
      factor: "Good Sleep",
      impact: +8,
      type: "positive",
      description:
        "Healthy sleep supported your wellbeing."
    });
  }

  // Stress
  if (
    a.stressLevel === "High" ||
    a.stressLevel === "Very High"
  ) {
    drivers.push({
      factor: "High Stress",
      impact: -8,
      type: "negative",
      description:
        "Stress lowered your overall health score."
    });
  }

  // Eating
  if (
    a.eatingHabits === "Mostly Processed / Unplanned"
  ) {
    drivers.push({
      factor: "Processed Diet",
      impact: -8,
      type: "negative",
      description:
        "Food quality reduced your overall score."
    });
  } else if (
    a.eatingHabits === "Mostly Whole & Balanced"
  ) {
    drivers.push({
      factor: "Balanced Nutrition",
      impact: +8,
      type: "positive",
      description:
        "Healthy eating habits improved your score."
    });
  }

  drivers.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));

  return drivers;
}
export function generateRiskAssessment(a, report) {
  const risks = [];

  // -----------------------------
  // Cardiometabolic Health
  // -----------------------------
  let cardio = 10;

  if (report.whtr >= 0.53) cardio += 45;
  if (report.bmi >= 25) cardio += 20;
  if (a.activityLevel === "Sedentary") cardio += 15;
  if (
    a.eatingHabits === "Mostly Processed / Unplanned" ||
    a.eatingHabits === "Inconsistent"
  )
    cardio += 10;

  cardio = Math.min(cardio, 95);

  risks.push({
    title: "Cardiometabolic Health",
    score: cardio,
    level:
      cardio >= 70
        ? "High"
        : cardio >= 40
        ? "Moderate"
        : "Low",
    icon: "❤️",
    description:
      "Current body composition and lifestyle patterns may increase the likelihood of future cardiometabolic health concerns if they continue unchanged.",
  });

  // -----------------------------
  // Weight Management
  // -----------------------------
  let weight = 10;

  if (report.bmi >= 25) weight += 35;
  if (report.whtr >= 0.53) weight += 25;
  if (a.activityLevel === "Sedentary") weight += 15;
  if (a.exerciseFrequency === "Never") weight += 10;

  weight = Math.min(weight, 95);

  risks.push({
    title: "Weight Management",
    score: weight,
    level:
      weight >= 70
        ? "High"
        : weight >= 40
        ? "Moderate"
        : "Low",
    icon: "⚖️",
    description:
      "Your current habits may contribute to gradual weight gain over time if maintained.",
  });

  // -----------------------------
  // Energy & Recovery
  // -----------------------------
  let recovery = 15;

  if (a.sleepQuality === "Poor") recovery += 35;
  if (
    a.stressLevel === "High" ||
    a.stressLevel === "Very High"
  )
    recovery += 25;

  if (a.energyLevel <= 2) recovery += 15;

  recovery = Math.min(recovery, 95);

  risks.push({
    title: "Recovery & Energy",
    score: recovery,
    level:
      recovery >= 70
        ? "High"
        : recovery >= 40
        ? "Moderate"
        : "Low",
    icon: "😴",
    description:
      "Sleep quality, stress and recovery patterns may reduce daily energy and overall wellbeing.",
  });

  // -----------------------------
  // Fitness Capacity
  // -----------------------------
  let fitness = 10;

  if (a.activityLevel === "Sedentary") fitness += 40;
  if (a.exerciseFrequency === "Never") fitness += 25;

  fitness = Math.min(fitness, 95);

  risks.push({
    title: "Fitness Capacity",
    score: fitness,
    level:
      fitness >= 70
        ? "High"
        : fitness >= 40
        ? "Moderate"
        : "Low",
    icon: "🏃",
    description:
      "Low activity levels may contribute to declining fitness and muscle strength over time.",
  });

  // -----------------------------
  // Lifestyle Consistency
  // -----------------------------
  let lifestyle = 10;

  if (
    a.eatingHabits === "Mostly Processed / Unplanned"
  )
    lifestyle += 20;

  if (
    a.stressLevel === "High" ||
    a.stressLevel === "Very High"
  )
    lifestyle += 20;

  if (a.sleepQuality === "Poor") lifestyle += 20;

  if (a.activityLevel === "Sedentary") lifestyle += 20;

  lifestyle = Math.min(lifestyle, 95);

  risks.push({
    title: "Lifestyle Consistency",
    score: lifestyle,
    level:
      lifestyle >= 70
        ? "High"
        : lifestyle >= 40
        ? "Moderate"
        : "Low",
    icon: "📊",
    description:
      "Several lifestyle habits are currently working against your long-term health goals.",
  });

  return risks.sort((a, b) => b.score - a.score);
}
export function generateHealthPersona(a, report) {
  let persona = {
    title: "",
    icon: "",
    color: "",
    description: "",
  };

  // Peak Performer
  if (
    report.score >= 85 &&
    report.bmi >= 18.5 &&
    report.bmi < 25 &&
    report.whtr < 0.46
  ) {
    persona = {
      title: "Peak Performer",
      icon: "🏆",
      color: "emerald",
      description:
        "You have built strong lifestyle habits that are supporting excellent overall wellbeing. Your focus should be maintaining consistency.",
    };
  }

  // Momentum Builder
  else if (report.score >= 60) {
    persona = {
      title: "Momentum Builder",
      icon: "🚀",
      color: "blue",
      description:
        "You already have several positive health foundations. Improving a few key habits could significantly increase your overall health score.",
    };
  }

  // Wellness Explorer
  else if (report.score >= 45) {
    persona = {
      title: "Wellness Explorer",
      icon: "🌿",
      color: "green",
      description:
        "Your assessment shows opportunities across multiple lifestyle areas. Small consistent improvements may produce meaningful long-term results.",
    };
  }

  // Fresh Starter
  else {
    persona = {
      title: "Fresh Starter",
      icon: "🌅",
      color: "orange",
      description:
        "Your current assessment suggests there are several lifestyle habits that deserve attention. The encouraging news is that consistent changes can create substantial improvements over time.",
    };
  }

  return persona;
}
export function generateHealthPotential(a, report) {
  let gain = 0;

  // BMI
  if (report.bmi >= 25 && report.bmi < 30) gain += 8;
  if (report.bmi >= 30) gain += 12;

  // Waist
  if (report.whtr >= 0.53 && report.whtr < 0.58) gain += 10;
  if (report.whtr >= 0.58) gain += 15;

  // Activity
  if (a.activityLevel === "Sedentary") gain += 8;
  if (a.activityLevel === "Lightly Active") gain += 4;

  // Exercise
  if (a.exerciseFrequency === "Never") gain += 8;
  else if (a.exerciseFrequency === "1–2 Days") gain += 4;

  // Sleep
  if (a.sleepQuality === "Poor") gain += 6;
  else if (a.sleepQuality === "Average") gain += 3;

  // Stress
  if (
    a.stressLevel === "High" ||
    a.stressLevel === "Very High"
  ) {
    gain += 5;
  }

  // Eating
  if (
    a.eatingHabits === "Mostly Processed / Unplanned"
  ) {
    gain += 8;
  } else if (
    a.eatingHabits === "Inconsistent"
  ) {
    gain += 4;
  }

  gain = Math.min(gain, 35);

  const potentialScore = Math.min(98, report.score + gain);

  let timeframe = "";

  if (gain <= 10) {
    timeframe = "1–3 Months";
  } else if (gain <= 20) {
    timeframe = "3–6 Months";
  } else {
    timeframe = "6–12 Months";
  }

  let level = "";

  if (potentialScore >= 90) level = "Excellent";
  else if (potentialScore >= 80) level = "Very Good";
  else if (potentialScore >= 70) level = "Good";
  else level = "Improving";

  return {
    currentScore: report.score,
    potentialScore,
    possibleGain: gain,
    timeframe,
    level,
    message:
      `Based on your current assessment, improving your lifestyle habits consistently could increase your health score by approximately ${gain} points over ${timeframe}. This is an educational estimate rather than a guaranteed outcome.`,
  };
}
export function generateHealthPriorities(a, report) {
  const priorities = [];

  // Activity
  if (a.activityLevel === "Sedentary") {
    priorities.push({
      title: "Increase Daily Movement",
      impact: 10,
      priority: "Highest",
      icon: "🚶",
      description:
        "Adding regular daily movement is likely to produce one of the biggest improvements in your overall health score.",
    });
  }

  // Exercise
  if (a.exerciseFrequency === "Never") {
    priorities.push({
      title: "Exercise Regularly",
      impact: 9,
      priority: "High",
      icon: "💪",
      description:
        "Building a consistent exercise routine may improve fitness, body composition and energy.",
    });
  }

  // Waist
  if (report.whtr >= 0.53) {
    priorities.push({
      title: "Improve Waist-to-Height Ratio",
      impact: 9,
      priority: "High",
      icon: "📏",
      description:
        "Reducing abdominal fat may positively influence several areas of your health assessment.",
    });
  }

  // Sleep
  if (
    a.sleepQuality === "Poor" ||
    a.sleepQuality === "Average"
  ) {
    priorities.push({
      title: "Improve Sleep Quality",
      impact: 8,
      priority: "High",
      icon: "😴",
      description:
        "Better sleep may improve recovery, energy and long-term wellbeing.",
    });
  }

  // Stress
  if (
    a.stressLevel === "High" ||
    a.stressLevel === "Very High"
  ) {
    priorities.push({
      title: "Reduce Daily Stress",
      impact: 7,
      priority: "Medium",
      icon: "🧘",
      description:
        "Managing stress more effectively may improve overall health and consistency.",
    });
  }

  // Eating
  if (
    a.eatingHabits === "Mostly Processed / Unplanned"
  ) {
    priorities.push({
      title: "Improve Food Quality",
      impact: 8,
      priority: "High",
      icon: "🥗",
      description:
        "Choosing more whole foods may support weight management and sustained energy.",
    });
  }

  // BMI
  if (report.bmi >= 25) {
    priorities.push({
      title: "Improve Weight Status",
      impact: 8,
      priority: "High",
      icon: "⚖️",
      description:
        "Moving toward a healthier weight may positively affect several health indicators.",
    });
  }

  // Already doing well
  if (priorities.length === 0) {
    priorities.push({
      title: "Maintain Your Healthy Lifestyle",
      impact: 5,
      priority: "Maintain",
      icon: "🏆",
      description:
        "Your current habits are supporting your health. Focus on consistency over time.",
    });
  }

  return priorities
    .sort((a, b) => b.impact - a.impact)
    .slice(0, 5);
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

const biologicalAge = estimateBiologicalAge({
  actualAge: Number(a.age),
  bmi,
  whtr,
  activityScore: activity,
  sleepScore: sleep,
  stressScore: stress,
  eatingScore: eating,
});
const bodyFat = estimateBodyFat({
  bmi,
  age: Number(a.age),
  gender: a.gender,
});
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

const report = {
    score: overall,
    scoreLabel: scoreLabelFor(overall),
    scoreColor: scoreColorFor(overall),
    bmi,
    whtr,
    bmiCategory: bmiCat,
    whtrRisk: whtrLevel,
    bodyFat: {
        value: bodyFat,
        category: bodyFatCategory(bodyFat, a.gender),
        score: bodyFatScore(bodyFat, a.gender),
    },
    biologicalAge,
    breakdown: [
        {
            label: "Weight Status",
            value: bmi !== null ? clamp(Math.round(bodyComposite), 5, 98) : 50,
        },
        {
            label: "Abdominal Fat Risk",
            value: whtr !== null
                ? clamp(100 - Math.round((whtr - 0.4) * 200), 5, 98)
                : 50,
        },
        {
            label: "Lifestyle",
            value: clamp(Math.round(lifestyleComposite), 5, 98),
        },
        {
            label: "Sleep & Energy",
            value: clamp(Math.round((sleep + energy) / 2), 5, 98),
        },
        {
            label: "Stress Balance",
            value: clamp(Math.round(stress), 5, 98),
        },
    ],
};

const simulator = generateImprovementSimulator(a, {
    score:overall,
    whtr,
});
const futureProjection = generateFutureProjection(a, {
  score:overall,
});
const timeline = generateHealthTimeline(a,{
    score:overall
});
const badges = generateBadges(a, {
  score:overall,
  bmi,
  whtr,
}); 
const charts = generateCharts({
  age: a.age,
  score: overall,
    scoreLabel: scoreLabelFor(overall),
    scoreColor: scoreColorFor(overall),
  bmi,
  bmiCategory,
  whtr,
  whtrRisk,
  bodyFat,
  biologicalAge,
  breakdown:report.breakdown,
  futureProjection,
  simulator,
}); 
const insights = generateInsights(a, report);
const scoreDrivers = generateScoreDrivers(a, {
  bmi,
  whtr,
});
const riskAssessment = generateRiskAssessment(a, {
  bmi,
  whtr,
});
const healthPersona = generateHealthPersona(a, {
    score:overall,
    bmi,
    whtr,
});
const healthPotential = generateHealthPotential(a, {
    score:overall,
    bmi,
    whtr,
});
const healthPriorities = generateHealthPriorities(a, {
  bmi,
  whtr,
});
  return {
    score: overall,
    scoreLabel: scoreLabelFor(overall),
    scoreColor: scoreColorFor(overall),
    bmi,
    biologicalAge,
    scoreDrivers,
    simulator,
    timeline,
    insights,
    futureProjection,
    riskAssessment,
    healthPotential,
    healthPriorities,
    badges,
    healthPersona,
    charts,
    bodyFat: {
  value: bodyFat,
  category: bodyFatCategory(bodyFat, a.gender),
  score: bodyFatScore(bodyFat, a.gender),
},
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
