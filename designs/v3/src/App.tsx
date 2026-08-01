import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { Sidebar } from './components/Navigation/Sidebar';
import { MobileBottomBar } from './components/Navigation/MobileBottomBar';
import { Header } from './components/Navigation/Header';
import { OverviewView } from './components/Views/OverviewView';
import { ActiveRoutesView } from './components/Views/ActiveRoutesView';
import { SearchRoutesView } from './components/Views/SearchRoutesView';
import { RouteDetailsView } from './components/Views/RouteDetailsView';
import { FleetView } from './components/Views/FleetView';
import { DriversView } from './components/Views/DriversView';
import { AlertsView } from './components/Views/AlertsView';
import { ProfileView } from './components/Views/ProfileView';
import { AuthModal } from './components/Modals/AuthModal';
import { TicketModal } from './components/Modals/TicketModal';
import { BusLine, ViewMode } from './types';

function AppContent() {
  const [currentView, setCurrentView] = useState<ViewMode>('overview');
  const [selectedLine, setSelectedLine] = useState<BusLine | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [activeTicketLine, setActiveTicketLine] = useState<BusLine | null>(null);

  const handleSelectLine = (line: BusLine) => {
    setSelectedLine(line);
    setCurrentView('route-details');
  };

  const handleOpenTicketModal = (line: BusLine) => {
    setActiveTicketLine(line);
    setTicketModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-[#09090b] text-slate-200 overflow-hidden font-sans">
      {/* Desktop Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        onSelectView={(view) => {
          setSelectedLine(null);
          setCurrentView(view);
        }}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        <Header
          currentView={currentView}
          onOpenAuth={() => setAuthModalOpen(true)}
          onSelectView={(view) => setCurrentView(view)}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView + (selectedLine ? selectedLine.id : '')}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {currentView === 'overview' && (
                  <OverviewView
                    onSelectLine={handleSelectLine}
                    onNavigateToView={(view) => setCurrentView(view)}
                    onOpenTicketModal={handleOpenTicketModal}
                  />
                )}

                {currentView === 'active-routes' && (
                  <ActiveRoutesView
                    onOpenTicketModal={handleOpenTicketModal}
                  />
                )}

                {currentView === 'search' && (
                  <SearchRoutesView
                    onSelectLine={handleSelectLine}
                    onOpenTicketModal={handleOpenTicketModal}
                  />
                )}

                {currentView === 'route-details' && (
                  <RouteDetailsView
                    line={selectedLine}
                    onBack={() => setCurrentView('search')}
                    onOpenTicketModal={handleOpenTicketModal}
                  />
                )}

                {currentView === 'fleet' && <FleetView />}

                {currentView === 'drivers' && <DriversView />}

                {currentView === 'alerts' && <AlertsView />}

                {currentView === 'settings' && (
                  <ProfileView onOpenAuth={() => setAuthModalOpen(true)} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Mobile Bottom Navigation Bar */}
        <MobileBottomBar
          currentView={currentView}
          onSelectView={(view) => {
            setSelectedLine(null);
            setCurrentView(view);
          }}
          onOpenAuth={() => setAuthModalOpen(true)}
        />
      </div>

      {/* Firebase Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Digital Ticket Modal */}
      <TicketModal
        isOpen={ticketModalOpen}
        line={activeTicketLine}
        onClose={() => setTicketModalOpen(false)}
      />
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
