import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';
import { useBookNavigation } from '../context/BookNavigationContext';

export default function HeroSection() {
  const quoteRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const { goToNext } = useBookNavigation();

  useLayoutEffect(() => {
    const quote = quoteRef.current;
    const name = nameRef.current;
    const cta = ctaRef.current;
    if (!quote || !name || !cta) return;

    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(quote, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
    const chars = name.querySelectorAll('.char');
    tl.fromTo(chars, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.02, ease: 'power2.out' }, '-=0.3');
    tl.fromTo(cta, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.2');
  }, []);

  const nameChars = 'Hira Binta Usman'.split('').map((char, i) => (
    <span key={i} className="char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
      {char}
    </span>
  ));

  return (
    <section id="hero-section" className="section-pinned paper-texture z-10 min-h-full flex items-center justify-center">
      <div className="relative z-20 flex flex-col items-center justify-center min-h-full w-full px-6 py-12 sm:px-8 md:px-12 md:justify-center md:pt-[22vh] lg:pt-[28vh]">
        <div className="flex flex-col items-center text-center max-w-xl mx-auto">
          <div ref={quoteRef} className="mb-8 md:mb-10">
            <span className="block w-8 h-px bg-[#D8A34A]/60 mx-auto mb-4" aria-hidden />
            <p className="font-handwritten text-xl md:text-2xl lg:text-[1.65rem] text-[#6E6E6E] italic leading-relaxed">
              <span className="text-[#D8A34A]/80 select-none">"</span>
              Every line tells a story, every shadow holds a secret.
              <span className="text-[#D8A34A]/80 select-none">"</span>
            </p>
          </div>
          <h1
            ref={nameRef}
            className="font-handwritten text-[clamp(2.5rem,8vw,4.5rem)] font-bold text-[#2B2B2B] tracking-tight leading-[1.1] mb-3"
          >
            {nameChars}
          </h1>
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#6E6E6E]/90 mb-10 md:mb-12">
            Pencil Artist & Illustrator
          </p>
          <button
            ref={ctaRef}
            onClick={goToNext}
            className="flex flex-col items-center gap-3 group cursor-pointer rounded-full border border-[#6E6E6E]/30 px-6 py-3 hover:border-[#D8A34A]/60 hover:bg-[#D8A34A]/5 transition-all duration-300"
          >
            <span className="font-handwritten text-lg md:text-xl text-[#6E6E6E] group-hover:text-[#D8A34A] transition-colors">
              Open the sketchbook
            </span>
            <ChevronDown className="w-5 h-5 text-[#6E6E6E]/80 group-hover:text-[#D8A34A] group-hover:translate-y-0.5 transition-colors" />
          </button>
        </div>
      </div>
    </section>
  );
}
