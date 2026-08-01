import React from 'react';
import { Home, Search, Ticket, User, Radio } from 'lucide-react';
import { TabView } from './Sidebar';

interface BottomNavProps {
  currentTab: TabView;
  onSelectTab: (tab: TabView) => void;
  onOpenAuth: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenAuth
}) => {
  const tabs = [
    { id: 'home' as TabView, label: 'Inicio', icon: Home },
    { id: 'search' as TabView, label: 'Buscar', icon: Search },
    { id: 'trips' as TabView, label: 'Billetes', icon: Ticket, badge: '2' },
    { id: 'live' as TabView, label: 'En Vivo', icon: Radio },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`relative flex flex-col items-center justify-center px-3 py-1.5 rounded-xl transition-all duration-200 ${
              isActive
                ? 'bg-indigo-50 text-indigo-600 font-bold'
                : 'text-slate-500 hover:text-slate-900 active:scale-95'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              {tab.badge && (
                <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 text-[9px] font-bold bg-indigo-600 text-white rounded-full">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-0.5 font-medium">
              {tab.label}
            </span>
          </button>
        );
      })}

      <button
        onClick={onOpenAuth}
        className="flex flex-col items-center justify-center px-3 py-1 text-slate-500 hover:text-slate-900 active:scale-95 transition-all"
      >
        <User className="w-5 h-5 stroke-2" />
        <span className="text-[10px] tracking-tight mt-0.5 font-medium">Perfil</span>
      </button>
    </nav>
  );
};
