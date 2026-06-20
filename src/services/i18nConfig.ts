import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      'nav.home': 'Home',
      'nav.destinations': 'Destinations',
      'nav.packages': 'Packages',
      'nav.opinions': 'Opinions',
      'nav.quote': 'Quote',

      // Hero Section
      'hero.title': 'Your Next Adventure Starts Here',
      'hero.subtitle': 'Peru, Colombia, Panama and Brazil await you. Quote your trip via WhatsApp in minutes',
      'hero.stats.countries': 'Featured Countries',
      'hero.stats.travelers': 'Happy Travelers',
      'hero.stats.personalized': 'Personalized',
      'hero.stats.support': 'WhatsApp 24/7',
      'hero.search.destination': 'Where do you want to go?',
      'hero.search.date': 'Select date',
      'hero.search.travelers': 'Number of travelers',
      'hero.search.button': 'Quote Now',

      // Destinations
      'destinations.title': 'Popular Destinations',
      'destinations.subtitle': 'We connect your passion for travel with the best destinations in Latin America',
      'destinations.includes': 'Includes:',
      'destinations.quote': 'Quote Now',

      // Packages
      'packages.title': 'Travel Packages',
      'packages.subtitle': 'Packages designed for every type of traveler. Quote via WhatsApp',
      'packages.popular': 'Most Popular',
      'packages.features': 'Features:',
      'packages.quote': 'Quote Now',

      // Testimonials
      'testimonials.title': 'Traveler Opinions',
      'testimonials.subtitle': 'Know the experiences of those who already traveled with TravelFans',
      'testimonials.cta': 'Ready for your next adventure?',
      'testimonials.cta.subtitle': 'Join thousands of satisfied travelers and discover the world with us',
      'testimonials.button': 'Plan Your Trip Now',

      // Footer
      'footer.description': 'Specialists in Latin American destinations. Quote your dream trip via WhatsApp quickly and personalized.',
      'footer.destinations': 'Destinations',
      'footer.services': 'Services',
      'footer.peru': 'Peru',
      'footer.colombia': 'Colombia',
      'footer.panama': 'Panama',
      'footer.brazil': 'Brazil',
      'footer.otherDestinations': 'Other Destinations',
      'footer.touristicPackages': 'Tourism Packages',
      'footer.flights': 'Flights',
      'footer.hotels': 'Hotels',
      'footer.tours': 'Tours',
      'footer.consultation': 'Personalized Advice',
      'footer.contact': 'Contact',
      'footer.whatsapp': 'WhatsApp',
      'footer.rights': '© 2024 TravelFans. All rights reserved.',

      // Admin
      'admin.title': 'Administration Panel',
      'admin.signOut': 'Sign Out',
      'admin.viewSite': 'View Site',
      'admin.saved': 'Saved',
      'admin.heroSection': 'Hero Section',
      'admin.destinations': 'Destinations',
      'admin.packages': 'Packages',
      'admin.testimonials': 'Testimonials',
      'admin.settings': 'Settings',
      'admin.title.field': 'Title',
      'admin.subtitle.field': 'Subtitle',
      'admin.save': 'Save',
      'admin.delete': 'Delete',
      'admin.edit': 'Edit',
      'admin.add': 'Add',

      // Login
      'login.title': 'Administration Panel',
      'login.subtitle': 'Enter your credentials to continue',
      'login.username': 'Username',
      'login.password': 'Password',
      'login.signIn': 'Sign In',
      'login.error': 'Incorrect username or password',
      'login.defaultCreds': 'Default credentials:',
      'login.back': 'Back to Home',

      // Messages
      'messages.enterUsername': 'admin',
      'messages.enterPassword': '••••••••',
      'messages.travelers_one': '1 Traveler',
      'messages.travelers_two': '2 Travelers',
      'messages.travelers_three': '3 Travelers',
      'messages.travelers_four': '4+ Travelers'
    }
  },
  es: {
    translation: {
      // Navigation
      'nav.home': 'Inicio',
      'nav.destinations': 'Destinos',
      'nav.packages': 'Paquetes',
      'nav.opinions': 'Opiniones',
      'nav.quote': 'Cotizar',

      // Hero Section
      'hero.title': 'Tu Próxima Aventura Comienza Aquí',
      'hero.subtitle': 'Perú, Colombia, Panamá y Brasil te esperan. Cotiza tu viaje por WhatsApp en minutos',
      'hero.stats.countries': 'Países Destacados',
      'hero.stats.travelers': 'Viajeros Felices',
      'hero.stats.personalized': 'Personalizado',
      'hero.stats.support': 'WhatsApp 24/7',
      'hero.search.destination': '¿A dónde quieres ir?',
      'hero.search.date': 'Selecciona fecha',
      'hero.search.travelers': 'Cantidad de viajeros',
      'hero.search.button': 'Cotizar Ahora',

      // Destinations
      'destinations.title': 'Destinos Populares',
      'destinations.subtitle': 'Conectamos tu pasión por viajar con los mejores destinos de Latinoamérica',
      'destinations.includes': 'Incluye:',
      'destinations.quote': 'Cotizar Ahora',

      // Packages
      'packages.title': 'Paquetes de Viaje',
      'packages.subtitle': 'Paquetes armados para cada tipo de viajero. Cotiza por WhatsApp',
      'packages.popular': 'Más Popular',
      'packages.features': 'Características:',
      'packages.quote': 'Cotizar Ahora',

      // Testimonials
      'testimonials.title': 'Opiniones de Viajeros',
      'testimonials.subtitle': 'Conoce las experiencias de quienes ya viajaron con TravelFans',
      'testimonials.cta': '¿Listo para tu próxima aventura?',
      'testimonials.cta.subtitle': 'Únete a miles de viajeros satisfechos y descubre el mundo con nosotros',
      'testimonials.button': 'Planifica tu Viaje Ahora',

      // Footer
      'footer.description': 'Especialistas en destinos de Latinoamérica. Cotiza tu viaje soñado por WhatsApp de forma rápida y personalizada.',
      'footer.destinations': 'Destinos',
      'footer.services': 'Servicios',
      'footer.peru': 'Perú',
      'footer.colombia': 'Colombia',
      'footer.panama': 'Panamá',
      'footer.brazil': 'Brasil',
      'footer.otherDestinations': 'Otros Destinos',
      'footer.touristicPackages': 'Paquetes Turísticos',
      'footer.flights': 'Vuelos',
      'footer.hotels': 'Hoteles',
      'footer.tours': 'Tours',
      'footer.consultation': 'Asesoría Personalizada',
      'footer.contact': 'Contacto',
      'footer.whatsapp': 'WhatsApp',
      'footer.rights': '© 2024 TravelFans. Todos los derechos reservados.',

      // Admin
      'admin.title': 'Panel de Administración',
      'admin.signOut': 'Cerrar Sesión',
      'admin.viewSite': 'Ver Sitio',
      'admin.saved': 'Guardado',
      'admin.heroSection': 'Sección de Inicio',
      'admin.destinations': 'Destinos',
      'admin.packages': 'Paquetes',
      'admin.testimonials': 'Testimonios',
      'admin.settings': 'Configuración',
      'admin.title.field': 'Título',
      'admin.subtitle.field': 'Subtítulo',
      'admin.save': 'Guardar',
      'admin.delete': 'Eliminar',
      'admin.edit': 'Editar',
      'admin.add': 'Agregar',

      // Login
      'login.title': 'Panel de Administración',
      'login.subtitle': 'Ingresa tus credenciales para continuar',
      'login.username': 'Usuario',
      'login.password': 'Contraseña',
      'login.signIn': 'Iniciar Sesión',
      'login.error': 'Usuario o contraseña incorrectos',
      'login.defaultCreds': 'Credenciales por defecto:',
      'login.back': 'Volver al inicio',

      // Messages
      'messages.enterUsername': 'admin',
      'messages.enterPassword': '••••••••',
      'messages.travelers_one': '1 Viajero',
      'messages.travelers_two': '2 Viajeros',
      'messages.travelers_three': '3 Viajeros',
      'messages.travelers_four': '4+ Viajeros'
    }
  },
  pt: {
    translation: {
      // Navigation
      'nav.home': 'Início',
      'nav.destinations': 'Destinos',
      'nav.packages': 'Pacotes',
      'nav.opinions': 'Opiniões',
      'nav.quote': 'Orçar',

      // Hero Section
      'hero.title': 'Sua Próxima Aventura Começa Aqui',
      'hero.subtitle': 'Peru, Colômbia, Panamá e Brasil te esperam. Orçe sua viagem via WhatsApp em minutos',
      'hero.stats.countries': 'Países Destacados',
      'hero.stats.travelers': 'Viajantes Felizes',
      'hero.stats.personalized': 'Personalizado',
      'hero.stats.support': 'WhatsApp 24/7',
      'hero.search.destination': 'Para onde você quer ir?',
      'hero.search.date': 'Selecione a data',
      'hero.search.travelers': 'Número de viajantes',
      'hero.search.button': 'Orçar Agora',

      // Destinations
      'destinations.title': 'Destinos Populares',
      'destinations.subtitle': 'Conectamos sua paixão por viajar aos melhores destinos da América Latina',
      'destinations.includes': 'Inclui:',
      'destinations.quote': 'Orçar Agora',

      // Packages
      'packages.title': 'Pacotes de Viagem',
      'packages.subtitle': 'Pacotes elaborados para cada tipo de viajante. Orçe pelo WhatsApp',
      'packages.popular': 'Mais Popular',
      'packages.features': 'Características:',
      'packages.quote': 'Orçar Agora',

      // Testimonials
      'testimonials.title': 'Opiniões dos Viajantes',
      'testimonials.subtitle': 'Conheça as experiências de quem já viajou com a TravelFans',
      'testimonials.cta': 'Pronto para sua próxima aventura?',
      'testimonials.cta.subtitle': 'Junte-se a milhares de viajantes satisfeitos e explore o mundo conosco',
      'testimonials.button': 'Planeje Sua Viagem Agora',

      // Footer
      'footer.description': 'Especialistas em destinos da América Latina. Orçe sua viagem dos sonhos via WhatsApp de forma rápida e personalizada.',
      'footer.destinations': 'Destinos',
      'footer.services': 'Serviços',
      'footer.peru': 'Peru',
      'footer.colombia': 'Colômbia',
      'footer.panama': 'Panamá',
      'footer.brazil': 'Brasil',
      'footer.otherDestinations': 'Outros Destinos',
      'footer.touristicPackages': 'Pacotes Turísticos',
      'footer.flights': 'Voos',
      'footer.hotels': 'Hotéis',
      'footer.tours': 'Tours',
      'footer.consultation': 'Consultoria Personalizada',
      'footer.contact': 'Contato',
      'footer.whatsapp': 'WhatsApp',
      'footer.rights': '© 2024 TravelFans. Todos os direitos reservados.',

      // Admin
      'admin.title': 'Painel de Administração',
      'admin.signOut': 'Sair',
      'admin.viewSite': 'Ver Site',
      'admin.saved': 'Salvo',
      'admin.heroSection': 'Seção de Início',
      'admin.destinations': 'Destinos',
      'admin.packages': 'Pacotes',
      'admin.testimonials': 'Depoimentos',
      'admin.settings': 'Configurações',
      'admin.title.field': 'Título',
      'admin.subtitle.field': 'Subtítulo',
      'admin.save': 'Salvar',
      'admin.delete': 'Deletar',
      'admin.edit': 'Editar',
      'admin.add': 'Adicionar',

      // Login
      'login.title': 'Painel de Administração',
      'login.subtitle': 'Digite suas credenciais para continuar',
      'login.username': 'Usuário',
      'login.password': 'Senha',
      'login.signIn': 'Entrar',
      'login.error': 'Usuário ou senha incorretos',
      'login.defaultCreds': 'Credenciais padrão:',
      'login.back': 'Voltar para o início',

      // Messages
      'messages.enterUsername': 'admin',
      'messages.enterPassword': '••••••••',
      'messages.travelers_one': '1 Viajante',
      'messages.travelers_two': '2 Viajantes',
      'messages.travelers_three': '3 Viajantes',
      'messages.travelers_four': '4+ Viajantes'
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('travelfans_lang') || 'es', // Default to Spanish
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false // React already handles XSS
  },
  react: {
    useSuspense: false
  }
});

export default i18n;
