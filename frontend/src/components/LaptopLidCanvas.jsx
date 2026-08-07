import React from 'react';

export default function LaptopLidCanvas({ completedModules, modules }) {
  return (
    <div className="bg-[#1E2022] rounded-3xl p-6 border-4 border-[#1E1E24] shadow-[10px_10px_0px_0px_#1E1E24] my-8 text-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xs uppercase font-black tracking-widest text-[#E63946]">Student Laptop Lid</h2>
          <p className="text-lg font-bold">{completedModules.length} of {modules.length} Stickers Peeled & Placed</p>
        </div>
        <div className="bg-[#E63946] text-white text-xs font-black px-3 py-1 rounded-full border border-white">
          LID SYNCED
        </div>
      </div>

      {/* Grid Canvas representing sticker placement on laptop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#2B2D42] p-6 rounded-2xl border-2 border-dashed border-gray-600 min-h-[220px]">
        {modules.map((mod) => {
          const isPeeled = completedModules.includes(mod.id);
          return (
            <div
              key={mod.id}
              className={`relative rounded-xl p-4 border-2 transition-all flex flex-col justify-between h-28 ${
                isPeeled
                  ? 'bg-[#E63946] border-white shadow-[4px_4px_0px_0px_#FFFDF6] transform rotate-[-2deg] hover:rotate-0'
                  : 'bg-[#1E2022]/50 border-gray-700 opacity-40'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="font-black text-xs">{mod.id}</span>
                {isPeeled ? (
                  <span className="text-xs bg-white text-[#E63946] font-bold px-1.5 py-0.5 rounded">PEELED</span>
                ) : (
                  <span className="text-xs text-gray-400">LOCKED</span>
                )}
              </div>
              <p className="font-bold text-xs leading-tight">{mod.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}