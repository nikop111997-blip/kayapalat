import CoverPage from "./CoverPage";
import ExecutiveSummaryPage from "./ExecutiveSummaryPage";
import BodyBalancePage from "./Bodybalancepage";
import PriorityActionPage from "./Priorityactionpage";
import FutureOutlookPage from "./Futureoutlookpage";
import JourneyPage from "./Journeypage";
import CoachLetterPage from "./CoachLetterPage";
import ClosingPage from "./ClosingPage";
import MembershipPage from "./MembershipPage";

export default function Report({ report, answers }) {
  // Combine every actionable item we have and split it across the two new
  // "Priority Action" / "Future Outlook" pages so neither page is overloaded.
  const allActions = [
    ...(report.ai?.priorityActions || []),
    ...(report.actionPlan || []),
  ].filter(Boolean);

  const half = Math.ceil(allActions.length / 2);
  const actionsA = allActions.slice(0, half);
  const actionsB = [...allActions.slice(half), ...(report.ai?.nextMilestones || [])];

  return (
    <div className="bg-gray-50 pb-16 font-sans">
      <div className="max-w-[1000px] mx-auto">
        {/* Page 1 */}
        <CoverPage report={report} answers={answers} />

        {/* Page 2 */}
        <ExecutiveSummaryPage report={report} />

        {/* Page 3 */}
        <BodyBalancePage report={report} answers={answers} />

        {/* Page 4 */}
        <PriorityActionPage report={report} actions={actionsA} />

        {/* Page 5 */}
        <FutureOutlookPage report={report} actions={actionsB} />

        {/* Page 6 */}
        <JourneyPage report={report} />

        {/* Page 7 — unchanged */}
        <CoachLetterPage report={report} name={answers.name} />
<MembershipPage />
        {/* Page 8 — unchanged */}
        <ClosingPage report={report} />
      </div>
    </div>
  );
}