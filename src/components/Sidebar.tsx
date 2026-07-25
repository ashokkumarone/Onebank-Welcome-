import React from 'react';
import { SidebarTab } from '../types';
import { 
  Building2, 
  Users, 
  Landmark, 
  Headphones, 
  BarChart3, 
  TrendingUp, 
  UserCheck, 
  LogOut,
  ChevronRight,
  ShieldAlert,
  PiggyBank
} from 'lucide-react';

interface SidebarProps {
  activeTab: SidebarTab;
  setActiveTab: (tab: SidebarTab) => void;
  onLogoutClick: () => void;
  hasUnsavedChanges: boolean;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onLogoutClick,
  hasUnsavedChanges,
  isOpenMobile,
  setIsOpenMobile,
}) => {
  const mainNavItems: { id: SidebarTab; label: string; subLabel: string; icon: React.ReactNode }[] = [
    { 
      id: 'customer_service', 
      label: 'Customer Service Hub', 
      subLabel: 'Requests, ReachBack & Timeline',
      icon: <Headphones className="w-5 h-5 text-sky-600" /> 
    },
    { 
      id: 'accounts', 
      label: 'Accounts', 
      subLabel: 'Create & Balance Enquiry',
      icon: <Users className="w-5 h-5 text-sky-600" /> 
    },
    { 
      id: 'deposit', 
      label: 'Deposit', 
      subLabel: 'FD, RD & Interest Yield Calculator',
      icon: <PiggyBank className="w-5 h-5 text-sky-600" /> 
    },
    { 
      id: 'loan_management', 
      label: 'Loan Management', 
      subLabel: 'Apply, Tracker & EMI Details',
      icon: <Landmark className="w-5 h-5 text-sky-600" /> 
    },
    { 
      id: 'operations_analytics', 
      label: 'Operations Analytics', 
      subLabel: 'Turnaround, Volume & Trends',
      icon: <BarChart3 className="w-5 h-5 text-sky-600" /> 
    },
    { 
      id: 'branch_performance', 
      label: 'Branch Performance', 
      subLabel: 'Targets, Ranking & Insights',
      icon: <TrendingUp className="w-5 h-5 text-sky-600" /> 
    },
  ];

  const handleTabSelect = (tab: SidebarTab) => {
    setActiveTab(tab);
    setIsOpenMobile(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-slate-950/80 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Fixed Left Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 lg:w-72 bg-white border-r border-slate-200 text-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-sm ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header Section */}
        <div>
          <div className="p-5 border-b border-sky-100 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-sky-400 flex items-center justify-center text-white font-black shadow-md shadow-sky-500/20">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight text-slate-900">
                One Bank
              </h1>
              <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">
                Enterprise Operations Portal
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5">
            <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Core Modules
            </div>

            {mainNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`sidebar-item-${item.id}`}
                  onClick={() => handleTabSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all group text-left ${
                    isActive
                      ? 'bg-sky-100 text-sky-950 font-black border border-sky-300 shadow-sm'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-sky-50/60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={isActive ? 'text-sky-700' : ''}>
                      {item.icon}
                    </span>
                    <div>
                      <div className="truncate font-bold leading-tight">{item.label}</div>
                      <div className={`text-[10px] truncate ${isActive ? 'text-sky-900 font-semibold' : 'text-slate-500 font-normal'}`}>
                        {item.subLabel}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'text-sky-800 opacity-100' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Profile & Logout */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/80 space-y-2">
          {/* Profile Button */}
          <button
            id="sidebar-item-profile"
            onClick={() => handleTabSelect('profile')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left ${
              activeTab === 'profile'
                ? 'bg-sky-100 text-sky-950 font-bold border border-sky-300 shadow-sm'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <UserCheck className={`w-5 h-5 ${activeTab === 'profile' ? 'text-sky-700' : 'text-sky-600'}`} />
            <div className="truncate leading-tight">
              <p className="font-bold">Profile</p>
              <p className={`text-[10px] truncate ${activeTab === 'profile' ? 'text-sky-900' : 'text-slate-500 font-normal'}`}>
                Manager (Branch Manager)
              </p>
            </div>
          </button>

          {/* Logout Button */}
          <button
            id="sidebar-item-logout"
            onClick={onLogoutClick}
            className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-5 h-5 text-rose-600" />
            <div className="text-left leading-tight">
              <p className="font-bold">Logout</p>
              <p className="text-[10px] text-rose-500/80 font-normal">End Officer Session</p>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
};
