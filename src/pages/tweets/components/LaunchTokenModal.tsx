import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { createPortal } from "react-dom";

interface LaunchTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTwitterUrl?: string;
  initialTokenName?: string;
  initialTokenSymbol?: string;
}

const LaunchTokenModal: React.FC<LaunchTokenModalProps> = ({
  isOpen,
  onClose,
  initialTwitterUrl = "",
  initialTokenName = "",
  initialTokenSymbol = "",
}) => {
  const [tokenName, setTokenName] = useState(initialTokenName);
  const [tokenSymbol, setTokenSymbol] = useState(initialTokenSymbol);
  const [website, setWebsite] = useState("");
  const [twitterUrl, setTwitterUrl] = useState(initialTwitterUrl);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [splitRatio] = useState("0:100");
  const [autoDump, setAutoDump] = useState(false);
  const [sliderValue, setSliderValue] = useState(3);

  // Sample images for selection
  const sampleImages = ["/cherryLogo.png", "/logoKOL.png"];

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
  const [selectedSolOption, setSelectedSolOption] = useState<number | null>(
    null
  );

  // Update state when initial values change
  useEffect(() => {
    setTokenName(initialTokenName);
    setTokenSymbol(initialTokenSymbol);
    setTwitterUrl(initialTwitterUrl);
  }, [initialTokenName, initialTokenSymbol, initialTwitterUrl]);

  if (!isOpen) return null;

  const handleImageSelect = (index: number) => {
    setSelectedImage(index);
  };

  const handleTokenTypeSelect = (id: string) => {
    setSelectedTokenType(id);
  };

  const handleSolOptionSelect = (option: number) => {
    setSelectedSolOption(option);
  };

  const handleLaunchToken = () => {
    // Implement token launch logic here
    console.log({
      tokenName,
      tokenSymbol,
      website,
      twitterUrl,
      selectedImage,
      selectedTokenType,
      splitRatio,
      autoDump,
      sliderValue,
      selectedSolOption,
    });
    onClose();
  };

  // Handle click outside to close modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
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
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 overflow-y-auto py-8"
        onClick={handleBackdropClick}
      >
        <div
          className="modal-scrollbar relative w-full max-w-3xl p-6 mx-auto bg-black/90 border border-white/10 rounded-sm my-auto max-h-[90vh] overflow-y-auto shadow-lg"
          onClick={(e) => e.stopPropagation()}
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255, 255, 255, 0.1) transparent",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute p-2 text-main-light-text transition-colors rounded-sm top-4 right-4 hover:text-main-accent hover:bg-white/10"
          >
            <Icon icon="mingcute:close-line" width={20} height={20} />
          </button>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-main-text font-tiktok">
              Launch Token
            </h2>
            <p className="text-sm text-main-light-text mt-1">
              Configure your token and launch it instantly
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Token Name and Symbol */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-2 text-sm text-main-light-text font-tiktok">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Token name"
                  className="w-full px-3 py-2 text-main-text bg-black/60 border border-white/20 rounded-sm focus:outline-none focus:border-main-accent/50 transition-all duration-200 placeholder:text-main-light-text/50"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                />
              </div>
              <div className="w-1/3">
                <label className="block mb-2 text-sm text-main-light-text font-tiktok">
                  Symbol
                </label>
                <input
                  type="text"
                  placeholder="Symbol"
                  className="w-full px-3 py-2 text-main-text bg-black/60 border border-white/20 rounded-sm focus:outline-none focus:border-main-accent/50 transition-all duration-200 placeholder:text-main-light-text/50"
                  value={tokenSymbol}
                  onChange={(e) => setTokenSymbol(e.target.value)}
                />
              </div>
            </div>

            {/* Website */}
            <div>
              <label className="block mb-2 text-sm text-main-light-text font-tiktok">
                Website (optional)
              </label>
              <input
                type="text"
                placeholder="https://example.com"
                className="w-full px-3 py-2 text-main-text bg-black/60 border border-white/20 rounded-sm focus:outline-none focus:border-main-accent/50 transition-all duration-200 placeholder:text-main-light-text/50"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            {/* Twitter URL */}
            <div>
              <label className="block mb-2 text-sm text-main-light-text font-tiktok">
                Twitter URL
              </label>
              <input
                type="text"
                placeholder="https://x.com/BullyEsq/status/195689286339850928"
                className="w-full px-3 py-2 text-main-text bg-black/60 border border-white/20 rounded-sm focus:outline-none focus:border-main-accent/50 transition-all duration-200 placeholder:text-main-light-text/50"
                value={twitterUrl}
                onChange={(e) => setTwitterUrl(e.target.value)}
              />
              <div className="flex justify-end mt-2">
                <a
                  href={twitterUrl}
                  className="text-xs text-main-accent hover:text-main-highlight transition-colors duration-200 flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Tweet{" "}
                  <Icon
                    icon="mingcute:external-link-line"
                    className="inline"
                    width={12}
                  />
                </a>
              </div>
            </div>

            {/* Image Selection */}
            <div>
              <label className="block mb-3 text-sm text-main-light-text font-tiktok">
                Select Image
              </label>
              <div className="flex gap-3 mb-3">
                {sampleImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageSelect(index)}
                    className={`w-14 h-14 overflow-hidden border rounded-sm transition-all duration-200 ${
                      selectedImage === index
                        ? "border-main-accent shadow-lg shadow-main-accent/20"
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
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-main-text bg-black/60 border border-white/20 rounded-sm hover:bg-black/80 hover:border-white/30 transition-all duration-200">
                  <Icon icon="mingcute:upload-line" /> Upload
                </button>
                <button className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-main-text bg-black/60 border border-white/20 rounded-sm hover:bg-black/80 hover:border-white/30 transition-all duration-200">
                  <Icon icon="mingcute:search-line" /> Search
                </button>
                <button className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-main-text bg-black/60 border border-white/20 rounded-sm hover:bg-black/80 hover:border-white/30 transition-all duration-200">
                  <Icon icon="mingcute:image-line" /> Library
                </button>
                <button className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-main-text bg-black/60 border border-white/20 rounded-sm hover:bg-black/80 hover:border-white/30 transition-all duration-200">
                  <Icon icon="mingcute:code-line" /> ASCII
                </button>
              </div>
            </div>

            {/* Token Type Selection */}
            <div>
              <label className="block mb-3 text-sm text-main-light-text font-tiktok">
                Token Type
              </label>
              <div className="grid grid-cols-6 gap-2">
                {tokenTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleTokenTypeSelect(type.id)}
                    className={`flex flex-col items-center justify-center p-2 rounded-sm transition-all duration-200 ${
                      selectedTokenType === type.id
                        ? "bg-main-accent/20 border border-main-accent/50 text-main-accent"
                        : "bg-black/60 border border-white/20 text-main-light-text hover:bg-black/80 hover:border-white/30"
                    }`}
                  >
                    <Icon
                      icon={type.icon}
                      width={18}
                      height={18}
                      className={
                        selectedTokenType === type.id
                          ? "text-main-accent"
                          : "text-main-light-text"
                      }
                    />
                    <span
                      className={`mt-1 text-xs font-tiktok ${
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
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm text-main-light-text font-tiktok">
                  Split: 0:100
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="autoDump"
                    checked={autoDump}
                    onChange={() => setAutoDump(!autoDump)}
                    className="w-4 h-4 mr-2 bg-black/60 border-white/20 rounded-sm text-main-accent focus:ring-main-accent/50 focus:ring-2"
                  />
                  <label
                    htmlFor="autoDump"
                    className="text-sm text-main-light-text font-tiktok"
                  >
                    Auto dump
                  </label>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                value={sliderValue}
                onChange={(e) => setSliderValue(parseInt(e.target.value))}
                className="w-full h-2 bg-black/60 rounded-sm appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, var(--color-main-accent) 0%, var(--color-main-accent) ${
                    (sliderValue / 5) * 100
                  }%, rgba(255, 255, 255, 0.1) ${
                    (sliderValue / 5) * 100
                  }%, rgba(255, 255, 255, 0.1) 100%)`,
                }}
              />
              <div className="flex justify-end mt-2">
                <span className="text-sm text-main-light-text font-tiktok">
                  {sliderValue}
                </span>
              </div>
            </div>

            {/* SOL Options */}
            <div>
              <label className="block mb-3 text-sm text-main-light-text font-tiktok">
                SOL
              </label>
              <div className="flex gap-2">
                {solOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSolOptionSelect(option)}
                    className={`flex-1 py-2 text-sm rounded-sm transition-all duration-200 font-tiktok ${
                      selectedSolOption === option
                        ? "bg-main-accent/20 border border-main-accent/50 text-main-accent"
                        : "bg-black/60 border border-white/20 text-main-light-text hover:bg-black/80 hover:border-white/30"
                    }`}
                  >
                    {option} SOL
                  </button>
                ))}
              </div>
            </div>

            {/* Launch Button */}
            <button
              onClick={handleLaunchToken}
              className="w-full py-3 mt-6 text-sm font-medium text-white transition-all duration-200 bg-main-accent/90 hover:bg-main-accent border border-main-accent/50 hover:border-main-accent rounded-sm focus:outline-none focus:ring-2 focus:ring-main-accent/50 focus:ring-offset-2 focus:ring-offset-black/90 font-tiktok"
            >
              Launch Token
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default LaunchTokenModal;
