"use client";
import React from "react";
import Image from "next/image";

const HomeAuraLoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#CBE3C0] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 aura-overlay pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <Image
          src="/images/loading-screen-background.png"
          alt=""
          fill
          className="object-conatin opacity-5"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center gap-3 sm:gap-4">
        <div className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32">
          <svg
            className="absolute inset-0 w-full h-full aura-ring-spin-reverse"
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle
              cx="50"
              cy="50"
              r="43"
              stroke="url(#ringGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="50 220"
            />
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="##34B23D" />
                <stop offset="50%" stopColor="#164C1A" />
                <stop offset="100%" stopColor="#34B23D" />
              </linearGradient>
            </defs>
          </svg>
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden">
            <Image
              src="/images/ai-garden-loading-screen.png"
              alt="Home-Aura"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <p className="text-[#164C1A] text-base sm:text-lg md:text-xl font-bold">
          Designing your Garden…
        </p>
      </div>

      <p className="absolute bottom-6 sm:bottom-8 text-[#164C1A] text-[14px] sm:text-[18px] text-center px-4 font-regular">
        Don't close app or lock device until finished.
      </p>
    </div>
  );
};

export default HomeAuraLoadingScreen;
