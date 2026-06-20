/**
 * Analytics Service
 * Handles tracking user interactions and page views
 */

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp: number;
}

export class AnalyticsService {
  private static events: AnalyticsEvent[] = [];
  private static GA_ID = import.meta.env.VITE_GA_ID || 'G-XXXXXXXXXX';

  /**
   * Initialize Google Analytics
   */
  static init(gaId: string = this.GA_ID): void {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', gaId);

    // Store GA ID
    this.GA_ID = gaId;
  }

  /**
   * Track page view
   */
  static pageView(path: string, title?: string): void {
    const event: AnalyticsEvent = {
      category: 'pageView',
      action: path,
      label: title,
      timestamp: Date.now()
    };
    this.logEvent(event);

    // Send to Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_path: path,
        page_title: title
      });
    }
  }

  /**
   * Track custom event
   */
  static trackEvent(
    category: string,
    action: string,
    label?: string,
    value?: number
  ): void {
    const event: AnalyticsEvent = {
      category,
      action,
      label,
      value,
      timestamp: Date.now()
    };
    this.logEvent(event);

    // Send to Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
  }

  /**
   * Track WhatsApp click
   */
  static trackWhatsAppClick(destination?: string): void {
    this.trackEvent('engagement', 'whatsapp_click', destination || 'general');
  }

  /**
   * Track search
   */
  static trackSearch(query: string): void {
    this.trackEvent('search', 'search_executed', query);
  }

  /**
   * Track destination view
   */
  static trackDestinationView(destination: string): void {
    this.trackEvent('engagement', 'destination_viewed', destination);
  }

  /**
   * Track carousel interaction
   */
  static trackCarouselInteraction(carouselName: string, action: string): void {
    this.trackEvent('carousel', action, carouselName);
  }

  /**
   * Track login
   */
  static trackLogin(method: string = 'email'): void {
    this.trackEvent('auth', 'login', method);
  }

  /**
   * Track logout
   */
  static trackLogout(): void {
    this.trackEvent('auth', 'logout');
  }

  /**
   * Get all tracked events
   */
  static getEvents(): AnalyticsEvent[] {
    return this.events;
  }

  /**
   * Clear events log
   */
  static clearEvents(): void {
    this.events = [];
  }

  /**
   * Log event locally
   */
  private static logEvent(event: AnalyticsEvent): void {
    this.events.push(event);
    // In production, send to backend
    console.log('[Analytics]', event);
  }

  /**
   * Get analytics summary
   */
  static getSummary(): {
    totalEvents: number;
    eventsByCategory: Record<string, number>;
    lastEvent?: AnalyticsEvent;
  } {
    const eventsByCategory: Record<string, number> = {};
    
    this.events.forEach(event => {
      eventsByCategory[event.category] = (eventsByCategory[event.category] || 0) + 1;
    });

    return {
      totalEvents: this.events.length,
      eventsByCategory,
      lastEvent: this.events[this.events.length - 1]
    };
  }
}

// Declare gtag globally
declare global {
  function gtag(...args: any[]): void;
  interface Window {
    dataLayer: any[];
  }
}
