import React from 'react';
import { AlertTriangle, LogOut, X } from 'lucide-react';

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmLogout: () => void;
}

export const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirmLogout,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 text-amber-400">
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">Unsaved Changes</h3>
            <p className="text-xs text-slate-400">Confirmation required before session exit</p>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          You have unsaved changes in your current session form. Are you sure you want to logout? Any unsubmitted input will be lost.
        </p>

        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
          >
            Stay & Save
          </button>
          <button
            onClick={onConfirmLogout}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-rose-900/30 transition-colors flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Discard & Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
