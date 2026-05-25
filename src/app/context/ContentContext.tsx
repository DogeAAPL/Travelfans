import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Destination {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  highlights: string[];
  description: string;
}

interface Package {
  id: number;
  name: string;
  duration: string;
  destinations: string;
  popular: boolean;
  features: string[];
}

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
}

interface ContentData {
  heroTitle: string;
  heroSubtitle: string;
  heroStats: Array<{ label: string; value: string }>;
  destinations: Destination[];
  packages: Package[];
  testimonials: Testimonial[];
  whatsappNumber: string;
}

interface ContentContextType {
  content: ContentData;
  updateContent: (newContent: Partial<ContentData>) => void;
}

const defaultContent: ContentData = {
  heroTitle: 'Tu Próxima Aventura Comienza Aquí',
  heroSubtitle: 'Perú, Colombia, Panamá y Brasil te esperan. Cotiza tu viaje por WhatsApp en minutos',
  heroStats: [
    { label: 'Países Destacados', value: '4' },
    { label: 'Viajeros Felices', value: '5K+' },
    { label: 'Personalizado', value: '100%' },
    { label: 'WhatsApp', value: '24/7' }
  ],
  destinations: [
    {
      id: 1,
      name: 'Perú',
      location: 'Machu Picchu',
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYWNodSUyMFBpY2NodSUyMFBlcnV8ZW58MXx8fHwxNzc4Nzg2MzkyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      reviews: 524,
      highlights: ['Machu Picchu', 'Cusco', 'Lima', 'Valle Sagrado'],
      description: 'Descubre la magia de los Incas'
    },
    {
      id: 2,
      name: 'Colombia',
      location: 'Cartagena',
      image: 'https://images.unsplash.com/photo-1583531352515-8884af319dc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDYXJ0YWdlbmElMjBDb2xvbWJpYSUyMGNvbG9yZnVsfGVufDF8fHx8MTc3ODc4NjM5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.8,
      reviews: 467,
      highlights: ['Cartagena', 'Bogotá', 'Medellín', 'Eje Cafetero'],
      description: 'Color y cultura en el Caribe'
    },
    {
      id: 3,
      name: 'Panamá',
      location: 'Ciudad de Panamá',
      image: 'https://images.unsplash.com/photo-1598041543955-0d88c390f3b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQYW5hbWElMjBDaXR5JTIwc2t5bGluZXxlbnwxfHx8fDE3Nzg3ODYzOTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.7,
      reviews: 389,
      highlights: ['Ciudad de Panamá', 'Bocas del Toro', 'San Blas', 'Canal'],
      description: 'Modernidad y playas paradisíacas'
    },
    {
      id: 4,
      name: 'Brasil',
      location: 'Río de Janeiro',
      image: 'https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSaW8lMjBkZSUyMEphbmVpcm8lMjBCcmF6aWwlMjBDaHJpc3R8ZW58MXx8fHwxNzc4Nzg2Mzk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      reviews: 612,
      highlights: ['Río de Janeiro', 'Salvador', 'Amazonas', 'Iguazú'],
      description: 'Samba, playas y naturaleza exuberante'
    }
  ],
  packages: [
    {
      id: 1,
      name: 'Aventura Caribe',
      duration: '5 días / 4 noches',
      destinations: 'Cartagena, Colombia',
      popular: false,
      features: [
        'Vuelos incluidos',
        'Hotel boutique',
        'Desayunos',
        'City tour',
        'Playas del Caribe'
      ]
    },
    {
      id: 2,
      name: 'Maravillas del Perú',
      duration: '7 días / 6 noches',
      destinations: 'Lima, Cusco y Machu Picchu',
      popular: true,
      features: [
        'Vuelos nacionales',
        'Hoteles 4 estrellas',
        'Desayunos incluidos',
        'Entrada a Machu Picchu',
        'Guía en español',
        'Traslados privados'
      ]
    },
    {
      id: 3,
      name: 'Brasil Completo',
      duration: '10 días / 9 noches',
      destinations: 'Río, Salvador y Amazonas',
      popular: false,
      features: [
        'Vuelos incluidos',
        'Hoteles premium',
        'Desayunos',
        'Cristo Redentor',
        'Tour del Amazonas',
        'Playas de Río'
      ]
    }
  ],
  testimonials: [
    {
      id: 1,
      name: 'María González',
      location: 'Madrid, España',
      rating: 5,
      text: 'Mi viaje a Perú fue increíble. La atención por WhatsApp fue rápida y personalizada. Machu Picchu superó todas mis expectativas. ¡Gracias TravelFans!',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
    },
    {
      id: 2,
      name: 'Carlos Ruiz',
      location: 'Buenos Aires, Argentina',
      rating: 5,
      text: 'Cartagena fue mágica. Todo el proceso de cotización por WhatsApp fue súper fácil y rápido. La mejor experiencia de viaje que he tenido.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
    },
    {
      id: 3,
      name: 'Ana Martínez',
      location: 'Ciudad de México, México',
      rating: 5,
      text: 'Brasil fue un sueño hecho realidad. El equipo de TravelFans respondió todas mis dudas al instante por WhatsApp. ¡100% recomendado!',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
    }
  ],
  whatsappNumber: '5491123456789'
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentData>(() => {
    const saved = localStorage.getItem('travelfans_content');
    return saved ? JSON.parse(saved) : defaultContent;
  });

  useEffect(() => {
    localStorage.setItem('travelfans_content', JSON.stringify(content));
  }, [content]);

  const updateContent = (newContent: Partial<ContentData>) => {
    setContent(prev => ({ ...prev, ...newContent }));
  };

  return (
    <ContentContext.Provider value={{ content, updateContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
