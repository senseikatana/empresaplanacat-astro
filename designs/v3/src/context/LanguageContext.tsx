import React, { createContext, useContext, useState } from 'react';
import { Language } from '../types';

type Translations = Record<string, Record<Language, string>>;

const TRANSLATIONS: Translations = {
  // Navigation
  navOverview: { ES: 'Visión General', CA: 'Visió General', EN: 'Overview', FR: 'Aperçu' },
  navActiveRoutes: { ES: 'Rutas Activas', CA: 'Rutes Actives', EN: 'Active Routes', FR: 'Lignes Actives' },
  navSearch: { ES: 'Buscador de Líneas', CA: 'Buscador de Línies', EN: 'Search Lines', FR: 'Recherche de Lignes' },
  navFleet: { ES: 'Flota de Autobuses', CA: 'Flota d\'Autobusos', EN: 'Fleet', FR: 'Flotte d\'Autobus' },
  navDrivers: { ES: 'Conductores', CA: 'Conductors', EN: 'Drivers', FR: 'Conducteurs' },
  navAlerts: { ES: 'Broadcast y Avisos', CA: 'Avisos i Comunicats', EN: 'Broadcast & Alerts', FR: 'Alertes' },
  navSettings: { ES: 'Perfil y Ajustes', CA: 'Perfil i Ajustos', EN: 'Profile & Settings', FR: 'Profil et Réglages' },

  // Search Box
  searchHeader: { ES: 'BUSCADOR DE LÍNEAS', CA: 'BUSCADOR DE LÍNIES', EN: 'LINE SEARCH', FR: 'RECHERCHE DE LIGNES' },
  originLabel: { ES: 'LOCALIDAD DE ORIGEN', CA: 'LOCALITAT D\'ORIGEN', EN: 'ORIGIN LOCATION', FR: 'LIEU DE DÉPART' },
  destinationLabel: { ES: 'LOCALIDAD DE DESTINO', CA: 'LOCALITAT DE DESTI', EN: 'DESTINATION LOCATION', FR: 'LIEU D\'ARRIVÉE' },
  dateLabel: { ES: 'FECHA', CA: 'DATA', EN: 'DATE', FR: 'DATE' },
  timeLabel: { ES: 'HORARIO', CA: 'HORARI', EN: 'TIME', FR: 'HORAIRE' },
  searchTypeLabel: { ES: 'TIPO DE BÚSQUEDA', CA: 'TIPUS DE CERCA', EN: 'SEARCH TYPE', FR: 'TYPE DE RECHERCHE' },
  anytimeOption: { ES: 'Cualquier hora', CA: 'Qualsevol hora', EN: 'Any time', FR: 'N\'importe quelle heure' },
  directRoutesOption: { ES: 'Rutas directas', CA: 'Rutes directes', EN: 'Direct routes', FR: 'Lignes directes' },
  allRoutesOption: { ES: 'Todas las rutas', CA: 'Totes les rutes', EN: 'All routes', FR: 'Toutes les lignes' },
  searchButton: { ES: 'Buscar Horarios', CA: 'Cercar Horaris', EN: 'Search Schedules', FR: 'Chercher Horaires' },

  // Homepage sections
  frequentRoutesTitle: { ES: 'Mis Rutas Frecuentes', CA: 'Les Meves Rutes Freqüents', EN: 'My Frequent Routes', FR: 'Mes Trajets Fréquents' },
  upcomingDeparturesTitle: { ES: 'Próximas Salidas', CA: 'Properes Sortides', EN: 'Upcoming Departures', FR: 'Prochains Départs' },
  networkAlertsTitle: { ES: 'Últimas Novedades de la Red', CA: 'Últimes Novetats de la Xarxa', EN: 'Latest Network Updates', FR: 'Dernières Nouvelles du Réseau' },
  nearbyStopsTitle: { ES: 'Paradas Cercanas', CA: 'Parades Properes', EN: 'Nearby Bus Stops', FR: 'Arrêts Proches' },
  howToBuyTitle: { ES: 'Cómo comprar billetes', CA: 'Com comprar bitllets', EN: 'How to buy tickets', FR: 'Comment acheter des billets' },
  howToBuyDesc: { 
    ES: 'Puedes adquirir tus billetes directamente al conductor o en las taquillas de las estaciones. ¡O compra tu billete digital aquí!', 
    CA: 'Pots adquirir els teus bitllets directament al conductor o a les taquilles de les estacions. O compra el teu bitllet digital aquí!', 
    EN: 'You can purchase tickets directly from the driver, at station ticket offices, or buy a digital ticket here!', 
    FR: 'Vous pouvez acheter vos billets directement auprès du chauffeur, aux guichets des gares, ou acheter votre billet numérique ici!' 
  },
  noOnlineBookingNotice: { 
    ES: 'Compre billetes en taquillas, a bordo o reserve su billete digital instantáneo.', 
    CA: 'Compri bitllets a taquilles, a bord o reservi el seu bitllet digital instantani.', 
    EN: 'Purchase tickets at station offices, on-board, or reserve your instant digital ticket.', 
    FR: 'Achetez vos billets aux guichets, a bord, ou réservez votre billet numérique instantané.' 
  },

  // Active Map
  liveTracking: { ES: 'Seguimiento en Vivo', CA: 'Seguiment en Viu', EN: 'Live Tracking', FR: 'Suivi en Direct' },
  bus5MinsAway: { ES: 'Tu autobús está a 5 minutos', CA: 'El teu autobús està a 5 minuts', EN: 'Your bus is 5 mins away', FR: 'Votre bus est à 5 minutes' },
  busNumberLabel: { ES: 'Número de autobús', CA: 'Número d\'autobús', EN: 'Bus Number', FR: 'Numéro del bus' },
  driverLabel: { ES: 'Conductor', CA: 'Conductor', EN: 'Driver', FR: 'Chauffeur' },
  paymentOptionsTitle: { ES: 'Opciones de Pago', CA: 'Opcions de Pagament', EN: 'Payment Options', FR: 'Options de Paiement' },
  buyDigitalTicket: { ES: 'Comprar Billete Digital', CA: 'Comprar Bitllet Digital', EN: 'Buy Digital Ticket', FR: 'Acheter Billet Numérique' },
  contactStation: { ES: 'Contactar Estación', CA: 'Contactar Estació', EN: 'Contact Station', FR: 'Contacter la Gare' },

  // Route Details
  routeDetailsTitle: { ES: 'Detalles de la Ruta', CA: 'Detalls de la Ruta', EN: 'Route Details', FR: 'Détails du Trajet' },
  saveOfflineSchedule: { ES: 'Guardar horario offline', CA: 'Guardar horari offline', EN: 'Save offline schedule', FR: 'Enregistrer l\'horaire hors ligne' },
  offlineSavedToast: { ES: 'Horario guardado offline', CA: 'Horari guardat offline', EN: 'Schedule saved offline', FR: 'Horaire enregistré' },
  viewRouteMap: { ES: 'Ver Ruta', CA: 'Veure Ruta', EN: 'View Route', FR: 'Voir le Trajet' },
  downloadSchedule: { ES: 'Descargar Horario', CA: 'Descarregar Horari', EN: 'Download Schedule', FR: 'Télécharger Horaire' },

  // Auth & Profile
  loginTitle: { ES: 'Iniciar Sesión', CA: 'Iniciar Sessió', EN: 'Sign In', FR: 'Se Connecter' },
  registerTitle: { ES: 'Crear Cuenta', CA: 'Crear Compte', EN: 'Sign Up', FR: 'S\'inscrire' },
  guestTitle: { ES: 'Continuar como Invitado', CA: 'Continuar com a Convidat', EN: 'Continue as Guest', FR: 'Continuer en Invité' },
  myTickets: { ES: 'Mis Billetes Comprados', CA: 'Els Meus Bitllets Comprats', EN: 'My Purchased Tickets', FR: 'Mes Billets Achetés' },
  logoutBtn: { ES: 'Cerrar Sesión', CA: 'Tancar Sessió', EN: 'Log Out', FR: 'Déconnexion' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ES');

  const t = (key: string): string => {
    if (TRANSLATIONS[key] && TRANSLATIONS[key][language]) {
      return TRANSLATIONS[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
