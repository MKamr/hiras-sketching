import { useRef, useState } from 'react';
import BookSpread from '../components/BookSpread';

const pencils = [
  { grade: 'HB', use: 'Light sketching & outlines' },
  { grade: '2B', use: 'General shading & mid-tones' },
  { grade: '4B', use: 'Deep shadows & dark areas' },
  { grade: '6B', use: 'Rich blacks & contrast' },
  { grade: '8B', use: 'Velvet blacks & blends' },
];

export default function ToolsSection() {
  const spreadRef = useRef<HTMLDivElement>(null);
  const pencilsRef = useRef<HTMLDivElement>(null);
  const [activePencil, setActivePencil] = useState<string | null>(null);

  return (
    <section id="tools-section" className="section-pinned paper-texture z-40 flex items-center justify-center min-h-full">
      <BookSpread
        spreadRef={spreadRef}
        leftContent={
          <>
            <h2 className="font-handwritten text-[clamp(24px,3.5vw,42px)] text-[#2B2B2B] mb-3 md:mb-4">My Tools</h2>
            <p className="text-[#6E6E6E] leading-relaxed max-w-sm mb-6 md:mb-8 text-sm md:text-base">
              Each grade has a job. I switch often, build tone slowly, and erase a lot.
            </p>
            <div className="relative max-w-xs">
              <img src="/pencil_set.jpg" alt="Pencil set" className="w-full rounded-lg shadow-lg" />
            </div>
          </>
        }
        rightContent={
          <div ref={pencilsRef} className="space-y-3 md:space-y-4 justify-center flex flex-col">
            {pencils.map((pencil) => (
              <div
                key={pencil.grade}
                className="pencil-item group cursor-pointer"
                onMouseEnter={() => setActivePencil(pencil.grade)}
                onMouseLeave={() => setActivePencil(null)}
                onClick={() => setActivePencil(activePencil === pencil.grade ? null : pencil.grade)}
              >
                <div
                  className="flex items-center gap-3 md:gap-4 p-2 md:p-3 rounded-lg transition-all duration-300"
                  style={{
                    background: activePencil === pencil.grade ? 'rgba(216, 163, 74, 0.1)' : 'transparent',
                    transform: activePencil === pencil.grade ? 'translateX(-6px)' : 'translateX(0)',
                  }}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#2B2B2B] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-mono text-xs md:text-sm font-bold">{pencil.grade}</span>
                  </div>
                  <div className="flex-1 transition-all duration-300" style={{ opacity: activePencil === pencil.grade ? 1 : 0.7 }}>
                    <p className="text-sm md:text-base text-[#6E6E6E]">{pencil.use}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      />
    </section>
  );
}
