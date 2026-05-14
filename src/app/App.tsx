import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Destinations } from './components/Destinations';
import { Packages } from './components/Packages';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Destinations />
      <Packages />
      <Testimonials />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}