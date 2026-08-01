export type RouteStatus = 'On Time' | 'Delayed' | 'Cancelled' | 'High Capacity';

export interface BusStop {
  id: string;
  name: string;
  time: string;
  passed?: boolean;
  isTerminal?: boolean;
  locationDetails?: string;
}

export interface BusRoute {
  id: string;
  lineCode: string; // e.g. 'Line E1.1', 'Line 45'
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  type: 'EXPRESS' | 'REGULAR' | 'AIRPORT' | 'NIGHT';
  status: RouteStatus;
  delayMinutes?: number;
  isNextBus?: boolean;
  stopsCount: number;
  stops: BusStop[];
  passengerLoadPercent: number; // e.g. 75
  busId?: string;
  driverName?: string;
  distanceKm?: number;
}

export interface Ticket {
  id: string;
  passNumber: string;
  lineCode: string;
  origin: string;
  destination: string;
  date: string;
  departureTime: string;
  passType: string; // e.g., '1 Journey', 'Day Pass - All Zones'
  status: 'Active' | 'Used' | 'Expired';
  qrCodeUrl?: string;
  price: number;
  purchaseDate: string;
}

export interface TripHistoryItem {
  id: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  price: number;
  ticketsCount: number;
  transportType: 'bus' | 'train' | 'ferry';
  status: 'Completed' | 'Cancelled';
}

export interface SavedPaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'apple_pay';
  last4?: string;
  expiry?: string;
  isDefault?: boolean;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  membershipTier: string; // e.g., 'Gold Member'
  points: number;
  isStaff?: boolean;
  savedOfflineRoutes: string[]; // route IDs
  favoriteRouteIds: string[];
}

export interface FleetAlert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  time: string;
  affectedLine?: string;
}
