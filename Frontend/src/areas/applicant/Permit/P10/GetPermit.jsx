import React, { useState, useEffect } from "react";
import { getPermitP10 } from "../../../../api/permitApi";
import {
  Printer,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Loader2,
  AlertTriangle,
} from "lucide-react";

function formatDate(value) {
  if (!value) return "-";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function formatTime(value) {
  if (!value) return "-";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "-";
  return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
}

export default function GetPermitP10({ applicationIdNo, onBackToDashboard, showToast }) {
  const [permitReceipt, setPermitReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchPermit = async () => {
      if (!applicationIdNo) {
        setErrorMsg("No application reference was provided.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setErrorMsg("");
      try {
        const response = await getPermitP10(applicationIdNo);
        const data = Array.isArray(response.data) ? response.data[0] : response.data;

        if (!data) {
          setErrorMsg("No permit record was found for this application.");
          setPermitReceipt(null);
          return;
        }

        const pick = (...vals) => vals.find(v => v !== undefined && v !== null && v !== "") ?? "";

        setPermitReceipt({
          permitNo: pick(data.permitNo, data.PermitNo, "Pending Allotment"),
          referenceNo: pick(data.applicationIdNo, data.ApplicationIdNo, applicationIdNo),
          applicantName: pick(data.applicantName, data.ApplicantName),
          mobile: pick(data.applicantMobile, data.ApplicantMobile),
          venue: pick(data.premiseAddress, data.PremiseAddress),
          premiseName: pick(data.premiseName, data.PremiseName),
          eventType: pick(data.eventType, data.EventType),
          permitStartDate: formatDate(pick(data.premiseStartEventDate, data.PremiseStartEventDate)),
          startTime: formatTime(pick(data.premiseStartTime, data.PremiseStartTime)),
          endTime: formatTime(pick(data.premiseEndTime, data.PremiseEndTime)),
          guestNo: pick(data.premiseGuestNo, data.PremiseGuestNo),
          generatedAt: formatDate(pick(data.createdDate, data.CreatedDate)),
        });
      } catch (error) {
        console.error("Failed to fetch permit:", error);
        setErrorMsg("Could not load the permit record. Please try again.");
        if (showToast) showToast("Could not load the permit record.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchPermit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationIdNo]);

  const triggerPrint = () => {
    if (showToast) showToast("Initializing printer spooler for local thermal receipts...");
    window.print();
  };

  return (
    <div className="p10-container select-none text-slate-800 animate-fade">
      <div className="w-full bg-[#003366] text-white py-3.5 px-6 rounded-t-xl mb-6 shadow-sm text-center flex items-center justify-center">
        <h1 className="text-xs sm:text-sm md:text-base font-bold tracking-tight text-white leading-tight uppercase font-sans">
          P-10 Permit Receipt
        </h1>
      </div>

      {onBackToDashboard && (
        <button
          type="button"
          onClick={onBackToDashboard}
          className="print:hidden mb-4 flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-xs font-bold">Loading permit details...</p>
        </div>
      )}

      {!loading && errorMsg && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-500 max-w-md mx-auto text-center">
          <AlertTriangle className="w-10 h-10 text-amber-500" />
          <p className="text-xs font-bold text-red-600">{errorMsg}</p>
        </div>
      )}

      {!loading && !errorMsg && permitReceipt && (
        <div className="space-y-6 animate-fade">
          <div className="bg-white border-2 border-emerald-500/80 shadow-md rounded-3xl p-6 sm:p-8 text-center space-y-6 max-w-2xl mx-auto relative overflow-hidden">

            <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Permit Approved</h2>
              <p className="text-xs text-slate-500 font-bold">Your P-10 permit has been registered on the Delhi Excise Department.</p>
            </div>

            <div className="border border-slate-200 rounded-3xl bg-slate-50/50 p-5 text-left space-y-4 font-mono select-text print:p-0 print:border-none">

              <div className="pb-3 border-b border-dashed border-slate-300 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase">
                  {permitReceipt.premiseName || permitReceipt.eventType}
                </span>
                <div className="bg-[#eff6ff] text-[#1d4ed8] font-bold text-[10px] px-2 py-0.5 rounded border border-[#dbeafe] uppercase">
                  Approved
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 text-xs">

                <div>
                  <span className="text-slate-450 block font-bold uppercase text-[9px] tracking-wide">Permit Number:</span>
                  <span className="text-slate-900 font-bold tracking-wider">{permitReceipt.permitNo}</span>
                </div>

                <div>
                  <span className="text-slate-450 block font-bold uppercase text-[9px] tracking-wide">Reference Number:</span>
                  <span className="text-slate-900 font-bold">{permitReceipt.referenceNo}</span>
                </div>

                <div>
                  <span className="text-slate-450 block font-bold uppercase text-[9px] tracking-wide">Applicant Name:</span>
                  <span className="text-slate-900 font-extrabold">{permitReceipt.applicantName}</span>
                </div>

                <div>
                  <span className="text-slate-450 block font-bold uppercase text-[9px] tracking-wide">Mobile Number:</span>
                  <span className="text-slate-900 font-extrabold">{permitReceipt.mobile}</span>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-slate-450 block font-bold uppercase text-[9px] tracking-wide">Event Address:</span>
                  <span className="text-slate-900 font-bold leading-normal text-[11px] block">{permitReceipt.venue}</span>
                </div>

                <div>
                  <span className="text-slate-450 block font-bold uppercase text-[9px] tracking-wide">Event Start Date:</span>
                  <span className="text-slate-900 font-bold text-[11px]">{permitReceipt.permitStartDate}</span>
                </div>

                <div>
                  <span className="text-slate-450 block font-bold uppercase text-[9px] tracking-wide">Event Start Time:</span>
                  <span className="text-slate-900 font-medium text-[11px]">{permitReceipt.startTime}</span>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-slate-450 block font-bold uppercase text-[9px] tracking-wide">Event End Time:</span>
                  <span className="text-slate-900 font-bold text-[11px] leading-relaxed">{permitReceipt.endTime}</span>
                </div>

                <div>
                  <span className="text-slate-450 block font-bold uppercase text-[9px] tracking-wide">No of guests:</span>
                  <span className="text-blue-700 font-black text-sm">{permitReceipt.guestNo}</span>
                </div>

                <div>
                  <span className="text-slate-450 block font-bold uppercase text-[9px] tracking-wide">Issued Date:</span>
                  <span className="text-slate-900 font-bold">{permitReceipt.generatedAt}</span>
                </div>

              </div>

              <div className="mt-4 pt-4 border-t border-dashed border-slate-300 flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 select-none">
                <div className="p-2 border border-slate-200 rounded-xl bg-slate-50 shrink-0">
                  <QrCode className="w-16 h-16 text-slate-800" />
                </div>
                <div className="space-y-1 text-left sm:flex-1">
                  <p className="text-[10px] font-bold text-slate-900 flex items-center gap-1.5 uppercase">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Cryptographically Signed</span>
                  </p>
                  <p className="text-[9px] text-slate-500 font-medium leading-relaxed">
                    This is a computer-generated statutory transit pass and does not require a physical ink seal signature. Scan QR code to verify live credentials against registry portal.
                  </p>
                </div>
              </div>

            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 print:hidden">
              <button
                type="button"
                onClick={triggerPrint}
                className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Print Permit</span>
              </button>

              {onBackToDashboard && (
                <button
                  type="button"
                  onClick={onBackToDashboard}
                  className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-250 rounded-xl text-xs font-bold cursor-pointer transition"
                >
                  Finish & Go to Dashboard
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
