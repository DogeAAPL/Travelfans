import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const SUPPORTED_LANGUAGES = [
  { code: 'es', name: 'Español', short: 'ES' },
  { code: 'en', name: 'English', short: 'EN' },
  { code: 'pt', name: 'Português', short: 'PT' },
] as const;

const es = {
  nav: {
    main: 'Navegación principal',
    sections: 'Secciones',
    home: 'Inicio',
    destinations: 'Destinos',
    packages: 'Paquetes',
    opinions: 'Opiniones',
    quote: 'Cotizar',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    quoteMessage: '¡Hola! Quiero cotizar un viaje',
  },
  hero: {
    title: 'Tu Próxima Aventura',
    highlight: 'Comienza Aquí',
    subtitle: 'Perú, Colombia, Panamá y Brasil te esperan. Cotiza tu viaje por WhatsApp en minutos',
    stats: {
      countries: 'Países Destacados',
      travelers: 'Viajeros Felices',
      personalized: 'Personalizado',
      whatsapp: 'WhatsApp',
    },
    form: {
      title: 'Cotiza tu viaje',
      destination: 'Destino',
      destinationPlaceholder: '¿A dónde quieres ir?',
      date: 'Fecha de salida',
      travelers: 'Viajeros',
      travelersOption_one: '{{count}} viajero',
      travelersOption_other: '{{count}} viajeros',
      travelersOptionMax: '{{count}}+ viajeros',
      submit: 'Cotizar por WhatsApp',
      datePast: 'La fecha no puede ser anterior a hoy.',
    },
    message: {
      intro: '¡Hola! Quiero cotizar un viaje con los siguientes detalles:',
      destination: '📍 Destino: {{value}}',
      date: '📅 Fecha: {{value}}',
      travelers: '👥 Viajeros: {{value}}',
      undecided: 'Por definir',
    },
  },
  destinations: {
    title: 'Destinos Populares',
    subtitle: 'Conectamos tu pasión por viajar con los mejores destinos de Latinoamérica',
    includes: 'Incluye:',
    quote: 'Cotizar Ahora',
    reviews: '{{rating}} de 5, {{count}} reseñas',
    message: '¡Hola! Quiero cotizar un paquete a {{name}}',
  },
  packages: {
    title: 'Paquetes de Viaje',
    subtitle: 'Paquetes armados para cada tipo de viajero. Cotiza por WhatsApp',
    popular: 'Más Popular',
    askPrice: 'Consulta precios',
    viaWhatsapp: 'Cotiza por WhatsApp',
    quote: 'Cotizar por WhatsApp',
    message: '¡Hola! Quiero cotizar el paquete {{name}}',
  },
  testimonials: {
    title: 'Opiniones de Viajeros',
    subtitle: 'Conoce las experiencias de quienes ya viajaron con TravelFans',
    rating: '{{count}} de 5 estrellas',
    ctaTitle: '¿Listo para tu próxima aventura?',
    ctaSubtitle: 'Únete a miles de viajeros satisfechos y descubre el mundo con nosotros',
    ctaButton: 'Planifica tu Viaje Ahora',
    ctaMessage: '¡Hola! Quiero planificar mi próximo viaje',
  },
  carousel: {
    previous: 'Anterior',
    next: 'Siguiente',
  },
  footer: {
    description: 'Especialistas en destinos de Latinoamérica. Cotiza tu viaje soñado por WhatsApp de forma rápida y personalizada.',
    social: 'TravelFans en {{network}}',
    language: 'Idioma',
    destinations: 'Destinos',
    otherDestinations: 'Otros Destinos',
    otherDestinationsMessage: 'Quiero información de otros destinos',
    services: 'Servicios',
    packages: 'Paquetes Turísticos',
    flights: 'Vuelos',
    flightsMessage: 'Quiero cotizar vuelos',
    hotels: 'Hoteles',
    hotelsMessage: 'Quiero cotizar hoteles',
    tours: 'Tours',
    toursMessage: 'Quiero información de tours',
    advice: 'Asesoría Personalizada',
    adviceMessage: 'Necesito asesoría de viaje',
    contact: 'Contacto',
    whatsapp: 'WhatsApp',
    email: 'Email',
    about: 'Sobre Nosotros',
    opinions: 'Opiniones',
    terms: 'Términos',
    termsMessage: 'Quiero información sobre los términos y condiciones',
    cookies: 'Preferencias de cookies',
    rights: '© {{year}} TravelFans. Todos los derechos reservados.',
  },
  whatsappFloat: {
    label: 'Contactar por WhatsApp',
    message: '¡Hola! Quiero información sobre sus paquetes',
  },
  cookies: {
    text: 'Usamos cookies de Google Analytics para entender cómo se usa el sitio. Solo se activan si las aceptas.',
    accept: 'Aceptar',
    decline: 'Rechazar',
  },
  login: {
    title: 'Panel de Administración',
    subtitle: 'Ingresa tus credenciales para continuar',
    username: 'Usuario',
    password: 'Contraseña',
    signIn: 'Iniciar Sesión',
    signingIn: 'Verificando…',
    error: 'Usuario o contraseña incorrectos',
    locked: 'Demasiados intentos. Intenta de nuevo en {{seconds}} segundos.',
    unsupported: 'Tu navegador no permite verificar la contraseña de forma segura. Usa HTTPS o un navegador actualizado.',
    back: '← Volver al inicio',
  },
};

type Dictionary = typeof es;

const en: Dictionary = {
  nav: {
    main: 'Main navigation',
    sections: 'Sections',
    home: 'Home',
    destinations: 'Destinations',
    packages: 'Packages',
    opinions: 'Reviews',
    quote: 'Get a quote',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    quoteMessage: 'Hi! I would like a quote for a trip',
  },
  hero: {
    title: 'Your Next Adventure',
    highlight: 'Starts Here',
    subtitle: 'Peru, Colombia, Panama and Brazil are waiting for you. Get your trip quoted on WhatsApp in minutes',
    stats: {
      countries: 'Featured Countries',
      travelers: 'Happy Travelers',
      personalized: 'Personalized',
      whatsapp: 'WhatsApp',
    },
    form: {
      title: 'Get a quote for your trip',
      destination: 'Destination',
      destinationPlaceholder: 'Where do you want to go?',
      date: 'Departure date',
      travelers: 'Travelers',
      travelersOption_one: '{{count}} traveler',
      travelersOption_other: '{{count}} travelers',
      travelersOptionMax: '{{count}}+ travelers',
      submit: 'Get a quote on WhatsApp',
      datePast: 'The date cannot be earlier than today.',
    },
    message: {
      intro: 'Hi! I would like a quote for a trip with these details:',
      destination: '📍 Destination: {{value}}',
      date: '📅 Date: {{value}}',
      travelers: '👥 Travelers: {{value}}',
      undecided: 'To be decided',
    },
  },
  destinations: {
    title: 'Popular Destinations',
    subtitle: 'We connect your passion for travel with the best destinations in Latin America',
    includes: 'Includes:',
    quote: 'Get a Quote',
    reviews: '{{rating}} out of 5, {{count}} reviews',
    message: 'Hi! I would like a quote for a trip to {{name}}',
  },
  packages: {
    title: 'Travel Packages',
    subtitle: 'Packages built for every kind of traveler. Get a quote on WhatsApp',
    popular: 'Most Popular',
    askPrice: 'Ask for prices',
    viaWhatsapp: 'Quote on WhatsApp',
    quote: 'Get a quote on WhatsApp',
    message: 'Hi! I would like a quote for the {{name}} package',
  },
  testimonials: {
    title: 'Traveler Reviews',
    subtitle: 'Read about the experiences of people who already traveled with TravelFans',
    rating: '{{count}} out of 5 stars',
    ctaTitle: 'Ready for your next adventure?',
    ctaSubtitle: 'Join thousands of happy travelers and discover the world with us',
    ctaButton: 'Plan Your Trip Now',
    ctaMessage: 'Hi! I would like to plan my next trip',
  },
  carousel: {
    previous: 'Previous',
    next: 'Next',
  },
  footer: {
    description: 'Specialists in Latin American destinations. Get your dream trip quoted on WhatsApp, fast and personalized.',
    social: 'TravelFans on {{network}}',
    language: 'Language',
    destinations: 'Destinations',
    otherDestinations: 'Other Destinations',
    otherDestinationsMessage: 'I would like information about other destinations',
    services: 'Services',
    packages: 'Tour Packages',
    flights: 'Flights',
    flightsMessage: 'I would like a quote for flights',
    hotels: 'Hotels',
    hotelsMessage: 'I would like a quote for hotels',
    tours: 'Tours',
    toursMessage: 'I would like information about tours',
    advice: 'Personalized Advice',
    adviceMessage: 'I need travel advice',
    contact: 'Contact',
    whatsapp: 'WhatsApp',
    email: 'Email',
    about: 'About Us',
    opinions: 'Reviews',
    terms: 'Terms',
    termsMessage: 'I would like information about the terms and conditions',
    cookies: 'Cookie preferences',
    rights: '© {{year}} TravelFans. All rights reserved.',
  },
  whatsappFloat: {
    label: 'Contact us on WhatsApp',
    message: 'Hi! I would like information about your packages',
  },
  cookies: {
    text: 'We use Google Analytics cookies to understand how the site is used. They are only enabled if you accept them.',
    accept: 'Accept',
    decline: 'Decline',
  },
  login: {
    title: 'Admin Panel',
    subtitle: 'Enter your credentials to continue',
    username: 'Username',
    password: 'Password',
    signIn: 'Sign In',
    signingIn: 'Checking…',
    error: 'Incorrect username or password',
    locked: 'Too many attempts. Try again in {{seconds}} seconds.',
    unsupported: 'Your browser cannot verify the password securely. Use HTTPS or an up-to-date browser.',
    back: '← Back to home',
  },
};

const pt: Dictionary = {
  nav: {
    main: 'Navegação principal',
    sections: 'Seções',
    home: 'Início',
    destinations: 'Destinos',
    packages: 'Pacotes',
    opinions: 'Avaliações',
    quote: 'Cotar',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    quoteMessage: 'Olá! Quero cotar uma viagem',
  },
  hero: {
    title: 'Sua Próxima Aventura',
    highlight: 'Começa Aqui',
    subtitle: 'Peru, Colômbia, Panamá e Brasil esperam por você. Cote sua viagem pelo WhatsApp em minutos',
    stats: {
      countries: 'Países em Destaque',
      travelers: 'Viajantes Felizes',
      personalized: 'Personalizado',
      whatsapp: 'WhatsApp',
    },
    form: {
      title: 'Cote sua viagem',
      destination: 'Destino',
      destinationPlaceholder: 'Para onde você quer ir?',
      date: 'Data de partida',
      travelers: 'Viajantes',
      travelersOption_one: '{{count}} viajante',
      travelersOption_other: '{{count}} viajantes',
      travelersOptionMax: '{{count}}+ viajantes',
      submit: 'Cotar pelo WhatsApp',
      datePast: 'A data não pode ser anterior a hoje.',
    },
    message: {
      intro: 'Olá! Quero cotar uma viagem com os seguintes detalhes:',
      destination: '📍 Destino: {{value}}',
      date: '📅 Data: {{value}}',
      travelers: '👥 Viajantes: {{value}}',
      undecided: 'A definir',
    },
  },
  destinations: {
    title: 'Destinos Populares',
    subtitle: 'Conectamos sua paixão por viajar aos melhores destinos da América Latina',
    includes: 'Inclui:',
    quote: 'Cotar Agora',
    reviews: '{{rating}} de 5, {{count}} avaliações',
    message: 'Olá! Quero cotar um pacote para {{name}}',
  },
  packages: {
    title: 'Pacotes de Viagem',
    subtitle: 'Pacotes pensados para cada tipo de viajante. Cote pelo WhatsApp',
    popular: 'Mais Popular',
    askPrice: 'Consulte preços',
    viaWhatsapp: 'Cote pelo WhatsApp',
    quote: 'Cotar pelo WhatsApp',
    message: 'Olá! Quero cotar o pacote {{name}}',
  },
  testimonials: {
    title: 'Avaliações de Viajantes',
    subtitle: 'Conheça as experiências de quem já viajou com a TravelFans',
    rating: '{{count}} de 5 estrelas',
    ctaTitle: 'Pronto para sua próxima aventura?',
    ctaSubtitle: 'Junte-se a milhares de viajantes satisfeitos e descubra o mundo conosco',
    ctaButton: 'Planeje sua Viagem Agora',
    ctaMessage: 'Olá! Quero planejar minha próxima viagem',
  },
  carousel: {
    previous: 'Anterior',
    next: 'Próximo',
  },
  footer: {
    description: 'Especialistas em destinos da América Latina. Cote a viagem dos seus sonhos pelo WhatsApp de forma rápida e personalizada.',
    social: 'TravelFans no {{network}}',
    language: 'Idioma',
    destinations: 'Destinos',
    otherDestinations: 'Outros Destinos',
    otherDestinationsMessage: 'Quero informações sobre outros destinos',
    services: 'Serviços',
    packages: 'Pacotes Turísticos',
    flights: 'Voos',
    flightsMessage: 'Quero cotar voos',
    hotels: 'Hotéis',
    hotelsMessage: 'Quero cotar hotéis',
    tours: 'Passeios',
    toursMessage: 'Quero informações sobre passeios',
    advice: 'Assessoria Personalizada',
    adviceMessage: 'Preciso de assessoria de viagem',
    contact: 'Contato',
    whatsapp: 'WhatsApp',
    email: 'Email',
    about: 'Sobre Nós',
    opinions: 'Avaliações',
    terms: 'Termos',
    termsMessage: 'Quero informações sobre os termos e condições',
    cookies: 'Preferências de cookies',
    rights: '© {{year}} TravelFans. Todos os direitos reservados.',
  },
  whatsappFloat: {
    label: 'Fale conosco pelo WhatsApp',
    message: 'Olá! Quero informações sobre os pacotes',
  },
  cookies: {
    text: 'Usamos cookies do Google Analytics para entender como o site é usado. Eles só são ativados se você aceitar.',
    accept: 'Aceitar',
    decline: 'Recusar',
  },
  login: {
    title: 'Painel de Administração',
    subtitle: 'Digite suas credenciais para continuar',
    username: 'Usuário',
    password: 'Senha',
    signIn: 'Entrar',
    signingIn: 'Verificando…',
    error: 'Usuário ou senha incorretos',
    locked: 'Muitas tentativas. Tente novamente em {{seconds}} segundos.',
    unsupported: 'Seu navegador não consegue verificar a senha com segurança. Use HTTPS ou um navegador atualizado.',
    back: '← Voltar ao início',
  },
};

const LANGUAGE_KEY = 'travelfans_lang';

function savedLanguage(): string {
  try {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES.some(lang => lang.code === saved)) return saved;
  } catch {
    // Storage bloqueado: usar el idioma del navegador.
  }
  const browser = navigator.language.slice(0, 2);
  return SUPPORTED_LANGUAGES.some(lang => lang.code === browser) ? browser : 'es';
}

i18n.use(initReactI18next).init({
  resources: { es: { translation: es }, en: { translation: en }, pt: { translation: pt } },
  lng: savedLanguage(),
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false, // React ya escapa el contenido
  },
  react: {
    useSuspense: false,
  },
});

document.documentElement.lang = i18n.language;
i18n.on('languageChanged', lng => {
  document.documentElement.lang = lng;
  try {
    localStorage.setItem(LANGUAGE_KEY, lng);
  } catch {
    // Sin storage el idioma no se recuerda entre visitas.
  }
});

export default i18n;
