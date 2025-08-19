import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { createPortal } from 'react-dom';

interface LaunchTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTwitterUrl?: string;
}

const LaunchTokenModal: React.FC<LaunchTokenModalProps> = ({ isOpen, onClose, initialTwitterUrl = '' }) => {
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [website, setWebsite] = useState('');
  const [twitterUrl, setTwitterUrl] = useState(initialTwitterUrl);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [splitRatio, setSplitRatio] = useState('0:100');
  const [autoDump, setAutoDump] = useState(false);
  const [sliderValue, setSliderValue] = useState(3);

  // Sample images for selection
  const sampleImages = [
    '/cherryLogo.png',
    '/logoKOL.png'
  ];

  // Token types
  const tokenTypes = [
    { id: 'pump', name: 'Pump', icon: 'mdi:arrow-up-bold' },
    { id: 'bonk', name: 'Bonk', icon: 'mdi:dog' },
    { id: 'jup', name: 'Jup', icon: 'mdi:star' },
    { id: 'moonit', name: 'Moonit', icon: 'mdi:rocket' },
    { id: 'rags', name: 'Rags', icon: 'mdi:cash' },
    { id: 'heaven', name: 'Heaven', icon: 'mdi:cloud' }
  ];

  const [selectedTokenType, setSelectedTokenType] = useState<string | null>(null);

  // SOL options
  const solOptions = [1, 3, 5];
  const [selectedSolOption, setSelectedSolOption] = useState<number | null>(null);
 
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
      selectedSolOption
    });
    onClose();
  };

  // Create portal for the modal to render at the document body level
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-8">
      <div className="relative w-full max-w-md p-6 mx-auto bg-black border border-gray-800 rounded-xl my-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute p-1 text-gray-400 transition-colors rounded-full top-4 right-4 hover:text-white hover:bg-gray-800"
        >
          <Icon icon="mingcute:close-line" width={20} height={20} />
        </button>

        {/* Header */}
        <h2 className="mb-6 text-xl font-bold text-white">Launch Token</h2>
        <p className="mb-6 text-sm text-gray-400">Configure your token and launch it instantly</p>

        {/* Form */}
        <div className="space-y-4">
          {/* Token Name and Symbol */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 text-sm text-gray-400">Name</label>
              <input
                type="text"
                placeholder="Token name"
                className="w-full px-3 py-2 text-white bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
              />
            </div>
            <div className="w-1/3">
              <label className="block mb-1 text-sm text-gray-400">Symbol</label>
              <input
                type="text"
                placeholder="Symbol"
                className="w-full px-3 py-2 text-white bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value)}
              />
            </div>
          </div>

          {/* Website */}
          <div>
            <label className="block mb-1 text-sm text-gray-400">Website (optional)</label>
            <input
              type="text"
              placeholder="https://example.com"
              className="w-full px-3 py-2 text-white bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          {/* Twitter URL */}
          <div>
            <label className="block mb-1 text-sm text-gray-400">Twitter URL</label>
            <input
              type="text"
              placeholder="https://x.com/BullyEsq/status/195689286339850928"
              className="w-full px-3 py-2 text-white bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={twitterUrl}
              onChange={(e) => setTwitterUrl(e.target.value)}
            />
            <div className="flex justify-end mt-1">
              <a 
                href={twitterUrl} 
                className="text-xs text-blue-400 hover:underline" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                View Tweet <Icon icon="mingcute:external-link-line" className="inline" width={12} />
              </a>
            </div>
          </div>

          {/* Image Selection */}
          <div>
            <label className="block mb-2 text-sm text-gray-400">Select Image</label>
            <div className="flex gap-2 mb-2">
              {sampleImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => handleImageSelect(index)}
                  className={`w-12 h-12 overflow-hidden border rounded-md ${selectedImage === index ? 'border-blue-500' : 'border-gray-700'}`}
                >
                  <img src={img} alt={`Token image ${index + 1}`} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="flex items-center justify-center w-full gap-1 px-3 py-2 text-sm text-white bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700">
                <Icon icon="mingcute:upload-line" /> Upload
              </button>
              <button className="flex items-center justify-center w-full gap-1 px-3 py-2 text-sm text-white bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700">
                <Icon icon="mingcute:search-line" /> Search
              </button>
              <button className="flex items-center justify-center w-full gap-1 px-3 py-2 text-sm text-white bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700">
                <Icon icon="mingcute:image-line" /> Lib
              </button>
              <button className="flex items-center justify-center w-full gap-1 px-3 py-2 text-sm text-white bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700">
                <Icon icon="mingcute:code-line" /> ASCII
              </button>
            </div>
          </div>

          {/* Token Type Selection */}
          <div>
            <label className="block mb-2 text-sm text-gray-400">Token Type</label>
            <div className="grid grid-cols-6 gap-2">
              {tokenTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTokenTypeSelect(type.id)}
                  className={`flex flex-col items-center justify-center p-2 rounded-md ${selectedTokenType === type.id ? 'bg-blue-500/20 border border-blue-500/50' : 'bg-gray-800 border border-gray-700 hover:bg-gray-700'}`}
                >
                  <Icon icon={type.icon} width={20} height={20} className={selectedTokenType === type.id ? 'text-blue-400' : 'text-gray-400'} />
                  <span className={`mt-1 text-xs ${selectedTokenType === type.id ? 'text-blue-400' : 'text-gray-400'}`}>{type.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Split Ratio */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-400">Split: 0:100</label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoDump"
                  checked={autoDump}
                  onChange={() => setAutoDump(!autoDump)}
                  className="w-4 h-4 mr-2 bg-gray-800 border-gray-700 rounded text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor="autoDump" className="text-sm text-gray-400">Auto dump</label>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              value={sliderValue}
              onChange={(e) => setSliderValue(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-end mt-1">
              <span className="text-sm text-gray-400">{sliderValue}</span>
            </div>
          </div>

          {/* SOL Options */}
          <div>
            <label className="block mb-2 text-sm text-gray-400">SOL</label>
            <div className="flex gap-2">
              {solOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSolOptionSelect(option)}
                  className={`flex-1 py-2 text-sm rounded-md ${selectedSolOption === option ? 'bg-blue-500/20 border border-blue-500/50 text-blue-400' : 'bg-gray-800 border border-gray-700 text-gray-400 hover:bg-gray-700'}`}
                >
                  {option} SOL
                </button>
              ))}
            </div>
          </div>

          {/* Launch Button */}
          <button
            onClick={handleLaunchToken}
            className="w-full py-3 mt-4 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Launch Token
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LaunchTokenModal;