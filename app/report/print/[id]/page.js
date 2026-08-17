import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

import Report from "@/component/report/Report";

export const dynamic = "force-dynamic";

export default async function ReportPrintPage({
  params,
}) {
  const { id } = await params;

  const client = await clientPromise;

  const db = client.db("kayakalap");

  const reportDoc =
    await db.collection("health_reports").findOne({
      _id: new ObjectId(id),
    });

  if (!reportDoc) {
    return <div>Report not found</div>;
  }

  return (
    <>
      <style>{`
        @page {
          size: A4;
          margin: 0;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          background: white;
        }

        * {
          box-sizing: border-box;
        }

        .pdf-page {
          break-after: page;
          page-break-after: always;
        }

        .pdf-page:last-child {
          break-after: auto;
          page-break-after: auto;
        }

        .avoid-break {
          break-inside: avoid;
          page-break-inside: avoid;
        }

        @media print {
          html,
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      <Report report={reportDoc.report} />
    </>
  );
}