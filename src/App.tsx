/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { ViewMode, BusRoute } from './types';

// Views
import { HomeView } from './views/HomeView';
import { SearchResultsView } from './views/SearchResultsView';
import { RouteDetailsView } from './views/RouteDetailsView';
import { CheckoutView } from './views/CheckoutView';
import { DriverProfileView } from './views/DriverProfileView';
import { DriverDashboardView } from './views/DriverDashboardView';
import { FleetManagerView } from './views/FleetManagerView';
import { UserAuthView } from './views/UserAuthView';
import { EmployeeAuthView } from './views/EmployeeAuthView';

function AppContent() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [navigationHistory, setNavigationHistory] = useState<ViewMode[]>(['home']);

  const handleNavigate = (newView: ViewMode) => {
    if (newView !== currentView) {
      setNavigationHistory((prev) => [...prev, newView]);
      setCurrentView(newView);
    }
  };

  const handleBack = () => {
    if (navigationHistory.length > 1) {
      const updated = [...navigationHistory];
      updated.pop();
      const prevView = updated[updated.length - 1];
      setNavigationHistory(updated);
      setCurrentView(prevView);
    } else {
      setCurrentView('home');
    }
  };

  const isDetailView = currentView !== 'home';

  const viewTitles: Record<ViewMode, string> = {
    'home': '',
    'search-results': 'Bus Search Results',
    'route-details': 'Route Details',
    'checkout': 'Checkout',
    'driver-profile': 'Driver Profile',
    'driver-dashboard': 'Portal Conductor',
    'fleet-manager': 'Fleet Manager',
    'user-auth': 'User Login & Registration',
    'employee-auth': 'Employee Login'
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-blue-500 selection:text-white pb-16">
      {/* Top App Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenSidebar={() => setIsSidebarOpen(true)}
        title={viewTitles[currentView]}
        showBack={isDetailView}
        onBack={handleBack}
        showShare={currentView === 'route-details'}
      />

      {/* Side Navigation Drawer */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      {/* Animated View Viewport */}
      <main className="flex-1 w-full max-w-4xl mx-auto py-2 px-1 sm:px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {currentView === 'home' && (
              <HomeView onNavigate={handleNavigate} />
            )}

            {currentView === 'search-results' && (
              <SearchResultsView
                onNavigate={handleNavigate}
                onSelectRoute={setSelectedRoute}
              />
            )}

            {currentView === 'route-details' && (
              <RouteDetailsView
                onNavigate={handleNavigate}
                selectedRoute={selectedRoute}
              />
            )}

            {currentView === 'checkout' && (
              <CheckoutView
                onNavigate={handleNavigate}
                selectedRoute={selectedRoute}
              />
            )}

            {currentView === 'driver-profile' && (
              <DriverProfileView onNavigate={handleNavigate} />
            )}

            {currentView === 'driver-dashboard' && (
              <DriverDashboardView onNavigate={handleNavigate} />
            )}

            {currentView === 'fleet-manager' && (
              <FleetManagerView onNavigate={handleNavigate} />
            )}

            {currentView === 'user-auth' && (
              <UserAuthView onNavigate={handleNavigate} />
            )}

            {currentView === 'employee-auth' && (
              <EmployeeAuthView onNavigate={handleNavigate} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Floating Navigation */}
      <BottomNav currentView={currentView} onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}
