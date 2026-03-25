"use client";

import { useEffect, useState } from "react";
import { useRef } from "react";
import Image from "next/image";
import { IoShareSocialSharp } from "react-icons/io5";
import { GiSaveArrow } from "react-icons/gi";

// const AI_TOOLS = [
//   {
//     id: "all",
//     label: "All Categories",
//     img: "/images/Exlore/category/all-category.png",
//   },
//   {
//     id: "Formal",
//     label: "Formal Garden",
//     img: "/images/Exlore/category/formal-garden.png",
//   },
//   {
//     id: "Chinese",
//     label: "Chinese Garden",
//     img: "/images/Exlore/category/chines-garden.png",
//   },
//   {
//     id: "Contemporary",
//     label: "Contemporary Garden",
//     img: "/images/Exlore/category/Contemporary-garden.png",
//   },
//   {
//     id: "Coastal",
//     label: "Coastal Garden",
//     img: "/images/Exlore/category/Coastal-garden.png",
//   },
//   {
//     id: "Fairy",
//     label: "Fairy Garden",
//     img: "/images/Exlore/category/Fairy-garden.png",
//   },
//   {
//     id: "Luxury",
//     label: "Luxury Garden",
//     img: "/images/Exlore/category/Luxury-garden.png",
//   },
// ];
export const EXPLORE_IMAGES = [
  {
    id: 1,
    src: "/images/Exlore/garden.png",
    alt: "Interior 1",
    // category: "Fun preset",
  },
  {
    id: 3,
    src: "/images/Exlore/garden-design.png",
    alt: "Magic Remove",
    // category: "Magic Remove",
  },
  {
    id: 4,
    src: "/images/Exlore/garden-design1.png",
    alt: "Fun preset",
    // category: "Fun preset",
  },
  {
    id: 5,
    src: "/images/Exlore/landscaping.png",
    alt: "Image Utilities",
    // category: "Image Utilities",
  },
  {
    id: 6,
    src: "/images/Exlore/object-replace.png",
    alt: "Image Utilities",
    // category: "Image Utilities",
  },
  {
    id: 7,
    src: "/images/Exlore/park-garden.png",
    alt: "Image Utilities",
    // category: "Image Utilities",
  },
  {
    id: 8,
    src: "/images/Exlore/remove-and-clean.png",
    alt: "Image Utilities",
    // category: "Image Utilities",
  },
  {
    id: 9,
    src: "/images/Exlore/replace-object.png",
    alt: "Fun preset",
    // category: "Fun preset",
  },
];

export default function AiToolsExplore({ resetExplore }) {
  const [activeTool, setActiveTool] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setSelectedImage(null);
  }, [resetExplore]);

  const handleImageClick = (img) => {
    setSelectedImage(img);
    setShowResult(true);
  };

  const ResultScreen = ({ imageSrc, onClose }) => {
    const handleSave = async () => {
      try {
        const response = await fetch(imageSrc);
        const blob = await response.blob();
        if (window.showSaveFilePicker) {
          const fileHandle = await window.showSaveFilePicker({
            suggestedName: `ai-garden-result.jpg`,
            types: [
              {
                description: "Image",
                accept: { "image/jpeg": [".jpg", ".jpeg"] },
              },
            ],
          });
          const writable = await fileHandle.createWritable();
          await writable.write(blob);
          await writable.close();
        } else {
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = `ai-garden-result.jpg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          alert("Download failed. Please try again.");
        }
      }
    };

    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto flex flex-col gap-4 pb-4">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="text-[#164C1A] cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 19l-7-7 7-7"
                  stroke="#164C1A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <h4 className="text-[16px] font-semibold text-[#164C1A] ">
              Result
            </h4>
          </div>
          <div className="relative rounded-xl overflow-hidden bg-[#C4D0BB] border border-[#05C847] h-[280px] sm:h-[320px] md:h-[360px]">
            <img
              src={imageSrc}
              alt="explore result"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="flex-shrink-0 flex flex-col items-center gap-3 pt-4 pb-2 px-2">
          <div className="flex w-full sm:w-[400px] gap-3">
            <button
              onClick={async () => {
                try {
                  const imageUrl = imageSrc;
                  if (navigator.share) {
                    const response = await fetch(imageUrl);
                    const blob = await response.blob();
                    const file = new File([blob], "ai-garden-result.jpg", {
                      type: blob.type,
                    });
                    if (
                      navigator.canShare &&
                      navigator.canShare({ files: [file] })
                    ) {
                      await navigator.share({
                        title: "Check out my edited photo!",
                        text: "Created with Ai-GardenAI",
                        files: [file],
                      });
                    } else {
                      await navigator.share({
                        title: "Check out my edited photo!",
                        text: "Created with Ai-GardenAI",
                        url: imageUrl,
                      });
                    }
                  } else {
                    await navigator.clipboard.writeText(imageUrl);
                    alert("Link copied to clipboard!");
                  }
                } catch (err) {
                  if (err.name !== "AbortError") {
                    alert("Share failed. Please try again.");
                  }
                }
              }}
              className="flex-1 py-2.5 sm:py-2 rounded-full bg-gradient-to-b from-[#34B23D] to-[#164C1A] text-white font-semibold text-[15px] sm:text-[18px] flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition"
            >
              <IoShareSocialSharp /> Share
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 sm:py-2 rounded-full bg-gradient-to-b from-[#34B23D] to-[#164C1A] text-white font-semibold text-[15px] sm:text-[18px] flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition"
            >
              <GiSaveArrow /> Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (showResult && selectedImage) {
    return (
      <ResultScreen
        imageSrc={selectedImage.src}
        onClose={() => {
          setShowResult(false);
          setSelectedImage(null);
        }}
      />
    );
  }

  const filteredImages =
    activeTool === "all"
      ? EXPLORE_IMAGES
      : EXPLORE_IMAGES.filter((img) => img.category === activeTool);
  return (
    <div className=" min-h-screen">
      {/* <h2 className="text-[16px] font-semibold text-[#164C1A] mb-3">
        Categories
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide w-full">
        {AI_TOOLS.map((tool) => {
          const isActive = activeTool === tool.id;
          return (
            <div
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className="flex-shrink-0 flex flex-col items-center gap-1 cursor-pointer"
            >
              <div
                className={`w-[100px] h-[100px] rounded-2xl overflow-hidden border-2 transition-all
                 ${isActive ? "border-[#34B23D]" : "border-transparent hover:border-[#34B23D]"}`}
              >
                <img
                  src={tool.img}
                  alt={tool.label}
                  className="w-full h-full object-cover"
                />
              </div>
              <p
                className={`text-[12px] font-semibold text-center leading-tight max-w-[90px]
                ${isActive ? "bg-gradient-to-b from-[#34B23D] to-[#164C1A] text-transparent bg-clip-text" : "text-[#164C1A]"}`}
              >
                {tool.label}
              </p>
            </div>
          );
        })}
      </div> */}
      <h2 className="text-[16px] sm:text-[18px] font-bold text-[#164C1A] mb-3">
        Inspirations
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
        {filteredImages.map((img) => {
          return (
            <div
              key={img.id}
              onClick={() => handleImageClick(img)}
              className="relative rounded-2xl overflow-hidden cursor-pointer
               aspect-square
               border-2 border-transparent hover:border-gray-300 transition-all duration-200"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
