import React from "react";
import { BadgeData } from "../types";
import { BadgeCardFront } from "./BadgeCardFront";
import { BadgeCardBack } from "./BadgeCardBack";
import { Printer, X, Download, ShieldCheck } from "lucide-react";

interface PrintSheetModalProps {
  badge: BadgeData;
  onClose: () => void;
}

export const PrintSheetModal: React.FC<PrintSheetModalProps> = ({
  badge,
  onClose,
}) => {
  const handlePrintTrigger = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 text-white rounded-3xl max-w-4xl w-full p-6 border-2 border-[#d4af37] shadow-2xl relative space-y-6 print:p-0 print:bg-white print:text-black print:border-none print:shadow-none print:rounded-none">
        {/* Header - Hidden in Print */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-800 print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-6 h-6 text-[#d4af37]" />
            <div>
              <h3 className="text-base font-black text-white">
                የፖሊስ ባጅ ማተሚያ ገፅ / Badge Print Studio
              </h3>
              <p className="text-xs text-gray-400">
                CR80 ኦፊሴላዊ የባጅ ካርድ መጠን (85.6mm x 53.9mm) የፊትና የኋላ ገፅ ማተሚያ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrintTrigger}
              className="px-5 py-2.5 bg-[#d4af37] text-[#0a192f] font-black text-xs rounded-xl shadow hover:bg-[#b8860b] flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              አሁን አትም (Print Now)
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white bg-white/10 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div className="bg-slate-950 p-8 rounded-2xl border border-gray-800 print:bg-white print:p-0 print:border-none flex flex-col items-center gap-8">
          <div className="text-center print:hidden space-y-1">
            <span className="text-xs font-bold text-[#d4af37] bg-[#0a192f] px-3 py-1 rounded-full border border-[#d4af37]/40">
              የቤንሻንጉል ጉሙዝ ክልል ፖሊስ ኮሚሽን ቴክኖሎጂ ማስፋፊያ ማዕከል - ኦፊሴላዊ ባጅ
            </span>
            <h4 className="text-sm font-black text-white mt-1">
              {badge.fullNameAmharic} ({badge.badgeId})
            </h4>
          </div>

          {/* Cards Container Side-by-Side */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 print:flex-row print:gap-8 print:justify-center print:w-full print:m-0">
            {/* Front Card */}
            <div className="flex flex-col items-center gap-2 print-card-container">
              <span className="text-xs font-bold text-gray-400 print:hidden">
                የፊት ገፅ (Front Side)
              </span>
              <div className="p-1 bg-white/5 rounded-2xl print:p-0 print:m-0">
                <BadgeCardFront data={badge} scale={1} />
              </div>
            </div>

            {/* Back Card */}
            <div className="flex flex-col items-center gap-2 print-card-container">
              <span className="text-xs font-bold text-gray-400 print:hidden">
                የኋላ ገፅ (Back Side)
              </span>
              <div className="p-1 bg-white/5 rounded-2xl print:p-0 print:m-0">
                <BadgeCardBack data={badge} scale={1} />
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-gray-400 print:hidden max-w-lg leading-relaxed">
            💡 <strong className="text-amber-300">ማሳሰቢያ፡</strong> ማተሚያ ቦታ ላይ
            Printer Settings &rarr; Margins = None, Background Graphics = Checked አድርገው ሲያትሙ የተሟላ ጥራት ያለው ባጅ ይወጣል::
          </div>
        </div>
      </div>
    </div>
  );
};
