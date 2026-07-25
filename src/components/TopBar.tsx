import React, { useState } from 'react';
import { InternalTask, InternalMessage, SystemNotification } from '../types';
import { 
  Search, 
  CheckSquare, 
  Inbox, 
  Bell, 
  Menu,
  Building2,
  Sparkles
} from 'lucide-react';

interface TopBarProps {
  employeeName?: string;
  taskCount?: number;
  inboxCount?: number;
  tasks?: InternalTask[];
  messages?: InternalMessage[];
  onOpenTasks: () => void;
  onOpenInbox: () => void;
  onOpenSearch: (query: string) => void;
  onToggleMobileSidebar?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  employeeName,
  taskCount,
  inboxCount,
  tasks = [],
  messages = [],
  onOpenTasks,
  onOpenInbox,
  onOpenSearch,
  onToggleMobileSidebar = () => {},
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const completedSuccessCount = taskCount !== undefined ? taskCount : (tasks || []).length;
  const unreadMessagesCount = inboxCount !== undefined ? inboxCount : (messages || []).filter((m) => !m.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onOpenSearch(searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 text-slate-800 px-4 sm:px-6 py-3 lg:ml-72 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Mobile Toggle & Branch Header */}
        <div className="flex items-center space-x-3">
          <button
            id="btn-mobile-sidebar-toggle"
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden sm:block">
            <h2 className="text-xs font-bold text-slate-800 flex items-center space-x-2">
              <span className="text-sky-700 font-mono font-bold">T. Nagar Branch (TN-004)</span>
              <span className="text-[10px] bg-sky-50 text-sky-700 px-2 py-0.5 rounded border border-sky-200 font-mono font-bold">
                CBS ONLINE
              </span>
            </h2>
          </div>
        </div>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-2 sm:mx-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Global Search (Account, CIF, Loan ID, Ticket #)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/80 transition-all"
            />
            {searchQuery && (
              <button
                type="submit"
                className="absolute right-2 top-1.5 px-2 py-1 bg-sky-500 hover:bg-sky-600 text-white text-[10px] font-bold rounded-lg"
              >
                Search
              </button>
            )}
          </div>
        </form>

        {/* Top Right Navigation Utilities: My Tasks & Inbox */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* My Tasks */}
          <button
            id="btn-topbar-tasks"
            onClick={onOpenTasks}
            className="relative flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold transition-colors hover:border-sky-500/50"
            title="My Successful Business & Completed Work"
          >
            <div className="relative flex items-center justify-center">
              <CheckSquare className="w-4 h-4 text-sky-600" />
              {completedSuccessCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white shadow-xs" />
              )}
            </div>
            <span className="hidden md:inline">My Tasks</span>
          </button>

          {/* Notifications */}
          <button
            id="btn-topbar-notifications"
            onClick={onOpenInbox}
            className="relative flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold transition-colors hover:border-sky-500/50"
            title="Internal Memos, Circulars & Branch Notifications"
          >
            <div className="relative flex items-center justify-center">
              <Bell className="w-4 h-4 text-sky-600" />
              {unreadMessagesCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white shadow-xs" />
              )}
            </div>
            <span className="hidden md:inline">Notifications</span>
          </button>
        </div>
      </div>
    </header>
  );
};
