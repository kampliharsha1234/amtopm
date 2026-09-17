"use client";

import { useEffect, useState } from "react";
import { products } from "../data/products";

const homepageImages = [
  "/images/orangehero.PNG",
  "/images/doctors-review/dr%20anand%20patil.PNG",
  "/images/acne-concern.png",
  "/images/darkspot-concern.png",
  "/images/spf-concern.png",
  "/images/barrier-concern.png",
  "/images/before-after/before%20after%20(1).jpeg",
  "/images/before-after/before%20after%20(2).jpeg",
  "/images/before-after/before%20after%20(3).jpeg",
  "/images/before-after/before%20after%20(4).jpeg",
  "/images/doctors-review/Dr%20Shloka%20Mehta.jpeg",
  "/images/doctors-review/Dr%20Ramesh%20Gaurav.jpeg",
  "/images/doctors-review/Dr%20R%20Sharma.jpeg",
  "/images/labelled.PNG",
  "/images/certificates/iso.svg",
  "/images/certificates/fda.jpg",
  "/images/certificates/gmp.avif",
  "/images/certificates/leaping-bunny.png",
  "/images/certificates/who.svg",
];

const homepageVideos = ["/videos/skinschool.mp4"];

export default function IntroScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const imagePreloaders = [
      ...homepageImages,
      ...products.map((product) => product.image),
    ].map((src) => {
      const image = new window.Image();
      image.src = src;
      return image;
    });

    const videoPreloaders = homepageVideos.map((src) => {
      const video = document.createElement("video");
      video.preload = "auto";
      video.src = src;
      video.load();
      return video;
    });

    // Start fade out after 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    // Remove component after 3.5 seconds
    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 3500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      imagePreloaders.forEach((image) => {
        image.src = "";
      });
      videoPreloaders.forEach((video) => {
        video.pause();
        video.removeAttribute("src");
        video.load();
      });
    };
  }, []);

  if (!visible) return null;

  return (
    <section
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-[#171717] transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#171717] via-[#2A2A2A] to-[#171717]" />
        <div className="absolute inset-0 bg-black/70" />
      </div>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-4xl
          px-5
          text-center
          sm:px-8
        "
      >

        {/* =================================================
            BRAND
        ================================================= */}

        <div
          className="
            mb-6
            inline-block
            rounded-full
            border
            border-white/10
            bg-white/10
            px-4
            py-1.5
            text-[10px]
            font-medium
            lowercase
            tracking-[0.18em]
            text-white/70
            backdrop-blur-sm
            sm:mb-8
            sm:px-5
            sm:py-2
            sm:text-xs
          "
        >
          amtopm
        </div>


        {/* =================================================
            MAIN HEADING
        ================================================= */}

        <h1
          className="
            hero-heading
            text-center
            text-white
          "
        >
          Fear-free skin
          <br />
          <span className="text-[#E85D2C]">
            solutions.
          </span>
        </h1>


        {/* =================================================
            BOTTOM LINE
        ================================================= */}

        <div className="mt-8 flex justify-center sm:mt-10">
          <div
            className="
              flex
              items-center
              gap-2
              text-[9px]
              uppercase
              tracking-[0.22em]
              text-white/40
              sm:gap-3
              sm:text-[11px]
              sm:tracking-[0.25em]
            "
          >
            <span className="h-px w-7 bg-white/20 sm:w-12" />

            <span>
              Understand · Care · Repeat
            </span>

            <span className="h-px w-7 bg-white/20 sm:w-12" />
          </div>
        </div>

      </div>
    </section>
  );
}