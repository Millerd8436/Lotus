"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { PieChart, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";

const FinancialSelfAssessment = () => {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [savings, setSavings] = useState("");
  const [debt, setDebt] = useState("");
  const [score, setScore] = useState<number | null>(null);

  const calculateScore = () => {
    const numericIncome = parseFloat(income);
    const numericExpenses = parseFloat(expenses);
    const numericSavings = parseFloat(savings);
    const numericDebt = parseFloat(debt);

    if (isNaN(numericIncome) || isNaN(numericExpenses)) {
      alert("Please enter valid income and expenses.");
      return;
    }

    let currentScore = 50;
    const disposableIncome = numericIncome - numericExpenses;

    // Adjust score based on disposable income
    if (disposableIncome > 0) {
      currentScore += Math.min(25, (disposableIncome / numericIncome) * 50);
    } else {
      currentScore -= 25;
    }

    // Adjust score based on savings
    if (!isNaN(numericSavings)) {
      currentScore += Math.min(25, (numericSavings / numericIncome) * 50);
    }

    // Adjust score based on debt
    if (!isNaN(numericDebt) && numericDebt > 0) {
      currentScore -= Math.min(25, (numericDebt / numericIncome) * 50);
    }

    setScore(Math.round(Math.max(0, Math.min(100, currentScore))));
  };

  const getScoreFeedback = () => {
    if (score === null) return null;
    if (score >= 75) {
      return {
        title: "Excellent Financial Health",
        message:
          "You have a strong handle on your finances. A loan may not be necessary. Consider using your savings or other low-cost options.",
        icon: <TrendingUp className="w-12 h-12 text-green-600" />,
      };
    }
    if (score >= 50) {
      return {
        title: "Good Financial Standing",
        message:
          "You are managing your finances well, but be cautious. A loan could strain your budget. Explore alternatives first.",
        icon: <PieChart className="w-12 h-12 text-blue-600" />,
      };
    }
    return {
      title: "Area for Improvement",
      message:
        "Your finances may be tight. A loan could be risky and lead to a debt cycle. We strongly recommend seeking free financial counseling.",
      icon: <TrendingDown className="w-12 h-12 text-red-600" />,
    };
  };

  const feedback = getScoreFeedback();

  return (
    <Card className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        Financial Health Check-Up
      </h2>
      {!score ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Monthly Income (after taxes)
            </label>
            <Input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="e.g., 3000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Monthly Essential Expenses (rent, bills, food)
            </label>
            <Input
              type="number"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              placeholder="e.g., 2500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Savings (optional)
            </label>
            <Input
              type="number"
              value={savings}
              onChange={(e) => setSavings(e.target.value)}
              placeholder="e.g., 1000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Outstanding Debt (optional, e.g., credit cards)
            </label>
            <Input
              type="number"
              value={debt}
              onChange={(e) => setDebt(e.target.value)}
              placeholder="e.g., 5000"
            />
          </div>
          <Button onClick={calculateScore} className="w-full">
            Assess My Financial Health
          </Button>
        </div>
      ) : (
        <div className="text-center">
          <div className="mb-4">{feedback?.icon}</div>
          <h3 className="text-xl font-bold mb-2">{feedback?.title}</h3>
          <p className="text-gray-600 mb-4">{feedback?.message}</p>
          <div className="text-5xl font-bold my-4">{score}/100</div>
          <Button onClick={() => setScore(null)} variant="outline">
            Recalculate
          </Button>
        </div>
      )}
    </Card>
  );
};

export default FinancialSelfAssessment;
