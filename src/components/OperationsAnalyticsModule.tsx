import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Landmark, 
  Headphones, 
  CheckSquare, 
  Clock, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Layers,
  Filter
} from 'lucide-react';

export const OperationsAnalyticsModule: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState('Last 30 Days');

  // Time Period Data Multipliers for interactive simulation
  const multiplier = timePeriod === 'Today' ? 0.08 : timePeriod === 'Yesterday' ? 0.09 : timePeriod === 'Last 7 Days' ? 0.28 : 1.0;

  const metrics = {
    newAccounts: Math.round(148 * multiplier),
    loanApplications: Math.round(86 * multiplier),
    serviceRequests: Math.round(312 * multiplier),
    pendingTasks: Math.round(24 * multiplier),
    avgProcessingTimeHours: (1.8 * (timePeriod === 'Today' ? 1.2 : 1.0)).toFixed(1),
  };

  const trendBars = [
    { label: 'Wk 1', accounts: 32, loans: 18, requests: 70 },
    { label: 'Wk 2', accounts: 41, loans: 22, requests: 85 },
    { label: 'Wk 3', accounts: 38, loans: 24, requests: 78 },
    { label: 'Wk 4', accounts: 37, loans: 22, requests: 79 },
  ];

  return (
    <div className="space-y-6">
      {/* Module Header & Top Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center space-x-2">
            <span>Operations Analytics</span>
          </h2>
          <p className="text-xs text-slate-500">
            Enterprise throughput, processing SLA metrics, and operational trends
          </p>
        </div>

        {/* TIME PERIOD DROPDOWN */}
        <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
          <Calendar className="w-4 h-4 text-sky-600" />
          <span className="text-xs text-slate-600 font-bold">Time Period:</span>
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="bg-white text-slate-900 font-mono text-xs font-bold px-2 py-1 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="Today">Today</option>
            <option value="Yesterday">Yesterday</option>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="This Month">This Month</option>
            <option value="Last Month">Last Month</option>
            <option value="This Year">This Year</option>
            <option value="Custom Date Range">Custom Date Range</option>
          </select>
        </div>
      </div>

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* New Accounts */}
        <div className="bg-white border border-sky-100 rounded-2xl p-4 shadow-md shadow-sky-100/50 space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">New Accounts</span>
            <Users className="w-4 h-4 text-sky-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 font-mono">{metrics.newAccounts}</span>
            <span className="text-[10px] text-emerald-700 font-mono flex items-center font-bold">
              <ArrowUpRight className="w-3 h-3" /> +14%
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono">Completed e-KYC accounts</p>
        </div>

        {/* Loan Applications */}
        <div className="bg-white border border-sky-100 rounded-2xl p-4 shadow-md shadow-sky-100/50 space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Loan Applications</span>
            <Landmark className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 font-mono">{metrics.loanApplications}</span>
            <span className="text-[10px] text-emerald-700 font-mono flex items-center font-bold">
              <ArrowUpRight className="w-3 h-3" /> +8.2%
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono">Submitted for appraisal</p>
        </div>

        {/* Service Requests */}
        <div className="bg-white border border-sky-100 rounded-2xl p-4 shadow-md shadow-sky-100/50 space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Service Requests</span>
            <Headphones className="w-4 h-4 text-sky-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 font-mono">{metrics.serviceRequests}</span>
            <span className="text-[10px] text-emerald-700 font-mono flex items-center font-bold">
              <ArrowUpRight className="w-3 h-3" /> +22%
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono">Resolved via ReachBack</p>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white border border-sky-100 rounded-2xl p-4 shadow-md shadow-sky-100/50 space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Tasks</span>
            <CheckSquare className="w-4 h-4 text-sky-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-sky-800 font-mono">{metrics.pendingTasks}</span>
            <span className="text-[10px] text-sky-700 font-mono flex items-center font-bold">
              In Queue
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono">Assigned officer tasks</p>
        </div>

        {/* Processing Time */}
        <div className="bg-white border border-sky-100 rounded-2xl p-4 shadow-md shadow-sky-100/50 space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Avg Turnaround</span>
            <Clock className="w-4 h-4 text-sky-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-sky-700 font-mono">{metrics.avgProcessingTimeHours}h</span>
            <span className="text-[10px] text-emerald-700 font-mono flex items-center font-bold">
              <ArrowDownRight className="w-3 h-3" /> -0.4h SLA
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono">Branch processing speed</p>
        </div>
      </div>

      {/* OPERATIONAL TRENDS CHART & STAGE BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trends Chart Column */}
        <div className="lg:col-span-2 bg-white border border-sky-100 rounded-2xl p-6 shadow-md shadow-sky-100/50 space-y-5">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center space-x-2">
                <Activity className="w-4 h-4 text-sky-600" />
                <span>Operational Trends Breakdown ({timePeriod})</span>
              </h3>
              <p className="text-xs text-slate-500">Weekly comparative volume across core operations</p>
            </div>
          </div>

          {/* Bar Visualizer */}
          <div className="space-y-4 pt-2">
            {trendBars.map((item) => (
              <div key={item.label} className="space-y-1 text-xs font-mono">
                <div className="flex justify-between text-slate-700">
                  <span className="font-bold text-sky-800">{item.label} Performance</span>
                  <span>Accounts: {item.accounts} | Loans: {item.loans} | Service: {item.requests}</span>
                </div>
                <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex p-0.5 border border-slate-200">
                  <div style={{ width: `${(item.accounts / 150) * 100}%` }} className="bg-sky-500 h-full rounded-l-full"></div>
                  <div style={{ width: `${(item.loans / 150) * 100}%` }} className="bg-emerald-500 h-full"></div>
                  <div style={{ width: `${(item.requests / 150) * 100}%` }} className="bg-sky-300 h-full rounded-r-full"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-6 text-[11px] font-mono pt-3 border-t border-slate-100">
            <span className="flex items-center space-x-1.5 text-sky-900 font-bold">
              <span className="w-3 h-3 rounded bg-sky-500 inline-block"></span>
              <span>New Accounts</span>
            </span>
            <span className="flex items-center space-x-1.5 text-emerald-800 font-bold">
              <span className="w-3 h-3 rounded bg-emerald-500 inline-block"></span>
              <span>Loans Applied</span>
            </span>
            <span className="flex items-center space-x-1.5 text-sky-700 font-bold">
              <span className="w-3 h-3 rounded bg-sky-300 inline-block"></span>
              <span>Service Tickets</span>
            </span>
          </div>
        </div>

        {/* Stage Bottlenecks Box */}
        <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-md shadow-sky-100/50 space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-sky-600" />
            <span>Processing Queue SLA</span>
          </h3>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-slate-800">Aadhaar e-KYC Verification</span>
                <span className="text-emerald-700">98.4% SLA</span>
              </div>
              <p className="text-[10px] text-slate-500">Avg processing: 3.2 mins</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-slate-800">Credit Committee Loan Appraisal</span>
                <span className="text-sky-800">88.1% SLA</span>
              </div>
              <p className="text-[10px] text-slate-500">Avg processing: 4.8 hours</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-slate-800">Chequebook & Card Dispatch</span>
                <span className="text-sky-700">95.0% SLA</span>
              </div>
              <p className="text-[10px] text-slate-500">Avg turnaround: 24.0 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
