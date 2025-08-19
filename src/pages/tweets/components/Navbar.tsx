import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import SettingsModal from "./SettingsModal";
interface NavbarProps {
  isSettingsModalOpen: boolean;
  setIsSettingsModalOpen: (isOpen: boolean) => void;
}
const Navbar: React.FC<NavbarProps> = ({
  isSettingsModalOpen,
  setIsSettingsModalOpen,
}) => {
  return (
    <nav className="fixed top-0 left-0 w-screen z-50 px-2 md:px-6 py-4 bg-black/80 shadow-lg border-b border-white/10">
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
                    className="w-16 object-contain transition-transform duration-200"
                  />
                </div>
                <h2 className="text-2xl ml-[-16px] font-extrabold text-main-accent group-hover:text-main-highlight transition-all duration-200">
                  Hype Ignite
                </h2>
              </div>
            </Link>
          </div>

          {/* Settings Button */}
          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="flex items-center gap-3 px-5 py-3 bg-black/60 hover:bg-black/80 border border-white/20 hover:border-white/30 rounded-sm transition-all duration-200 group cursor-pointer"
          >
            <span className="font-tiktok text-sm text-main-light-text group-hover:text-main-accent transition-colors duration-200">
              Settings
            </span>
            <Icon
              icon="material-symbols:settings"
              className="w-5 h-5 text-main-light-text group-hover:text-main-accent transition-colors duration-200 group-hover:rotate-90 transition-transform duration-200"
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
