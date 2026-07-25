import React, { useState } from 'react';
import { MainTab, AccountApplication, LoanApplication, ServiceRequest, InternalTask, DepositAccount } from './types';
import { 
  CURRENT_EMPLOYEE, 
  INITIAL_APPLICATIONS, 
  INITIAL_LOANS, 
  INITIAL_SERVICE_REQUESTS, 
  INITIAL_TASKS, 
  INITIAL_MESSAGES, 
  INITIAL_NOTIFICATIONS,
  INITIAL_DEPOSITS 
} from './mockData';

import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { AccountsModule } from './components/AccountsModule';
import { DepositModule } from './components/DepositModule';
import { LoanManagementModule } from './components/LoanManagementModule';
import { CustomerServiceHubModule } from './components/CustomerServiceHubModule';
import { OperationsAnalyticsModule } from './components/OperationsAnalyticsModule';
import { BranchPerformanceModule } from './components/BranchPerformanceModule';
import { ProfileModule } from './components/ProfileModule';
import { LogoutConfirmModal } from './components/LogoutConfirmModal';
import { LoginScreen } from './components/LoginScreen';
import { 
  MyTasksModal, 
  InboxModal, 
  NotificationsModal, 
  GlobalSearchModal 
} from './components/TopBarModals';
import { Lock, LogIn, ShieldCheck, Building2 } from 'lucide-react';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<MainTab>('customer_service');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false);

  // Application Dynamic Master State
  const [accounts, setAccounts] = useState<AccountApplication[]>(INITIAL_APPLICATIONS);
  const [loans, setLoans] = useState<LoanApplication[]>(INITIAL_LOANS);
  const [requests, setRequests] = useState<ServiceRequest[]>(INITIAL_SERVICE_REQUESTS);
  const [tasks, setTasks] = useState<InternalTask[]>(INITIAL_TASKS);
  const [deposits, setDeposits] = useState<DepositAccount[]>(INITIAL_DEPOSITS);
  const [inbox] = useState(INITIAL_MESSAGES);
  const [notifications] = useState(INITIAL_NOTIFICATIONS);

  // TopBar Modals State
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showTasksModal, setShowTasksModal] = useState(false);
  const [showInboxModal, setShowInboxModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // --- Handlers ---
  const handleSelectTab = (tab: MainTab) => {
    setActiveTab(tab);
  };

  const handleLogoutClick = () => {
    if (hasUnsavedChanges) {
      setShowLogoutModal(true);
    } else {
      setIsLoggedIn(false);
      setIsLoggedOut(true);
    }
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    setHasUnsavedChanges(false);
    setIsLoggedIn(false);
    setIsLoggedOut(true);
  };

  const handleAddAccount = (acc: AccountApplication) => {
    setAccounts((prev) => [acc, ...prev]);
    // Automatically record a completed success item in My Tasks
    const newTask: InternalTask = {
      id: `SUC-${Math.floor(1000 + Math.random() * 9000)}`,
      title: `✅ Account Opened: ${acc.accountType} - ${acc.firstName} ${acc.lastName}`,
      description: `Account #${acc.accountNumber || acc.id} successfully opened with initial deposit ₹${acc.initialDeposit.toLocaleString('en-IN')}. Welcome kit & debit card dispatched.`,
      category: 'Account Opening',
      assignedTo: 'Karthik Rajan',
      priority: 'High',
      completed: true,
      status: 'Completed',
      dueDate: 'Just Now'
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleAddDeposit = (dep: DepositAccount) => {
    setDeposits((prev) => [dep, ...prev]);
    // Automatically record a completed success item in My Tasks
    const newTask: InternalTask = {
      id: `SUC-${Math.floor(1000 + Math.random() * 9000)}`,
      title: `✅ Term Deposit Created: ${dep.type} (${dep.schemeName}) - ${dep.customerName}`,
      description: `Certificate #${dep.id} created for ₹${dep.depositAmount.toLocaleString('en-IN')} @ ${dep.interestRate}% p.a. Maturity Value: ₹${dep.maturityAmount.toLocaleString('en-IN')}`,
      category: 'Term Deposit',
      assignedTo: 'Karthik Rajan',
      priority: 'High',
      completed: true,
      status: 'Completed',
      dueDate: 'Just Now'
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleUpdateAccountStatus = (id: string, status: 'Approved' | 'Rejected') => {
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === id ? { ...acc, status } : acc))
    );
  };

  const handleAddLoan = (loan: LoanApplication) => {
    setLoans((prev) => [loan, ...prev]);
    // Automatically record a completed success item in My Tasks
    const newTask: InternalTask = {
      id: `SUC-${Math.floor(1000 + Math.random() * 9000)}`,
      title: `✅ Loan Approved & Sanctioned: ${loan.loanType} - ${loan.customerName}`,
      description: `Loan #${loan.id} for ₹${loan.amount.toLocaleString('en-IN')} approved at ${loan.interestRate}% p.a.`,
      category: 'Loan Disbursal',
      assignedTo: 'Karthik Rajan',
      priority: 'High',
      completed: true,
      status: 'Completed',
      dueDate: 'Just Now'
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleUpdateLoanStatus = (id: string, status: 'Approved' | 'Rejected' | 'Disbursed') => {
    setLoans((prev) =>
      prev.map((ln) => (ln.id === id ? { ...ln, status } : ln))
    );
  };

  const handleAddRequest = (req: ServiceRequest) => {
    setRequests((prev) => [req, ...prev]);
    // Automatically record a completed success item in My Tasks
    const newTask: InternalTask = {
      id: `SUC-${Math.floor(1000 + Math.random() * 9000)}`,
      title: `✅ Service Ticket Resolved: ${req.requestType}`,
      description: `Ticket #${req.id} for ${req.customerName} (${req.cifOrAcc}) successfully processed and closed.`,
      category: 'Customer Service',
      assignedTo: 'Karthik Rajan',
      priority: 'Medium',
      completed: true,
      status: 'Completed',
      dueDate: 'Just Now'
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleUpdateRequest = (updatedReq: ServiceRequest) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === updatedReq.id ? updatedReq : r))
    );
  };

  const handleUpdateTaskStatus = (taskId: string, status: InternalTask['status']) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t))
    );
  };

  // IF NOT LOGGED IN OR LOGGED OUT SCREEN
  if (!isLoggedIn || isLoggedOut) {
    return (
      <LoginScreen
        onLogin={() => {
          setIsLoggedIn(true);
          setIsLoggedOut(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
      {/* 1. FIXED LEFT SIDEBAR */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleSelectTab}
        onSelectTab={handleSelectTab}
        onLogoutClick={handleLogoutClick}
        hasUnsavedChanges={hasUnsavedChanges}
        isOpenMobile={isOpenMobile}
        setIsOpenMobile={setIsOpenMobile}
      />

      {/* RIGHT SIDE MAIN LAYOUT */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0 min-h-screen">
        {/* 2. TOP NAVIGATION BAR */}
        <TopBar
          employeeName={CURRENT_EMPLOYEE.name}
          taskCount={tasks.length}
          inboxCount={inbox.length}
          tasks={tasks}
          messages={inbox}
          onOpenSearch={() => setShowSearchModal(true)}
          onOpenTasks={() => setShowTasksModal(true)}
          onOpenInbox={() => setShowInboxModal(true)}
          onToggleMobileSidebar={() => setIsOpenMobile((prev) => !prev)}
        />

        {/* 3. DYNAMIC CONTENT AREA */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {activeTab === 'accounts' && (
            <AccountsModule
              applications={accounts}
              accounts={accounts}
              deposits={deposits}
              onAddApplication={handleAddAccount}
              onAddAccount={handleAddAccount}
              onAddDeposit={handleAddDeposit}
              onUpdateStatus={handleUpdateAccountStatus}
              onUpdateAccountStatus={handleUpdateAccountStatus}
              setHasUnsavedChanges={setHasUnsavedChanges}
            />
          )}

          {activeTab === 'deposit' && (
            <DepositModule
              deposits={deposits}
              onAddDeposit={handleAddDeposit}
              setHasUnsavedChanges={setHasUnsavedChanges}
            />
          )}

          {(activeTab === 'loan_management' || activeTab === 'loans') && (
            <LoanManagementModule
              loans={loans}
              onAddLoan={handleAddLoan}
              onUpdateLoanStatus={handleUpdateLoanStatus}
              setHasUnsavedChanges={setHasUnsavedChanges}
            />
          )}

          {(activeTab === 'customer_service' || activeTab === 'service_hub') && (
            <CustomerServiceHubModule
              requests={requests}
              onAddRequest={handleAddRequest}
              onUpdateRequest={handleUpdateRequest}
              setHasUnsavedChanges={setHasUnsavedChanges}
            />
          )}

          {(activeTab === 'operations_analytics' || activeTab === 'analytics') && (
            <OperationsAnalyticsModule />
          )}

          {(activeTab === 'branch_performance' || activeTab === 'performance') && (
            <BranchPerformanceModule />
          )}

          {activeTab === 'profile' && <ProfileModule employee={CURRENT_EMPLOYEE} />}
        </main>
      </div>

      {/* MODALS */}
      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
      />

      <MyTasksModal
        isOpen={showTasksModal}
        onClose={() => setShowTasksModal(false)}
        tasks={tasks}
        onUpdateTaskStatus={handleUpdateTaskStatus}
      />

      <InboxModal
        isOpen={showInboxModal}
        onClose={() => setShowInboxModal(false)}
        inbox={inbox}
      />

      <NotificationsModal
        isOpen={showNotificationsModal}
        onClose={() => setShowNotificationsModal(false)}
        notifications={notifications}
      />

      <GlobalSearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        accounts={accounts}
        loans={loans}
        requests={requests}
      />
    </div>
  );
}

export default App;
