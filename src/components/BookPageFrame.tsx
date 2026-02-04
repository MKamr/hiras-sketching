import type { RefObject } from 'react';

const PAGE_WIDTH = 'clamp(300px, 85vw, 1200px)';
const PAGE_HEIGHT = 'clamp(450px, 70vh, 750px)';

type BookPageFrameProps = {
  pageRef: RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
  /** Optional: dark inner (e.g. theater) */
  variant?: 'paper' | 'dark';
};

export default function BookPageFrame({ pageRef, children, variant = 'paper' }: BookPageFrameProps) {
  return (
    <div
      className="relative mx-4 flex justify-center"
      style={{ perspective: '1400px', perspectiveOrigin: '50% 50%' }}
    >
      <div
        ref={pageRef}
        className="book-page-3d relative"
        style={{
          width: PAGE_WIDTH,
          height: PAGE_HEIGHT,
          transformStyle: 'preserve-3d',
          transformOrigin: 'left center',
        }}
      >
        {/* Back face (visible when page turns past 90°) */}
        <div
          className="book-page-back absolute inset-0 rounded-r-lg"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            background: variant === 'dark'
              ? 'linear-gradient(145deg, #0d0d0d 0%, #1a1a1a 100%)'
              : 'linear-gradient(145deg, #E8E4DC 0%, #F0EDE6 100%)',
            boxShadow: 'inset 2px 0 12px rgba(0,0,0,0.08)',
          }}
        />
        <div
          className={`book-page-inner relative h-full w-full overflow-hidden rounded-r-lg ${
            variant === 'dark' ? 'book-page-inner-dark' : 'book-page-inner-paper'
          }`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Spine edge (left) */}
          <div
            className="absolute left-0 top-0 bottom-0 w-3 md:w-4 rounded-l"
            style={{
              background:
                variant === 'dark'
                  ? 'linear-gradient(90deg, #0a0a0a 0%, #1a1a1a 60%, transparent 100%)'
                  : 'linear-gradient(90deg, #1A1612 0%, #2A221C 60%, transparent 100%)',
              boxShadow: 'inset -2px 0 8px rgba(0,0,0,0.3)',
            }}
          />
          <div className="relative h-full w-full pl-6 md:pl-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

export { PAGE_WIDTH, PAGE_HEIGHT };
