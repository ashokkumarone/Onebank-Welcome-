import {
  AccountApplication,
  BalanceEnquiryResult,
  LoanApplication,
  LoanTypeInfo,
  EmiScheduleItem,
  ServiceRequest,
  InternalTask,
  InternalMessage,
  SystemNotification,
  EmployeeProfile
} from './types';

export const CURRENT_EMPLOYEE: EmployeeProfile = {
  id: 'EMP-90001',
  name: 'Manager',
  role: 'Branch Manager',
  branch: 'Main Branch',
  department: 'Branch Operations & Management',
  email: 'manager@onebank.in',
  phone: '+91 98401 00000',
  employeeCode: 'BNK-MGR-0001'
};

export const INITIAL_APPLICATIONS: AccountApplication[] = [
  {
    id: 'APP-2026-1082',
    cif: 'CIF8920194',
    accountNumber: '918004291823',
    firstName: 'Anand',
    lastName: 'Krishnan',
    dob: '1992-05-14',
    gender: 'Male',
    mobileNumber: '+91 98402 11029',
    email: 'anand.k@gmail.com',
    aadhaarNumber: '4829 1029 8831',
    panNumber: 'ABCDE1234F',
    occupation: 'Software Engineer',
    annualIncome: '₹12,00,000 - ₹15,00,000',
    fullAddress: '45, South Boag Road, T. Nagar',
    city: 'Chennai',
    district: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600017',
    accountType: 'Savings Account',
    branch: 'T. Nagar, Chennai',
    initialDeposit: 10000,
    nomineeName: 'Priya Krishnan',
    nomineeRelationship: 'Spouse',
    nomineeMobile: '+91 98402 99821',
    assignedEmployee: 'Karthik Rajan',
    date: '2026-07-22',
    status: 'Approved',
    kycAadhaarUploaded: true,
    kycPanUploaded: true,
    kycPhotoUploaded: true,
  },
  {
    id: 'APP-2026-1083',
    firstName: 'Meenakshi',
    lastName: 'Sundaram',
    dob: '1985-09-20',
    gender: 'Female',
    mobileNumber: '+91 97901 88201',
    email: 'meena.sundaram@techcorp.in',
    aadhaarNumber: '9820 1192 4810',
    panNumber: 'FGHIJ5678K',
    occupation: 'Business Owner',
    annualIncome: '₹25,00,000+',
    fullAddress: '12, 10th Main Road, Anna Nagar',
    city: 'Chennai',
    district: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600040',
    accountType: 'Current Account',
    branch: 'Anna Nagar, Chennai',
    initialDeposit: 50000,
    nomineeName: 'Suresh Sundaram',
    nomineeRelationship: 'Spouse',
    nomineeMobile: '+91 97901 00291',
    assignedEmployee: 'Saritha V',
    date: '2026-07-23',
    status: 'Pending',
    kycAadhaarUploaded: true,
    kycPanUploaded: true,
    kycPhotoUploaded: true,
  },
  {
    id: 'APP-2026-1084',
    firstName: 'Ramaswamy',
    lastName: 'Iyer',
    dob: '1958-11-03',
    gender: 'Male',
    mobileNumber: '+91 94441 55029',
    email: 'r.iyer58@yahoo.com',
    aadhaarNumber: '1102 9930 4811',
    panNumber: 'KLMNO9012P',
    occupation: 'Retired Public Servant',
    annualIncome: '₹6,00,000 - ₹10,00,000',
    fullAddress: '88, Cross Street, Gandhipuram',
    city: 'Coimbatore',
    district: 'Coimbatore',
    state: 'Tamil Nadu',
    pincode: '641012',
    accountType: 'Senior Citizen Account',
    branch: 'Gandhipuram, Coimbatore',
    initialDeposit: 25000,
    nomineeName: 'Lakshmi Iyer',
    nomineeRelationship: 'Spouse',
    nomineeMobile: '+91 94441 55030',
    assignedEmployee: 'Murugan P',
    date: '2026-07-21',
    status: 'Approved',
    kycAadhaarUploaded: true,
    kycPanUploaded: true,
    kycPhotoUploaded: true,
  },
  {
    id: 'APP-2026-1085',
    firstName: 'Kavitha',
    lastName: 'Dhanasekar',
    dob: '1998-03-12',
    gender: 'Female',
    mobileNumber: '+91 98840 33910',
    email: 'kavi.dhana@outlook.com',
    aadhaarNumber: '7730 1928 4401',
    panNumber: 'PQRST3456U',
    occupation: 'Architect',
    annualIncome: '₹8,00,000 - ₹12,00,000',
    fullAddress: '22, Masi Street, Simmakkal',
    city: 'Madurai',
    district: 'Madurai',
    state: 'Tamil Nadu',
    pincode: '625001',
    accountType: 'Salary Account',
    branch: 'Simmakkal, Madurai',
    initialDeposit: 0,
    nomineeName: 'Dhanasekar M',
    nomineeRelationship: 'Father',
    nomineeMobile: '+91 98840 33900',
    assignedEmployee: 'Karthik Rajan',
    date: '2026-07-20',
    status: 'Rejected',
    kycAadhaarUploaded: true,
    kycPanUploaded: false,
    kycPhotoUploaded: true,
  },
  {
    id: 'APP-2026-DRAFT1',
    firstName: 'Vijay',
    lastName: 'Sethupathi',
    dob: '1990-08-15',
    gender: 'Male',
    mobileNumber: '+91 99400 12345',
    email: 'vijay.s@cinema.in',
    aadhaarNumber: '3391 0029 8812',
    panNumber: 'VWXYZ7890A',
    occupation: 'Actor / Consultant',
    annualIncome: '₹50,00,000+',
    fullAddress: '101, Beach Road, Besant Nagar',
    city: 'Chennai',
    district: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600090',
    accountType: 'Savings Account',
    branch: 'T. Nagar, Chennai',
    initialDeposit: 100000,
    nomineeName: 'Jessi V',
    nomineeRelationship: 'Spouse',
    nomineeMobile: '+91 99400 54321',
    assignedEmployee: 'Karthik Rajan',
    date: '2026-07-23',
    status: 'Draft',
    kycAadhaarUploaded: true,
    kycPanUploaded: true,
    kycPhotoUploaded: false,
  }
];

export const MOCK_BALANCE_ENQUIRY_DATABASE: Record<string, BalanceEnquiryResult> = {
  '918004291823': {
    customerName: 'Anand Krishnan',
    customerID: 'CIF8920194',
    accountNumber: '918004291823',
    accountType: 'Prime Savings Account',
    branch: 'T. Nagar Branch, Chennai',
    availableBalance: 248950.75,
    ledgerBalance: 253950.75,
    accountStatus: 'Active',
    deposits: {
      fixedDeposits: [
        { fdNumber: 'FD-TN-88201', amount: 500000, rate: '7.5% p.a.', maturity: '2027-08-15' },
        { fdNumber: 'FD-TN-99102', amount: 200000, rate: '7.8% p.a.', maturity: '2028-03-20' }
      ],
      recurringDeposits: [
        { rdNumber: 'RD-TN-44102', monthlyAmount: 10000, rate: '7.2% p.a.', maturity: '2026-12-01' }
      ]
    },
    loans: [
      {
        type: 'Home Loan',
        loanId: 'LN-HL-2024-88',
        outstandingAmount: 3840290,
        emiAmount: 38250,
        emiStatus: 'Up-to-Date'
      }
    ]
  },
  'CIF8920194': {
    customerName: 'Anand Krishnan',
    customerID: 'CIF8920194',
    accountNumber: '918004291823',
    accountType: 'Prime Savings Account',
    branch: 'T. Nagar Branch, Chennai',
    availableBalance: 248950.75,
    ledgerBalance: 253950.75,
    accountStatus: 'Active',
    deposits: {
      fixedDeposits: [
        { fdNumber: 'FD-TN-88201', amount: 500000, rate: '7.5% p.a.', maturity: '2027-08-15' }
      ],
      recurringDeposits: []
    },
    loans: [
      {
        type: 'Home Loan',
        loanId: 'LN-HL-2024-88',
        outstandingAmount: 3840290,
        emiAmount: 38250,
        emiStatus: 'Up-to-Date'
      }
    ]
  },
  '9840211029': {
    customerName: 'Anand Krishnan',
    customerID: 'CIF8920194',
    accountNumber: '918004291823',
    accountType: 'Prime Savings Account',
    branch: 'T. Nagar Branch, Chennai',
    availableBalance: 248950.75,
    ledgerBalance: 253950.75,
    accountStatus: 'Active',
    deposits: {
      fixedDeposits: [],
      recurringDeposits: []
    },
    loans: []
  },
  '918005510294': {
    customerName: 'Meenakshi Sundaram',
    customerID: 'CIF4419201',
    accountNumber: '918005510294',
    accountType: 'Current Business Platinum Account',
    branch: 'Anna Nagar Branch, Chennai',
    availableBalance: 1245080.00,
    ledgerBalance: 1245080.00,
    accountStatus: 'Active',
    deposits: {
      fixedDeposits: [
        { fdNumber: 'FD-AN-10029', amount: 1500000, rate: '8.1% p.a.', maturity: '2027-01-10' }
      ],
      recurringDeposits: []
    },
    loans: [
      {
        type: 'Vehicle Loan',
        loanId: 'LN-VL-2025-12',
        outstandingAmount: 640000,
        emiAmount: 21500,
        emiStatus: 'Up-to-Date'
      }
    ]
  }
};

export const LOAN_TYPES_CATALOG: LoanTypeInfo[] = [
  {
    type: 'Personal Loan',
    interestRate: '10.5% p.a. onwards',
    processingFee: '0.50% (Min ₹1,000)',
    minAmount: 50000,
    maxAmount: 2500000,
    maxTenureMonths: 60,
    description: 'Instant collateral-free personal loans for salaried and self-employed employees with quick disbursal.'
  },
  {
    type: 'Home Loan',
    interestRate: '8.35% p.a. onwards',
    processingFee: '0.25% (Min ₹3,000)',
    minAmount: 500000,
    maxAmount: 50000000,
    maxTenureMonths: 360,
    description: 'Flexible housing finance for flat purchase, plot construction, or home expansion with tax benefits.'
  },
  {
    type: 'Vehicle Loan',
    interestRate: '8.75% p.a. onwards',
    processingFee: '0.40% (Min ₹1,500)',
    minAmount: 100000,
    maxAmount: 10000000,
    maxTenureMonths: 84,
    description: 'Up to 90% road price financing for two-wheelers, passenger cars, and commercial EV fleets.'
  },
  {
    type: 'Gold Loan',
    interestRate: '7.20% p.a. onwards',
    processingFee: '0.10% (Min ₹250)',
    minAmount: 20000,
    maxAmount: 5000000,
    maxTenureMonths: 36,
    description: 'Instant liquid overdraft against gold ornaments evaluated with high per-gram valuation rates.'
  },
  {
    type: 'Education Loan',
    interestRate: '6.85% p.a. onwards',
    processingFee: 'Nil for Inland studies',
    minAmount: 100000,
    maxAmount: 15000000,
    maxTenureMonths: 180,
    description: 'Higher education financing in India and abroad with zero-EMI moratorium during study period.'
  }
];

export const INITIAL_LOANS: LoanApplication[] = [
  {
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
  },
  {
    id: 'LN-2026-4402',
    customerName: 'Meenakshi Sundaram',
    cif: 'CIF4419201',
    loanType: 'Vehicle Loan',
    amount: 950000,
    interestRate: 8.75,
    tenureMonths: 60,
    emi: 19612,
    startDate: '2025-06-10',
    endDate: '2030-06-10',
    nextEmiDate: '2026-08-10',
    outstandingBalance: 640000,
    totalInterest: 226720,
    totalAmountPayable: 1176720,
    assignedEmployee: 'Saritha V',
    status: 'Disbursed',
    dateApplied: '2025-05-20'
  },
  {
    id: 'LN-2026-4403',
    customerName: 'Rajesh Kumar',
    cif: 'CIF1102941',
    loanType: 'Personal Loan',
    amount: 500000,
    interestRate: 10.5,
    tenureMonths: 36,
    emi: 16250,
    startDate: '2026-07-10',
    endDate: '2029-07-10',
    nextEmiDate: '2026-08-10',
    outstandingBalance: 500000,
    totalInterest: 85000,
    totalAmountPayable: 585000,
    assignedEmployee: 'Karthik Rajan',
    status: 'Pending',
    dateApplied: '2026-07-22'
  },
  {
    id: 'LN-2026-4404',
    customerName: 'Senthil Nathan',
    cif: 'CIF7739102',
    loanType: 'Gold Loan',
    amount: 350000,
    interestRate: 7.2,
    tenureMonths: 24,
    emi: 15700,
    startDate: '2026-07-18',
    endDate: '2028-07-18',
    nextEmiDate: '2026-08-18',
    outstandingBalance: 350000,
    totalInterest: 26800,
    totalAmountPayable: 376800,
    assignedEmployee: 'Murugan P',
    status: 'Approved',
    dateApplied: '2026-07-15'
  }
];

export const SAMPLE_EMI_SCHEDULE: EmiScheduleItem[] = [
  { emiNumber: 25, dueDate: '2026-05-05', principal: 11820, interest: 26905, emiAmount: 38725, status: 'Paid' },
  { emiNumber: 26, dueDate: '2026-06-05', principal: 11902, interest: 26823, emiAmount: 38725, status: 'Paid' },
  { emiNumber: 27, dueDate: '2026-07-05', principal: 11985, interest: 26740, emiAmount: 38725, status: 'Paid' },
  { emiNumber: 28, dueDate: '2026-08-05', principal: 12069, interest: 26656, emiAmount: 38725, status: 'Upcoming' },
  { emiNumber: 29, dueDate: '2026-09-05', principal: 12153, interest: 26572, emiAmount: 38725, status: 'Upcoming' },
  { emiNumber: 30, dueDate: '2026-10-05', principal: 12238, interest: 26487, emiAmount: 38725, status: 'Upcoming' },
];

export const INITIAL_SERVICE_REQUESTS: ServiceRequest[] = [
  {
    id: 'SR-88201',
    customerName: 'Anand Krishnan',
    cifOrAcc: '918004291823',
    requestType: 'Cheque Book',
    priority: 'Medium',
    assignedEmployee: 'Karthik Rajan',
    date: '2026-07-22',
    status: 'In Progress',
    description: 'Requested 50-leaf CTS-2010 chequebook for salary account dispatch to T. Nagar branch address.',
    reachBack: {
      followUpDate: '2026-07-23',
      smsSent: true,
      emailSent: true,
      callStatus: 'Connected',
      nextFollowUp: '2026-07-24',
      resolutionNotes: 'Chequebook printed by central operations. Dispatched via BlueDart AWB#8821092.'
    },
    timeline: {
      created: '2026-07-22 10:15 AM',
      assigned: '2026-07-22 10:30 AM',
      followUp: '2026-07-23 02:00 PM'
    }
  },
  {
    id: 'SR-88202',
    customerName: 'Meenakshi Sundaram',
    cifOrAcc: 'CIF4419201',
    requestType: 'Debit Card Block',
    priority: 'Urgent',
    assignedEmployee: 'Saritha V',
    date: '2026-07-23',
    status: 'Open',
    description: 'Card lost during travel at Airport. Immediate hotlisting requested for RuPay Platinum #4091.',
    reachBack: {
      followUpDate: '2026-07-23',
      smsSent: true,
      emailSent: false,
      callStatus: 'Connected',
      nextFollowUp: '2026-07-23',
      resolutionNotes: 'Temporary card freeze initiated. Awaiting confirmation for permanent replacement reissue.'
    },
    timeline: {
      created: '2026-07-23 08:45 AM',
      assigned: '2026-07-23 09:00 AM'
    }
  },
  {
    id: 'SR-88203',
    customerName: 'Senthil Nathan',
    cifOrAcc: '918009920192',
    requestType: 'Address Change',
    priority: 'Low',
    assignedEmployee: 'Murugan P',
    date: '2026-07-20',
    status: 'Resolved',
    description: 'Updated residential address with valid EB Bill proof for Simmakkal Madurai jurisdiction.',
    reachBack: {
      followUpDate: '2026-07-21',
      smsSent: true,
      emailSent: true,
      callStatus: 'Connected',
      nextFollowUp: '2026-07-21',
      resolutionNotes: 'Address verified with Tamil Nadu TANGEDCO EB bill proof and updated in core banking system.'
    },
    timeline: {
      created: '2026-07-20 11:00 AM',
      assigned: '2026-07-20 11:30 AM',
      followUp: '2026-07-21 03:30 PM',
      resolved: '2026-07-21 05:00 PM'
    }
  },
  {
    id: 'SR-88204',
    customerName: 'Kavitha D',
    cifOrAcc: 'CIF7739102',
    requestType: 'Internet Banking',
    priority: 'High',
    assignedEmployee: 'Karthik Rajan',
    date: '2026-07-19',
    status: 'Closed',
    description: 'Reset transaction password and unlocked corporate netbanking User ID.',
    reachBack: {
      followUpDate: '2026-07-19',
      smsSent: true,
      emailSent: true,
      callStatus: 'Connected',
      nextFollowUp: '2026-07-19',
      resolutionNotes: 'Temporary password sent to registered mobile. User verified login.'
    },
    timeline: {
      created: '2026-07-19 02:15 PM',
      assigned: '2026-07-19 02:30 PM',
      resolved: '2026-07-19 04:00 PM',
      closed: '2026-07-19 04:30 PM'
    }
  }
];

export const INITIAL_TASKS: InternalTask[] = [
  {
    id: 'SUC-801',
    title: '✅ Account Opened: Savings Platinum - R. Senthil Kumar',
    category: 'Account Opening',
    priority: 'High',
    dueDate: 'Today',
    assignedTo: 'Karthik Rajan',
    completed: true,
    status: 'Completed',
    description: 'Account #9180029381 opened with initial deposit ₹1,50,000. Customer onboarded & debit card issued.'
  },
  {
    id: 'SUC-802',
    title: '✅ Loan Approved & Disbursed: Housing Loan - M. Anand',
    category: 'Loan Disbursal',
    priority: 'High',
    dueDate: 'Yesterday',
    assignedTo: 'Karthik Rajan',
    completed: true,
    status: 'Completed',
    description: 'Housing Loan LN-2026-881 for ₹45,00,000 approved at 8.40% p.a. EMI auto-debit activated.'
  },
  {
    id: 'SUC-803',
    title: '✅ Fixed Deposit (FD) Created: Tax Saver FD - Lakshmi Narayanan',
    category: 'Term Deposit',
    priority: 'Medium',
    dueDate: '2 Days Ago',
    assignedTo: 'Karthik Rajan',
    completed: true,
    status: 'Completed',
    description: 'Tax Saver FD #FD-99827 for ₹3,00,000 created for 444 days tenure at 7.50% interest rate.'
  },
  {
    id: 'SUC-804',
    title: '✅ Current Account Opened: Apex Traders Pvt Ltd',
    category: 'Current Account',
    priority: 'High',
    dueDate: '3 Days Ago',
    assignedTo: 'Saritha V',
    completed: true,
    status: 'Completed',
    description: 'Commercial Current Account #9180029402 opened with initial deposit ₹5,00,000. Merchant POS assigned.'
  }
];

export const INITIAL_MESSAGES: InternalMessage[] = [
  {
    id: 'MSG-401',
    sender: 'HR Operations - T. Nagar Branch',
    subject: '🎂 Happy Birthday Wishes to Priya Krishnan (Assistant Manager)!',
    time: '08:30 AM Today',
    read: false,
    type: 'Branch Birthday Wish',
    preview: 'Today is Priya Krishnan\'s birthday! Please join all T. Nagar branch colleagues in wishing her a wonderful day...',
    body: 'Dear T. Nagar Branch Team,\n\nToday is Priya Krishnan\'s (Assistant Manager) birthday! 🎉\n\nPlease join us in wishing Priya a very Happy Birthday and a successful, joyful year ahead. We will be gathering for a small cake celebration during afternoon tea at 04:00 PM in the branch staff room.\n\nWarm regards,\nHR Operations & Welfare Team\nT. Nagar Branch, Chennai'
  },
  {
    id: 'MSG-402',
    sender: 'Head Office - Bank-Wide Circular',
    subject: '📢 All-Bank Circular: Launch of Q3 Retail Fixed Deposit Campaign & Revised Interest Rates',
    time: '09:15 AM Today',
    read: false,
    type: 'All Bank Circular',
    preview: 'To all One Bank Staff & Branch Officers nationwide: Effective today, Senior Citizen FD interest rates have been enhanced to 7.85% p.a...',
    body: 'To All One Bank Staff & Branch Officers Nationwide,\n\nWe are pleased to announce the official launch of our Q3 Retail Fixed Deposit Campaign across all branches in India.\n\nKey Circular Highlights:\n1. Senior Citizen 1-year FD rate increased to 7.85% p.a.\n2. General Public 444-days special deposit rate revised to 7.50% p.a.\n3. Processing fee waived for instant online FD creation.\n\nAll branch customer service and account desks are requested to inform walk-in customers and display the promotional posters.\n\nRegards,\nChief Marketing & Retail Banking Division\nOne Bank Corporate Head Office, Mumbai'
  },
  {
    id: 'MSG-403',
    sender: 'IT & Core Banking Security (HO)',
    subject: '🔒 Security Advisory: Quarterly Cyber Security Awareness & CBS Credentials Safety',
    time: 'Yesterday',
    read: true,
    type: 'All Bank Circular',
    preview: 'Important notice to all bank officers: Never share your CBS user IDs, OTPs, or terminal passwords...',
    body: 'Attention All Branch Employees,\n\nPlease adhere strictly to the following security protocols:\n- Never share your CBS login user ID or OTP with anyone.\n- Ensure terminal screens are locked whenever leaving your workstation.\n- Complete your mandatory Q3 Cybersecurity Refresh e-Learning module by Friday 5:00 PM.\n\nRegards,\nChief Information Security Officer (CISO)'
  },
  {
    id: 'MSG-404',
    sender: 'T. Nagar Staff Welfare Club',
    subject: '🎂 Birthday Greetings for Murugan P (Senior Cashier)!',
    time: '3 Days Ago',
    read: true,
    type: 'Branch Birthday Wish',
    preview: 'Wishing our Senior Cashier Murugan P a very Happy Birthday from all colleagues at T. Nagar branch...',
    body: 'Dear Colleagues,\n\nHappy Birthday to Murugan P (Senior Cashier)! Thank you for your continued dedication and stellar service to our branch customers.\n\nBest wishes,\nT. Nagar Branch Team'
  }
];

export const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'NOTIF-01',
    title: 'High-Value Loan Approval Required',
    message: 'Home Loan #LN-2026-4403 (₹5.0 Lakhs) submitted for credit committee verification.',
    time: '10 mins ago',
    read: false,
    type: 'audit'
  },
  {
    id: 'NOTIF-02',
    title: 'New Account Pending Approval',
    message: 'Current Account application APP-2026-1083 for Meenakshi Sundaram awaits officer authorization.',
    time: '25 mins ago',
    read: false,
    type: 'task'
  },
  {
    id: 'NOTIF-03',
    title: 'System Maintenance Window',
    message: 'Core Banking System (CBS) batch settlement scheduled tonight at 11:30 PM IST.',
    time: '2 hours ago',
    read: true,
    type: 'system'
  }
];

export const INITIAL_DEPOSITS: import('./types').DepositAccount[] = [
  {
    id: 'FD-2026-8801',
    cif: 'CIF8920194',
    customerName: 'Senthil Kumar R',
    type: 'Fixed Deposit',
    schemeName: 'Senior Citizen Special FD',
    depositAmount: 250000,
    tenureMonths: 12,
    interestRate: 7.85,
    maturityAmount: 269625,
    maturityDate: '2027-07-23',
    interestPayout: 'On Maturity',
    nomineeName: 'S. Sumathi (Spouse)',
    createdDate: '2026-07-23',
    status: 'Active'
  },
  {
    id: 'FD-2026-8802',
    cif: 'CIF6310669',
    customerName: 'Anitha Ramesh',
    type: 'Fixed Deposit',
    schemeName: 'One Bank Prime FD',
    depositAmount: 100000,
    tenureMonths: 24,
    interestRate: 7.25,
    maturityAmount: 115025,
    maturityDate: '2028-07-23',
    interestPayout: 'Quarterly',
    nomineeName: 'R. Kavin (Son)',
    createdDate: '2026-07-20',
    status: 'Active'
  },
  {
    id: 'RD-2026-4401',
    cif: 'CIF4102910',
    customerName: 'Meenakshi Sundaram',
    type: 'Recurring Deposit',
    schemeName: 'Super Builder RD',
    depositAmount: 60000,
    monthlyInstallment: 5000,
    tenureMonths: 12,
    interestRate: 7.40,
    maturityAmount: 62450,
    maturityDate: '2027-07-23',
    interestPayout: 'On Maturity',
    nomineeName: 'M. Revathi (Wife)',
    createdDate: '2026-07-15',
    status: 'Active'
  }
];
