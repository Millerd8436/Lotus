"use client";

import { Card } from "@/components/shared/Card";
import { BookOpen, Scale, Shield } from "lucide-react";
import React, { useState } from "react";

type Lesson = "kantian" | "dark_patterns" | "consumer_rights";

const EthicalLessons = () => {
  const [activeLesson, setActiveLesson] = useState<Lesson>("kantian");

  const lessons = {
    kantian: {
      title: "Kantian Ethics & Fair Lending",
      icon: <Scale className="w-8 h-8 text-indigo-600" />,
      content: (
        <div className="space-y-4">
          <p>
            Kantian ethics, developed by philosopher Immanuel Kant, provides a
            strong framework for ethical lending. It's based on the idea of the{" "}
            <strong>Categorical Imperative</strong>.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Universalizability:</strong> An action is only ethical if
              it can be applied as a universal law for everyone. Predatory
              lending fails this test; if everyone practiced it, the financial
              system would collapse.
            </li>
            <li>
              <strong>Treating Humans as Ends, Not Means:</strong> This
              principle states that you should never treat people merely as a
              tool (a means) to get something. Predatory loans treat borrowers
              as a means to generate profit, ignoring their well-being and
              autonomy.
            </li>
          </ul>
          <p>
            An ethical lender, guided by Kantian principles, ensures
            transparency, respects the borrower's ability to make a rational
            decision, and offers products that do not depend on the borrower's
            failure.
          </p>
        </div>
      ),
    },
    dark_patterns: {
      title: "Recognizing Dark Patterns",
      icon: <BookOpen className="w-8 h-8 text-red-600" />,
      content: (
        <div className="space-y-4">
          <p>
            Dark Patterns are tricks used in websites and apps that make you do
            things that you didn't mean to, like buying or signing up for
            something.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Urgency & Scarcity:</strong> "Limited time offer!" or
              "Only 2 left!" to pressure you into a quick decision.
            </li>
            <li>
              <strong>Confirmshaming:</strong> Guilt-tripping you into opting
              into something. E.g., "No thanks, I'd rather pay the full price."
            </li>
            <li>
              <strong>Forced Continuity:</strong> Automatically starting a
              subscription after a free trial without a clear reminder.
            </li>
            <li>
              <strong>Hidden Costs & Drip Pricing:</strong> Revealing extra
              costs only at the final step of checkout.
            </li>
          </ul>
          <p>
            Being aware of these patterns is the first step to protecting
            yourself from exploitation.
          </p>
        </div>
      ),
    },
    consumer_rights: {
      title: "Your Consumer Rights",
      icon: <Shield className="w-8 h-8 text-green-600" />,
      content: (
        <div className="space-y-4">
          <p>
            Several federal laws protect you as a borrower. Knowing your rights
            is essential.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Truth in Lending Act (TILA):</strong> Requires lenders to
              disclose all costs, including the APR and finance charges, in a
              clear and standardized way.
            </li>
            <li>
              <strong>Fair Debt Collection Practices Act (FDCPA):</strong>{" "}
              Prohibits debt collectors from using abusive, unfair, or deceptive
              practices to collect from you.
            </li>
            <li>
              <strong>Consumer Financial Protection Bureau (CFPB):</strong> A
              government agency dedicated to protecting consumers in the
              financial sector. You can file complaints and find resources on
              their website.
            </li>
          </ul>
          <p>
            You have the right to be treated fairly and to receive transparent
            information. Don't hesitate to use these resources if you feel a
            lender is acting unethically.
          </p>
        </div>
      ),
    },
  };

  return (
    <Card className="p-8">
      <h2 className="text-2xl font-bold text-center mb-8">
        Ethical Finance Lessons
      </h2>
      <div className="flex justify-center border-b mb-8">
        {Object.entries(lessons).map(([key, { title, icon }]) => (
          <button
            key={key}
            onClick={() => setActiveLesson(key as Lesson)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 ${
              activeLesson === key
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {React.cloneElement(icon, { className: "w-5 h-5" })}
            {title}
          </button>
        ))}
      </div>
      <div>{lessons[activeLesson].content}</div>
    </Card>
  );
};

export default EthicalLessons;
