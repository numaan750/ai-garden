"use client";

import Image from "next/image";
import { useState } from "react";
import { EXPLORE_IMAGES } from "./Explore";
import { IoShareSocialSharp } from "react-icons/io5";
import { GiSaveArrow } from "react-icons/gi";

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
          <button onClick={onClose} className="text-white cursor-pointer">
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
          <h4 className="text-[16px] font-semibold text-[#164C1A]">Result</h4>
        </div>
        <div className="relative rounded-xl overflow-hidden bg-[#C4D0BB] h-[280px] sm:h-[320px] md:h-[360px]">
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
                      text: "Created with Ai-Garden",
                      files: [file],
                    });
                  } else {
                    await navigator.share({
                      title: "Check out my edited photo!",
                      text: "Created with Ai-Garden",
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
            className="flex-1 py-2.5 rounded-full bg-gradient-to-b from-[#34B23D] to-[#164C1A] text-white font-semibold text-[15px] sm:text-[18px] flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition"
          >
            <IoShareSocialSharp /> Share
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-full bg-gradient-to-b from-[#34B23D] to-[#164C1A] text-white font-semibold text-[15px] sm:text-[18px] flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition"
          >
            <GiSaveArrow /> Save
          </button>
        </div>
      </div>
    </div>
  );
};

const Home = ({
  handleSectionChange,
  handlePremiumSection,
  setActiveSection,
  setActiveSubTab,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const firstEightImages = EXPLORE_IMAGES.slice(0, 8);
  const features = [
    {
      label: "Design Garden",
      image: "/images/Design-Garden.png",
      onClick: (fns) => fns.handlePremiumSection("interior-design"),
      isPremium: true,
    },
    {
      label: "Remove & Clean",
      image: "/images/Remove-and-Clean.png",
      onClick: (fns) => fns.handleSectionChange("exterior-design"),
      isPremium: false,
    },
    {
      label: "Replace Objects",
      image: "/images/Replace-Objects.png",
      onClick: (fns) => fns.handlePremiumSection("garden-design"),
      isPremium: true,
    },
    {
      label: "Add Objects",
      image: "/images/Add-Objects.png",
      onClick: (fns) => fns.handlePremiumSection("add-objects"),
      isPremium: true,
    },
    {
      label: "Landscaping",
      image: "/images/Landscaping.png",
      onClick: (fns) => fns.handlePremiumSection("landscaping"),
      isPremium: true,
    },
  ];

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
  return (
    <div className="space-y-2">
      <div className="text-center">
        <h4 className="text-[18px] sm:text-[32px] font-semibold bg-gradient-to-b from-[#34B23D] to-[#164C1A] text-transparent bg-clip-text">
          Design Smarter Gardens with AI
        </h4>

        <p className="text-[14px] sm:text-[18px] text-black mt-2 max-w-xl items-center mx-auto">
          Turn any garden photo into a beautifully designed, intelligent green
          space in just a few clicks.
        </p>
      </div>

      <h4 className="text-[14px] sm:text-[18px] font-semibold text-[#164C1A] mt-6">
        Select An Option
      </h4>
      <div className="mt-5 mx-auto">
        <div className="flex flex-wrap justify-center gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() =>
                feature.onClick({ handleSectionChange, handlePremiumSection })
              }
              className="relative rounded-[10px] overflow-hidden cursor-pointer group w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)]"
            >
              <img
                src={feature.image}
                alt={feature.label}
                className="w-full object-cover"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%]">
                <div className="bg-[#C8D5C3CC] backdrop-blur-md text-center py-2.5 rounded-full text-[16px] font-medium text-[#164C1A] shadow-md">
                  {feature.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-[14px] sm:text-[18px] text-[#164C1A] font-semibold">
            Explore Ideas
          </h4>

          <button
            onClick={() => handleSectionChange("explore")}
            className="text-sm font-medium cursor-pointer bg-gradient-to-b from-[#34B23D] to-[#164C1A] text-transparent bg-clip-text hover:underline"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {firstEightImages.map((img) => (
            <div
              key={img.id}
              onClick={() => {
                setSelectedImage(img);
                setShowResult(true);
              }}
              className="relative rounded-2xl overflow-hidden cursor-pointer aspect-square border-2 border-transparent hover:border-gray-300 transition"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
