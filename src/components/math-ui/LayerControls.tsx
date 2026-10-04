import React from 'react';
import { DisplayLayers } from '../../types/math';
import { Layers } from 'lucide-react';

interface LayerControlsProps {
  layers: DisplayLayers;
  onChange: (layers: DisplayLayers) => void;
}

export const LayerControls: React.FC<LayerControlsProps> = ({ layers, onChange }) => {
  const toggle = (key: keyof DisplayLayers) => {
    onChange({
      ...layers,
      [key]: !layers[key],
    });
  };

  const layerItems: { key: keyof DisplayLayers; label: string; dotColor: string; desc: string }[] = [
    { key: 'graph', label: 'Đồ thị f(x)', dotColor: 'bg-blue-500 dark:bg-cyan-400', desc: 'Đường cong phân thức hữu tỉ' },
    { key: 'verticalAsymptote', label: 'Tiệm cận đứng', dotColor: 'bg-rose-500', desc: 'Đường thẳng x = -q/p' },
    { key: 'obliqueAsymptote', label: 'Tiệm cận xiên', dotColor: 'bg-sky-500 dark:bg-sky-400', desc: 'Đường thẳng y = mx + n' },
    { key: 'localMax', label: 'Điểm cực đại', dotColor: 'bg-amber-500', desc: 'Đỉnh cực đại địa phương' },
    { key: 'localMin', label: 'Điểm cực tiểu', dotColor: 'bg-indigo-500', desc: 'Đáy cực tiểu địa phương' },
    { key: 'symmetryCenter', label: 'Tâm đối xứng I', dotColor: 'bg-pink-500', desc: 'Giao 2 đường tiệm cận' },
    { key: 'symmetryProbe', label: "Cặp đối xứng P & P'", dotColor: 'bg-yellow-500', desc: "Hai điểm P và P' trên đồ thị đối xứng qua tâm I (I là trung điểm PP')" },
    { key: 'extremaLine', label: 'Đường nối cực trị', dotColor: 'bg-purple-500', desc: 'Đường thẳng y = (2ax+b)/p' },
    { key: 'oxIntercepts', label: 'Giao điểm Ox', dotColor: 'bg-emerald-500', desc: 'Điểm cắt trục hoành (y = 0)' },
    { key: 'oyIntercept', label: 'Giao điểm Oy', dotColor: 'bg-emerald-500', desc: 'Điểm cắt trục tung (x = 0)' },
    { key: 'grid', label: 'Lưới tọa độ', dotColor: 'bg-slate-400', desc: 'Lưới Descartes phân độ' },
    { key: 'coordinates', label: 'Hiển thị tọa độ', dotColor: 'bg-slate-400', desc: 'Tọa độ chuột thời gian thực' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-md space-y-3 transition-colors">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-wider uppercase">
            LỚP HIỂN THỊ TRÊN ĐỒ THỊ
          </h3>
        </div>
        <div className="text-[11px] text-slate-500 dark:text-slate-400">Bật/tắt đối tượng trực quan</div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
        {layerItems.map((item) => {
          const checked = layers[item.key];
          return (
            <label
              key={item.key}
              className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer select-none transition-all ${
                checked
                  ? 'bg-blue-50/60 dark:bg-slate-800/80 border-blue-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold shadow-xs'
                  : 'bg-slate-50/50 dark:bg-slate-950/40 border-slate-200/80 dark:border-slate-800/60 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(item.key)}
                className="w-3.5 h-3.5 rounded bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-blue-600 dark:text-cyan-400 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-blue-600 dark:accent-cyan-400"
              />
              <span className={`w-2 h-2 rounded-full ${item.dotColor} shrink-0`} />
              <span className="truncate" title={item.desc}>
                {item.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
