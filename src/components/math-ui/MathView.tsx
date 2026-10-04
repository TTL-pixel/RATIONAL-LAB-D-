import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ math, block = false, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        output: 'htmlAndMathml',
      });
    } catch (err) {
      console.error('KaTeX error:', err);
      const escaped = math.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<span class="text-amber-300 font-mono text-xs">${escaped}</span>`;
    }
  }, [math, block]);

  if (block) {
    return (
      <div 
        className={`overflow-x-auto py-1.5 my-1 text-center font-serif text-slate-100 ${className}`} 
        dangerouslySetInnerHTML={{ __html: html }} 
      />
    );
  }

  return (
    <span 
      className={`inline-block px-0.5 font-serif text-slate-100 ${className}`} 
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
};
