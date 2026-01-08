import React, { useState, useMemo, useEffect } from "react";
import {
  TrendingUp,
  Sun,
  Moon,
  Home,
  History,
  Building2,
  Plus,
  Handshake,
  ShieldCheck,
  ArrowRight,
  Tag,
  FileText,
  Landmark,
  Percent,
  Scale,
  ChartColumnIncreasing,
} from "lucide-react";
import InputGroup from "./components/InputGroup";
import BreakdownModal from "./components/BreakdownModal";
import { SellerCosts, CalculationResult } from "./types";

const App: React.FC = () => {
  const [theme, setTheme] = useState<"tool-dark" | "tool-light">("tool-dark");
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);
  const [showOtherLiens, setShowOtherLiens] = useState(false);
  const [closingCostsMode, setClosingCostsMode] = useState<
    "percent" | "currency"
  >("percent");

  const [costs, setCosts] = useState<SellerCosts>({
    salePrice: 525000,
    purchasePrice: 385000,
    mortgagePayoff: 290000,
    otherLiens: 0,
    agentCommissionPercent: 3.0,
    buyerAgentCommissionPercent: 2.5,
    closingCostsPercent: 1.5,
    proratedPropertyTaxes: 1450,
    repairCredits: 0,
    otherFees: 450,
  });

  useEffect(() => {
    const toolElement = document.getElementById("tool");
    if (toolElement) {
      toolElement.className = theme;
    }
  }, [theme]);

  const results = useMemo((): CalculationResult => {
    const sale = costs.salePrice || 0;
    const listingComm = (costs.agentCommissionPercent / 100) * sale;
    const buyerComm = (costs.buyerAgentCommissionPercent / 100) * sale;
    const totalCommissions = listingComm + buyerComm;

    const closingCostsVal =
      closingCostsMode === "percent"
        ? (costs.closingCostsPercent / 100) * sale
        : costs.closingCostsPercent;

    const totalClosingCosts =
      closingCostsVal + costs.proratedPropertyTaxes + costs.otherFees;

    const sellingExpenses =
      totalCommissions + totalClosingCosts + (costs.repairCredits || 0);
    const debtPayoff = (costs.mortgagePayoff || 0) + (costs.otherLiens || 0);
    const totalDeductions = sellingExpenses + debtPayoff;
    const netProceeds = sale - totalDeductions;
    const appreciation = sale - (costs.purchasePrice || 0);

    return {
      grossSale: sale,
      totalCommissions,
      totalClosingCosts,
      sellingExpenses,
      debtPayoff,
      totalDeductions,
      netProceeds,
      appreciation,
      breakdown: [
        { name: "Commissions", value: totalCommissions, fill: "#10b981" },
        { name: "Closing Costs", value: totalClosingCosts, fill: "#fb923c" },
        { name: "Debt Payoff", value: debtPayoff, fill: "#6366f1" },
        {
          name: "Net Proceeds",
          value: Math.max(0, netProceeds),
          fill: "#ffffff10",
        },
      ],
    };
  }, [costs, closingCostsMode]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "tool-dark" ? "tool-light" : "tool-dark"));

  const handleClosingCostsChange = (v: number) => {
    setCosts({ ...costs, closingCostsPercent: v });
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 relative overflow-x-hidden ${theme === "tool-dark" ? "text-slate-100" : "text-slate-900"}`}
    >
      <BreakdownModal
        isOpen={isBreakdownOpen}
        onClose={() => setIsBreakdownOpen(false)}
        costs={costs}
        results={results}
        closingCostsMode={closingCostsMode}
      />

      {/* Modern Navigation */}
      <nav className="h-16 lg:h-20 shrink-0 px-6 lg:px-12 flex justify-between items-center z-50 bg-transparent border-b border-black/5 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 lg:w-9 lg:h-9 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <TrendingUp className="text-slate-950" size={18} />
          </div>
          <span className="text-xl lg:text-2xl font-light tracking-tighter">
            nurture<span className="font-semibold text-emerald-500">BEAST</span>
          </span>
          <div className="h-4 w-px bg-slate-300 dark:bg-slate-800 mx-3 hidden sm:block"></div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest hidden sm:block">
            Net Recovery Sheet
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-200/50 dark:bg-white/5 hover:bg-emerald-500/10 transition-all border border-transparent hover:border-emerald-500/20"
          >
            {theme === "tool-dark" ? (
              <Sun className="text-orange-400" size={18} />
            ) : (
              <Moon className="text-indigo-400" size={18} />
            )}
          </button>
          <button className="hidden sm:flex bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-2.5 rounded-2xl text-[11px] font-black transition-all shadow-xl shadow-emerald-500/20 uppercase tracking-widest active:scale-95">
            Export Report
          </button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col lg:flex-row p-4 lg:p-10 gap-8 max-w-[1700px] mx-auto w-full relative z-10">
        {/* Input Sidebar */}
        <aside className="w-full lg:w-[400px] shrink-0">
          <div className="glass rounded-[2.5rem] p-6 lg:p-8 flex flex-col h-fit sticky top-10 border border-white/5 shadow-2xl overflow-hidden">
            <div className="space-y-6">
              <div>
                <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Home size={10} /> Core Asset Info
                </h3>
                <InputGroup
                  label="Listing Sale Price"
                  value={costs.salePrice}
                  type="currency"
                  icon={Tag}
                  onChange={(v) => setCosts({ ...costs, salePrice: v })}
                />
                <InputGroup
                  label="Original Purchase"
                  value={costs.purchasePrice}
                  type="currency"
                  icon={History}
                  onChange={(v) => setCosts({ ...costs, purchasePrice: v })}
                />
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-white/5">
                <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Landmark size={10} /> Debt Obligations
                </h3>
                <InputGroup
                  label="Mortgage Balance"
                  value={costs.mortgagePayoff}
                  type="currency"
                  icon={Building2}
                  onChange={(v) => setCosts({ ...costs, mortgagePayoff: v })}
                />

                {!showOtherLiens && costs.otherLiens === 0 ? (
                  <button
                    onClick={() => setShowOtherLiens(true)}
                    className="flex items-center gap-3 w-full p-4 rounded-2xl border border-dashed border-slate-300 dark:border-white/10 text-slate-400 hover:text-emerald-500 hover:border-emerald-500/50 transition-all group mt-2"
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
                      <Plus size={12} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Add Liens / Taxes
                    </span>
                  </button>
                ) : (
                  <div className="animate-in slide-in-from-top-2">
                    <InputGroup
                      label="Other Recorded Liens"
                      value={costs.otherLiens}
                      type="currency"
                      icon={FileText}
                      onChange={(v) => setCosts({ ...costs, otherLiens: v })}
                    />
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-white/5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Handshake size={10} /> Commissions & Closing
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InputGroup
                    label="Listing %"
                    value={costs.agentCommissionPercent}
                    type="percent"
                    onChange={(v) =>
                      setCosts({ ...costs, agentCommissionPercent: v })
                    }
                  />
                  <InputGroup
                    label="Buyer's %"
                    value={costs.buyerAgentCommissionPercent}
                    type="percent"
                    onChange={(v) =>
                      setCosts({ ...costs, buyerAgentCommissionPercent: v })
                    }
                  />
                </div>

                <div className="mt-4">
                  <div className="flex justify-between items-end mb-2 px-1">
                    <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                      Title & Closing
                    </label>
                    <div className="flex bg-slate-200 dark:bg-black/40 p-1 rounded-xl border border-slate-300 dark:border-white/5">
                      <button
                        onClick={() => setClosingCostsMode("percent")}
                        className={`text-[9px] font-black px-3 py-1.5 rounded-lg transition-all ${closingCostsMode === "percent" ? "bg-emerald-500 text-slate-950" : "text-slate-500"}`}
                      >
                        %
                      </button>
                      <button
                        onClick={() => setClosingCostsMode("currency")}
                        className={`text-[9px] font-black px-3 py-1.5 rounded-lg transition-all ${closingCostsMode === "currency" ? "bg-emerald-500 text-slate-950" : "text-slate-500"}`}
                      >
                        $
                      </button>
                    </div>
                  </div>
                  <InputGroup
                    label=""
                    value={costs.closingCostsPercent}
                    type={closingCostsMode}
                    icon={ShieldCheck}
                    hideLabel
                    onChange={handleClosingCostsChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Dynamic Display Area */}
        <section className="flex-1 flex flex-col gap-8">
          {/* Main Hero Result */}
          <div className="glass rounded-[3.5rem] p-10 lg:p-20 flex flex-col justify-center relative overflow-hidden border border-white/10 shadow-2xl min-h-[500px] lg:min-h-0">
            <div className="relative z-10 w-full max-w-4xl">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <p className="text-[11px] lg:text-[12px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-[0.3em]">
                  Estimated Take-Home Cash
                </p>
              </div>

              <div className="mb-10 lg:mb-16">
                <h2
                  className={`font-light tracking-tighter leading-none flex items-baseline flex-wrap gap-2 lg:gap-4 transition-all duration-300 
                  text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[9.5rem]
                  ${theme === "tool-dark" ? "text-white drop-shadow-[0_0_80px_rgba(255,255,255,0.15)]" : "text-slate-900"}`}
                >
                  <span className="text-emerald-500 font-normal">$</span>
                  <span className="wrap-break-word">
                    {results.netProceeds.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </h2>
                <div className="h-1.5 w-24 bg-linear-to-r from-emerald-500 to-transparent mt-4 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 mb-12 lg:mb-16">
                <div className="group">
                  <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 group-hover:text-emerald-500 transition-colors">
                    Equity Growth
                  </p>
                  <p
                    className={`text-4xl lg:text-5xl font-light ${results.appreciation >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600"}`}
                  >
                    <span className="text-lg opacity-40 mr-1">
                      {results.appreciation >= 0 ? "+" : ""}$
                    </span>
                    {Math.abs(results.appreciation).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
                <div className="group">
                  <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 group-hover:text-orange-400 transition-colors">
                    Total Expenses
                  </p>
                  <p className="text-4xl lg:text-5xl font-light text-orange-600 dark:text-orange-400">
                    <span className="text-lg opacity-40 mr-1">-$</span>
                    {results.sellingExpenses.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
                <div className="group hidden xl:block">
                  <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 group-hover:text-indigo-400 transition-colors">
                    Debt Settled
                  </p>
                  <p className="text-4xl lg:text-5xl font-light text-indigo-500">
                    <span className="text-lg opacity-40 mr-1">-$</span>
                    {results.debtPayoff.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <button
                  onClick={() => setIsBreakdownOpen(true)}
                  className="w-full sm:w-auto group flex items-center justify-center gap-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-10 py-5 rounded-[2.5rem] text-[11px] font-black uppercase tracking-[0.3em] transition-all shadow-[0_20px_50px_-10px_rgba(16,185,129,0.3)] active:scale-95 whitespace-nowrap"
                >
                  View Full Audit
                  <ArrowRight
                    className="group-hover:translate-x-2 transition-transform"
                    size={16}
                  />
                </button>
                <div className="flex gap-4">
                  <div className="w-[2px] h-12 bg-slate-200 dark:bg-white/10 hidden sm:block"></div>
                  <div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                      Expert Note
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[320px] leading-relaxed mt-1">
                      Selling costs represent approx.{" "}
                      <b>
                        {(
                          (results.sellingExpenses / (costs.salePrice || 1)) *
                          100
                        ).toFixed(1)}
                        %
                      </b>{" "}
                      of your final sale price.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decorative House */}
            <div
              className={`absolute -bottom-10 -right-20 pointer-events-none select-none transition-opacity duration-1000 ${theme === "tool-dark" ? "opacity-[0.04]" : "opacity-[0.05]"}`}
            >
              <Home
                size={800}
                strokeWidth={0.5}
                className="text-emerald-500 -rotate-12"
              />
            </div>
          </div>

          {/* Visual Breakdown Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass rounded-3xl p-8 border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                  <Percent size={14} />
                </div>
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                  Net Ratio
                </span>
              </div>
              <p className="text-3xl font-light mb-1">
                {((results.netProceeds / (costs.salePrice || 1)) * 100).toFixed(
                  1
                )}
                %
              </p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                of Gross Sale Price
              </p>
            </div>

            <div className="glass rounded-3xl p-8 border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400">
                  <Scale size={14} />
                </div>
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                  Cost Burden
                </span>
              </div>
              <p className="text-3xl font-light mb-1">
                {(
                  (results.totalDeductions / (costs.salePrice || 1)) *
                  100
                ).toFixed(1)}
                %
              </p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                Total Sunk Costs
              </p>
            </div>

            <div className="glass rounded-3xl p-8 border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-400">
                  <ChartColumnIncreasing size={14} />
                </div>
                <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">
                  Market Gains
                </span>
              </div>
              <p className="text-3xl font-light mb-1">
                {(
                  (results.appreciation / (costs.purchasePrice || 1)) *
                  100
                ).toFixed(1)}
                %
              </p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                Growth Since Purchase
              </p>
            </div>
          </div>
        </section>
      </main>

      <div className="h-10 lg:hidden shrink-0"></div>
    </div>
  );
};

export default App;
