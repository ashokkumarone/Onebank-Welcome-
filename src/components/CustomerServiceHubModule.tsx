import React, { useState } from 'react';
import { ServiceRequest, CustomerServiceSubTab } from '../types';
import { 
  Headphones, 
  PlusCircle, 
  ListFilter, 
  Search, 
  Send, 
  PhoneCall, 
  Mail, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  X, 
  Calendar,
  AlertCircle,
  FileText,
  User,
  Eye,
  ShieldAlert
} from 'lucide-react';

interface CustomerServiceHubModuleProps {
  requests: ServiceRequest[];
  onAddRequest: (req: ServiceRequest) => void;
  onUpdateRequest: (req: ServiceRequest) => void;
  setHasUnsavedChanges: (hasChanges: boolean) => void;
}

export const CustomerServiceHubModule: React.FC<CustomerServiceHubModuleProps> = ({
  requests,
  onAddRequest,
  onUpdateRequest,
  setHasUnsavedChanges,
}) => {
  const [subTab, setSubTab] = useState<CustomerServiceSubTab>('create_request');

  // --- Create Request Form State ---
  const [customerName, setCustomerName] = useState('');
  const [cifOrAcc, setCifOrAcc] = useState('');
  const [requestType, setRequestType] = useState<ServiceRequest['requestType']>('Cheque Book');
  const [priority, setPriority] = useState<ServiceRequest['priority']>('Medium');
  const [description, setDescription] = useState('');
  const [requestCreatedSuccess, setRequestCreatedSuccess] = useState(false);

  const requestTypesList: ServiceRequest['requestType'][] = [
    'ATM Card',
    'Debit Card Block',
    'Cheque Book',
    'Passbook',
    'Address Change',
    'Mobile Number Update',
    'Email Update',
    'Internet Banking',
    'Mobile Banking',
    'KYC Update',
    'Account Closure',
    'Others'
  ];

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !cifOrAcc.trim()) {
      alert('Please enter Customer Name and CIF or Account Number.');
      return;
    }
    const newReq: ServiceRequest = {
      id: `SR-${Math.floor(88000 + Math.random() * 9000)}`,
      customerName: customerName.trim(),
      cifOrAcc: cifOrAcc.trim(),
      requestType,
      priority,
      assignedEmployee: 'Karthik Rajan',
      date: new Date().toISOString().split('T')[0],
      status: 'Open',
      description: description.trim() || 'Branch service ticket initiated by employee.',
      reachBack: {
        followUpDate: new Date().toISOString().split('T')[0],
        smsSent: true,
        emailSent: false,
        callStatus: 'Not Initiated',
        nextFollowUp: new Date().toISOString().split('T')[0],
        resolutionNotes: 'Awaiting initial officer reachback call.'
      },
      timeline: {
        created: `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        assigned: `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      }
    };

    onAddRequest(newReq);
    setRequestCreatedSuccess(true);
    setHasUnsavedChanges(false);
    setCustomerName('');
    setCifOrAcc('');
    setDescription('');
  };

  // --- Request Tracker State ---
  const [trackerTab, setTrackerTab] = useState<'All' | 'Open' | 'In Progress' | 'Resolved' | 'Closed'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequestDetails, setSelectedRequestDetails] = useState<ServiceRequest | null>(requests[0] || null);

  const filteredRequests = requests.filter((req) => {
    if (trackerTab !== 'All' && req.status !== trackerTab) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = req.customerName.toLowerCase().includes(q);
      const matchId = req.id.toLowerCase().includes(q);
      const matchAcc = req.cifOrAcc.toLowerCase().includes(q);
      const matchType = req.requestType.toLowerCase().includes(q);
      if (!matchName && !matchId && !matchAcc && !matchType) return false;
    }
    return true;
  });

  // ReachBack Actions State inside Modal
  const [reachCallStatus, setReachCallStatus] = useState<'Connected' | 'Unreachable' | 'Scheduled' | 'Not Initiated'>('Connected');
  const [reachNotes, setReachNotes] = useState('');
  const [reachNextDate, setReachNextDate] = useState('2026-07-24');
  const [toastAlert, setToastAlert] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastAlert(msg);
    setTimeout(() => setToastAlert(null), 3000);
  };

  const handleSaveReachBack = (req: ServiceRequest) => {
    const updated: ServiceRequest = {
      ...req,
      status: req.status === 'Open' ? 'In Progress' : req.status,
      reachBack: {
        ...req.reachBack,
        callStatus: reachCallStatus,
        nextFollowUp: reachNextDate,
        resolutionNotes: reachNotes || req.reachBack.resolutionNotes
      },
      timeline: {
        ...req.timeline,
        followUp: `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      }
    };
    onUpdateRequest(updated);
    setSelectedRequestDetails(updated);
    showToast('ReachBack follow-up notes updated successfully!');
  };

  const handleResolveTicket = (req: ServiceRequest) => {
    const updated: ServiceRequest = {
      ...req,
      status: 'Resolved',
      timeline: {
        ...req.timeline,
        resolved: `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      }
    };
    onUpdateRequest(updated);
    setSelectedRequestDetails(updated);
    showToast(`Request ${req.id} marked as RESOLVED.`);
  };

  return (
    <div className="space-y-6">
      {toastAlert && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastAlert}</span>
        </div>
      )}

      {/* Top Header & SubTabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center space-x-2">
            <span>Customer Service Hub</span>
          </h2>
          <p className="text-xs text-slate-500">
            Branch ticketing, ReachBack follow-ups, SMS/Email logs, and audit resolution timeline
          </p>
        </div>

        <div className="flex items-center space-x-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <button
            id="btn-subtab-create-request"
            onClick={() => setSubTab('create_request')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
              subTab === 'create_request'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Request</span>
          </button>

          <button
            id="btn-subtab-request-tracker"
            onClick={() => setSubTab('request_tracker')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
              subTab === 'request_tracker'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <ListFilter className="w-4 h-4" />
            <span>Request Tracker</span>
            <span className="bg-sky-100 text-sky-900 text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold">
              {requests.length}
            </span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: CREATE REQUEST */}
      {subTab === 'create_request' && (
        <div className="space-y-6">
          {requestCreatedSuccess ? (
            <div className="bg-white border border-sky-200 rounded-2xl p-8 text-center max-w-xl mx-auto space-y-4 animate-fadeIn shadow-md shadow-sky-100/50">
              <CheckCircle2 className="w-14 h-14 text-sky-600 mx-auto" />
              <h3 className="text-lg font-black text-slate-900">Service Request Created!</h3>
              <p className="text-xs text-slate-500">
                Ticket is assigned to Operations Desk in Request Tracker.
              </p>
              <div className="flex justify-center space-x-3 pt-2">
                <button
                  onClick={() => setRequestCreatedSuccess(false)}
                  className="px-5 py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl shadow-md shadow-sky-500/20"
                >
                  New Request
                </button>
                <button
                  onClick={() => setSubTab('request_tracker')}
                  className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200"
                >
                  View Request Tracker
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCreateRequest} className="bg-white border border-sky-100 rounded-2xl p-6 shadow-md shadow-sky-100/50 space-y-6 max-w-3xl mx-auto">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-slate-900">New Customer Service Ticket</h3>
                <p className="text-xs text-slate-500">Internal branch request logging</p>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Customer ID (CIF) or Account No *</label>
                  <input
                    type="text"
                    required
                    placeholder="CIF or Account Number"
                    value={cifOrAcc}
                    onChange={(e) => { setCifOrAcc(e.target.value); setHasUnsavedChanges(true); }}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Service Request Type *</label>
                  <select
                    value={requestType}
                    onChange={(e) => { setRequestType(e.target.value as any); setHasUnsavedChanges(true); }}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {requestTypesList.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Priority SLA *</label>
                  <select
                    value={priority}
                    onChange={(e) => { setPriority(e.target.value as any); setHasUnsavedChanges(true); }}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Low">Low (SLA 48 Hours)</option>
                    <option value="Medium">Medium (SLA 24 Hours)</option>
                    <option value="High">High (SLA 12 Hours)</option>
                    <option value="Urgent">Urgent (SLA 2 Hours - Hotlist/Security)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Request Notes / Specific Instructions</label>
                  <textarea
                    rows={3}
                    placeholder="Enter detailed description of customer's request..."
                    value={description}
                    onChange={(e) => { setDescription(e.target.value); setHasUnsavedChanges(true); }}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-slate-100">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-xs shadow-md shadow-sky-500/20 flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Create Service Ticket</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* SUBTAB 2: REQUEST TRACKER & REACHBACK DETAILS */}
      {subTab === 'request_tracker' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Table Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-sky-100 p-4 rounded-2xl space-y-4 shadow-md shadow-sky-100/50">
              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                  {(['All', 'Open', 'In Progress', 'Resolved', 'Closed'] as const).map((tab) => (
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
                    placeholder="Search Request ID, Customer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/80"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-3 font-bold">Request ID</th>
                      <th className="py-3 px-3 font-bold">Customer</th>
                      <th className="py-3 px-3 font-bold">Request Type</th>
                      <th className="py-3 px-3 font-bold">Assigned Officer</th>
                      <th className="py-3 px-3 font-bold">Date</th>
                      <th className="py-3 px-3 font-bold">Status</th>
                      <th className="py-3 px-3 text-right font-bold">View</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredRequests.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-slate-400">
                          No service tickets found matching search.
                        </td>
                      </tr>
                    ) : (
                      filteredRequests.map((req) => (
                        <tr
                          key={req.id}
                          onClick={() => {
                            setSelectedRequestDetails(req);
                            setReachCallStatus(req.reachBack.callStatus);
                            setReachNotes(req.reachBack.resolutionNotes);
                          }}
                          className={`cursor-pointer transition-colors ${
                            selectedRequestDetails?.id === req.id
                              ? 'bg-sky-50 border-l-2 border-sky-500'
                              : 'hover:bg-slate-50'
                          }`}
                        >
                          <td className="py-3 px-3 font-mono font-bold text-sky-700">{req.id}</td>
                          <td className="py-3 px-3 font-bold text-slate-900">
                            <div>{req.customerName}</div>
                            <div className="text-[10px] text-slate-500 font-mono font-normal">{req.cifOrAcc}</div>
                          </td>
                          <td className="py-3 px-3 font-medium">{req.requestType}</td>
                          <td className="py-3 px-3 text-slate-600">{req.assignedEmployee}</td>
                          <td className="py-3 px-3 font-mono text-slate-500">{req.date}</td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                                req.status === 'Resolved' || req.status === 'Closed'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : req.status === 'In Progress'
                                  ? 'bg-sky-50 text-sky-700 border border-sky-200'
                                  : 'bg-rose-50 text-rose-700 border border-rose-200'
                              }`}
                            >
                              {req.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <Eye className="w-4 h-4 text-slate-400 inline" />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Request Details, ReachBack Follow-up & Audit Timeline */}
          {selectedRequestDetails && (
            <div className="space-y-4">
              {/* Ticket Summary Header */}
              <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-md shadow-sky-100/50 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-black text-slate-900">{selectedRequestDetails.requestType}</h3>
                    <p className="text-[11px] font-mono text-sky-700 font-bold">Ticket #{selectedRequestDetails.id}</p>
                  </div>
                  <span className="px-2 py-0.5 bg-sky-50 text-sky-800 font-mono text-[10px] font-bold rounded border border-sky-200 uppercase">
                    {selectedRequestDetails.priority} Priority
                  </span>
                </div>

                <div className="text-xs space-y-1.5 font-mono">
                  <p><span className="text-slate-500">Customer:</span> <strong className="text-slate-900">{selectedRequestDetails.customerName}</strong></p>
                  <p><span className="text-slate-500">CIF / Acc:</span> {selectedRequestDetails.cifOrAcc}</p>
                  <p><span className="text-slate-500">Description:</span> <span className="text-slate-700">{selectedRequestDetails.description}</span></p>
                </div>

                {/* REACHBACK FOLLOW-UP SECTION */}
                <div className="bg-sky-50/50 p-4 rounded-xl border border-sky-200 space-y-3">
                  <h4 className="text-xs font-bold text-sky-800 uppercase tracking-wider border-b border-sky-200 pb-1.5">
                    ReachBack Follow-up Controls
                  </h4>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 bg-white rounded border border-sky-200 flex justify-between items-center">
                      <span className="text-slate-500">SMS Sent:</span>
                      <span className={selectedRequestDetails.reachBack.smsSent ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                        {selectedRequestDetails.reachBack.smsSent ? 'YES' : 'NO'}
                      </span>
                    </div>

                    <div className="p-2 bg-white rounded border border-sky-200 flex justify-between items-center">
                      <span className="text-slate-500">Email Sent:</span>
                      <span className={selectedRequestDetails.reachBack.emailSent ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                        {selectedRequestDetails.reachBack.emailSent ? 'YES' : 'NO'}
                      </span>
                    </div>
                  </div>

                  {/* Reachback Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => showToast('SMS Update sent to customer mobile')}
                      className="flex-1 py-1.5 bg-white hover:bg-slate-50 text-slate-800 text-[11px] font-semibold rounded-lg border border-slate-200 flex items-center justify-center space-x-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
                      <span>Send SMS</span>
                    </button>
                    <button
                      onClick={() => showToast('Email notification dispatched')}
                      className="flex-1 py-1.5 bg-white hover:bg-slate-50 text-slate-800 text-[11px] font-semibold rounded-lg border border-slate-200 flex items-center justify-center space-x-1"
                    >
                      <Mail className="w-3.5 h-3.5 text-sky-600" />
                      <span>Send Email</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <label className="block text-[10px] text-slate-600 font-mono mb-1">Call Status</label>
                      <select
                        value={reachCallStatus}
                        onChange={(e) => setReachCallStatus(e.target.value as any)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 font-mono focus:outline-none focus:ring-1 focus:ring-sky-500"
                      >
                        <option value="Connected">Connected with Customer</option>
                        <option value="Unreachable">Unreachable / Ringing</option>
                        <option value="Scheduled">Scheduled Callback</option>
                        <option value="Not Initiated">Not Initiated</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-600 font-mono mb-1">Next Follow-up Date</label>
                      <input
                        type="date"
                        value={reachNextDate}
                        onChange={(e) => setReachNextDate(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 font-mono focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-600 font-mono mb-1">Resolution Notes</label>
                      <textarea
                        rows={2}
                        value={reachNotes}
                        onChange={(e) => setReachNotes(e.target.value)}
                        placeholder="Enter resolution notes..."
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                    </div>

                    <div className="flex space-x-2 pt-1">
                      <button
                        onClick={() => handleSaveReachBack(selectedRequestDetails)}
                        className="flex-1 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl shadow-xs"
                      >
                        Save Follow-up Notes
                      </button>
                      {selectedRequestDetails.status !== 'Resolved' && (
                        <button
                          onClick={() => handleResolveTicket(selectedRequestDetails)}
                          className="py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* VISUAL TIMELINE */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                    Audit Timeline
                  </h4>

                  <div className="space-y-3 text-xs font-mono relative pl-4 border-l border-slate-300">
                    <div className="relative">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute -left-[21px] top-1"></span>
                      <p className="font-bold text-slate-900">Request Created</p>
                      <p className="text-[10px] text-slate-500">{selectedRequestDetails.timeline.created}</p>
                    </div>

                    <div className="relative">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-500 absolute -left-[21px] top-1"></span>
                      <p className="font-bold text-slate-900">Assigned to Officer</p>
                      <p className="text-[10px] text-slate-500">{selectedRequestDetails.timeline.assigned} ({selectedRequestDetails.assignedEmployee})</p>
                    </div>

                    {selectedRequestDetails.timeline.followUp && (
                      <div className="relative">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-600 absolute -left-[21px] top-1"></span>
                        <p className="font-bold text-slate-900">ReachBack Follow-up</p>
                        <p className="text-[10px] text-slate-500">{selectedRequestDetails.timeline.followUp}</p>
                      </div>
                    )}

                    {selectedRequestDetails.timeline.resolved && (
                      <div className="relative">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 absolute -left-[21px] top-1"></span>
                        <p className="font-bold text-emerald-700">Resolved</p>
                        <p className="text-[10px] text-slate-500">{selectedRequestDetails.timeline.resolved}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
