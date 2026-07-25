import React, { useState } from 'react';
import { InternalTask, AccountApplication, LoanApplication, ServiceRequest } from '../types';
import { 
  X, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Inbox, 
  Bell, 
  CheckSquare, 
  User, 
  Landmark, 
  FileText, 
  ChevronRight,
  ShieldAlert,
  Send
} from 'lucide-react';

// --- MY TASKS MODAL ---
interface MyTasksModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks?: InternalTask[];
  onUpdateTaskStatus?: (taskId: string, status: InternalTask['status']) => void;
}

export const MyTasksModal: React.FC<MyTasksModalProps> = ({
  isOpen,
  onClose,
  tasks = [],
}) => {
  if (!isOpen) return null;
  const safeTasks = tasks || [];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-sky-100 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-fadeIn">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center space-x-2">
            <CheckSquare className="w-5 h-5 text-sky-600" />
            <div>
              <h3 className="text-sm font-black text-slate-900">My Completed Banking Successes</h3>
              <p className="text-[10px] text-slate-500">Log of successfully opened accounts, approved loans & processed banking requests</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="bg-sky-100 text-sky-800 font-mono text-xs px-2.5 py-1 rounded-lg border border-sky-200 font-bold flex items-center space-x-1">
              <span>{safeTasks.length} Successful Business Items</span>
            </span>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="p-4 space-y-3 overflow-y-auto flex-1 text-xs">
          {safeTasks.length === 0 ? (
            <div className="text-center py-10 text-slate-400 font-mono">
              No completed banking tasks yet. Open a new account or loan to record success!
            </div>
          ) : (
            safeTasks.map((task) => (
              <div
                key={task.id}
                className="p-3.5 rounded-xl border bg-white border-slate-200 shadow-xs hover:border-sky-300 transition-all space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-slate-500 text-[10px]">{task.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-sky-100 text-sky-800 border border-sky-200 flex items-center space-x-1">
                      <span>✅ SUCCESS</span>
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{task.dueDate}</span>
                </div>

                <h4 className="font-black text-slate-900 text-xs flex items-center justify-between">
                  <span>{task.title}</span>
                </h4>

                <p className="text-slate-600 text-[11px] leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  {task.description}
                </p>
                
                <div className="flex justify-between items-center pt-1 text-[10px] font-mono text-slate-500">
                  <span className="text-sky-700 font-bold flex items-center space-x-1">
                    <span>🏦 Record Verified & Added to CBS</span>
                  </span>
                  <span className="text-slate-400 font-medium">Status: Completed</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};


// --- INBOX MODAL ---
interface InboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  inbox?: any[];
}

export const InboxModal: React.FC<InboxModalProps> = ({ isOpen, onClose, inbox = [] }) => {
  const [filterType, setFilterType] = useState<'All' | 'All Bank Circular' | 'Branch Birthday Wish'>('All');
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);

  if (!isOpen) return null;
  const safeInbox = inbox || [];

  const filteredMessages = safeInbox.filter((msg) => {
    if (filterType === 'All') return true;
    if (filterType === 'All Bank Circular') return msg.type === 'All Bank Circular' || msg.subject.includes('Circular') || msg.subject.includes('Guideline');
    if (filterType === 'Branch Birthday Wish') return msg.type === 'Branch Birthday Wish' || msg.subject.includes('Birthday') || msg.subject.includes('🎂');
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-sky-100 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-fadeIn">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-sky-600" />
            <div>
              <h3 className="text-sm font-black text-slate-900">Branch Notifications & Bank Memos</h3>
              <p className="text-[10px] text-slate-500">Bank-wide broadcast circulars and branch team birthday announcements</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories Tab Bar */}
        <div className="px-4 py-2.5 bg-slate-100/70 border-b border-slate-200 flex items-center space-x-2 overflow-x-auto text-xs">
          <button
            onClick={() => { setFilterType('All'); setSelectedMessage(null); }}
            className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all ${
              filterType === 'All'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            All Memos ({safeInbox.length})
          </button>
          <button
            onClick={() => { setFilterType('All Bank Circular'); setSelectedMessage(null); }}
            className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center space-x-1 ${
              filterType === 'All Bank Circular'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <span>📢 All Bank Circulars</span>
          </button>
          <button
            onClick={() => { setFilterType('Branch Birthday Wish'); setSelectedMessage(null); }}
            className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center space-x-1 ${
              filterType === 'Branch Birthday Wish'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <span>🎂 Branch Birthdays</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto flex-1 text-xs">
          {selectedMessage ? (
            /* Selected Message Full View */
            <div className="space-y-4 animate-fadeIn">
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-xs text-sky-700 font-bold hover:underline flex items-center space-x-1 mb-2"
              >
                <span>← Back to Inbox list</span>
              </button>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block">From:</span>
                    <span className="font-bold text-sky-800 text-xs">{selectedMessage.sender}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-500 block">{selectedMessage.time || selectedMessage.date}</span>
                    <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded border border-sky-200 uppercase font-mono">
                      {selectedMessage.type || 'Bank Communication'}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-black text-slate-900 text-sm">{selectedMessage.subject}</h4>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 font-sans text-xs text-slate-800 whitespace-pre-wrap leading-relaxed shadow-xs">
                  {selectedMessage.body || selectedMessage.preview}
                </div>
              </div>
            </div>
          ) : (
            /* Message List View */
            <div className="space-y-2.5">
              {filteredMessages.length === 0 ? (
                <div className="text-center py-10 text-slate-400 font-mono">
                  No communications found in this category.
                </div>
              ) : (
                filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className="p-3 bg-slate-50 hover:bg-sky-50/60 border border-slate-200 hover:border-sky-300 rounded-xl space-y-1.5 cursor-pointer transition-all shadow-xs group"
                  >
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sky-700">{msg.sender}</span>
                        {msg.type && (
                          <span className={`px-2 py-0.2 rounded text-[9px] font-bold ${
                            msg.type === 'Branch Birthday Wish'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-sky-100 text-sky-800 border border-sky-200'
                          }`}>
                            {msg.type}
                          </span>
                        )}
                      </div>
                      <span className="text-slate-500">{msg.time || msg.date}</span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-xs group-hover:text-sky-700 transition-colors flex items-center justify-between">
                      <span>{msg.subject}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors shrink-0" />
                    </h4>

                    <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2">
                      {msg.preview}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


// --- NOTIFICATIONS MODAL ---
interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications?: any[];
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose, notifications = [] }) => {
  if (!isOpen) return null;
  const safeNotifications = notifications || [];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-sky-100 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-fadeIn">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-sky-600" />
            <h3 className="text-sm font-black text-slate-900">System Operations Alerts</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-2.5 overflow-y-auto flex-1 text-xs">
          {safeNotifications.map((n) => (
            <div key={n.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start space-x-3">
              <span className="w-2 h-2 rounded-full bg-sky-500 mt-1.5 shrink-0"></span>
              <div className="flex-1">
                <p className="text-slate-900 font-semibold">{n.title}</p>
                <p className="text-slate-500 text-[11px]">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// --- GLOBAL SEARCH MODAL ---
interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts?: AccountApplication[];
  loans?: LoanApplication[];
  requests?: ServiceRequest[];
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  accounts = [],
  loans = [],
  requests = [],
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();
  const safeAccounts = accounts || [];
  const safeLoans = loans || [];
  const safeRequests = requests || [];

  const matchedAccounts = q
    ? safeAccounts.filter(a => {
        const name = (a.customerName || `${a.firstName || ''} ${a.lastName || ''}`).toLowerCase();
        const cif = (a.cif || '').toLowerCase();
        const accNo = a.accountNumber || '';
        const id = (a.id || '').toLowerCase();
        return name.includes(q) || cif.includes(q) || accNo.includes(q) || id.includes(q);
      })
    : [];

  const matchedLoans = q
    ? safeLoans.filter(l => {
        const name = (l.customerName || '').toLowerCase();
        const cif = (l.cif || '').toLowerCase();
        const id = (l.id || '').toLowerCase();
        return name.includes(q) || cif.includes(q) || id.includes(q);
      })
    : [];

  const matchedRequests = q
    ? safeRequests.filter(r => {
        const name = (r.customerName || '').toLowerCase();
        const cif = (r.cifOrAcc || '').toLowerCase();
        const id = (r.id || '').toLowerCase();
        return name.includes(q) || cif.includes(q) || id.includes(q);
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-start justify-center pt-20 p-4">
      <div className="bg-white border border-sky-100 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh] animate-fadeIn">
        {/* Search Input Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center space-x-3">
          <Search className="w-5 h-5 text-sky-600" />
          <input
            type="text"
            autoFocus
            placeholder="Search across Account numbers, CIF, Customer Names, Loan IDs, Service Tickets..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          {!q && (
            <div className="text-center py-10 text-slate-500 space-y-1 font-mono">
              <p className="text-slate-600">Type a keyword to perform global enterprise search.</p>
              <p className="text-[10px]">E.g. "Rajesh", "CIF8920194", "LN-2026", "SR-88", "91800"</p>
            </div>
          )}

          {q && matchedAccounts.length === 0 && matchedLoans.length === 0 && matchedRequests.length === 0 && (
            <div className="text-center py-8 text-slate-500 font-mono">
              No matching accounts, loans, or service records found for "{query}".
            </div>
          )}

          {/* Accounts Results */}
          {matchedAccounts.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-sky-800 uppercase tracking-wider">
                Accounts ({matchedAccounts.length})
              </h4>
              <div className="space-y-1.5">
                {matchedAccounts.map(acc => (
                  <div key={acc.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center font-mono">
                    <div>
                      <p className="font-bold text-slate-900">{acc.customerName}</p>
                      <p className="text-[10px] text-slate-500">CIF: {acc.cif} | Acc: {acc.accountNumber || 'Pending'} ({acc.accountType})</p>
                    </div>
                    <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded uppercase font-bold">{acc.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Loans Results */}
          {matchedLoans.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                Loans ({matchedLoans.length})
              </h4>
              <div className="space-y-1.5">
                {matchedLoans.map(ln => (
                  <div key={ln.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center font-mono">
                    <div>
                      <p className="font-bold text-slate-900">{ln.customerName} - {ln.loanType}</p>
                      <p className="text-[10px] text-slate-500">ID: {ln.id} | Amount: ₹{ln.amount.toLocaleString('en-IN')}</p>
                    </div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded uppercase font-bold">{ln.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requests Results */}
          {matchedRequests.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">
                Service Tickets ({matchedRequests.length})
              </h4>
              <div className="space-y-1.5">
                {matchedRequests.map(req => (
                  <div key={req.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center font-mono">
                    <div>
                      <p className="font-bold text-slate-900">{req.customerName} - {req.requestType}</p>
                      <p className="text-[10px] text-slate-500">ID: {req.id} | CIF: {req.cifOrAcc}</p>
                    </div>
                    <span className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded uppercase font-bold">{req.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
