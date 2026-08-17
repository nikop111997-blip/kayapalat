import CoverPage from "./CoverPage";
import ExecutiveSummaryPage from "./ExecutiveSummaryPage";
import BodyMetricsPage from "./BodyMetricsPage";
import RadarAnalysisPage from "./RadarAnalysisPage";
import HealthTimelinePage from "./HealthTimelinePage";
import HealthPotentialPage from "./HealthPotentialPage";
import ImprovementSimulatorPage from "./ImprovementSimulatorPage";
import StrengthsPage from "./StrengthsPage";
import CoachLetterPage from "./CoachLetterPage";
import TakeKill from "./Riskassessmentpage";
import ClosingPage from "./ClosingPage";
import MembershipPage from "./MembershipPage";

export default function Report({ report }) {
  return (
    <div className="bg-gray-50 pb-16 font-sans">
      <div className="max-w-[1000px] mx-auto">
        <CoverPage report={report} />
        <ExecutiveSummaryPage report={report} />
        <BodyMetricsPage report={report} />
        <RadarAnalysisPage report={report} />
        <TakeKill report ={report}/>
        <HealthTimelinePage report={report} />
        <HealthPotentialPage report={report} />
        <ImprovementSimulatorPage report={report} />
        <StrengthsPage report={report} />
        <CoachLetterPage report={report} />
        <MembershipPage report={report} />
        <ClosingPage report={report} />
      </div>
    </div>
  );
}