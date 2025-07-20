"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  BookOpenIcon,
  DocumentTextIcon,
  FilmIcon,
  LinkIcon,
  ScaleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EthicalResourcesPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    {
      id: "all",
      label: "All Resources",
      icon: <BookOpenIcon className="w-5 h-5" />,
    },
    {
      id: "legal",
      label: "Legal Rights",
      icon: <ScaleIcon className="w-5 h-5" />,
    },
    {
      id: "education",
      label: "Financial Education",
      icon: <DocumentTextIcon className="w-5 h-5" />,
    },
    { id: "videos", label: "Videos", icon: <FilmIcon className="w-5 h-5" /> },
    {
      id: "tools",
      label: "Tools & Calculators",
      icon: <LinkIcon className="w-5 h-5" />,
    },
  ];

  const resources = [
    {
      category: "legal",
      title: "Know Your Rights: Payday Lending Laws",
      type: "Guide",
      source: "Consumer Financial Protection Bureau",
      description:
        "Comprehensive guide to federal and state payday lending regulations",
      link: "consumerfinance.gov/payday-loans",
      keyPoints: [
        "State APR caps and regulations",
        "Your rights when dealing with lenders",
        "How to file complaints",
        "Illegal collection practices",
      ],
    },
    {
      category: "legal",
      title: "Fair Debt Collection Practices Act (FDCPA)",
      type: "Legal Document",
      source: "Federal Trade Commission",
      description: "Your federal rights against abusive debt collection",
      link: "ftc.gov/fdcpa",
      keyPoints: [
        "Harassment is illegal",
        "Time restrictions on calls",
        "Right to verification",
        "Cease communication rights",
      ],
    },
    {
      category: "education",
      title: "Breaking the Debt Cycle",
      type: "Course",
      source: "National Endowment for Financial Education",
      description: "Free online course on escaping predatory debt",
      link: "smartaboutmoney.org",
      keyPoints: [
        "Understanding debt traps",
        "Building emergency funds",
        "Credit improvement strategies",
        "Budgeting fundamentals",
      ],
    },
    {
      category: "education",
      title: "Payday Loans: The Real Cost",
      type: "Research Report",
      source: "Pew Charitable Trusts",
      description: "Data-driven analysis of payday lending impact",
      link: "pewtrusts.org/payday-lending",
      keyPoints: [
        "Average borrower in debt 5 months/year",
        "69% use loans for recurring expenses",
        "$9 billion in fees annually",
        "Alternatives save 75% on costs",
      ],
    },
    {
      category: "videos",
      title: "Last Week Tonight: Predatory Lending",
      type: "Educational Video",
      source: "HBO / John Oliver",
      description: "Accessible explanation of predatory lending practices",
      duration: "16 minutes",
      keyPoints: [
        "Industry tactics exposed",
        "Real borrower stories",
        "Regulatory loopholes",
        "Humor makes it digestible",
      ],
    },
    {
      category: "videos",
      title: "How to Escape the Payday Loan Trap",
      type: "Tutorial",
      source: "Consumer Reports",
      description: "Step-by-step guide to breaking free",
      duration: "8 minutes",
      keyPoints: [
        "Payment prioritization",
        "Negotiation strategies",
        "Alternative resources",
        "Success stories",
      ],
    },
    {
      category: "tools",
      title: "True Cost Calculator",
      type: "Interactive Tool",
      source: "CFPB",
      description: "Calculate the real APR and total cost of any loan",
      link: "consumerfinance.gov/calculator",
      keyPoints: [
        "Compare loan options",
        "See true APR",
        "Total repayment amounts",
        "Payment schedules",
      ],
    },
    {
      category: "tools",
      title: "Budget Worksheet Generator",
      type: "Planning Tool",
      source: "FDIC Money Smart",
      description: "Create a personalized budget plan",
      link: "fdic.gov/moneysmart",
      keyPoints: [
        "Track income/expenses",
        "Identify savings opportunities",
        "Set financial goals",
        "Free and printable",
      ],
    },
  ];

  const filteredResources =
    activeCategory === "all"
      ? resources
      : resources.filter((r) => r.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-green-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheckIcon className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">Educational Resources</h1>
                <p className="text-green-100">Knowledge is your best defense</p>
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
        {/* Key Message */}
        <Card className="mb-8 p-6 bg-yellow-50 border-yellow-200">
          <h2 className="text-lg font-semibold text-yellow-900 mb-2">
            Why These Resources Matter
          </h2>
          <p className="text-yellow-800">
            Predatory lenders rely on borrowers not knowing their rights or
            alternatives. These resources from trusted sources will help you
            make informed decisions and avoid debt traps. Knowledge truly is
            power when it comes to your financial well-being.
          </p>
        </Card>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "primary" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat.id)}
                className={activeCategory === cat.id ? "bg-green-600" : ""}
              >
                <span className="flex items-center gap-2">
                  {cat.icon}
                  {cat.label}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {filteredResources.map((resource, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold">{resource.title}</h3>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    {resource.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{resource.source}</p>
                <p className="text-gray-700 mb-4">{resource.description}</p>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Key Points:
                </h4>
                <ul className="space-y-1">
                  {resource.keyPoints.map((point, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-600 flex items-start"
                    >
                      <span className="text-green-500 mr-2">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-4 flex items-center justify-between">
                {resource.link && (
                  <a
                    href={`https://${resource.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
                  >
                    <LinkIcon className="w-4 h-4" />
                    Visit Resource
                  </a>
                )}
                {resource.duration && (
                  <span className="text-sm text-gray-500">
                    Duration: {resource.duration}
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Help Section */}
        <Card className="p-8 bg-gradient-to-r from-blue-50 to-green-50">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Need More Personalized Help?
          </h2>
          <p className="text-gray-700 mb-6 text-center max-w-2xl mx-auto">
            These resources are just the beginning. For personalized assistance
            with your specific situation, consider reaching out to a certified
            financial counselor who can provide free, one-on-one guidance.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => router.push("/ethical/counseling")}
            >
              Find a Counselor
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
