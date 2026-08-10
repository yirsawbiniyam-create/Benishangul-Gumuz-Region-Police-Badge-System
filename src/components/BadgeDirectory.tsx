import React, { useState } from "react";
import { BadgeData } from "../types";
import { BadgeCardFront } from "./BadgeCardFront";
import { BadgeCardBack } from "./BadgeCardBack";
import {
  Search,
  Filter,
  Eye,
  Printer,
  Edit,
  Trash2,
  QrCode,
  ShieldCheck,
  ShieldAlert,
  Calendar,
  User,
  Phone,
  Briefcase,
  Plus,
} from "lucide-react";

interface BadgeDirectoryProps {
  badges: BadgeData[];
  loading: boolean;
  onEdit: (badge: BadgeData) => void;
  onDelete: (badgeId: string) => void;
  onVerify: (badge: BadgeData) => void;
  onPrint: (badge: BadgeData) => void;
  onCreateNew: () => void;
}

export const BadgeDirectory: React.FC<BadgeDirectoryProps> = ({
  badges,
  loading,
  onEdit,
  onDelete,
  onVerify,
  onPrint,
  onCreateNew,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedBadgeForModal, setSelectedBadgeForModal] =
    useState<BadgeData | null>(null);
  const [activeTabSide, setActiveTabSide] = useState<"FRONT" | "BACK">("FRONT");

  // Filter badges based on search & status
  const filteredBadges = badges.filter((badge) => {
    const matchesSearch =
      badge.fullNameAmharic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      badge.fullNameEnglish.toLowerCase().includes(searchTerm.toLowerCase()) ||
      badge.badgeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      badge.departmentAmharic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      badge.rankAmharic.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || badge.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter Header Bar */}
      <div className="bg-[#1e293b] p-4 rounded-xl shadow-xl border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="በስም፣ በባጅ ቁጥር ወይም በክፍል ይፈልጉ..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-800 text-slate-100 placeholder-slate-400 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setStatusFilter("ALL")}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition ${
              statusFilter === "ALL"
                ? "bg-blue-600 text-white shadow"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
            }`}
          >
            ሁሉም ({badges.length})
          </button>
          <button
            onClick={() => setStatusFilter("ACTIVE")}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
              statusFilter === "ACTIVE"
                ? "bg-emerald-600 text-white shadow"
                : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            ኦፊሴላዊ (ACTIVE)
          </button>
          <button
            onClick={() => setStatusFilter("REVOKED")}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
              statusFilter === "REVOKED"
                ? "bg-rose-600 text-white shadow"
                : "bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            የተሰረዙ (REVOKED)
          </button>

          <button
            onClick={onCreateNew}
            className="ml-auto px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow transition flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            አዲስ ባጅ መዝግብ
          </button>
        </div>
      </div>

      {/* Directory Content List/Grid */}
      {loading ? (
        <div className="bg-[#1e293b] p-12 rounded-xl text-center border border-slate-700 shadow-xl">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-300">
            መረጃዎች ከፋየርስቶር ዳታቤዝ በመጫን ላይ ናቸው...
          </p>
        </div>
      ) : filteredBadges.length === 0 ? (
        <div className="bg-[#1e293b] p-12 rounded-xl text-center border border-slate-700 shadow-xl">
          <ShieldAlert className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-200">
            ምንም የተመዘገበ የፖሊስ ባጅ አልተገኘም
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            አዲስ የፖሊስ ባጅ ለመመዝገብ ከላይ ያለውን "አዲስ ባጅ መዝግብ" የሚለውን ቁልፍ ይጫኑ::
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBadges.map((badge) => (
            <div
              key={badge.id || badge.badgeId}
              className="bg-[#1e293b] rounded-xl p-4 border border-slate-700 shadow-xl hover:border-slate-600 transition flex flex-col justify-between space-y-4"
            >
              {/* Officer Header Card Preview */}
              <div className="flex items-center gap-3 pb-3 border-b border-slate-700">
                <div className="w-16 h-20 bg-slate-800 rounded-lg border border-slate-600 overflow-hidden shrink-0 shadow">
                  {badge.headshotPhoto ? (
                    <img
                      src={badge.headshotPhoto}
                      alt={badge.fullNameAmharic}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <User className="w-8 h-8 text-slate-500 m-auto mt-5" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="px-2 py-0.5 bg-blue-600/20 border border-blue-500/30 text-blue-400 text-[10px] font-mono font-bold rounded uppercase">
                      {badge.badgeId}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[9px] font-bold rounded-full uppercase border ${
                        badge.status === "ACTIVE"
                          ? "bg-green-500/10 border-green-500/30 text-green-400"
                          : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                      }`}
                    >
                      {badge.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-100 truncate font-sans">
                    {badge.fullNameAmharic}
                  </h4>
                  <p className="text-xs text-slate-400 truncate">
                    {badge.fullNameEnglish}
                  </p>

                  <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-blue-400">
                    <Briefcase className="w-3 h-3" />
                    <span className="truncate">{badge.rankAmharic}</span>
                  </div>
                </div>
              </div>

              {/* Quick Details */}
              <div className="text-xs space-y-1.5 text-slate-300 bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-400">ክፍል / Dept:</span>
                  <span className="font-bold text-slate-200 truncate max-w-[160px]">
                    {badge.departmentAmharic}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-400">ስልክ / Phone:</span>
                  <span className="font-mono font-bold text-slate-200">
                    {badge.phoneNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-400">የተሰጠበት / Issued:</span>
                  <span className="font-mono font-semibold text-slate-300">
                    {badge.issueDate}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                <button
                  onClick={() => setSelectedBadgeForModal(badge)}
                  title="ባጁን እይ (Preview Front & Back)"
                  className="py-2 px-1 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-[11px] font-bold rounded-lg transition flex flex-col items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span>እይ</span>
                </button>

                <button
                  onClick={() => onPrint(badge)}
                  title="ባጁን አትም (Print)"
                  className="py-2 px-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-bold rounded-lg transition flex flex-col items-center gap-1 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span>አትም</span>
                </button>

                <button
                  onClick={() => onEdit(badge)}
                  title="አስተካክል (Edit)"
                  className="py-2 px-1 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[11px] font-bold rounded-lg transition flex flex-col items-center gap-1 cursor-pointer"
                >
                  <Edit className="w-4 h-4 text-blue-400" />
                  <span>አስተካክል</span>
                </button>

                <button
                  onClick={() => {
                    if (
                      confirm(
                        `እርግጠኛ ነዎት የባጁን መረጃ (${badge.fullNameAmharic}) ከፋየርስቶር ማጥፋት ይፈልጋሉ?`
                      )
                    ) {
                      onDelete(badge.id || badge.badgeId);
                    }
                  }}
                  title="ሰርዝ (Delete)"
                  className="py-2 px-1 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[11px] font-bold rounded-lg transition flex flex-col items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 text-rose-400" />
                  <span>ሰርዝ</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Front & Back Badge Modal */}
      {selectedBadgeForModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1e293b] text-slate-100 rounded-2xl max-w-xl w-full p-6 border border-slate-700 shadow-2xl relative space-y-6">
            <button
              onClick={() => setSelectedBadgeForModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full transition cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-100">
                የፖሊስ ባጅ ካርድ ቅጽበት / Badge Card Preview
              </h3>
              <p className="text-xs text-blue-400 mt-0.5 font-mono">
                {selectedBadgeForModal.fullNameAmharic} ({selectedBadgeForModal.badgeId})
              </p>
            </div>

            {/* Toggle Front / Back View */}
            <div className="flex justify-center bg-slate-900 p-1 rounded-xl max-w-xs mx-auto border border-slate-700">
              <button
                onClick={() => setActiveTabSide("FRONT")}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                  activeTabSide === "FRONT"
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-400 hover:text-slate-100"
                }`}
              >
                የፊት ገፅ (Front)
              </button>
              <button
                onClick={() => setActiveTabSide("BACK")}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                  activeTabSide === "BACK"
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-400 hover:text-slate-100"
                }`}
              >
                የኋላ ገፅ (Back)
              </button>
            </div>

            {/* Card Render */}
            <div className="flex justify-center py-2">
              {activeTabSide === "FRONT" ? (
                <BadgeCardFront data={selectedBadgeForModal} scale={1} />
              ) : (
                <BadgeCardBack data={selectedBadgeForModal} scale={1} />
              )}
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-700">
              <button
                onClick={() => {
                  onVerify(selectedBadgeForModal);
                  setSelectedBadgeForModal(null);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 transition cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                የQR ማረጋገጫ
              </button>

              <button
                onClick={() => {
                  onPrint(selectedBadgeForModal);
                  setSelectedBadgeForModal(null);
                }}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 transition cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                ባጁን አትም (Print)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
