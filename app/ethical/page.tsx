"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import usuryLaws from "@/data/usury_laws_loopholes_2025.json";
import {
  AcademicCapIcon,
  BanknotesIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  HeartIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EthicalHomePage() {
  const router = useRouter();
  const [showPhilosophy, setShowPhilosophy] = useState(true);
  const [understood, setUnderstood] = useState(false);
  const [selectedAlternative, setSelectedAlternative] = useState<string | null>(
    null
  );
  const [userState, setUserState] = useState<string>("CA");

  const ethicalPrinciples = [
    {
      principle: "Respect for Persons (Autonomy)",
      description:
        "True consent requires full information, time to deliberate, and freedom from coercion. We provide complete transparency upfront.",
      icon: "🤝",
      kantianConnection:
        "Treating people as ends in themselves, never merely as means",
    },
    {
      principle: "Beneficence (Do Good)",
      description:
        "Financial services should genuinely improve your situation. We ensure our loans help, not harm.",
      icon: "❤️",
      kantianConnection: "Acting from duty to help others flourish",
    },
    {
      principle: "Non-Maleficence (Do No Harm)",
      description:
        "Loans should never trap you in debt cycles. We design products that promote financial health.",
      icon: "🛡️",
      kantianConnection:
        "Categorical imperative: Act only on maxims that could be universal laws",
    },
    {
      principle: "Justice (Fairness)",
      description:
        "Everyone deserves fair terms regardless of desperation. We never exploit vulnerability.",
      icon: "⚖️",
      kantianConnection: "Equal dignity and worth of all rational beings",
    },
  ];

  const betterAlternatives = [
    {
      name: "Credit Union PAL Loans",
      description:
        "Federal credit unions offer Payday Alternative Loans (PALs) with 28% APR max, 1-12 month terms",
      requirements: "Must be credit union member for 1+ months",
      amounts: "$200-$2,000",
      apr: "Up to 28%",
      pros: [
        "No credit check often",
        "Build credit history",
        "Financial counseling included",
      ],
      cons: ["Membership required", "Limited availability"],
      howToAccess: "Visit NCUA.gov to find local credit unions offering PALs",
      icon: <BanknotesIcon className="w-6 h-6 text-blue-600" />,
    },
    {
      name: "Employer Cash Advances",
      description:
        "Many employers offer emergency advances on earned wages without fees",
      requirements: "Must be employed",
      amounts: "Up to 50% of earned wages",
      apr: "0%",
      pros: ["No fees", "No credit check", "Instant access"],
      cons: ["Reduces next paycheck", "Not all employers offer"],
      howToAccess: "Ask HR about employee assistance programs",
      icon: <UserGroupIcon className="w-6 h-6 text-green-600" />,
    },
    {
      name: "Community Assistance",
      description:
        "Local nonprofits offer emergency financial help and bill payment assistance",
      requirements: "Proof of hardship",
      amounts: "Varies",
      apr: "0% (grants)",
      pros: [
        "No repayment often",
        "Additional services",
        "Counseling included",
      ],
      cons: ["Limited funds", "Eligibility requirements"],
      howToAccess: "Call 211 or visit 211.org for local resources",
      icon: <HeartIcon className="w-6 h-6 text-purple-600" />,
    },
    {
      name: "Payment Plans",
      description:
        "Negotiate directly with creditors for extended payment terms",
      requirements: "Contact creditor before default",
      amounts: "Your existing debt",
      apr: "Often 0%",
      pros: ["Avoid new debt", "Preserve credit", "No fees usually"],
      cons: ["Requires negotiation", "Not guaranteed"],
      howToAccess:
        "Call billing departments directly - most have hardship programs",
      icon: <ScaleIcon className="w-6 h-6 text-orange-600" />,
    },
    {
      name: "Earned Wage Access Apps",
      description: "Apps like Dave, Earnin let you access earned wages early",
      requirements: "Regular direct deposit",
      amounts: "$10-$500",
      apr: "Tips only (0-15% effective)",
      pros: ["Quick access", "No credit check", "Low cost"],
      cons: ["Creates paycheck shortfall", "Can become habit"],
      howToAccess: "Download apps, connect bank account with direct deposit",
      icon: <BanknotesIcon className="w-6 h-6 text-teal-600" />,
    },
    {
      name: "Credit Builder Loans",
      description:
        "Build credit while saving - funds released after payments complete",
      requirements: "Ability to make monthly payments",
      amounts: "$300-$3,000",
      apr: "6-16%",
      pros: ["Build credit", "Forced savings", "Lower rates"],
      cons: ["No immediate cash", "Requires patience"],
      howToAccess: "Available at most credit unions and some banks",
      icon: <AcademicCapIcon className="w-6 h-6 text-indigo-600" />,
    },
  ];

  // Get state-specific information
  const stateInfo =
    usuryLaws.usury_laws_by_state.states_with_bans.states.find(
      (s) => s.state === userState
    ) ||
    usuryLaws.usury_laws_by_state.states_with_high_caps.states.find(
      (s) => s.state === userState
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Enhanced Philosophy Modal with Kantian Ethics */}
      {showPhilosophy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              📚 Our Ethical Framework: Kantian Principles in Action
            </h2>

            <div className="bg-purple-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700 font-medium">
                "Act so that you treat humanity, whether in your own person or
                in that of another, always as an end and never merely as a
                means." - Immanuel Kant
              </p>
            </div>

            <p className="text-gray-700 mb-6">
              Traditional payday lenders violate every principle of Kantian
              ethics by treating desperate borrowers as means to profit. We
              operate differently, ensuring every interaction respects your
              autonomy and dignity.
            </p>

            <div className="space-y-4 mb-6">
              {ethicalPrinciples.map((item) => (
                <div
                  key={item.principle}
                  className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.principle}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.description}
                    </p>
                    <p className="text-xs text-purple-600 italic">
                      {item.kantianConnection}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold mb-2">Why This Matters:</h4>
              <p className="text-sm text-gray-700">
                Predatory lenders exploit vulnerability, hide true costs, and
                create artificial urgency to prevent rational decision-making.
                This violates the conditions for true informed consent: full
                information, time to deliberate, freedom from coercion, and
                understanding of consequences.
              </p>
            </div>

            <label className="flex items-center mb-6">
              <input
                type="checkbox"
                checked={understood}
                onChange={(e) => setUnderstood(e.target.checked)}
                className="mr-3 w-4 h-4"
              />
              <span className="text-sm">
                I understand these ethical principles and want to explore
                alternatives to predatory lending
              </span>
            </label>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setShowPhilosophy(false)}
              disabled={!understood}
            >
              Explore Ethical Alternatives →
            </Button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Ethical Financial Solutions
            </h1>
            <div className="flex items-center gap-4">
              <select
                value={userState}
                onChange={(e) => setUserState(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option value="CA">California</option>
                <option value="NY">New York</option>
                <option value="TX">Texas</option>
                {/* Add more states */}
              </select>
              <p className="text-sm text-gray-600">
                Transparent • Fair • Educational • Kantian
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* State-specific warning */}
        {stateInfo && (
          <div
            className={`mb-8 p-4 rounded-lg ${
              stateInfo.state === userState &&
              stateInfo.maxAPR &&
              stateInfo.maxAPR <= 36
                ? "bg-green-50 border-2 border-green-300"
                : "bg-yellow-50 border-2 border-yellow-300"
            }`}
          >
            <p className="text-sm font-semibold">
              {stateInfo.maxAPR && stateInfo.maxAPR <= 36 ? (
                <>
                  ✅ Good news! {userState} caps payday loan rates at{" "}
                  {stateInfo.maxAPR}% APR
                </>
              ) : (
                <>
                  ⚠️ Warning: {userState} allows payday loans up to 460% APR.
                  Explore alternatives below.
                </>
              )}
            </p>
          </div>
        )}

        {/* Clear value proposition */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Financial Help Without the Debt Trap
          </h2>
          <p className="text-xl text-gray-700 mb-6 max-w-3xl mx-auto">
            Before considering any high-cost loan, explore these ethical
            alternatives that respect your dignity and financial wellbeing.
          </p>

          <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-6 max-w-3xl mx-auto">
            <ScaleIcon className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <p className="text-sm font-semibold text-purple-800">
              Our Kantian Promise: We will never use your desperation against
              you. Every option presented allows for true informed consent with
              full transparency.
            </p>
          </div>
        </section>

        {/* Comprehensive Alternatives Grid */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-2">
            Better Alternatives to Payday Loans
          </h3>
          <p className="text-center text-gray-600 mb-8">
            Based on 2025 research and real solutions that work
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {betterAlternatives.map((alt) => (
              <Card
                key={alt.name}
                className={`p-6 hover:shadow-lg transition-all cursor-pointer ${
                  selectedAlternative === alt.name ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() =>
                  setSelectedAlternative(
                    selectedAlternative === alt.name ? null : alt.name
                  )
                }
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">{alt.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2">{alt.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {alt.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div>
                        <span className="font-medium">Amount:</span>{" "}
                        {alt.amounts}
                      </div>
                      <div>
                        <span className="font-medium">APR:</span>
                        <span
                          className={
                            alt.apr === "0%" ? "text-green-600 font-bold" : ""
                          }
                        >
                          {" "}
                          {alt.apr}
                        </span>
                      </div>
                    </div>

                    {selectedAlternative === alt.name && (
                      <div className="mt-4 space-y-3 border-t pt-4">
                        <div>
                          <h5 className="font-medium text-green-700 mb-1">
                            ✓ Pros:
                          </h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {alt.pros.map((pro, idx) => (
                              <li key={idx}>• {pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-orange-700 mb-1">
                            ⚠ Cons:
                          </h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {alt.cons.map((con, idx) => (
                              <li key={idx}>• {con}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-blue-50 p-3 rounded">
                          <h5 className="font-medium text-blue-800 mb-1">
                            How to Access:
                          </h5>
                          <p className="text-xs text-blue-700">
                            {alt.howToAccess}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Interactive Cost Comparison */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">
            True Cost Comparison: See the Difference
          </h3>

          <div className="bg-white rounded-lg shadow-lg p-8 max-w-5xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4">Option</th>
                    <th className="text-center py-3 px-4">Borrow $500</th>
                    <th className="text-center py-3 px-4">Time to Repay</th>
                    <th className="text-center py-3 px-4">Total Cost</th>
                    <th className="text-center py-3 px-4">Your Savings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b bg-red-50">
                    <td className="py-4 px-4 font-medium">Payday Loan</td>
                    <td className="text-center">$500</td>
                    <td className="text-center">2 weeks (5 rollovers)</td>
                    <td className="text-center text-red-600 font-bold">$800</td>
                    <td className="text-center">-</td>
                  </tr>
                  <tr className="border-b bg-green-50">
                    <td className="py-4 px-4 font-medium">Credit Union PAL</td>
                    <td className="text-center">$500</td>
                    <td className="text-center">6 months</td>
                    <td className="text-center text-green-600 font-bold">
                      $570
                    </td>
                    <td className="text-center text-green-600 font-bold">
                      Save $230
                    </td>
                  </tr>
                  <tr className="border-b bg-green-50">
                    <td className="py-4 px-4 font-medium">Employer Advance</td>
                    <td className="text-center">$500</td>
                    <td className="text-center">Next paycheck</td>
                    <td className="text-center text-green-600 font-bold">
                      $500
                    </td>
                    <td className="text-center text-green-600 font-bold">
                      Save $300
                    </td>
                  </tr>
                  <tr className="border-b bg-green-50">
                    <td className="py-4 px-4 font-medium">Payment Plan</td>
                    <td className="text-center">N/A</td>
                    <td className="text-center">3-6 months</td>
                    <td className="text-center text-green-600 font-bold">
                      $0 extra
                    </td>
                    <td className="text-center text-green-600 font-bold">
                      Save $300+
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />
                Reality Check: The Debt Trap
              </h4>
              <p className="text-sm text-gray-700">
                80% of payday loan borrowers roll over their loans. The average
                borrower pays $520 in fees to borrow $375 over 5 months. That's
                a 139% fee just to borrow money!
              </p>
            </div>
          </div>
        </section>

        {/* Financial Empowerment Resources */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">
            Free Resources to Build Financial Strength
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <AcademicCapIcon className="w-8 h-8 text-blue-600 mb-3" />
              <h4 className="font-semibold mb-3">Financial Literacy Course</h4>
              <p className="text-sm text-gray-600 mb-4">
                8-week online course covering budgeting, credit, saving, and
                investing basics.
              </p>
              <ul className="text-xs text-gray-500 mb-4 space-y-1">
                <li>✓ Self-paced learning</li>
                <li>✓ Certificate upon completion</li>
                <li>✓ Completely free</li>
              </ul>
              <Button variant="outline" size="sm" className="w-full">
                Start Learning →
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <UserGroupIcon className="w-8 h-8 text-green-600 mb-3" />
              <h4 className="font-semibold mb-3">Free Credit Counseling</h4>
              <p className="text-sm text-gray-600 mb-4">
                One-on-one sessions with certified counselors to create
                personalized plans.
              </p>
              <ul className="text-xs text-gray-500 mb-4 space-y-1">
                <li>✓ Debt management plans</li>
                <li>✓ Budget creation</li>
                <li>✓ Credit repair guidance</li>
              </ul>
              <Button variant="outline" size="sm" className="w-full">
                Schedule Session →
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <ShieldCheckIcon className="w-8 h-8 text-purple-600 mb-3" />
              <h4 className="font-semibold mb-3">Emergency Fund Builder</h4>
              <p className="text-sm text-gray-600 mb-4">
                Automated savings program to build your emergency fund, starting
                with just $1/week.
              </p>
              <ul className="text-xs text-gray-500 mb-4 space-y-1">
                <li>✓ Micro-savings approach</li>
                <li>✓ Goal tracking</li>
                <li>✓ Rewards for milestones</li>
              </ul>
              <Button variant="outline" size="sm" className="w-full">
                Start Saving →
              </Button>
            </Card>
          </div>
        </section>

        {/* Ethical Loan Option (Last Resort) */}
        <section className="text-center">
          <div className="bg-gray-50 rounded-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-4">
              Still Need Emergency Funds?
            </h3>

            <p className="text-gray-700 mb-6">
              If you've explored all alternatives and still face an emergency,
              we offer transparent, ethical loans with:
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm">
              <div className="bg-white p-3 rounded-lg">
                <CheckIcon className="w-5 h-5 text-green-600 mx-auto mb-1" />
                <p className="font-medium">36% APR Cap</p>
                <p className="text-xs text-gray-600">
                  10x lower than payday loans
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <CheckIcon className="w-5 h-5 text-green-600 mx-auto mb-1" />
                <p className="font-medium">6-Month Terms</p>
                <p className="text-xs text-gray-600">Manageable payments</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <CheckIcon className="w-5 h-5 text-green-600 mx-auto mb-1" />
                <p className="font-medium">No Hidden Fees</p>
                <p className="text-xs text-gray-600">Full transparency</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Required:</strong> You must first speak with our
                financial counselor to explore all alternatives. This 15-minute
                call could save you hundreds.
              </p>
            </div>

            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => router.push("/ethical/assessment")}
            >
              Schedule Counseling Call →
            </Button>

            <p className="text-xs text-gray-600 mt-4">
              No pressure • No data selling • Right to cancel within 3 days
            </p>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="mt-16 pt-8 border-t">
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold mb-4">
              Our Commitments to You
            </h3>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-5 h-5 text-green-600" />
                <span>Data Never Sold</span>
              </div>
              <div className="flex items-center gap-2">
                <ScaleIcon className="w-5 h-5 text-blue-600" />
                <span>Kantian Ethics Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartIcon className="w-5 h-5 text-purple-600" />
                <span>Non-Profit Organization</span>
              </div>
              <div className="flex items-center gap-2">
                <AcademicCapIcon className="w-5 h-5 text-orange-600" />
                <span>Financial Education First</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact information */}
        <footer className="mt-8 text-center text-sm text-gray-600">
          <p className="mb-2">
            Questions? Call our financial counselors at{" "}
            <span className="font-bold">1-800-ETHICAL</span> (toll-free)
          </p>
          <p>Available Mon-Fri 9am-5pm ET • Free, no-pressure advice</p>
          <p className="mt-4 text-xs">
            Licensed in all 50 states • Member FDIC • Equal Opportunity Lender
          </p>
        </footer>
      </main>
    </div>
  );
}
