import quizData from "@/data/quiz_bank.json";
import React, { useState } from "react";

// Define types based on the JSON structure
interface EthicsQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
  difficulty: string;
}

const ethicalConcepts: EthicsQuestion[] = quizData.ethics_quiz.filter(
  (q) => q.category === "philosophy"
);

const EthicalFrameworksExplainer: React.FC = () => {
  const [selectedConcept, setSelectedConcept] = useState<EthicsQuestion | null>(
    null
  );

  const handleConceptClick = (concept: EthicsQuestion) => {
    setSelectedConcept(concept);
  };

  const handleClose = () => {
    setSelectedConcept(null);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg my-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Ethical Frameworks Analysis
      </h3>
      <p className="text-gray-600 mb-6">
        Let's analyze the simulated experience through the lens of established
        ethical frameworks. These concepts help explain *why* certain lending
        practices are considered harmful.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {ethicalConcepts.map((concept) => (
          <div
            key={concept.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-purple-500"
            onClick={() => handleConceptClick(concept)}
          >
            <h4 className="font-bold text-lg text-purple-800">
              {concept.options[concept.correct]}
            </h4>
            <p className="text-sm text-gray-600 mt-2">{concept.question}</p>
          </div>
        ))}
      </div>

      {selectedConcept && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <div
            className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedConcept.options[selectedConcept.correct]}
            </h3>
            <p className="text-gray-600 mb-4">
              <strong>Core Question:</strong> {selectedConcept.question}
            </p>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-gray-800">
                <strong>Explanation:</strong> {selectedConcept.explanation}
              </p>
            </div>
            <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-300">
              <p className="text-sm text-yellow-800">
                <strong>Connection to Your Experience:</strong> In the
                simulation, the lender treated you as a 'means to an end'
                (profit) by using deceptive patterns and hiding fees, rather
                than as an 'end in yourself' (a person deserving of dignity and
                transparent information).
              </p>
            </div>
            <button
              onClick={handleClose}
              className="mt-6 w-full bg-purple-600 text-white font-bold py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EthicalFrameworksExplainer;
