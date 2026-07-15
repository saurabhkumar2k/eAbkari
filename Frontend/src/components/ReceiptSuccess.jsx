
import {
  Check,
  FileCheck2,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Printer,
  Home
} from "lucide-react";





const ReceiptSuccess = ({
  applicant,
  selectedLicense,
  triggerMockPrint,
  onBackToSelect
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

      {/* Success Header */}

<div className="bg-white rounded-3xl shadow-xl overflow-hidden">

  {/* Success */}

  <div className="py-10 px-8 text-center">

    <div className="flex justify-center">

      <div className="relative">

        <div className="absolute inset-0 rounded-full bg-green-300 animate-ping opacity-20"></div>

        <div className="w-24 h-24 rounded-full bg-green-100 border-4 border-green-500 flex items-center justify-center relative">

          <Check className="w-12 h-12 text-green-600 stroke-[3]" />

        </div>

      </div>

    </div>

    <h2 className="mt-4 text-4xl font-bold text-slate-800">

      Application Submitted Successfully

    </h2>

    <p className="mt-3 text-slate-500 text-lg">

      Thank you. Your application has been submitted successfully.

    </p>

  </div>

</div>



      {/* Application No */}


<div className="px-10">

<div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-white to-blue-50 shadow-sm">

<div className="grid grid-cols-[70px_1fr_auto] items-center">

<div className="flex justify-center">

<div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">

<FileCheck2 className="text-blue-600 w-7 h-7"/>

</div>

</div>

<div className="py-5">

<p className="uppercase text-xs tracking-[3px] text-slate-500">

Application No.

</p>

<h3 className="text-3xl font-black text-slate-800 mt-1">

{localStorage.getItem("applicationId")}

</h3>

</div>

<div className="pr-8">

<span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">

Submitted

</span>

</div>

</div>

</div>

</div>

      {/* Applicant Details */}

<div className="mt-10 px-10">

<div className="flex items-center justify-center gap-4">

<div className="h-[2px] w-20 bg-slate-300"></div>

<h3 className="text-2xl font-bold text-slate-800">

Applicant Details

</h3>

<div className="h-[2px] w-20 bg-slate-300"></div>

</div>

</div>


      {/* Applied Licence */}


<div className="grid md:grid-cols-2 gap-6 mt-8">

{/* Applicant */}

<div className="bg-slate-50 rounded-2xl border p-5">

<div className="flex gap-4">

<div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

<User className="text-blue-600"/>

</div>

<div>

<p className="text-xs uppercase tracking-wider text-slate-500">

Applicant Name

</p>

<h4 className="font-bold text-lg mt-1">

{applicant?.applicantName}

</h4>

</div>

</div>

</div>



{/* Company */}

<div className="bg-slate-50 rounded-2xl border p-5">

<div className="flex gap-4">

<div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">

<Building2 className="text-indigo-600"/>

</div>

<div>

<p className="text-xs uppercase tracking-wider text-slate-500">

Company Name

</p>

<h4 className="font-bold text-lg mt-1">

{applicant?.CompanyName}

</h4>

</div>

</div>

</div>



{/* Email */}

<div className="bg-slate-50 rounded-2xl border p-5">

<div className="flex gap-4">

<div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">

<Mail className="text-orange-600"/>

</div>

<div>

<p className="text-xs uppercase tracking-wider text-slate-500">

Email Address

</p>

<h4 className="font-semibold mt-1 break-all">

{applicant?.email}

</h4>

</div>

</div>

</div>



{/* Mobile */}

<div className="bg-slate-50 rounded-2xl border p-5">

<div className="flex gap-4">

<div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">

<Phone className="text-green-600"/>

</div>

<div>

<p className="text-xs uppercase tracking-wider text-slate-500">

Mobile Number

</p>

<h4 className="font-semibold mt-1">

{applicant?.mobile}

</h4>

</div>

</div>

</div>

</div>

<div className="mt-6 bg-slate-50 rounded-2xl border p-5">

<div className="flex gap-4">

<div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">

<MapPin className="text-red-600"/>

</div>

<div>

<p className="text-xs uppercase tracking-wider text-slate-500">

Address

</p>

<p className="font-medium mt-2 text-slate-700">

{applicant?.addressLine1},

{applicant?.addressLine2},

{applicant?.city}

</p>

</div>

</div>

</div>

{/* Applied Licence */}

<div className="mt-10">

  <div className="flex items-center justify-center gap-4 mb-7">

    <div className="h-[2px] w-20 bg-slate-300"></div>

    <h3 className="text-2xl font-bold text-slate-800">
      Applied Licence
    </h3>

    <div className="h-[2px] w-20 bg-slate-300"></div>

  </div>

  <div className="flex justify-center">

    <div className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl px-8 py-5 shadow-md hover:shadow-lg transition-all">

      <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center">

        <FileCheck2 className="w-7 h-7 text-white" />

      </div>

      <div>

        <p className="text-xs uppercase tracking-widest text-slate-500">
          Selected Licence
        </p>

        <h4 className="text-lg font-bold text-slate-800 mt-1">

          {/* {selectedLicense?.licenseeCatCode} -{" "} */}
          {selectedLicense?.licenseeCatDesc}

        </h4>

      </div>

    </div>

  </div>

</div>


      {/* Status */}

{/* Current Status */}

<div className="mt-10">

  <div className="rounded-2xl bg-green-50 border border-green-200 p-6">

    <div className="flex items-start gap-5">

      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">

        <Check className="w-8 h-8 text-green-600" />

      </div>

      <div>

        <h4 className="text-xl font-bold text-green-700">

          Application Submitted

        </h4>

        <p className="text-slate-600 mt-2 leading-7">

          Your application has been submitted successfully.

          It has been forwarded for verification.

          You can track the application status anytime from your dashboard.

        </p>

      </div>

    </div>

  </div>

</div>



      {/* Footer Buttons */}

{/* Footer */}

<div className="mt-12 border-t bg-slate-50 px-8 py-8">

 <div className="flex justify-center gap-5">

    <button
      type="button"
      onClick={triggerMockPrint}
      className="flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-900 transition text-white px-8 py-4 rounded-xl shadow-lg font-semibold"
    >
      <Printer className="w-5 h-5" />

      Print Receipt

    </button>

    <button
      type="button"
      onClick={onBackToSelect}
      className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-xl shadow-lg font-semibold"
    >
      <Home className="w-5 h-5" />

      Back to Dashboard

    </button>

  </div>

</div>





    </div>
  );
};

export default ReceiptSuccess;