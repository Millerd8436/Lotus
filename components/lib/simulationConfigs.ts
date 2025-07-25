export interface StepConfig {
  title: string;
  description: string;
  isEthical: boolean;
  fields: {
    id: string;
    label: string;
    type: 'text' | 'number' | 'date' | 'checkbox';
    placeholder?: string;
    required: boolean;
    defaultValue?: any;
    darkPattern?: {
      type: 'hiddenFee' | 'urgency' | 'socialProof' | 'forcedAction';
      description: string;
    };
  }[];
}

export interface SimulationConfig {
  id: 'easyLend' | 'fairLend';
  name: string;
  description: string;
  initialLoanAmount: number;
  apr: number;
  repaymentMonths: number;
  steps: {
    initial: StepConfig;
    personal: StepConfig;
    employment: StepConfig;
    terms: StepConfig;
    submit: StepConfig;
  };
}

export const fairLendConfig: SimulationConfig = {
  id: 'fairLend',
  name: 'FairLend',
  description: 'Transparent, responsible lending designed for your well-being.',
  initialLoanAmount: 500,
  apr: 36,
  repaymentMonths: 6,
  steps: {
    initial: {
      title: 'Get Your Instant Loan Offer',
      description: 'Review your clear, transparent loan offer. We believe in informed consent and have no hidden fees.',
      isEthical: true,
      fields: []
    },
    personal: {
      title: 'Your Personal Information',
      description: 'We only ask for the information required to process your application securely.',
      isEthical: true,
      fields: [
        { id: 'fullName', label: 'Full Legal Name', type: 'text', placeholder: 'John A. Doe', required: true },
        { id: 'dob', label: 'Date of Birth', type: 'date', required: true },
        { id: 'ssn', label: 'Social Security Number', type: 'text', placeholder: '***-**-****', required: true },
      ]
    },
    employment: {
        title: 'Employment & Income',
        description: 'Please provide your current employment and income details.',
        isEthical: true,
        fields: [
            { id: 'employer', label: 'Employer Name', type: 'text', placeholder: 'ACME Corporation', required: true },
            { id: 'jobTitle', label: 'Job Title', type: 'text', placeholder: 'Product Manager', required: true },
            { id: 'income', label: 'Monthly Income', type: 'number', placeholder: '4000', required: true },
        ]
    },
    terms: {
        title: 'Review Your Loan Agreement',
        description: 'Here is a plain-language summary of your key terms:',
        isEthical: true,
        fields: [
            { id: 'agree', label: 'I have read and agree to the terms and conditions.', type: 'checkbox', required: true },
        ]
    },
    submit: {
        title: 'Ready to Submit?',
        description: 'Please review your information one last time. When you are ready, submit your application.',
        isEthical: true,
        fields: []
    }
  }
};

export const easyLendConfig: SimulationConfig = {
    id: 'easyLend',
    name: 'EasyLend',
    description: 'Your fast track to the cash you need, right when you need it.',
    initialLoanAmount: 500,
    apr: 399,
    repaymentMonths: 1,
    steps: {
        initial: {
            title: 'Unlock Your Cash Instantly!',
            description: 'Your special offer is waiting! Just a few quick steps to get your money.',
            isEthical: false,
            fields: []
        },
        personal: {
            title: 'Just a Few More Details...',
            description: 'We need to verify some details to secure your amazing rate!',
            isEthical: false,
            fields: [
                { id: 'fullName', label: 'Full Legal Name', type: 'text', placeholder: 'John A. Doe', required: true },
                { id: 'dob', label: 'Date of Birth', type: 'date', required: true },
                { id: 'ssn', label: 'Social Security Number', type: 'text', placeholder: '***-**-****', required: true },
                { id: 'contactAccess', label: 'Grant Contact Access', type: 'checkbox', required: false, darkPattern: { type: 'forcedAction', description: 'To help us verify your identity and speed things up, please grant us temporary access to your phone\'s contact list.' } },
            ]
        },
        employment: {
            title: 'Verify Your Income Source to Lock In Your Rate!',
            description: 'Almost there! Providing this info helps us guarantee your funds.',
            isEthical: false,
            fields: [
                { id: 'employer', label: 'Employer Name', type: 'text', placeholder: 'ACME Corporation', required: true },
                { id: 'jobTitle', label: 'Job Title', type: 'text', placeholder: 'Product Manager', required: true },
                { id: 'income', label: 'Monthly Income', type: 'number', placeholder: '4000', required: true },
                { id: 'supervisor', label: 'Supervisor\'s Name & Phone (Optional)', type: 'text', placeholder: 'Helps speed up verification!', required: false },
            ]
        },
        terms: {
            title: 'Final Step: Review & Agree',
            description: 'Please review the terms of your agreement below. By checking the box, you agree to all terms.',
            isEthical: false,
            fields: [
                { id: 'agree', label: 'I have read and agree to the terms and conditions.', type: 'checkbox', required: true, defaultValue: true, darkPattern: { type: 'hiddenFee', description: '... buried deep within this text is a Confession of Judgment clause. ... By signing this, you waive your right to legal defense if we sue you. ...' } },
            ]
        },
        submit: {
            title: 'You\'re All Set!',
            description: 'Your cash is waiting! Hit submit to get your money transferred ASAP!',
            isEthical: false,
            fields: []
        }
    }
}; 