import Image from "next/image";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { altFromSrcOrAlt } from "@/lib/altText";
import Link from "next/link";
import { FaApple } from "react-icons/fa";

const Home = ({ hero, country }) => {
  return (
    <section
      id="home"
      className="bg-white text-black min-h-[90vh] flex flex-col justify-center items-center relative overflow-hidden"
    >
      <div className="mycontainer flex flex-col-reverse md:flex-row items-center justify-between">
        <div className="flex-1 flex flex-col gap-6 sm:gap-8 max-w-xl text-start md:text-left relative z-10 mt-5">
          <h1 className="text-[32px] sm:text-[40px] lg:text-[50px] font-bold leading-tight">
            {hero?.title}{" "}
            <span className="bg-gradient-to-b from-[#34B23D] to-[#164C1A] bg-clip-text text-transparent">
              {hero?.subTitle}
            </span>
          </h1>

          <p className="text-[#1E1E1E] text-[18px] sm:text-[24px] leading-relaxed ">
            {hero?.description}
          </p>

          <div className="flex flex-wrap justify-start gap-3">
            <a
              href="https://apps.apple.com/us/app/ai-garden-my-landscape-design/id6753977398"
              target="blank"
            >
              <button className="relative inline-flex cursor-pointer items-center justify-center gap-3 overflow-hidden bg-gradient-to-b from-[#34B23D] to-[#164C1A] text-white font-medium px-2 py-2 rounded-full w-fit group">
                <span className="relative z-10 text-[14px] sm:text-[16px] ml-2">
                  {hero?.buttonText}
                </span>
                <div className="relative z-10 bg-white rounded-full p-2 text-[#34B23D] ml-4 text-[#34B23D]">
                  <FaArrowRight />
                </div>
                <span className="absolute inset-0 -translate-x-full -translate-y-full group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700 bg-gradient-to-br from-transparent via-white/20 to-transparent" />
              </button>
            </a>

            {/* Button 2 - Get the App */}
            {/* <Link
              href="https://apps.apple.com/us/app/ai-garden-my-landscape-design/id6753977398"
              target="_blank"
            >
              <button className="relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden bg-white text-[#1E1E1E] border border-black/20 font-medium px-5 py-3 rounded-full w-fit group hover:bg-gray-100 transition">
                <FaApple className="relative z-10 text-lg" />
                <span className="relative z-10 text-[14px] sm:text-[16px] whitespace-nowrap">
                  Get the App
                </span>
                <span className="absolute inset-0 -translate-x-full -translate-y-full group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700 bg-gradient-to-br from-transparent via-black/10 to-transparent" />
              </button>
            </Link> */}
          </div>
        </div>

        <div className="flex-1 flex justify-center max-sm:min-h-[350px] md:justify-end relative z-10">
          <Image
            src={hero?.image}
            alt={altFromSrcOrAlt({
              alt: hero?.alt,
              src: hero?.image,
              locale: country,
            })}
            width={500}
            height={500}
            priority
            fetchPriority="high"
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 500px"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-xl h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
