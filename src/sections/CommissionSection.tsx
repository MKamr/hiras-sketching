import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pricingItems = [
  { service: 'Portrait', price: 'from $240', width: '60%' },
  { service: 'Full scene', price: 'from $520', width: '85%' },
  { service: 'Rush delivery', price: 'add 30%', width: '40%' },
];

export default function CommissionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const spreadRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const sealRef = useRef<HTMLButtonElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const spread = spreadRef.current;
    const bars = barsRef.current;
    const form = formRef.current;
    const seal = sealRef.current;
    
    if (!section || !spread || !bars || !form || !seal) return;

    const barItems = bars.querySelectorAll('.pricing-bar');
    const formFields = form.querySelectorAll('.form-field');

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 0.5,
        }
      });

      // ENTRANCE (0-30%) - faster
      scrollTl.fromTo(spread,
        { y: '80vh', rotateX: 35, opacity: 0 },
        { y: 0, rotateX: 0, opacity: 1, ease: 'none' },
        0
      );
      
      scrollTl.fromTo(barItems,
        { scaleX: 0 },
        { scaleX: 1, stagger: 0.04, ease: 'none', transformOrigin: 'left' },
        0.08
      );
      
      scrollTl.fromTo(formFields,
        { x: '6vw', opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.04, ease: 'none' },
        0.12
      );
      
      scrollTl.fromTo(seal,
        { scale: 0.7, rotateZ: -4 },
        { scale: 1, rotateZ: 0, ease: 'none' },
        0.16
      );

      // EXIT (70-100%) - faster
      scrollTl.fromTo(spread,
        { x: 0, rotateY: 0, opacity: 1 },
        { x: '45vw', rotateY: -25, opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <section 
      ref={sectionRef} 
      id="commission-section"
      className="section-pinned paper-texture z-[90]"
    >
      {/* Spread Card */}
      <div 
        ref={spreadRef}
        className="spread-card flex flex-col md:flex-row mx-4"
        style={{ 
          width: 'clamp(320px, 90vw, 1400px)',
          height: 'clamp(500px, 75vh, 850px)',
        }}
      >
        {/* Left Page - Pricing */}
        <div className="flex-1 relative p-6 md:p-10 lg:p-12">
          <h2 className="font-handwritten text-[clamp(28px,4vw,48px)] text-[#2B2B2B] mb-4 md:mb-6">
            Commission Me
          </h2>
          
          <p className="text-[#6E6E6E] leading-relaxed max-w-sm mb-6 md:mb-8 text-sm md:text-base">
            Tell me what you need. I'll reply with a timeline and a clear price.
          </p>
          
          {/* Pricing infographic */}
          <div ref={barsRef} className="space-y-4 md:space-y-6 mt-6 md:mt-8">
            {pricingItems.map((item) => (
              <div key={item.service} className="pricing-bar">
                <div className="flex justify-between items-center mb-1.5 md:mb-2">
                  <span className="font-handwritten text-base md:text-lg text-[#2B2B2B]">{item.service}</span>
                  <span className="font-mono text-xs md:text-sm text-[#6E6E6E]">{item.price}</span>
                </div>
                <div className="h-2 md:h-3 bg-[#E8E4DC] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#D8A34A] to-[#E8C574] rounded-full"
                    style={{ width: item.width }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Note */}
          <div className="absolute bottom-6 md:bottom-12 left-4 md:left-8">
            <p className="font-handwritten text-xs md:text-sm text-[#999]">
              Prices vary based on complexity
            </p>
          </div>
        </div>
        
        {/* Right Page - Form */}
        <div className="flex-1 relative p-4 md:p-8 lg:p-12 md:pl-4">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 md:space-y-6 max-w-md">
            <div className="form-field">
              <label className="block font-mono text-[10px] md:text-xs uppercase tracking-wider text-[#6E6E6E] mb-1 md:mb-2">
                Your name
              </label>
              <input 
                type="text"
                className="sketch-input text-sm md:text-base"
                placeholder="Jane Doe"
                required
              />
            </div>
            
            <div className="form-field">
              <label className="block font-mono text-[10px] md:text-xs uppercase tracking-wider text-[#6E6E6E] mb-1 md:mb-2">
                Email
              </label>
              <input 
                type="email"
                className="sketch-input text-sm md:text-base"
                placeholder="jane@example.com"
                required
              />
            </div>
            
            <div className="form-field">
              <label className="block font-mono text-[10px] md:text-xs uppercase tracking-wider text-[#6E6E6E] mb-1 md:mb-2">
                Project type
              </label>
              <select className="sketch-input text-sm md:text-base bg-transparent">
                <option value="">Select a project type</option>
                <option value="portrait">Portrait</option>
                <option value="scene">Full scene</option>
                <option value="character">Character design</option>
                <option value="other">Something else</option>
              </select>
            </div>
            
            <div className="form-field">
              <label className="block font-mono text-[10px] md:text-xs uppercase tracking-wider text-[#6E6E6E] mb-1 md:mb-2">
                Tell me about your project
              </label>
              <textarea 
                className="sketch-input text-sm md:text-base resize-none"
                rows={2}
                placeholder="What do you have in mind?"
              />
            </div>
            
            {/* Submit button - Wax seal style */}
            <div className="form-field flex justify-end pt-2 md:pt-4">
              <button
                ref={sealRef}
                type="submit"
                className="relative group"
                disabled={submitted}
              >
                <div className="wax-seal w-12 h-12 md:w-16 md:h-16">
                  {submitted ? (
                    <Check className="w-5 md:w-6 h-5 md:h-6 text-white" />
                  ) : (
                    <Send className="w-4 md:w-5 h-4 md:h-5 text-white" />
                  )}
                </div>
                <span className="absolute -bottom-4 md:-bottom-5 left-1/2 -translate-x-1/2 font-mono text-[10px] md:text-xs text-[#6E6E6E] whitespace-nowrap">
                  {submitted ? 'Sent!' : 'Send request'}
                </span>
              </button>
            </div>
          </form>
          
          {/* Graph paper background effect */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(#2B2B2B 1px, transparent 1px),
                linear-gradient(90deg, #2B2B2B 1px, transparent 1px)
              `,
              backgroundSize: '16px 16px'
            }}
          />
        </div>
      </div>
    </section>
  );
}
