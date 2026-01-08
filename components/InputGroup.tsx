import React, { useState, useEffect } from "react";
import { Tag, History, Building2, FileText, Shield } from "lucide-react";

interface InputGroupProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  icon?: string;
  type?: "currency" | "percent";
  hideLabel?: boolean;
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  value,
  onChange,
  icon,
  type = "currency",
  hideLabel = false,
}) => {
  const [displayValue, setDisplayValue] = useState("");

  // Map icon strings to Lucide components
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "fa-tag":
        return Tag;
      case "fa-history":
        return History;
      case "fa-building-columns":
        return Building2;
      case "fa-file-invoice-dollar":
        return FileText;
      case "fa-shield-halved":
        return Shield;
      default:
        return null;
    }
  };

  const IconComponent = icon ? getIconComponent(icon) : null;

  // When value changes from outside (e.g., initial state), format it correctly for display
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
    // On focus, strip commas to make editing easier
    if (type === "currency") {
      const raw = displayValue.replace(/,/g, "");
      setDisplayValue(raw);
    }
    e.target.select();
  };

  const handleBlur = () => {
    // On blur, re-format with commas
    if (type === "currency" && displayValue !== "") {
      const num = parseFloat(displayValue.replace(/,/g, ""));
      if (!isNaN(num)) {
        setDisplayValue(num.toLocaleString());
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawInput = e.target.value.replace(/[^0-9.]/g, "");
    setDisplayValue(rawInput); // Immediate feedback

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
        <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 px-1">
          {label}
        </label>
      )}
      <div className="relative">
        {IconComponent && (
          <div className="absolute inset-y-0 left-0 w-10 sm:w-12 flex items-center justify-center pointer-events-none z-20">
            <IconComponent className="text-slate-400 dark:text-slate-600 group-focus-within:text-emerald-500 transition-colors duration-300 text-xs sm:text-sm" />
          </div>
        )}
        {type === "currency" && (
          <div className="absolute inset-y-0 left-8 sm:left-10 flex items-center pointer-events-none z-10">
            <span className="text-slate-400 dark:text-slate-700 font-bold text-sm sm:text-base">
              $
            </span>
          </div>
        )}
        <input
          type="text"
          inputMode="decimal"
          className={`block w-full 
            bg-slate-200/50 dark:bg-black/60
            border border-slate-300 dark:border-white/10 
            rounded-2xl text-sm sm:text-base font-bold
            text-slate-900 dark:text-white
            placeholder:text-slate-400 dark:placeholder:text-slate-800
            caret-emerald-500
            focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/40 
            transition-all duration-300 
            py-3 sm:py-3.5 
            ${icon ? (type === "currency" ? "pl-12 sm:pl-14" : "pl-10 sm:pl-12") : "pl-4 sm:pl-6"}
            ${type === "percent" ? "pr-10 sm:pr-12" : "pr-4 sm:pr-6"}`}
          value={displayValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={type === "currency" ? "0" : "0"}
        />
        {type === "percent" && (
          <div className="absolute inset-y-0 right-0 pr-3 sm:pr-5 flex items-center pointer-events-none">
            <span className="text-slate-400 dark:text-slate-500 text-sm font-black">
              %
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputGroup;
