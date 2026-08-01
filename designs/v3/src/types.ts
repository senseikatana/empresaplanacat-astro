export type Language = 'ES' | 'CA' | 'EN' | 'FR';

export type ViewMode = 
  | 'overview' 
  | 'active-routes' 
  | 'search' 
  | 'route-details' 
  | 'fleet' 
  | 'drivers' 
  | 'alerts' 
  | 'settings';

export interface RouteStop {
  id: string;
  time: string;
  location: string;
  city: string;
  passed: boolean;
  isOrigin?: boolean;
  isDestination?: boolean;
}

export interface BusLine {
  id: string;
  lineNumber: string;
  name: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  type: 'EXPRESS' | 'REGULAR' | 'DIRECT';
  status: 'On Time' | 'Delayed' | 'Departed';
  delayMinutes?: number;
  stopsCount: number;
  busNumber: string;
  driverName: string;
  driverRating: number;
  driverPhoto: string;
  wifiAvailable: boolean;
  gpsVerified: boolean;
  stops: RouteStop[];
}

export interface FrequentRoute {
  id: string;
  origin: string;
  destination: string;
  frequency: string;
  departureTime: string;
}

export interface UpcomingDeparture {
  id: string;
  lineCode: string;
  destination: string;
  etaMinutes: number;
  platform: string;
}

export interface NetworkAlert {
  id: string;
  title: string;
  date: string;
  severity: 'info' | 'warning' | 'error';
  description: string;
}

export interface DigitalTicket {
  id: string;
  userId: string;
  lineId: string;
  origin: string;
  destination: string;
  date: string;
  departureTime: string;
  seatNumber?: string;
  passengerName: string;
  price: number;
  paymentMethod: 'Tarjeta' | 'PayPal' | 'Bizum' | 'ATM Card';
  qrCode: string;
  createdAt: string;
  status: 'valid' | 'used' | 'cancelled';
}

export interface BusVehicle {
  id: string;
  busNumber: string;
  model: string;
  licensePlate: string;
  capacity: number;
  features: string[];
  status: 'In Service' | 'Maintenance' | 'Standby';
  currentRoute?: string;
}

export interface Driver {
  id: string;
  name: string;
  photo: string;
  rating: number;
  tripsCompleted: number;
  languages: string[];
  assignedBus: string;
  status: 'Active' | 'On Break' | 'Off Duty';
}
