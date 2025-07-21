export const getSchemeEducation = (schemeType: string) => {
  const educationContent = {
    tip_coercion: {
      title: "🚨 Tip Coercion Detected",
      description:
        "This app is using 'tip' language to disguise high-interest loans",
      explanation: `
          Fintech apps increasingly use "tip" language to make loans seem like voluntary gratuities. 
          This is a psychological manipulation tactic that:
          
          • Makes loans feel voluntary and guilt-free
          • Obscures the true nature of the financial obligation
          • Often results in higher effective interest rates
          • May not be clearly disclosed as debt in credit reporting
          
          The app may suggest "tipping" amounts that correspond to extremely high APRs.
        `,
      warning:
        "Tips are actually loans with interest - you're legally obligated to repay them",
      legalContext:
        "CFPB has indicated that 'tip' loans may be deceptive if they obscure the true nature of the financial product",
      protectiveActions: [
        "Calculate the APR of the 'tip' amount",
        "Ask for clear loan documentation",
        "Compare with traditional loan products",
        "Understand your repayment obligations",
      ],
      redFlags: [
        "Suggested tip amounts that seem high relative to the advance",
        "Pressure to tip higher amounts",
        "Unclear documentation about repayment terms",
        "Difficulty opting out of tips",
      ],
    },
    daily_debit: {
      title: "🏦 Daily Debit Scheme Identified",
      description:
        "This lender uses daily debiting to maximize payments and control your account",
      explanation: `
          Daily debit schemes automatically withdraw small amounts daily rather than monthly payments.
          This tactic:
          
          • Maximizes cash flow for the lender
          • Makes the true cost harder to calculate
          • Increases NSF fee opportunities
          • Maintains constant access to your account
          • Can destabilize your cash flow
          
          Daily debiting often results in paying more over time compared to traditional repayment schedules.
        `,
      warning:
        "Daily debiting can quickly drain your account and trigger overdraft fees",
      legalContext:
        "Some states restrict daily debiting frequency to protect consumers from cash flow disruption",
      protectiveActions: [
        "Calculate total cost versus monthly payments",
        "Monitor your account balance daily",
        "Ensure sufficient funds before each debit",
        "Understand your rights to revoke ACH authorization",
      ],
      redFlags: [
        "Daily or multiple weekly withdrawals",
        "Variable debit amounts",
        "Pressure to provide ACH authorization",
        "Unclear total payment calculations",
      ],
    },
    confession_judgment: {
      title: "⚖️ Confession of Judgment Clause Found",
      description:
        "This contract includes confession of judgment - you're waiving critical legal rights",
      explanation: `
          Confession of judgment clauses allow lenders to obtain court judgments against you 
          WITHOUT a trial or your presence in court. This means:
          
          • The lender can garnish wages immediately upon default
          • You waive your right to defend yourself in court
          • Collection can happen in any state, not just where you live
          • Bank accounts can be frozen without notice
          • You may not even know a judgment was entered
          
          This is one of the most dangerous clauses in lending contracts.
        `,
      warning:
        "You're signing away fundamental legal protections - this could devastate your finances",
      legalContext:
        "Confession of judgment is banned in many states and prohibited in federal credit laws",
      protectiveActions: [
        "NEVER sign a confession of judgment clause",
        "Seek legal counsel before signing",
        "Look for alternative lenders without this clause",
        "Contact your state attorney general if pressured to sign",
      ],
      redFlags: [
        "Any mention of 'confession of judgment'",
        "Waiving right to court proceedings",
        "Consent to jurisdiction in other states",
        "Authorization for immediate wage garnishment",
      ],
    },
    rent_a_bank: {
      title: "🏛️ Rent-a-Bank Scheme Detected",
      description:
        "This lender is using a bank partnership to evade state interest rate limits",
      explanation: `
          Rent-a-bank schemes involve non-bank lenders partnering with banks to claim federal 
          preemption from state usury laws. This allows them to:
          
          • Charge interest rates above state limits
          • Evade state consumer protections
          • Claim federal banking exemptions
          • Transfer legal liability to partner banks
          
          The FDIC and OCC have issued guidance restricting these arrangements, but they persist.
        `,
      warning:
        "This loan may violate your state's interest rate caps through regulatory arbitrage",
      legalContext:
        "Rent-a-bank schemes may violate the true lender doctrine and state partnership laws",
      protectiveActions: [
        "Check your state's maximum interest rates",
        "File complaints with state and federal regulators",
        "Document the true lender relationship",
        "Seek alternatives within state rate limits",
      ],
      redFlags: [
        "Partnership with out-of-state banks",
        "Interest rates above state limits",
        "Confusing lender identity documentation",
        "Claims of federal preemption",
      ],
    },
    salary_advance: {
      title: "💰 Employer Salary Advance Manipulation",
      description:
        "This 'advance' is actually a high-cost loan disguised as an employee benefit",
      explanation: `
          Employer-sponsored salary advance programs often market themselves as employee benefits
          but function as high-cost loans. These programs:
          
          • Charge fees equivalent to high APRs
          • Create dependency cycles
          • May report to credit bureaus
          • Often include mandatory tips or fees
          • Can affect employment if overused
          
          True salary advances should be free or very low cost.
        `,
      warning:
        "Workplace lending can affect your employment and create financial dependency",
      legalContext:
        "CFPB considers workplace lending subject to Truth in Lending Act requirements",
      protectiveActions: [
        "Calculate the APR of all fees",
        "Understand employment policy impacts",
        "Compare with traditional lending options",
        "Ask HR about free advance options",
      ],
      redFlags: [
        "Fees for salary advances",
        "Mandatory tips or subscriptions",
        "Credit reporting for advances",
        "Pressure from employer to use service",
      ],
    },
  };

  return educationContent[schemeType as keyof typeof educationContent];
};

export const getSchemeQuiz = (schemeType: string) => {
  const quizzes = {
    tip_coercion: {
      question:
        "What should you do if an app asks for a 'tip' on a cash advance?",
      options: [
        "Always tip the maximum to show gratitude",
        "Calculate the APR and compare to loan alternatives",
        "Tip whatever feels right",
        "Ignore it since tips are optional",
      ],
      correct: 1,
      explanation:
        "Always calculate the APR of 'tips' as they are actually loan interest charges.",
    },
    daily_debit: {
      question: "Why are daily debit schemes potentially harmful?",
      options: [
        "They're more convenient than monthly payments",
        "They help build credit faster",
        "They can destabilize cash flow and increase overdraft fees",
        "They're required by federal law",
      ],
      correct: 2,
      explanation:
        "Daily debiting can quickly drain accounts and trigger expensive overdraft fees.",
    },
    confession_judgment: {
      question:
        "What does a confession of judgment clause allow a lender to do?",
      options: [
        "Charge higher interest rates",
        "Report to credit bureaus immediately",
        "Obtain court judgments without a trial",
        "Extend the loan term automatically",
      ],
      correct: 2,
      explanation:
        "Confession of judgment allows wage garnishment and asset seizure without court proceedings.",
    },
  };

  return quizzes[schemeType as keyof typeof quizzes];
};
