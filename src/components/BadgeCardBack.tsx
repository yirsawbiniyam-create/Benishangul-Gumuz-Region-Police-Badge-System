import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { BadgeData } from "../types";
import {
  DEFAULT_COMMISSION_LOGO,
  DEFAULT_OFFICIAL_SIGNATURE,
} from "../data/defaults";

interface BadgeCardBackProps {
  data: BadgeData;
  scale?: number;
  className?: string;
  onClick?: () => void;
  verificationUrlOverride?: string;
}

export const BadgeCardBack: React.FC<BadgeCardBackProps> = ({
  data,
  scale = 1,
  className = "",
  onClick,
  verificationUrlOverride,
}) => {
  const logo = data.commissionLogo || DEFAULT_COMMISSION_LOGO;
  const signature = data.signature || DEFAULT_OFFICIAL_SIGNATURE;

  // Build full verification URL or JSON string for QR Code
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const qrVerificationPayload =
    verificationUrlOverride ||
    `${origin}/?verify=${encodeURIComponent(data.badgeId)}`;

  return (
    <div
      onClick={onClick}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
      className={`relative w-[340px] h-[536px] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#d4af37] bg-gradient-to-b from-[#0a192f] via-[#0d2137] to-[#081220] text-white flex flex-col justify-between p-3 select-none print:shadow-none ${className}`}
    >
      {/* 1. Large Enlarged Watermark of Police Commission Logo in Background */}
      {/* "ከዛ ከባጁ በስተጀርባ ላይ በትልቁ ማለትም ሙሉዉን የኮሚሽኑን ሎጎ የተወሰነ ደመቅ አድረገህ ዋተር ማርክ ታደርጋለህ" */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <img
          src={logo}
          alt="Watermark Logo"
          className="w-[280px] h-[280px] object-contain opacity-25 filter brightness-125 contrast-125 scale-125"
        />
      </div>

      {/* Security Guilloche Micro Pattern Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:10px_10px]" />

      {/* Top Header Label */}
      <div className="relative text-center pb-2 border-b-2 border-[#d4af37]/60">
        <h2 className="text-[10px] font-black text-[#d4af37] tracking-widest uppercase font-sans">
          የቤንሻንጉል ጉሙዝ ክልል ፖሊስ ኮሚሽን
        </h2>
        <p className="text-[8px] font-bold text-gray-200 tracking-wider uppercase mt-0.5">
          OFFICIAL SECURITY VERIFICATION BACK SIDE
        </p>
      </div>

      {/* Middle Section: High Visibility QR Code for Authenticity Scan */}
      {/* "ከዛ በስተጀርባዉ ላይ በደማቁ ስካን ማድረጊያና እና ስለባጁ ትክክለኛነት የሚያረጋግጥ ኪዉ አር ስካነር ታደርጋለህ ከዛ ስካን ሲደረግ ስለባጁ ትክክለኛነትና ሙሉ ባጁ ከነፎቶዉ እንዲያመጣ ታደርጋለህ" */}
      <div className="relative my-2 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md rounded-xl p-3 border border-[#d4af37]/50 shadow-inner">
        <div className="p-2 bg-white rounded-xl shadow-2xl border-2 border-[#d4af37] transition-transform hover:scale-105">
          <QRCodeSVG
            value={qrVerificationPayload}
            size={120}
            level="H"
            includeMargin={false}
            imageSettings={{
              src: logo,
              x: undefined,
              y: undefined,
              height: 24,
              width: 24,
              excavate: true,
            }}
          />
        </div>

        <div className="mt-2 text-center">
          <div className="inline-flex items-center gap-1 bg-[#d4af37] text-[#0a192f] text-[8.5px] font-black px-2 py-0.5 rounded shadow uppercase">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            ስካን አድርገው ያረጋግጡ / SCAN TO VERIFY
          </div>
          <p className="text-[7.5px] font-semibold text-gray-300 mt-1 max-w-[240px] leading-tight">
            ይህንን QR ስካን በማድረግ የባለባጁን ሙሉ መረጃ፣ ጉርድ ፎቶ እና የባጁን ኦፊሴላዊነት ማረጋገጥ ይቻላል::
          </p>
        </div>
      </div>

      {/* Official Property Terms & Legal Notice */}
      <div className="relative text-[7.5px] text-gray-200 bg-[#071322]/80 p-2 rounded-lg border border-gray-700 leading-tight text-center space-y-1">
        <p className="font-semibold font-sans text-amber-200">
          • ይህ ባጅ የቤንሻንጉል ጉሙዝ ክልል ፖሊስ ኮሚሽን የቴክኖሎጂ ማስፋፊያ ማዕከል ንብረት ነው::
        </p>
        <p className="text-gray-300">
          • ባጁ ቢጠፋ ወይም ሌላ ሰው ቢያገኘው በአቅራቢያው ለሚገኝ ፖሊስ ጣቢያ እንዲያስረክብ ወይም በስልክ ቁጥር
          <strong className="text-[#d4af37] font-mono ml-0.5">+251 57 775 0000</strong> ይደውሉ::
        </p>
        <p className="text-[6.5px] text-gray-400 uppercase font-mono tracking-tighter pt-0.5 border-t border-gray-800">
          PROPERTY OF BENISHANGUL GUMUZ REGION POLICE COMMISSION. IF FOUND PLEASE RETURN TO THE NEAREST POLICE STATION.
        </p>
      </div>

      {/* Authorized Signature Section (የኃላፊ ፊርማ) */}
      {/* "ከባጁ በስተጀርባ ላይ የኋላፊ ፊርማ ታስገባለህ የሀላፊዉ ፊርማ የሚገባትን ጋለሪ ገብቶ እንዲወስድ ታደርጋለህ" */}
      <div className="relative pt-1 border-t-2 border-[#d4af37]/60 flex items-end justify-between">
        <div className="flex flex-col text-left">
          <span className="text-[7px] font-bold text-gray-400 uppercase">
            የፍቃድ ቁጥር / AUTH SERIAL:
          </span>
          <span className="text-[9px] font-black text-[#d4af37] font-mono">
            {data.badgeId ? `AUTH-${data.badgeId}` : "AUTH-0000"}
          </span>
          <span className="text-[6.5px] text-emerald-400 font-extrabold flex items-center gap-0.5 mt-0.5">
            ● FIRESTORE SECURED DB
          </span>
        </div>

        <div className="flex flex-col items-center">
          {/* Commissioner Signature Graphic */}
          <div className="w-28 h-9 border-b border-[#d4af37] flex items-center justify-center p-0.5 bg-white/5 rounded">
            <img
              src={signature}
              alt="Official Signature"
              className="max-w-full max-h-full object-contain filter invert contrast-200 brightness-200"
            />
          </div>
          <span className="text-[7px] font-black text-[#d4af37] uppercase mt-0.5">
            የኃላፊው ፊርማ / COMMISSIONER SIGNATURE
          </span>
        </div>
      </div>
    </div>
  );
};
