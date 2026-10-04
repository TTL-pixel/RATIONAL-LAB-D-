import React from 'react';
import { RationalAnalysisResult } from '../../types/math';
import { MathView } from './MathView';
import { Table, Sparkles } from 'lucide-react';

interface VariationTableProps {
  analysis: RationalAnalysisResult;
}

export const VariationTable: React.FC<VariationTableProps> = ({ analysis }) => {
  if (!analysis.isValid) {
    return (
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-center text-slate-500 dark:text-slate-400 text-sm shadow-sm">
        Vui lòng thiết lập hàm số hợp lệ để hiển thị bảng biến thiên.
      </div>
    );
  }

  const { derivative, extrema, hasExtrema, limits, excludedPointExact } = analysis;
  const A = derivative.A;
  const isAPositive = A > 0;

  // Render Table based on whether there are 2 extrema or no extrema
  if (hasExtrema && extrema.length >= 2) {
    const r1 = extrema[0];
    const r2 = extrema[1];

    const sign1 = isAPositive ? '+' : '-';
    const sign4 = isAPositive ? '+' : '-';

    return (
      <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md space-y-4 transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <Table className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              BẢNG BIẾN THIÊN
            </h3>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {isAPositive ? 'Hệ số A > 0 (Cực đại trước, cực tiểu sau)' : 'Hệ số A < 0 (Cực tiểu trước, cực đại sau)'}
          </div>
        </div>

        <div className="overflow-x-auto pb-1">
          <div className="min-w-[700px] bg-slate-50/50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-700/80 rounded-xl overflow-hidden">
            {/* Header Row: x */}
            <div className="grid grid-cols-12 border-b border-slate-200 dark:border-slate-700 text-center text-sm font-serif">
              <div className="col-span-2 py-2 px-3 border-r border-slate-200 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-900/90 font-sans font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center">
                x
              </div>
              <div className="col-span-2 py-2 px-1 text-slate-500 dark:text-slate-400 flex items-center justify-center">
                <MathView math="-\infty" />
              </div>
              <div className="col-span-2 py-2 px-1 font-bold text-blue-600 dark:text-cyan-300 flex items-center justify-center">
                <MathView math={r1.xExact} />
              </div>
              <div className="col-span-2 py-2 px-1 font-bold text-rose-500 dark:text-rose-400 border-x-2 border-double border-rose-400/80 dark:border-rose-500/80 bg-rose-500/5 flex items-center justify-center">
                <MathView math={excludedPointExact} />
              </div>
              <div className="col-span-2 py-2 px-1 font-bold text-blue-600 dark:text-cyan-300 flex items-center justify-center">
                <MathView math={r2.xExact} />
              </div>
              <div className="col-span-2 py-2 px-1 text-slate-500 dark:text-slate-400 flex items-center justify-center">
                <MathView math="+\infty" />
              </div>
            </div>

            {/* Row 2: y' */}
            <div className="grid grid-cols-12 border-b border-slate-200 dark:border-slate-700 text-center text-sm font-serif items-center">
              <div className="col-span-2 py-2 px-3 border-r border-slate-200 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-900/90 font-sans font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center">
                y'
              </div>
              <div className={`col-span-2 py-2 font-bold text-base ${isAPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {sign1}
              </div>
              <div className="col-span-2 py-2 font-bold text-slate-600 dark:text-slate-400 flex items-center justify-center">
                0
              </div>
              <div className="col-span-2 py-2 font-mono font-bold text-rose-500 dark:text-rose-400 border-x-2 border-double border-rose-400/80 dark:border-rose-500/80 bg-rose-500/5 flex items-center justify-center tracking-widest">
                ||
              </div>
              <div className="col-span-2 py-2 font-bold text-slate-600 dark:text-slate-400 flex items-center justify-center">
                0
              </div>
              <div className={`col-span-2 py-2 font-bold text-base ${isAPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {sign4}
              </div>
            </div>

            {/* Row 3: y - SVG Variation Canvas */}
            <div className="flex border-b border-slate-200 dark:border-slate-700">
              <div className="w-[16.666%] shrink-0 border-r border-slate-200 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-900/90 font-sans font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center">
                y
              </div>
              <div className="w-[83.334%] relative bg-white/50 dark:bg-slate-950/40">
                <svg viewBox="0 0 600 140" className="w-full h-36 select-none font-serif">
                  <defs>
                    <marker
                      id="arrow-green"
                      viewBox="0 0 10 10"
                      refX="6"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1 L 9 5 L 0 9 z" fill="#10b981" />
                    </marker>
                    <marker
                      id="arrow-red"
                      viewBox="0 0 10 10"
                      refX="6"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1 L 9 5 L 0 9 z" fill="#f43f5e" />
                    </marker>
                  </defs>

                  {/* Double vertical line at x = 300 (asymptote) */}
                  <line x1="298" y1="0" x2="298" y2="140" stroke="#f43f5e" strokeWidth="1.5" strokeOpacity="0.8" />
                  <line x1="302" y1="0" x2="302" y2="140" stroke="#f43f5e" strokeWidth="1.5" strokeOpacity="0.8" />

                  {isAPositive ? (
                    <>
                      {/* Left Branch: A > 0 */}
                      <text x="35" y="125" fill="#64748b" className="dark:fill-slate-400" fontSize="13" textAnchor="middle">
                        -∞
                      </text>
                      <line
                        x1="55"
                        y1="115"
                        x2="130"
                        y2="42"
                        stroke="#10b981"
                        strokeWidth="2.2"
                        markerEnd="url(#arrow-green)"
                      />

                      {/* Local Maximum at x = 150 */}
                      <g>
                        <rect x="105" y="10" width="90" height="25" rx="6" className="fill-white dark:fill-slate-900 stroke-amber-500" strokeWidth="1.4" />
                        <text x="150" y="22" fill="#d97706" className="dark:fill-amber-400" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                          CĐ: y₁
                        </text>
                        <text x="150" y="32" fill="#b45309" className="dark:fill-amber-300" fontSize="9.5" textAnchor="middle" fontFamily="monospace">
                          {r1.yExact.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/, '$1/$2')}
                        </text>
                      </g>

                      {/* From max down to -inf at asymptote left */}
                      <line
                        x1="170"
                        y1="42"
                        x2="250"
                        y2="115"
                        stroke="#f43f5e"
                        strokeWidth="2.2"
                        markerEnd="url(#arrow-red)"
                      />
                      <text x="275" y="125" fill="#f43f5e" fontSize="13" textAnchor="middle">
                        -∞
                      </text>

                      {/* Right Branch: A > 0 */}
                      <text x="325" y="24" fill="#f43f5e" fontSize="13" textAnchor="middle">
                        +∞
                      </text>
                      <line
                        x1="345"
                        y1="32"
                        x2="425"
                        y2="105"
                        stroke="#f43f5e"
                        strokeWidth="2.2"
                        markerEnd="url(#arrow-red)"
                      />

                      {/* Local Minimum at x = 450 */}
                      <g>
                        <rect x="405" y="105" width="90" height="25" rx="6" className="fill-white dark:fill-slate-900 stroke-indigo-500" strokeWidth="1.4" />
                        <text x="450" y="117" fill="#4f46e5" className="dark:fill-indigo-300" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                          CT: y₂
                        </text>
                        <text x="450" y="127" fill="#4338ca" className="dark:fill-indigo-200" fontSize="9.5" textAnchor="middle" fontFamily="monospace">
                          {r2.yExact.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/, '$1/$2')}
                        </text>
                      </g>

                      {/* From min up to +inf */}
                      <line
                        x1="470"
                        y1="105"
                        x2="545"
                        y2="32"
                        stroke="#10b981"
                        strokeWidth="2.2"
                        markerEnd="url(#arrow-green)"
                      />
                      <text x="565" y="24" fill="#64748b" className="dark:fill-slate-400" fontSize="13" textAnchor="middle">
                        +∞
                      </text>
                    </>
                  ) : (
                    <>
                      {/* Left Branch: A < 0 */}
                      <text x="35" y="24" fill="#64748b" className="dark:fill-slate-400" fontSize="13" textAnchor="middle">
                        +∞
                      </text>
                      <line
                        x1="55"
                        y1="32"
                        x2="130"
                        y2="105"
                        stroke="#f43f5e"
                        strokeWidth="2.2"
                        markerEnd="url(#arrow-red)"
                      />

                      {/* Local Minimum at x = 150 */}
                      <g>
                        <rect x="105" y="105" width="90" height="25" rx="6" className="fill-white dark:fill-slate-900 stroke-indigo-500" strokeWidth="1.4" />
                        <text x="150" y="117" fill="#4f46e5" className="dark:fill-indigo-300" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                          CT: y₁
                        </text>
                        <text x="150" y="127" fill="#4338ca" className="dark:fill-indigo-200" fontSize="9.5" textAnchor="middle" fontFamily="monospace">
                          {r1.yExact.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/, '$1/$2')}
                        </text>
                      </g>

                      {/* From min up to +inf at asymptote left */}
                      <line
                        x1="170"
                        y1="105"
                        x2="250"
                        y2="32"
                        stroke="#10b981"
                        strokeWidth="2.2"
                        markerEnd="url(#arrow-green)"
                      />
                      <text x="275" y="24" fill="#f43f5e" fontSize="13" textAnchor="middle">
                        +∞
                      </text>

                      {/* Right Branch: A < 0 */}
                      <text x="325" y="125" fill="#f43f5e" fontSize="13" textAnchor="middle">
                        -∞
                      </text>
                      <line
                        x1="345"
                        y1="115"
                        x2="425"
                        y2="42"
                        stroke="#10b981"
                        strokeWidth="2.2"
                        markerEnd="url(#arrow-green)"
                      />

                      {/* Local Maximum at x = 450 */}
                      <g>
                        <rect x="405" y="10" width="90" height="25" rx="6" className="fill-white dark:fill-slate-900 stroke-amber-500" strokeWidth="1.4" />
                        <text x="450" y="22" fill="#d97706" className="dark:fill-amber-400" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                          CĐ: y₂
                        </text>
                        <text x="450" y="32" fill="#b45309" className="dark:fill-amber-300" fontSize="9.5" textAnchor="middle" fontFamily="monospace">
                          {r2.yExact.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/, '$1/$2')}
                        </text>
                      </g>

                      {/* From max down to -inf */}
                      <line
                        x1="470"
                        y1="42"
                        x2="545"
                        y2="115"
                        stroke="#f43f5e"
                        strokeWidth="2.2"
                        markerEnd="url(#arrow-red)"
                      />
                      <text x="565" y="125" fill="#64748b" className="dark:fill-slate-400" fontSize="13" textAnchor="middle">
                        -∞
                      </text>
                    </>
                  )}
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Extrema Summary Cards underneath the table */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
          <div className="p-3.5 bg-amber-50/50 dark:bg-slate-950/80 rounded-xl border border-amber-200 dark:border-slate-800 flex items-center justify-between shadow-xs">
            <div>
              <div className="font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-0.5">
                {isAPositive ? 'Điểm Cực Đại' : 'Điểm Cực Tiểu'} (x₁)
              </div>
              <div className="text-slate-800 dark:text-slate-200 font-mono">
                <MathView math={`x_1 = ${r1.xExact}`} />
              </div>
            </div>
            <div className="text-right">
              <div className="text-slate-500 dark:text-slate-400 text-[11px] mb-0.5">Giá trị cực trị</div>
              <div className="text-slate-900 dark:text-white font-mono font-semibold">
                <MathView math={`y_1 = ${r1.yExact}`} />
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-indigo-50/50 dark:bg-slate-950/80 rounded-xl border border-indigo-200 dark:border-slate-800 flex items-center justify-between shadow-xs">
            <div>
              <div className="font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider mb-0.5">
                {isAPositive ? 'Điểm Cực Tiểu' : 'Điểm Cực Đại'} (x₂)
              </div>
              <div className="text-slate-800 dark:text-slate-200 font-mono">
                <MathView math={`x_2 = ${r2.xExact}`} />
              </div>
            </div>
            <div className="text-right">
              <div className="text-slate-500 dark:text-slate-400 text-[11px] mb-0.5">Giá trị cực trị</div>
              <div className="text-slate-900 dark:text-white font-mono font-semibold">
                <MathView math={`y_2 = ${r2.yExact}`} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
          <div>
            <span className="text-rose-500 dark:text-rose-400 font-bold font-mono">|| :</span> Điểm gián đoạn (tiệm cận đứng <MathView math={`x = ${excludedPointExact}`} />)
          </div>
          <div>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">↗ :</span> Đồng biến &nbsp;·&nbsp; <span className="text-rose-600 dark:text-rose-400 font-bold">↘ :</span> Nghịch biến
          </div>
        </div>
      </div>
    );
  }

  // Case with NO EXTREMA (Delta <= 0)
  const isIncreasing = A > 0;
  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md space-y-4 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Table className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            BẢNG BIẾN THIÊN (Δ ≤ 0 · KHÔNG CÓ CỰC TRỊ)
          </h3>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          {isIncreasing ? 'Đạo hàm luôn dương y\' > 0' : 'Đạo hàm luôn âm y\' < 0'}
        </div>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="min-w-[600px] bg-slate-50/50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-700/80 rounded-xl overflow-hidden">
          {/* Row 1: x */}
          <div className="grid grid-cols-12 border-b border-slate-200 dark:border-slate-700 text-center text-sm font-serif">
            <div className="col-span-3 py-2 px-3 border-r border-slate-200 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-900/90 font-sans font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center">
              x
            </div>
            <div className="col-span-3 py-2 px-2 text-slate-500 dark:text-slate-400 flex items-center justify-center">
              <MathView math="-\infty" />
            </div>
            <div className="col-span-3 py-2 px-2 font-bold text-rose-500 dark:text-rose-400 border-x-2 border-double border-rose-400/80 dark:border-rose-500/80 bg-rose-500/5 flex items-center justify-center">
              <MathView math={excludedPointExact} />
            </div>
            <div className="col-span-3 py-2 px-2 text-slate-500 dark:text-slate-400 flex items-center justify-center">
              <MathView math="+\infty" />
            </div>
          </div>

          {/* Row 2: y' */}
          <div className="grid grid-cols-12 border-b border-slate-200 dark:border-slate-700 text-center text-sm font-serif items-center">
            <div className="col-span-3 py-2 px-3 border-r border-slate-200 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-900/90 font-sans font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center">
              y'
            </div>
            <div className={`col-span-3 py-2 font-bold text-base ${isIncreasing ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {isIncreasing ? '+' : '-'}
            </div>
            <div className="col-span-3 py-2 font-mono font-bold text-rose-500 dark:text-rose-400 border-x-2 border-double border-rose-400/80 dark:border-rose-500/80 bg-rose-500/5 flex items-center justify-center tracking-widest">
              ||
            </div>
            <div className={`col-span-3 py-2 font-bold text-base ${isIncreasing ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {isIncreasing ? '+' : '-'}
            </div>
          </div>

          {/* Row 3: y */}
          <div className="flex border-b border-slate-200 dark:border-slate-700">
            <div className="w-[25%] shrink-0 border-r border-slate-200 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-900/90 font-sans font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center">
              y
            </div>
            <div className="w-[75%] relative bg-white/50 dark:bg-slate-950/40">
              <svg viewBox="0 0 500 130" className="w-full h-32 select-none font-serif">
                <defs>
                  <marker
                    id="arrow-green-noext"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 9 5 L 0 9 z" fill="#10b981" />
                  </marker>
                  <marker
                    id="arrow-red-noext"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 9 5 L 0 9 z" fill="#f43f5e" />
                  </marker>
                </defs>

                {/* Double vertical line at x = 250 */}
                <line x1="248" y1="0" x2="248" y2="130" stroke="#f43f5e" strokeWidth="1.5" strokeOpacity="0.8" />
                <line x1="252" y1="0" x2="252" y2="130" stroke="#f43f5e" strokeWidth="1.5" strokeOpacity="0.8" />

                {isIncreasing ? (
                  <>
                    {/* Left Branch: -inf -> +inf */}
                    <text x="35" y="115" fill="#64748b" className="dark:fill-slate-400" fontSize="13" textAnchor="middle">-∞</text>
                    <line
                      x1="55"
                      y1="105"
                      x2="205"
                      y2="30"
                      stroke="#10b981"
                      strokeWidth="2.2"
                      markerEnd="url(#arrow-green-noext)"
                    />
                    <text x="225" y="24" fill="#f43f5e" fontSize="13" textAnchor="middle">+∞</text>

                    {/* Right Branch: -inf -> +inf */}
                    <text x="275" y="115" fill="#f43f5e" fontSize="13" textAnchor="middle">-∞</text>
                    <line
                      x1="295"
                      y1="105"
                      x2="445"
                      y2="30"
                      stroke="#10b981"
                      strokeWidth="2.2"
                      markerEnd="url(#arrow-green-noext)"
                    />
                    <text x="465" y="24" fill="#64748b" className="dark:fill-slate-400" fontSize="13" textAnchor="middle">+∞</text>
                  </>
                ) : (
                  <>
                    {/* Left Branch: +inf -> -inf */}
                    <text x="35" y="24" fill="#64748b" className="dark:fill-slate-400" fontSize="13" textAnchor="middle">+∞</text>
                    <line
                      x1="55"
                      y1="32"
                      x2="205"
                      y2="105"
                      stroke="#f43f5e"
                      strokeWidth="2.2"
                      markerEnd="url(#arrow-red-noext)"
                    />
                    <text x="225" y="115" fill="#f43f5e" fontSize="13" textAnchor="middle">-∞</text>

                    {/* Right Branch: +inf -> -inf */}
                    <text x="275" y="24" fill="#f43f5e" fontSize="13" textAnchor="middle">+∞</text>
                    <line
                      x1="295"
                      y1="32"
                      x2="445"
                      y2="105"
                      stroke="#f43f5e"
                      strokeWidth="2.2"
                      markerEnd="url(#arrow-red-noext)"
                    />
                    <text x="465" y="115" fill="#64748b" className="dark:fill-slate-400" fontSize="13" textAnchor="middle">-∞</text>
                  </>
                )}
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3.5 bg-slate-50 dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        Phương trình <MathView math="y' = 0" /> vô nghiệm hoặc có nghiệm kép (<MathView math="\Delta \le 0" />). Đạo hàm giữ nguyên một dấu trên từng khoảng xác định. Hàm số không có điểm cực trị.
      </div>
    </div>
  );
};
