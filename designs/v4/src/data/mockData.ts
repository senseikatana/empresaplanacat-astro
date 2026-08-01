import { BusRoute, Ticket, TripHistoryItem, SavedPaymentMethod, FleetAlert } from '../types';

export const INITIAL_ROUTES: BusRoute[] = [
  {
    id: 'route-next-bus-1',
    lineCode: 'Line E1.1',
    origin: 'Tarragona',
    destination: 'Barcelona',
    departureTime: '09:15',
    arrivalTime: '10:30',
    duration: '1h 15m',
    price: 11.20,
    type: 'EXPRESS',
    status: 'On Time',
    isNextBus: true,
    stopsCount: 0,
    passengerLoadPercent: 78,
    busId: 'Bus 102',
    driverName: 'Carlos M.',
    distanceKm: 98,
    stops: [
      { id: 's1', name: 'Tarragona Estació d\'Autobusos', time: '09:15', passed: true, isTerminal: true },
      { id: 's2', name: 'Torredembarra (N-340)', time: '09:30', passed: false },
      { id: 's3', name: 'El Vendrell (Av. Jaume Carner)', time: '09:48', passed: false },
      { id: 's4', name: 'Barcelona Estació del Nord', time: '10:30', passed: false, isTerminal: true },
    ]
  },
  {
    id: 'route-2',
    lineCode: 'Line 22',
    origin: 'Tarragona',
    destination: 'Barcelona',
    departureTime: '10:00',
    arrivalTime: '11:30',
    duration: '1h 30m',
    price: 9.45,
    type: 'REGULAR',
    status: 'On Time',
    stopsCount: 1,
    passengerLoadPercent: 65,
    busId: 'Bus 88',
    distanceKm: 98,
    stops: [
      { id: 's1', name: 'Tarragona Estació d\'Autobusos', time: '10:00', isTerminal: true },
      { id: 's2', name: 'Sitges Estació Central', time: '10:50' },
      { id: 's3', name: 'Barcelona Estació del Nord', time: '11:30', isTerminal: true },
    ]
  },
  {
    id: 'route-3',
    lineCode: 'Line 45',
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
    passengerLoadPercent: 92,
    busId: 'Bus 32',
    distanceKm: 98,
    stops: [
      { id: 's1', name: 'Tarragona Estació d\'Autobusos', time: '10:45 (Rev. 10:57)', isTerminal: true },
      { id: 's2', name: 'Barcelona Estació del Nord', time: '12:12', isTerminal: true },
    ]
  },
  {
    id: 'route-4',
    lineCode: 'Line 12',
    origin: 'Tarragona',
    destination: 'Barcelona',
    departureTime: '11:30',
    arrivalTime: '13:05',
    duration: '1h 35m',
    price: 9.45,
    type: 'REGULAR',
    status: 'On Time',
    stopsCount: 2,
    passengerLoadPercent: 50,
    busId: 'Bus 102',
    distanceKm: 98,
    stops: [
      { id: 's1', name: 'Tarragona Estació d\'Autobusos', time: '11:30', isTerminal: true },
      { id: 's2', name: 'Altafulla', time: '11:45' },
      { id: 's3', name: 'Vilanova i la Geltrú', time: '12:20' },
      { id: 's4', name: 'Barcelona Estació del Nord', time: '13:05', isTerminal: true },
    ]
  },
  {
    id: 'route-cambrils-tarragona',
    lineCode: 'Line L1',
    origin: 'Cambrils',
    destination: 'Tarragona',
    departureTime: '06:50',
    arrivalTime: '07:35',
    duration: '45m',
    price: 4.50,
    type: 'REGULAR',
    status: 'On Time',
    stopsCount: 9,
    passengerLoadPercent: 82,
    busId: 'Bus L1',
    distanceKm: 22,
    stops: [
      { id: 'cs1', name: 'Cambrils - Passeig d\'Albert I, 16-21 (Palmarq. Mercadillo)', time: '06:50', passed: true, isTerminal: true },
      { id: 'cs2', name: 'Cambrils - Estació d\'autobusos', time: '06:55', passed: true },
      { id: 'cs3', name: 'Cambrils - Av. Països Catalans (marq. passada Pl. Creu)', time: '06:56', passed: true },
      { id: 'cs4', name: 'Cambrils - Av. Països Catalans (Ajuntament)', time: '06:56', passed: true },
      { id: 'cs5', name: 'Cambrils - Av. Adelaida (marquesina- darrera Pavelló)', time: '06:57', passed: true },
      { id: 'cs6', name: 'Cambrils - N-340 Càmping Capfun Mirmanda, Km 1145,5 (antic Àmfora)', time: '06:58', passed: true },
      { id: 'cs7', name: 'Cambrils - Av. Vilafortuny, 88 (Urb. Els Tallats)', time: '07:02', passed: false },
      { id: 'cs8', name: 'Cambrils - Av. Vilafortuny (divertipark)', time: '07:06', passed: false },
      { id: 'cs9', name: 'Cambrils - N-340 (pal parada Mas Gallau)', time: '07:07', passed: false },
      { id: 'cs10', name: 'Vila-seca - Centre', time: '07:20', passed: false },
      { id: 'cs11', name: 'Tarragona - Estació d\'autobusos', time: '07:35', passed: false, isTerminal: true }
    ]
  },
  {
    id: 'route-reus-salou',
    lineCode: 'Line A2',
    origin: 'Reus Airport',
    destination: 'Salou',
    departureTime: '12:50',
    arrivalTime: '13:20',
    duration: '30m',
    price: 3.80,
    type: 'AIRPORT',
    status: 'On Time',
    stopsCount: 3,
    passengerLoadPercent: 40,
    busId: 'Bus 55',
    distanceKm: 14,
    stops: [
      { id: 'rs1', name: 'Reus Airport Terminal', time: '12:50', isTerminal: true },
      { id: 'rs2', name: 'Vila-seca Enllaç', time: '13:05' },
      { id: 'rs3', name: 'Salou Plaça Europa', time: '13:20', isTerminal: true }
    ]
  }
];

export const INITIAL_TICKETS: Ticket[] = [
  {
    id: 'tkt-1',
    passNumber: 'EP-9942-X0',
    lineCode: 'Line 402 - Express',
    origin: 'Downtown Central',
    destination: 'Seaside Marina',
    date: 'Oct 24, 2026',
    departureTime: '14:30 PM',
    passType: 'Line 402 - Express (1 Journey)',
    status: 'Active',
    price: 11.20,
    purchaseDate: '2026-10-23',
    qrCodeUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYyjFoSkTuVtc3Owi4_8-SPENccEWn8zDo8TMfKTxm9l6Tluj98y7AeIjfbCsMupqcPPQPGQUJ1KLNxE-qv8kQkpBTO_KS7-nUQNtCTyE06H-LWh3FYtQTK7nuNZUGKGk2gnDKMKzEyAlBBV4LkxGxuRKkbmn2YgviIxxsXNx7lZk6-P5RHcKhTFUpRWc8A1vjaW1ekLZeBf-BA0d1lajPdrhkChB4ArQjfky1lNLedH2HOKuobLO1WArD76OF3esr1QpO8RnI3fsX'
  },
  {
    id: 'tkt-2',
    passNumber: 'EP-DAY-V21',
    lineCode: 'Coastal Network',
    origin: 'All Zones (Costa Daurada)',
    destination: 'Network Pass',
    date: 'Oct 24, 2026',
    departureTime: 'Expires 23:59 PM',
    passType: 'Day Pass - All Zones',
    status: 'Active',
    price: 18.50,
    purchaseDate: '2026-10-24',
    qrCodeUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOji8YQmB5EYrRXXSOp5DxbHLIDjaCShFHc8-CFHL26OCb1A8BbNXf5Dqeu_SY2c9qbfbNzr628Y_4E-Y9wobrOtvPg2E_AJoZl--EUFj6SAP2IikM6tJcVMgohJ4j4v3G1deDJ66VJmd2nKhM_rgeMGtHIEh-1HI1quhvtJLfWhyH2l7hP3vRYdo1aRF6fnXyRGl25cIya9SEiEtVnOEdJRThP9wPG5s7y8EZeh1DKa4DXczWsIeap6Yzq5mj8U0ZQuWtWs8GRa88'
  }
];

export const INITIAL_TRIP_HISTORY: TripHistoryItem[] = [
  {
    id: 'hist-1',
    origin: 'Barcelona',
    destination: 'Tarragona',
    date: 'Yesterday, 14:30',
    time: '14:30 PM',
    price: 22.40,
    ticketsCount: 2,
    transportType: 'bus',
    status: 'Completed'
  },
  {
    id: 'hist-2',
    origin: 'Reus Airport',
    destination: 'Salou',
    date: 'Last Friday',
    time: '12:50 PM',
    price: 3.80,
    ticketsCount: 1,
    transportType: 'bus',
    status: 'Completed'
  },
  {
    id: 'hist-3',
    origin: 'Port of Call',
    destination: 'Central Square',
    date: 'Oct 20, 2026',
    time: '09:12 AM',
    price: 4.50,
    ticketsCount: 1,
    transportType: 'bus',
    status: 'Completed'
  },
  {
    id: 'hist-4',
    origin: 'Harbor Pier',
    destination: 'Island Ferry',
    date: 'Oct 15, 2026',
    time: '11:20 AM',
    price: 8.25,
    ticketsCount: 1,
    transportType: 'ferry',
    status: 'Completed'
  }
];

export const INITIAL_PAYMENT_METHODS: SavedPaymentMethod[] = [
  {
    id: 'pay-1',
    type: 'visa',
    last4: '4291',
    expiry: '09/28',
    isDefault: true
  },
  {
    id: 'pay-2',
    type: 'apple_pay',
    isDefault: false
  }
];

export const INITIAL_FLEET_ALERTS: FleetAlert[] = [
  {
    id: 'alt-1',
    severity: 'critical',
    title: 'Traffic congestion near Port de Mar',
    description: 'Line 45 experiencing 12 to 15 minute delays due to road maintenance.',
    time: '10 min ago',
    affectedLine: 'Line 45'
  },
  {
    id: 'alt-2',
    severity: 'warning',
    title: 'High passenger capacity expected',
    description: 'Reus Airport shuttle line reaching 95% capacity on afternoon departures.',
    time: '25 min ago',
    affectedLine: 'Line A2'
  },
  {
    id: 'alt-3',
    severity: 'info',
    title: 'Weather Advisory: Coastal Winds',
    description: 'All coastal drivers advised to reduce speed near N-340 Cambrils sector.',
    time: '1 hour ago'
  }
];

export const DEMO_MAP_IMAGES = {
  coastalMap: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXF5ahflUVV8i-2l1V7TYDkKEFBkOu8wiHiDpNSrTWb--Ml1eWU1_uC4BAWEEltPO2l_vxsD9oKiiVZSDRMxQtmIWFQJnPk5vI9sJ-zzy_ERMrQxEyP0fl0yuig3fiK5oVw8U-IekPz8qRFV6N6oqQm_HJrrn4qspwsmhV2JMvpRAX5g6lzaFQLBCi1cI_zMrpp5XzOSeGAarNdebIyJUAa3lTJRZkatZ_EFw91-hPRDNiSdUv9jE0zut2iSx5zvnsLGi9QCElVtgN',
  liveMap: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDADA6qc-HVnCll5xD1YwdJSAA80-_aHvHW3og6mQ6stv0Fxu5CvMKVjEGU7n8-bQANrQnMIG5vOFPRw-f9wGASFdn5obQyp3V_VL2xV0CoYi9hkwM1l8rgDO5GwbbiWsr0Kpn5uPKLhhgzztUuZbxfksdcF7v0Y12_Mk-7AlsptxbgNprEi-9BYzpoqAU0CunzdFwFJj60NLLO7IWtHf_09d0WNVEOEnEibHiL0Iz9XoN9F_t5SfFOohgtZTYdrL-0KIpwwHo9cUhn',
  avatarMateo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyAfX3TGeSA7BdmyrZx1o7kaY1TtP5XE8N1ODAPUIQSCsLT_UglXpCNf6CfklOwB_6dI-daXs1oENFHOiNGjpGcxJU1AMPVmSPNgH8_I3o5i5aGlu3Sfb0hHf7vhcOFQUVtJz4R68Coz8rXMT9hdNYGHgY3iKAL9RIcM1UfgfxRWvoNNvCTkbkJtn-eeu1E3jk8AC_fb_MaWv5SN_m6Q7zx0nfSlQb7O6w_GhCnOSAi5i43M1LpcnK63M_3_jwDifA4A26ZQEfGdfg',
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCt19aK9nCCEE_IUszoMvR0R7bEhKK-XO-4dVCD5kgJSOlJ2mV-AAW8Qio2eMs54NDQ3RuoOjqc9KaIP3-2I53zAKmMWsp_eTyn3mvfwrCni9OZzUR8fr9z2I94-mDB4FAFG4mV6v1sfVYT_9I-EHsJ5UQjEkg8BGmH18ICuspvJNOhG8KzPcewscnC-zLldTeDM_qrvmPdOiD7jmOUIVeVkJijKNY_ygnSzCV9kfx3HKAAcM3UuY_ZYlYrdiT-m4y5n8zZVqbHzO_h'
};
