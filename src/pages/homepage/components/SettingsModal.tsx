import React, { useRef, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import MyFeed from "../../tweets/components/settingSections/MyFeed";
import Notifications from "../../tweets/components/settingSections/Notifications";
import Wallets from "../../tweets/components/settingSections/Wallets";
import Filters from "../../tweets/components/settingSections/Filters";
import Automation from "../../tweets/components/settingSections/Automation";
import Transactions from "../../tweets/components/settingSections/Transactions";
import Account from "../../tweets/components/settingSections/Account";
import Application from "../../tweets/components/settingSections/Application";

// Add animation for fade-in effect
interface MenuSection {
  id: string;
  title: string;
  icon: string;
  enabled: boolean;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [activeSection, setActiveSection] = useState<
    | "feed"
    | "notifications"
    | "wallets"
    | "filters"
    | "automation"
    | "transactions"
    | "application"
    | "account"
  >("feed");
  const [expandedSection, setExpandedSection] = useState<string>("feed");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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

  const menuSections: MenuSection[] = [
    {
      id: "feed",
      title: "My Feed",
      icon: "material-symbols:rss-feed",
      enabled: true,
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: "material-symbols:notifications",
      enabled: true,
    },
    {
      id: "wallets",
      title: "Wallets",
      icon: "material-symbols:wallet",
      enabled: true,
    },
    {
      id: "filters",
      title: "Filters",
      icon: "material-symbols:filter-alt",
      enabled: true,
    },
    {
      id: "automation",
      title: "Automation",
      icon: "material-symbols:auto-mode",
      enabled: true,
    },
    {
      id: "transactions",
      title: "Transactions",
      icon: "material-symbols:receipt-long",
      enabled: true,
    },
    {
      id: "application",
      title: "Application",
      icon: "material-symbols:apps",
      enabled: true,
    },
    {
      id: "account",
      title: "Account",
      icon: "material-symbols:person",
      enabled: true,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Don't close settings modal if keyword modal is open
      //if (isKeywordModalOpen) return;

      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose /* , isKeywordModalOpen */]);

  const toggleSection = (sectionId: string) => {
    // Only toggle enabled sections
    const section = menuSections.find((s) => s.id === sectionId);
    if (section && section.enabled) {
      // If we're closing the current section, fade out first
      if (expandedSection === sectionId) {
        // Add a slight delay before actually closing the section
        setTimeout(() => {
          setExpandedSection("");
        }, 150);
      } else {
        // If opening a new section, update immediately
        setExpandedSection(sectionId);

        // Update active section for desktop view
        if (sectionId === "feed" || sectionId === "account") {
          setActiveSection(sectionId as "feed" | "account");
        }
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-20 flex items-center justify-center transition-all duration-200 ease-out ${
        isAnimating
          ? "bg-black/0 backdrop-blur-0"
          : "bg-black/70 backdrop-blur-sm"
      }`}
    >
      <div
        ref={modalRef}
        className={`relative w-full max-w-3xl mx-auto bg-black/90 border border-white/10 shadow-lg rounded-sm flex flex-col h-[33rem] overflow-hidden transition-all duration-200 ease-out transform ${
          isAnimating
            ? "scale-95 opacity-0 translate-y-4"
            : "scale-100 opacity-100 translate-y-0"
        }`}
      >
        {/* Header - Show on mobile and desktop */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 sticky top-0 bg-black/90 z-10">
          <div className="flex items-center space-x-3">
            <Icon
              icon="material-symbols:settings"
              className="w-6 h-6 text-main-accent"
            />
            <h2 className="text-xl font-bold text-main-text font-tiktok">
              Settings
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-sm hover:bg-white/10 text-main-light-text hover:text-main-accent transition-colors duration-200"
          >
            <Icon icon="mdi:close" className="w-6 h-6" />
          </button>
        </div>

        {/* Layout - Different for mobile and desktop */}
        {isMobile && (
          <>
            <div className="flex h-[calc(100vh-72px)]">
              <div className="w-12 bg-black/60 border-r border-white/10 flex flex-col items-center py-6 space-y-6">
                {menuSections.map((section) => (
                  <div key={section.id} className="relative">
                    <button
                      className={`p-2 rounded-sm transition-all duration-300 ease-out ${
                        section.enabled
                          ? expandedSection === section.id
                            ? "bg-main-accent/20   "
                            : "hover:bg-white/10 hover:    "
                          : "opacity-50 cursor-not-allowed"
                      }`}
                      onClick={() => toggleSection(section.id)}
                      disabled={!section.enabled}
                    >
                      <Icon
                        icon={section.icon}
                        className={`w-5 h-5 transition-all duration-300 ease-out ${
                          section.enabled
                            ? expandedSection === section.id
                              ? "text-main-accent   "
                              : "text-main-light-text"
                            : "text-main-light-text/50"
                        }`}
                      />
                    </button>
                    {/* Active indicator */}
                    {expandedSection === section.id && section.enabled && (
                      <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-main-accent rounded-r-sm transition-all duration-300 ease-out animate-pulse"></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="w-full">
                {/* Main content area */}
                <div className="flex-1 overflow-y-auto">
                  {expandedSection && (
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Icon
                            icon={
                              menuSections.find((s) => s.id === expandedSection)
                                ?.icon || ""
                            }
                            className="w-5 h-5 text-main-accent"
                          />
                          <h3 className="text-lg font-bold text-main-text font-tiktok">
                            {
                              menuSections.find((s) => s.id === expandedSection)
                                ?.title
                            }
                          </h3>
                        </div>
                      </div>

                      <p className="text-xs text-main-light-text mb-4 font-tiktok">
                        {expandedSection === "feed"
                          ? "Manage your personal feed, sounds and notifications"
                          : "Manage your account settings and referrals"}
                      </p>
                    </div>
                  )}
                </div>
                {/* Only show content if section is expanded on mobile or always show on desktop */}
                {(
                  isMobile
                    ? expandedSection === "feed"
                    : activeSection === "feed"
                ) ? (
                  <MyFeed />
                ) : (
                    isMobile
                      ? expandedSection === "notifications"
                      : activeSection === "notifications"
                  ) ? (
                  <Notifications isMobile={isMobile} />
                ) : (
                    isMobile
                      ? expandedSection === "wallets"
                      : activeSection === "wallets"
                  ) ? (
                  <Wallets />
                ) : (
                    isMobile
                      ? expandedSection === "filters"
                      : activeSection === "filters"
                  ) ? (
                  <Filters isMobile={isMobile} />
                ) : (
                    isMobile
                      ? expandedSection === "account"
                      : activeSection === "account"
                  ) ? (
                  <Account />
                ) : (
                    isMobile
                      ? expandedSection === "automation"
                      : activeSection === "automation"
                  ) ? (
                  <Automation isMobile={isMobile} />
                ) : (
                    isMobile
                      ? expandedSection === "transactions"
                      : activeSection === "transactions"
                  ) ? (
                  <Transactions isMobile={isMobile} />
                ) : (
                    isMobile
                      ? expandedSection === "application"
                      : activeSection === "application"
                  ) ? (
                  <Application isMobile={isMobile} />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        )}

        {/* Desktop layout */}
        <div
          className={`flex ${isMobile ? "hidden" : ""}`}
          style={{ height: "100vh" }}
        >
          {!isMobile && (
            <div className="w-1/5 text-sm border-r border-white/10 p-4 h-full overflow-y-auto bg-black/60">
              <ul className="space-y-2">
                <li
                  className={`px-4 py-2 ${
                    activeSection === "feed"
                      ? "bg-[var(--color-main-accent)]/20 text-[var(--color-main-accent)] shadow-lg"
                      : "hover:bg-white/10 text-main-light-text"
                  } rounded-sm font-medium cursor-pointer transition-all duration-300 ease-out font-tiktok transform`}
                  onClick={() => setActiveSection("feed")}
                >
                  My Feed
                </li>
                <li
                  className={`px-4 py-3 ${
                    activeSection === "notifications"
                      ? "bg-main-accent/20 text-main-accent shadow-lg"
                      : "hover:bg-white/10 text-main-light-text"
                  } rounded-sm font-medium cursor-pointer transition-all duration-300 ease-out font-tiktok transform`}
                  onClick={() => setActiveSection("notifications")}
                >
                  Notifications
                </li>
                <li
                  className={`px-4 py-3 ${
                    activeSection === "wallets"
                      ? "bg-main-accent/20 text-main-accent shadow-lg"
                      : "hover:bg-white/10 text-main-light-text"
                  } rounded-sm font-medium cursor-pointer transition-all duration-300 ease-out font-tiktok transform`}
                  onClick={() => setActiveSection("wallets")}
                >
                  Wallets
                </li>
                <li
                  className={`px-4 py-3 ${
                    activeSection === "filters"
                      ? "bg-main-accent/20 text-main-accent shadow-lg"
                      : "hover:bg-white/10 text-main-light-text"
                  } rounded-sm font-medium cursor-pointer transition-all duration-300 ease-out font-tiktok transform`}
                  onClick={() => setActiveSection("filters")}
                >
                  Filters
                </li>
                <li
                  className={`px-4 py-3 ${
                    activeSection === "automation"
                      ? "bg-main-accent/20 text-main-accent shadow-lg"
                      : "hover:bg-white/10 text-main-light-text"
                  } rounded-sm font-medium cursor-pointer transition-all duration-300 ease-out font-tiktok transform`}
                  onClick={() => setActiveSection("automation")}
                >
                  Automation
                </li>
                <li
                  className={`px-4 py-3 ${
                    activeSection === "transactions"
                      ? "bg-main-accent/20 text-main-accent shadow-lg"
                      : "hover:bg-white/10 text-main-light-text"
                  } rounded-sm font-medium cursor-pointer transition-all duration-300 ease-out font-tiktok transform`}
                  onClick={() => setActiveSection("transactions")}
                >
                  Transactions
                </li>
                <li
                  className={`px-4 py-3 ${
                    activeSection === "application"
                      ? "bg-main-accent/20 text-main-accent            shadow-lg"
                      : "hover:bg-white/10     text-main-accent/30"
                  } rounded-sm font-medium cursor-pointer transition-all duration-300 ease-out font-tiktok transform`}
                  onClick={() => setActiveSection("application")}
                >
                  Application
                </li>
                <li
                  className={`px-4 py-3 ${
                    activeSection === "account"
                      ? "bg-main-accent/20 text-main-accent         shadow-lg"
                      : "hover:bg-white/10     text-main-light-text"
                  } rounded-sm font-medium cursor-pointer transition-all duration-300 ease-out font-tiktok transform`}
                  onClick={() => setActiveSection("account")}
                >
                  Account
                </li>
              </ul>
            </div>
          )}

          {/* Main content */}
          <div
            ref={contentRef}
            className={`${isMobile ? "hidden" : "w-4/5"} p-6 ${
              isMobile ? "pb-16" : ""
            } transition-all duration-200 h-full overflow-y-auto bg-black/40`}
          >
            {!isMobile && (
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-main-text font-tiktok">
                  {activeSection === "feed" && "My Feed"}
                  {activeSection === "notifications" && "Notifications"}
                  {activeSection === "wallets" && "Wallets"}
                  {activeSection === "filters" && "Filters"}
                  {activeSection === "automation" && "Automation"}
                  {activeSection === "transactions" && "Transactions"}
                  {activeSection === "application" && "Application"}
                  {activeSection === "account" && "Account"}
                </h2>
              </div>
            )}

            {!isMobile && (
              <p className="text-sm text-main-light-text mb-6 font-tiktok">
                {activeSection === "feed" &&
                  "Manage your personal feed, sounds and notifications"}
                {activeSection === "notifications" &&
                  "Configure notification sounds and volume settings"}
                {activeSection === "wallets" &&
                  "Manage your wallets and transaction settings"}
                {activeSection === "filters" &&
                  "Set up keyword filters and highlighting"}
                {activeSection === "automation" &&
                  "Configure automation and trading settings"}
                {activeSection === "transactions" &&
                  "Configure transaction methods and fees"}
                {activeSection === "application" &&
                  "Configure general application settings"}
                {activeSection === "account" &&
                  "Manage your account settings and referrals"}
              </p>
            )}

            {/* Only show content if section is expanded on mobile or always show on desktop */}
            {(
              isMobile ? expandedSection === "feed" : activeSection === "feed"
            ) ? (
              <MyFeed />
            ) : (
                isMobile
                  ? expandedSection === "notifications"
                  : activeSection === "notifications"
              ) ? (
              <Notifications isMobile={isMobile} />
            ) : (
                isMobile
                  ? expandedSection === "wallets"
                  : activeSection === "wallets"
              ) ? (
              <Wallets />
            ) : (
                isMobile
                  ? expandedSection === "filters"
                  : activeSection === "filters"
              ) ? (
              <Filters isMobile={isMobile} />
            ) : (
                isMobile
                  ? expandedSection === "automation"
                  : activeSection === "automation"
              ) ? (
              <Automation isMobile={isMobile} />
            ) : (
                isMobile
                  ? expandedSection === "transactions"
                  : activeSection === "transactions"
              ) ? (
              <Transactions isMobile={isMobile} />
            ) : (
                isMobile
                  ? expandedSection === "application"
                  : activeSection === "application"
              ) ? (
              <Application isMobile={isMobile} />
            ) : (
                isMobile
                  ? expandedSection === "account"
                  : activeSection === "account"
              ) ? (
              <Account />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
