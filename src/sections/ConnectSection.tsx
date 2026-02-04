import { useRef, useState } from 'react';
import { Mail, Instagram, Send, Check } from 'lucide-react';
import BookSpread from '../components/BookSpread';

export default function ConnectSection() {
  const spreadRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setMessage('');
      }, 2000);
    }
  };

  return (
    <section id="connect-section" className="section-pinned paper-texture z-[95] flex items-center justify-center min-h-full">
      <BookSpread
        spreadRef={spreadRef}
        leftContent={
          <>
            <h2 className="font-handwritten text-[clamp(24px,3.5vw,42px)] text-[#2B2B2B] mb-3 md:mb-4">Let's Connect</h2>
            <p className="text-[#6E6E6E] leading-relaxed max-w-sm mb-6 md:mb-8 text-sm md:text-base">
              Have a project in mind? Or just want to say hello? Drop me a note.
            </p>
            <div className="flex gap-4">
              <a href="mailto:hello@hirabintausman.art" className="flex items-center gap-2 text-[#2B2B2B] hover:text-[#D8A34A] transition-colors">
                <Mail className="w-4 h-4" />
                <span className="font-mono text-xs">Email</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-[#2B2B2B] hover:text-[#D8A34A] transition-colors">
                <Instagram className="w-4 h-4" />
                <span className="font-mono text-xs">Instagram</span>
              </a>
            </div>
          </>
        }
        rightContent={
          <div className="flex items-center justify-center">
            <div ref={noteRef} className="relative bg-white p-5 md:p-8 shadow-lg w-full max-w-sm" style={{ transform: 'rotate(-1deg)' }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[rgba(255,215,0,0.3)]" />
              <div className="space-y-4">
                <p className="font-handwritten text-lg text-[#6E6E6E]">Dear Hira,</p>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  className="w-full min-h-[100px] md:min-h-[120px] resize-none border-none outline-none font-handwritten text-base md:text-lg text-[#2B2B2B] placeholder:text-[#bbb] bg-transparent"
                />
                <div className="flex justify-between items-center pt-2">
                  <span className="font-handwritten text-sm text-[#999]">— You</span>
                  <button
                    onClick={handleSend}
                    disabled={sent || !message.trim()}
                    className="flex items-center gap-2 px-4 py-2 bg-[#D8A34A] text-white rounded font-handwritten text-sm hover:bg-[#c9963f] transition-colors disabled:opacity-50"
                  >
                    {sent ? (<><Check className="w-4 h-4" />Sent!</>) : (<><Send className="w-4 h-4" />Send</>)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </section>
  );
}
