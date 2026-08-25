"use client";

import { useEffect, useState } from "react";

export default function IntroScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    // Remove component after 3.5 seconds (fade animation completes)
    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 3500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <section 
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-[#171717] transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#171717] via-[#2A2A2A] to-[#171717]" />
        
        <video
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          poster=""
        >
          <source src="/videos/intro-bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content — Centered */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 w-full text-center">
        <div className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 mb-5 sm:mb-8 text-[10px] sm:text-xs font-medium tracking-[0.15em] uppercase bg-white/10 text-white/60 rounded-full backdrop-blur-sm border border-white/10">
          AM:PM
        </div>
        
        {/* Centered hero heading */}
        <h1 className="hero-heading text-white text-center">
          Skincare for your
          <br />
          <span className="text-[#E85D2C]">morning</span> &{' '}
          <span className="text-[#E85D2C]">night</span>.
        </h1>

        <div className="mt-6 sm:mt-8 flex justify-center">
          <div className="flex items-center gap-2 text-white/40 text-[10px] sm:text-sm tracking-widest uppercase">
            <span className="w-8 sm:w-12 h-px bg-white/20" />
            <span>Experience</span>
            <span className="w-8 sm:w-12 h-px bg-white/20" />
          </div>
        </div>
      </div>
    </section>
  );
}