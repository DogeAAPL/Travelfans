import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Destinations } from '../components/Destinations';
import { Packages } from '../components/Packages';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';
import { WhatsAppFloat } from '../components/WhatsAppFloat';
import { SideNav } from '../components/SideNav';

export function Home() {
  return (
    <div className="min-h-screen scroll-smooth">
      <Navbar />
      <SideNav />
      <Hero />
      <Destinations />
      <Packages />
      <Testimonials />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
