export type SidebarTab = 
  | 'accounts'
  | 'deposit'
  | 'loan_management'
  | 'customer_service'
  | 'operations_analytics'
  | 'branch_performance'
  | 'profile';

export type MainTab = SidebarTab;

export type AccountsSubTab = 'create_account' | 'deposits' | 'balance_enquiry';
export type LoanSubTab = 'apply_loan' | 'loan_tracker' | 'loan_details';
export type CustomerServiceSubTab = 'create_request' | 'request_tracker';

export interface DepositAccount {
  id: string; // e.g. FD-2026-901 or RD-2026-402
  cif: string;
  customerName: string;
  type: 'Fixed Deposit' | 'Recurring Deposit';
  schemeName: string;
  depositAmount: number;
  monthlyInstallment?: number;
  tenureMonths: number;
  interestRate: number;
  maturityAmount: number;
  maturityDate: string;
  interestPayout: 'Quarterly' | 'Monthly' | 'On Maturity';
  nomineeName: string;
  createdDate: string;
  status: 'Active' | 'Matured' | 'Closed';
}

export interface EmployeeProfile {
  id: string;
  name: string;
  role: string;
  branch: string;
  department: string;
  email: string;
  phone: string;
  employeeCode: string;
}

export interface AccountApplication {
  id: string; // e.g. APP-2026-1082
  cif?: string;
  accountNumber?: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  mobileNumber: string;
  email: string;
  aadhaarNumber: string;
  panNumber: string;
  occupation: string;
  annualIncome: string;
  fullAddress: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  accountType: 'Savings Account' | 'Current Account' | 'Salary Account' | 'Senior Citizen Account' | 'Student Account' | 'NRI Account' | 'Joint Account';
  branch: string;
  initialDeposit: number;
  nomineeName: string;
  nomineeRelationship: string;
  nomineeMobile: string;
  assignedEmployee: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Draft';
  kycAadhaarUploaded: boolean;
  kycPanUploaded: boolean;
  kycPhotoUploaded: boolean;
  // Dynamic Account Type Fields
  jointHolderName?: string;
  jointHolderRelationship?: string;
  jointHolderMobile?: string;
  jointHolderAadhaar?: string;
  jointHolderPan?: string;
  institutionName?: string;
  studentId?: string;
  guardianName?: string;
  guardianRelationship?: string;
  guardianMobile?: string;
  guardianAadhaar?: string;
  passportNumber?: string;
  countryOfResidence?: string;
  overseasAddress?: string;
  overseasMobile?: string;
  companyName?: string;
  employeeId?: string;
  officialEmail?: string;
  businessName?: string;
  businessType?: string;
  gstinNumber?: string;
}

export interface BalanceEnquiryResult {
  customerName: string;
  customerID: string;
  accountNumber: string;
  accountType: string;
  branch: string;
  availableBalance: number;
  ledgerBalance: number;
  accountStatus: 'Active' | 'Dormant' | 'Frozen' | 'Under Review';
  deposits: {
    fixedDeposits: { fdNumber: string; amount: number; rate: string; maturity: string }[];
    recurringDeposits: { rdNumber: string; monthlyAmount: number; rate: string; maturity: string }[];
  };
  loans: {
    type: 'Personal Loan' | 'Home Loan' | 'Vehicle Loan' | 'Education Loan' | 'Gold Loan';
    loanId: string;
    outstandingAmount: number;
    emiAmount: number;
    emiStatus: 'Up-to-Date' | 'Overdue' | 'Closed';
  }[];
}

export interface LoanTypeInfo {
  type: string;
  interestRate: string;
  processingFee: string;
  minAmount: number;
  maxAmount: number;
  maxTenureMonths: number;
  description: string;
}

export interface LoanApplication {
  id: string; // e.g. LN-2026-4401
  customerName: string;
  cif: string;
  loanType: string;
  amount: number;
  interestRate: number;
  tenureMonths: number;
  emi: number;
  startDate: string;
  endDate: string;
  nextEmiDate: string;
  outstandingBalance: number;
  totalInterest: number;
  totalAmountPayable: number;
  assignedEmployee: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Disbursed';
  dateApplied: string;
}

export interface EmiScheduleItem {
  emiNumber: number;
  dueDate: string;
  principal: number;
  interest: number;
  emiAmount: number;
  status: 'Paid' | 'Upcoming' | 'Overdue';
}

export interface ServiceRequest {
  id: string; // e.g. SR-88201
  customerName: string;
  cifOrAcc: string;
  requestType: 
    | 'ATM Card'
    | 'Debit Card Block'
    | 'Cheque Book'
    | 'Passbook'
    | 'Address Change'
    | 'Mobile Number Update'
    | 'Email Update'
    | 'Internet Banking'
    | 'Mobile Banking'
    | 'KYC Update'
    | 'Account Closure'
    | 'Others';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  assignedEmployee: string;
  date: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  description: string;
  reachBack: {
    followUpDate: string;
    smsSent: boolean;
    emailSent: boolean;
    callStatus: 'Connected' | 'Unreachable' | 'Scheduled' | 'Not Initiated';
    nextFollowUp: string;
    resolutionNotes: string;
  };
  timeline: {
    created: string;
    assigned: string;
    followUp?: string;
    resolved?: string;
    closed?: string;
  };
}

export interface InternalTask {
  id: string;
  title: string;
  category?: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  assignedTo?: string;
  completed?: boolean;
  status: 'Pending' | 'In Progress' | 'Completed';
  description?: string;
}

export interface InternalMessage {
  id: string;
  sender: string;
  subject: string;
  time: string;
  read: boolean;
  type?: 'All Bank Circular' | 'Branch Birthday Wish' | 'Branch Announcement' | 'Operational Memo';
  preview: string;
  body: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'system' | 'audit' | 'task' | 'alert';
}
