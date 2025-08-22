import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { createPortal } from "react-dom";

interface LaunchTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTwitterUrl?: string;
  initialTokenName?: string;
  initialTokenSymbol?: string;
  images?: string[];
}

const LaunchTokenModal: React.FC<LaunchTokenModalProps> = ({
  isOpen,
  onClose,
  initialTwitterUrl = "",
  initialTokenName = "",
  initialTokenSymbol = "",
  images,
}) => {
  const [tokenName, setTokenName] = useState(initialTokenName);
  const [tokenSymbol, setTokenSymbol] = useState(initialTokenSymbol);
  const [website, setWebsite] = useState("");
  const [twitterUrl, setTwitterUrl] = useState(initialTwitterUrl);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Token types
  const tokenTypes = [
    { id: "pump", name: "Pump", icon: "mdi:arrow-up-bold" },
    { id: "bonk", name: "Bonk", icon: "mdi:dog" },
    { id: "jup", name: "Jup", icon: "mdi:star" },
    { id: "moonit", name: "Moonit", icon: "mdi:rocket" },
    { id: "rags", name: "Rags", icon: "mdi:cash" },
    { id: "heaven", name: "Heaven", icon: "mdi:cloud" },
  ];

  const [selectedTokenType, setSelectedTokenType] = useState<string | null>(
    null
  );

  // SOL options
  const solOptions = [1, 3, 5];

  const [splitRatio, setSplitRatio] = useState("0:100");
  const [solAmount, setSolAmount] = useState(3);

  // Update state when initial values change
  useEffect(() => {
    setTokenName(initialTokenName);
    setTokenSymbol(initialTokenSymbol);
    setTwitterUrl(initialTwitterUrl);
  }, [initialTokenName, initialTokenSymbol, initialTwitterUrl]);

  // Handle modal appear/disappear animations
  useEffect(() => {
    if (isOpen) {
      // Modal is opening - start with hidden state then animate in
      setIsVisible(true);
      setIsAnimating(true); // Start hidden
      // Small delay to ensure DOM is ready, then animate in
      setTimeout(() => {
        setIsAnimating(false);
      }, 10);
    } else {
      // Modal is closing - animate out then hide
      setIsAnimating(true);
      setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
      }, 200);
    }
  }, [isOpen]);

  // Handle modal close with animation
  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onClose();
    }, 200); // Match the transition duration
  };

  if (!isVisible) return null;

  const handleImageSelect = (index: number) => {
    setSelectedImage(index);
  };

  const handleTokenTypeSelect = (id: string) => {
    setSelectedTokenType(id);
  };

  // Handle click outside to close modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Create portal for the modal to render at the document body level
  return createPortal(
    <>
      <style>
        {`
          .modal-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .modal-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .modal-scrollbar::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
          }
          .modal-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: rgba(255, 255, 255, 0.2);
          }
        `}
      </style>
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto py-8 transition-all duration-200 ease-out ${
          isAnimating
            ? "bg-black/0 backdrop-blur-0"
            : "bg-black/70 backdrop-blur-sm"
        }`}
        onClick={handleBackdropClick}
      >
        <div
          className={`modal-scrollbar relative w-full max-w-md p-4 mx-auto bg-black/90 border border-white/10 rounded-sm my-auto max-h-[90vh] overflow-y-auto shadow-lg transition-all duration-200 ease-out transform ${
            isAnimating
              ? "scale-95 opacity-0 translate-y-4"
              : "scale-100 opacity-100 translate-y-0"
          }`}
          onClick={(e) => e.stopPropagation()}
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255, 255, 255, 0.1) transparent",
          }}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute p-2 text-main-light-text transition-all duration-200 rounded-sm top-4 right-4 hover:text-main-accent hover:bg-white/10 hover:scale-110 active:scale-95"
          >
            <Icon icon="mingcute:close-line" width={20} height={20} />
          </button>

          {/* Header */}
          <div className="mb-4">
            <h2 className="text-lg font-bold text-main-text font-tiktok">
              Launch Token
            </h2>
            <p className="text-xs text-main-light-text mt-1">
              Configure your token and launch it instantly
            </p>
          </div>

          {/* Form */}
          <div className="space-y-3">
            {/* Token Name and Symbol */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block mb-1 text-xs text-main-light-text font-tiktok">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Token name"
                  className="w-full px-2 py-1.5 text-sm text-main-text bg-black/60 border border-white/20 rounded-sm focus:outline-none focus:border-main-accent/50 transition-all duration-200 placeholder:text-main-light-text/50 hover:border-white/30"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                />
              </div>
              <div className="w-1/3">
                <label className="block mb-1 text-xs text-main-light-text font-tiktok">
                  Symbol
                </label>
                <input
                  type="text"
                  placeholder="Symbol"
                  className="w-full px-2 py-1.5 text-sm text-main-text bg-black/60 border border-white/20 rounded-sm focus:outline-none focus:border-main-accent/50 transition-all duration-200 placeholder:text-main-light-text/50 hover:border-white/30"
                  value={tokenSymbol}
                  onChange={(e) => setTokenSymbol(e.target.value)}
                />
              </div>
            </div>

            {/* Website */}
            <div>
              <label className="block mb-1 text-xs text-main-light-text font-tiktok">
                Website (optional)
              </label>
              <input
                type="text"
                placeholder="https://example.com"
                className="w-full px-2 py-1.5 text-sm text-main-text bg-black/60 border border-white/20 rounded-sm focus:outline-none focus:border-main-accent/50 transition-all duration-200 placeholder:text-main-light-text/50 hover:border-white/30"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            {/* Twitter URL */}
            <div>
              <label className="block mb-1 text-xs text-main-light-text font-tiktok">
                Twitter URL
              </label>
              <input
                type="text"
                placeholder="https://x.com/BullyEsq/status/195689286339850928"
                className="w-full px-2 py-1.5 text-sm text-main-text bg-black/60 border border-white/20 rounded-sm focus:outline-none focus:border-main-accent/50 transition-all duration-200 placeholder:text-main-light-text/50 hover:border-white/30"
                value={twitterUrl}
                onChange={(e) => setTwitterUrl(e.target.value)}
              />
              <div className="flex justify-end mt-1">
                <a
                  href={twitterUrl}
                  className="text-xs text-main-accent hover:text-main-highlight transition-all duration-200 flex items-center gap-1 hover:scale-105 transform"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Tweet{" "}
                  <Icon
                    icon="mingcute:external-link-line"
                    className="inline"
                    width={10}
                  />
                </a>
              </div>
            </div>

            {/* Image Selection */}
            <div className="mt-[-12px]">
              <label className="block mb-2 text-xs text-main-light-text font-tiktok">
                Select Image
              </label>
              <div className="flex gap-2 mb-2">
                {images?.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageSelect(index)}
                    className={`w-14 h-14 overflow-hidden border rounded-sm transition-all duration-200 transform hover:scale-105 ${
                      selectedImage === index
                        ? "border-main-accent shadow-lg shadow-main-accent/20 scale-105"
                        : "border-white/20 hover:border-white/40"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Token image ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
              <div className="flex gap-1">
                <button className="flex items-center justify-center gap-1 px-2 py-1 text-xs text-main-text bg-black/60 border border-white/20 rounded-sm hover:bg-black/80 hover:border-white/30 transition-all duration-200 hover:scale-105 transform active:scale-95">
                  <Icon icon="mingcute:upload-line" width={12} /> Upload
                </button>
                <button className="flex items-center justify-center gap-1 px-2 py-1 text-xs text-main-text bg-black/60 border border-white/20 rounded-sm hover:bg-black/80 hover:border-white/30 transition-all duration-200 hover:scale-105 transform active:scale-95">
                  <Icon icon="mingcute:search-line" width={12} /> Search
                </button>
                <button className="flex items-center justify-center gap-1 px-2 py-1 text-xs text-main-text bg-black/60 border border-white/20 rounded-sm hover:bg-black/80 hover:border-white/30 transition-all duration-200 hover:scale-105 transform active:scale-95">
                  <Icon icon="mingcute:image-line" width={12} /> Library
                </button>
                <button className="flex items-center justify-center gap-1 px-2 py-1 text-xs text-main-text bg-black/60 border border-white/20 rounded-sm hover:bg-black/80 hover:border-white/30 transition-all duration-200 hover:scale-105 transform active:scale-95">
                  <Icon icon="mingcute:code-line" width={12} /> ASCII
                </button>
              </div>
            </div>

            {/* Token Type Selection */}
            <div>
              <label className="block mb-2 text-xs text-main-light-text font-tiktok">
                Token Type
              </label>
              <div className="grid grid-cols-6 gap-1">
                {tokenTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleTokenTypeSelect(type.id)}
                    className={`flex flex-col items-center justify-center p-1.5 rounded-sm transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                      selectedTokenType === type.id
                        ? "bg-main-accent/20 border border-main-accent/50 text-main-accent scale-105"
                        : "bg-black/60 border border-white/20 text-main-light-text hover:bg-black/80 hover:border-white/30"
                    }`}
                  >
                    <Icon
                      icon={type.icon}
                      width={14}
                      height={14}
                      className={
                        selectedTokenType === type.id
                          ? "text-main-accent"
                          : "text-main-light-text"
                      }
                    />
                    <span
                      className={`mt-0.5 text-xs font-tiktok ${
                        selectedTokenType === type.id
                          ? "text-main-accent"
                          : "text-main-light-text"
                      }`}
                    >
                      {type.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Split Ratio */}
            <div className="flex items-center gap-3">
              {/* Split Ratio Button */}
              <button
                className="flex items-center gap-1 px-2 py-1 text-xs text-green-400 bg-black/40 border border-green-400/30 rounded hover:bg-green-400/10 transition-all duration-200 font-tiktok hover:scale-105 transform active:scale-95"
                onClick={() =>
                  setSplitRatio(splitRatio === "0:100" ? "50:50" : "0:100")
                }
              >
                <Icon icon="mdi:circle" className="w-2 h-2 text-green-400" />
                Split: {splitRatio}
              </button>

              {/* Auto Dump Button */}
              <button
                disabled
                className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 bg-black/40 border border-gray-500/30 rounded opacity-50 cursor-not-allowed font-tiktok"
              >
                <Icon icon="mdi:checkbox-blank-outline" className="w-3 h-3" />
                Auto dump
              </button>

              {/* SOL Amount with Slider */}
              <div className="flex items-center gap-2 flex-1">
                <Icon icon="mdi:link" className="w-3 h-3 text-white" />
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={solAmount}
                  onChange={(e) => setSolAmount(parseInt(e.target.value))}
                  className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer hover:bg-gray-500 transition-all duration-200"
                />
                <span className="text-xs text-white font-tiktok">
                  {solAmount}
                </span>
              </div>
            </div>

            {/* SOL Options */}
            <div>
              <label className="block mb-2 text-xs text-main-light-text font-tiktok opacity-50">
                SOL
              </label>
              <div className="flex gap-1">
                {solOptions.map((option) => (
                  <button
                    key={option}
                    disabled
                    className="flex-1 py-1.5 text-xs rounded-sm transition-all duration-200 font-tiktok bg-black/60 border border-white/20 text-main-light-text opacity-50 cursor-not-allowed"
                  >
                    {option} SOL
                  </button>
                ))}
                {/* Right Action Buttons */}
                <div className="flex gap-1 ml-2">
                  <button className="px-2 py-1.5 text-xs bg-black/60 border border-white/20 rounded-sm hover:bg-black/80 hover:border-white/30 transition-all duration-200 font-tiktok text-white hover:scale-105 transform active:scale-95">
                    <Icon icon="mdi:hashtag" className="w-3 h-3" />
                  </button>
                  <button className="px-2 py-1.5 text-xs bg-black/60 border border-white/20 rounded-sm hover:bg-black/80 hover:border-white/30 transition-all duration-200 font-tiktok text-white hover:scale-105 transform active:scale-95">
                    <Icon icon="mdi:pencil" className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default LaunchTokenModal;
