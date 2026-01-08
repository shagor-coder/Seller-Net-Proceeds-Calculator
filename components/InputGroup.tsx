import React, { useState, useEffect } from "react";
import { LucideIcon } from "lucide-react";

interface InputGroupProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  icon?: LucideIcon;
  type?: "currency" | "percent";
  hideLabel?: boolean;
  theme?: "tool-dark" | "tool-light";
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  value,
  onChange,
  icon: Icon,
  type = "currency",
  hideLabel = false,
  theme = "tool-dark",
}) => {
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    if (value === 0) {
      setDisplayValue("");
    } else {
      if (type === "currency") {
        setDisplayValue(value.toLocaleString());
      } else {
        setDisplayValue(value.toString());
      }
    }
  }, [value, type]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (type === "currency") {
      const raw = displayValue.replace(/,/g, "");
      setDisplayValue(raw);
    }
    e.target.select();
  };

  const handleBlur = () => {
    if (type === "currency" && displayValue !== "") {
      const num = parseFloat(displayValue.replace(/,/g, ""));
      if (!isNaN(num)) {
        setDisplayValue(num.toLocaleString());
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawInput = e.target.value.replace(/[^0-9.]/g, "");
    setDisplayValue(rawInput);

    const numValue = parseFloat(rawInput);
    if (isNaN(numValue)) {
      onChange(0);
    } else {
      onChange(numValue);
    }
  };

  return (
    <div className={`${hideLabel ? "mb-0" : "mb-5"} group`}>
      {!hideLabel && (
        <label className={`block text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-2 px-1 ${theme === "tool-light" ? "text-slate-500" : "text-slate-400"}`}>
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 w-10 sm:w-12 flex items-center justify-center pointer-events-none z-20">
            <Icon
              size={14}
              className={`sm:w-4 sm:h-4 group-focus-within:text-emerald-500 transition-colors duration-300 ${theme === "tool-light" ? "text-slate-400" : "text-slate-500"}`}
            />
          </div>
        )}
        {type === "currency" && (
          <div className="absolute inset-y-0 left-10 sm:left-12 flex items-center pointer-events-none z-10">
            <span className={`font-bold text-xs sm:text-sm md:text-base ${theme === "tool-light" ? "text-slate-500" : "text-slate-400"}`}>
              $
            </span>
          </div>
        )}
        <input
          type="text"
          inputMode="decimal"
          className={`block w-full 
            ${theme === "tool-light" ? "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400" : "bg-slate-800/60 border-white/10 text-white placeholder:text-slate-500"}
            border 
            rounded-xl sm:rounded-2xl text-xs sm:text-sm md:text-base font-bold
            caret-emerald-500
            focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/40 
            transition-all duration-300 
            py-2.5 sm:py-3 md:py-3.5 
            ${Icon ? (type === "currency" ? "pl-12 sm:pl-14" : "pl-10 sm:pl-12") : "pl-4 sm:pl-6"}
            ${type === "percent" ? "pr-10 sm:pr-12" : "pr-4 sm:pr-6"}`}
          value={displayValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={type === "currency" ? "0" : "0"}
        />
        {type === "percent" && (
          <div className="absolute inset-y-0 right-0 pr-4 sm:pr-5 flex items-center pointer-events-none">
            <span className={`text-xs sm:text-sm font-black ${theme === "tool-light" ? "text-slate-500" : "text-slate-400"}`}>
              %
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputGroup;
