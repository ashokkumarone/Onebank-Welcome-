import React, { useState } from 'react';
import { LoanApplication, LoanSubTab, LoanTypeInfo, EmiScheduleItem } from '../types';
import { LOAN_TYPES_CATALOG, SAMPLE_EMI_SCHEDULE } from '../mockData';
import { 
  Landmark, 
  FileCheck, 
  Calculator, 
  Download, 
  Printer, 
  Mail, 
  MessageSquare, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Send, 
  ListFilter,
  DollarSign,
  Calendar,
  Percent,
  Check
} from 'lucide-react';

interface LoanManagementModuleProps {
  loans: LoanApplication[];
  onAddLoan: (loan: LoanApplication) => void;
  onUpdateLoanStatus: (id: string, status: 'Approved' | 'Rejected' | 'Disbursed') => void;
  setHasUnsavedChanges: (hasChanges: boolean) => void;
}

export const LoanManagementModule: React.FC<LoanManagementModuleProps> = ({
  loans,
  onAddLoan,
  onUpdateLoanStatus,
  setHasUnsavedChanges,
}) => {
  const [subTab, setSubTab] = useState<LoanSubTab>('apply_loan');

  // --- Apply Loan Form State ---
  const [selectedLoanType, setSelectedLoanType] = useState<LoanTypeInfo>(LOAN_TYPES_CATALOG[0]);
  const [customerName, setCustomerName] = useState('');
  const [cif, setCif] = useState('');
  const [requestedAmount, setRequestedAmount] = useState('');
  const [tenureMonths, setTenureMonths] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [collateralDetails, setCollateralDetails] = useState('');
  const [loanSuccessMsg, setLoanSuccessMsg] = useState(false);

  // EMI Calculator Calculation Helper
  const amountVal = parseFloat(requestedAmount) || 0;
  const tenureVal = parseInt(tenureMonths) || 12;
  const rawInterestRate = parseFloat(selectedLoanType.interestRate) || 8.5;
  const monthlyRate = rawInterestRate / (12 * 100);
  const calculatedEmi = amountVal > 0 && tenureVal > 0
    ? Math.round((amountVal * monthlyRate * Math.pow(1 + monthlyRate, tenureVal)) / (Math.pow(1 + monthlyRate, tenureVal) - 1))
    : 0;

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !cif.trim() || amountVal <= 0) {
      alert('Please enter Customer Name, CIF Number, and a valid Requested Amount.');
      return;
    }
    const newLoan: LoanApplication = {
      id: `LN-2026-${Math.floor(4000 + Math.random() * 5000)}`,
      customerName: customerName.trim(),
      cif: cif.trim(),
      loanType: selectedLoanType.type,
      amount: amountVal,
      interestRate: rawInterestRate,
      tenureMonths: tenureVal,
      emi: calculatedEmi,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2029-07-23',
      nextEmiDate: '2026-08-23',
      outstandingBalance: amountVal,
      totalInterest: Math.round(calculatedEmi * tenureVal - amountVal),
      totalAmountPayable: Math.round(calculatedEmi * tenureVal),
      assignedEmployee: 'Karthik Rajan',
      status: 'Pending',
      dateApplied: new Date().toISOString().split('T')[0]
    };

    onAddLoan(newLoan);
    setLoanSuccessMsg(true);
    setHasUnsavedChanges(false);
    setCustomerName('');
    setCif('');
    setRequestedAmount('');
    setTenureMonths('');
    setMonthlyIncome('');
    setCollateralDetails('');
  };

  // --- Loan Tracker State ---
  const [trackerTab, setTrackerTab] = useState<'All' | 'Pending' | 'Approved' | 'Rejected' | 'Disbursed'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLoans = loans.filter((ln) => {
    if (trackerTab !== 'All' && ln.status !== trackerTab) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = ln.customerName.toLowerCase().includes(q);
      const matchId = ln.id.toLowerCase().includes(q);
      const matchCif = ln.cif.toLowerCase().includes(q);
      const matchType = ln.loanType.toLowerCase().includes(q);
      if (!matchName && !matchId && !matchCif && !matchType) return false;
    }
    return true;
  });

  // --- Loan Details & EMI Schedule State ---
  const [selectedLoanForDetails, setSelectedLoanForDetails] = useState<LoanApplication>(loans[0] || {
    id: 'LN-2026-4401',
    customerName: 'Anand Krishnan',
    cif: 'CIF8920194',
    loanType: 'Home Loan',
    amount: 4500000,
    interestRate: 8.4,
    tenureMonths: 240,
    emi: 38725,
    startDate: '2024-03-15',
    endDate: '2044-03-15',
    nextEmiDate: '2026-08-05',
    outstandingBalance: 3840290,
    totalInterest: 4794000,
    totalAmountPayable: 9294000,
    assignedEmployee: 'Karthik Rajan',
    status: 'Disbursed',
    dateApplied: '2024-02-10'
  });

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showNotificationToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Section Header & SubTabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center space-x-2">
            <span>Loan Management</span>
          </h2>
          <p className="text-xs text-slate-500">
            Loan origination, rate catalog, application appraisal, and EMI schedule management
          </p>
        </div>

        <div className="flex items-center space-x-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <button
            id="btn-subtab-apply-loan"
            onClick={() => setSubTab('apply_loan')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
              subTab === 'apply_loan'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>Apply Loan</span>
          </button>

          <button
            id="btn-subtab-loan-tracker"
            onClick={() => setSubTab('loan_tracker')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
              subTab === 'loan_tracker'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <ListFilter className="w-4 h-4" />
            <span>Loan Tracker</span>
            <span className="bg-sky-100 text-sky-900 text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold">
              {loans.length}
            </span>
          </button>

          <button
            id="btn-subtab-loan-details"
            onClick={() => setSubTab('loan_details')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
              subTab === 'loan_details'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Loan Details & EMI</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: APPLY LOAN & DYNAMIC RATE DISPLAY */}
      {subTab === 'apply_loan' && (
        <div className="space-y-6">
          {loanSuccessMsg ? (
            <div className="bg-white border border-sky-200 rounded-2xl p-8 text-center max-w-xl mx-auto space-y-4 animate-fadeIn shadow-md shadow-sky-100/50">
              <CheckCircle2 className="w-14 h-14 text-sky-600 mx-auto" />
              <h3 className="text-lg font-black text-slate-900">Loan Application Submitted!</h3>
              <p className="text-xs text-slate-500">
                Application is queued for Credit Risk Committee Appraisal in Loan Tracker.
              </p>
              <div className="flex justify-center space-x-3 pt-2">
                <button
                  onClick={() => setLoanSuccessMsg(false)}
                  className="px-5 py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl shadow-md shadow-sky-500/20"
                >
                  Apply Another Loan
                </button>
                <button
                  onClick={() => setSubTab('loan_tracker')}
                  className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200"
                >
                  View Loan Tracker
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Loan Type Selector & Dynamic Card */}
              <div className="space-y-4">
                <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-md shadow-sky-100/50 space-y-3">
                  <h3 className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                    Select Loan Type
                  </h3>
                  <div className="space-y-1.5">
                    {LOAN_TYPES_CATALOG.map((item) => (
                      <button
                        key={item.type}
                        onClick={() => {
                          setSelectedLoanType(item);
                          setHasUnsavedChanges(true);
                        }}
                        className={`w-full p-3 rounded-xl text-xs text-left font-bold transition-all flex items-center justify-between border ${
                          selectedLoanType.type === item.type
                            ? 'bg-sky-50 border-sky-400 text-sky-900 shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{item.type}</span>
                        <span className="text-[10px] font-mono font-bold text-sky-700">{item.interestRate}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* DYNAMICALLY DISPLAYED LOAN PARAMETERS CARD */}
                <div className="bg-sky-50/60 border border-sky-200 rounded-2xl p-5 shadow-xs space-y-3">
                  <div className="flex items-center space-x-2 text-sky-800 border-b border-sky-200 pb-2">
                    <Percent className="w-4 h-4" />
                    <h4 className="text-xs font-extrabold uppercase tracking-wider">
                      {selectedLoanType.type} Policy Terms
                    </h4>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedLoanType.description}
                  </p>

                  <div className="space-y-2 text-xs font-mono pt-1">
                    <div className="flex justify-between py-1 border-b border-sky-200/80">
                      <span className="text-slate-500">Interest Rate:</span>
                      <span className="font-bold text-sky-800">{selectedLoanType.interestRate}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-sky-200/80">
                      <span className="text-slate-500">Processing Fee:</span>
                      <span className="font-bold text-slate-800">{selectedLoanType.processingFee}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-sky-200/80">
                      <span className="text-slate-500">Minimum Amount:</span>
                      <span className="font-bold text-slate-800">₹{selectedLoanType.minAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-sky-200/80">
                      <span className="text-slate-500">Maximum Amount:</span>
                      <span className="font-bold text-slate-800">₹{selectedLoanType.maxAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Maximum Tenure:</span>
                      <span className="font-bold text-sky-900">{selectedLoanType.maxTenureMonths} Months ({selectedLoanType.maxTenureMonths / 12} Yrs)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Application Form & Live EMI Estimator */}
              <form onSubmit={handleApplySubmit} className="lg:col-span-2 bg-white border border-sky-100 rounded-2xl p-6 shadow-md shadow-sky-100/50 space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-black text-slate-900">Loan Application & Credit Appraisal</h3>
                  <p className="text-xs text-slate-500">Internal officer entry form for {selectedLoanType.type}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Customer Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Customer Name"
                      value={customerName}
                      onChange={(e) => { setCustomerName(e.target.value); setHasUnsavedChanges(true); }}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Customer ID (CIF) / Account No *</label>
                    <input
                      type="text"
                      required
                      placeholder="CIF or Account Number"
                      value={cif}
                      onChange={(e) => { setCif(e.target.value); setHasUnsavedChanges(true); }}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Requested Loan Amount (₹) *</label>
                    <input
                      type="number"
                      required
                      min={selectedLoanType.minAmount}
                      max={selectedLoanType.maxAmount}
                      value={requestedAmount}
                      onChange={(e) => { setRequestedAmount(e.target.value); setHasUnsavedChanges(true); }}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Tenure (Months) *</label>
                    <input
                      type="number"
                      required
                      min="6"
                      max={selectedLoanType.maxTenureMonths}
                      value={tenureMonths}
                      onChange={(e) => { setTenureMonths(e.target.value); setHasUnsavedChanges(true); }}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Verified Monthly Net Salary / Income (₹)</label>
                    <input
                      type="number"
                      required
                      value={monthlyIncome}
                      onChange={(e) => { setMonthlyIncome(e.target.value); setHasUnsavedChanges(true); }}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Collateral / Asset Guarantee Details</label>
                    <input
                      type="text"
                      placeholder="Collateral or Asset Details"
                      value={collateralDetails}
                      onChange={(e) => { setCollateralDetails(e.target.value); setHasUnsavedChanges(true); }}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                {/* Live Estimator Bar */}
                <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Estimated Monthly EMI</span>
                    <span className="text-sky-700 font-black text-lg">₹{calculatedEmi.toLocaleString('en-IN')} / mo</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Total Interest Payable</span>
                    <span className="text-sky-900 font-bold">₹{Math.max(0, Math.round(calculatedEmi * tenureVal - amountVal)).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="flex justify-end pt-2 border-t border-slate-100">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-xs shadow-md shadow-sky-500/20 flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Loan Application</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 2: LOAN TRACKER */}
      {subTab === 'loan_tracker' && (
        <div className="space-y-4">
          <div className="bg-white border border-sky-100 p-4 rounded-2xl space-y-4 shadow-md shadow-sky-100/50">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                {(['All', 'Pending', 'Approved', 'Rejected', 'Disbursed'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setTrackerTab(tab)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      trackerTab === tab
                        ? 'bg-sky-500 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 absolute left-3 top-2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search Loan ID, Name, CIF..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/80"
                />
              </div>
            </div>

            {/* Loan Tracker Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 font-bold">Loan ID</th>
                    <th className="py-3 px-4 font-bold">Customer</th>
                    <th className="py-3 px-4 font-bold">Type</th>
                    <th className="py-3 px-4 font-bold">Principal Amount</th>
                    <th className="py-3 px-4 font-bold">EMI</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                    <th className="py-3 px-4 text-right font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredLoans.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-slate-400">
                        No loan records match selected filters.
                      </td>
                    </tr>
                  ) : (
                    filteredLoans.map((ln) => (
                      <tr key={ln.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-sky-700">{ln.id}</td>
                        <td className="py-3 px-4 font-bold text-slate-900">
                          <div>{ln.customerName}</div>
                          <div className="text-[10px] text-slate-500 font-mono font-normal">{ln.cif}</div>
                        </td>
                        <td className="py-3 px-4 font-medium">{ln.loanType}</td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">
                          ₹{ln.amount.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-4 font-mono text-sky-700 font-bold">
                          ₹{ln.emi.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold font-mono uppercase ${
                              ln.status === 'Disbursed'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : ln.status === 'Approved'
                                ? 'bg-sky-50 text-sky-700 border border-sky-200'
                                : ln.status === 'Pending'
                                ? 'bg-sky-50 text-sky-700 border border-sky-200'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}
                          >
                            {ln.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1">
                          <button
                            onClick={() => {
                              setSelectedLoanForDetails(ln);
                              setSubTab('loan_details');
                            }}
                            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 text-[10px] font-bold"
                          >
                            Details & EMI
                          </button>
                          {ln.status === 'Pending' && (
                            <>
                              <button
                                onClick={() => onUpdateLoanStatus(ln.id, 'Approved')}
                                className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => onUpdateLoanStatus(ln.id, 'Rejected')}
                                className="px-2 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-[10px] font-bold"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {ln.status === 'Approved' && (
                            <button
                              onClick={() => onUpdateLoanStatus(ln.id, 'Disbursed')}
                              className="px-2 py-1 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-[10px] font-bold"
                            >
                              Disburse
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: LOAN DETAILS & EMI TABLE */}
      {subTab === 'loan_details' && selectedLoanForDetails && (
        <div className="space-y-6">
          {/* Top Key Metrics Banner */}
          <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-md shadow-sky-100/50 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center space-x-2">
                  <span>Loan Account Details #{selectedLoanForDetails.id}</span>
                  <span className="text-[10px] bg-sky-50 text-sky-800 font-mono px-2 py-0.5 rounded border border-sky-200 font-bold uppercase">
                    {selectedLoanForDetails.status}
                  </span>
                </h3>
                <p className="text-xs text-slate-500">
                  Customer: {selectedLoanForDetails.customerName} | CIF: {selectedLoanForDetails.cif}
                </p>
              </div>

              {/* Action Buttons: Download Statement, Print, Send Email, Send SMS Reminder */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => showNotificationToast(`Statement downloaded for ${selectedLoanForDetails.id}`)}
                  className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200 flex items-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-sky-600" />
                  <span>Download Statement</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200 flex items-center space-x-1.5"
                >
                  <Printer className="w-3.5 h-3.5 text-sky-600" />
                  <span>Print</span>
                </button>

                <button
                  onClick={() => showNotificationToast(`Loan statement emailed to ${selectedLoanForDetails.customerName}`)}
                  className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200 flex items-center space-x-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-sky-600" />
                  <span>Send Email</span>
                </button>

                <button
                  onClick={() => showNotificationToast(`SMS EMI Reminder sent to customer mobile`)}
                  className="px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-xs font-bold shadow-xs flex items-center space-x-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Send SMS Reminder</span>
                </button>
              </div>
            </div>

            {/* Metrics Grid Display */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-mono text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[10px] font-bold">Loan Amount</span>
                <span className="font-bold text-slate-900 text-sm">₹{selectedLoanForDetails.amount.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[10px] font-bold">Interest Rate</span>
                <span className="font-bold text-sky-700 text-sm">{selectedLoanForDetails.interestRate}% p.a.</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[10px] font-bold">Monthly EMI</span>
                <span className="font-bold text-sky-800 text-sm">₹{selectedLoanForDetails.emi.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[10px] font-bold">Outstanding Balance</span>
                <span className="font-bold text-rose-700 text-sm">₹{selectedLoanForDetails.outstandingBalance.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[10px] font-bold">Next EMI Date</span>
                <span className="font-bold text-sky-600 text-sm">{selectedLoanForDetails.nextEmiDate}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono pt-1 text-slate-600">
              <div><span className="text-slate-500">Loan Start Date:</span> {selectedLoanForDetails.startDate}</div>
              <div><span className="text-slate-500">Loan End Date:</span> {selectedLoanForDetails.endDate}</div>
              <div><span className="text-slate-500">Total Interest:</span> ₹{selectedLoanForDetails.totalInterest.toLocaleString('en-IN')}</div>
              <div><span className="text-slate-500">Total Payable:</span> ₹{selectedLoanForDetails.totalAmountPayable.toLocaleString('en-IN')}</div>
            </div>
          </div>

          {/* EMI Schedule Table */}
          <div className="bg-white border border-sky-100 rounded-2xl overflow-hidden shadow-md shadow-sky-100/50 space-y-3 p-5">
            <h4 className="text-xs font-bold text-sky-800 uppercase tracking-wider">
              EMI Amortization Schedule
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-4 font-bold">EMI #</th>
                    <th className="py-2.5 px-4 font-bold">Due Date</th>
                    <th className="py-2.5 px-4 font-bold">Principal (₹)</th>
                    <th className="py-2.5 px-4 font-bold">Interest (₹)</th>
                    <th className="py-2.5 px-4 font-bold">EMI Amount (₹)</th>
                    <th className="py-2.5 px-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {SAMPLE_EMI_SCHEDULE.map((item) => (
                    <tr key={item.emiNumber} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">#{item.emiNumber}</td>
                      <td className="py-3 px-4 text-slate-600">{item.dueDate}</td>
                      <td className="py-3 px-4">₹{item.principal.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-4">₹{item.interest.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-4 font-bold text-sky-700">₹{item.emiAmount.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            item.status === 'Paid'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : item.status === 'Overdue'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-sky-50 text-sky-700 border border-sky-200'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
