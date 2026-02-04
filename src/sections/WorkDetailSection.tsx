import { useRef } from 'react';
import { Clock, Quote } from 'lucide-react';
import BookSpread from '../components/BookSpread';

const processSteps = [
  { image: '/process_sketch_01.jpg', label: 'Gesture' },
  { image: '/process_sketch_02.jpg', label: 'Blocking' },
  { image: '/process_sketch_03.jpg', label: 'Refining' },
];

export default function WorkDetailSection() {
  const spreadRef = useRef<HTMLDivElement>(null);
  const artworkRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  return (
    <section id="work-detail-section" className="section-pinned paper-texture z-[60] flex items-center justify-center min-h-full">
      <BookSpread
        spreadRef={spreadRef}
        leftContent={
          <div className="flex items-center justify-center">
            <div ref={artworkRef} className="relative w-full max-w-xs">
              <div className="polaroid p-2 md:p-3 pb-6 md:pb-10 transform -rotate-1">
                <img src="/work_thumb_01.jpg" alt="Featured artwork" className="w-full aspect-[4/3] object-cover" />
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 md:w-20 h-5 md:h-7 bg-[rgba(255,215,0,0.25)] transform -rotate-2" />
            </div>
          </div>
        }
        rightContent={
          <>
            <h2 className="font-handwritten text-[clamp(22px,3vw,38px)] text-[#2B2B2B] mb-4 md:mb-6">The Story Behind It</h2>
            <div ref={timelineRef} className="flex gap-2 md:gap-3 mb-4 md:mb-6">
              {processSteps.map((step) => (
                <div key={step.label} className="timeline-item flex-1">
                  <div className="relative">
                    <img src={step.image} alt={step.label} className="w-full aspect-video object-cover rounded border border-[#ddd]" />
                    <span className="absolute bottom-1 right-1 text-[9px] md:text-[10px] font-mono bg-white/80 px-1 rounded">{step.label}</span>
                  </div>
                </div>
              ))}
            </div>
            <div ref={textRef} className="space-y-3">
              <p className="text-[#2B2B2B] leading-relaxed text-sm md:text-base">
                This portrait began as a 10-minute gesture. I kept returning to the eyes—until the rest of the face agreed to come alive.
              </p>
              <div className="flex items-center gap-4 py-3 border-t border-b border-[#ddd]">
                <div className="flex items-center gap-1.5 text-[#6E6E6E]">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="font-mono text-xs">18 hours</span>
                </div>
              </div>
              <div className="relative pl-5 py-1">
                <Quote className="absolute left-0 top-1.5 w-3.5 h-3.5 text-[#D8A34A]" />
                <p className="font-handwritten text-base md:text-lg text-[#6E6E6E] italic">"She captured the expression I didn't know I was making."</p>
                <p className="font-mono text-xs text-[#999] mt-1">— Client</p>
              </div>
            </div>
          </>
        }
      />
    </section>
  );
}
