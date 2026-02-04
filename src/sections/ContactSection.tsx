import { useRef } from 'react';
import { Instagram, Dribbble, Mail, ArrowUp } from 'lucide-react';
import BookSpread from '../components/BookSpread';
import { useBookNavigation } from '../context/BookNavigationContext';

export default function ContactSection() {
  const spreadRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { goToIndex } = useBookNavigation();

  return (
    <section id="contact-section" className="section-pinned paper-texture z-[110] flex items-center justify-center min-h-full">
      <BookSpread
        spreadRef={spreadRef}
        leftContent={
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="font-handwritten text-xl md:text-2xl text-[#6E6E6E]">Thanks for visiting.</p>
            <p className="text-[#6E6E6E] text-sm mt-2">Keep creating. Keep sketching.</p>
          </div>
        }
        rightContent={
          <div ref={cardRef} className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="font-handwritten text-[clamp(24px,4vw,40px)] text-[#2B2B2B] mb-3">Thanks for visiting.</h2>
            <p className="text-[#6E6E6E] leading-relaxed mb-6 text-sm md:text-base">Keep creating. Keep sketching.</p>
            <a
              href="mailto:hello@hirabintausman.art"
              className="inline-flex items-center gap-2 text-[#2B2B2B] hover:text-[#D8A34A] transition-colors mb-6 group"
            >
              <Mail className="w-4 h-4" />
              <span className="font-mono text-xs">hello@hirabintausman.art</span>
            </a>
            <div className="flex justify-center gap-4 mb-6">
              <a href="#" className="p-2.5 rounded-full border border-[#ddd] hover:border-[#D8A34A] hover:bg-[#D8A34A]/10 transition-all">
                <Instagram className="w-4 h-4 text-[#6E6E6E]" />
              </a>
              <a href="#" className="p-2.5 rounded-full border border-[#ddd] hover:border-[#D8A34A] hover:bg-[#D8A34A]/10 transition-all">
                <Dribbble className="w-4 h-4 text-[#6E6E6E]" />
              </a>
            </div>
            <button onClick={() => goToIndex(0)} className="inline-flex items-center gap-2 text-[#6E6E6E] hover:text-[#D8A34A] transition-colors group">
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="font-mono text-[10px] uppercase tracking-wider">Back to top</span>
            </button>
            <div className="mt-8 pt-6 border-t border-[#ddd]">
              <p className="font-mono text-[10px] text-[#999]">© 2024 Hira Binta Usman</p>
            </div>
          </div>
        }
      />
    </section>
  );
}
