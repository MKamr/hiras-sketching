import { Pencil } from 'lucide-react';
import { useBookNavigation } from '../context/BookNavigationContext';

// Page indices in BookStack: 0 Hero, 1 Cover, 2 About, 3 Tools, 4 Work, 5 WorkDetail, 6 Theater, 7 Timeline, 8 Connect, 9 Testimonials, 10 Contact
const navLinks = [
  { label: 'Work', pageIndex: 4 },
  { label: 'Process', pageIndex: 6 },
  { label: 'Connect', pageIndex: 8 },
] as const;

export default function Navigation() {
  const { currentIndex, goToIndex } = useBookNavigation();

  const isVisible = currentIndex > 0;
  const activeSection = navLinks.find(link => link.pageIndex === currentIndex)?.label ?? '';

  const goToPage = (pageIndex: number) => {
    goToIndex(pageIndex);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-500 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-full pointer-events-none'
      }`}
    >
      <div 
        className="mx-2 md:mx-4 mt-2 md:mt-4 px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center justify-between"
        style={{
          background: 'rgba(244, 241, 234, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}
      >
        {/* Logo */}
        <button
          type="button"
          onClick={() => goToPage(0)}
          className="flex items-center gap-1.5 group bg-transparent border-0 cursor-pointer p-0"
        >
          <Pencil className="w-3.5 h-3.5 text-[#D8A34A] group-hover:rotate-12 transition-transform" />
          <span className="font-handwritten text-base text-[#2B2B2B]">Hira&apos;s Sketching</span>
        </button>
        
        {/* Nav links */}
        <div className="flex items-center gap-4 md:gap-6">
          {navLinks.map((link) => (
            <button
              key={link.pageIndex}
              type="button"
              onClick={() => goToPage(link.pageIndex)}
              className={`nav-link text-[10px] md:text-xs bg-transparent border-0 cursor-pointer p-0 ${
                activeSection === link.label ? 'text-[#D8A34A]' : ''
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
