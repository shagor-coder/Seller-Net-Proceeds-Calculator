import React from "react";
import { SellerCosts, CalculationResult } from "../types";
import { FileText, X } from "lucide-react";

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-md transition-opacity cursor-pointer"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="glass w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 duration-500 border border-white/10 flex flex-col">
        <div className="p-6 sm:p-8 lg:p-12 overflow-y-auto no-scrollbar max-h-[90vh]">
          <div className="flex justify-between items-start mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="text-emerald-500 text-sm" />
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                  Asset Integrity Audit
                </p>
              </div>
              <h2 className="text-3xl font-light tracking-tight">
                Full Net Recovery Sheet
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-emerald-500/20 transition-colors"
            >
              <X className="text-slate-400" />
            </button>
          </div>

          <div className="space-y-12 mb-12">
            {/* Sale Revenue */}
            <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
              <div className="flex justify-between items-end mb-6">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Primary Revenue
                </p>
                <p className="text-xs font-bold text-slate-500">100%</p>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-white/5">
                <span className="text-base font-medium text-slate-300">
                  Contract Sale Price
                </span>
                <span className="text-xl font-bold text-emerald-500">
                  ${(costs.salePrice || 0).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Expenses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Debt Payoff */}
              <div>
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">
                  Debt Payoff
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-sm text-slate-400">
                      Mortgage Balance
                    </span>
                    <span className="text-sm font-medium">
                      -${costs.mortgagePayoff.toLocaleString()}
                    </span>
                  </div>
                  {costs.otherLiens > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-sm text-slate-400">
                        Other Liens
                      </span>
                      <span className="text-sm font-medium">
                        -${costs.otherLiens.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs font-black text-slate-600 uppercase">
                      Subtotal
                    </span>
                    <span className="text-sm font-bold text-slate-400">
                      -${results.debtPayoff.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Selling Costs */}
              <div>
                <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-4">
                  Transaction Costs
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-sm text-slate-400">
                      Listing Fee ({costs.agentCommissionPercent}%)
                    </span>
                    <span className="text-sm font-medium">
                      -${commissionListing.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-sm text-slate-400">
                      Buyer Fee ({costs.buyerAgentCommissionPercent}%)
                    </span>
                    <span className="text-sm font-medium">
                      -${commissionBuyer.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-sm text-slate-400">Closing Fees</span>
                    <span className="text-sm font-medium">
                      -${closingCostsAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs font-black text-slate-600 uppercase">
                      Subtotal
                    </span>
                    <span className="text-sm font-bold text-slate-400">
                      -${results.sellingExpenses.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-500 p-6 sm:p-8 lg:p-10 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 shadow-2xl shadow-emerald-500/20">
            <div>
              <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-2 opacity-60">
                Final Estimated Recovery
              </p>
              <p className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tighter text-slate-950">
                <span className="text-xl sm:text-2xl opacity-40 mr-1">$</span>
                {results.netProceeds.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="w-full md:w-auto bg-slate-950 hover:bg-slate-900 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-[11px] font-black transition-all uppercase tracking-widest shadow-xl active:scale-95"
            >
              Print Audit Sheet
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
