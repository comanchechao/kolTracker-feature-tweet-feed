import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

import UnifiedAuth from "../components/UnifiedAuth";
import SettingsDropdown from "../components/SettingsDropdown";
import HoldingsSidebar from "../components/HoldingsSidebar";
import { useAuth } from "../components/AuthProvider";
import { useDepositModal } from "../contexts/DepositModalContext";

const Navbar: React.FC = React.memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [holdingsSidebarOpen, setHoldingsSidebarOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { openModal } = useDepositModal();

  const refreshPageData = () => {
    console.log("🔄 Refreshing page data after trade completion");

    setRefreshKey((prev) => prev + 1);

    if (
      location.pathname.startsWith("/accounts/") ||
      location.pathname === "/tokens" ||
      location.pathname === "/trades"
    ) {
      window.location.reload();
    }
  };

  useEffect(() => {
    if (refreshKey > 0) {
      console.log("Page refresh triggered by refreshKey change:", refreshKey);
    }
  }, [refreshKey]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActivePath = (path: string) => {
    if (location.pathname === path) {
      return true;
    }
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path + "/");
  };

  const getDesktopLinkClasses = (path: string) => {
    const baseClasses =
      "px-4 py-1 font-tiktok text-sm transition-all duration-300 font-light relative nav-link rounded-sm";
    const activeClasses = isActivePath(path)
      ? "text-main-accent bg-[var(--color-main-accent)]/20 border-b-4 border-main-accent"
      : "text-main-light-text  hover:text-main-accent hover:bg-main-accent hover:bg-opacity-5";

    return `${baseClasses} ${activeClasses}`;
  };

  const getMobileLinkClasses = (path: string) => {
    const baseClasses =
      "block py-3 px-4 font-tiktok text-sm transition-all duration-300 rounded-lg";
    const activeClasses = isActivePath(path)
      ? "text-main-text bg-main-accent bg-opacity-20 border-l-4 border-main-highlight shadow-[0_0_10px_var(--color-main-accent)]"
      : "text-main-light-text hover:text-main-accent hover:bg-main-accent hover:bg-opacity-5";

    return `${baseClasses} ${activeClasses}`;
  };

  return (
    <>
      <nav
        className={`  top-0 left-0 w-screen   z-50 px-2 md:px-6 transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-main-bg bg-opacity-95   shadow-2xl border-b border-main-accent border-opacity-50"
            : "py-4 bg-main-bg border-b border-main-bg  bg-opacity-80  "
        }`}
      >
        <div className="max-w-7xl xl:max-w-[99rem] mx-auto px-4 sm:px-2 lg:px-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center group">
                <div className="relative flex items-end gap-2">
                  <img
                    src="/cherryLogo.png"
                    alt="logo"
                    className="w-7 object-contain"
                  />
                  <h2 className="text-2xl font-extrabold bg-gradient-to-r from-[#00b4d8] to-[#e0fbfc] bg-clip-text text-transparent">
                    Cherry KOLs
                  </h2>
                </div>
              </Link>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center mx-6 space-x-2">
                <Link to="/trades" className={getDesktopLinkClasses("/trades")}>
                  <span className="text-main-text text-base">Trades</span>
                </Link>
                <Link to="/tokens" className={getDesktopLinkClasses("/tokens")}>
                  <span className="text-main-text text-base">Tokens</span>
                </Link>
                <Link
                  to="/leaderboard"
                  className={getDesktopLinkClasses("/leaderboard")}
                >
                  <span className="text-main-text text-base">Leaderboard</span>
                </Link>
              </div>
            </div>

            {/* Holdings, Deposit, Settings & Wallet */}
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated && (
                <>
                  <button
                    onClick={() => setHoldingsSidebarOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.1] hover:border-main-accent/30 rounded-xl transition-all duration-300 group cursor-pointer"
                  >
                    <Icon
                      icon="material-symbols:account-balance-wallet"
                      className="w-4 h-4 text-main-light-text group-hover:text-main-accent transition-colors duration-300"
                    />
                    <span className="font-tiktok text-sm text-main-light-text group-hover:text-main-accent transition-colors duration-300">
                      Holdings
                    </span>
                  </button>

                  <button
                    onClick={openModal}
                    className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.1] hover:border-green-400/30 rounded-xl transition-all duration-300 group cursor-pointer"
                  >
                    <Icon
                      icon="material-symbols:add-circle-outline"
                      className="w-4 h-4 text-white group-hover:text-main-accent transition-colors duration-300"
                    />
                    <span className="font-tiktok text-sm text-white group-hover:text-main-accent transition-colors duration-300">
                      Deposit
                    </span>
                  </button>
                </>
              )}

              <SettingsDropdown />

              <UnifiedAuth />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="outline-none p-2 rounded-lg   bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.1] hover:border-main-accent/30 transition-all duration-300 cursor-pointer"
                aria-label="Menu"
              >
                <svg
                  className={`w-6 h-6 text-main-text transition-all duration-300 ${
                    isMobileMenuOpen ? "transform rotate-90" : ""
                  }`}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-screen opacity-100 py-4 bg-main-bg bg-opacity-95  "
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-4 pt-2 pb-4 space-y-2">
            <div className="grid grid-cols-1 gap-3 mb-4">
              {isAuthenticated && (
                <>
                  <button
                    onClick={() => {
                      setHoldingsSidebarOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.1] hover:border-main-accent/30 rounded-xl transition-all duration-300 group cursor-pointer"
                  >
                    <Icon
                      icon="material-symbols:account-balance-wallet"
                      className="w-4 h-4 text-main-light-text group-hover:text-main-accent transition-colors duration-300"
                    />
                    <span className="font-tiktok text-sm text-main-light-text group-hover:text-main-accent transition-colors duration-300">
                      Holdings
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      openModal();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.1] hover:border-green-400/30 rounded-xl transition-all duration-300 group cursor-pointer mt-2"
                  >
                    <Icon
                      icon="material-symbols:add-circle-outline"
                      className="w-4 h-4 text-green-400 group-hover:text-main-accent transition-colors duration-300"
                    />
                    <span className="font-tiktok text-sm text-green-400 group-hover:text-main-accent transition-colors duration-300">
                      Deposit
                    </span>
                  </button>
                </>
              )}
              <SettingsDropdown />
              <UnifiedAuth />
            </div>

            {/* Mobile Navigation Links */}
            <Link to="/trades" className={getMobileLinkClasses("/trades")}>
              Trades
            </Link>
            <Link to="/tokens" className={getMobileLinkClasses("/tokens")}>
              Tokens
            </Link>
            <Link
              to="/leaderboard"
              className={getMobileLinkClasses("/leaderboard")}
            >
              Leaderboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Add custom styles */}
      <style>
        {`
          .nav-link::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 2px;
            background: linear-gradient(
              90deg,
              var(--color-main-accent),
              var(--color-main-highlight)
            );
            border-radius: 1px;
            transition: width 0.3s ease;
          }

          .nav-link:hover::after {
            width: 80%;
          }

          .active-nav-link::after {
            width: 80%;
          }

          /* Smooth transitions for mobile menu */
          .transition-all {
            transition-property: all;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }

          /* Custom scrollbar for search input */
          input::-webkit-scrollbar {
            display: none;
          }

          /* Focus ring customization */
          .focus\\:ring-main-accent:focus {
            --tw-ring-color: var(--color-main-accent);
            --tw-ring-opacity: 0.3;
          }
        `}
      </style>

      {/* Holdings Sidebar */}
      <HoldingsSidebar
        open={holdingsSidebarOpen}
        onClose={() => setHoldingsSidebarOpen(false)}
        onTradeComplete={refreshPageData}
      />
    </>
  );
});

export default Navbar;
