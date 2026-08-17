"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Report from "@/component/report/Report";
const report = {
    "score": 59,
    "scoreLabel": "Needs Attention",
    "scoreColor": "orange",
    "bmi": 25.1,
    "biologicalAge": 33,
    "scoreDrivers": [
        {
            "factor": "BMI Above Healthy Range",
            "impact": -10,
            "type": "negative",
            "description": "Body weight is above the typical healthy range."
        },
        {
            "factor": "Regular Exercise",
            "impact": 10,
            "type": "positive",
            "description": "Exercise consistency improved your score."
        },
        {
            "factor": "High Stress",
            "impact": -8,
            "type": "negative",
            "description": "Stress lowered your overall health score."
        },
        {
            "factor": "Processed Diet",
            "impact": -8,
            "type": "negative",
            "description": "Food quality reduced your overall score."
        }
    ],
    "simulator": [
        {
            "title": "Improve Food Quality",
            "impact": "+8",
            "scoreGain": 8,
            "difficulty": "Medium",
            "timeframe": "4 Weeks",
            "description": "A balanced eating pattern may support weight management and sustained energy."
        },
        {
            "title": "Reduce Daily Stress",
            "impact": "+6",
            "scoreGain": 6,
            "difficulty": "Medium",
            "timeframe": "3 Weeks",
            "description": "Managing stress supports better sleep, recovery and overall wellbeing."
        }
    ],
    "timeline": [
        {
            "month": 0,
            "title": "Today",
            "score": 59,
            "description": "Your health assessment establishes your current baseline."
        },
        {
            "month": 1,
            "title": "30 Days",
            "description": "Small lifestyle improvements may begin increasing daily energy and consistency."
        },
        {
            "month": 3,
            "title": "90 Days",
            "description": "Regular healthy habits may improve fitness, recovery and body composition."
        },
        {
            "month": 6,
            "title": "180 Days",
            "description": "Maintaining positive habits may noticeably improve your health score."
        },
        {
            "month": 12,
            "title": "1 Year",
            "description": "Long-term consistency may significantly improve overall wellbeing and future health outlook."
        }
    ],
    "insights": [
        {
            "type": "warning",
            "title": "Weight Trend",
            "message": "Your BMI is above the typical healthy range, which may increase the likelihood of future health challenges if current habits continue.",
            "priority": 1
        },
        {
            "type": "warning",
            "title": "Recovery",
            "message": "Your sleep quality may be limiting recovery, energy levels and long-term health.",
            "priority": 3
        },
        {
            "type": "warning",
            "title": "Nutrition",
            "message": "Improving food quality may positively influence both your body composition and energy.",
            "priority": 3
        },
        {
            "type": "warning",
            "title": "Stress",
            "message": "High daily stress may reduce energy and make healthy habits harder to maintain.",
            "priority": 4
        }
    ],
    "futureProjection": [
        {
            "years": 1,
            "estimatedWeight": 78,
            "estimatedScore": 56
        },
        {
            "years": 3,
            "estimatedWeight": 84,
            "estimatedScore": 50
        },
        {
            "years": 5,
            "estimatedWeight": 90,
            "estimatedScore": 44
        }
    ],
    "riskAssessment": [
        {
            "title": "Lifestyle Consistency",
            "score": 50,
            "level": "Moderate",
            "icon": "📊",
            "description": "Several lifestyle habits are currently working against your long-term health goals."
        },
        {
            "title": "Weight Management",
            "score": 45,
            "level": "Moderate",
            "icon": "⚖️",
            "description": "Your current habits may contribute to gradual weight gain over time if maintained."
        },
        {
            "title": "Cardiometabolic Health",
            "score": 40,
            "level": "Moderate",
            "icon": "❤️",
            "description": "Current body composition and lifestyle patterns may increase the likelihood of future cardiometabolic health concerns if they continue unchanged."
        },
        {
            "title": "Recovery & Energy",
            "score": 40,
            "level": "Moderate",
            "icon": "😴",
            "description": "Sleep quality, stress and recovery patterns may reduce daily energy and overall wellbeing."
        },
        {
            "title": "Fitness Capacity",
            "score": 10,
            "level": "Low",
            "icon": "🏃",
            "description": "Low activity levels may contribute to declining fitness and muscle strength over time."
        }
    ],
    "healthPotential": {
        "currentScore": 59,
        "potentialScore": 87,
        "possibleGain": 28,
        "timeframe": "6–12 Months",
        "level": "Very Good",
        "message": "Based on your current assessment, improving your lifestyle habits consistently could increase your health score by approximately 28 points over 6–12 Months. This is an educational estimate rather than a guaranteed outcome."
    },
    "healthPriorities": [
        {
            "title": "Improve Sleep Quality",
            "impact": 8,
            "priority": "High",
            "icon": "😴",
            "description": "Better sleep may improve recovery, energy and long-term wellbeing."
        },
        {
            "title": "Improve Food Quality",
            "impact": 8,
            "priority": "High",
            "icon": "🥗",
            "description": "Choosing more whole foods may support weight management and sustained energy."
        },
        {
            "title": "Improve Weight Status",
            "impact": 8,
            "priority": "High",
            "icon": "⚖️",
            "description": "Moving toward a healthier weight may positively affect several health indicators."
        },
        {
            "title": "Reduce Daily Stress",
            "impact": 7,
            "priority": "Medium",
            "icon": "🧘",
            "description": "Managing stress more effectively may improve overall health and consistency."
        }
    ],
    "badges": [
        {
            "title": "Exercise Habit",
            "icon": "💪",
            "color": "orange",
            "description": "You exercise consistently every week."
        }
    ],
    "healthPersona": {
        "title": "Wellness Explorer",
        "icon": "🌿",
        "color": "green",
        "description": "Your assessment shows opportunities across multiple lifestyle areas. Small consistent improvements may produce meaningful long-term results."
    },
    "charts": {
        "radar": [
            {
                "subject": "Weight",
                "score": 68,
                "fullMark": 100
            },
            {
                "subject": "Waist",
                "score": 80,
                "fullMark": 100
            },
            {
                "subject": "Lifestyle",
                "score": 52,
                "fullMark": 100
            },
            {
                "subject": "Sleep",
                "score": 60,
                "fullMark": 100
            },
            {
                "subject": "Stress",
                "score": 35,
                "fullMark": 100
            }
        ],
        "gauge": {
            "score": 59,
            "label": "Needs Attention",
            "color": "orange"
        },
        "bmi": {
            "value": 25.1,
            "min": 15,
            "max": 40
        },
        "whtr": {
            "value": 0.5,
            "min": 0.3,
            "max": 0.7
        },
        "bodyFat": {},
        "biologicalAge": {
            "biological": 33,
            "actual": 29,
            "difference": 4
        },
        "breakdown": [
            {
                "label": "Weight Status",
                "score": 68
            },
            {
                "label": "Abdominal Fat Risk",
                "score": 80
            },
            {
                "label": "Lifestyle",
                "score": 52
            },
            {
                "label": "Sleep & Energy",
                "score": 60
            },
            {
                "label": "Stress Balance",
                "score": 35
            }
        ],
        "projection": [
            {
                "label": "1 Year",
                "healthScore": 56,
                "weight": 78
            },
            {
                "label": "3 Years",
                "healthScore": 50,
                "weight": 84
            },
            {
                "label": "5 Years",
                "healthScore": 44,
                "weight": 90
            }
        ],
        "simulator": [
            {
                "improvement": "Improve Food Quality",
                "gain": 8
            },
            {
                "improvement": "Reduce Daily Stress",
                "gain": 6
            }
        ]
    },
    "bodyFat": {
        "value": 31.4,
        "category": "Healthy",
        "score": 85
    },
    "bmiCategory": "Above typical range",
    "whtr": 0.5,
    "whtrRisk": "Moderate relative risk",
    "bodyShape": "Balanced proportions",
    "lifestyleSummary": "Your daily habits show a mix of strong and shaky foundations.",
    "strengths": [
        "Consistent exercise frequency",
        "Strong, steady daily energy"
    ],
    "areasForAttention": [
        "Physical activity levels lower than ideal",
        "Sleep quality that could be improved",
        "Elevated day-to-day stress",
        "Eating patterns that are inconsistent or processed-heavy"
    ],
    "futureOutlook": [
        "Progressive loss of fitness and muscle tone",
        "Slow, steady weight gain over time",
        "Reduced energy and higher day-to-day fatigue",
        "Greater strain on joints and mobility",
        "Higher long-term cardiometabolic risk if patterns continue"
    ],
    "actionPlan": [
        "Add short daily movement sessions — even 20 minutes of brisk walking counts",
        "Build a consistent wind-down routine to protect sleep quality",
        "Reduce processed foods and anchor meals around whole ingredients",
        "Introduce a short daily stress-reset practice — breathwork, a walk, or journaling",
        "Get accountability and a personalised plan through Kayapalat coaching"
    ],
    "membership": "Gold",
    "membershipReason": "Your results suggest steady, guided coaching will help you build on the momentum you already have.",
    "breakdown": [
        {
            "label": "Weight Status",
            "value": 68
        },
        {
            "label": "Abdominal Fat Risk",
            "value": 80
        },
        {
            "label": "Lifestyle",
            "value": 52
        },
        {
            "label": "Sleep & Energy",
            "value": 60
        },
        {
            "label": "Stress Balance",
            "value": 35
        }
    ],
    "ai": {
        "coverHeadline": "Health Status: Needs Attention - A Roadmap for Sustainable Wellness",
        "executiveSummary": "Based on your current assessment, your overall health score of 59 indicates that several lifestyle and body composition factors require attention. While consistent exercise contributes positively, challenges such as a BMI slightly above the healthy range, high daily stress, and a processed diet are influencing your health negatively. These factors are interconnected, impacting your energy, recovery, and weight status, and may increase the likelihood of future health concerns if not addressed. Focused improvements in nutrition, stress management, and sleep quality can significantly enhance your wellbeing over time.",
        "healthSnapshot": "Your BMI of 25.1 places you slightly above the typical healthy range, which suggests a moderate relative risk regarding body composition. Your biological age is 33, four years older than your chronological age, indicating that current lifestyle factors may be accelerating biological wear. Strengths include consistent exercise habits and steady daily energy, which provide a solid foundation to build upon. Conversely, suboptimal sleep quality and elevated stress levels could be limiting recovery and overall energy, contributing to a gradual decline in fitness and potential weight gain.",
        "bodyAnalysis": "The assessment highlights a balanced body shape with a body fat percentage categorized as healthy, which is encouraging. However, your BMI and waist-to-height ratio signal a moderate risk concerning abdominal fat, an important factor linked to cardiometabolic health risks. The presence of higher-than-ideal body weight appears to be influenced by eating patterns that include processed foods, which can hinder effective weight management. This interplay suggests that nutritional improvements could positively affect body composition and support healthier weight status over time.",
        "lifestyleAnalysis": "Your daily habits reflect a mixture of strong and weaker elements. Regular exercise is a notable strength that contributes positively to your health score, promoting fitness and energy levels. However, elevated stress and inconsistent or processed eating patterns may undermine these benefits by affecting sleep quality and recovery. Sleep and stress balance scores indicate that managing stress more effectively and improving sleep quality could create a virtuous cycle enhancing energy and resilience, thereby supporting weight control and overall lifestyle improvements.",
        "scoreExplanation": "Your current score of 59, labeled as 'Needs Attention,' results from combined impacts: negative influences from BMI above the healthy range, high stress, and processed diet, counterbalanced partially by the positive effect of regular exercise. This illustrates the multifactorial nature of health, where body composition, mental wellbeing, nutrition, and activity levels interact to shape outcomes. Addressing the risk factors clustered around lifestyle and weight management is key to moving your score toward a more favorable range.",
        "hiddenPatterns": "The assessment reveals that despite steady exercise, stress and nutrition substantially influence your health trajectory. High stress appears to not only lower your score directly but also likely affects sleep quality, which in turn can impact recovery, energy, and appetite regulation. Similarly, processed food consumption correlates with increased BMI and body fat risk, perpetuating a cycle that may escalate cardiometabolic concerns unless disrupted through concerted lifestyle changes.",
        "futureStory": {
            "ifNoChange": "If current habits are maintained, projections suggest a gradual weight increase over the next five years accompanied by declining health scores. This trajectory may lead to reduced fitness capacity, greater fatigue, and elevated risk factors associated with cardiometabolic health challenges and joint mobility issues.",
            "ifImproved": "Conversely, by focusing on targeted improvements like enhancing food quality and stress management, your health score could increase significantly within 6 to 12 months. This scenario implies better energy levels, improved body composition, and reduced long-term health risks, fostering a sustainable path to wellness."
        },
        "healthPotentialStory": "Based on your profile and current assessment, there is very good potential to increase your overall health score by approximately 28 points over the next 6 to 12 months through consistent lifestyle improvements. This educational estimate emphasizes the positive impact that strategic changes in diet quality, stress reduction, and sleep enhancement can have, leading to meaningful advancements in your wellbeing and biological aging.",
        "coachSummary": "Your health assessment indicates a promising foundation with consistent exercise habits and steady energy, alongside areas needing focused attention. Prioritizing improvement in sleep quality, dietary practices, weight status, and stress management stands to deliver the greatest benefits. By integrating achievable changes, you can expect progressive enhancements in fitness, recovery, and overall health metrics. Steady accountability and expert coaching support available to you will be instrumental in navigating this journey with confidence and sustained motivation.",
        "motivation": "Recognizing the interplay between stress, nutrition, and recovery offers a powerful opportunity to take control of your health trajectory. Small, consistent adjustments can yield cumulative benefits, improving how you feel daily and reducing long-term risks. This assessment invites you to leverage your existing strengths while addressing key challenges, unlocking greater energy, wellbeing, and resilience for the future.",
        "coachLetter": "Dear Wellness Explorer, this assessment reflects both your current challenges and significant potential. Your consistent exercise is commendable and creates a solid base to build upon. I encourage you to approach improvements in sleep, stress management, and nutrition as interconnected steps that will reinforce each other. Adopting a balanced approach, including practical strategies for reducing processed foods and integrating stress-reset practices, can transform your health journey. You’re supported by a wealth of resources and coaching that can help turn these insights into lasting, positive change. Together, we can work towards enhancing your vitality and long-term wellbeing.",
        "strengths": [
            "Consistent exercise frequency",
            "Strong, steady daily energy"
        ],
        "attentionAreas": [
            "Physical activity levels lower than ideal",
            "Sleep quality that could be improved",
            "Elevated day-to-day stress",
            "Eating patterns that are inconsistent or processed-heavy"
        ],
        "priorityActions": [
            "Add short daily movement sessions — even 20 minutes of brisk walking counts",
            "Build a consistent wind-down routine to protect sleep quality",
            "Reduce processed foods and anchor meals around whole ingredients",
            "Introduce a short daily stress-reset practice — breathwork, a walk, or journaling",
            "Get accountability and a personalised plan through Kayapalat coaching"
        ],
        "riskFactors": [
            "Moderate risk of progressive weight gain",
            "Elevated cardiometabolic health risk due to body composition and lifestyle",
            "Reduced recovery and energy driven by sleep and stress factors",
            "Potential decline in fitness capacity and muscle strength over time",
            "Lifestyle consistency challenges impacting long-term health outcomes"
        ],
        "positiveHabits": [
            "Regular exercise consistency",
            "Steady daily energy levels"
        ],
        "healthInsights": [
            "BMI above healthy range linked to increased future health risks",
            "High daily stress likely contributes to lower energy and challenging habit maintenance",
            "Processed diet influences adverse body composition and energy levels",
            "Sleep quality appears to be a limiting factor in recovery and wellbeing"
        ],
        "achievementHighlights": [
            "Maintaining consistent weekly exercise regimen",
            "Supporting daily energy despite lifestyle challenges"
        ],
        "mythsToKnow": [
            {
                "title": "Exercise Alone Guarantees Optimal Health",
                "fact": "While exercise supports health, factors like nutrition, stress, and sleep also critically influence outcomes."
            },
            {
                "title": "Weight Is Only About Calories In and Out",
                "fact": "Body composition and health are affected by diet quality, stress, recovery, and metabolism, not just calorie balance."
            }
        ],
        "nextMilestones": [
            "Implement food quality improvements over next 4 weeks",
            "Adopt daily stress reduction techniques within 3 weeks",
            "Establish regular sleep-promoting bedtime routine soon",
            "Track weight and health changes quarterly"
        ],
        "pdfHighlights": [
            {
                "title": "Health Status Overview",
                "description": "Summary of current health score reflecting strengths and areas needing attention."
            },
            {
                "title": "Body Composition Details",
                "description": "Analysis of BMI, body fat percentage, and risk factors."
            },
            {
                "title": "Lifestyle Analysis",
                "description": "Impact of exercise, nutrition, stress and sleep on overall health."
            },
            {
                "title": "Action Plan and Priorities",
                "description": "Practical steps suggested to improve health in medium term."
            },
            {
                "title": "Future Projections",
                "description": "Estimated outcomes based on current trends and potential improvements."
            }
        ]
    }
}
export default function ReportViewer() {
  const reportRef = useRef(null);

  const handlePrint = useReactToPrint({
  contentRef: reportRef,
  documentTitle: "Health-Reality-Report",
  pageStyle: `
    @page {
      size: A4 portrait;
      margin: 0;
    }

    @media print {
      html, body {
        width: 210mm;
        height: auto;
        margin: 0 !important;
        padding: 0 !important;
        overflow: visible !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      * {
        box-sizing: border-box;
      }

      .page-break {
        page-break-before: always;
        break-before: page;
      }

      .avoid-break {
        page-break-inside: avoid;
        break-inside: avoid;
      }
    }
  `,
});

  return (
    <>
      <button
        onClick={handlePrint}
        className="fixed right-10 bottom-40 bg-emerald-600 text-white px-6 py-3 rounded-xl"
      >
        Download PDF
      </button>

      <div ref={reportRef}>
        <Report report={report} />
      </div>
    </>
  );
}