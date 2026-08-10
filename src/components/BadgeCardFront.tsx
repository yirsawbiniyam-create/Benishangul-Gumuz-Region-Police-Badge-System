import React from "react";
import { BadgeData } from "../types";
import {
  DEFAULT_ETHIOPIA_FLAG,
  DEFAULT_REGION_FLAG,
  DEFAULT_COMMISSION_LOGO,
  DEFAULT_CHEST_BADGE,
  DEFAULT_OFFICIAL_STAMP,
} from "../data/defaults";

interface BadgeCardFrontProps {
  data: BadgeData;
  scale?: number;
  className?: string;
  onClick?: () => void;
}

export const BadgeCardFront: React.FC<BadgeCardFrontProps> = ({
  data,
  scale = 1,
  className = "",
  onClick,
}) => {
  const ethiopianFlag = data.ethiopiaFlag || DEFAULT_ETHIOPIA_FLAG;
  const regionalFlag = data.regionFlag || DEFAULT_REGION_FLAG;
  const logo = data.commissionLogo || DEFAULT_COMMISSION_LOGO;
  const stamp = data.officialStamp || DEFAULT_OFFICIAL_STAMP;

  return (
    <div
      onClick={onClick}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
      className={`relative w-[340px] h-[536px] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#d4af37] bg-gradient-to-b from-[#0a192f] via-[#0d2137] to-[#081220] text-white flex flex-col justify-between select-none print:shadow-none ${className}`}
    >
      {/* Background Security Guilloche Pattern & Gold Gradient Glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:12px_12px]" />
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#d4af37]/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-[#1e40af]/30 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Section: Flags & Commission Logo */}
      <div className="relative pt-3 px-3 pb-2 bg-gradient-to-r from-[#071322] via-[#0f2744] to-[#071322] border-b-2 border-[#d4af37]">
        <div className="flex items-center justify-between gap-1">
          {/* Left: Ethiopian National Flag */}
          <div className="flex flex-col items-center">
            <div className="w-11 h-7 rounded border border-[#d4af37] overflow-hidden shadow-md bg-black">
              <img
                src={ethiopianFlag}
                alt="Ethiopia Flag"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[7px] text-[#d4af37] font-semibold mt-0.5 tracking-tighter">
              ኢትዮጵያ
            </span>
          </div>

          {/* Center: Official Police Commission Logo */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 p-0.5 rounded-full bg-gradient-to-tr from-[#d4af37] via-white to-[#8a6d1c] shadow-lg">
              <img
                src={logo}
                alt="Police Commission Logo"
                className="w-full h-full object-contain rounded-full bg-[#0a192f]"
              />
            </div>
          </div>

          {/* Right: Benishangul Gumuz Regional Flag */}
          <div className="flex flex-col items-center">
            <div className="w-11 h-7 rounded border border-[#d4af37] overflow-hidden shadow-md bg-black">
              <img
                src={regionalFlag}
                alt="Benishangul Flag"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[7px] text-[#d4af37] font-semibold mt-0.5 tracking-tighter">
              የክልሉ ሰንደቅ
            </span>
          </div>
        </div>

        {/* Center Institution Title under Logo (Amharic & English) */}
        <div className="text-center mt-1">
          <h1 className="text-[9.5px] font-black leading-tight text-white tracking-tight drop-shadow-sm font-sans">
            ቤንሻንጉል ጉሙዝ ክልል ፖሊስ ኮሚሽን ቴክኖሎጂ ማስፋፊያ ማዕከል
          </h1>
          <p className="text-[6.2px] font-extrabold text-[#f39c12] tracking-tighter uppercase leading-none mt-0.5">
            BENISHANGUL GUMUZ REGION POLICE COMMISSION TECHNOLOGY EXPANSION CENTER
          </p>
        </div>
      </div>

      {/* Center Section: Chest Badge Shield (የደረት ባጅ) */}
      <div className="relative flex justify-center items-center py-1 bg-gradient-to-r from-transparent via-[#d4af37]/15 to-transparent border-y border-[#d4af37]/30">
        <div className="w-20 h-16 flex items-center justify-center drop-shadow-[0_4px_10px_rgba(212,175,55,0.4)]">
          <img
            src={DEFAULT_CHEST_BADGE}
            alt="Chest Badge Shield"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-[#d4af37] text-[#0a192f] text-[8px] font-black uppercase tracking-wider shadow">
          {data.status === "ACTIVE" ? "ኦፊሴላዊ" : data.status}
        </div>
      </div>

      {/* Middle/Bottom Main Body: Details (Left) & Photo with Overlapping Stamp (Right) */}
      <div className="relative px-3 py-2 flex-1 flex gap-2 items-start justify-between">
        {/* Left Column: Personnel Information */}
        <div className="flex-1 flex flex-col justify-between h-full space-y-1.5 text-left pr-1">
          {/* Badge ID */}
          <div className="inline-flex items-center gap-1 bg-[#1e293b]/90 border border-[#d4af37]/50 rounded px-1.5 py-0.5 w-max">
            <span className="text-[7px] text-gray-400 font-bold uppercase">ባጅ ቁጥር:</span>
            <span className="text-[9px] font-black text-[#f59e0b] tracking-wider">
              {data.badgeId || "BGRP-0000"}
            </span>
          </div>

          {/* Full Name */}
          <div>
            <span className="text-[7.5px] font-bold text-[#d4af37] uppercase block leading-none">
              ሙሉ ስም / Full Name:
            </span>
            <h3 className="text-[11px] font-black text-white leading-tight font-sans mt-0.5">
              {data.fullNameAmharic || "ያልተሞላ ስም"}
            </h3>
            <p className="text-[8.5px] font-bold text-gray-300 uppercase leading-none">
              {data.fullNameEnglish || "Full Name Placeholder"}
            </p>
          </div>

          {/* Department / Division */}
          <div>
            <span className="text-[7.5px] font-bold text-[#d4af37] uppercase block leading-none">
              ክፍል / Department:
            </span>
            <p className="text-[9.5px] font-extrabold text-white leading-tight font-sans mt-0.5">
              {data.departmentAmharic || "ቴክኖሎጂ ማስፋፊያ"}
            </p>
            <p className="text-[7.5px] font-semibold text-gray-300 uppercase leading-none">
              {data.departmentEnglish || "Tech Expansion"}
            </p>
          </div>

          {/* Rank & Responsibility */}
          <div>
            <span className="text-[7.5px] font-bold text-[#d4af37] uppercase block leading-none">
              ኃላፊነት / Rank & Role:
            </span>
            <p className="text-[9.5px] font-black text-[#f39c12] leading-tight font-sans mt-0.5">
              {data.rankAmharic || "ኦፊሰር / Officer"}
            </p>
            <p className="text-[7.5px] font-semibold text-gray-300 uppercase leading-none">
              {data.rankEnglish || "Police Officer"}
            </p>
          </div>

          {/* Phone Number */}
          <div className="pt-0.5 border-t border-gray-700/60">
            <span className="text-[7px] font-bold text-[#d4af37] uppercase block leading-none">
              ስልክ ቁጥር / Phone:
            </span>
            <p className="text-[9px] font-black text-white leading-none mt-0.5 font-mono">
              {data.phoneNumber || "+251 900 000000"}
            </p>
          </div>
        </div>

        {/* Right Column: Headshot Photo */}
        <div className="relative w-[118px] flex flex-col items-center">
          {/* Photo Frame Container */}
          <div className="relative w-[112px] h-[142px] rounded-lg border-2 border-[#d4af37] bg-white overflow-hidden shadow-xl">
            {data.headshotPhoto ? (
              <img
                src={data.headshotPhoto}
                alt="Personnel Headshot"
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center text-gray-500">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-[8px] font-bold mt-1 text-gray-600">
                  ጉርድ ፎቶ
                </span>
              </div>
            )}

            {/* Micro Hologram Security Label on Photo */}
            <div className="absolute top-1 right-1 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 text-[6px] font-black text-gray-900 px-1 py-0.2 rounded shadow opacity-90 uppercase">
              HOLOGRAM
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section: Validity & Security Holographic Band */}
      <div className="relative bg-gradient-to-r from-[#d4af37] via-[#fefece] to-[#d4af37] text-[#0a192f] px-3 py-1.5 flex items-center justify-between border-t-2 border-[#b8860b]">
        <div>
          <span className="text-[6.5px] font-black uppercase block leading-none text-gray-800">
            የተሰጠበት / ISSUED:
          </span>
          <span className="text-[8px] font-black font-mono leading-tight">
            {data.issueDate || "2026-08-10"}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[7px] font-black uppercase tracking-widest text-[#0a192f]">
            ★ BGRP OFFICIAL BADGE ★
          </span>
          <span className="text-[5.5px] font-bold uppercase text-gray-800">
            የቤንሻንጉል ጉሙዝ ፖሊስ ቴክኖሎጂ
          </span>
        </div>

        <div className="text-right">
          <span className="text-[6.5px] font-black uppercase block leading-none text-gray-800">
            የሚያበቃበት / EXPIRES:
          </span>
          <span className="text-[8px] font-black font-mono leading-tight">
            {data.expiryDate || "2029-08-10"}
          </span>
        </div>
      </div>
    </div>
  );
};
