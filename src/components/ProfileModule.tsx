import React from 'react';
import { EmployeeProfile } from '../types';
import { User, ShieldCheck, Mail, Phone, Building2, Award, Calendar, BadgeCheck, Lock } from 'lucide-react';

interface ProfileModuleProps {
  employee: EmployeeProfile;
}

export const ProfileModule: React.FC<ProfileModuleProps> = ({ employee }) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-md shadow-sky-100/50 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 relative z-10">
          <div className="w-20 h-20 rounded-2xl bg-sky-500 p-1 shadow-md shrink-0">
            <div className="w-full h-full bg-sky-50 rounded-xl flex items-center justify-center text-sky-900 font-black text-2xl font-mono">
              MGR
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-black text-slate-900">{employee.name || 'manager'}</h2>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold rounded-full border border-emerald-200 flex items-center space-x-1">
                <BadgeCheck className="w-3 h-3" />
                <span>ACTIVE STAFF</span>
              </span>
            </div>
            <p className="text-xs text-sky-800 font-mono font-bold">{employee.role || 'Branch Manager'}</p>
            <p className="text-xs text-slate-500">{employee.department} | {employee.branch}</p>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-md shadow-sky-100/50 space-y-3 font-mono text-xs">
          <h3 className="text-xs font-bold text-sky-800 uppercase tracking-wider border-b border-slate-100 pb-2">
            Employee Credentials & Security
          </h3>
          <div className="space-y-2 text-slate-700">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Employee ID:</span>
              <span className="font-bold text-slate-900">{employee.id}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Branch Code:</span>
              <span className="font-bold text-slate-900">{employee.branchCode}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Clearance Level:</span>
              <span className="font-bold text-emerald-700">Level 4 Operations Officer</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">2FA Biometric Token:</span>
              <span className="font-bold text-sky-700">HARDWARE TOKEN OK</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-md shadow-sky-100/50 space-y-3 font-mono text-xs">
          <h3 className="text-xs font-bold text-sky-800 uppercase tracking-wider border-b border-slate-100 pb-2">
            Contact & Service Desk Details
          </h3>
          <div className="space-y-2 text-slate-700">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Internal Email:</span>
              <span className="text-slate-900">{employee.email}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Intercom Ext:</span>
              <span className="text-slate-900">{employee.phone}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Shift Hours:</span>
              <span className="text-slate-900">09:00 AM - 06:00 PM IST</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Supervisor:</span>
              <span className="text-slate-900">Ramesh V (Regional Director)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
