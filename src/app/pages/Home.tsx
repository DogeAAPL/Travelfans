import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Destinations } from '../components/Destinations';
import { Packages } from '../components/Packages';
import { Experiences } from '../components/Experiences';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';
import { WhatsAppFloat } from '../components/WhatsAppFloat';
import { SideNav } from '../components/SideNav';
import { CookieBanner } from '../components/CookieBanner';

export function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <SideNav />
      <main>
        <Hero />
        <Destinations />
        <Packages />
        <Experiences />
        <Testimonials />
      </main>
      <Footer />
      <WhatsAppFloat />
      <CookieBanner />
    </div>
  );
}
