import { useState, useRef, useCallback, useEffect, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { BookNavigationProvider } from '../context/BookNavigationContext';

// Book flip from spine edge (like the r3f reference): hinge LEFT when going next, hinge RIGHT when prev
const TURN_DURATION = 0.65;
const PAGE_FLIP_EXIT_NEXT = -178;
const PAGE_FLIP_ENTER_NEXT = 178;
const PAGE_FLIP_EXIT_PREV = 178;
const PAGE_FLIP_ENTER_PREV = -178;
const SPINE_LEFT = '0% center';   // spine on left – page folds left when going next
const SPINE_RIGHT = '100% center'; // spine on right – page folds right when going prev

type BookStackProps = {
  pages: ReactNode[];
  className?: string;
  children?: ReactNode;
};

export default function BookStack({ pages, className = '', children }: BookStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTo, setTransitionTo] = useState<'next' | 'prev' | null>(null);
  const currentSlotRef = useRef<HTMLDivElement>(null);
  const transitionSlotRef = useRef<HTMLDivElement>(null);
  const totalPages = pages.length;

  const goToNext = useCallback(() => {
    if (currentIndex >= totalPages - 1 || isTransitioning) return;
    setIsTransitioning(true);
    setTransitionTo('next');
  }, [currentIndex, totalPages, isTransitioning]);

  const goToPrev = useCallback(() => {
    if (currentIndex <= 0 || isTransitioning) return;
    setIsTransitioning(true);
    setTransitionTo('prev');
  }, [currentIndex, isTransitioning]);

  const goToIndex = useCallback((index: number) => {
    if (index < 0 || index >= totalPages || index === currentIndex) return;
    if (isTransitioning) return;
    setCurrentIndex(index);
    if (currentSlotRef.current) gsap.set(currentSlotRef.current, { rotationY: 0 });
  }, [currentIndex, totalPages, isTransitioning]);

  useEffect(() => {
    if (!transitionTo || !currentSlotRef.current || !transitionSlotRef.current) return;

    const currentEl = currentSlotRef.current;
    const transitionEl = transitionSlotRef.current;
    const nextIndex = transitionTo === 'next' ? currentIndex + 1 : currentIndex - 1;
    const isNext = transitionTo === 'next';
    const origin = isNext ? SPINE_LEFT : SPINE_RIGHT;
    const enterFrom = isNext ? PAGE_FLIP_ENTER_NEXT : PAGE_FLIP_ENTER_PREV;
    const exitTo = isNext ? PAGE_FLIP_EXIT_NEXT : PAGE_FLIP_EXIT_PREV;

    gsap.set(currentEl, { transformOrigin: origin });
    gsap.set(transitionEl, { rotationY: enterFrom, transformOrigin: origin });

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(nextIndex);
        setIsTransitioning(false);
        setTransitionTo(null);
        gsap.set(currentEl, { rotationY: 0, transformOrigin: 'center center' });
      },
    });

    tl.to(currentEl, {
      rotationY: exitTo,
      duration: TURN_DURATION,
      ease: 'power2.in',
      transformOrigin: origin,
    }, 0);
    tl.fromTo(
      transitionEl,
      { rotationY: enterFrom, transformOrigin: origin },
      { rotationY: 0, duration: TURN_DURATION, ease: 'power2.out', transformOrigin: origin },
      0
    );
  }, [transitionTo]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 20) goToNext();
      else if (e.deltaY < -20) goToPrev();
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [goToNext, goToPrev]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); goToNext(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); goToPrev(); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goToNext, goToPrev]);

  // Touch/swipe support for mobile
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    const minSwipeDistance = 50; // Minimum distance in pixels to trigger a swipe

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      // Prevent scrolling while swiping
      e.preventDefault();
    };

    const onTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      touchEndX = touch.clientX;
      touchEndY = touch.clientY;

      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      // Determine if it's a horizontal or vertical swipe
      if (absDeltaX > absDeltaY && absDeltaX > minSwipeDistance) {
        // Horizontal swipe: left = next page, right = previous page
        if (deltaX < 0) {
          goToNext();
        } else {
          goToPrev();
        }
      } else if (absDeltaY > absDeltaX && absDeltaY > minSwipeDistance) {
        // Vertical swipe: down = next page, up = previous page
        if (deltaY > 0) {
          goToNext();
        } else {
          goToPrev();
        }
      }
    };

    const container = document.body;
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
    };
  }, [goToNext, goToPrev]);

  return (
    <BookNavigationProvider
      currentIndex={currentIndex}
      totalPages={totalPages}
      goToNext={goToNext}
      goToPrev={goToPrev}
      goToIndex={goToIndex}
    >
      {children}
      <div
        className={`fixed inset-0 flex items-center justify-center overflow-hidden ${className}`}
        style={{ perspective: '1800px', perspectiveOrigin: '50% 50%' }}
      >
        <div
          ref={currentSlotRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformOrigin: 'center center',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            zIndex: 10,
          }}
        >
          {pages[currentIndex]}
        </div>

        {isTransitioning && transitionTo && (
          <div
            ref={transitionSlotRef}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transformOrigin: 'center center',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              zIndex: 5,
            }}
          >
            {transitionTo === 'next' && currentIndex + 1 < totalPages && pages[currentIndex + 1]}
            {transitionTo === 'prev' && currentIndex - 1 >= 0 && pages[currentIndex - 1]}
          </div>
        )}
      </div>
    </BookNavigationProvider>
  );
}
