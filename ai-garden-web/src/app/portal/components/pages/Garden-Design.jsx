"use client";

import { useState, useRef, useContext } from "react";
import { AppContext } from "@/context/Appcontext";
import { IoShareSocialSharp } from "react-icons/io5";
import { GiSaveArrow } from "react-icons/gi";
import { RiEdit2Fill } from "react-icons/ri";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import HomeAuraLoadingScreen from "../AiGardenLoadingScreen";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const Header = ({ title, onBack }) => (
  <div className="flex items-center gap-2 px-3 py-2 border-l-4 border-[#34B23D]">
    <button onClick={onBack} className="text-[#164C1A] cursor-pointer">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M15 19l-7-7 7-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
    <h2 className="text-[16px] sm:text-[18px] font-bold text-[#164C1A]">
      {title}
    </h2>
  </div>
);

const SPACE_TYPES = [
  {
    id: "outdoor",
    label: "Outdoor",
    img: "/images/garden-design/garden-design-type/Outdoor.png",
  },
  {
    id: "backyard",
    label: "Backyard",
    img: "/images/garden-design/garden-design-type/Backyard.png",
  },
  {
    id: "patio",
    label: "Patio",
    img: "/images/garden-design/garden-design-type/Patio.png",
  },
  {
    id: "frontyard",
    label: "Frontyard",
    img: "/images/garden-design/garden-design-type/Frontyard.png",
  },
  {
    id: "indoor",
    label: "Indoor",
    img: "/images/garden-design/garden-design-type/Indoor.png",
  },
  {
    id: "terrace",
    label: "Terrace",
    img: "/images/garden-design/garden-design-type/Terrace.png",
  },
  {
    id: "balcony",
    label: "Balcony",
    img: "/images/garden-design/garden-design-type/Balcony.png",
  },
  {
    id: "playground",
    label: "Playground",
    img: "/images/garden-design/garden-design-type/Playground.png",
  },
];

const GARDEN_STYLES = [
  {
    id: "formal",
    label: "Formal Garden",
    img: "/images/garden-design/garden-design-style/Formal-Garden.png",
  },
  {
    id: "contemporary",
    label: "Contemporary Garden",
    img: "/images/garden-design/garden-design-style/Contemporary-Garden.png",
  },
  {
    id: "mediterranean",
    label: "Mediterranean Garden",
    img: "/images/garden-design/garden-design-style/Mediterranean-Garden.png",
  },
  {
    id: "cottage",
    label: "Cottage Garden",
    img: "/images/garden-design/garden-design-style/Cottage-Garden.png",
  },
  {
    id: "rock",
    label: "Rock Garden",
    img: "/images/garden-design/garden-design-style/Rock-Garden.png",
  },
  {
    id: "coastal",
    label: "Coastal Garden",
    img: "/images/garden-design/garden-design-style/Coastal-Garden.png",
  },
  {
    id: "fairy",
    label: "Fairy Garden",
    img: "/images/garden-design/garden-design-style/Fairy-Garden.png",
  },
  {
    id: "tropical",
    label: "Tropical Garden",
    img: "/images/garden-design/garden-design-style/Tropical-Garden.png",
  },
  {
    id: "luxury",
    label: "Luxury Garden",
    img: "/images/garden-design/garden-design-style/Luxury-Garden.png",
  },
  {
    id: "chinese",
    label: "Chinese Garden",
    img: "/images/garden-design/garden-design-style/Chinese-Garden.png",
  },
];

const OBJECTS = [
  "Outdoor Furniture",
  "Wooden Fence",
  "Flowering Plants",
  "Lights",
  "Flower Rock",
  "Stairs",
  "Flowering Shrub",
  "Pavilion",
  "Brick Path",
  "Bench",
  "Swing",
  "Concrete Path",
  "Iron Fence",
  "Fountain",
];

const TEMPLATES = [
  "/images/garden-design/garden-design-tamplet/garden-design-1.png",
  "/images/garden-design/garden-design-tamplet/garden-design-2.png",
  "/images/garden-design/garden-design-tamplet/garden-design-3.png",
  "/images/garden-design/garden-design-tamplet/garden-design-4.png",
  "/images/garden-design/garden-design-tamplet/garden-design-5.png",
  "/images/garden-design/garden-design-tamplet/garden-design-6.png",
  "/images/garden-design/garden-design-tamplet/garden-design-7.png",
];

// ─── STEP DOTS ────────────────────────────────────────────────────────────────
const StepDots = ({ current }) => (
  <div className="flex justify-center gap-2 mb-5">
    {[0, 1, 2, 3].map((i) => (
      <div
        key={i}
        className={`rounded-full transition-all duration-300 ${
          i === current
            ? "w-[12px] h-[12px] bg-gradient-to-b from-[#34B23D] to-[#164C1A] scale-110"
            : "w-[12px] h-[12px] bg-[#CBE3C0]"
        }`}
      />
    ))}
  </div>
);

// ─── BOTTOM BUTTON ────────────────────────────────────────────────────────────
const BottomBar = ({ children }) => (
  <div className="flex-shrink-0 pt-4 pb-2 bg-[#F8F5EE]">{children}</div>
);

const GreenBtn = ({ onClick, disabled, children, className = "" }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-[90%] mx-auto py-3.5 rounded-full font-semibold text-[16px] text-white flex items-center justify-center gap-2 transition-all
      ${
        disabled
          ? "bg-[#C4D0BB] cursor-not-allowed"
          : "bg-gradient-to-b from-[#34B23D] to-[#164C1A] cursor-pointer hover:opacity-90"
      } ${className}`}
  >
    {children}
  </button>
);

// ─── STEP 1: Upload / Template ────────────────────────────────────────────────
const UploadStep = ({ state, setState, onBack }) => {
  const fileRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setState((s) => ({
      ...s,
      uploadedImage: URL.createObjectURL(file),
      uploadedFile: file,
      selectedTemplate: null,
    }));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col gap-4 pb-4">
        <Header title="Design Garden" onBack={onBack} />
        <StepDots current={0} />
        <div>
          <div className="relative h-[400px] flex-shrink-0 rounded-2xl bg-[#C4D0BB]">
            <div className="absolute inset-3 rounded-xl border-2 border-dashed border-[#05C847] pointer-events-none z-10" />
            <div
              onClick={() => !state.uploadedImage && fileRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                handleFile(e.dataTransfer.files[0]);
              }}
              className={`relative flex flex-col items-center justify-center rounded-2xl transition-all
              w-full h-full
              ${dragging ? "bg-[#edf7ee]" : "bg-[#C4D0BB]"}
            ${!state.uploadedImage ? "cursor-pointer" : ""}
          `}
            >
              {state.uploadedImage ? (
                <>
                  <img
                    src={state.uploadedImage}
                    alt="preview"
                    className="w-full h-full object-contain rounded-2xl"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setState((s) => ({
                        ...s,
                        uploadedImage: null,
                        uploadedFile: null,
                      }));
                    }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white text-sm flex items-center justify-center hover:bg-black/80 cursor-pointer z-10"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <>
                  <div className="w-5 h-5 rounded-full bg-gradient-to-l from-[#34B23D] to-[#164C1A] flex items-center justify-center text-white text-[18px] pb-1 mb-0.5">
                    +
                  </div>
                  <p className="text-[18px] font-semibold text-[#164C1A]">
                    Upload Image
                  </p>
                  <p className="text-[12px] text-[#164C1A] mt-0.5">
                    Your photo can be added by tapping it
                  </p>
                </>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </div>
            <p className="text-[14px] sm:text-[18px] mt-5 mb-5 font-semibold text-[#164C1A]">
              Choose from Templates
            </p>
            <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
              {TEMPLATES.map((src, i) => (
                <div
                  key={i}
                  onClick={() =>
                    setState((s) => ({
                      ...s,
                      selectedTemplate: i,
                      uploadedImage: null,
                      uploadedFile: null,
                    }))
                  }
                  className={`flex-shrink-0 w-[130px] h-[130px] rounded-xl overflow-hidden cursor-pointer border-2 transition-all
                ${state.selectedTemplate === i ? "border-[#34B23D]" : "border-transparent hover:border-[#34B23D]"}`}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomBar>
        <GreenBtn
          disabled={!state.uploadedImage && state.selectedTemplate === null}
          onClick={() => setState((s) => ({ ...s, step: 1 }))}
        >
          Continue <FaArrowRight className="mt-1" />
        </GreenBtn>
      </BottomBar>
    </div>
  );
};

// ─── STEP 2: Space Type ───────────────────────────────────────────────────────
const SpaceTypeStep = ({ state, setState, onBack }) => (
  <div className="flex flex-col h-full">
    <div className="flex-1 overflow-y-auto scrollbar-hide pb-4">
      <h2 className="text-[18px] font-bold text-[#164C1A] text-center">
        <Header title="Space Type" onBack={onBack} />
      </h2>
      <StepDots current={1} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-2">
        {SPACE_TYPES.map((opt) => (
          <div
            key={opt.id}
            onClick={() => setState((s) => ({ ...s, gardenStyle: opt.id }))}
            className={`relative rounded-xl cursor-pointer border-2 transition-all bg-[#C4D0BB]
              ${
                state.gardenStyle === opt.id
                  ? "border-[#05C847] shadow-md"
                  : "border-transparent hover:border-[#05C847]"
              }`}
          >
            <div className="p-2 mt-1 pb-0">
              <img
                src={opt.img}
                alt={opt.label}
                className="w-full aspect-[6/5] object-contain"
              />
            </div>

            <p className="text-center text-[14px] font-medium text-[#164C1A] py-3 leading-tight">
              {opt.label}
            </p>
          </div>
        ))}
      </div>
    </div>
    <BottomBar>
      <GreenBtn onClick={() => setState((s) => ({ ...s, step: 2 }))}>
        Continue <FaArrowRight className="mt-1" />
      </GreenBtn>
    </BottomBar>
  </div>
);

// ─── STEP 3: Garden Style ─────────────────────────────────────────────────────
const GardenStyleStep = ({ state, setState, onBack }) => (
  <div className="flex flex-col h-full">
    <div className="flex-1 overflow-y-auto scrollbar-hide">
      <Header title="Garden Style" onBack={onBack} />
      <StepDots current={2} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-2">
        {GARDEN_STYLES.map((opt) => (
          <div
            key={opt.id}
            onClick={() => setState((s) => ({ ...s, gardenStyle: opt.id }))}
            className={`relative rounded-xl cursor-pointer border-2 transition-all bg-[#C4D0BB]
              ${
                state.gardenStyle === opt.id
                  ? "border-[#05C847] shadow-md"
                  : "border-transparent hover:border-[#05C847]"
              }`}
          >
            <div className="p-2 mt-1 pb-0">
              <img
                src={opt.img}
                alt={opt.label}
                className="w-full aspect-[6/5] object-contain"
              />
            </div>

            <p className="text-center text-[14px] font-medium text-[#164C1A] py-3 leading-tight">
              {opt.label}
            </p>
          </div>
        ))}
      </div>
    </div>
    <BottomBar>
      <GreenBtn onClick={() => setState((s) => ({ ...s, step: 3 }))}>
        Continue <FaArrowRight className="mt-1" />
      </GreenBtn>
    </BottomBar>
  </div>
);

// ─── STEP 4: Additional Items ─────────────────────────────────────────────────
const AdditionalItemsStep = ({
  state,
  setState,
  onGenerate,
  loading,
  onBack,
}) => {
  const toggleChip = (obj) => {
    setState((s) => {
      const isSelected = s.selectedObjects.includes(obj);
      const newSelected = isSelected
        ? s.selectedObjects.filter((o) => o !== obj)
        : [...s.selectedObjects, obj];
      const newCustomItems = newSelected.join(", ");

      return {
        ...s,
        selectedObjects: newSelected,
        customItems: newCustomItems,
      };
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col gap-3 pb-4">
        <Header title="Additional Items" onBack={onBack} />
        <StepDots current={3} />
        <div>
          <p className="text-[14px] mt-5 mb-5 sm:text-[18px] font-semibold text-[#164C1A]">
            Additional Item to Add (Optional)
          </p>
          <div className="relative rounded-2xl">
            <div className="absolute inset-4 rounded-xl border-2 border-dashed border-[#164C1A]/30 pointer-events-none" />
            <textarea
              value={state.customItems}
              onChange={(e) =>
                setState((s) => ({ ...s, customItems: e.target.value }))
              }
              placeholder="Type here"
              rows={4}
              className="w-full bg-[#C4D0BB] rounded-2xl px-6 pt-6 pb-6 text-[13px] text-[#164C1A] placeholder:text-[#164C1A]/40 outline-none scrollbar-hide"
            />
          </div>
          <p className="text-[14px] mt-5 mb-5 sm:text-[18px] font-semibold text-[#164C1A]">
            Objects
          </p>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 w-full">
            {OBJECTS.map((obj) => (
              <button
                key={obj}
                onClick={() => toggleChip(obj)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all cursor-pointer
                ${
                  state.selectedObjects.includes(obj)
                    ? "bg-[#CBE3C0] border-[#34B23D] text-white"
                    : "bg-[#CBE3C0] border-[#B8D4A0] text-[#164C1A] hover:border-[#34B23D]"
                }`}
              >
                {obj}
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomBar>
        <GreenBtn onClick={onGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate"}
          <Image
            src="/svgs/generate-icon.svg"
            alt="Generate"
            width={18}
            height={18}
            className="object-contain"
          />
        </GreenBtn>
        {/* <GreenBtn onClick={onGenerate}>
          Generate
          <Image
            src="/svgs/generate-icon.svg"
            alt="Generate"
            width={18}
            height={18}
            className="object-contain"
          />
        </GreenBtn> */}
      </BottomBar>
    </div>
  );
};

// ─── RESULT SCREEN ────────────────────────────────────────────────────────────
const ResultScreen = ({ state, setState, onEdit, onReset }) => {
  const [showSplitter, setShowSplitter] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const spaceLabel =
    SPACE_TYPES.find((s) => s.id === state.spaceType)?.label || "";
  const styleLabel =
    GARDEN_STYLES.find((s) => s.id === state.gardenStyle)?.label || "";

  const handleSave = async () => {
    try {
      const response = await fetch(state.resultImage);
      const blob = await response.blob();
      if (window.showSaveFilePicker) {
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: "garden-design-result.jpg",
          types: [
            {
              description: "JPEG Image",
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
        link.download = `garden-design-result.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        alert("Download failed.");
      }
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "My Garden Design",
          url: state.resultImage,
        });
      } else {
        await navigator.clipboard.writeText(state.resultImage);
        alert("Link copied!");
      }
    } catch {}
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col gap-3 pb-4">
        <div className="flex items-center justify-between">
          <p className="text-[16px] font-bold text-[#164C1A]">
            Your photo is ready!
          </p>
          <button
            onClick={onReset}
            className="w-8 h-8 flex items-center justify-center text-[#6B8F55] hover:bg-red-50 hover:text-red-500 transition cursor-pointer"
          >
            <Image
              src="/svgs/Delete-Account.svg"
              width={16}
              height={16}
              alt="close"
            />
          </button>
        </div>
        <div
          ref={containerRef}
          className="relative rounded-2xl overflow-hidden bg-[#C4D0BB] border border-[#B8D4A0] h-[260px] sm:h-[400px]"
          onMouseMove={(e) => {
            if (!dragging.current || !containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            setSliderPos(
              Math.min(
                Math.max(((e.clientX - rect.left) / rect.width) * 100, 0),
                100,
              ),
            );
          }}
          onMouseUp={() => {
            dragging.current = false;
          }}
          onMouseLeave={() => {
            dragging.current = false;
          }}
          onTouchMove={(e) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            setSliderPos(
              Math.min(
                Math.max(
                  ((e.touches[0].clientX - rect.left) / rect.width) * 100,
                  0,
                ),
                100,
              ),
            );
          }}
          onTouchEnd={() => {
            dragging.current = false;
          }}
        >
          {!showSplitter ? (
            <img
              src={state.resultImage}
              alt="result"
              className="w-full h-full object-contain"
            />
          ) : (
            <>
              <img
                src={state.resultImage}
                alt="after"
                className="absolute inset-0 w-full h-full object-contain"
                draggable={false}
              />
              <span className="absolute top-2 right-2 z-10 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">
                AFTER
              </span>
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src={state.beforeImage || state.resultImage}
                  alt="before"
                  className="absolute inset-0 h-full object-contain"
                  style={{
                    width: `${containerRef.current?.offsetWidth || 400}px`,
                    maxWidth: "none",
                  }}
                  draggable={false}
                />
              </div>
              <span className="absolute top-2 left-2 z-10 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">
                BEFORE
              </span>
              <div
                className="absolute top-0 bottom-0 z-20 flex items-center"
                style={{
                  left: `${sliderPos}%`,
                  transform: "translateX(-50%)",
                  cursor: "col-resize",
                }}
              >
                <div className="w-0.5 h-full bg-white absolute" />
                <div
                  className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center absolute z-10"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    touchAction: "none",
                  }}
                  onMouseDown={() => {
                    dragging.current = true;
                  }}
                  onTouchStart={() => {
                    dragging.current = true;
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M5 4L2 8L5 12M11 4L14 8L11 12"
                      stroke="#555"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </>
          )}

          <button
            onClick={() => setShowSplitter(!showSplitter)}
            className="absolute bottom-2 right-2 w-8 h-8 bg-white/80 border border-[#B8D4A0] rounded-lg flex items-center justify-center cursor-pointer hover:bg-white transition z-20"
            title="Before / After"
          >
            <Image
              src="/svgs/Compare-Icon.svg"
              alt="compare"
              width={16}
              height={16}
            />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {spaceLabel && (
            <span className="bg-[#B6CCAC] border border-[#B8D4A0] rounded-full px-3 py-1 text-[12px] sm:text-[14px] text-[#164C1A] font-medium">
              Space type: {spaceLabel}
            </span>
          )}
          {styleLabel && (
            <span className="bg-[#B6CCAC] border border-[#B8D4A0] rounded-full px-3 py-1 text-[12px] sm:text-[14px] text-[#164C1A] font-medium">
              Style: {styleLabel}
            </span>
          )}
          {state.selectedObjects.slice(0, 2).map((o) => (
            <span
              key={o}
              className="bg-[#B6CCAC] border border-[#B8D4A0] rounded-full px-3 py-1 text-[12px] sm:text-[14px] text-[#164C1A] font-medium"
            >
              Items: {o}
            </span>
          ))}
        </div>
      </div>
      <BottomBar>
        <div className="flex flex-col items-center gap-3 px-2">
          <div className="flex gap-3 w-full sm:w-[400px]">
            <button
              onClick={handleShare}
              className="flex-1 py-3 rounded-full bg-gradient-to-b from-[#34B23D] to-[#164C1A] text-white font-semibold text-[14px] flex items-center justify-center gap-1.5 cursor-pointer hover:opacity-90 transition"
            >
              <IoShareSocialSharp size={16} /> Share
            </button>
            <button
              onClick={onEdit}
              className="flex-1 py-3 rounded-full bg-gradient-to-b from-[#34B23D] to-[#164C1A] text-white font-semibold text-[14px] flex items-center justify-center gap-1.5 cursor-pointer hover:opacity-90 transition"
            >
              <RiEdit2Fill size={16} /> Edit
            </button>
          </div>
          <div className="flex w-full sm:w-[400px]">
            <button
              onClick={handleSave}
              className="flex-1 py-3 rounded-full bg-gradient-to-b from-[#34B23D] to-[#164C1A] text-white font-semibold text-[14px] flex items-center justify-center gap-1.5 cursor-pointer hover:opacity-90 transition"
            >
              <GiSaveArrow size={16} /> Save
            </button>
          </div>
        </div>
      </BottomBar>
    </div>
  );
};

// ─── EDIT SCREEN ──────────────────────────────────────────────────────────────
const EditScreen = ({
  state,
  setState,
  onBack,
  onMessageSent,
  loading,
  setLoading,
}) => {
  const { credits, setCredits, user, setUser } = useContext(AppContext);

  const handleEditGenerate = async () => {
    if (!state.editPrompt.trim()) return;
    if (credits !== Infinity && credits <= 0) {
      onMessageSent?.();
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            toolId: "garden-design",
            section: "garden-design",
            uploadedImage: state.resultImage,
            toolOptions: { editPrompt: state.editPrompt },
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        if (data.needsPremium) {
          setLoading(false);
          onMessageSent?.();
          return;
        }
        throw new Error(data.message);
      }
      if (data.creditsLeft !== undefined) {
        const newCredits =
          data.creditsLeft === "unlimited" ? Infinity : data.creditsLeft;
        setCredits(newCredits);
        if (user) {
          const u = { ...user, credits: newCredits };
          setUser(u);
          localStorage.setItem("user", JSON.stringify(u));
        }
      }
      setState((s) => ({
        ...s,
        resultImage: data.imageUrl || data.image || data.url,
        step: 4,
      }));
    } catch {
      alert("Edit failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handleEditGenerate = () => {
  //   setState((s) => ({
  //     ...s,
  //     step: 4,
  //   }));
  // };

  return (
    <div className="flex flex-col h-full">
      {loading && <HomeAuraLoadingScreen />}
      <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col gap-3 pb-4">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="text-[#164C1A] cursor-pointer">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 19l-7-7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h4 className="text-[16px] font-bold text-[#164C1A]">Edit Photo</h4>
        </div>
        <div className="relative rounded-2xl overflow-hidden bg-[#C4D0BB] border border-[#B8D4A0] h-[400px]">
          <img
            src={state.resultImage}
            alt="edit"
            className="w-full h-full object-contain"
          />
        </div>
        <label className="text-[14px] sm:text-[18px] font-semibold text-[#164C1A]">
          Describe your changes
        </label>
        <div className="relative rounded-2xl">
          <div className="absolute inset-4 rounded-xl border-2 border-dashed border-[#164C1A]/30 pointer-events-none" />
          <textarea
            value={state.editPrompt}
            onChange={(e) =>
              setState((s) => ({ ...s, editPrompt: e.target.value }))
            }
            placeholder="Type here"
            rows={4}
            className="w-full bg-[#C4D0BB] rounded-2xl px-6 pt-6 pb-6 text-[13px] text-[#164C1A] placeholder:text-[#164C1A]/40 outline-none scrollbar-hide"
          />
        </div>
      </div>

      <BottomBar>
        <GreenBtn
          onClick={handleEditGenerate}
          disabled={!state.editPrompt.trim() || loading}
        >
          <Image
            src="/svgs/generate-icon.svg"
            alt="Generate"
            width={18}
            height={18}
            className="object-contain"
          />
          {loading ? "Processing..." : "Generate Edit"}
        </GreenBtn>
      </BottomBar>
    </div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const GardenDesign = ({ onMessageSent, onGoHome }) => {
  const { credits, setCredits, user, setUser } = useContext(AppContext);

  const handleBack = () => {
    setState((prev) => {
      if (prev.step === 0) {
        onGoHome?.();
        return prev;
      }
      return {
        ...prev,
        step: prev.step - 1,
      };
    });
  };

  const [state, setState] = useState({
    step: 0,
    uploadedImage: null,
    uploadedFile: null,
    selectedTemplate: null,
    spaceType: "outdoor",
    gardenStyle: "contemporary",
    selectedObjects: [],
    customItems: "",
    editPrompt: "",
    resultImage: null,
    beforeImage: null,
  });
  const [loading, setLoading] = useState(false);
  const handleGenerate = async () => {
    if (credits !== Infinity && credits <= 0) {
      onMessageSent?.();
      return;
    }
    setLoading(true);
    try {
      let imageData = state.uploadedImage;
      if (state.uploadedFile) {
        imageData = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(state.uploadedFile);
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
        });
      }

      if (!imageData && state.selectedTemplate !== null) {
        const templateUrl = TEMPLATES[state.selectedTemplate];
        const res = await fetch(templateUrl);
        const blob = await res.blob();
        imageData = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      }

      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            toolId: "garden-design",
            section: "garden-design",
            uploadedImage: imageData,
            toolOptions: {
              spaceType: state.spaceType,
              gardenStyle: state.gardenStyle,
              selectedObjects: state.selectedObjects,
              customItems: state.customItems,
              selectedTemplate: state.selectedTemplate,
            },
          }),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        if (data.needsPremium) {
          setLoading(false);
          onMessageSent?.();
          return;
        }
        throw new Error(data.message || "Generation failed");
      }

      if (data.creditsLeft !== undefined) {
        const newCredits =
          data.creditsLeft === "unlimited" ? Infinity : data.creditsLeft;
        setCredits(newCredits);
        if (user) {
          const u = { ...user, credits: newCredits };
          setUser(u);
          localStorage.setItem("user", JSON.stringify(u));
        }
      }

      setState((s) => ({
        ...s,
        resultImage: data.imageUrl || data.image || data.url,
        beforeImage: imageData,
        step: 4,
      }));
    } catch (err) {
      console.error(err);
      alert("Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handleGenerate = () => {
  //   let imageData = state.uploadedImage;
  //   if (!imageData && state.selectedTemplate !== null) {
  //     imageData = TEMPLATES[state.selectedTemplate];
  //   }

  //   setState((s) => ({
  //     ...s,
  //     resultImage: imageData,
  //     beforeImage: imageData,
  //     step: 4,
  //   }));
  // };

  const handleReset = () => {
    setState({
      step: 0,
      uploadedImage: null,
      uploadedFile: null,
      selectedTemplate: null,
      spaceType: "outdoor",
      gardenStyle: "contemporary",
      selectedObjects: [],
      customItems: "",
      editPrompt: "",
      resultImage: null,
      beforeImage: null,
    });
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {loading && state.step !== 5 && <HomeAuraLoadingScreen />}
      {state.step === 0 && (
        <UploadStep state={state} setState={setState} onBack={handleBack} />
      )}
      {state.step === 1 && (
        <SpaceTypeStep state={state} setState={setState} onBack={handleBack} />
      )}
      {state.step === 2 && (
        <GardenStyleStep
          state={state}
          setState={setState}
          onBack={handleBack}
        />
      )}

      {state.step === 3 && (
        <AdditionalItemsStep
          state={state}
          setState={setState}
          onGenerate={handleGenerate}
          loading={loading}
          onBack={handleBack}
        />
      )}
      {state.step === 4 && (
        <ResultScreen
          state={state}
          setState={setState}
          onEdit={() => setState((s) => ({ ...s, step: 5, editPrompt: "" }))}
          onReset={handleReset}
        />
      )}
      {state.step === 5 && (
        <EditScreen
          state={state}
          setState={setState}
          onBack={() => setState((s) => ({ ...s, step: 4 }))}
          onMessageSent={onMessageSent}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};

export default GardenDesign;
