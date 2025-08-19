import React, { useState } from 'react';
import { Icon } from '@iconify/react';

interface FiltersProps {
  isMobile: boolean;
}

const Filters: React.FC<FiltersProps> = ({ isMobile }) => {
  const [tokenSymbolsEnabled, setTokenSymbolsEnabled] = useState<boolean>(true);
  const [mintAddressesEnabled, setMintAddressesEnabled] = useState<boolean>(true);
  const [isKeywordModalOpen, setIsKeywordModalOpen] = useState<boolean>(false);
  const [keywordInput, setKeywordInput] = useState<string>('');
  const [keywordColor, setKeywordColor] = useState<string>('#22c55e');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [wholeWordsOnly, setWholeWordsOnly] = useState<boolean>(false);
  // Reset keyword modal state when settings modal closes
  /* useEffect(() => {
    if (!isOpen) {
      setIsKeywordModalOpen(false);
      setKeywordInput('');
      setKeywordColor('#22c55e');
      setCaseSensitive(false);
      setWholeWordsOnly(false);
    }
  }, [isOpen]); */
  return (
    <div className={`${isMobile ? 'px-2' : ''}`}>
      {/* Filters Settings */}
      <div className={`bg-white/[0.03] rounded-lg border border-white/[0.1] mb-4 ${
        isMobile ? 'p-3' : 'p-4'
      }`}>
        <div className={`flex items-center justify-between ${
          isMobile ? 'mb-3' : 'mb-4'
        }`}>
          <div className="flex items-center gap-2">
            <Icon icon="material-symbols:filter-list" className={`text-main-accent ${
              isMobile ? 'w-6 h-6' : 'w-5 h-5'
            }`} />
            <h3 className={`font-medium text-main-text ${
              isMobile ? 'text-base' : 'text-sm'
            }`}>Content Filters</h3>
          </div>
        </div>
        <p className={`text-main-light-text mb-4 ${
          isMobile ? 'text-sm leading-relaxed' : 'text-sm'
        }`}>Customize the filters and highlights in your tweet feed</p>

        <div className={`flex justify-between items-center ${
          isMobile ? 'mb-4' : 'mb-3'
        }`}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className={`text-main-text ${
              isMobile ? 'text-sm font-medium' : 'text-sm'
            }`}>Token Symbols</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-main-light-text ${
              isMobile ? 'text-sm' : 'text-sm'
            }`}>{tokenSymbolsEnabled ? 'Enabled' : 'Disabled'}</span>
            <button
            onClick={() => setTokenSymbolsEnabled(!tokenSymbolsEnabled)}
            className={`relative inline-block rounded-full transition-colors duration-200 ${
              isMobile ? 'w-10 h-6 touch-manipulation' : 'w-10 h-6'
            } ${
              tokenSymbolsEnabled ? 'bg-main-accent' : 'bg-white/10'
            }`}
          >
            <span
              className={`absolute rounded-full bg-white transition-transform duration-200 transform ${
                isMobile ? 'top-0.5 left-0.5 w-5 h-5' : 'top-0.5 left-0.5 w-5 h-5'
              } ${
                tokenSymbolsEnabled ? 'translate-x-4' : 'translate-x-0'
              }`}
            ></span>
          </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className={`text-main-text ${
              isMobile ? 'text-sm font-medium' : 'text-sm'
            }`}>Mint Addresses</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-main-light-text ${
              isMobile ? 'text-sm' : 'text-sm'
            }`}>{mintAddressesEnabled ? 'Enabled' : 'Disabled'}</span>
            <button
            onClick={() => setMintAddressesEnabled(!mintAddressesEnabled)}
            className={`relative inline-block rounded-full transition-colors duration-200 ${
              isMobile ? 'w-10 h-6 touch-manipulation' : 'w-10 h-6'
            } ${
              mintAddressesEnabled ? 'bg-main-accent' : 'bg-white/10'
            }`}
          >
            <span
              className={`absolute rounded-full bg-white transition-transform duration-200 transform ${
                isMobile ? 'top-0.5 left-0.5 w-5 h-5' : 'top-0.5 left-0.5 w-5 h-5'
              } ${
                mintAddressesEnabled ? 'translate-x-4' : 'translate-x-0'
              }`}
            ></span>
          </button>
          </div>
        </div>
      </div>

      {/* Custom Keywords */}
      <div className={`bg-white/[0.03] rounded-lg border border-white/[0.1] ${
        isMobile ? 'p-3' : 'p-4'
      }`}>
        <div className={`flex items-center justify-between ${
          isMobile ? 'mb-3 flex-col sm:flex-row gap-3 sm:gap-0' : 'mb-4'
        }`}>
          <h3 className={`font-medium text-main-text ${
            isMobile ? 'text-base' : 'text-sm'
          }`}>Custom Keywords</h3>
          <button
            onClick={() => setIsKeywordModalOpen(true)}
            className={`bg-white/[0.03] hover:bg-white/[0.06] text-main-light-text rounded-full font-medium transition-colors duration-200 flex items-center gap-1 ${
              isMobile ? 'px-4 py-2 text-sm touch-manipulation' : 'px-3 py-1 text-xs'
            }`}
          >
            <Icon icon="material-symbols:add" className={`${
              isMobile ? 'w-5 h-5' : 'w-4 h-4'
            }`} />
            <span>Add Keyword</span>
          </button>
        </div>

        <div className={`flex flex-col items-center justify-center text-main-light-text ${
          isMobile ? 'py-6' : 'py-8'
        }`}>
          <Icon icon="material-symbols:tag" className={`mb-2 opacity-30 ${
            isMobile ? 'w-10 h-10' : 'w-8 h-8'
          }`} />
          <p className={`${
            isMobile ? 'text-base' : 'text-sm'
          }`}>No custom keywords yet</p>
          <p className={`opacity-70 ${
            isMobile ? 'text-sm' : 'text-xs'
          }`}>Keywords will highlight relevant tweets</p>
        </div>
      </div>

      {/* Keyword Filter Modal */}
      {isKeywordModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`bg-main-bg border border-white/[0.1] rounded-lg shadow-xl ${
            isMobile ? 'w-full max-w-sm p-4' : 'w-96 p-6'
          }`}>
            <div className={`flex items-center justify-between ${
              isMobile ? 'mb-4' : 'mb-6'
            }`}>
              <h3 className={`font-medium text-main-text ${
                isMobile ? 'text-lg' : 'text-xl'
              }`}>Add Keyword Filter</h3>
              <button
                onClick={() => setIsKeywordModalOpen(false)}
                className="text-main-light-text hover:text-main-text transition-colors duration-200"
              >
                <Icon icon="material-symbols:close" className={`${
                  isMobile ? 'w-6 h-6' : 'w-5 h-5'
                }`} />
              </button>
            </div>

            <div className={`space-y-4 ${
              isMobile ? 'mb-6' : 'mb-8'
            }`}>
              <div>
                <label className={`text-main-text mb-2 block ${
                  isMobile ? 'text-sm font-medium' : 'text-sm'
                }`}>Keyword</label>
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  placeholder="Enter keyword..."
                  className={`w-full bg-white/[0.03] border border-white/[0.1] rounded-lg text-main-light-text placeholder-main-light-text/50 focus:outline-none focus:border-main-accent transition-colors duration-200 ${
                    isMobile ? 'p-3 text-base' : 'p-2 text-sm'
                  }`}
                />
              </div>

              <div>
                <label className={`text-main-text mb-2 block ${
                  isMobile ? 'text-sm font-medium' : 'text-sm'
                }`}>Highlight Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={keywordColor}
                    onChange={(e) => setKeywordColor(e.target.value)}
                    className={`border border-white/[0.1] rounded cursor-pointer ${
                      isMobile ? 'w-12 h-10' : 'w-10 h-8'
                    }`}
                  />
                  <span className={`text-main-light-text ${
                    isMobile ? 'text-sm' : 'text-xs'
                  }`}>{keywordColor}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className={`text-main-text ${
                  isMobile ? 'text-sm font-medium' : 'text-sm'
                }`}>Case sensitive</label>
                <div
                  className={`rounded-full flex items-center p-1 cursor-pointer transition-colors duration-200 ${
                    isMobile ? 'w-12 h-7' : 'w-10 h-6'
                  } ${
                    caseSensitive ? 'bg-main-accent' : 'bg-white/[0.1]'
                  }`}
                  onClick={() => setCaseSensitive(!caseSensitive)}
                >
                  <div
                    className={`rounded-full bg-white transition-transform duration-200 ${
                      isMobile ? 'w-5 h-5' : 'w-4 h-4'
                    } ${
                      caseSensitive ? (isMobile ? 'translate-x-5' : 'translate-x-4') : 'translate-x-0'
                    }`}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className={`text-main-text ${
                  isMobile ? 'text-sm font-medium' : 'text-sm'
                }`}>Whole words only</label>
                <div
                  className={`rounded-full flex items-center p-1 cursor-pointer transition-colors duration-200 ${
                    isMobile ? 'w-12 h-7' : 'w-10 h-6'
                  } ${
                    wholeWordsOnly ? 'bg-main-accent' : 'bg-white/[0.1]'
                  }`}
                  onClick={() => setWholeWordsOnly(!wholeWordsOnly)}
                >
                  <div
                    className={`rounded-full bg-white transition-transform duration-200 ${
                      isMobile ? 'w-5 h-5' : 'w-4 h-4'
                    } ${
                      wholeWordsOnly ? (isMobile ? 'translate-x-5' : 'translate-x-4') : 'translate-x-0'
                    }`}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setIsKeywordModalOpen(false)}
                className={`text-main-light-text hover:text-main-text transition-colors duration-200 ${
                  isMobile ? 'px-4 py-2 text-base' : 'px-4 py-2 text-sm'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Add keyword filter logic here
                  setIsKeywordModalOpen(false);
                }}
                disabled={!keywordInput.trim()}
                className={`rounded-lg font-medium transition-colors duration-200 ${
                  isMobile ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm'
                } ${
                  keywordInput.trim() 
                    ? 'bg-main-accent hover:bg-main-accent/90 text-white' 
                    : 'bg-white/[0.03] text-main-light-text/50 cursor-not-allowed'
                }`}
              >
                Add Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;