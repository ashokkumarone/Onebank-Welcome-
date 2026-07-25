import React, { useState } from 'react';
import { 
  TrendingUp, 
  Award, 
  Building2, 
  Calendar, 
  Users, 
  Landmark, 
  Headphones, 
  Sparkles, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldCheck,
  Target,
  BarChart2,
  AlertCircle,
  Lightbulb
} from 'lucide-react';

export const BranchPerformanceModule: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState('This Month');
  const [selectedBranch, setSelectedBranch] = useState('T. Nagar, Chennai (TN-004)');

  const branchesList = [
    'T. Nagar, Chennai (TN-004)',
    'Anna Nagar, Chennai (TN-008)',
    'Gandhipuram, Coimbatore (CBE-002)',
    'Simmakkal, Madurai (MDU-001)',
    'Thillai Nagar, Trichy (TRY-003)',
    'All Tamil Nadu Branches'
  ];

  return (
    <div className="space-y-6">
      {/* Module Header & Top Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center space-x-2">
            <span>Branch Performance & Strategy</span>
          </h2>
          <p className="text-xs text-slate-500">
            Branch rankings, employee KPIs, target achievements, and strategic business insights
          </p>
        </div>

        {/* TOP FILTERS: TIME PERIOD & BRANCH */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Branch Filter */}
          <div className="flex items-center space-x-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
            <Building2 className="w-4 h-4 text-sky-600" />
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="bg-white text-slate-900 font-mono font-bold px-2 py-1 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {branchesList.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Time Period Filter */}
          <div className="flex items-center space-x-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
            <Calendar className="w-4 h-4 text-sky-600" />
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="bg-white text-slate-900 font-mono font-bold px-2 py-1 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
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
      </div>

      {/* STRATEGIC BUSINESS INSIGHTS BOX (REQUIRED) */}
      <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center space-x-2 text-sky-800">
          <Lightbulb className="w-5 h-5 text-sky-600 animate-pulse" />
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
            Executive Business Insights ({selectedBranch})
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-3 bg-white rounded-xl border border-sky-100 flex items-start space-x-2 shadow-xs">
            <ArrowUpRight className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-700">Savings Account Openings</p>
              <p className="text-slate-600 text-[11px] mt-0.5">
                Savings account openings increased compared to last month (+18.4% growth driven by Prime e-KYC).
              </p>
            </div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-sky-100 flex items-start space-x-2 shadow-xs">
            <ArrowDownRight className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-rose-700">Loan Approvals Rate</p>
              <p className="text-slate-600 text-[11px] mt-0.5">
                Loan approvals decreased this week (-4.2% due to tighter CIBIL score & property document verification).
              </p>
            </div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-sky-100 flex items-start space-x-2 shadow-xs">
            <ArrowUpRight className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sky-700">Service Request Turnaround</p>
              <p className="text-slate-600 text-[11px] mt-0.5">
                Service request resolution improved significantly (Turnaround reduced from 2.1 days to 1.2 days).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BRANCH HIGHLIGHTS & RANKING CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Accounts Opened */}
        <div className="bg-white border border-sky-100 rounded-2xl p-4 shadow-md shadow-sky-100/50 space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Accounts</span>
            <Users className="w-4 h-4 text-sky-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 font-mono">1,480</span>
            <span className="text-[10px] text-emerald-700 font-mono font-bold">+18.4% MoM</span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono">New CASA openings</p>
        </div>

        {/* Loan Performance */}
        <div className="bg-white border border-sky-100 rounded-2xl p-4 shadow-md shadow-sky-100/50 space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Loan Disbursal</span>
            <Landmark className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-sky-700 font-mono">₹4.25 Cr</span>
            <span className="text-[10px] text-emerald-700 font-mono font-bold">106% Target</span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono">Retail & Gold loans</p>
        </div>

        {/* Customer Service Performance */}
        <div className="bg-white border border-sky-100 rounded-2xl p-4 shadow-md shadow-sky-100/50 space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Service SLA</span>
            <Headphones className="w-4 h-4 text-sky-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-sky-700 font-mono">97.8%</span>
            <span className="text-[10px] text-emerald-700 font-mono font-bold">Improved</span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono">Resolution rate within SLA</p>
        </div>

        {/* Branch Ranking */}
        <div className="bg-white border border-sky-100 rounded-2xl p-4 shadow-md shadow-sky-100/50 space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Branch Ranking</span>
            <Award className="w-4 h-4 text-sky-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-sky-800 font-mono">Rank #2</span>
            <span className="text-[10px] text-sky-700 font-mono font-bold">Zone Tier 1</span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono">Out of 42 Tamil Nadu branches</p>
        </div>
      </div>

      {/* TARGETS vs ACHIEVEMENTS & EMPLOYEE PERFORMANCE LEADERBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Target Achievements */}
        <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-md shadow-sky-100/50 space-y-5">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Target className="w-4 h-4 text-sky-600" />
            <span>Monthly Targets vs Achievement Percentage</span>
          </h3>

          <div className="space-y-4 font-mono text-xs">
            {/* Retail Savings Accounts Target */}
            <div className="space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-slate-700">Retail CASA Accounts</span>
                <span className="text-emerald-700">118% (1,180 / 1,000)</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div style={{ width: '100%' }} className="h-full bg-emerald-500 rounded-full"></div>
              </div>
            </div>

            {/* Home Loans Target */}
            <div className="space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-slate-700">Home Loan Disbursals</span>
                <span className="text-sky-800">92% (₹3.68 Cr / ₹4.00 Cr)</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div style={{ width: '92%' }} className="h-full bg-sky-500 rounded-full"></div>
              </div>
            </div>

            {/* Fixed Deposits Target */}
            <div className="space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-slate-700">Fixed Deposit Receipts</span>
                <span className="text-emerald-700">112% (₹8.40 Cr / ₹7.50 Cr)</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div style={{ width: '100%' }} className="h-full bg-emerald-500 rounded-full"></div>
              </div>
            </div>

            {/* Service Resolution Target */}
            <div className="space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-slate-700">Customer Service SLA Resolution</span>
                <span className="text-sky-700">98% (SLA SLA-Compliance)</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div style={{ width: '98%' }} className="h-full bg-sky-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Employee Performance Leaderboard */}
        <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-md shadow-sky-100/50 space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Award className="w-4 h-4 text-sky-600" />
            <span>Employee Performance Leaderboard</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900">Karthik Rajan (Branch Officer)</p>
                <p className="text-[10px] text-slate-500">Account Opening & Loanorigination</p>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 bg-sky-100 text-sky-900 font-bold rounded">124% Target</span>
                <p className="text-[10px] text-emerald-700 font-bold">Rank #1 in Branch</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900">Saritha V (Operations Specialist)</p>
                <p className="text-[10px] text-slate-500">Customer Service & Card Controls</p>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 bg-sky-100 text-sky-900 font-bold rounded">115% Target</span>
                <p className="text-[10px] text-slate-500 font-bold">Rank #2 in Branch</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900">Murugan P (Credit Desk Officer)</p>
                <p className="text-[10px] text-slate-500">Gold & Personal Loans</p>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 bg-sky-100 text-sky-900 font-bold rounded">102% Target</span>
                <p className="text-[10px] text-slate-500 font-bold">Rank #3 in Branch</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
