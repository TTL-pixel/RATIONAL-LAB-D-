import React, { useState } from 'react';
import { FunctionCoefficients } from '../../types/math';
import { MathView } from './MathView';
import { Minus, Plus, RotateCcw, Dices, Bookmark, Sparkles, AlertTriangle } from 'lucide-react';

interface FunctionInputProps {
  coefficients: FunctionCoefficients;
  onChange: (coeffs: FunctionCoefficients) => void;
  isValid: boolean;
  validationError?: string;
}

const PRESETS: { label: string; coeffs: FunctionCoefficients; note: string }[] = [
  {
    label: '(x² + 2x + 3)/(x - 1)',
    coeffs: { a: 1, b: 2, c: 3, p: 1, q: -1 },
    note: 'Chuẩn SGK 12: TCĐ x = 1, TCX y = x + 3, Tâm I(1; 4)',
  },
  {
    label: '(2x² - 3x + 1)/(x + 2)',
    coeffs: { a: 2, b: -3, c: 1, p: 1, q: 2 },
    note: 'TCĐ x = -2, TCX y = 2x - 7, Tâm I(-2; -11)',
  },
  {
    label: '(-x² + 3x - 3)/(x - 1)',
    coeffs: { a: -1, b: 3, c: -3, p: 1, q: -1 },
    note: 'Hệ số âm a = -1: Cực tiểu trước (0; 3), Cực đại sau (2; -1)',
  },
  {
    label: '(x² + x + 2)/(x - 1)',
    coeffs: { a: 1, b: 1, c: 2, p: 1, q: -1 },
    note: '2 cực trị đẹp: A(0; -2) và B(2; 8)',
  },
];

export const FunctionInput: React.FC<FunctionInputProps> = ({
  coefficients,
  onChange,
  isValid,
  validationError,
}) => {
  const [showPresets, setShowPresets] = useState(false);

  const handleUpdate = (key: keyof FunctionCoefficients, value: number) => {
    onChange({
      ...coefficients,
      [key]: value,
    });
  };

  const handleStep = (key: keyof FunctionCoefficients, delta: number) => {
    const current = coefficients[key];
    let next = current + delta;
    if ((key === 'a' || key === 'p') && next === 0) {
      next = delta > 0 ? 1 : -1;
    }
    handleUpdate(key, next);
  };

  const handleReset = () => {
    onChange({ a: 1, b: 2, c: 3, p: 1, q: -1 });
  };

  const handleRandom = () => {
    let newCoeffs: FunctionCoefficients;
    let attempts = 0;
    do {
      attempts++;
      const a = (Math.floor(Math.random() * 4) + 1) * (Math.random() > 0.35 ? 1 : -1);
      const b = Math.floor(Math.random() * 9) - 4;
      const c = Math.floor(Math.random() * 9) - 4;
      const p = (Math.floor(Math.random() * 2) + 1) * (Math.random() > 0.5 ? 1 : -1);
      const q = Math.floor(Math.random() * 7) - 3;
      newCoeffs = { a, b, c, p, q };
    } while (
      (newCoeffs.a * newCoeffs.q * newCoeffs.q - newCoeffs.b * newCoeffs.p * newCoeffs.q + newCoeffs.c * newCoeffs.p * newCoeffs.p === 0 ||
        newCoeffs.p === 0) &&
      attempts < 50
    );

    onChange(newCoeffs);
  };

  const fields: { key: keyof FunctionCoefficients; label: string; desc: string }[] = [
    { key: 'a', label: 'a', desc: 'Hệ số x² ở tử (a ≠ 0)' },
    { key: 'b', label: 'b', desc: 'Hệ số x ở tử' },
    { key: 'c', label: 'c', desc: 'Hệ số tự do ở tử' },
    { key: 'p', label: 'p', desc: 'Hệ số x ở mẫu (p ≠ 0)' },
    { key: 'q', label: 'q', desc: 'Hệ số tự do ở mẫu' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md space-y-5 transition-colors">
      {/* 7. Header and Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-cyan-400"></span>
            THIẾT LẬP HÀM SỐ
          </h2>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Dạng tổng quát chuẩn: <MathView math="y = \frac{ax^2 + bx + c}{px + q}" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPresets(!showPresets)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            Hàm mẫu
          </button>
          <button
            onClick={handleRandom}
            className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-700 dark:text-cyan-300 text-xs font-semibold rounded-xl border border-blue-200 dark:border-blue-900/60 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Dices className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            Ngẫu nhiên
          </button>
          <button
            onClick={handleReset}
            title="Đặt lại hàm chuẩn ban đầu"
            className="p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Presets Drawer */}
      {showPresets && (
        <div className="bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2.5 animate-fadeIn">
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Chọn hàm số mẫu để quan sát ngay hiện tượng hình học:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onChange(p.coeffs);
                  setShowPresets(false);
                }}
                className="text-left p-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-blue-50/50 dark:hover:bg-slate-800/90 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 dark:hover:border-cyan-500/40 transition-all cursor-pointer group shadow-sm"
              >
                <div className="text-xs font-bold text-blue-600 dark:text-cyan-300 group-hover:text-blue-700 dark:group-hover:text-cyan-200">
                  {p.label}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">{p.note}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Warning if invalid */}
      {!isValid && validationError && (
        <div className="p-3.5 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-500/40 rounded-xl text-rose-700 dark:text-rose-200 text-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div className="leading-relaxed">{validationError}</div>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-semibold text-xs transition-colors cursor-pointer shrink-0"
          >
            Khôi phục hàm chuẩn SGK
          </button>
        </div>
      )}

      {/* Coefficients Inputs Grid: a, b, c, p, q */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
        {fields.map(({ key, label, desc }) => {
          const val = coefficients[key];
          const isProhibitedZero = (key === 'a' || key === 'p') && val === 0;

          return (
            <div
              key={key}
              className={`p-3.5 rounded-xl border transition-all ${
                isProhibitedZero
                  ? 'bg-rose-50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-500/60'
                  : 'bg-slate-50/70 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm font-bold text-blue-600 dark:text-cyan-400">
                  Hệ số {label}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate max-w-[90px]" title={desc}>
                  {desc}
                </span>
              </div>

              {/* Number Input & Stepper Buttons */}
              <div className="flex items-center gap-1.5 mb-2.5">
                <button
                  type="button"
                  title="Giảm 1 (không giới hạn)"
                  onClick={() => handleStep(key, -1)}
                  className="w-8 h-8 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600 rounded-lg flex items-center justify-center text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                <input
                  type="number"
                  value={val}
                  step="1"
                  onChange={(e) => {
                    const parsed = parseInt(e.target.value, 10);
                    handleUpdate(key, isNaN(parsed) ? 0 : parsed);
                  }}
                  className="w-full text-center py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-lg font-mono text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 shadow-inner"
                />

                <button
                  type="button"
                  title="Tăng 1 (không giới hạn)"
                  onClick={() => handleStep(key, 1)}
                  className="w-8 h-8 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600 rounded-lg flex items-center justify-center text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Slider with dynamic expanded range */}
              <input
                type="range"
                min={Math.min(-50, val - 25)}
                max={Math.max(50, val + 25)}
                step="1"
                value={val}
                onChange={(e) => handleUpdate(key, parseInt(e.target.value, 10) || 0)}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-cyan-400"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
