import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import BookSpread from '../components/BookSpread';
import { useBookNavigation } from '../context/BookNavigationContext';

const testimonials = [
  { id: 1, text: "The portrait felt more real than the photo.", author: "Sarah M.", style: "font-handwritten", rotation: -2 },
  { id: 2, text: "She turned my messy idea into a world.", author: "David K.", style: "font-mono", rotation: 1 },
  { id: 3, text: "Patient, precise, and kind. Working with Hira was a joy.", author: "Maria L.", style: "font-serif", rotation: -1 },
];

export default function TestimonialsSection() {
  const spreadRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const { goToNext } = useBookNavigation();

  return (
    <section id="testimonials-section" className="section-pinned paper-texture z-[100] flex items-center justify-center min-h-full">
      <BookSpread
        spreadRef={spreadRef}
        leftContent={
          <>
            <h2 className="font-handwritten text-[clamp(24px,3.5vw,42px)] text-[#2B2B2B] mb-3 md:mb-4">Guest Sketchbook</h2>
            <p className="text-[#6E6E6E] leading-relaxed max-w-sm mb-6 md:mb-8 text-sm md:text-base">
              Words from those who've shared this creative journey.
            </p>
            <button onClick={goToNext} className="flex items-center gap-2 text-[#D8A34A] hover:text-[#B8852E] transition-colors group w-fit">
              <span className="font-handwritten text-lg">Start your project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </>
        }
        rightContent={
          <div ref={notesRef} className="space-y-3 md:space-y-4 flex flex-col justify-center">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-note-item testimonial-note p-4 md:p-5" style={{ transform: `rotate(${testimonial.rotation}deg)` }}>
                <div className="absolute -top-1.5 left-3 w-10 h-4 bg-[rgba(255,215,0,0.2)]" />
                <p className={`${testimonial.style} text-sm md:text-base text-[#2B2B2B] mb-2`}>"{testimonial.text}"</p>
                <p className="font-mono text-[10px] text-[#999] text-right">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        }
      />
    </section>
  );
}
