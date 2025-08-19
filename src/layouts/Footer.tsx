import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Footer: React.FC = React.memo(() => {
  return (
    <footer className="bg-main-bg border-t border-light-bg border-opacity-30  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="relative">
                <span className="font-algance text-3xl   text-main-text">
                  Cherry
                </span>
                <span className="font-algance text-3xl   text-main-accent ml-1">
                  KOLs
                </span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[var(--color-main-accent)] to-[var(--color-main-highlight)] rounded-full"></div>
              </div>
            </div>
            <p className="font-tiktok text-main-light-text text-sm leading-relaxed mb-6 max-w-md">
              Track and analyze key opinion leaders' performance across social
              media platforms. Get real-time insights, engagement metrics, and
              comprehensive analytics to make informed decisions in the crypto
              space.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://x.com/BonkKols"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="Twitter"
              >
                <div className="w-10 h-10 bg-light-bg bg-opacity-50   rounded-lg border border-light-bg border-opacity-50 flex items-center justify-center transition-all duration-300 group-hover:bg-main-accent group-hover:border-main-accent group-hover:scale-110">
                  <Icon
                    icon="fa6-brands:x-twitter"
                    className="w-5 h-5 text-main-light-text group-hover:text-main-bg transition-colors duration-300"
                  />
                </div>
              </a>
              <a
                href="https://t.me/BonkKols"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="Telegram"
              >
                <div className="w-10 h-10 bg-light-bg bg-opacity-50   rounded-lg border border-light-bg border-opacity-50 flex items-center justify-center transition-all duration-300 group-hover:bg-main-accent group-hover:border-main-accent group-hover:scale-110">
                  <Icon
                    icon="ic:baseline-telegram"
                    className="w-5 h-5 text-main-light-text group-hover:text-main-bg transition-colors duration-300"
                  />
                </div>
              </a>
              <a
                href="https://www.youtube.com/@BonkKols"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="youtube"
              >
                <div className="w-10 h-10 bg-light-bg bg-opacity-50   rounded-lg border border-light-bg border-opacity-50 flex items-center justify-center transition-all duration-300 group-hover:bg-main-accent group-hover:border-main-accent group-hover:scale-110">
                  <Icon
                    icon="ri:youtube-fill"
                    className="w-5 h-5 text-main-light-text group-hover:text-main-bg transition-colors duration-300"
                  />
                </div>
              </a>
              <a
                href="https://www.twitch.tv/bonkkols"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="twitch"
              >
                <div className="w-10 h-10 bg-light-bg bg-opacity-50   rounded-lg border border-light-bg border-opacity-50 flex items-center justify-center transition-all duration-300 group-hover:bg-main-accent group-hover:border-main-accent group-hover:scale-110">
                  <Icon
                    icon="picon:twitch"
                    className="w-5 h-5 text-main-light-text group-hover:text-main-bg transition-colors duration-300"
                  />
                </div>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-algance text-lg   text-main-text mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/trades"
                  className="font-tiktok text-sm text-main-light-text hover:text-main-accent transition-colors duration-300"
                >
                  Trades
                </Link>
              </li>
              <li>
                <Link
                  to="/tokens"
                  className="font-tiktok text-sm text-main-light-text hover:text-main-accent transition-colors duration-300"
                >
                  Tokens
                </Link>
              </li>
              <li>
                <Link
                  to="/leaderboard"
                  className="font-tiktok text-sm text-main-light-text hover:text-main-accent transition-colors duration-300"
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  to="/analytics"
                  className="font-tiktok text-sm text-main-light-text hover:text-main-accent transition-colors duration-300"
                >
                  Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-algance text-lg   text-main-text mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/docs"
                  className="font-tiktok text-sm text-main-light-text hover:text-main-accent transition-colors duration-300"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="/api"
                  className="font-tiktok text-sm text-main-light-text hover:text-main-accent transition-colors duration-300"
                >
                  API
                </a>
              </li>
              <li>
                <a
                  href="/support"
                  className="font-tiktok text-sm text-main-light-text hover:text-main-accent transition-colors duration-300"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="font-tiktok text-sm text-main-light-text hover:text-main-accent transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-light-bg border-opacity-30">
          <div className="bg-light-bg bg-opacity-30   rounded-2xl p-6 border border-light-bg border-opacity-50">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="font-algance text-xl   text-main-text mb-2">
                  Stay Updated
                </h3>
                <p className="font-tiktok text-sm text-main-light-text">
                  Get the latest KOL insights and market updates delivered to
                  your inbox.
                </p>
              </div>
              <div className="flex w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 md:w-64 px-4 py-2.5 bg-main-bg bg-opacity-50   border border-light-bg border-opacity-50 rounded-l-lg text-main-text placeholder-main-light-text font-tiktok text-sm focus:outline-none focus:ring-2 focus:ring-main-accent focus:border-main-accent transition-all duration-300"
                />
                <button className="px-6 py-2.5 bg-main-accent hover:bg-main-highlight text-main-bg font-tiktok   text-sm rounded-r-lg transition-all duration-300 transform  ">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 mb-10 border-t border-light-bg border-opacity-30">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <p className="font-tiktok text-sm text-main-light-text">
                © 2025 Cherry KOLs. All rights reserved.
              </p>
              <div className="flex items-center space-x-2">
                <Icon
                  icon="token-branded:solana"
                  className="w-4 h-4 text-main-accent"
                />
                <span className="font-tiktok text-sm text-main-light-text">
                  Powered by Solana
                </span>
              </div>
            </div>
            <div className="flex space-x-6">
              <a
                href="/privacy"
                className="font-tiktok text-sm text-main-light-text hover:text-main-accent transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="font-tiktok text-sm text-main-light-text hover:text-main-accent transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
