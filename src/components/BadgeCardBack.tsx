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
      className={`relative w-[245px] h-[385px] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#eab308] bg-gradient-to-b from-[#0f2d5e] via-[#163a75] to-[#0b1b3b] text-white flex flex-col justify-between p-2 select-none print:shadow-none ${className}`}
    >
      {/* 1. Large Enlarged Watermark of Police Commission Logo in Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <img
          src={logo}
          alt="Watermark Logo"
          className="w-[200px] h-[200px] object-contain opacity-25 filter brightness-125 contrast-125 scale-125"
        />
      </div>

      {/* Security Pattern Background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#facc15_1px,transparent_1px)] [background-size:10px_10px]" />

      {/* Top Header Label */}
      <div className="relative text-center pb-1 border-b-2 border-[#eab308]">
        <h2 className="text-[8.5px] font-black text-[#facc15] tracking-widest uppercase font-sans drop-shadow-md">
          ቤንሻንጉል ጉሙዝ ክልል ፖሊስ ኮሚሽን
        </h2>
        <div className="inline-block bg-[#facc15] text-[#0b1c3a] text-[6.5px] font-black px-1.5 py-0.2 rounded shadow uppercase mt-0.5">
          የደረት ባጅ ማረጋገጫ (CHEST BADGE VERIFICATION)
        </div>
      </div>

      {/* Middle Section: High Visibility QR Code for Authenticity Scan */}
      <div className="relative my-1 flex flex-col items-center justify-center bg-[#0b1c3a]/80 backdrop-blur-md rounded-xl p-1.5 border border-[#facc15]/60 shadow-lg">
        <div className="p-1 bg-white rounded-xl shadow-2xl border-2 border-[#eab308] transition-transform hover:scale-105">
          <QRCodeSVG
            value={qrVerificationPayload}
            size={88}
            level="H"
            includeMargin={false}
            imageSettings={{
              src: logo,
              x: undefined,
              y: undefined,
              height: 18,
              width: 18,
              excavate: true,
            }}
          />
        </div>

        <div className="mt-1 text-center">
          <div className="inline-flex items-center gap-0.5 bg-[#facc15] text-[#0b1c3a] text-[6.5px] font-black px-1.5 py-0.2 rounded shadow uppercase">
            <svg
              className="w-2.5 h-2.5"
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
          <p className="text-[6px] font-bold text-gray-100 mt-0.5 max-w-[190px] leading-tight">
            ይህንን QR ስካን በማድረግ የባለባጁን ሙሉ መረጃ፣ ጉርድ ፎቶ እና የባጁን ኦፊሴላዊነት ማረጋገጥ ይቻላል::
          </p>
        </div>
      </div>

      {/* Official Property Terms & Legal Notice */}
      <div className="relative text-[6px] text-gray-100 bg-[#0b1c3a]/90 p-1 rounded-lg border border-amber-400/40 leading-tight text-center space-y-0.5 shadow-sm">
        <p className="font-bold font-sans text-amber-200">
          • ይህ ባጅ የቤንሻንጉል ጉሙዝ ክልል ፖሊስ ኮሚሽን ንብረት ነው::
        </p>
        <p className="text-gray-200 font-semibold">
          • ባጁ ቢጠፋ ወይም ሌላ ሰው ቢያገኘው በአቅራቢያው ለሚገኝ ፖሊስ ጣቢያ እንዲያስረክብ ወይም በስልክ ቁጥር
          <strong className="text-[#facc15] font-mono ml-0.5 font-black">9991</strong> ይደውሉ::
        </p>
        <p className="text-[5px] text-amber-300 font-bold uppercase font-mono tracking-tighter pt-0.5 border-t border-amber-400/20">
          PROPERTY OF BENISHANGUL GUMUZ REGION POLICE COMMISSION.
        </p>
      </div>

      {/* Authorized Signature Section */}
      <div className="relative pt-0.5 border-t-2 border-[#eab308] flex items-end justify-between">
        <div className="flex flex-col text-left">
          <span className="text-[5.5px] font-black text-amber-300 uppercase">
            የፍቃድ ቁጥር / AUTH SERIAL:
          </span>
          <span className="text-[7.5px] font-black text-white font-mono">
            {data.badgeId ? `AUTH-${data.badgeId}` : "AUTH-0000"}
          </span>
          <span className="text-[5px] text-emerald-300 font-black flex items-center gap-0.5 mt-0.5">
            ● SECURED FIRESTORE DB
          </span>
        </div>

        <div className="flex flex-col items-center">
          {/* Commissioner Signature Graphic */}
          <div className="w-20 h-6 border-b-2 border-[#facc15] flex items-center justify-center p-0.5 bg-white/10 rounded">
            <img
              src={signature}
              alt="Official Signature"
              className="max-w-full max-h-full object-contain filter invert contrast-200 brightness-200"
            />
          </div>
          <span className="text-[5.5px] font-black text-[#facc15] uppercase mt-0.5">
            የኃላፊው ፊርማ / COMMISSIONER SIGNATURE
          </span>
        </div>
      </div>
    </div>
  );
};
