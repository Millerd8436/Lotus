// components/ethical/CoolingOffNotice.tsx
"use client";

import React from "react";

const CoolingOffNotice: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl mx-auto my-12 text-center border-t-8 border-blue-500">
      <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-blue-100 mb-6">
        <svg
          className="h-12 w-12 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
        Your Application is Paused for Reflection
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        To ensure you make the best decision for your financial health, we've
        initiated a <strong>24-hour cooling-off period</strong>.
      </p>
      <div className="bg-gray-50 p-6 rounded-lg text-left">
        <h3 className="font-bold text-gray-800 mb-3">What Happens Next?</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">✅</span>
            <span>
              Your application is saved and pre-approved. No need to re-apply.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">📧</span>
            <span>
              You will receive an email in 24 hours with a secure link to
              finalize your loan.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">🤔</span>
            <span>
              Use this time to review your budget and be certain this loan is
              right for you. There is no obligation.
            </span>
          </li>
        </ul>
      </div>
      <p className="mt-6 text-sm text-gray-500">
        We believe in responsible lending. This pause is designed to protect you
        from impulsive decisions.
      </p>
    </div>
  );
};

export default CoolingOffNotice;
