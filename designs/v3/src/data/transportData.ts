import { BusLine, FrequentRoute, UpcomingDeparture, NetworkAlert, BusVehicle, Driver } from '../types';

export const INITIAL_FREQUENT_ROUTES: FrequentRoute[] = [
  {
    id: 'freq-1',
    origin: 'Tarragona',
    destination: 'Barcelona',
    frequency: 'Daily',
    departureTime: '09:15'
  },
  {
    id: 'freq-2',
    origin: 'Salou',
    destination: 'Reus',
    frequency: 'Workdays',
    departureTime: '18:00'
  },
  {
    id: 'freq-3',
    origin: 'Cambrils',
    destination: 'Tarragona',
    frequency: 'Daily',
    departureTime: '06:50'
  },
  {
    id: 'freq-4',
    origin: 'Aeroport Barcelona',
    destination: 'Salou',
    frequency: 'Express',
    departureTime: '11:30'
  }
];

export const UPCOMING_DEPARTURES: UpcomingDeparture[] = [
  {
    id: 'up-1',
    lineCode: 'L3',
    destination: 'Sol, Madrid',
    etaMinutes: 2,
    platform: 'Andén 1'
  },
  {
    id: 'up-2',
    lineCode: 'C1',
    destination: 'Atocha, Madrid',
    etaMinutes: 8,
    platform: 'Andén 3'
  },
  {
    id: 'up-3',
    lineCode: 'L5',
    destination: 'Moncloa, Madrid',
    etaMinutes: 15,
    platform: 'Andén 2'
  },
  {
    id: 'up-4',
    lineCode: 'E1',
    destination: 'Estació de Tarragona',
    etaMinutes: 22,
    platform: 'Andén 5'
  }
];

export const NETWORK_ALERTS: NetworkAlert[] = [
  {
    id: 'alert-1',
    title: 'Strike on Line 1 / Huelga en Línea 1',
    date: 'Oct 25',
    severity: 'warning',
    description: 'Servicios mínimos garantizados del 60% durante horas punta entre Tarragona y Reus.'
  },
  {
    id: 'alert-2',
    title: 'Holiday Schedule / Horario de Festivos',
    date: 'Nov 1',
    severity: 'info',
    description: 'Los horarios de Todos los Santos se regirán por el cuadrante de domingos y festivos.'
  },
  {
    id: 'alert-3',
    title: 'Route Changes for Summer / Ajustes de Verano',
    date: 'Jun 15 - Sep 15',
    severity: 'info',
    description: 'Refuerzo especial directo hacia Aeropuerto El Prat y playas de Salou y Cambrils.'
  }
];

export const SAMPLE_BUS_LINES: BusLine[] = [
  {
    id: 'line-302',
    lineNumber: '302',
    name: 'Tarragona a Barcelona',
    origin: 'Tarragona',
    destination: 'Barcelona (Estació Sants / Pg. Gràcia)',
    departureTime: '09:15',
    arrivalTime: '10:30',
    duration: '1h 15m',
    price: 11.20,
    type: 'EXPRESS',
    status: 'On Time',
    stopsCount: 0,
    busNumber: '302',
    driverName: 'Jordi Vila',
    driverRating: 4.8,
    driverPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    wifiAvailable: true,
    gpsVerified: true,
    stops: [
      { id: 's1', location: 'Estació d\'Autobusos Tarragona', city: 'Tarragona', time: '09:15', passed: true, isOrigin: true },
      { id: 's2', location: 'Torredembarra N-340', city: 'Torredembarra', time: '09:32', passed: true },
      { id: 's3', location: 'Sitges Centro', city: 'Sitges', time: '09:58', passed: false },
      { id: 's4', location: 'Aeroport Barcelona T1', city: 'El Prat', time: '10:15', passed: false },
      { id: 's5', location: 'Barcelona Estació Sants', city: 'Barcelona', time: '10:30', passed: false, isDestination: true }
    ]
  },
  {
    id: 'line-101',
    lineNumber: '101',
    name: 'Tarragona a Barcelona (Regular)',
    origin: 'Tarragona',
    destination: 'Barcelona',
    departureTime: '10:00',
    arrivalTime: '11:30',
    duration: '1h 30m',
    price: 9.45,
    type: 'REGULAR',
    status: 'On Time',
    stopsCount: 1,
    busNumber: '104',
    driverName: 'Marc Soler',
    driverRating: 4.9,
    driverPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    wifiAvailable: true,
    gpsVerified: true,
    stops: [
      { id: 'sr1', location: 'Tarragona Central', city: 'Tarragona', time: '10:00', passed: true, isOrigin: true },
      { id: 'sr2', location: 'Altafulla Centre', city: 'Altafulla', time: '10:18', passed: true },
      { id: 'sr3', location: 'Vilanova i la Geltrú', city: 'Vilanova', time: '10:48', passed: false },
      { id: 'sr4', location: 'Barcelona Gran Via', city: 'Barcelona', time: '11:30', passed: false, isDestination: true }
    ]
  },
  {
    id: 'line-205',
    lineNumber: '205',
    name: 'Cambrils a Tarragona',
    origin: 'Cambrils (Passeig d\'Albert I)',
    destination: 'Tarragona (Estació d\'autobusos)',
    departureTime: '06:50',
    arrivalTime: '07:35',
    duration: '45m',
    price: 3.80,
    type: 'DIRECT',
    status: 'On Time',
    stopsCount: 8,
    busNumber: '215',
    driverName: 'Maria Garcia',
    driverRating: 4.7,
    driverPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    wifiAvailable: true,
    gpsVerified: true,
    stops: [
      { id: 'c1', location: 'Cambrils, Passeig d\'Albert I, 16-21', city: 'Cambrils', time: '06:50', passed: true, isOrigin: true },
      { id: 'c2', location: 'Cambrils, Cambrils estació', city: 'Cambrils', time: '06:55', passed: true },
      { id: 'c3', location: 'Cambrils, Av. Països Catalans (Pl.Creu)', city: 'Cambrils', time: '06:56', passed: true },
      { id: 'c4', location: 'Cambrils, Av. Països Catalans (Ajuntament)', city: 'Cambrils', time: '06:56', passed: true },
      { id: 'c5', location: 'Cambrils, Av. Adelaida (Pavelló)', city: 'Cambrils', time: '06:57', passed: true },
      { id: 'c6', location: 'Cambrils, N-340 Càmping Capfun Mirmanda', city: 'Cambrils', time: '06:58', passed: true },
      { id: 'c7', location: 'Cambrils, Av. Vilafortuny, 88', city: 'Cambrils', time: '07:02', passed: false },
      { id: 'c8', location: 'Cambrils, Av. Vilafortuny (Divertipark)', city: 'Cambrils', time: '07:06', passed: false },
      { id: 'c9', location: 'Cambrils, N-340 (Pal parada Mas Gallau)', city: 'Cambrils', time: '07:07', passed: false },
      { id: 'c10', location: 'Vila-seca, Av. Ramon d\'Olzina', city: 'Vila-seca', time: '07:20', passed: false },
      { id: 'c11', location: 'Tarragona, Estació d\'autobusos', city: 'Tarragona', time: '07:35', passed: false, isDestination: true }
    ]
  },
  {
    id: 'line-308',
    lineNumber: '308',
    name: 'Tarragona a Barcelona (Delayed Service)',
    origin: 'Tarragona',
    destination: 'Barcelona',
    departureTime: '10:45',
    arrivalTime: '12:12',
    duration: '1h 15m',
    price: 11.20,
    type: 'EXPRESS',
    status: 'Delayed',
    delayMinutes: 12,
    stopsCount: 0,
    busNumber: '308',
    driverName: 'Joan Rius',
    driverRating: 4.6,
    driverPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    wifiAvailable: true,
    gpsVerified: true,
    stops: [
      { id: 'sd1', location: 'Tarragona Central', city: 'Tarragona', time: '10:57', passed: false, isOrigin: true },
      { id: 'sd2', location: 'Barcelona Estació Sants', city: 'Barcelona', time: '12:12', passed: false, isDestination: true }
    ]
  }
];

export const BUS_FLEET: BusVehicle[] = [
  {
    id: 'v-302',
    busNumber: '302',
    model: 'Scania Irizar i6S Eco-Hybrid',
    licensePlate: '4928 MKL',
    capacity: 55,
    features: ['High-Speed WiFi', 'USB Chargers', 'Wheelchair Access', 'Reclining Leather Seats', 'GPS Live Tracker'],
    status: 'In Service',
    currentRoute: 'Line 302: Tarragona -> Barcelona'
  },
  {
    id: 'v-104',
    busNumber: '104',
    model: 'Mercedes-Benz Tourismo Euro VI',
    licensePlate: '1839 LPR',
    capacity: 59,
    features: ['WiFi 5G', 'USB Chargers', 'Toilet', 'Panoramic Windows'],
    status: 'In Service',
    currentRoute: 'Line 101: Tarragona -> Barcelona'
  },
  {
    id: 'v-215',
    busNumber: '215',
    model: 'Volvo B11R Castrosua',
    licensePlate: '9012 KKN',
    capacity: 50,
    features: ['WiFi', 'Low Floor Entry', 'Air Conditioning'],
    status: 'In Service',
    currentRoute: 'Line 205: Cambrils -> Tarragona'
  },
  {
    id: 'v-401',
    busNumber: '401',
    model: 'Setra S 516 HDH Premium',
    licensePlate: '6620 MBN',
    capacity: 52,
    features: ['Premium Leather', 'Individual Screens', 'Free Drinks', 'WiFi 5G'],
    status: 'Standby'
  }
];

export const DRIVERS_LIST: Driver[] = [
  {
    id: 'd-1',
    name: 'Marc Soler',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 4.9,
    tripsCompleted: 1420,
    languages: ['ES', 'CA', 'EN'],
    assignedBus: '104',
    status: 'Active'
  },
  {
    id: 'd-2',
    name: 'Jordi Vila',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 4.8,
    tripsCompleted: 980,
    languages: ['ES', 'CA', 'FR'],
    assignedBus: '302',
    status: 'Active'
  },
  {
    id: 'd-3',
    name: 'Maria Garcia',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    rating: 4.95,
    tripsCompleted: 2150,
    languages: ['ES', 'CA', 'EN', 'FR'],
    assignedBus: '215',
    status: 'Active'
  }
];

export const CITY_LOCATIONS = [
  'Aeroport de Barcelona - El Prat (T1 / T2)',
  'Tarragona (Estació d\'autobusos)',
  'Salou (Passeig Jaume I)',
  'Cambrils (Passeig d\'Albert I)',
  'Reus (Estació d\'autobusos)',
  'Sitges (Estació)',
  'Barcelona (Estació Sants)',
  'Barcelona (Passeig de Gràcia)',
  'Vila-seca (Av. Ramon d\'Olzina)',
  'Torredembarra (N-340)'
];
