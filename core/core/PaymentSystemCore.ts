/**
 * PaymentSystemCore - Unified Payment Processing Module
 *
 * Consolidates functionality from:
 * - ACHExploitationEngine
 * - PaymentCollectionEngine
 * - DebtTrapMechanism (payment aspects)
 *
 * Provides a single source of truth for all payment-related operations
 */

export interface BankAccount {
  id: string;
  name: string;
  type: "checking" | "savings" | "prepaid";
  balance: number;
  routingNumber: string;
  accountNumber: string;
  primary: boolean;
  overdraftProtection?: boolean;
  monthlyFees?: number;
}

export interface WithdrawalAttempt {
  id: string;
  date: Date;
  amount: number;
  purpose: string;
  status: "pending" | "success" | "failed" | "nsf" | "blocked";
  nsfFee?: number;
  attempt: number;
  authorized: boolean;
  accountId: string;
  violationType?: "unauthorized" | "duplicate" | "excessive" | "wrong_account";
}

export interface LoanPayment {
  id: string;
  dueDate: Date;
  amount: number;
  principal: number;
  fees: number;
  status: "pending" | "paid" | "failed" | "rolled_over" | "defaulted";
  rolloverCount: number;
  attemptCount?: number;
}

export interface CollectionContact {
  id: string;
  timestamp: Date;
  type: "call" | "text" | "email" | "mail" | "workplace" | "reference";
  recipient: "borrower" | "employer" | "reference" | "family";
  content: string;
  aggressive: boolean;
  threatening: boolean;
  deceptive: boolean;
  violatesFDCPA: boolean;
}

export interface ContactTemplate {
  content: string;
  aggressive: boolean;
  threatening: boolean;
  deceptive: boolean;
  violatesFDCPA: boolean;
}

export interface PaymentSystemState {
  accounts: BankAccount[];
  withdrawalAttempts: WithdrawalAttempt[];
  loanPayments: LoanPayment[];
  collectionContacts: CollectionContact[];
  totalNSFFees: number;
  exploitationScore: number;
  violationCount: number;
  harassmentLevel: number;
}

export class PaymentSystemCore {
  private state: PaymentSystemState = {
    accounts: [],
    withdrawalAttempts: [],
    loanPayments: [],
    collectionContacts: [],
    totalNSFFees: 0,
    exploitationScore: 0,
    violationCount: 0,
    harassmentLevel: 0,
  };

  /**
   * Initialize with default bank accounts
   */
  initializeAccounts(): BankAccount[] {
    const accounts: BankAccount[] = [
      {
        id: "checking_primary",
        name: "Wells Fargo Checking",
        type: "checking",
        balance: 180,
        routingNumber: "121000248",
        accountNumber: "4567890123",
        primary: true,
        overdraftProtection: false,
        monthlyFees: 12,
      },
      {
        id: "savings_backup",
        name: "Wells Fargo Savings",
        type: "savings",
        balance: 420,
        routingNumber: "121000248",
        accountNumber: "9876543210",
        primary: false,
        overdraftProtection: false,
        monthlyFees: 5,
      },
      {
        id: "prepaid_card",
        name: "NetSpend Prepaid Card",
        type: "prepaid",
        balance: 85,
        routingNumber: "073905527",
        accountNumber: "1122334455",
        primary: false,
        overdraftProtection: true,
        monthlyFees: 9.95,
      },
    ];

    this.state.accounts = accounts;
    return accounts;
  }

  /**
   * Attempt ACH withdrawal with exploitation patterns
   */
  attemptWithdrawal(
    accountId: string,
    amount: number,
    purpose: string,
    authorized: boolean = true,
    attemptNumber: number = 1
  ): WithdrawalAttempt {
    const account = this.state.accounts.find((a) => a.id === accountId);
    if (!account) {
      throw new Error(`Account ${accountId} not found`);
    }

    const attempt: WithdrawalAttempt = {
      id: `withdrawal_${Date.now()}_${attemptNumber}`,
      date: new Date(),
      amount,
      purpose,
      status: "pending",
      attempt: attemptNumber,
      authorized,
      accountId,
    };

    // Process withdrawal
    if (account.balance >= amount) {
      attempt.status = "success";
      account.balance -= amount;
    } else {
      attempt.status = "nsf";
      attempt.nsfFee = 35;
      this.state.totalNSFFees += 35;

      // Bank may charge NSF fee even on insufficient funds
      if (account.balance >= 35) {
        account.balance -= 35;
      } else {
        account.balance = -35; // Overdraft
      }
    }

    // Track violations
    if (!authorized) {
      attempt.violationType = "unauthorized";
      this.state.violationCount++;
    }

    if (attemptNumber > 3) {
      attempt.violationType = "excessive";
      this.state.violationCount++;
    }

    this.state.withdrawalAttempts.push(attempt);
    this.updateExploitationScore();

    return attempt;
  }

  /**
   * Generate collection contact with harassment patterns
   */
  generateCollectionContact(
    type: CollectionContact["type"],
    recipient: CollectionContact["recipient"],
    aggressionLevel: number = 1
  ): CollectionContact {
    const templates = this.getContactTemplates(
      type,
      recipient,
      aggressionLevel
    );

    // Ensure we always have a template
    if (templates.length === 0) {
      throw new Error("No contact templates available");
    }

    const templateIndex = Math.floor(Math.random() * templates.length);
    const template = templates[templateIndex];

    if (!template) {
      throw new Error("No valid template found");
    }

    const contact: CollectionContact = {
      id: `contact_${Date.now()}`,
      timestamp: new Date(),
      type,
      recipient,
      content: template.content,
      aggressive: template.aggressive,
      threatening: template.threatening,
      deceptive: template.deceptive,
      violatesFDCPA: template.violatesFDCPA,
    };

    this.state.collectionContacts.push(contact);

    if (contact.violatesFDCPA) {
      this.state.violationCount++;
    }

    this.state.harassmentLevel = Math.min(
      10,
      this.state.harassmentLevel + aggressionLevel
    );

    return contact;
  }

  /**
   * Process rollover with debt trap mechanics
   */
  processRollover(paymentId: string): LoanPayment {
    const payment = this.state.loanPayments.find((p) => p.id === paymentId);
    if (!payment) {
      throw new Error(`Payment ${paymentId} not found`);
    }

    const rolloverFee = payment.principal * 0.15; // 15% rollover fee

    const newPayment: LoanPayment = {
      id: `payment_${Date.now()}`,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
      amount: payment.principal + rolloverFee,
      principal: payment.principal, // Principal doesn't decrease
      fees: rolloverFee,
      status: "pending",
      rolloverCount: payment.rolloverCount + 1,
    };

    payment.status = "rolled_over";
    this.state.loanPayments.push(newPayment);
    this.updateExploitationScore();

    return newPayment;
  }

  /**
   * Calculate exploitation patterns
   */
  private updateExploitationScore(): void {
    const factors = {
      nsfFees: this.state.totalNSFFees / 35, // Number of NSF occurrences
      violations: this.state.violationCount,
      harassment: this.state.harassmentLevel,
      rollovers: this.state.loanPayments.filter((p) => p.rolloverCount > 0)
        .length,
      unauthorizedAttempts: this.state.withdrawalAttempts.filter(
        (w) => !w.authorized
      ).length,
    };

    this.state.exploitationScore =
      factors.nsfFees * 20 +
      factors.violations * 15 +
      factors.harassment * 10 +
      factors.rollovers * 25 +
      factors.unauthorizedAttempts * 30;
  }

  /**
   * Get contact templates based on type and aggression level
   */
  private getContactTemplates(
    type: CollectionContact["type"],
    recipient: CollectionContact["recipient"],
    aggressionLevel: number
  ): ContactTemplate[] {
    // Default template
    const defaultTemplate: ContactTemplate = {
      content: "This is regarding your loan payment.",
      aggressive: false,
      threatening: false,
      deceptive: false,
      violatesFDCPA: false,
    };

    // Complete template structure
    const baseTemplates: Record<
      CollectionContact["type"],
      Partial<Record<CollectionContact["recipient"], ContactTemplate[]>>
    > = {
      call: {
        borrower: [
          {
            content:
              "This is regarding your loan payment. Please call us back.",
            aggressive: false,
            threatening: false,
            deceptive: false,
            violatesFDCPA: false,
          },
          {
            content: "You MUST pay TODAY or face serious consequences!",
            aggressive: true,
            threatening: true,
            deceptive: false,
            violatesFDCPA: true,
          },
        ],
        employer: [
          {
            content:
              "We're trying to reach your employee about a financial matter.",
            aggressive: false,
            threatening: false,
            deceptive: true,
            violatesFDCPA: true,
          },
        ],
      },
      text: {
        borrower: [
          {
            content: "Payment due today. Reply STOP to opt out.",
            aggressive: false,
            threatening: false,
            deceptive: false,
            violatesFDCPA: false,
          },
        ],
      },
      email: {
        borrower: [
          {
            content: "Your loan payment is due. Click here to pay now.",
            aggressive: false,
            threatening: false,
            deceptive: false,
            violatesFDCPA: false,
          },
        ],
      },
      mail: {},
      workplace: {},
      reference: {},
    };

    const typeTemplates = baseTemplates[type];
    if (!typeTemplates) {
      return [defaultTemplate];
    }

    const recipientTemplates = typeTemplates[recipient];
    if (!recipientTemplates || recipientTemplates.length === 0) {
      return [defaultTemplate];
    }

    // Filter by aggression level if needed
    if (aggressionLevel > 5) {
      const aggressiveTemplates = recipientTemplates.filter(
        (t) => t.aggressive || t.threatening
      );
      return aggressiveTemplates.length > 0
        ? aggressiveTemplates
        : recipientTemplates;
    }

    return recipientTemplates;
  }

  /**
   * Get current state
   */
  getState(): PaymentSystemState {
    return { ...this.state };
  }

  /**
   * Reset system
   */
  reset(): void {
    this.state = {
      accounts: this.initializeAccounts(),
      withdrawalAttempts: [],
      loanPayments: [],
      collectionContacts: [],
      totalNSFFees: 0,
      exploitationScore: 0,
      violationCount: 0,
      harassmentLevel: 0,
    };
  }
}
