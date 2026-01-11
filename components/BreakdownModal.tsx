import React from "react";
import { FileText, X, Printer } from "lucide-react";
import { SellerCosts, CalculationResult } from "../types";

interface BreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  costs: SellerCosts;
  results: CalculationResult;
  closingCostsMode: "percent" | "currency";
}

const BreakdownModal: React.FC<BreakdownModalProps> = ({
  isOpen,
  onClose,
  costs,
  results,
  closingCostsMode,
}) => {
  if (!isOpen) return null;

  const commissionListing =
    (costs.agentCommissionPercent / 100) * (costs.salePrice || 0);
  const commissionBuyer =
    (costs.buyerAgentCommissionPercent / 100) * (costs.salePrice || 0);

  const closingCostsAmount =
    closingCostsMode === "percent"
      ? (costs.closingCostsPercent / 100) * (costs.salePrice || 0)
      : costs.closingCostsPercent;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-y-auto">
      <div
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-md transition-opacity cursor-pointer"
        onClick={onClose}
      ></div>

      <div className="glass w-full max-w-2xl !rounded-[2rem] sm:!rounded-[2.5rem] lg:!rounded-[3rem] overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 duration-500 border border-white/10 flex flex-col my-4 sm:my-8">
        <div className="p-6 sm:p-8 lg:p-12 overflow-y-auto no-scrollbar max-h-[90vh]">
          <div className="flex justify-between items-start mb-8 sm:mb-12 gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="text-emerald-500 shrink-0" size={14} />
                <p className="text-[9px] sm:text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                  Asset Integrity Audit
                </p>
              </div>
              <h2 className="text-xl sm:text-2xl font-light tracking-tight break-words">
                Full Net Recovery Sheet
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 !rounded-full flex items-center justify-center bg-white/5 hover:bg-emerald-500/20 transition-colors shrink-0"
            >
              <X className="text-slate-400" size={16} />
            </button>
          </div>

          <div className="space-y-8 sm:space-y-12 mb-8 sm:mb-12">
            <div className="bg-white/5 p-6 sm:p-8 !rounded-2xl sm:!rounded-3xl border border-white/5">
              <div className="flex justify-between items-end mb-4 sm:mb-6 gap-2">
                <p className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Primary Revenue
                </p>
                <p className="text-[10px] sm:text-xs font-bold text-slate-500 shrink-0">
                  100%
                </p>
              </div>
              <div className="flex justify-between items-center py-3 sm:py-4 border-b border-white/5 gap-4">
                <span className="text-xs sm:text-sm font-medium text-slate-300 break-words min-w-0">
                  Contract Sale Price
                </span>
                <span className="text-sm sm:text-base font-bold text-emerald-500 shrink-0">
                  ${(costs.salePrice || 0).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">
                  Debt Payoff
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-white/5 gap-4">
                    <span className="text-xs sm:text-sm text-slate-400 break-words min-w-0">
                      Mortgage Balance
                    </span>
                    <span className="text-xs sm:text-sm font-medium shrink-0">
                      -${costs.mortgagePayoff.toLocaleString()}
                    </span>
                  </div>
                  {costs.otherLiens > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-white/5 gap-4">
                      <span className="text-xs sm:text-sm text-slate-400 break-words min-w-0">
                        Other Liens
                      </span>
                      <span className="text-xs sm:text-sm font-medium shrink-0">
                        -${costs.otherLiens.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2 gap-4">
                    <span className="text-[10px] sm:text-xs font-black text-slate-600 uppercase">
                      Subtotal
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-400 shrink-0">
                      -${results.debtPayoff.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-4">
                  Transaction Costs
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-white/5 gap-4">
                    <span className="text-xs sm:text-sm text-slate-400 break-words min-w-0">
                      Listing Fee ({costs.agentCommissionPercent}%)
                    </span>
                    <span className="text-xs sm:text-sm font-medium shrink-0">
                      -${commissionListing.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5 gap-4">
                    <span className="text-xs sm:text-sm text-slate-400 break-words min-w-0">
                      Buyer Fee ({costs.buyerAgentCommissionPercent}%)
                    </span>
                    <span className="text-xs sm:text-sm font-medium shrink-0">
                      -${commissionBuyer.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5 gap-4">
                    <span className="text-xs sm:text-sm text-slate-400 break-words min-w-0">
                      Closing Fees
                    </span>
                    <span className="text-xs sm:text-sm font-medium shrink-0">
                      -${closingCostsAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 gap-4">
                    <span className="text-[10px] sm:text-xs font-black text-slate-600 uppercase">
                      Subtotal
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-400 shrink-0">
                      -${results.sellingExpenses.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-500 p-6 sm:p-8 lg:p-10 !rounded-[2rem] sm:!rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 shadow-2xl shadow-emerald-500/20">
            <div className="w-full md:w-auto min-w-0">
              <p className="text-[9px] sm:text-[10px] font-black text-slate-900 uppercase tracking-widest mb-2 opacity-60">
                Final Estimated Recovery
              </p>
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tighter text-slate-950 break-words">
                <span className="text-base sm:text-lg md:text-xl opacity-40 mr-1">
                  $
                </span>
                {results.netProceeds.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 text-white px-6 sm:px-10 py-4 sm:py-5 !rounded-xl sm:!rounded-2xl text-[10px] sm:text-[11px] font-black transition-all uppercase tracking-widest shadow-xl active:scale-95 shrink-0"
            >
              <Printer size={14} /> Print Audit Sheet
            </button>
          </div>

          <p className="text-center text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-8 opacity-40">
            Estimates provided for informational purposes only. Consult with
            your title officer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BreakdownModal;
