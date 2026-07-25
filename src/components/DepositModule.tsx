import React, { useState } from 'react';
import { DepositAccount } from '../types';
import { INITIAL_DEPOSITS } from '../mockData';
import { 
  PiggyBank, 
  Calculator, 
  PlusCircle, 
  Send, 
  Award, 
  CheckCircle2,
  TrendingUp,
  Clock,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';

interface DepositModuleProps {
  deposits?: DepositAccount[];
  onAddDeposit?: (deposit: DepositAccount) => void;
  setHasUnsavedChanges?: (hasChanges: boolean) => void;
}

export const DepositModule: React.FC<DepositModuleProps> = ({
  deposits = INITIAL_DEPOSITS,
  onAddDeposit,
  setHasUnsavedChanges = (_hasChanges: boolean) => {},
}) => {
  const [activeDeposits, setActiveDeposits] = useState<DepositAccount[]>(deposits || INITIAL_DEPOSITS);
  
  // Deposit creation form state
  const [depType, setDepType] = useState<'Fixed Deposit' | 'Recurring Deposit'>('Fixed Deposit');
  const [depCustomerName, setDepCustomerName] = useState('');
  const [depCifOrAcc, setDepCifOrAcc] = useState('');
  const [depSchemeName, setDepSchemeName] = useState('Senior Citizen Special FD');
  const [depAmount, setDepAmount] = useState('100000');
  const [depTenureMonths, setDepTenureMonths] = useState('12');
  const [depInterestRate, setDepInterestRate] = useState('7.85');
  const [depPayout, setDepPayout] = useState<'On Maturity' | 'Quarterly' | 'Monthly'>('On Maturity');
  const [depNominee, setDepNominee] = useState('');
  const [createdSuccessDeposit, setCreatedSuccessDeposit] = useState<DepositAccount | null>(null);

  // Calculator state
  const [calcType, setCalcType] = useState<'Fixed Deposit' | 'Recurring Deposit'>('Fixed Deposit');
  const [calcAmount, setCalcAmount] = useState(100000);
  const [calcTenure, setCalcTenure] = useState(12);
  const [calcSenior, setCalcSenior] = useState(false);

  const handleCreateDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!depCustomerName) {
      alert('Please enter Customer Name');
      return;
    }
    const amt = parseFloat(depAmount) || 100000;
    const rate = parseFloat(depInterestRate) || 7.5;
    const tenure = parseInt(depTenureMonths) || 12;

    let estMaturity = 0;
    if (depType === 'Fixed Deposit') {
      estMaturity = Math.round(amt + (amt * (rate / 100) * (tenure / 12)));
    } else {
      const n = tenure;
      const totalInvested = amt * n;
      const interestEst = (amt * n * (n + 1) / 24) * (rate / 100);
      estMaturity = Math.round(totalInvested + interestEst);
    }

    const today = new Date();
    const matDateObj = new Date();
    matDateObj.setMonth(today.getMonth() + tenure);
    const maturityDateStr = matDateObj.toISOString().split('T')[0];

    const generatedId = depType === 'Fixed Deposit'
      ? `FD-2026-${Math.floor(8000 + Math.random() * 1000)}`
      : `RD-2026-${Math.floor(4000 + Math.random() * 1000)}`;

    const newDeposit: DepositAccount = {
      id: generatedId,
      cif: depCifOrAcc || `CIF${Math.floor(1000000 + Math.random() * 9000000)}`,
      customerName: depCustomerName,
      type: depType,
      schemeName: depSchemeName,
      depositAmount: depType === 'Fixed Deposit' ? amt : (amt * tenure),
      monthlyInstallment: depType === 'Recurring Deposit' ? amt : undefined,
      tenureMonths: tenure,
      interestRate: rate,
      maturityAmount: estMaturity,
      maturityDate: maturityDateStr,
      interestPayout: depPayout,
      nomineeName: depNominee || 'Family Nominee',
      createdDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    };

    setActiveDeposits([newDeposit, ...activeDeposits]);
    setCreatedSuccessDeposit(newDeposit);
    setHasUnsavedChanges(false);
    if (onAddDeposit) {
      onAddDeposit(newDeposit);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-sky-100 p-6 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center space-x-2">
            <PiggyBank className="w-6 h-6 text-sky-600" />
            <span>Deposit Management (FD & RD)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Create Fixed Deposits (FD), Recurring Deposits (RD), calculate interest yields, and track active deposit certificates.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-sky-50 border border-sky-200 px-3.5 py-1.5 rounded-xl text-right">
            <span className="text-[10px] text-sky-700 font-bold uppercase tracking-wider block">Active Certificates</span>
            <span className="text-sm font-black font-mono text-sky-900">{activeDeposits.length} Accounts</span>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl text-right">
            <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block">Highest Interest Rate</span>
            <span className="text-sm font-black font-mono text-emerald-800">7.85% p.a.</span>
          </div>
        </div>
      </div>



      {/* SECTION 2: Interactive Maturity & Interest Calculator */}
      <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-md shadow-sky-100/50 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-sky-600" />
            <h3 className="text-base font-black text-slate-900">Deposit Yield & Maturity Calculator</h3>
          </div>
          <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-lg font-mono font-bold">
            Real-Time Calculator
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Deposit Category</label>
            <select
              value={calcType}
              onChange={(e) => setCalcType(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              <option value="Fixed Deposit">Fixed Deposit (Lump sum)</option>
              <option value="Recurring Deposit">Recurring Deposit (Monthly)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {calcType === 'Fixed Deposit' ? 'Deposit Amount (₹)' : 'Monthly Installment (₹)'}
            </label>
            <input
              type="number"
              step="1000"
              min="500"
              value={calcAmount}
              onChange={(e) => setCalcAmount(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono font-bold focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tenure (Months)</label>
            <select
              value={calcTenure}
              onChange={(e) => setCalcTenure(parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              <option value={6}>6 Months</option>
              <option value={12}>12 Months (1 Year)</option>
              <option value={24}>24 Months (2 Years)</option>
              <option value={36}>36 Months (3 Years)</option>
              <option value={60}>60 Months (5 Years)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Senior Citizen?</label>
            <button
              type="button"
              onClick={() => setCalcSenior(!calcSenior)}
              className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                calcSenior
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {calcSenior ? '✓ Senior (+0.50% Extra)' : 'Standard Citizen'}
            </button>
          </div>
        </div>

        {/* Live Calculation Output Card */}
        {(() => {
          let baseRate = calcType === 'Fixed Deposit' ? 7.25 : 7.10;
          if (calcSenior) baseRate += 0.50;

          let estTotalInvested = 0;
          let estInterest = 0;
          let estMaturityVal = 0;

          if (calcType === 'Fixed Deposit') {
            estTotalInvested = calcAmount;
            estInterest = Math.round(calcAmount * (baseRate / 100) * (calcTenure / 12));
            estMaturityVal = estTotalInvested + estInterest;
          } else {
            estTotalInvested = calcAmount * calcTenure;
            estInterest = Math.round((calcAmount * calcTenure * (calcTenure + 1) / 24) * (baseRate / 100));
            estMaturityVal = estTotalInvested + estInterest;
          }

          return (
            <div className="bg-sky-50/60 p-4 rounded-xl border border-sky-100 grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-mono text-xs">
              <div className="p-2 border-r border-sky-200/80">
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Applied Interest Rate</span>
                <span className="text-base font-bold text-amber-700">{baseRate.toFixed(2)}% p.a.</span>
              </div>
              <div className="p-2 border-r border-sky-200/80">
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Total Invested</span>
                <span className="text-base font-bold text-slate-900">₹{estTotalInvested.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-2 border-r border-sky-200/80">
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Est. Interest Earned</span>
                <span className="text-base font-bold text-emerald-700">+₹{estInterest.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-2">
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Est. Maturity Value</span>
                <span className="text-base font-bold text-sky-700">₹{estMaturityVal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          );
        })()}
      </div>

      {/* SECTION 3: Create Term Deposit Form */}
      {createdSuccessDeposit ? (
        <div className="bg-white rounded-2xl p-8 border border-emerald-200 shadow-lg text-center max-w-2xl mx-auto space-y-5 animate-fadeIn">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">Term Deposit Certificate Created Successfully!</h3>
            <p className="text-xs text-slate-500 mt-1">
              Deposit certificate has been generated and automatically added to CBS & recorded in My Tasks.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-left font-mono space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Certificate Number:</span>
              <span className="font-bold text-amber-700">{createdSuccessDeposit.id}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Customer Name:</span>
              <span className="font-bold text-slate-900">{createdSuccessDeposit.customerName} ({createdSuccessDeposit.cif})</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Deposit Scheme:</span>
              <span className="font-bold text-slate-800">{createdSuccessDeposit.schemeName} ({createdSuccessDeposit.type})</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Deposit Amount:</span>
              <span className="font-bold text-emerald-700">₹{createdSuccessDeposit.depositAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Interest Rate:</span>
              <span className="font-bold text-amber-700">{createdSuccessDeposit.interestRate}% p.a.</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Tenure:</span>
              <span className="font-bold text-slate-800">{createdSuccessDeposit.tenureMonths} Months</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Estimated Maturity Value:</span>
              <span className="font-bold text-sky-700">₹{createdSuccessDeposit.maturityAmount.toLocaleString('en-IN')} (Due: {createdSuccessDeposit.maturityDate})</span>
            </div>
          </div>

          <div className="flex justify-center space-x-3 pt-2">
            <button
              onClick={() => setCreatedSuccessDeposit(null)}
              className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-xs shadow-md transition-colors"
            >
              Create Another Deposit
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleCreateDepositSubmit} className="bg-white border border-sky-100 rounded-2xl p-6 shadow-md shadow-sky-100/50 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center space-x-2">
                <PlusCircle className="w-5 h-5 text-sky-600" />
                <span>Open New Term Deposit Certificate (FD / RD)</span>
              </h3>
              <p className="text-xs text-slate-500">Create Fixed Deposit or Recurring Deposit for registered bank customer</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Deposit Type *</label>
              <select
                value={depType}
                onChange={(e) => {
                  const typeVal = e.target.value as any;
                  setDepType(typeVal);
                  if (typeVal === 'Fixed Deposit') {
                    setDepSchemeName('Senior Citizen Special FD');
                    setDepInterestRate('7.85');
                  } else {
                    setDepSchemeName('Super Builder RD');
                    setDepInterestRate('7.40');
                  }
                }}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/80 font-bold"
              >
                <option value="Fixed Deposit">Fixed Deposit (FD - Lump sum)</option>
                <option value="Recurring Deposit">Recurring Deposit (RD - Monthly)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Customer Name *</label>
              <input
                type="text"
                required
                placeholder="Customer Full Name"
                value={depCustomerName}
                onChange={(e) => setDepCustomerName(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/80"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Account No. / CIF ID *</label>
              <input
                type="text"
                required
                placeholder="e.g. 918004291823 or CIF8920194"
                value={depCifOrAcc}
                onChange={(e) => setDepCifOrAcc(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/80"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Scheme Selection *</label>
              <select
                value={depSchemeName}
                onChange={(e) => setDepSchemeName(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/80"
              >
                {depType === 'Fixed Deposit' ? (
                  <>
                    <option value="Senior Citizen Special FD">Senior Citizen Special FD (7.85% p.a.)</option>
                    <option value="One Bank Prime FD">One Bank Prime FD (7.25% p.a.)</option>
                    <option value="Tax Saver FD (5 Yrs)">Tax Saver FD - Sec 80C (7.50% p.a.)</option>
                    <option value="Short Term Liquid FD">Short Term Liquid FD (6.80% p.a.)</option>
                  </>
                ) : (
                  <>
                    <option value="Super Builder RD">Super Builder RD (7.40% p.a.)</option>
                    <option value="Flexi Monthly RD">Flexi Monthly RD (7.10% p.a.)</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {depType === 'Fixed Deposit' ? 'Deposit Amount (₹) *' : 'Monthly Installment (₹) *'}
              </label>
              <input
                type="number"
                required
                min="500"
                step="500"
                value={depAmount}
                onChange={(e) => setDepAmount(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-sky-500/80"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tenure (Months) *</label>
              <select
                value={depTenureMonths}
                onChange={(e) => setDepTenureMonths(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-sky-500/80"
              >
                <option value="6">6 Months</option>
                <option value="12">12 Months (1 Year)</option>
                <option value="24">24 Months (2 Years)</option>
                <option value="36">36 Months (3 Years)</option>
                <option value="60">60 Months (5 Years)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Interest Rate % *</label>
              <input
                type="number"
                step="0.05"
                required
                value={depInterestRate}
                onChange={(e) => setDepInterestRate(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-sky-500/80"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Interest Payout Option *</label>
              <select
                value={depPayout}
                onChange={(e) => setDepPayout(e.target.value as any)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/80"
              >
                <option value="On Maturity">On Maturity (Cumulative Compound)</option>
                <option value="Quarterly">Quarterly Payout to Savings Acc</option>
                <option value="Monthly">Monthly Income Payout</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nominee Name & Relationship</label>
              <input
                type="text"
                placeholder="Nominee Name (e.g. Spouse / Child)"
                value={depNominee}
                onChange={(e) => setDepNominee(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/80"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-xs shadow-md shadow-sky-500/20 flex items-center space-x-2 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Create Term Deposit Certificate</span>
            </button>
          </div>
        </form>
      )}

      {/* SECTION 4: Active Branch Term Deposits Ledger */}
      <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-md shadow-sky-100/50 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center space-x-2">
              <Award className="w-5 h-5 text-sky-600" />
              <span>Active Branch Term Deposits Ledger</span>
            </h3>
            <p className="text-xs text-slate-500">Live list of active Fixed Deposits and Recurring Deposits created at T. Nagar branch</p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
            Total Deposits: {activeDeposits.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-500 font-bold uppercase text-[10px]">
                <th className="p-3">Certificate ID</th>
                <th className="p-3">Customer Name & CIF</th>
                <th className="p-3">Type & Scheme</th>
                <th className="p-3 text-right">Principal Amount</th>
                <th className="p-3 text-center">Interest %</th>
                <th className="p-3 text-right">Maturity Value</th>
                <th className="p-3 text-center">Maturity Date</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeDeposits.map((dep) => (
                <tr key={dep.id} className="hover:bg-sky-50/40 transition-colors">
                  <td className="p-3 font-mono font-bold text-sky-700">{dep.id}</td>
                  <td className="p-3">
                    <p className="font-bold text-slate-900">{dep.customerName}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{dep.cif}</p>
                  </td>
                  <td className="p-3">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded mr-1.5 ${
                      dep.type === 'Fixed Deposit' ? 'bg-sky-100 text-sky-800' : 'bg-indigo-100 text-indigo-800'
                    }`}>
                      {dep.type}
                    </span>
                    <span className="text-slate-700 font-semibold">{dep.schemeName}</span>
                  </td>
                  <td className="p-3 text-right font-mono font-bold text-slate-900">
                    ₹{dep.depositAmount.toLocaleString('en-IN')}
                    {dep.monthlyInstallment && (
                      <span className="block text-[10px] text-slate-500 font-normal">
                        (₹{dep.monthlyInstallment.toLocaleString('en-IN')}/mo)
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-center font-mono font-bold text-amber-600">
                    {dep.interestRate}%
                  </td>
                  <td className="p-3 text-right font-mono font-bold text-emerald-600">
                    ₹{dep.maturityAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3 text-center font-mono text-slate-600">
                    {dep.maturityDate}
                  </td>
                  <td className="p-3 text-center">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                      {dep.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
