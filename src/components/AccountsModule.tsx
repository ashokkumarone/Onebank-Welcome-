import React, { useState } from 'react';
import { AccountApplication, AccountsSubTab, BalanceEnquiryResult, DepositAccount } from '../types';
import { MOCK_BALANCE_ENQUIRY_DATABASE, INITIAL_DEPOSITS } from '../mockData';
import { 
  UserPlus, 
  ListFilter, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Fingerprint, 
  Smartphone, 
  Building, 
  FileText, 
  Wallet, 
  Coins, 
  Check, 
  X,
  Clock,
  Filter,
  Save,
  Trash2,
  Send,
  Eye,
  RefreshCw,
  PiggyBank,
  Landmark,
  Calculator,
  PlusCircle,
  Percent,
  Calendar,
  Award
} from 'lucide-react';

interface AccountsModuleProps {
  applications?: AccountApplication[];
  accounts?: AccountApplication[];
  deposits?: DepositAccount[];
  onAddApplication?: (app: AccountApplication) => void;
  onAddAccount?: (app: AccountApplication) => void;
  onAddDeposit?: (deposit: DepositAccount) => void;
  onUpdateStatus?: (id: string, status: 'Approved' | 'Rejected') => void;
  onUpdateAccountStatus?: (id: string, status: 'Approved' | 'Rejected') => void;
  setHasUnsavedChanges?: (hasChanges: boolean) => void;
}

export const AccountsModule: React.FC<AccountsModuleProps> = ({
  applications,
  accounts,
  deposits = INITIAL_DEPOSITS,
  onAddApplication,
  onAddAccount,
  onAddDeposit,
  onUpdateStatus,
  onUpdateAccountStatus,
  setHasUnsavedChanges = (_hasChanges: boolean) => {},
}) => {
  const appsList = applications || accounts || [];
  const handleAddApp = onAddApplication || onAddAccount || (() => {});
  const handleUpdateAppStatus = onUpdateStatus || onUpdateAccountStatus || (() => {});
  const [subTab, setSubTab] = useState<AccountsSubTab>('create_account');

  // Deposits state
  const [activeDeposits, setActiveDeposits] = useState<DepositAccount[]>(deposits || INITIAL_DEPOSITS);
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

  // --- Create Account Form State ---
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');

  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [occupation, setOccupation] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');

  const [fullAddress, setFullAddress] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const [accountType, setAccountType] = useState<'Savings Account' | 'Current Account' | 'Salary Account' | 'Senior Citizen Account' | 'Student Account' | 'NRI Account' | 'Joint Account'>('Savings Account');
  const [branch, setBranch] = useState('T. Nagar, Chennai');
  const [initialDeposit, setInitialDeposit] = useState('');

  const [nomineeName, setNomineeName] = useState('');
  const [nomineeRelationship, setNomineeRelationship] = useState('Spouse');
  const [nomineeMobile, setNomineeMobile] = useState('');

  const [aadhaarFile, setAadhaarFile] = useState<string | null>('Aadhaar_eKYC_Verified.pdf');
  const [panFile, setPanFile] = useState<string | null>('PAN_Card_Copy.pdf');
  const [photoFile, setPhotoFile] = useState<string | null>('Live_Webcam_Photo.jpg');
  const [passportScanFile, setPassportScanFile] = useState<string | null>('Indian_Passport_Front_Back.pdf');
  const [visaScanFile, setVisaScanFile] = useState<string | null>('UAE_Work_Permit_Visa.pdf');
  const [overseasProofFile, setOverseasProofFile] = useState<string | null>('Foreign_Utility_Bill_AddressProof.pdf');

  // Dynamic Account Type Specific States
  // Joint Account
  const [jointFirstName, setJointFirstName] = useState('');
  const [jointLastName, setJointLastName] = useState('');
  const [jointRelationship, setJointRelationship] = useState('Spouse');
  const [jointDob, setJointDob] = useState('');
  const [jointMobile, setJointMobile] = useState('');
  const [jointAadhaar, setJointAadhaar] = useState('');
  const [jointPan, setJointPan] = useState('');

  // Student Account
  const [institutionName, setInstitutionName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianRelationship, setGuardianRelationship] = useState('Father');
  const [guardianMobile, setGuardianMobile] = useState('');
  const [guardianAadhaar, setGuardianAadhaar] = useState('');
  const [guardianPan, setGuardianPan] = useState('');

  // NRI Account
  const [passportNumber, setPassportNumber] = useState('');
  const [countryOfResidence, setCountryOfResidence] = useState('United Arab Emirates (UAE)');
  const [overseasAddress, setOverseasAddress] = useState('');
  const [overseasMobile, setOverseasMobile] = useState('');
  const [taxIdNumber, setTaxIdNumber] = useState('');
  const [indianRepName, setIndianRepName] = useState('');
  const [indianRepMobile, setIndianRepMobile] = useState('');

  // Salary Account
  const [companyName, setCompanyName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [officialEmail, setOfficialEmail] = useState('');

  // Current Account
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('Sole Proprietorship');
  const [gstinNumber, setGstinNumber] = useState('');

  // Form Validation & OTP Workflow States
  const [isVerifying, setIsVerifying] = useState(false);
  const [validationStep, setValidationStep] = useState<number>(0);
  const [showBiometricPrompt, setShowBiometricPrompt] = useState(false);
  const [biometricDone, setBiometricDone] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [createdSuccessAccount, setCreatedSuccessAccount] = useState<{ cif: string; accountNumber: string } | null>(null);

  // Mark Form Dirty Helper
  const markDirty = () => setHasUnsavedChanges(true);

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setDob('');
    setGender('Male');
    setMobileNumber('');
    setEmail('');
    setAadhaarNumber('');
    setPanNumber('');
    setOccupation('');
    setAnnualIncome('');
    setFullAddress('');
    setCity('');
    setDistrict('');
    setState('');
    setPincode('');
    setInitialDeposit('');
    setNomineeName('');
    setNomineeMobile('');
    setJointFirstName('');
    setJointLastName('');
    setJointRelationship('Spouse');
    setJointDob('');
    setJointMobile('');
    setJointAadhaar('');
    setJointPan('');
    setInstitutionName('');
    setStudentId('');
    setGuardianName('');
    setGuardianRelationship('Father');
    setGuardianMobile('');
    setGuardianAadhaar('');
    setGuardianPan('');
    setPassportNumber('');
    setCountryOfResidence('United Arab Emirates (UAE)');
    setOverseasAddress('');
    setOverseasMobile('');
    setTaxIdNumber('');
    setIndianRepName('');
    setIndianRepMobile('');
    setCompanyName('');
    setEmployeeId('');
    setOfficialEmail('');
    setBusinessName('');
    setBusinessType('Sole Proprietorship');
    setGstinNumber('');
    setAadhaarFile(null);
    setPanFile(null);
    setPhotoFile(null);
    setPassportScanFile(null);
    setVisaScanFile(null);
    setOverseasProofFile(null);
    setCreatedSuccessAccount(null);
    setHasUnsavedChanges(false);
  };

  const handleSaveDraft = () => {
    if (!firstName && !mobileNumber) {
      alert('Please fill at least First Name or Mobile Number to save a draft.');
      return;
    }
    const newDraft: AccountApplication = {
      id: `APP-DRAFT-${Math.floor(1000 + Math.random() * 9000)}`,
      firstName: firstName || 'Draft Customer',
      lastName,
      dob,
      gender,
      mobileNumber: mobileNumber || '+91 00000 00000',
      email,
      aadhaarNumber,
      panNumber,
      occupation,
      annualIncome,
      fullAddress,
      city,
      district,
      state,
      pincode,
      accountType,
      branch,
      initialDeposit: parseFloat(initialDeposit) || 0,
      nomineeName,
      nomineeRelationship,
      nomineeMobile,
      assignedEmployee: 'Karthik Rajan',
      date: new Date().toISOString().split('T')[0],
      status: 'Draft',
      kycAadhaarUploaded: !!aadhaarFile,
      kycPanUploaded: !!panFile,
      kycPhotoUploaded: !!photoFile,
      jointHolderName: jointFirstName ? `${jointFirstName} ${jointLastName}` : undefined,
      jointHolderRelationship: jointRelationship,
      jointHolderMobile: jointMobile,
      jointHolderAadhaar: jointAadhaar,
      jointHolderPan: jointPan,
      institutionName,
      studentId,
      guardianName,
      guardianRelationship,
      guardianMobile,
      guardianAadhaar,
      passportNumber,
      countryOfResidence,
      overseasAddress,
      overseasMobile,
      companyName,
      employeeId,
      officialEmail,
      businessName,
      businessType,
      gstinNumber,
    };
    handleAddApp(newDraft);
    setHasUnsavedChanges(false);
    alert('Application draft saved successfully in Account Tracker!');
  };

  // Start Form Submission Workflow
  const handleStartWorkflow = (e: React.FormEvent) => {
    e.preventDefault();
    markDirty();
    setIsVerifying(true);
    setValidationStep(1);

    // Step 1: Automated Validation Checks sequence
    setTimeout(() => setValidationStep(2), 600); // PAN Validation
    setTimeout(() => setValidationStep(3), 1200); // Aadhaar Validation
    setTimeout(() => setValidationStep(4), 1800); // Duplicate & Risk Check
    setTimeout(() => {
      setIsVerifying(false);
      setShowBiometricPrompt(true); // Optional Biometric Fingerprint Prompt
    }, 2400);
  };

  const handleBiometricConfirm = () => {
    setBiometricDone(true);
    setShowBiometricPrompt(false);
    setShowOtpModal(true); // Trigger OTP Modal
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredOtp.length < 4) {
      setOtpError('Please enter valid 6-digit OTP sent to Aadhaar mobile.');
      return;
    }
    setOtpError('');
    setShowOtpModal(false);

    // Generate Customer ID (CIF) & Account Number
    const generatedCif = `CIF${Math.floor(1000000 + Math.random() * 9000000)}`;
    const generatedAccNo = `91800${Math.floor(10000000 + Math.random() * 90000000)}`;

    const newApp: AccountApplication = {
      id: `APP-2026-${Math.floor(2000 + Math.random() * 8000)}`,
      cif: generatedCif,
      accountNumber: generatedAccNo,
      firstName,
      lastName,
      dob,
      gender,
      mobileNumber,
      email,
      aadhaarNumber,
      panNumber,
      occupation,
      annualIncome,
      fullAddress,
      city,
      district,
      state,
      pincode,
      accountType,
      branch,
      initialDeposit: parseFloat(initialDeposit) || 0,
      nomineeName,
      nomineeRelationship,
      nomineeMobile,
      assignedEmployee: 'Karthik Rajan',
      date: new Date().toISOString().split('T')[0],
      status: 'Approved',
      kycAadhaarUploaded: true,
      kycPanUploaded: true,
      kycPhotoUploaded: true,
      jointHolderName: jointFirstName ? `${jointFirstName} ${jointLastName}` : undefined,
      jointHolderRelationship: jointRelationship,
      jointHolderMobile: jointMobile,
      jointHolderAadhaar: jointAadhaar,
      jointHolderPan: jointPan,
      institutionName,
      studentId,
      guardianName,
      guardianRelationship,
      guardianMobile,
      guardianAadhaar,
      passportNumber,
      countryOfResidence,
      overseasAddress,
      overseasMobile,
      companyName,
      employeeId,
      officialEmail,
      businessName,
      businessType,
      gstinNumber,
    };

    handleAddApp(newApp);
    setCreatedSuccessAccount({ cif: generatedCif, accountNumber: generatedAccNo });
    setHasUnsavedChanges(false);
  };

  // --- Balance Enquiry State ---
  const [searchBy, setSearchBy] = useState<'accountNumber' | 'cif' | 'mobileNumber' | 'aadhaar' | 'pan'>('accountNumber');
  const [searchQuery, setSearchQuery] = useState('918004291823');
  const [enquiryResult, setEnquiryResult] = useState<BalanceEnquiryResult | null>(MOCK_BALANCE_ENQUIRY_DATABASE['918004291823']);
  const [hasSearched, setHasSearched] = useState(true);

  const handleBalanceSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;

    const matched = MOCK_BALANCE_ENQUIRY_DATABASE[q] || MOCK_BALANCE_ENQUIRY_DATABASE['918004291823'];
    setEnquiryResult(matched);
    setHasSearched(true);
  };

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
    if (onAddDeposit) {
      onAddDeposit(newDeposit);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Section Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center space-x-2">
            <span>Accounts Management</span>
          </h2>
          <p className="text-xs text-slate-500">
            Account opening application submission, approval tracking, and real-time balance enquiry
          </p>
        </div>

        <div className="flex items-center space-x-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <button
            id="btn-subtab-create-account"
            onClick={() => setSubTab('create_account')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
              subTab === 'create_account'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Create Account</span>
          </button>

          <button
            id="btn-subtab-balance-enquiry"
            onClick={() => setSubTab('balance_enquiry')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
              subTab === 'balance_enquiry'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Balance Enquiry</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: CREATE ACCOUNT */}
      {subTab === 'create_account' && (
        <div className="space-y-6">
          {createdSuccessAccount ? (
            <div className="bg-slate-900 rounded-2xl p-8 border border-emerald-500/40 shadow-2xl text-center max-w-2xl mx-auto space-y-5 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">Account Created Successfully!</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Customer CIF and Account numbers have been generated and recorded in CBS.
                </p>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-left font-mono space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Customer ID (CIF):</span>
                  <span className="font-bold text-amber-400">{createdSuccessAccount.cif}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Generated Account Number:</span>
                  <span className="font-bold text-white">{createdSuccessAccount.accountNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Account Type:</span>
                  <span className="font-bold text-slate-200">{accountType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Home Branch:</span>
                  <span className="font-bold text-slate-200">{branch}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Initial Deposit Balance:</span>
                  <span className="font-bold text-emerald-400">₹{parseFloat(initialDeposit || '0').toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex justify-center space-x-3 pt-2">
                <button
                  onClick={clearForm}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs shadow-lg transition-colors"
                >
                  Create Another Account
                </button>
                <button
                  onClick={() => setSubTab('balance_enquiry')}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs border border-slate-700 transition-colors"
                >
                  Perform Balance Enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleStartWorkflow} className="bg-white border border-sky-100 rounded-2xl p-6 shadow-md shadow-sky-100/50 space-y-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-black text-slate-900">Create New Customer Account</h3>
                  <p className="text-xs text-slate-500">Internal employee registration with dynamic account configuration & e-KYC</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={clearForm}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 flex items-center space-x-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Clear</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="px-3.5 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-semibold rounded-xl border border-sky-200 flex items-center space-x-1.5"
                  >
                    <Save className="w-3.5 h-3.5 text-sky-600" />
                    <span>Save Draft</span>
                  </button>
                </div>
              </div>

              {/* SECTION 1: ACCOUNT TYPE SELECTION (FIRST STEP) */}
              <div className="space-y-4 bg-sky-50/70 p-5 rounded-2xl border border-sky-200/80">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-sky-900 uppercase tracking-wider flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span>
                    <span>1. Select Account Type & Branch Allocation</span>
                  </h4>
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-lg border border-amber-200">
                    Step 1: Configuration
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-bold text-slate-800 mb-1">Account Type *</label>
                    <select
                      value={accountType}
                      onChange={(e) => { setAccountType(e.target.value as any); markDirty(); }}
                      className="w-full px-3.5 py-2.5 bg-white border border-sky-300 rounded-xl text-xs font-bold text-sky-950 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Savings Account">Prime Savings Account (7.2% p.a.)</option>
                      <option value="Joint Account">Joint Savings Account (2 Holders Required)</option>
                      <option value="Student Account">Student Campus Account (Zero Balance + Guardian)</option>
                      <option value="NRI Account">NRI / NRE / NRO Account (Passport Required)</option>
                      <option value="Current Account">Business Current Account (GST / Entity Required)</option>
                      <option value="Salary Account">Corporate Executive Salary Account</option>
                      <option value="Senior Citizen Account">Senior Citizen Savings Account (Aged 60+)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Allocated Branch *</label>
                    <select
                      value={branch}
                      onChange={(e) => { setBranch(e.target.value); markDirty(); }}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="T. Nagar, Chennai">T. Nagar, Chennai (TN-004)</option>
                      <option value="Anna Nagar, Chennai">Anna Nagar, Chennai (TN-008)</option>
                      <option value="Gandhipuram, Coimbatore">Gandhipuram, Coimbatore (CBE-002)</option>
                      <option value="Simmakkal, Madurai">Simmakkal, Madurai (MDU-001)</option>
                      <option value="Thillai Nagar, Trichy">Thillai Nagar, Trichy (TRY-003)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Initial Deposit Amount (₹) *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={initialDeposit}
                      onChange={(e) => { setInitialDeposit(e.target.value); markDirty(); }}
                      placeholder={accountType === 'Student Account' ? '0 (Zero Balance)' : '1000'}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-mono font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                {/* Requirements Banner */}
                <div className="p-3 bg-white rounded-xl border border-sky-200/90 text-xs text-slate-700 flex items-center space-x-3">
                  <span className="px-2.5 py-1 bg-sky-700 text-white font-bold text-[10px] rounded-lg uppercase shrink-0">
                    {accountType}
                  </span>
                  <p className="text-xs text-slate-800">
                    {accountType === 'Joint Account' && (
                      <span><strong>Joint Account Mode:</strong> Fields for Primary Holder & Secondary Joint Holder details will be collected below.</span>
                    )}
                    {accountType === 'Student Account' && (
                      <span><strong>Student Account Mode:</strong> Zero initial deposit allowed. College/School details & Parent/Guardian details are required below.</span>
                    )}
                    {accountType === 'NRI Account' && (
                      <span><strong>NRI Account Mode:</strong> Mandatory Documents: Passport (Front & Back), Foreign Residence Visa / OCI Card, Overseas Address Proof, & PAN / Form 60. <span className="font-semibold text-amber-700 bg-amber-50 px-1 py-0.5 rounded border border-amber-200">(Aadhaar is NOT mandatory for NRIs)</span></span>
                    )}
                    {accountType === 'Salary Account' && (
                      <span><strong>Corporate Salary Account:</strong> Requires Employer Name, Corporate Employee ID, and HR Email.</span>
                    )}
                    {accountType === 'Current Account' && (
                      <span><strong>Business Current Account:</strong> Requires Registered Trade Name, Entity Type, and GSTIN.</span>
                    )}
                    {accountType === 'Senior Citizen Account' && (
                      <span><strong>Senior Citizen Mode:</strong> Special +0.50% interest bonus applied automatically for customers 60+ years.</span>
                    )}
                    {accountType === 'Savings Account' && (
                      <span><strong>Prime Savings Mode:</strong> Standard individual customer account registration.</span>
                    )}
                  </p>
                </div>
              </div>

              {/* SECTION 2: Customer Personal Details */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold text-sky-700 uppercase tracking-wider flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                  <span>
                    2. {accountType === 'Joint Account' ? 'Primary Applicant Personal Details' :
                       accountType === 'Student Account' ? 'Student Personal Details' :
                       accountType === 'NRI Account' ? 'NRI Applicant Personal Details' :
                       accountType === 'Current Account' ? 'Authorized Business Signatory Details' :
                       'Customer Personal Details'}
                  </span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">First Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => { setFirstName(e.target.value); markDirty(); }}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/80"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Last Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => { setLastName(e.target.value); markDirty(); }}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/80"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth *</label>
                    <input
                      type="date"
                      required
                      value={dob}
                      onChange={(e) => { setDob(e.target.value); markDirty(); }}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/80"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Gender *</label>
                    <select
                      value={gender}
                      onChange={(e) => { setGender(e.target.value); markDirty(); }}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/80"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Transgender">Transgender</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit Mobile Number"
                      value={mobileNumber}
                      onChange={(e) => { setMobileNumber(e.target.value); markDirty(); }}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/80 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); markDirty(); }}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/80"
                    />
                  </div>
                </div>
              </div>

              {/* DYNAMIC SECTION 3: ACCOUNT TYPE SPECIFIC REQUIRED FIELDS */}
              {accountType === 'Joint Account' && (
                <div className="space-y-4 pt-4 border-t border-sky-200 bg-sky-50/40 p-4 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-sky-800 uppercase tracking-wider flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span>
                      <span>3. Joint / Secondary Applicant Details (Holder 2)</span>
                    </h4>
                    <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                      Joint Holder Required
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Joint Holder First Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Secondary Applicant First Name"
                        value={jointFirstName}
                        onChange={(e) => { setJointFirstName(e.target.value); markDirty(); }}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Joint Holder Last Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Secondary Applicant Last Name"
                        value={jointLastName}
                        onChange={(e) => { setJointLastName(e.target.value); markDirty(); }}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Relationship to Primary *</label>
                      <select
                        value={jointRelationship}
                        onChange={(e) => { setJointRelationship(e.target.value); markDirty(); }}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="Spouse">Spouse</option>
                        <option value="Parent">Parent (Father / Mother)</option>
                        <option value="Child">Child (Son / Daughter)</option>
                        <option value="Sibling">Sibling</option>
                        <option value="Business Partner">Business Partner</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Joint Holder DOB *</label>
                      <input
                        type="date"
                        required
                        value={jointDob}
                        onChange={(e) => { setJointDob(e.target.value); markDirty(); }}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Joint Holder Mobile *</label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit Mobile Number"
                        value={jointMobile}
                        onChange={(e) => { setJointMobile(e.target.value); markDirty(); }}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Joint Holder Aadhaar Number *</label>
                      <input
                        type="text"
                        required
                        placeholder="12-digit Aadhaar Number"
                        value={jointAadhaar}
                        onChange={(e) => { setJointAadhaar(e.target.value); markDirty(); }}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Joint Holder PAN Number *</label>
                      <input
                        type="text"
                        required
                        placeholder="10-character PAN Number"
                        value={jointPan}
                        onChange={(e) => { setJointPan(e.target.value.toUpperCase()); markDirty(); }}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {accountType === 'Student Account' && (
                <div className="space-y-4 pt-4 border-t border-sky-200 bg-sky-50/40 p-4 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-sky-800 uppercase tracking-wider flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span>
                      <span>3. Campus Institution & Parent / Guardian Details</span>
                    </h4>
                    <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                      Student Verification
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">School / College / University Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Institution Name (e.g., Anna University)"
                        value={institutionName}
                        onChange={(e) => { setInstitutionName(e.target.value); markDirty(); }}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Student Roll No / College ID *</label>
                      <input
                        type="text"
                        required
                        placeholder="Student ID / Roll Number"
                        value={studentId}
                        onChange={(e) => { setStudentId(e.target.value); markDirty(); }}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Parent / Guardian Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Parent / Guardian Full Name"
                        value={guardianName}
                        onChange={(e) => { setGuardianName(e.target.value); markDirty(); }}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Guardian Relationship *</label>
                      <select
                        value={guardianRelationship}
                        onChange={(e) => { setGuardianRelationship(e.target.value); markDirty(); }}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Legal Guardian">Legal Guardian</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Guardian Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="Guardian Mobile Number"
                        value={guardianMobile}
                        onChange={(e) => { setGuardianMobile(e.target.value); markDirty(); }}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Guardian Aadhaar Number *</label>
                      <input
                        type="text"
                        required
                        placeholder="12-digit Guardian Aadhaar"
                        value={guardianAadhaar}
                        onChange={(e) => { setGuardianAadhaar(e.target.value); markDirty(); }}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {accountType === 'NRI Account' && (
                <div className="space-y-4 pt-4 border-t border-sky-200 bg-sky-50/40 p-4 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-sky-800 uppercase tracking-wider flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span>
                      <span>3. Passport & Overseas Residence Details (NRI / NRE / NRO)</span>
                    </h4>
                    <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                      NRI Verification Required
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Passport Number *</label>
                      <input
                        type="text"
                        required
                        placeholder="Indian / Foreign Passport No"
                        value={passportNumber}
                        onChange={(e) => { setPassportNumber(e.target.value.toUpperCase()); markDirty(); }}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Country of Overseas Residence *</label>
                      <select
                        value={countryOfResidence}
                        onChange={(e) => { setCountryOfResidence(e.target.value); markDirty(); }}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="United Arab Emirates (UAE)">United Arab Emirates (UAE)</option>
                        <option value="United States (USA)">United States (USA)</option>
                        <option value="United Kingdom (UK)">United Kingdom (UK)</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Canada">Canada</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Oman">Oman</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="Other Country">Other Country</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Overseas Residential Address *</label>
                      <input
                        type="text"
                        required
                        placeholder="Full Foreign Address"
                        value={overseasAddress}
                        onChange={(e) => { setOverseasAddress(e.target.value); markDirty(); }}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Overseas Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 / +971 Foreign Mobile"
                        value={overseasMobile}
                        onChange={(e) => { setOverseasMobile(e.target.value); markDirty(); }}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Local Indian Emergency Representative *</label>
                      <input
                        type="text"
                        required
                        placeholder="Contact Name in India"
                        value={indianRepName}
                        onChange={(e) => { setIndianRepName(e.target.value); markDirty(); }}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Indian Rep Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit Indian Mobile"
                        value={indianRepMobile}
                        onChange={(e) => { setIndianRepMobile(e.target.value); markDirty(); }}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {accountType === 'Salary Account' && (
                <div className="space-y-4 pt-4 border-t border-sky-200 bg-sky-50/40 p-4 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-sky-800 uppercase tracking-wider flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span>
                      <span>3. Corporate Employment Information</span>
                    </h4>
                    <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                      Corporate Salary Account
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Employer / Company Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Company Name (e.g., TCS / Infosys)"
                        value={companyName}
                        onChange={(e) => { setCompanyName(e.target.value); markDirty(); }}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Corporate Employee ID *</label>
                      <input
                        type="text"
                        required
                        placeholder="Employee Staff ID"
                        value={employeeId}
                        onChange={(e) => { setEmployeeId(e.target.value); markDirty(); }}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Official Corporate Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="official.name@company.com"
                        value={officialEmail}
                        onChange={(e) => { setOfficialEmail(e.target.value); markDirty(); }}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {accountType === 'Current Account' && (
                <div className="space-y-4 pt-4 border-t border-sky-200 bg-sky-50/40 p-4 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-sky-800 uppercase tracking-wider flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span>
                      <span>3. Registered Business Entity Details</span>
                    </h4>
                    <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                      Current Account Commercial
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Trade / Business Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Registered Business Trade Name"
                        value={businessName}
                        onChange={(e) => { setBusinessName(e.target.value); markDirty(); }}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Business Entity Type *</label>
                      <select
                        value={businessType}
                        onChange={(e) => { setBusinessType(e.target.value); markDirty(); }}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="Sole Proprietorship">Sole Proprietorship</option>
                        <option value="Partnership Firm">Partnership Firm</option>
                        <option value="Private Limited (Pvt Ltd)">Private Limited (Pvt Ltd)</option>
                        <option value="Limited Liability Partnership (LLP)">LLP</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">GSTIN / Registration No *</label>
                      <input
                        type="text"
                        required
                        placeholder="15-character GSTIN Number"
                        value={gstinNumber}
                        onChange={(e) => { setGstinNumber(e.target.value.toUpperCase()); markDirty(); }}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 4: Identity & Income */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-sky-700 uppercase tracking-wider flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                  <span>4. Identity & Income Verification</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {accountType === 'NRI Account' ? (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Aadhaar Number{' '}
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                            Optional (Exempt for NRI)
                          </span>
                        </label>
                        <input
                          type="text"
                          required={false}
                          placeholder="12-digit Aadhaar (If available)"
                          value={aadhaarNumber}
                          onChange={(e) => { setAadhaarNumber(e.target.value); markDirty(); }}
                          className="w-full px-3.5 py-2 bg-amber-50/30 border border-amber-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/80 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Passport Number (Mandatory) *</label>
                        <input
                          type="text"
                          required
                          placeholder="Indian / Foreign Passport No"
                          value={passportNumber}
                          onChange={(e) => { setPassportNumber(e.target.value.toUpperCase()); markDirty(); }}
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/80 font-mono uppercase"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">PAN Card / Form 60 *</label>
                        <input
                          type="text"
                          required
                          placeholder="10-character PAN or FORM60"
                          value={panNumber}
                          onChange={(e) => { setPanNumber(e.target.value.toUpperCase()); markDirty(); }}
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/80 font-mono uppercase"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Aadhaar Number *</label>
                        <input
                          type="text"
                          required
                          placeholder="12-digit Aadhaar Number"
                          value={aadhaarNumber}
                          onChange={(e) => { setAadhaarNumber(e.target.value); markDirty(); }}
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/80 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">PAN Number *</label>
                        <input
                          type="text"
                          required
                          placeholder="10-character PAN Number"
                          value={panNumber}
                          onChange={(e) => { setPanNumber(e.target.value.toUpperCase()); markDirty(); }}
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/80 font-mono uppercase"
                        />
                      </div>
                    </>
                  )}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Occupation</label>
                    <select
                      value={occupation}
                      onChange={(e) => { setOccupation(e.target.value); markDirty(); }}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/80"
                    >
                      <option value="Salaried Corporate">Salaried Corporate</option>
                      <option value="Public Sector / Govt">Public Sector / Govt</option>
                      <option value="Business Owner / Self-Employed">Business Owner / Self-Employed</option>
                      <option value="Professional (Doctor/CA/Lawyer)">Professional (Doctor/CA/Lawyer)</option>
                      <option value="Agriculture / Farmer">Agriculture / Farmer</option>
                      <option value="Retired">Retired</option>
                      <option value="Student / Other">Student / Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Annual Income Bracket</label>
                    <select
                      value={annualIncome}
                      onChange={(e) => { setAnnualIncome(e.target.value); markDirty(); }}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/80"
                    >
                      <option value="Below ₹2,50,000">Below ₹2,50,000</option>
                      <option value="₹2,50,000 - ₹5,00,000">₹2,50,000 - ₹5,00,000</option>
                      <option value="₹5,00,000 - ₹8,00,000">₹5,00,000 - ₹8,00,000</option>
                      <option value="₹8,00,000 - ₹12,00,000">₹8,00,000 - ₹12,00,000</option>
                      <option value="₹12,00,000 - ₹25,00,000">₹12,00,000 - ₹25,00,000</option>
                      <option value="₹25,00,000+">₹25,00,000+</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 5: Residential Address */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-sky-700 uppercase tracking-wider flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                  <span>5. Permanent Address</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Door / Street Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="Door / Street Address"
                      value={fullAddress}
                      onChange={(e) => { setFullAddress(e.target.value); markDirty(); }}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/80"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City / Town *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => { setCity(e.target.value); markDirty(); }}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/80"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Pincode *</label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => { setPincode(e.target.value); markDirty(); }}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/80 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 6: Nominee Details */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-sky-700 uppercase tracking-wider flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                  <span>6. Nominee Declaration</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nominee Full Name</label>
                    <input
                      type="text"
                      placeholder="Nominee Full Name"
                      value={nomineeName}
                      onChange={(e) => { setNomineeName(e.target.value); markDirty(); }}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/80"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Relationship</label>
                    <select
                      value={nomineeRelationship}
                      onChange={(e) => { setNomineeRelationship(e.target.value); markDirty(); }}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/80"
                    >
                      <option value="Spouse">Spouse</option>
                      <option value="Parent">Parent (Father / Mother)</option>
                      <option value="Child">Child (Son / Daughter)</option>
                      <option value="Sibling">Sibling</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nominee Mobile</label>
                    <input
                      type="tel"
                      placeholder="Nominee Mobile Number"
                      value={nomineeMobile}
                      onChange={(e) => { setNomineeMobile(e.target.value); markDirty(); }}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/80 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 7: KYC Document Uploads */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-sky-700 uppercase tracking-wider flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                    <span>7. Mandatory KYC Document Uploads ({accountType === 'NRI Account' ? 'NRI Regulations' : 'RBI Domestic Guidelines'})</span>
                  </h4>
                  {accountType === 'NRI Account' && (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      NRI Docs: Passport, Visa, Overseas Address & PAN
                    </span>
                  )}
                </div>

                {accountType === 'NRI Account' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* NRI Document 1: Passport Copy */}
                    <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-200 text-xs space-y-2">
                      <div className="flex justify-between items-center text-slate-800 font-bold">
                        <span>1. Valid Passport Copy (Front & Back) *</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <p className="text-[11px] text-slate-600 font-mono truncate">{passportScanFile || 'Indian_Passport_Front_Back.pdf'}</p>
                      <button
                        type="button"
                        onClick={() => alert('Passport document verified with Ministry of External Affairs / Immigration database.')}
                        className="text-[10px] text-sky-700 hover:underline font-semibold"
                      >
                        Re-upload Passport Copy
                      </button>
                    </div>

                    {/* NRI Document 2: Residence Visa / Work Permit */}
                    <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-200 text-xs space-y-2">
                      <div className="flex justify-between items-center text-slate-800 font-bold">
                        <span>2. Foreign Residence Visa / Permit *</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <p className="text-[11px] text-slate-600 font-mono truncate">{visaScanFile || 'UAE_Work_Permit_Visa.pdf'}</p>
                      <button
                        type="button"
                        onClick={() => alert('Overseas residence visa / work permit validated.')}
                        className="text-[10px] text-sky-700 hover:underline font-semibold"
                      >
                        Re-upload Visa / Permit
                      </button>
                    </div>

                    {/* NRI Document 3: Overseas Address Proof */}
                    <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-200 text-xs space-y-2">
                      <div className="flex justify-between items-center text-slate-800 font-bold">
                        <span>3. Overseas Address Proof *</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <p className="text-[11px] text-slate-600 font-mono truncate">{overseasProofFile || 'Foreign_Utility_Bill_AddressProof.pdf'}</p>
                      <button
                        type="button"
                        onClick={() => alert('Foreign utility bill / overseas bank statement verified.')}
                        className="text-[10px] text-sky-700 hover:underline font-semibold"
                      >
                        Re-upload Address Proof
                      </button>
                    </div>

                    {/* NRI Document 4: PAN / Form 60 */}
                    <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-200 text-xs space-y-2">
                      <div className="flex justify-between items-center text-slate-800 font-bold">
                        <span>4. PAN Card / Form 60 Declaration *</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <p className="text-[11px] text-slate-600 font-mono truncate">{panFile || 'PAN_Card_Copy.pdf'}</p>
                      <button
                        type="button"
                        onClick={() => alert('PAN card / Form 60 declaration validated.')}
                        className="text-[10px] text-sky-700 hover:underline font-semibold"
                      >
                        Re-upload PAN / Form 60
                      </button>
                    </div>

                    {/* NRI Document 5: Customer Photo */}
                    <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-200 text-xs space-y-2">
                      <div className="flex justify-between items-center text-slate-800 font-bold">
                        <span>5. Passport Size Photograph *</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <p className="text-[11px] text-slate-600 font-mono truncate">{photoFile || 'Live_Webcam_Photo.jpg'}</p>
                      <button
                        type="button"
                        onClick={() => alert('Webcam photograph captured successfully.')}
                        className="text-[10px] text-sky-700 hover:underline font-semibold"
                      >
                        Capture Photograph
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-3 bg-sky-50/50 rounded-xl border border-sky-200 text-xs space-y-2">
                      <div className="flex justify-between items-center text-slate-800 font-bold">
                        <span>Aadhaar Document Scan</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <p className="text-[11px] text-slate-600 font-mono truncate">{aadhaarFile || 'Aadhaar_eKYC_Verified.pdf'}</p>
                      <button
                        type="button"
                        onClick={() => alert('e-KYC PDF document verified from UIDAI portal.')}
                        className="text-[10px] text-sky-700 hover:underline font-semibold"
                      >
                        Re-upload Scan
                      </button>
                    </div>

                    <div className="p-3 bg-sky-50/50 rounded-xl border border-sky-200 text-xs space-y-2">
                      <div className="flex justify-between items-center text-slate-800 font-bold">
                        <span>PAN Card Scan</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <p className="text-[11px] text-slate-600 font-mono truncate">{panFile || 'PAN_Card_Copy.pdf'}</p>
                      <button
                        type="button"
                        onClick={() => alert('PAN document validated from NSDL portal.')}
                        className="text-[10px] text-sky-700 hover:underline font-semibold"
                      >
                        Re-upload Scan
                      </button>
                    </div>

                    <div className="p-3 bg-sky-50/50 rounded-xl border border-sky-200 text-xs space-y-2">
                      <div className="flex justify-between items-center text-slate-800 font-bold">
                        <span>Customer Passport Photo</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <p className="text-[11px] text-slate-600 font-mono truncate">{photoFile || 'Live_Webcam_Photo.jpg'}</p>
                      <button
                        type="button"
                        onClick={() => alert('Webcam snapshot captured.')}
                        className="text-[10px] text-sky-700 hover:underline font-semibold"
                      >
                        Capture Photo
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={clearForm}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200"
                  >
                    Clear Form
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="px-4 py-2 bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-semibold rounded-xl border border-sky-200 flex items-center space-x-1.5"
                  >
                    <Save className="w-3.5 h-3.5 text-sky-600" />
                    <span>Save Draft</span>
                  </button>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-xs shadow-md shadow-sky-500/20 flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          )}

          {/* Validation Checks Overlay Modal */}
          {isVerifying && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4">
              <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
                <div className="flex items-center space-x-3">
                  <RefreshCw className="w-6 h-6 text-amber-400 animate-spin" />
                  <div>
                    <h3 className="text-sm font-bold text-white">Running Automated Verifications</h3>
                    <p className="text-xs text-slate-400">CBS e-KYC Background Engine</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-mono pt-2">
                  <div className={`flex items-center justify-between p-2 rounded ${validationStep >= 1 ? 'bg-emerald-500/10 text-emerald-300' : 'text-slate-500'}`}>
                    <span>PAN Validation (NSDL API)</span>
                    {validationStep >= 1 ? <Check className="w-4 h-4" /> : <Clock className="w-3.5 h-3.5" />}
                  </div>
                  <div className={`flex items-center justify-between p-2 rounded ${validationStep >= 2 ? 'bg-emerald-500/10 text-emerald-300' : 'text-slate-500'}`}>
                    <span>{accountType === 'NRI Account' ? 'Passport & Foreign Visa Check' : 'Aadhaar e-KYC Verification'}</span>
                    {validationStep >= 2 ? <Check className="w-4 h-4" /> : <Clock className="w-3.5 h-3.5" />}
                  </div>
                  <div className={`flex items-center justify-between p-2 rounded ${validationStep >= 3 ? 'bg-emerald-500/10 text-emerald-300' : 'text-slate-500'}`}>
                    <span>Duplicate Customer Search</span>
                    {validationStep >= 3 ? <Check className="w-4 h-4" /> : <Clock className="w-3.5 h-3.5" />}
                  </div>
                  <div className={`flex items-center justify-between p-2 rounded ${validationStep >= 4 ? 'bg-emerald-500/10 text-emerald-300' : 'text-slate-500'}`}>
                    <span>KYC & CIBIL Risk Check</span>
                    {validationStep >= 4 ? <Check className="w-4 h-4" /> : <Clock className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Biometric Verification Modal */}
          {showBiometricPrompt && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4">
              <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 text-center">
                <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto text-amber-400">
                  <Fingerprint className="w-8 h-8 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Biometric Fingerprint Verification</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Please ask customer to place thumb on branch scanner terminal or click proceed to simulate verification.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleBiometricConfirm}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs shadow-lg transition-colors"
                >
                  Biometric Match Confirmed (Proceed to OTP)
                </button>
              </div>
            </div>
          )}

          {/* OTP Verification Modal */}
          {showOtpModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4">
              <form onSubmit={handleOtpVerify} className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {accountType === 'NRI Account' ? 'Enter Overseas Mobile / Email OTP' : 'Enter Aadhaar OTP'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      OTP sent to {accountType === 'NRI Account' ? (overseasMobile || email || mobileNumber || '+971 50 123 4567') : (mobileNumber || '+91 98402 11029')}
                    </p>
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="Enter 6-digit OTP (e.g. 882019)"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-center font-mono tracking-widest text-lg text-amber-400 focus:ring-2 focus:ring-amber-500"
                  />
                  {otpError && <p className="text-[11px] text-rose-400 mt-1">{otpError}</p>}
                </div>

                <p className="text-[10px] text-slate-500 text-center">
                  Demo auto-code: Enter any 4-6 digits (e.g. 123456)
                </p>

                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowOtpModal(false)}
                    className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl shadow-lg"
                  >
                    Verify & Create Account
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 2: BALANCE ENQUIRY */}
      {subTab === 'balance_enquiry' && (
        <div className="space-y-6">
          {/* View Only Banner */}
          <div className="bg-white border border-sky-100 p-5 rounded-2xl shadow-md shadow-sky-100/50 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center space-x-2">
                  <span>Balance & CBS Account Enquiry</span>
                </h3>
                <p className="text-xs text-slate-500">Search customer records across CBS core databases</p>
              </div>
            </div>

            {/* Search Input Bar */}
            <form onSubmit={handleBalanceSearch} className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-full sm:w-48">
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Search By</label>
                <select
                  value={searchBy}
                  onChange={(e) => setSearchBy(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/80"
                >
                  <option value="accountNumber">Account Number</option>
                  <option value="cif">Customer ID (CIF)</option>
                  <option value="mobileNumber">Mobile Number</option>
                  <option value="aadhaar">Aadhaar Number</option>
                  <option value="pan">PAN Number</option>
                </select>
              </div>

              <div className="flex-1 w-full">
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Enter Query Value</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 918004291823 or CIF8920194"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/80 font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto mt-auto px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-xs shadow-md shadow-sky-500/20 transition-colors flex items-center justify-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>Search CBS</span>
              </button>
            </form>
          </div>

          {/* Enquiry Results View Only Cards */}
          {enquiryResult && (
            <div className="space-y-6 animate-fadeIn">
              {/* Customer & Account Details Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Customer Details Box */}
                <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-md shadow-sky-100/50 space-y-3">
                  <h4 className="text-xs font-bold text-sky-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                    Customer Details
                  </h4>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Customer Name:</span>
                      <span className="font-bold text-slate-900">{enquiryResult.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Customer ID (CIF):</span>
                      <span className="font-bold text-sky-700">{enquiryResult.customerID}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Account Number:</span>
                      <span className="font-bold text-slate-900">{enquiryResult.accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Account Type:</span>
                      <span className="text-slate-700">{enquiryResult.accountType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Branch:</span>
                      <span className="text-slate-700">{enquiryResult.branch}</span>
                    </div>
                  </div>
                </div>

                {/* Account Details Box */}
                <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-md shadow-sky-100/50 space-y-3">
                  <h4 className="text-xs font-bold text-sky-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                    Account Balances & Status
                  </h4>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between py-1 bg-sky-50/50 px-3 rounded-lg border border-sky-100">
                      <span className="text-slate-600">Available Balance:</span>
                      <span className="font-bold text-emerald-700 text-sm">
                        ₹{enquiryResult.availableBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 bg-slate-50 px-3 rounded-lg border border-slate-200">
                      <span className="text-slate-600">Ledger Balance:</span>
                      <span className="font-bold text-slate-800 text-sm">
                        ₹{enquiryResult.ledgerBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-500">Account Status:</span>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-bold">
                        {enquiryResult.accountStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deposits & Loans Summary Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Deposits Card */}
                <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-md shadow-sky-100/50 space-y-3">
                  <h4 className="text-xs font-bold text-sky-700 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-100 pb-2">
                    <Coins className="w-4 h-4 text-sky-600" />
                    <span>Fixed & Recurring Deposits</span>
                  </h4>
                  {enquiryResult.deposits.fixedDeposits.length === 0 && enquiryResult.deposits.recurringDeposits.length === 0 ? (
                    <p className="text-xs text-slate-400 font-mono py-2">No active deposit receipts linked.</p>
                  ) : (
                    <div className="space-y-2 text-xs font-mono">
                      {enquiryResult.deposits.fixedDeposits.map((fd) => (
                        <div key={fd.fdNumber} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                          <div>
                            <p className="font-bold text-slate-900">{fd.fdNumber} (FD)</p>
                            <p className="text-[10px] text-slate-500">Maturity: {fd.maturity} @ {fd.rate}</p>
                          </div>
                          <span className="font-bold text-sky-700">
                            ₹{fd.amount.toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Loans Card */}
                <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-md shadow-sky-100/50 space-y-3">
                  <h4 className="text-xs font-bold text-sky-700 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-100 pb-2">
                    <Wallet className="w-4 h-4 text-sky-600" />
                    <span>Linked Active Loans</span>
                  </h4>
                  {enquiryResult.loans.length === 0 ? (
                    <p className="text-xs text-slate-400 font-mono py-2">No active loan accounts linked.</p>
                  ) : (
                    <div className="space-y-2 text-xs font-mono">
                      {enquiryResult.loans.map((ln) => (
                        <div key={ln.loanId} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                          <div>
                            <p className="font-bold text-slate-900">{ln.type} ({ln.loanId})</p>
                            <p className="text-[10px] text-slate-500">EMI: ₹{ln.emiAmount.toLocaleString('en-IN')} | Status: {ln.emiStatus}</p>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-rose-600 block">
                              ₹{ln.outstandingAmount.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] text-slate-400">Outstanding</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
