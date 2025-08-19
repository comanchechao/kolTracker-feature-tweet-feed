import React, { useState } from 'react';
import { Icon } from '@iconify/react';

interface AutomationProps {
  isMobile: boolean;
}

const Automation: React.FC<AutomationProps> = ({ isMobile }) => {
  const [farmSnipersEnabled, setFarmSnipersEnabled] = useState<boolean>(false);
  const [farmSnipersDelay, setFarmSnipersDelay] = useState<string>('0');
  const [multiDeployTokens, setMultiDeployTokens] = useState<string>('3');

  return (
    <div className={`${isMobile ? 'px-2' : ''}`}>
      {/* Farm Snipers */}
      <div className={`bg-white/[0.03] rounded-lg border border-white/[0.1] mb-4 ${
        isMobile ? 'p-3' : 'p-4'
      }`}>
        <div className={`flex items-center justify-between ${
          isMobile ? 'mb-3 flex-row md:flex-col sm:flex-row gap-3 sm:gap-0' : 'mb-4'
        }`}>
          <h3 className={`font-medium text-main-text ${
            isMobile ? 'text-base' : 'text-sm'
          }`}>Farm Snipers</h3>
          <div className="flex items-center gap-2">
            <span className={`text-main-light-text ${
              isMobile ? 'text-sm' : 'text-sm'
            }`}>{farmSnipersEnabled ? 'Enabled' : 'Disabled'}</span>
            <button
            onClick={() => setFarmSnipersEnabled(!farmSnipersEnabled)}
            className={`relative inline-block rounded-full transition-colors duration-200 ${
              isMobile ? 'w-10 h-6 touch-manipulation' : 'w-10 h-6'
            } ${
              farmSnipersEnabled ? 'bg-main-accent' : 'bg-white/10'
            }`}
          >
            <span
              className={`absolute rounded-full bg-white transition-transform duration-200 transform ${
                isMobile ? 'top-0.5 left-0.5 w-5 h-5' : 'top-0.5 left-0.5 w-5 h-5'
              } ${
                farmSnipersEnabled ? 'translate-x-4' : 'translate-x-0'
              }`}
            ></span>
          </button>
          </div>
        </div>
        <p className={`text-main-light-text mb-4 ${
          isMobile ? 'text-sm leading-relaxed' : 'text-sm'
        }`}>Dump all purchased tokens from your dev wallet immediately after creation.</p>

        <div className="mb-4">
          <label className={`text-main-light-text mb-2 block ${
            isMobile ? 'text-sm font-medium' : 'text-sm'
          }`}>Delay (ms, optional)</label>
          <input
            type="text"
            value={farmSnipersDelay}
            onChange={(e) => setFarmSnipersDelay(e.target.value)}
            placeholder="0"
            className={`w-full bg-white/[0.03] border border-white/[0.1] rounded-lg text-main-light-text placeholder-main-light-text/50 appearance-none focus:outline-none focus:border-main-accent transition-colors duration-200 ${
              isMobile ? 'p-3 text-base' : 'p-2 text-sm'
            }`}
          />
        </div>
      </div>

      {/* Multi Deploy */}
      <div className={`bg-white/[0.03] rounded-lg border border-white/[0.1] mb-4 ${
        isMobile ? 'p-3' : 'p-4'
      }`}>
        <div className={`flex items-center justify-between ${
          isMobile ? 'mb-3' : 'mb-4'
        }`}>
          <h3 className={`font-medium text-main-text ${
            isMobile ? 'text-base' : 'text-sm'
          }`}>Multi Deploy</h3>
        </div>
        <p className={`text-main-light-text mb-4 ${
          isMobile ? 'text-sm leading-relaxed' : 'text-sm'
        }`}>Set how many copies of the same token to deploy at once when confirming a launch.</p>

        <div className="mb-4">
          <label className={`text-main-light-text mb-2 block ${
            isMobile ? 'text-sm font-medium' : 'text-sm'
          }`}>Number of tokens</label>
          <input
            type="text"
            value={multiDeployTokens}
            onChange={(e) => setMultiDeployTokens(e.target.value)}
            placeholder="3"
            className={`w-full bg-white/[0.03] border border-white/[0.1] rounded-lg text-main-light-text placeholder-main-light-text/50 appearance-none focus:outline-none focus:border-main-accent transition-colors duration-200 ${
              isMobile ? 'p-3 text-base' : 'p-2 text-sm'
            }`}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className={`flex items-center justify-center gap-1 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.1] rounded-lg text-main-light-text transition-colors duration-200 ${
          isMobile ? 'px-6 py-3 text-base touch-manipulation' : 'px-4 py-2 text-sm'
        }`}>
          <Icon icon="material-symbols:save" className={`${
            isMobile ? 'w-5 h-5' : 'w-4 h-4'
          }`} />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
};

export default Automation;