import { useRef } from 'react';
import { Coffee, Pencil, Moon } from 'lucide-react';
import BookSpread from '../components/BookSpread';

export default function AboutSection() {
  const spreadRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about-section" className="section-pinned paper-texture z-30 flex items-center justify-center min-h-full">
      <BookSpread
        spreadRef={spreadRef}
        leftContent={
          <>
            <div ref={photoRef} className="relative mb-4 md:mb-0" style={{ maxWidth: '240px' }}>
              <div className="polaroid p-2 md:p-3">
                <img src="/about_photo.jpg" alt="Hira in her studio" className="w-full aspect-[4/3] object-cover grayscale" />
              </div>
            </div>
            <div className="flex md:hidden justify-center gap-4 mt-4">
              <div className="flex items-center gap-1 text-xs text-[#6E6E6E]"><Coffee className="w-3 h-3" /><span className="font-mono text-[10px]">Caffeine</span></div>
              <div className="flex items-center gap-1 text-xs text-[#6E6E6E]"><Pencil className="w-3 h-3" /><span className="font-mono text-[10px]">Graphite</span></div>
              <div className="flex items-center gap-1 text-xs text-[#6E6E6E]"><Moon className="w-3 h-3" /><span className="font-mono text-[10px]">Grayscale</span></div>
            </div>
          </>
        }
        rightContent={
          <>
            <h2 ref={headlineRef} className="font-handwritten text-[clamp(24px,3.5vw,42px)] text-[#2B2B2B] mb-4 md:mb-6">
              About the artist
            </h2>
            <div ref={bodyRef} className="space-y-3 md:space-y-4 max-w-sm">
              <p className="text-[#2B2B2B] leading-relaxed text-sm md:text-base">
                I draw the quiet moments—light on skin, the weight of a gaze, the texture of a place.
              </p>
              <p className="text-[#2B2B2B] leading-relaxed text-sm md:text-base">
                My process starts with observation, then graphite, then refinement. No shortcuts. Every piece is built line by line, mistake by mistake, until it feels true.
              </p>
              <div className="pt-4 md:pt-6">
                <p className="font-handwritten text-xl md:text-2xl text-[#6E6E6E]">Hira</p>
              </div>
            </div>
          </>
        }
      />
    </section>
  );
}
