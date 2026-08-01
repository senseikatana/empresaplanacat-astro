export type ViewMode =
  | 'home'
  | 'search-results'
  | 'route-details'
  | 'checkout'
  | 'driver-profile'
  | 'driver-dashboard'
  | 'fleet-manager'
  | 'user-auth'
  | 'employee-auth';

export type UserRole = 'passenger' | 'driver' | 'staff' | 'manager';

export type Language = 'ES' | 'CA' | 'EN' | 'FR';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole;
  photoURL?: string | null;
}

export interface BusRoute {
  id: string;
  number: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  status: 'On Time' | 'Delayed' | 'Cancelled';
  delayMinutes?: number;
  price: number;
}

export interface RouteStop {
  id: string;
  name: string;
  time: string;
  isMainStation?: boolean;
}

export interface IncidentReport {
  id?: string;
  title: string;
  description: string;
  routeId: string;
  busId: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  reportedBy: string;
  createdAt: string;
}

export interface CompanyAnnouncement {
  id: string;
  title: string;
  date: string;
  content: string;
}

export interface BusNode {
  id: string;
  label: string;
  route: string;
  top: string; // percentage
  left: string; // percentage
  status: 'active' | 'delayed' | 'warning';
  capacityPct: number;
}
