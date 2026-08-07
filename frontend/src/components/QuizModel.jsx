import React, { useState } from 'react';

const QUIZ_DATA = {
  "01": [
    { difficulty: 1, question: "What is 1/4 + 2/4?", options: ["3/4", "1/2", "3/8", "2/4"], answer: "3/4" },
    { difficulty: 2, question: "What is 2/3 + 1/6?", options: ["5/6", "3/9", "3/6", "4/6"], answer: "5/6" }
  ],
  "06": [
    { difficulty: 1, question: "What is the determinant of a 2x2 identity matrix?", options: ["1", "0", "2", "-1"], answer: "1" },
    { difficulty: 2, question: "If A is a 3x3 matrix and det(A) = 4, what is det(2A)?", options: ["32", "8", "16", "24"], answer: "32" }
  ]
};

export default function QuizModal({ module, onClose, onComplete }) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const questions = QUIZ_DATA[module.id] || [
    { difficulty: 1, question: `Solve the foundational challenge for ${module.title}`, options: ["Option A (Correct)", "Option B", "Option C", "Option D"], answer: "Option A (Correct)" }
  ];

  const currentQuestion = questions[currentLevel] || questions[0];

  const handleSubmit = () => {
    if (selectedOption === currentQuestion.answer) {
      setIsCorrect(true);
      setTimeout(() => {
        if (currentLevel + 1 < questions.length) {
          setCurrentLevel(currentLevel + 1);
          setSelectedOption(null);
          setIsCorrect(null);
        } else {
          onComplete(module.id);
          onClose();
        }
      }, 1000);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#FFFDF6] border-4 border-[#1E1E24] rounded-2xl p-6 max-w-md w-full shadow-[8px_8px_0px_0px_#1E1E24]">
        <div className="flex justify-between items-center mb-4">
          <span className="bg-[#E63946] text-white px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider">
            Module {module.id} • IRT Level {currentQuestion.difficulty}
          </span>
          <button onClick={onClose} className="font-bold text-xl text-[#1E1E24] hover:opacity-70">✕</button>
        </div>

        <h3 className="text-xl font-black text-[#1E1E24] mb-2">{module.title}</h3>
        <p className="text-sm text-gray-700 mb-6">{currentQuestion.question}</p>

        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedOption(opt)}
              className={`w-full text-left p-3 rounded-xl border-2 font-semibold transition-all ${
                selectedOption === opt 
                  ? 'border-[#1E1E24] bg-[#FFE066] shadow-[3px_3px_0px_0px_#1E1E24]' 
                  : 'border-gray-300 hover:border-[#1E1E24] bg-white'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {isCorrect !== null && (
          <div className={`p-3 rounded-xl mb-4 font-bold text-center text-sm ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {isCorrect ? "Correct! Adapting difficulty..." : "Incorrect. Try again!"}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!selectedOption}
          className="w-full bg-[#E63946] text-white font-black py-3 rounded-xl border-2 border-[#1E1E24] shadow-[4px_4px_0px_0px_#1E1E24] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50"
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
}