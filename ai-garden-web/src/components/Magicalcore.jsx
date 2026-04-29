"use client";
import Image from "next/image";
// import { useState, useEffect } from "react";
// import { useRouter, usePathname } from "next/navigation";
import { altFromSrcOrAlt } from "@/lib/altText";
// import { MdOutlineArrowOutward } from "react-icons/md";

const Magicalcore = ({ magicalCore, country }) => {
  // const pathname = usePathname();
  // const router = useRouter();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const token =
  //     localStorage.getItem("authToken") || localStorage.getItem("token");
  //   if (token) {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  // const handleCardClick = (e) => {
  //   e.preventDefault();
  //   if (isLoggedIn) {
  //     router.push("/portal/dashboard");
  //   } else {
  //     router.push("/portal/login?mode=signup");
  //   }
  // };

  return (
    <section
      id="features"
      className="bg-white text-[#1E1E1E] py-12 sm:py-14 md:py-16 relative overflow-hidden"
    >
      <div className="mycontainer flex flex-col gap-8 md:gap-10 relative z-10">
        <div className="flex flex-col items-center gap-3 sm:gap-4 text-center">
          <h2 className="text-[24px] sm:text-[30px] md:text-[40px] font-bold">
            {magicalCore?.title}
          </h2>
          <p className="text-[16px] sm:text-[18px] max-w-md sm:max-w-xl text-[#1E1E1E]">
            {magicalCore?.description}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {magicalCore?.features?.map((feature, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-10.67px)]"
            >
              <a
                href="https://apps.apple.com/us/app/pixelift-ai-photo-enhancer/id6748871047"
                target="_blank"
                // onClick={handleCardClick}
                className="w-full block relative overflow-hidden group cursor-pointer"
              >
                <Image
                  src={feature.Imge}
                  alt={altFromSrcOrAlt({
                    alt: feature.alt,
                    src: feature.Imge,
                    locale: country,
                  })}
                  width={700}
                  height={200}
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 33vw"
                  className="w-full h-auto object-contain"
                />
                {feature.text && (
                  <div className="absolute w-[95%] bottom-6 left-1/2 -translate-x-1/2 bg-[#C8D5C3CC] backdrop-blur-sm text-[#1a5c2a] font-semibold text-[15px] sm:text-[17px] px-6 py-2.5 rounded-full text-center">
                    {feature.text}
                  </div>
                )}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Magicalcore;
