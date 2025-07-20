"use client";

import WebsitePhase from "@/components/WebsitePhase";
import { useSimulation } from "@/components/providers/SimulationProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useRouter } from "next/navigation";

export default function EthicalCompletePage() {
  const router = useRouter();
  const { session } = useSimulation();

  const loanData = session.ethicalData || {
    principal: 300,
    total: 307.4,
    termDays: 30,
  };

  const philosophicalQuotes = [
    {
      author: "Immanuel Kant",
      quote:
        "Act so that you treat humanity, whether in your own person or in that of another, always as an end and never as a means only.",
      principle: "Respect for Persons",
      application:
        "Throughout this process, you were treated with dignity. No manipulation or pressure was used. Your autonomy was respected at every step.",
      icon: "🤝",
    },
    {
      author: "John Stuart Mill",
      quote:
        "The only purpose for which power can be rightfully exercised over any member of a civilized community, against his will, is to prevent harm to others.",
      principle: "Harm Principle",
      application:
        "The loan was structured to minimize harm. Lower rates, longer terms, and affordability checks all work to prevent financial damage.",
      icon: "🛡️",
    },
    {
      author: "John Rawls",
      quote:
        "Each person has an equal claim to a fully adequate scheme of equal basic liberties, compatible with the same scheme for all.",
      principle: "Justice as Fairness",
      application:
        "These ethical terms are offered equally to everyone. No discrimination, no special rates based on desperation, just fair treatment for all.",
      icon: "⚖️",
    },
  ];

  return (
    <WebsitePhase phase={4}>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Success confirmation */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <span className="text-4xl">✓</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Application Complete
            </h1>
            <p className="text-lg text-gray-700">
              Your ethical loan has been processed with full transparency
            </p>
          </div>

          {/* Loan summary */}
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Your Loan Summary</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Amount Borrowed</p>
                <p className="text-lg font-semibold">${loanData.principal}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total to Repay</p>
                <p className="text-lg font-semibold">${loanData.total}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Due Date</p>
                <p className="text-lg font-semibold">
                  {new Date(
                    Date.now() + loanData.termDays * 24 * 60 * 60 * 1000
                  ).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Your Rights</p>
                <p className="text-lg font-semibold">24-hour cancellation</p>
              </div>
            </div>
          </Card>

          {/* Philosophical debrief */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-center mb-6">
              Ethical Principles in Action
            </h2>
            <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
              This lending experience was guided by foundational ethical
              principles. Here's how philosophy shaped your loan:
            </p>

            <div className="space-y-6">
              {philosophicalQuotes.map((item, index) => (
                <Card key={index} className="p-6">
                  <div className="flex gap-4">
                    <div className="text-4xl">{item.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">
                        {item.principle} - {item.author}
                      </h3>
                      <blockquote className="italic text-gray-700 mb-3 pl-4 border-l-4 border-gray-300">
                        "{item.quote}"
                      </blockquote>
                      <p className="text-sm text-gray-600">
                        <strong>How this applied to your loan:</strong>{" "}
                        {item.application}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Resources and next steps */}
          <Card className="p-6 mb-8 bg-blue-50">
            <h3 className="font-bold mb-4">Financial Wellness Resources</h3>
            <p className="text-sm text-gray-700 mb-4">
              Your loan includes access to these free resources:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="mr-2">📚</span>
                Personal budgeting workshop (online)
              </li>
              <li className="flex items-center">
                <span className="mr-2">💰</span>
                Debt reduction strategies guide
              </li>
              <li className="flex items-center">
                <span className="mr-2">📊</span>
                Credit building roadmap
              </li>
              <li className="flex items-center">
                <span className="mr-2">🤝</span>
                1-on-1 financial counseling session
              </li>
            </ul>
          </Card>

          {/* Important notices */}
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 mb-8">
            <h3 className="font-bold mb-3">Important Information</h3>
            <ul className="space-y-2 text-sm">
              <li>• You can cancel this loan within 24 hours at no cost</li>
              <li>• No automatic renewals - the loan ends when you repay</li>
              <li>• Your information will never be sold to third parties</li>
              <li>
                • If you face difficulties, contact us for support options
              </li>
            </ul>
          </div>

          {/* Final reflection */}
          <div className="text-center mb-8">
            <p className="text-lg text-gray-700 mb-6">
              This is how lending should work: transparent, fair, and
              respectful.
            </p>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Compare this experience to typical payday lending. Notice the
              difference when ethics guide business practices. You deserve this
              level of respect in all financial services.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => router.push("/")}
            >
              Return to Home
            </Button>
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={() => router.push("/reflection")}
            >
              Compare Experiences →
            </Button>
          </div>

          {/* Contact footer */}
          <footer className="mt-12 pt-8 border-t text-center text-sm text-gray-600">
            <p className="mb-2">
              <strong>Need help?</strong> Call 1-800-ETHICAL (toll-free)
            </p>
            <p>
              Email: support@ethicallending.org | Available Mon-Fri 9am-5pm ET
            </p>
            <p className="mt-4 text-xs">
              Transaction ID: ETH-
              {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
          </footer>
        </div>
      </div>
    </WebsitePhase>
  );
}
