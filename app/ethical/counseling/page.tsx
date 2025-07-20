"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  AcademicCapIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function EthicalCounselingPage() {
  const router = useRouter();

  const counselingOptions = [
    {
      icon: <ChatBubbleLeftRightIcon className="w-8 h-8" />,
      title: "Free Financial Counseling",
      provider: "National Foundation for Credit Counseling",
      description: "Get free, confidential advice from certified counselors",
      contact: "1-800-388-2227",
      website: "nfcc.org",
      services: [
        "Budget planning assistance",
        "Debt management plans",
        "Credit report review",
        "Financial education",
      ],
    },
    {
      icon: <BuildingLibraryIcon className="w-8 h-8" />,
      title: "Credit Union Alternatives",
      provider: "Local Credit Unions",
      description: "Member-owned financial cooperatives offering fair loans",
      contact: "Find local: mycreditunion.gov",
      website: "ncua.gov",
      services: [
        "Payday Alternative Loans (PALs)",
        "Small dollar loans",
        "Financial coaching",
        "Savings programs",
      ],
    },
    {
      icon: <BanknotesIcon className="w-8 h-8" />,
      title: "Emergency Assistance Programs",
      provider: "211 Helpline",
      description: "Connect with local emergency financial assistance",
      contact: "Dial 211",
      website: "211.org",
      services: [
        "Utility bill assistance",
        "Food banks",
        "Rent assistance",
        "Medical bill help",
      ],
    },
    {
      icon: <HeartIcon className="w-8 h-8" />,
      title: "Nonprofit Lenders",
      provider: "Capital Good Fund & Others",
      description: "Mission-driven lenders with fair terms",
      contact: "Various providers",
      website: "capitalgoodfund.org",
      services: [
        "Small dollar loans at 5-24% APR",
        "No debt traps",
        "Financial coaching included",
        "Credit building",
      ],
    },
  ];

  const actionSteps = [
    {
      step: 1,
      title: "Assess Your Situation",
      description: "List all income, expenses, and debts",
      action: "Use our budget calculator",
    },
    {
      step: 2,
      title: "Explore Alternatives",
      description: "Check credit unions, nonprofits, and assistance programs",
      action: "Call 211 for local resources",
    },
    {
      step: 3,
      title: "Build Emergency Savings",
      description: "Start with $5-10 per week if possible",
      action: "Open a savings account",
    },
    {
      step: 4,
      title: "Improve Your Credit",
      description: "Pay bills on time, reduce balances",
      action: "Get free credit report",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-green-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheckIcon className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">
                  Financial Counseling & Resources
                </h1>
                <p className="text-green-100">
                  Free help is available - you're not alone
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-green-600"
              onClick={() => router.push("/ethical")}
            >
              Back to Overview
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Emergency Notice */}
        <Card className="mb-8 p-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <AcademicCapIcon className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-blue-900 mb-2">
                Before Taking Any Loan
              </h2>
              <p className="text-blue-800">
                Always explore these free resources first. Many people don't
                know about these alternatives to predatory loans. Financial
                counselors can often find solutions you haven't considered.
              </p>
            </div>
          </div>
        </Card>

        {/* Counseling Options */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Free Counseling Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {counselingOptions.map((option, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="text-green-600">{option.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">
                      {option.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {option.provider}
                    </p>
                    <p className="text-gray-700 mb-3">{option.description}</p>

                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-900">
                        Services:
                      </p>
                      <ul className="text-sm text-gray-600 ml-4 mt-1">
                        {option.services.map((service, idx) => (
                          <li key={idx} className="list-disc">
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t pt-3 mt-3">
                      <p className="text-sm">
                        <span className="font-medium">Contact:</span>{" "}
                        {option.contact}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Website:</span>{" "}
                        <span className="text-green-600">{option.website}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Action Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Your Action Plan</h2>
          <div className="space-y-4">
            {actionSteps.map((item) => (
              <Card key={item.step} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">
                      {item.step}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    {item.action}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <Card className="p-8 bg-gradient-to-r from-green-50 to-blue-50 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Take Control?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Financial freedom starts with one phone call. These counselors have
            helped millions of people escape predatory debt. Your consultation
            is free and confidential.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => window.open("tel:1-800-388-2227")}
            >
              Call NFCC Now: 1-800-388-2227
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push("/ethical/application")}
            >
              Return to Application
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
