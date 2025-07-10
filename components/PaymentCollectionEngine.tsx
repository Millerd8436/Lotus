import React, { useEffect, useState } from 'react';

/**
 * PaymentCollectionEngine - Consolidated Payment Collection Component
 * 
 * Based on comprehensive research findings:
 * - 32% of borrowers suffer unauthorized withdrawals
 * - Multiple ACH attempts generating $35 NSF fees each time
 * - Double payments in single month
 * - Continuing withdrawals after loan payoff
 * - Taking money from wrong accounts without authorization
 * - Exploiting broad ACH authorization language
 * - Daily harassment calls and aggressive collection tactics
 * 
 * This consolidates all payment-related predatory practices:
 * ACHExploitationEngine, unauthorized withdrawal simulation, 
 * collection harassment patterns, and overdraft fee generation
 */

interface BankAccount {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'prepaid';
  balance: number;
  routingNumber: string;
  accountNumber: string;
  primary: boolean;
  overdraftProtection: boolean;
  monthlyFees: number;
}

interface WithdrawalAttempt {
  id: string;
  timestamp: Date;
  amount: number;
  purpose: string;
  status: 'pending' | 'success' | 'failed' | 'nsf' | 'blocked';
  account: string;
  attempt: number;
  authorized: boolean;
  nsfFee?: number | undefined;
  overdraftFee?: number | undefined;
  collectionMethod: 'ach_auto' | 'ach_manual' | 'card_charge' | 'alternative_account';
  lenderFee?: number | undefined;
}

interface CollectionContact {
  id: string;
  timestamp: Date;
  method: 'phone' | 'sms' | 'email' | 'letter' | 'workplace' | 'reference';
  content: string;
  aggressive: boolean;
  threatening: boolean;
  deceptive: boolean;
  violatesFDCPA: boolean;
}

interface LoanPayment {
  id: string;
  loanId: string;
  dueDate: Date;
  originalAmount: number;
  principal: number;
  fees: number;
  interest: number;
  status: 'pending' | 'paid' | 'failed' | 'rolled_over' | 'defaulted';
  rolloverCount: number;
  daysPastDue: number;
}

const PaymentCollectionEngine: React.FC = () => {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [withdrawalAttempts, setWithdrawalAttempts] = useState<WithdrawalAttempt[]>([]);
  const [collectionContacts, setCollectionContacts] = useState<CollectionContact[]>([]);
  const [loanPayments, setLoanPayments] = useState<LoanPayment[]>([]);
  const [simulationActive, setSimulationActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [totalDamage, setTotalDamage] = useState(0);
  const [violationCount, setViolationCount] = useState(0);
  const [harassmentLevel, setHarassmentLevel] = useState(0);

  // Initialize realistic bank accounts
  useEffect(() => {
    const initialAccounts: BankAccount[] = [
      {
        id: 'checking_1',
        name: 'Wells Fargo Checking',
        type: 'checking',
        balance: 180,
        routingNumber: '121000248',
        accountNumber: '4567890123',
        primary: true,
        overdraftProtection: false,
        monthlyFees: 12
      },
      {
        id: 'savings_1',
        name: 'Wells Fargo Savings',
        type: 'savings',
        balance: 420,
        routingNumber: '121000248',
        accountNumber: '9876543210',
        primary: false,
        overdraftProtection: false,
        monthlyFees: 5
      },
      {
        id: 'prepaid_1',
        name: 'NetSpend Prepaid Card',
        type: 'prepaid',
        balance: 85,
        routingNumber: '073905527',
        accountNumber: '1122334455',
        primary: false,
        overdraftProtection: true,
        monthlyFees: 9.95
      }
    ];

    const initialPayment: LoanPayment = {
      id: 'payment_1',
      loanId: 'loan_300_001',
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days overdue
      originalAmount: 345,
      principal: 300,
      fees: 45,
      interest: 0,
      status: 'pending',
      rolloverCount: 0,
      daysPastDue: 2
    };

    setAccounts(initialAccounts);
    setLoanPayments([initialPayment]);
  }, []);

  // Start comprehensive collection exploitation simulation
  const startCollectionSimulation = () => {
    if (simulationActive) {
      return;
    }
    setSimulationActive(true);
    setCurrentPhase(0);
    
    // Phase 1: Initial legitimate payment attempt (2 seconds)
    setTimeout(() => {
      setCurrentPhase(1);
      addWithdrawalAttempt({
        amount: 345,
        purpose: 'Loan Payment Due - Attempt 1',
        status: 'failed',
        account: 'checking_1',
        attempt: 1,
        authorized: true,
        collectionMethod: 'ach_auto',
        nsfFee: 35
      });
      addCollectionContact({
        method: 'sms',
        content: 'Payment failed. We\'ll retry soon. Reply STOP to opt out.',
        aggressive: false,
        threatening: false,
        deceptive: false,
        violatesFDCPA: false
      });
    }, 2000);

    // Phase 2: Multiple aggressive retry attempts (4 seconds)
    setTimeout(() => {
      setCurrentPhase(2);
      addWithdrawalAttempt({
        amount: 345,
        purpose: 'Loan Payment Retry - Attempt 2',
        status: 'failed',
        account: 'checking_1',
        attempt: 2,
        authorized: true,
        collectionMethod: 'ach_auto',
        nsfFee: 35
      });
      // Same day, another attempt
      setTimeout(() => {
        addWithdrawalAttempt({
          amount: 345,
          purpose: 'Loan Payment Retry - Attempt 3',
          status: 'failed',
          account: 'checking_1',
          attempt: 3,
          authorized: true,
          collectionMethod: 'ach_auto',
          nsfFee: 35
        });
      }, 1000);
    }, 4000);

    // Phase 3: Unauthorized double payment attempt (6 seconds)
    setTimeout(() => {
      setCurrentPhase(3);
      addWithdrawalAttempt({
        amount: 345,
        purpose: 'Duplicate Payment Processing',
        status: 'failed',
        account: 'checking_1',
        attempt: 1,
        authorized: false,
        collectionMethod: 'ach_manual',
        nsfFee: 35
      });
      addCollectionContact({
        method: 'phone',
        content: 'This is an urgent matter regarding your account. You must call back immediately.',
        aggressive: true,
        threatening: false,
        deceptive: true,
        violatesFDCPA: true
      });
    }, 6000);

    // Phase 4: Alternative account exploitation (8 seconds)
    setTimeout(() => {
      setCurrentPhase(4);
      addWithdrawalAttempt({
        amount: 345,
        purpose: 'Alternative Account Collection',
        status: 'success',
        account: 'savings_1',
        attempt: 1,
        authorized: false,
        collectionMethod: 'ach_manual'
      });
      addCollectionContact({
        method: 'workplace',
        content: 'Called workplace asking for borrower - claiming "personal business matter"',
        aggressive: true,
        threatening: false,
        deceptive: true,
        violatesFDCPA: true
      });
    }, 8000);

    // Phase 5: Prepaid card exploitation (10 seconds)
    setTimeout(() => {
      setCurrentPhase(5);
      addWithdrawalAttempt({
        amount: 100,
        purpose: 'Partial Payment - Prepaid Card',
        status: 'success',
        account: 'prepaid_1',
        attempt: 1,
        authorized: false,
        collectionMethod: 'card_charge',
        overdraftFee: 25
      });
    }, 10000);

    // Phase 6: Post-payment continuation and rollover fees (12 seconds)
    setTimeout(() => {
      setCurrentPhase(6);
      addWithdrawalAttempt({
        amount: 50,
        purpose: 'Rollover Fee - Auto Renewal',
        status: 'success',
        account: 'checking_1',
        attempt: 1,
        authorized: false,
        collectionMethod: 'ach_auto',
        lenderFee: 50
      });
      addCollectionContact({
        method: 'sms',
        content: 'Your loan has been renewed for your convenience. New payment due in 14 days.',
        aggressive: false,
        threatening: false,
        deceptive: true,
        violatesFDCPA: false
      });
    }, 12000);

    // Phase 7: Administrative and collection fees (14 seconds)
    setTimeout(() => {
      setCurrentPhase(7);
      addWithdrawalAttempt({
        amount: 35,
        purpose: 'Administrative Fee - Post Payment',
        status: 'success',
        account: 'savings_1',
        attempt: 1,
        authorized: false,
        collectionMethod: 'ach_manual',
        lenderFee: 35
      });
      addCollectionContact({
        method: 'reference',
        content: 'Called emergency contact claiming borrower is "difficult to reach"',
        aggressive: true,
        threatening: false,
        deceptive: true,
        violatesFDCPA: true
      });
    }, 14000);

    // Phase 8: Aggressive harassment escalation (16 seconds)
    setTimeout(() => {
      setCurrentPhase(8);
      addCollectionContact({
        method: 'phone',
        content: 'Threatened to garnish wages and sue. Used abusive language.',
        aggressive: true,
        threatening: true,
        deceptive: true,
        violatesFDCPA: true
      });
      addCollectionContact({
        method: 'email',
        content: 'Email with subject "LEGAL ACTION PENDING" - false legal threats',
        aggressive: true,
        threatening: true,
        deceptive: true,
        violatesFDCPA: true
      });
      setSimulationActive(false);
    }, 16000);
  };

  const addWithdrawalAttempt = (attemptData: Partial<WithdrawalAttempt>) => {
    const attempt: WithdrawalAttempt = {
      id: Date.now().toString() + Math.random(),
      timestamp: new Date(),
      amount: attemptData.amount || 0,
      purpose: attemptData.purpose || 'Payment',
      status: attemptData.status || 'pending',
      account: attemptData.account || 'checking_1',
      attempt: attemptData.attempt || 1,
      authorized: attemptData.authorized || false,
      collectionMethod: attemptData.collectionMethod || 'ach_auto',
      nsfFee: attemptData.nsfFee,
      overdraftFee: attemptData.overdraftFee,
      lenderFee: attemptData.lenderFee
    };

    setWithdrawalAttempts(prev => [...prev, attempt]);
    
    // Update account balances and fees
    if (attempt.status === 'success') {
      setAccounts(prev => prev.map(account => 
        account.id === attempt.account 
          ? { ...account, balance: account.balance - attempt.amount }
          : account
      ));
    }

    // Add NSF fees
    if (attempt.nsfFee) {
      setAccounts(prev => prev.map(account => 
        account.id === attempt.account 
          ? { ...account, balance: account.balance - attempt.nsfFee! }
          : account
      ));
    }

    // Add overdraft fees
    if (attempt.overdraftFee) {
      setAccounts(prev => prev.map(account => 
        account.id === attempt.account 
          ? { ...account, balance: account.balance - attempt.overdraftFee! }
          : account
      ));
    }

    // Track violations
    if (!attempt.authorized) {
      setViolationCount(prev => prev + 1);
    }

    // Update total damage
    const damage = (attempt.amount || 0) + (attempt.nsfFee || 0) + (attempt.overdraftFee || 0) + (attempt.lenderFee || 0);
    setTotalDamage(prev => prev + damage);
  };

  const addCollectionContact = (contactData: Partial<CollectionContact>) => {
    const contact: CollectionContact = {
      id: Date.now().toString() + Math.random(),
      timestamp: new Date(),
      method: contactData.method || 'phone',
      content: contactData.content || 'Collection contact',
      aggressive: contactData.aggressive || false,
      threatening: contactData.threatening || false,
      deceptive: contactData.deceptive || false,
      violatesFDCPA: contactData.violatesFDCPA || false
    };

    setCollectionContacts(prev => [...prev, contact]);

    // Update harassment level
    if (contact.aggressive || contact.threatening || contact.violatesFDCPA) {
      setHarassmentLevel(prev => prev + 1);
    }
  };

  const resetSimulation = () => {
    setSimulationActive(false);
    setCurrentPhase(0);
    setWithdrawalAttempts([]);
    setCollectionContacts([]);
    setTotalDamage(0);
    setViolationCount(0);
    setHarassmentLevel(0);
    
    // Reset account balances
    setAccounts(prev => prev.map(account => ({
      ...account,
      balance: account.id === 'checking_1' ? 180 : 
               account.id === 'savings_1' ? 420 : 85
    })));
  };

  const getPhaseDescription = (phase: number): string => {
    const descriptions = [
      "Ready to simulate predatory collection practices...",
      "Initial payment failed - starting retry attempts",
      "Multiple same-day attempts generating NSF fees",
      "Unauthorized duplicate payment attempts",
      "Exploiting alternative accounts without permission",
      "Targeting prepaid card with overdraft fees",
      "Adding rollover and administrative fees",
      "Contacting workplace and references",
      "Escalating to aggressive harassment and threats"
    ];
    return descriptions[phase] || "";
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'success': return '#16a34a';
      case 'failed': return '#dc2626';
      case 'nsf': return '#dc2626';
      case 'blocked': return '#7c2d12';
      default: return '#ca8a04';
    }
  };

  const getContactSeverity = (contact: CollectionContact): string => {
    if (contact.threatening && contact.violatesFDCPA) return 'SEVERE VIOLATION';
    if (contact.violatesFDCPA) return 'FDCPA VIOLATION';
    if (contact.aggressive) return 'AGGRESSIVE';
    if (contact.deceptive) return 'DECEPTIVE';
    return 'LEGITIMATE';
  };

  const getContactColor = (contact: CollectionContact): string => {
    if (contact.threatening && contact.violatesFDCPA) return '#7f1d1d';
    if (contact.violatesFDCPA) return '#dc2626';
    if (contact.aggressive) return '#ea580c';
    if (contact.deceptive) return '#d97706';
    return '#16a34a';
  };

  const calculateExploitationMetrics = (attempts: WithdrawalAttempt[]) => {
    const metrics = {
      totalAttempts: attempts.length,
      unauthorizedAttempts: 0,
      successfulWithdrawals: 0,
      nsfFeesGenerated: 0,
      totalFeesGenerated: 0,
      averageAttemptsPerLoan: 0,
      exploitationScore: 0
    };

    attempts.forEach(attempt => {
      if (!attempt.authorized) {
        metrics.unauthorizedAttempts++;
      }
      if (attempt.status === 'success') {
        metrics.successfulWithdrawals++;
      }
      if (attempt.nsfFee) {
        metrics.nsfFeesGenerated += attempt.nsfFee;
      }
      if (attempt.overdraftFee) {
        metrics.totalFeesGenerated += attempt.overdraftFee;
      }
      if (attempt.lenderFee) {
        metrics.totalFeesGenerated += attempt.lenderFee;
      }
    });

    return metrics;
  };

  const metrics = calculateExploitationMetrics(withdrawalAttempts);

  return (
    <div className="payment-collection-engine" style={{ maxWidth: '1000px', margin: '0 auto', padding: '1rem' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #dc2626, #ef4444)',
        color: 'white',
        padding: '2rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.8rem', fontWeight: 'bold' }}>
          💸 Payment Collection Engine
        </h2>
        <p style={{ margin: 0, fontSize: '1.1rem', opacity: 0.9 }}>
          Comprehensive simulation of predatory payment collection methods
        </p>
      </div>

      {/* Statistics Dashboard */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.3rem', fontWeight: 'bold' }}>
          📊 Collection Damage Assessment
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc2626' }}>
              ${totalDamage.toFixed(2)}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Total Financial Damage</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ea580c' }}>
              {violationCount}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Unauthorized Actions</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc2626' }}>
              {withdrawalAttempts.length}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Withdrawal Attempts</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#7f1d1d' }}>
              {harassmentLevel}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Harassment Level</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ca8a04' }}>
              {collectionContacts.length}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Collection Contacts</div>
          </div>
        </div>
      </div>

      {/* Account Overview */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', fontWeight: 'bold' }}>
          🏦 Victim's Bank Accounts
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {accounts.map((account) => (
            <div key={account.id} style={{
              background: '#f8f9fa',
              padding: '1rem',
              borderRadius: '8px',
              border: account.primary ? '2px solid #dc2626' : '1px solid #e9ecef'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 'bold' }}>{account.name}</span>
                {account.primary && (
                  <span style={{ fontSize: '0.8rem', background: '#dc2626', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                    Primary Target
                  </span>
                )}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                {account.type.charAt(0).toUpperCase() + account.type.slice(1)} Account
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: account.balance < 0 ? '#dc2626' : account.balance < 100 ? '#ca8a04' : '#16a34a' }}>
                ${account.balance.toFixed(2)}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>
                ****{account.accountNumber.slice(-4)} • Monthly Fee: ${account.monthlyFees}
              </div>
              {account.overdraftProtection && (
                <div style={{ fontSize: '0.8rem', color: '#ea580c', marginTop: '0.25rem' }}>
                  ⚠️ Overdraft Protection Enabled
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Simulation Controls */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', fontWeight: 'bold' }}>
          🎮 Collection Simulation
        </h3>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
            Phase {currentPhase} of 8: {getPhaseDescription(currentPhase)}
          </div>
          <div style={{
            background: '#f0f0f0',
            height: '8px',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              background: 'linear-gradient(90deg, #dc2626, #ef4444)',
              height: '100%',
              width: `${(currentPhase / 8) * 100}%`,
              transition: 'width 0.5s ease'
            }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={startCollectionSimulation}
            disabled={simulationActive}
            style={{
              flex: 1,
              padding: '0.75rem 1.5rem',
              background: simulationActive ? '#ccc' : 'linear-gradient(90deg, #dc2626, #ef4444)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: simulationActive ? 'not-allowed' : 'pointer',
              minWidth: '200px'
            }}
          >
            {simulationActive ? 'Simulation Running...' : 'Start Collection Exploitation'}
          </button>
          <button
            onClick={resetSimulation}
            style={{
              flex: 1,
              padding: '0.75rem 1.5rem',
              background: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              minWidth: '150px'
            }}
          >
            Reset Simulation
          </button>
        </div>
      </div>

      {/* Withdrawal History */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', fontWeight: 'bold' }}>
          💳 Payment Collection History
        </h3>
        {withdrawalAttempts.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
            No collection attempts yet. Start simulation to see predatory payment collection methods.
          </div>
        ) : (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {withdrawalAttempts.map((attempt) => (
              <div key={attempt.id} style={{
                background: '#f8f9fa',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                border: `2px solid ${getStatusColor(attempt.status)}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 'bold' }}>{attempt.purpose}</span>
                  <span style={{ 
                    background: getStatusColor(attempt.status),
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem'
                  }}>
                    {attempt.status.toUpperCase()}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <div><strong>Amount:</strong> ${attempt.amount}</div>
                  <div><strong>Attempt:</strong> #{attempt.attempt}</div>
                  <div><strong>Method:</strong> {attempt.collectionMethod.replace('_', ' ').toUpperCase()}</div>
                  <div style={{ color: attempt.authorized ? '#16a34a' : '#dc2626' }}>
                    {attempt.authorized ? '✅ Authorized' : '❌ UNAUTHORIZED'}
                  </div>
                </div>
                {(attempt.nsfFee || attempt.overdraftFee || attempt.lenderFee) && (
                  <div style={{
                    background: '#fee2e2',
                    color: '#dc2626',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    marginTop: '0.5rem',
                    fontSize: '0.9rem'
                  }}>
                    💸 Additional Fees: 
                    {attempt.nsfFee && ` NSF: $${attempt.nsfFee}`}
                    {attempt.overdraftFee && ` Overdraft: $${attempt.overdraftFee}`}
                    {attempt.lenderFee && ` Lender: $${attempt.lenderFee}`}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Collection Contact History */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', fontWeight: 'bold' }}>
          📞 Collection Contact Log
        </h3>
        {collectionContacts.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
            No collection contacts yet. Start simulation to see harassment patterns.
          </div>
        ) : (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {collectionContacts.map((contact) => (
              <div key={contact.id} style={{
                background: '#f8f9fa',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                border: `2px solid ${getContactColor(contact)}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{contact.method} Contact</span>
                  <span style={{ 
                    background: getContactColor(contact),
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem'
                  }}>
                    {getContactSeverity(contact)}
                  </span>
                </div>
                <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', fontStyle: 'italic' }}>
                  "{contact.content}"
                </div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>
                  {contact.timestamp.toLocaleTimeString()}
                  {contact.violatesFDCPA && (
                    <span style={{ color: '#dc2626', marginLeft: '1rem', fontWeight: 'bold' }}>
                      ⚠️ FDCPA VIOLATION
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Research Statistics */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', fontWeight: 'bold' }}>
          📈 Real-World Statistics
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div style={{ background: '#fee2e2', padding: '1rem', borderRadius: '8px', border: '1px solid #fecaca' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#dc2626' }}>32%</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              Of payday borrowers experience at least one unauthorized withdrawal
            </div>
          </div>
          <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '8px', border: '1px solid #fde68a' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d97706' }}>$35</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              Average NSF fee per failed withdrawal attempt
            </div>
          </div>
          <div style={{ background: '#ddd6fe', padding: '1rem', borderRadius: '8px', border: '1px solid #c4b5fd' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#7c3aed' }}>Multiple</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              Daily attempts common, generating fees each time
            </div>
          </div>
          <div style={{ background: '#fee2e2', padding: '1rem', borderRadius: '8px', border: '1px solid #fecaca' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#dc2626' }}>FDCPA</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              Violations common: workplace calls, threats, harassment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCollectionEngine; 