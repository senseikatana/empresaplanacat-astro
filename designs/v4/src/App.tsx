import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AuthProvider } from './context/AuthContext';
import { TopHeader } from './components/Navigation/TopHeader';
import { Sidebar, TabView } from './components/Navigation/Sidebar';
import { BottomNav } from './components/Navigation/BottomNav';
import { AuthModal } from './components/AuthModal';
import { QRModal } from './components/QRModal';

import { HomeView } from './views/HomeView';
import { SearchResultsView } from './views/SearchResultsView';
import { RouteDetailsView } from './views/RouteDetailsView';
import { MyTripsView } from './views/MyTripsView';
import { LiveTrackingView } from './views/LiveTrackingView';
import { StaffDashboardView } from './views/StaffDashboardView';

import { 
  BusRoute, 
  Ticket, 
  TripHistoryItem 
} from './types';
import { 
  INITIAL_ROUTES, 
  INITIAL_TICKETS, 
  INITIAL_TRIP_HISTORY 
} from './data/mockData';

function MainAppContent() {
  const [currentTab, setCurrentTab] = useState<TabView>('home');
  const [routes, setRoutes] = useState<BusRoute[]>(INITIAL_ROUTES);
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [history] = useState<TripHistoryItem[]>(INITIAL_TRIP_HISTORY);

  // Router sub-state
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const [searchParams, setSearchParams] = useState({
    origin: 'Barcelona Estació del Nord',
    destination: 'Tarragona Estació d\'Autobusos',
    date: '2026-10-24'
  });

  // Modal states
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeQRTicket, setActiveQRTicket] = useState<Ticket | null>(null);

  // Booking action: Creates a ticket and redirects to My Trips
  const handleBookRoute = (route: BusRoute) => {
    const newTicket: Ticket = {
      id: `tkt-${Date.now()}`,
      passNumber: `EP-${Math.floor(1000 + Math.random() * 9000)}-${route.lineCode.replace(/[^A-Z0-0]/gi, '')}`,
      lineCode: route.lineCode,
      origin: route.origin,
      destination: route.destination,
      date: 'Oct 24, 2026',
      departureTime: `${route.departureTime} PM`,
      passType: `${route.lineCode} (${route.type})`,
      status: 'Active',
      price: route.price,
      purchaseDate: new Date().toISOString().split('T')[0],
      qrCodeUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYyjFoSkTuVtc3Owi4_8-SPENccEWn8zDo8TMfKTxm9l6Tluj98y7AeIjfbCsMupqcPPQPGQUJ1KLNxE-qv8kQkpBTO_KS7-nUQNtCTyE06H-LWh3FYtQTK7nuNZUGKGk2gnDKMKzEyAlBBV4LkxGxuRKkbmn2YgviIxxsXNx7lZk6-P5RHcKhTFUpRWc8A1vjaW1ekLZeBf-BA0d1lajPdrhkChB4ArQjfky1lNLedH2HOKuobLO1WArD76OF3esr1QpO8RnI3fsX'
    };

    setTickets([newTicket, ...tickets]);
    setActiveQRTicket(newTicket);
    setCurrentTab('trips');
  };

  const handleSearchRoutes = (origin: string, destination: string, date: string) => {
    setSearchParams({ origin, destination, date });
    setCurrentTab('search');
  };

  const handleSelectRoute = (route: BusRoute) => {
    setSelectedRoute(route);
    setCurrentTab('route-details');
  };

  const currentRouteTitle = 
    currentTab === 'home' ? 'Inicio' :
    currentTab === 'search' ? 'Resultados de Búsqueda' :
    currentTab === 'trips' ? 'Mis Billetes y Perfil' :
    currentTab === 'live' ? 'Seguimiento en Tiempo Real' :
    currentTab === 'staff' ? 'Panel de Control Staff' :
    currentTab === 'route-details' && selectedRoute ? `${selectedRoute.origin} - ${selectedRoute.destination}` : '';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased transition-colors">
      {/* Responsive Sidebar for desktop & drawer for mobile */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          if (tab !== 'route-details') setSelectedRoute(null);
        }}
        isOpenMobile={isSidebarMobileOpen}
        onCloseMobile={() => setIsSidebarMobileOpen(false)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Layout Wrap with Left Margin on Desktop for Sidebar */}
      <div className="lg:pl-64 flex-1 flex flex-col min-w-0">
        <TopHeader
          onOpenSidebar={() => setIsSidebarMobileOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          currentRouteName={currentRouteTitle}
          onBack={
            currentTab === 'route-details' || currentTab === 'search'
              ? () => {
                  if (currentTab === 'route-details') setCurrentTab('search');
                  else setCurrentTab('home');
                }
              : undefined
          }
        />

        {/* View Transitions Container */}
        <main className="flex-1 px-4 md:px-8 py-6 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab + (selectedRoute?.id || '')}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {currentTab === 'home' && (
                <HomeView
                  routes={routes}
                  onSearchRoutes={handleSearchRoutes}
                  onSelectRoute={handleSelectRoute}
                  onViewLiveMap={() => setCurrentTab('live')}
                  onViewTrips={() => setCurrentTab('trips')}
                />
              )}

              {currentTab === 'search' && (
                <SearchResultsView
                  routes={routes}
                  searchOrigin={searchParams.origin}
                  searchDestination={searchParams.destination}
                  searchDate={searchParams.date}
                  onSelectRoute={handleSelectRoute}
                  onBookRoute={handleBookRoute}
                  onViewLiveMap={() => setCurrentTab('live')}
                  onBack={() => setCurrentTab('home')}
                />
              )}

              {currentTab === 'route-details' && selectedRoute && (
                <RouteDetailsView
                  route={selectedRoute}
                  onBack={() => setCurrentTab('search')}
                  onBook={handleBookRoute}
                />
              )}

              {currentTab === 'trips' && (
                <MyTripsView
                  tickets={tickets}
                  history={history}
                  onOpenQR={(tkt) => setActiveQRTicket(tkt)}
                  onOpenAuth={() => setIsAuthOpen(true)}
                />
              )}

              {currentTab === 'live' && (
                <LiveTrackingView />
              )}

              {currentTab === 'staff' && (
                <StaffDashboardView routes={routes} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Mobile Bottom Navigation Bar */}
        <BottomNav
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            if (tab !== 'route-details') setSelectedRoute(null);
          }}
          onOpenAuth={() => setIsAuthOpen(true)}
        />
      </div>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <QRModal
        ticket={activeQRTicket}
        onClose={() => setActiveQRTicket(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
