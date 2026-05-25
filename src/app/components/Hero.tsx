import { MapPin, Calendar, Users, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useContent } from '../context/ContentContext';

export function Hero() {
  const { content } = useContent();
  const [searchData, setSearchData] = useState({
    destination: '',
    date: '',
    travelers: '1'
  });

  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-16">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1602608099803-96718a589bb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwc3Vuc2V0JTIwY2FyaWJiZWFufGVufDF8fHx8MTc3ODc4NjU5MHww&ixlib=rb-4.1.0&q=80&w=1080)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#c026d3]/80 to-[#a855f7]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl text-white mb-6">
            {content.heroTitle.split(' ').slice(0, 3).join(' ')}
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              {content.heroTitle.split(' ').slice(3).join(' ')}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            {content.heroSubtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a855f7]" />
              <input
                type="text"
                placeholder="¿A dónde quieres ir?"
                value={searchData.destination}
                onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#a855f7] focus:outline-none"
              />
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a855f7]" />
              <input
                type="date"
                value={searchData.date}
                onChange={(e) => setSearchData({...searchData, date: e.target.value})}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#a855f7] focus:outline-none"
              />
            </div>

            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a855f7]" />
              <select
                value={searchData.travelers}
                onChange={(e) => setSearchData({...searchData, travelers: e.target.value})}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#a855f7] focus:outline-none appearance-none"
              >
                <option value="1">1 Viajero</option>
                <option value="2">2 Viajeros</option>
                <option value="3">3 Viajeros</option>
                <option value="4">4+ Viajeros</option>
              </select>
            </div>
          </div>

          <a
            href={`https://wa.me/${content.whatsappNumber}?text=Hola!%20Quiero%20cotizar%20un%20viaje`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-[#c026d3] to-[#a855f7] text-white py-4 rounded-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Cotizar por WhatsApp
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
          {content.heroStats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl mb-2">{stat.value}</div>
              <div className="text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
