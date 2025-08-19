import React from 'react';
import { Icon } from '@iconify/react';

interface WalletsProps {
  isMobile: boolean;
}

const Wallets: React.FC<WalletsProps> = ({ isMobile }) => {
  return (
    <div>
      {/* Wallets Settings */}
      <div className="bg-white/[0.03] rounded-lg p-4 border border-white/[0.1] mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon icon="material-symbols:wallet" className="w-5 h-5 text-main-accent" />
            <h3 className="font-medium text-main-text">Connected Wallets</h3>
          </div>
          <button className="px-3 py-1 bg-main-accent/20 hover:bg-main-accent/30 text-main-accent rounded-full text-xs font-medium transition-colors duration-200">
            Connect Wallet
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg border border-white/[0.05] mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-main-accent/20 flex items-center justify-center">
              <Icon icon="cryptocurrency:sol" className="w-5 h-5 text-main-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-main-text">0x8B3...F7E9</p>
              <p className="text-xs text-main-light-text">SOL</p>
            </div>
          </div>
          <button className="text-main-light-text hover:text-main-accent">
            <Icon icon="material-symbols:delete-outline" className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center py-4 text-sm text-main-light-text">
          <Icon icon="material-symbols:wallet-outline" className="w-6 h-6 mx-auto mb-2 opacity-50" />
          <p>No wallets yet</p>
        </div>

        <div className="flex gap-2 mt-4">
          <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.1] rounded-lg text-sm text-main-light-text transition-colors duration-200">
            <Icon icon="material-symbols:upload" className="w-4 h-4" />
            <span>Import</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.1] rounded-lg text-sm text-main-light-text transition-colors duration-200">
            <Icon icon="material-symbols:shopping-cart-outline" className="w-4 h-4" />
            <span>Buy Presets</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wallets;