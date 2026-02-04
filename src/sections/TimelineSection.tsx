import { useRef, useState } from 'react';
import BookSpread from '../components/BookSpread';

const timelineData = [
  { year: '2016', title: 'First portraits', image: '/timeline_2016.jpg' },
  { year: '2018', title: 'Ink experiments', image: '/timeline_2018.jpg' },
  { year: '2020', title: 'Commission work', image: '/timeline_2020.jpg' },
  { year: '2022', title: 'Mixed media', image: '/timeline_2022.jpg' },
  { year: '2024', title: 'Teaching', image: '/timeline_2024.jpg' },
];

export default function TimelineSection() {
  const spreadRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);

  return (
    <section id="timeline-section" className="section-pinned paper-texture z-[80] flex items-center justify-center min-h-full">
      <BookSpread
        spreadRef={spreadRef}
        leftContent={
          <>
            <h2 className="font-handwritten text-[clamp(24px,3.5vw,42px)] text-[#2B2B2B] mb-3 md:mb-4">Sketch Stories</h2>
            <p className="text-[#6E6E6E] leading-relaxed max-w-sm text-sm md:text-base">Every style I love started as a mistake I kept.</p>
            <div className="mt-6 md:mt-8 max-w-xs">
              <p className="font-handwritten text-base md:text-lg text-[#6E6E6E] italic">"Growth is not a straight line. It's a sketch—full of erasures and redraws."</p>
            </div>
          </>
        }
        rightContent={
          <div className="relative flex flex-col justify-center flex-1">
            <svg className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 w-full" preserveAspectRatio="none">
              <line ref={lineRef} x1="0" y1="50%" x2="100%" y2="50%" stroke="#D8A34A" strokeWidth="2" strokeDasharray="1000" strokeDashoffset="0" />
            </svg>
            <div className="relative flex justify-between items-center">
              {timelineData.map((item) => (
                <div
                  key={item.year}
                  className="timeline-node relative flex flex-col items-center cursor-pointer"
                  onMouseEnter={() => setHoveredYear(item.year)}
                  onMouseLeave={() => setHoveredYear(null)}
                >
                  <div
                    className="w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border-2 shadow-md"
                    style={{ borderColor: hoveredYear === item.year ? '#D8A34A' : 'white', transition: 'border-color 0.3s ease' }}
                  >
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-mono text-[10px] md:text-xs font-bold text-[#2B2B2B] mt-1">{item.year}</span>
                  <span className="font-handwritten text-[10px] md:text-sm text-[#6E6E6E] text-center max-w-[50px] md:max-w-[70px] leading-tight">{item.title}</span>
                  <div className="absolute top-[calc(50%-12px)] md:top-[calc(50%-16px)] left-1/2 -translate-x-1/2 w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-[#D8A34A]" />
                </div>
              ))}
            </div>
          </div>
        }
      />
    </section>
  );
}
