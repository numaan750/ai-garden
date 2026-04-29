"use client";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import { altFromSrcOrAlt } from "@/lib/altText";
import Link from "next/link";
import { FaApple } from "react-icons/fa";

const SoulmateArt = ({ soulmateArt, country }) => {
  const pathname = usePathname();
  const ratingCount = soulmateArt?.ratingCount ?? 137;

  const imageSrc =
    soulmateArt?.img ||
    soulmateArt?.features?.[0]?.image ||
    "/home-images/Discover-Everything-in-Soulmate-Art.webp";

  const imageAlt = altFromSrcOrAlt({
    alt: soulmateArt?.alt || soulmateArt?.features?.[0]?.alt,
    src: imageSrc,
    locale: country,
  });

  const text1 = soulmateArt?.text1 ?? "User Satisfaction";
  const text2 = soulmateArt?.text2 ?? "Rating out of 5";

  return (
    <div id="apps" className="bg-white text-[#1E1E1E] ">
      <div className="mycontainer py-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <h2 className="text-[24px] sm:text-[30px] md:text-[45px] font-bold leading-tight">
              {soulmateArt?.title ?? "Discover Everything in Soulmate Art"}
            </h2>

            <p className="text-[#1E1E1E] text-[16px] sm:text-[18px] max-w-md">
              {soulmateArt?.description}
            </p>

            <div className="flex gap-4 flex-wrap">
              <Link
                href="https://apps.apple.com/us/app/ai-garden-my-landscape-design/id6753977398"
                target="_blank"
              >
                <button className="relative w-full px-5 py-2.5 bg-white cursor-pointer text-[#1E1E1E] border border-black/20 rounded-full overflow-hidden flex items-center justify-center gap-2 group">
                  <FaApple className="relative z-10 text-lg" />

                  <span className="relative z-10 text-sm whitespace-nowrap">
                    Get the App
                  </span>

                  <span className="absolute inset-0 -translate-x-full -translate-y-full group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700 bg-gradient-to-br from-transparent via-black/10 to-transparent" />
                </button>
              </Link>
            </div>

            <div className="flex gap-12 pt-4">
              <div>
                <div className="text-5xl font-bold">
                  95<span className="text-3xl">%</span>
                </div>
                <div className="text-[#000000] mt-2">{text1}</div>
              </div>
              <div>
                <div className="text-5xl font-bold">4.7</div>
                <div className="text-[#000000] mt-2">{text2}</div>
                <div className="text-[#000000] mt-1">{ratingCount} ratings</div>
              </div>
            </div>
          </div>
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-3xl aspect-[3/3] order-1 lg:order-2">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoulmateArt;
