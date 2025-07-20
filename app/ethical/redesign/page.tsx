"use client";

import EthicalCheckoutFlow from "@/components/ethical/EthicalCheckoutFlow";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import ModeSelector from "@/components/ui/ModeSelector";
import { CheckCircle, Shield } from "lucide-react";
import { useState } from "react";

export default function EthicalRedesignPage() {
  const [startFlow, setStartFlow] = useState(false);

  if (startFlow) {
    return (
      <EthicalCheckoutFlow
        loanAmount={500}
        onBack={() => setStartFlow(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <ModeSelector />
        <Card className="mt-8 p-6 sm:p-8 border-2 border-blue-200 bg-white shadow-lg rounded-xl">
          <div className="text-center">
            <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
              A Fairer Way to Borrow
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Welcome to our transparent and ethical loan application process.
              We're committed to your financial well-being.
            </p>
          </div>

          <div className="my-8 sm:my-10 border-t border-b border-gray-200 py-6 sm:py-8">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
              Our Commitment to You
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 text-left">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-700">
                    Full Transparency
                  </h3>
                  <p className="text-gray-600 text-sm">
                    No hidden fees or confusing terms. We show you the total
                    cost upfront, with a clear APR.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-700">
                    You're in Control
                  </h3>
                  <p className="text-gray-600 text-sm">
                    We only ask for the data we need. You control your
                    information and consent is never pre-checked.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-700">
                    Affordability First
                  </h3>
                  <p className="text-gray-600 text-sm">
                    We'll help you assess what you can comfortably afford to
                    repay, avoiding debt traps.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-700">
                    Flexible & Fair
                  </h3>
                  <p className="text-gray-600 text-sm">
                    We offer clear repayment plans and a 24-hour cooling-off
                    period. No rollovers, no surprises.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={() => setStartFlow(true)}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Start Ethical Application
            </Button>
            <p className="text-xs text-gray-500 mt-4">
              By proceeding, you acknowledge our commitment to a fair process.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
