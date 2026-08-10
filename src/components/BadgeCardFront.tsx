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
      className={`relative w-[315px] h-[495px] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#eab308] bg-gradient-to-b from-[#0f2d5e] via-[#163a75] to-[#0b1b3b] text-white flex flex-col justify-between select-none print:shadow-none ${className}`}
    >
      {/* Background Security Pattern & Gold Radial Glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#facc15_1px,transparent_1px)] [background-size:10px_10px]" />
      <div className="absolute -top-20 -left-20 w-44 h-44 bg-[#facc15]/25 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-44 h-44 bg-[#2563eb]/35 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Section: Flags & Commission Logo */}
      <div className="relative pt-2.5 px-2.5 pb-2 bg-gradient-to-r from-[#0b1c3a] via-[#133261] to-[#0b1c3a] border-b-2 border-[#eab308]">
        <div className="flex items-center justify-between gap-1">
          {/* Left: Ethiopian National Flag */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-10 h-6.5 rounded border border-[#facc15] overflow-hidden shadow-md bg-black">
              <img
                src={ethiopianFlag}
                alt="Ethiopia Flag"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Center: Official Police Commission Logo */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 p-0.5 rounded-full bg-gradient-to-tr from-[#facc15] via-white to-[#eab308] shadow-xl ring-2 ring-[#facc15]/60">
              <img
                src={logo}
                alt="Police Commission Logo"
                className="w-full h-full object-contain rounded-full bg-white filter contrast-[1.08] brightness-[1.05] drop-shadow"
              />
            </div>
          </div>

          {/* Right: Benishangul Gumuz Regional Flag */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-10 h-6.5 rounded border border-[#facc15] overflow-hidden shadow-md bg-black">
              <img
                src={regionalFlag}
                alt="Benishangul Flag"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Center Institution Title & Prominent 'የደረት ባጅ' under English text */}
        <div className="text-center mt-1 space-y-0.5">
          <h1 className="text-[10px] font-black leading-tight text-white tracking-tight drop-shadow-md font-sans">
            ቤንሻንጉል ጉሙዝ ክልል ፖሊስ ኮሚሽን
          </h1>
          <p className="text-[6px] font-black text-[#fef08a] tracking-tighter uppercase leading-none">
            BENISHANGUL GUMUZ REGION POLICE COMMISSION
          </p>
          <div className="inline-block bg-[#facc15] text-[#0b1c3a] text-[9px] font-black px-2 py-0.5 rounded shadow uppercase tracking-wider mt-0.5">
            የደረት ባጅ
          </div>
        </div>
      </div>

      {/* Center Section: Chest Badge Shield */}
      <div className="relative flex justify-center items-center py-1 bg-gradient-to-r from-transparent via-[#facc15]/20 to-transparent border-y border-[#facc15]/40">
        <div className="w-16 h-13 flex items-center justify-center drop-shadow-[0_4px_10px_rgba(250,204,21,0.5)]">
          <img
            src={DEFAULT_CHEST_BADGE}
            alt="Chest Badge Shield"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-[#facc15] text-[#0b1c3a] text-[7.5px] font-black uppercase tracking-wider shadow">
          {data.status === "ACTIVE" ? "ኦፊሴላዊ" : data.status}
        </div>
      </div>

      {/* Middle/Bottom Main Body: Details (Left) & Photo (Right) */}
      <div className="relative px-2.5 py-1.5 flex-1 flex gap-2 items-start justify-between">
        {/* Left Column: Personnel Information */}
        <div className="flex-1 flex flex-col justify-between h-full space-y-1 text-left pr-1">
          {/* Badge ID */}
          <div className="inline-flex items-center gap-1 bg-[#0b1c3a]/90 border border-[#facc15]/60 rounded px-1.5 py-0.5 w-max shadow-sm">
            <span className="text-[7px] text-gray-200 font-bold uppercase">ባጅ ቁጥር:</span>
            <span className="text-[9px] font-black text-[#fef08a] tracking-wider">
              {data.badgeId || "BGRP-0000"}
            </span>
          </div>

          {/* Full Name */}
          <div>
            <span className="text-[7px] font-black text-[#facc15] uppercase block leading-none">
              ሙሉ ስም / Full Name:
            </span>
            <h3 className="text-[10.5px] font-black text-white leading-tight font-sans mt-0.5">
              {data.fullNameAmharic || "ያልተሞላ ስም"}
            </h3>
            <p className="text-[8px] font-extrabold text-amber-200 uppercase leading-none">
              {data.fullNameEnglish || "Full Name Placeholder"}
            </p>
          </div>

          {/* Department / Division */}
          <div>
            <span className="text-[7px] font-black text-[#facc15] uppercase block leading-none">
              ክፍል / Department:
            </span>
            <p className="text-[9px] font-black text-white leading-tight font-sans mt-0.5">
              {data.departmentAmharic || "ቴክኖሎጂ ማስፋፊያ"}
            </p>
            <p className="text-[7px] font-bold text-amber-200 uppercase leading-none">
              {data.departmentEnglish || "Tech Expansion"}
            </p>
          </div>

          {/* Rank & Responsibility */}
          <div>
            <span className="text-[7px] font-black text-[#facc15] uppercase block leading-none">
              ኃላፊነት / Rank & Role:
            </span>
            <p className="text-[9px] font-black text-[#fef08a] leading-tight font-sans mt-0.5">
              {data.rankAmharic || "ኦፊሰር / Officer"}
            </p>
            <p className="text-[7px] font-bold text-amber-200 uppercase leading-none">
              {data.rankEnglish || "Police Officer"}
            </p>
          </div>

          {/* Phone Number */}
          <div className="pt-0.5 border-t border-amber-400/30">
            <span className="text-[6.5px] font-black text-[#facc15] uppercase block leading-none">
              ስልክ ቁጥር / Phone:
            </span>
            <p className="text-[8.5px] font-black text-white leading-none mt-0.5 font-mono">
              {data.phoneNumber || "+251 900 000000"}
            </p>
          </div>
        </div>

        {/* Right Column: Headshot Photo */}
        <div className="relative w-[108px] flex flex-col items-center">
          {/* Photo Frame Container */}
          <div className="relative w-[104px] h-[130px] rounded-lg border-2 border-[#facc15] bg-white overflow-hidden shadow-2xl ring-2 ring-[#facc15]/30">
            {data.headshotPhoto ? (
              <img
                src={data.headshotPhoto}
                alt="Personnel Headshot"
                className="w-full h-full object-cover object-top filter brightness-[1.08] contrast-[1.08] saturate-[1.12]"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center text-gray-500">
                <svg
                  className="w-10 h-10 text-gray-400"
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
                <span className="text-[7.5px] font-bold mt-1 text-gray-600">
                  ጉርድ ፎቶ
                </span>
              </div>
            )}

            {/* Micro Hologram Security Label on Photo */}
            <div className="absolute top-1 right-1 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 text-[5.5px] font-black text-gray-900 px-1 py-0.2 rounded shadow opacity-90 uppercase">
              HOLOGRAM
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section: Validity & Security Holographic Band */}
      <div className="relative bg-gradient-to-r from-[#eab308] via-[#fef9c3] to-[#eab308] text-[#0f2d5e] px-2.5 py-1 flex items-center justify-between border-t-2 border-[#ca8a04]">
        <div>
          <span className="text-[6px] font-black uppercase block leading-none text-[#0f2d5e]">
            የተሰጠበት / ISSUED:
          </span>
          <span className="text-[7.5px] font-black font-mono leading-tight">
            {data.issueDate || "2026-08-10"}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[6.5px] font-black uppercase tracking-widest text-[#0f2d5e]">
            ★ BGRP CHEST BADGE ★
          </span>
          <span className="text-[5px] font-black uppercase text-[#1e3a8a]">
            የቤንሻንጉል ጉሙዝ ፖሊስ
          </span>
        </div>

        <div className="text-right">
          <span className="text-[6px] font-black uppercase block leading-none text-[#0f2d5e]">
            የሚያበቃበት / EXPIRES:
          </span>
          <span className="text-[7.5px] font-black font-mono leading-tight">
            {data.expiryDate || "2029-08-10"}
          </span>
        </div>
      </div>
    </div>
  );
};
