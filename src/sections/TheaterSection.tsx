import { useRef, useState } from 'react';
import { Play, X } from 'lucide-react';
import BookSpread from '../components/BookSpread';

export default function TheaterSection() {
  const spreadRef = useRef<HTMLDivElement>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section id="theater-section" className="section-pinned z-[70] flex items-center justify-center min-h-full" style={{ backgroundColor: '#111' }}>
      <BookSpread
        spreadRef={spreadRef}
        variant="dark"
        leftContent={
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-xs md:max-w-md">
              <img src="/video_thumb.jpg" alt="Time-lapse video thumbnail" className="w-full aspect-video object-cover rounded-lg" />
              <button ref={playBtnRef} onClick={() => setShowVideo(true)} className="play-btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Play className="w-5 h-5 text-[#2B2B2B] fill-current" />
              </button>
              <div className="absolute bottom-3 left-3">
                <p className="text-white/80 font-mono text-[10px] uppercase tracking-wider">Time-lapse</p>
                <p className="text-white font-handwritten text-base">Portrait from blank page</p>
              </div>
            </div>
          </div>
        }
        rightContent={
          <>
            <h2 className="font-handwritten text-[clamp(24px,3.5vw,42px)] text-[#2B2B2B] mb-4 md:mb-6">Watch Me Create</h2>
            <p className="text-[#2B2B2B] leading-relaxed mb-6 md:mb-8 max-w-sm text-sm md:text-base">
              A time-lapse from blank page to finished portrait—with the decisions I make along the way.
            </p>
            <button onClick={() => setShowVideo(true)} className="pencil-btn flex items-center gap-2 text-base px-6 py-2.5 w-fit">
              <Play className="w-4 h-4" />
              Play the process
            </button>
            <div className="mt-auto flex gap-6">
              <div>
                <p className="font-handwritten text-2xl text-[#D8A34A]">47</p>
                <p className="font-mono text-[10px] text-[#6E6E6E] uppercase">Videos</p>
              </div>
              <div>
                <p className="font-handwritten text-2xl text-[#D8A34A]">12K</p>
                <p className="font-mono text-[10px] text-[#6E6E6E] uppercase">Subscribers</p>
              </div>
            </div>
          </>
        }
      />

      {showVideo && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.95)' }} onClick={() => setShowVideo(false)}>
          <div className="relative w-full max-w-3xl aspect-video bg-black rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowVideo(false)} className="absolute top-3 right-3 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors">
              <X className="w-5 h-5 text-white" />
            </button>
            <div className="w-full h-full flex items-center justify-center">
              <img src="/video_thumb.jpg" alt="Video placeholder" className="w-full h-full object-cover opacity-50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <Play className="w-12 h-12 mb-3" />
                <p className="font-handwritten text-xl">Video Player Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
