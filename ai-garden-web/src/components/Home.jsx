import Image from "next/image";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { altFromSrcOrAlt } from "@/lib/altText";

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

          <div className="flex justify-start md:justify-start">
            <a href="/portal/login">
              <button className="inline-flex cursor-pointer items-center justify-center gap-5 bg-gradient-to-b from-[#34B23D] to-[#164C1A] text-white font-medium px-5 sm:px-2 py-2 rounded-full w-fit">
                <span className="text-[14px] sm:text-[16px] ml-2">
                  {hero?.buttonText}
                </span>
                <div className="bg-white rounded-full p-2 text-[#34B23D] ml-4">
                  <FaArrowRight />
                </div>
              </button>
            </a>
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
