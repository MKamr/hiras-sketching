import { useRef, useState } from 'react';
import { X } from 'lucide-react';
import BookSpread from '../components/BookSpread';

const works = [
  { id: 1, title: 'Portrait Study', medium: 'graphite', image: '/work_thumb_01.jpg', description: 'A detailed study of light and shadow on skin, focusing on the subtle transitions in the eye area.' },
  { id: 2, title: 'Old Library', medium: 'ink + wash', image: '/work_thumb_02.jpg', description: 'Architectural illustration capturing the quiet atmosphere of a historic reading room.' },
  { id: 3, title: 'Character Concept', medium: 'pencil', image: '/work_thumb_03.jpg', description: 'Fantasy character design exploring elven features and flowing hair dynamics.' },
  { id: 4, title: 'Still Life', medium: 'graphite', image: '/work_thumb_04.jpg', description: 'Classical still life composition studying texture, reflection, and drapery.' },
];

export default function WorkSection() {
  const spreadRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedWork, setSelectedWork] = useState<typeof works[0] | null>(null);

  return (
    <section id="work-section" className="section-pinned paper-texture z-50 flex items-center justify-center min-h-full">
      <BookSpread
        spreadRef={spreadRef}
        leftContent={
          <>
            <h2 className="font-handwritten text-[clamp(24px,3.5vw,42px)] text-[#2B2B2B] mb-2 md:mb-4">Selected Work</h2>
            <p className="text-[#6E6E6E] leading-relaxed max-w-sm text-sm md:text-base">Portraits, places, and imagined scenes.</p>
          </>
        }
        rightContent={
          <div ref={gridRef} className="grid grid-cols-2 gap-3 md:gap-4 w-full items-center">
            {works.map((work) => (
              <div key={work.id} className="work-item cursor-pointer group" onClick={() => setSelectedWork(work)}>
                <div className="polaroid p-1.5 md:p-2 pb-5 md:pb-7">
                  <img src={work.image} alt={work.title} className="w-full aspect-[4/3] object-cover" />
                  <div className="mt-2 md:mt-3 text-center">
                    <p className="font-handwritten text-sm md:text-base text-[#2B2B2B]">{work.title}</p>
                    <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-wider text-[#6E6E6E]">{work.medium}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      />

      {selectedWork && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)' }} onClick={() => setSelectedWork(null)}>
          <div className="relative bg-[#F4F1EA] rounded-lg max-w-2xl w-full max-h-[85vh] overflow-auto p-4 md:p-6" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedWork(null)} className="absolute top-3 right-3 p-2 hover:bg-black/10 rounded-full transition-colors z-10">
              <X className="w-5 h-5" />
            </button>
            <img src={selectedWork.image} alt={selectedWork.title} className="w-full max-h-[45vh] object-contain mb-4" />
            <h3 className="font-handwritten text-2xl text-[#2B2B2B] mb-1">{selectedWork.title}</h3>
            <p className="font-mono text-xs uppercase tracking-wider text-[#6E6E6E] mb-3">{selectedWork.medium}</p>
            <p className="text-sm text-[#2B2B2B] leading-relaxed">{selectedWork.description}</p>
          </div>
        </div>
      )}
    </section>
  );
}
