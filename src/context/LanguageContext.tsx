import React, { createContext, useContext, useState } from 'react';
import { Language } from '../types';

type Translations = Record<string, Record<Language, string>>;

const dictionary: Translations = {
  // Navigation & General
  'search_schedules': {
    ES: 'Buscar Horarios y Rutas',
    CA: 'Cercar Horaris i Rutes',
    EN: 'Search Schedules & Routes',
    FR: 'Rechercher des Horaires et Itinéraires'
  },
  'checkout': {
    ES: 'Confirmación de Pago',
    CA: 'Confirmació de Pagament',
    EN: 'Checkout',
    FR: 'Paiement'
  },
  'payment_method': {
    ES: 'Método de Pago',
    CA: 'Mètode de Pagament',
    EN: 'Payment Method',
    FR: 'Moyen de Paiement'
  },
  'card': {
    ES: 'Tarjeta de Débito/Crédito',
    CA: 'Targeta de Dèbit/Crèdit',
    EN: 'Debit/Credit Card',
    FR: 'Carte de Débit/Crédit'
  },
  'confirm_payment': {
    ES: 'Confirmar Pago',
    CA: 'Confirmar Pagament',
    EN: 'Confirm Payment',
    FR: 'Confirmer el Paiement'
  },
  'driver_profile': {
    ES: 'Perfil del Conductor',
    CA: 'Perfil del Conductor',
    EN: 'Driver Profile',
    FR: 'Profil del Chauffeur'
  },
  'say_thanks': {
    ES: 'Dar las Gracias',
    CA: 'Donar les Gràcies',
    EN: 'Say Thanks',
    FR: 'Dire Merci'
  },
  'report_issue': {
    ES: 'Reportar Incidencia',
    CA: 'Reportar Incidència',
    EN: 'Report Issue',
    FR: 'Signaler un Problème'
  },
  'fleet_manager': {
    ES: 'Gestor de Flota',
    CA: 'Gestor de Flota',
    EN: 'Fleet Manager',
    FR: 'Gestionnaire de Flotte'
  },
  'active_buses': {
    ES: 'Autobuses Activos',
    CA: 'Autobusos Actius',
    EN: 'Active Buses',
    FR: 'Bus Actifs'
  },
  'drivers_duty': {
    ES: 'Conductores en Servicio',
    CA: 'Conductors en Servei',
    EN: 'Drivers on Duty',
    FR: 'Chauffeurs en Service'
  },
  'system_alerts': {
    ES: 'Alertas del Sistema',
    CA: 'Alertes del Sistema',
    EN: 'System Alerts',
    FR: 'Alertes Système'
  },
  'next_shift': {
    ES: 'Próximo Turno',
    CA: 'Pròxim Torn',
    EN: 'Next Shift',
    FR: 'Prochain Poste'
  },
  'passenger_log': {
    ES: 'Registro de Pasajeros',
    CA: 'Registre de Passatgers',
    EN: 'Passenger Log',
    FR: 'Registre de Passagers'
  },
  'announcements': {
    ES: 'Anuncios de la Empresa',
    CA: 'Anuncis de l\'Empresa',
    EN: 'Company Announcements',
    FR: 'Annonces de l\'Entreprise'
  },
  'no_online_booking': {
    ES: 'Sin reserva online: compra tus billetes en taquillas o a bordo.',
    CA: 'Sense reserva en línia: compra els billets a taquilla o a bord.',
    EN: 'No online booking - Purchase tickets at ticket offices or on-board.',
    FR: 'Pas de réservation en ligne - Achetez vos billets al guichet ou à bord.'
  },
  'frequent_routes': {
    ES: 'Mis Rutas Frecuentes',
    CA: 'Les meves Rutes Freqüents',
    EN: 'My Frequent Routes',
    FR: 'Mes Itinéraires Fréquents'
  },
  'network_updates': {
    ES: 'Últimas Novedades de la Red',
    CA: 'Últimes Novetats de la Xarxa',
    EN: 'Latest Network Updates',
    FR: 'Dernières Mises à Jour du Réseau'
  },
  'employee_login': {
    ES: 'Acceso Empleados',
    CA: 'Accés Empleats',
    EN: 'Employee Login',
    FR: 'Connexion Employé'
  },
  'select_role': {
    ES: 'Seleccionar Rol',
    CA: 'Seleccionar Rol',
    EN: 'Select Role',
    FR: 'Sélectionner le Rôle'
  },
  'driver': {
    ES: 'Conductor',
    CA: 'Conductor',
    EN: 'Driver',
    FR: 'Conducteur'
  },
  'station_staff': {
    ES: 'Personal de Estación',
    CA: 'Personal d\'Estació',
    EN: 'Station Staff',
    FR: 'Personnel de Gare'
  },
  'manager': {
    ES: 'Gestor / Director',
    CA: 'Gestor / Director',
    EN: 'Manager',
    FR: 'Gestionnaire'
  },
  'user_login': {
    ES: 'Iniciar Sesión y Registro',
    CA: 'Iniciar Sessió i Registre',
    EN: 'User Login & Registration',
    FR: 'Connexion & Inscription'
  }
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
    if (dictionary[key] && dictionary[key][language]) {
      return dictionary[key][language];
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
