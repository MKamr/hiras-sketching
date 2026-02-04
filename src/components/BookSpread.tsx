import type { RefObject } from 'react';

const SPREAD_WIDTH = 'clamp(320px, 90vw, 1280px)';
const SPREAD_HEIGHT = 'clamp(420px, 65vh, 700px)';

type BookSpreadProps = {
  spreadRef: RefObject<HTMLDivElement | null>;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  variant?: 'paper' | 'dark';
  /** When true, show one full-viewport page (left + right content combined) instead of a two-page spread */
  singlePage?: boolean;
};

export default function BookSpread({ spreadRef, leftContent, rightContent, variant = 'paper', singlePage = true }: BookSpreadProps) {
  const isDark = variant === 'dark';
  const pageClass = isDark ? 'book-page-inner-dark' : 'book-page-inner-paper';
  const spineBg = isDark
    ? 'linear-gradient(90deg, transparent, #1a1a1a 20%, #0a0a0a 50%, #1a1a1a 80%, transparent)'
    : 'linear-gradient(90deg, transparent, #2A221C 15%, #1A1612 50%, #2A221C 85%, transparent)';

  if (singlePage) {
    return (
      <div ref={spreadRef} className="w-full min-h-full flex items-center justify-center">
        <div className="mx-4 flex items-stretch max-w-4xl w-full rounded-r-lg overflow-hidden" style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.12)' }}>
          {/* Left: book spine / binding */}
          <div
            className="flex-shrink-0 w-3 md:w-5 rounded-l-lg"
            style={{
              minHeight: 'clamp(360px, 70vh, 640px)',
              background: isDark
                ? 'linear-gradient(90deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)'
                : 'linear-gradient(90deg, #1A1612 0%, #2A221C 35%, #252019 50%, #2A221C 65%, #1A1612 100%)',
              boxShadow: 'inset -2px 0 10px rgba(0,0,0,0.25), 2px 0 0 rgba(255,255,255,0.04)',
            }}
          />
          {/* Right: content panel with border */}
          <div
            className={`single-page-view flex flex-col md:flex-row md:gap-10 lg:gap-16 items-center justify-center flex-1 py-10 md:py-14 pl-6 md:pl-10 pr-5 md:pr-10 ${pageClass}`}
            style={{
              minHeight: 'clamp(360px, 70vh, 640px)',
              border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.12)',
              borderLeft: 'none',
              borderTopRightRadius: '8px',
              borderBottomRightRadius: '8px',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
            }}
          >
            <div className="flex-shrink-0 flex flex-col items-center md:items-start justify-center mb-6 md:mb-0 md:max-w-[45%]">
              {leftContent}
            </div>
            <div className="flex-1 flex flex-col justify-center w-full max-w-md">
              {rightContent}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative mx-4 flex justify-center"
      style={{ perspective: '1800px', perspectiveOrigin: '50% 50%' }}
    >
      <div
        ref={spreadRef}
        className="book-spread-3d relative flex"
        style={{
          width: SPREAD_WIDTH,
          height: SPREAD_HEIGHT,
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
          boxShadow: '0 24px 60px rgba(0,0,0,0.15)',
        }}
      >
        {/* Back of spread (visible when spread turns past 90°) */}
        <div
          className="book-spread-back absolute inset-0 rounded-lg"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            background: isDark
              ? 'linear-gradient(90deg, #0d0d0d 0%, #111 50%, #0d0d0d 100%)'
              : 'linear-gradient(90deg, #E8E4DC 0%, #E0DCD4 50%, #E8E4DC 100%)',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
          }}
        />
        {/* Left page (spine on right edge) */}
        <div
          className={`book-spread-page book-spread-left relative flex-[1_1_50%] overflow-hidden ${pageClass}`}
          style={{
            transformOrigin: 'right center',
            transform: 'rotateY(-4deg)',
            borderRight: 'none',
            borderTopLeftRadius: '6px',
            borderBottomLeftRadius: '6px',
          }}
        >
          <div className="relative h-full w-full p-5 md:p-8 flex flex-col justify-center">{leftContent}</div>
          {/* Inner spine edge (right side of left page) */}
          <div
            className="absolute right-0 top-0 bottom-0 w-2 md:w-3"
            style={{
              background: spineBg,
              boxShadow: 'inset -2px 0 6px rgba(0,0,0,0.2)',
            }}
          />
        </div>

        {/* Center spine */}
        <div
          className="book-spread-spine flex-shrink-0 w-2 md:w-4"
          style={{
            background: isDark
              ? 'linear-gradient(180deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)'
              : 'linear-gradient(180deg, #1A1612 0%, #2A221C 50%, #1A1612 100%)',
            boxShadow: 'inset 0 0 12px rgba(0,0,0,0.3)',
          }}
        />

        {/* Right page (spine on left edge) */}
        <div
          className={`book-spread-page book-spread-right relative flex-[1_1_50%] overflow-hidden ${pageClass}`}
          style={{
            transformOrigin: 'left center',
            transform: 'rotateY(4deg)',
            borderLeft: 'none',
            borderTopRightRadius: '6px',
            borderBottomRightRadius: '6px',
          }}
        >
          {/* Inner spine edge (left side of right page) */}
          <div
            className="absolute left-0 top-0 bottom-0 w-2 md:w-3"
            style={{
              background: spineBg,
              boxShadow: 'inset 2px 0 6px rgba(0,0,0,0.2)',
            }}
          />
          <div className="relative h-full w-full p-5 md:p-8 pl-6 md:pl-10 flex flex-col justify-center">{rightContent}</div>
        </div>
      </div>
    </div>
  );
}

export { SPREAD_WIDTH, SPREAD_HEIGHT };
