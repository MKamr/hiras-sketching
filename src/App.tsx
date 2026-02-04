import BookStack from './components/BookStack';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import CoverSection from './sections/CoverSection';
import AboutSection from './sections/AboutSection';
import ToolsSection from './sections/ToolsSection';
import WorkSection from './sections/WorkSection';
import WorkDetailSection from './sections/WorkDetailSection';
import TheaterSection from './sections/TheaterSection';
import TimelineSection from './sections/TimelineSection';
import ConnectSection from './sections/ConnectSection';
import TestimonialsSection from './sections/TestimonialsSection';
import ContactSection from './sections/ContactSection';

import './index.css';

const PAGES = [
  <HeroSection key="hero" />,
  <CoverSection key="cover" />,
  <AboutSection key="about" />,
  <ToolsSection key="tools" />,
  <WorkSection key="work" />,
  <WorkDetailSection key="work-detail" />,
  <TheaterSection key="theater" />,
  <TimelineSection key="timeline" />,
  <ConnectSection key="connect" />,
  <TestimonialsSection key="testimonials" />,
  <ContactSection key="contact" />,
];

function App() {
  return (
    <>
      {/* Full-page hero sketch background */}
      <div
        className="fixed inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <img
          src="/hero_sketch_transparent.png"
          alt=""
          className="absolute inset-0 w-full h-full object-contain object-center opacity-[0.22] pointer-events-none select-none"
        />
      </div>

      {/* Book stack: one viewport, pages turn (no document scroll). Nav lives inside provider. */}
      <BookStack pages={PAGES} className="z-10">
        <Navigation />
      </BookStack>
    </>
  );
}

export default App;
