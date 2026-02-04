import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { useBookNavigation } from '../context/BookNavigationContext';

export default function CoverSection() {
  const bookRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const { goToNext } = useBookNavigation();

  useLayoutEffect(() => {
    const book = bookRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const btn = btnRef.current;
    if (!book || !title || !btn) return;

    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(book, { rotationY: -38, opacity: 0.75, transformOrigin: 'left center' }, { rotationY: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0);
    tl.fromTo(title, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.2);
    if (subtitle) tl.fromTo(subtitle, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.35);
    tl.fromTo(btn, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }, 0.45);
  }, []);

  return (
    <section id="cover-section" className="section-pinned paper-texture z-20 flex items-center justify-center min-h-full">
      <div className="relative mx-4 flex justify-center" style={{ perspective: '1400px', perspectiveOrigin: '50% 50%' }}>
        <div
          ref={bookRef}
          className="book-cover-3d"
          style={{
            width: 'clamp(300px, 80vw, 920px)',
            height: 'clamp(380px, 65vh, 620px)',
            transformStyle: 'preserve-3d',
            transformOrigin: 'left center',
          }}
        >
          {/* Cover surface: refined leather/sketchbook with depth */}
          <div
            className="relative h-full w-full rounded-r-xl overflow-hidden"
            style={{
              background: `
                linear-gradient(160deg, #4C4138 0%, #3D332B 22%, #322A24 48%, #28221C 100%),
                radial-gradient(ellipse 100% 60% at 70% 40%, rgba(180, 160, 140, 0.06) 0%, transparent 55%),
                linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.12) 100%)
              `,
              boxShadow:
                '0 32px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.12), -8px 0 24px rgba(0,0,0,0.3), inset 2px 0 0 rgba(255,255,255,0.05)',
            }}
          >
            {/* Engraved sketch – looks pressed into the cover */}
            <div
              className="absolute inset-0 rounded-r-xl pointer-events-none"
              style={{
                backgroundImage: 'url(/hero_sketch_transparent.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 0.18,
                mixBlendMode: 'multiply',
                filter: 'grayscale(1) contrast(1.15) brightness(0.85)',
              }}
              aria-hidden
            />
            {/* Second pass: subtle inner shadow so engraving feels recessed */}
            <div
              className="absolute inset-0 rounded-r-xl pointer-events-none"
              style={{
                backgroundImage: 'url(/hero_sketch_transparent.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 0.06,
                mixBlendMode: 'darken',
                filter: 'grayscale(1) contrast(1.4)',
              }}
              aria-hidden
            />

            {/* Spine */}
            <div
              className="absolute left-0 top-0 bottom-0 w-4 md:w-5 rounded-l z-10"
              style={{
                background: 'linear-gradient(90deg, #1A1510 0%, #252019 40%, #2A221C 100%)',
                boxShadow: 'inset -3px 0 12px rgba(0,0,0,0.5), 2px 0 0 rgba(255,255,255,0.03)',
              }}
            />

            {/* Debossed frame */}
            <div
              className="absolute inset-6 md:inset-10 rounded-r-lg z-10"
              style={{
                border: '1px solid rgba(139, 119, 99, 0.2)',
                boxShadow: 'inset 0 3px 16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)',
              }}
            />

            {/* Content – elevated above engraving */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pl-10 md:pl-14 z-20">
              <h2
                ref={titleRef}
                className="font-handwritten text-[clamp(34px, 8vw, 62px)] font-bold text-center leading-[1.05] tracking-tight"
                style={{
                  color: '#E2D4C4',
                  textShadow: '0 2px 12px rgba(0,0,0,0.6), 0 0 2px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.04)',
                  letterSpacing: '-0.03em',
                }}
              >
                Hira Binta Usman
              </h2>

              <p
                ref={subtitleRef}
                className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] mt-4 md:mt-5 text-[#A89888]"
                style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
              >
                Sketchbook
              </p>

              <div
                className="w-20 md:w-28 h-px my-6 md:my-8"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(168, 152, 136, 0.7), transparent)',
                  boxShadow: '0 1px 0 rgba(0,0,0,0.25)',
                }}
              />

              <p
                className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.22em] text-[#8A7D70] mb-6 md:mb-8"
              >
                Drawings & process
              </p>

              <button
                ref={btnRef}
                onClick={goToNext}
                className="group relative px-11 md:px-14 py-3.5 md:py-4 font-handwritten text-lg md:text-xl rounded-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  color: '#E2D4C4',
                  background: 'linear-gradient(180deg, rgba(139, 119, 99, 0.4) 0%, rgba(70, 58, 48, 0.5) 100%)',
                  border: '1px solid rgba(154, 139, 120, 0.45)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 6px 20px rgba(0,0,0,0.25)',
                }}
              >
                <span className="relative z-10 group-hover:text-[#F0E6D8] transition-colors">Open</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
