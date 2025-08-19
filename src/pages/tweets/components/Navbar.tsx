import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import SettingsModal from './SettingsModal';
interface NavbarProps {
  isSettingsModalOpen: boolean;
  setIsSettingsModalOpen: (isOpen: boolean) => void;
}
const Navbar: React.FC<NavbarProps> = ({ isSettingsModalOpen, setIsSettingsModalOpen }) => {
  return (
    <nav className="top-0 left-0 w-screen z-50 px-2 md:px-6 py-3 bg-main-bg bg-opacity-95 shadow-2xl border-b border-main-accent border-opacity-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="relative flex items-end gap-2">
                <div>

                  <img
                    src="/pure_logo_v2_double.png"
                    alt="logo"
                    className="w-14 object-contain"
                  />
                </div>
                <h2 className="text-2xl ml-[-14px] font-extrabold bg-gradient-to-r from-[#00b4d8] to-[#e0fbfc] bg-clip-text text-transparent">
                  Hype Ignite
                </h2>
              </div>
            </Link>
          </div>

          {/* Settings Button */}
          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.1] hover:border-main-accent/30 rounded-xl transition-all duration-300 group cursor-pointer"
          >
            <span className="font-tiktok text-sm text-main-light-text group-hover:text-main-accent transition-colors duration-300">
              Settings
            </span>
            <Icon
              icon="material-symbols:settings"
              className="w-5 h-5 text-main-light-text group-hover:text-main-accent transition-colors duration-300"
            />
          </button>
          
          {/* Settings Modal */}
          <SettingsModal 
            isOpen={isSettingsModalOpen} 
            onClose={() => setIsSettingsModalOpen(false)} 
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;