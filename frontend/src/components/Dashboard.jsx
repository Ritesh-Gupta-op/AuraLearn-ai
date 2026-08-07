import React, { useState } from 'react';
import QuizModal from './QuizModal';
import LaptopLidCanvas from './LaptopLidCanvas';

const MODULES = [
  { id: "01", title: "Fraction Addition", duration: "45m" },
  { id: "02", title: "Quadratic Equations", duration: "1h 15m" },
  { id: "03", title: "Calculus Derivatives", duration: "1h 30m" },
  { id: "04", title: "Basic Counting", duration: "30m" },
  { id: "05", title: "Pythagorean Theorem", duration: "1h 00m" },
  { id: "06", title: "Matrix Algebra", duration: "1h 45m" },
  { id: "07", title: "Probability Theory", duration: "1h 15m" },
  { id: "08", title: "Mastery Synthesis", duration: "2h 00m" }
];

export default function Dashboard() {
  const [completedModules, setCompletedModules] = useState(["01"]); // Default 1st module unlocked
  const [activeModule, setActiveModule] = useState(null);

  const handleModuleComplete = (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7EBE8] text-[#1E1E24] p-6 md:p-12 font-sans">
      {/* Header */}
      <header className="max-w-5xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
          <span className="bg-[#E63946] text-white p-2 rounded-xl border-2 border-[#1E1E24]">K</span>
          Kiss-Cut Curriculum
        </h1>
        <div className="flex gap-3">
          <button className="bg-white border-2 border-[#1E1E24] px-4 py-2 rounded-xl font-bold text-xs shadow-[3px_3px_0px_0px_#1E1E24]">
            Student Quiz PWA
          </button>
          <button className="bg-[#E63946] text-white border-2 border-[#1E1E24] px-5 py-2 rounded-xl font-black text-xs shadow-[3px_3px_0px_0px_#1E1E24]">
            ENROLL NOW
          </button>
        </div>
      </header>

      {/* Hero / Dashboard Title */}
      <main className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black uppercase tracking-tight mb-2">Your Sheet: Eight Modules</h2>
          <p className="text-gray-700 font-medium text-sm">
            Checkboard kiss-cut die-cut set. Click any sticker module to solve adaptive IRT challenges & peel!
          </p>
        </div>

        {/* 8-Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {MODULES.map((mod) => {
            const isCompleted = completedModules.includes(mod.id);
            return (
              <div
                key={mod.id}
                onClick={() => setActiveModule(mod)}
                className={`relative group cursor-pointer rounded-2xl p-5 border-4 border-[#1E1E24] transition-all duration-300 select-none ${
                  isCompleted 
                    ? 'bg-[#E63946] text-white shadow-[6px_6px_0px_0px_#1E1E24]' 
                    : 'bg-[#FFFDF6] text-[#1E1E24] hover:-translate-y-1 shadow-[6px_6px_0px_0px_#1E1E24]'
                }`}
              >
                {/* Sticker Corner Peel Effect */}
                <div className={`absolute top-0 right-0 w-8 h-8 transition-transform ${isCompleted ? 'bg-white/20' : 'bg-gray-200'} rounded-bl-xl border-b-2 border-l-2 border-[#1E1E24] group-hover:scale-125`} />

                <div className="flex justify-between items-start mb-8">
                  <span className="text-2xl font-black">{mod.id}</span>
                </div>

                <div className="mt-4">
                  <h3 className="font-black text-base leading-snug mb-1">{mod.title}</h3>
                  <span className={`text-xs font-bold ${isCompleted ? 'text-white/80' : 'text-gray-500'}`}>
                    {mod.duration}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Laptop Lid Canvas */}
        <LaptopLidCanvas completedModules={completedModules} modules={MODULES} />
      </main>

      {/* Quiz Modal */}
      {activeModule && (
        <QuizModal
          module={activeModule}
          onClose={() => setActiveModule(null)}
          onComplete={handleModuleComplete}
        />
      )}
    </div>
  );
}