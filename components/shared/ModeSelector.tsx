"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const ModeSelector: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const getPhase = () => {
    if (pathname.startsWith("/ethical")) return 4;
    if (pathname.startsWith("/teaching")) return 3;
    if (pathname.startsWith("/reflection")) return 2;
    return 1;
  };

  const currentPhase = getPhase();

  const phases = [
    { id: 1, label: "Phase 1: Exploitative", path: "/" },
    { id: 2, label: "Phase 2: Reflection", path: "/reflection" },
    { id: 3, label: "Phase 3: Teaching", path: "/teaching" },
    { id: 4, label: "Phase 4: Ethical", path: "/ethical" },
  ];

  const handleModeChange = (path: string) => {
    if (pathname === path) return;
    setIsTransitioning(true);
    setTimeout(() => {
      router.push(path);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <nav className="fixed top-16 left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-md shadow-lg rounded-full z-40 p-2 border">
      {isTransitioning && (
        <div className="absolute inset-0 bg-white/50 rounded-full animate-pulse"></div>
      )}
      <ul className="flex items-center space-x-2">
        {phases.map((phase) => (
          <li key={phase.id}>
            <button
              onClick={() => handleModeChange(phase.path)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                currentPhase === phase.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-transparent text-gray-600 hover:bg-gray-200"
              }`}
            >
              {phase.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ModeSelector;
