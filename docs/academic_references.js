// docs/academic_references.js
// Comprehensive Academic and Legal Reference Library for Lotus Simulation

export const AcademicReferences = {
    // Federal Regulations and Legal Framework
    federal_regulations: {
        cfpb_payday_rule: {
            title: "CFPB Payday Lending Rule (12 CFR Part 1041)",
            description: "Federal regulations governing payday, vehicle title, and certain high-cost installment loans",
            key_provisions: [
                "Ability-to-repay requirements",
                "Payment practices restrictions", 
                "Two failed payment attempt rule",
                "Cooling-off periods for short-term loans"
            ],
            effective_date: "2019-08-19",
            status: "Partially repealed, partially reinstated",
            citation: "12 CFR § 1041.1 et seq.",
            url: "https://www.consumerfinance.gov/rules-policy/regulations/1041/"
        },
        
        military_lending_act: {
            title: "Military Lending Act (MLA)",
            description: "Federal law protecting active-duty military members and dependents from predatory lending",
            key_provisions: [
                "36% MAPR cap for covered borrowers",
                "Prohibition on mandatory arbitration",
                "Required disclosures",
                "Prohibition on vehicle title as security"
            ],
            effective_date: "2007-10-01",
            expanded_date: "2017-10-03",
            citation: "10 USC § 987, 32 CFR § 232",
            covered_loans: ["Payday loans", "Vehicle title loans", "Refund anticipation loans", "Deposit advance products", "Installment loans", "Open-end credit"]
        },

        truth_in_lending_act: {
            title: "Truth in Lending Act (TILA)",
            description: "Federal law requiring disclosure of credit terms and costs",
            key_provisions: [
                "APR disclosure requirements",
                "Finance charge calculations",
                "Right of rescission",
                "Advertising restrictions"
            ],
            citation: "15 USC § 1601 et seq., Regulation Z (12 CFR § 1026)",
            relevance_to_payday: "Requires APR disclosure but has exemptions for fees under $75"
        },

        fair_debt_collection_practices_act: {
            title: "Fair Debt Collection Practices Act (FDCPA)",
            description: "Federal law regulating debt collection practices",
            key_provisions: [
                "Prohibited collection practices",
                "Required debt validation",
                "Time and place restrictions",
                "Consumer dispute rights"
            ],
            citation: "15 USC § 1692 et seq.",
            relevance_to_payday: "Applies to third-party debt collectors, often used by payday lenders"
        }
    },

    // State-by-State Regulatory Analysis
    state_regulations: {
        colorado: {
            usury_cap: "36% APR",
            effective_date: "2019-12-01",
            ballot_initiative: "Proposition 111 (2018)",
            impact: "Payday loan volume decreased 95%, no credit access crisis observed",
            studies: [
                "Colorado Attorney General Report (2021): Successful rate cap implementation",
                "Pew Charitable Trusts (2020): Colorado payday lending market analysis"
            ]
        },

        california: {
            usury_cap: "36% APR for loans under $2,500 (effective 2025)",
            legislation: "SB 1169 (2019), AB 539 (2019)",
            enforcement: "CA DFPI aggressive enforcement against rent-a-bank schemes",
            tribal_issues: "Ongoing litigation with tribal lenders claiming immunity"
        },

        texas: {
            usury_cap: "No state cap",
            cso_model: "Credit Service Organization loophole allows unlimited rates",
            data: "Texas OCCC: $2.01B in refinances vs $1.08B initial loans (2019)",
            reform_efforts: "Multiple failed legislative attempts (2019, 2021, 2023)"
        },

        new_york: {
            usury_cap: "25% APR (criminal usury at 25%+)",
            enforcement: "NY DFS blocked payment processors for tribal lenders",
            effectiveness: "Most online payday lenders stopped serving NY residents",
            study: "NY DFS Report (2022): Successful enforcement model"
        }
    },

    // Academic Research and Studies
    academic_studies: {
        pew_payday_lending_series: {
            title: "Pew Charitable Trusts Payday Lending Research Series",
            years: "2012-2023",
            key_findings: [
                "Average borrower stays in debt 5 months per year",
                "76% of lender revenue from borrowers who renew/reborrow within 14 days",
                "Rate caps effectively reduce harmful lending without credit access problems"
            ],
            methodology: "National surveys, state administrative data, borrower interviews",
            url: "https://www.pewtrusts.org/en/projects/small-dollar-loans"
        },

        cfpb_data_reports: {
            title: "CFPB Data Reports on Payday Lending",
            reports: [
                "Online Payday Loan Payments (2016)",
                "Payday Loans and Deposit Advance Products (2013)",
                "Single-Payment Vehicle Title Lending (2016)"
            ],
            key_data: [
                "Default rates of 20% on payday loans",
                "Median borrower takes 8-10 loans per year",
                "75% of industry revenue from borrowers in debt 10+ months"
            ]
        },

        academic_papers: [
            {
                authors: "Burke, K., Lanning, J., Leary, J., & Wang, J.",
                title: "CFPB Data Point: Payday lending",
                year: 2014,
                journal: "Consumer Financial Protection Bureau",
                key_finding: "Payday borrowers remain in debt an average of 5 months per year"
            },
            {
                authors: "Melzer, B. T.",
                title: "The real costs of credit access: Evidence from the payday lending market",
                year: 2011,
                journal: "Quarterly Journal of Economics",
                key_finding: "Payday loan access leads to increased difficulty paying mortgage, rent, and utilities"
            },
            {
                authors: "Skiba, P. M., & Tobacman, J.",
                title: "Payday loans, uncertainty and discounting: explaining patterns of borrowing, repayment, and default",
                year: 2019,
                journal: "American Economic Journal: Applied Economics",
                key_finding: "High default rates and frequent borrowing inconsistent with rational choice models"
            }
        ]
    },

    // Legal Case Studies
    legal_cases: {
        williams_v_walker_thomas_furniture: {
            citation: "350 F.2d 445 (D.C. Cir. 1965)",
            relevance: "Established unconscionability doctrine in consumer contracts",
            principle: "Courts can void contracts that are procedurally and substantively unfair"
        },

        cfpb_v_golden_valley_lending: {
            citation: "Civil Action No. 1:17-cv-00521 (D.D.C.)",
            year: 2017,
            issue: "Tribal lending immunity and CFPB jurisdiction",
            outcome: "Settlement requiring cessation of operations and consumer refunds"
        },

        people_v_lattimore: {
            citation: "Criminal Case (NY)",
            year: 2020,
            issue: "Criminal usury prosecution of online lender",
            significance: "First successful criminal prosecution of online payday lender in NY"
        }
    },

    // International Comparisons
    international_frameworks: {
        united_kingdom: {
            regulator: "Financial Conduct Authority (FCA)",
            reforms: "2015 price cap: 0.8% per day, £15 default fee cap",
            impact: "70% reduction in payday loan volume, minimal credit access issues",
            study: "FCA High-cost Credit Review (2019)"
        },

        canada: {
            provincial_regulation: "Criminal Code sets 60% APR ceiling",
            enforcement: "Provincial licensing and rate caps",
            alternatives: "Strong credit union and community lending sector"
        },

        australia: {
            reforms: "Small Amount Credit Contract (SACC) regulations",
            caps: "4% establishment fee + 20% annual cost cap",
            effectiveness: "Reduced harmful lending while maintaining access"
        }
    },

    // Industry Data and Financial Analysis
    industry_analysis: {
        market_size: {
            us_market_2023: "$9.3 billion in loan volume",
            stores: "Approximately 14,000 payday lending stores nationwide",
            online_growth: "300% increase in online lending 2018-2023",
            consolidation: "Top 5 companies control 40% of market"
        },

        profitability_analysis: {
            revenue_model: "76% of revenue from repeat borrowers",
            profit_margins: "40-50% gross margins typical",
            default_accounting: "Defaults offset by high-rate revenue from successful collections"
        },

        demographic_data: {
            borrower_income: "Median household income $30,000-$40,000",
            race_ethnicity: "Disproportionately affects communities of color",
            geographic: "Higher concentration in low-income zip codes",
            military: "Active-duty military 2-3x more likely to use payday loans"
        }
    },

    // Regulatory Evasion Documentation
    evasion_tactics: {
        tribal_sovereignty: {
            mechanism: "Partnership agreements with Native American tribes",
            legal_theory: "Tribal sovereign immunity from state regulation",
            reality: "Often minimal tribal ownership or control",
            enforcement_challenges: "Complex federal/state/tribal jurisdiction issues",
            cases: [
                "Plain Green LLC (Chippewa Cree Tribe)",
                "Great Plains Lending (Otoe-Missouria Tribe)",
                "MobiLoans (Tunica-Biloxi Tribe)"
            ]
        },

        rent_a_bank: {
            mechanism: "Partnership with federally chartered banks",
            legal_theory: "Federal preemption of state interest rate caps",
            structure: "Bank originates loan, immediately sells to payday lender",
            regulatory_response: "OCC guidance limiting arrangements (2020)",
            examples: [
                "LendUp + Cross River Bank",
                "OppLoans + FinWise Bank",
                "MoneyLion + Evolve Bank"
            ]
        },

        product_classification: {
            earned_wage_access: {
                framing: "Payroll service, not lending",
                reality: "Functions as high-cost advance with tips/fees",
                regulatory_gap: "Limited federal oversight of EWA products",
                examples: ["Earnin", "DailyPay", "Payactiv"]
            },
            
            credit_service_organizations: {
                framing: "Brokerage service, not lending",
                reality: "Circumvents state licensing and rate caps",
                prevalence: "Dominant model in Texas",
                regulation: "Minimal oversight in most states"
            }
        }
    },

    // Consumer Protection Resources
    consumer_resources: {
        complaint_mechanisms: [
            {
                agency: "Consumer Financial Protection Bureau",
                url: "https://www.consumerfinance.gov/complaint/",
                scope: "Federal jurisdiction over large lenders"
            },
            {
                agency: "State Attorneys General",
                scope: "State law violations and consumer fraud",
                effectiveness: "Variable by state"
            },
            {
                agency: "Federal Trade Commission",
                url: "https://reportfraud.ftc.gov/",
                scope: "Deceptive practices and unfair business practices"
            }
        ],

        alternatives: [
            {
                type: "Credit Union Payday Alternative Loans (PALs)",
                terms: "$200-$1,000, 1-6 months, 28% APR cap",
                availability: "Federal credit unions",
                finder: "https://mapping.ncua.gov/"
            },
            {
                type: "Community Development Financial Institutions (CDFIs)",
                terms: "Variable, typically much lower than payday loans",
                finder: "https://www.cdfifund.gov/pages/cdfi-locator.aspx"
            },
            {
                type: "Employee Assistance Programs",
                terms: "Often 0% interest emergency loans",
                availability: "Check with HR department"
            }
        ]
    },

    // Citation Formats
    citation_templates: {
        apa: {
            federal_regulation: "Consumer Financial Protection Bureau. (2017). Payday, vehicle title, and certain high-cost installment loans. 12 CFR § 1041. Federal Register.",
            academic_paper: "Melzer, B. T. (2011). The real costs of credit access: Evidence from the payday lending market. Quarterly Journal of Economics, 126(1), 517-555.",
            report: "Pew Charitable Trusts. (2019). How state rate limits affect credit access. Pew Research Center."
        }
    }
};

// Educational Scaffolding for Different Audience Levels
export const EducationalScaffolding = {
    beginner_consumer: {
        key_concepts: [
            "What is APR and why it matters",
            "How to calculate true cost of borrowing", 
            "Red flags of predatory lending",
            "Where to find help and alternatives"
        ],
        learning_objectives: [
            "Recognize deceptive marketing practices",
            "Calculate APR from fee-based loans",
            "Identify safer borrowing alternatives",
            "Know consumer rights and protections"
        ]
    },

    intermediate_advocate: {
        key_concepts: [
            "Regulatory framework and gaps",
            "State vs federal jurisdiction",
            "Industry business models and incentives",
            "Effective policy interventions"
        ],
        learning_objectives: [
            "Understand regulatory evasion tactics",
            "Analyze policy effectiveness",
            "Identify advocacy opportunities",
            "Develop consumer education strategies"
        ]
    },

    advanced_researcher: {
        key_concepts: [
            "Behavioral economics of debt traps",
            "Market structure and competition",
            "Regulatory arbitrage strategies",
            "International comparative analysis"
        ],
        learning_objectives: [
            "Design rigorous policy evaluations",
            "Analyze market failure mechanisms",
            "Develop regulatory solutions",
            "Conduct empirical research"
        ]
    }
};

export default { AcademicReferences, EducationalScaffolding };
