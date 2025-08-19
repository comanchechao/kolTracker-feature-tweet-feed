import React, { useState, useEffect } from "react";
import twitterWebSocketService, {
  Tweet as TweetType,
} from "../../services/twitterWebSocketService";
import Navbar from "./components/Navbar";
import "../../css/twitter.css";
import StatusMenu from "./components/StatusMenu";
import LaunchTokenModal from "./components/LaunchTokenModal";
import TokensSection from "./components/TokensSection";
import Tweet from "./components/Tweet";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useIsMobile } from "../../hooks/useIsMobile";
import { Icon } from "@iconify/react";

const TweetFeed: React.FC = () => {
  const [tweets, setTweets] = useState<TweetType[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTokens, setShowTokens] = useState(false); // Mobile view toggle
  const isMobile = useIsMobile();
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  useEffect(() => {
    // Connect to the Twitter WebSocket service
    const connectToTwitter = () => {
      twitterWebSocketService.connect();
    };

    // Handle initial batch of tweets
    const handleInitialTweets = (initialTweets: TweetType[]) => {
      setTweets(initialTweets);
      setIsInitialLoading(false);
    };

    // Handle new tweets after initial batch
    const handleNewTweet = (tweet: TweetType) => {
      setTweets((prevTweets) => [tweet, ...prevTweets].slice(0, 50)); // Keep only the latest 50 tweets
    };

    // Handle connection status
    const handleConnect = () => {
      setIsConnected(true);
      setIsInitialLoading(true);
      setStatusMessage("Connected to X stream");
    };

    // Handle disconnection
    const handleDisconnect = () => {
      setIsConnected(false);
      setIsInitialLoading(false);
      setStatusMessage("Disconnected from X stream");
    };

    // Handle status messages
    const handleStatus = (status: { type: string; message: string }) => {
      setStatusMessage(status.message);
    };

    // Register event listeners
    twitterWebSocketService.on("initialTweets", handleInitialTweets);
    twitterWebSocketService.on("tweet", handleNewTweet);
    twitterWebSocketService.on("connect", handleConnect);
    twitterWebSocketService.on("disconnect", handleDisconnect);
    twitterWebSocketService.on("status", handleStatus);

    // Connect to the service
    connectToTwitter();

    // Clean up event listeners on unmount
    return () => {
      twitterWebSocketService.off("initialTweets", handleInitialTweets);
      twitterWebSocketService.off("tweet", handleNewTweet);
      twitterWebSocketService.off("connect", handleConnect);
      twitterWebSocketService.off("disconnect", handleDisconnect);
      twitterWebSocketService.off("status", handleStatus);
      twitterWebSocketService.disconnect();
    };
  }, []);

  // We've removed the like, retweet, and reply handlers as they're no longer needed

  // Toggle connection
  const toggleConnection = () => {
    if (isConnected) {
      twitterWebSocketService.disconnect();
    } else {
      twitterWebSocketService.connect();
    }
  };

  return (
    <>
      <Navbar
        isSettingsModalOpen={isSettingsModalOpen}
        setIsSettingsModalOpen={setIsSettingsModalOpen}
      />
      {/* SVG Background Pattern */}
      <div className="fixed inset-0 z-30 pointer-events-none overflow-hidden w-screen h-screen">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-10"
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Subtle grid pattern */}
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#e5e5e5"
                strokeWidth="0.8"
                opacity="0.3"
              />
            </pattern>

            {/* Dots pattern */}
            <pattern
              id="dots"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="60" cy="60" r="1.5" fill="#e5e5e5" opacity="0.4" />
            </pattern>

            {/* Hexagonal pattern for modern tech feel */}
            <pattern
              id="hexagons"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 100 25 L 100 75 L 50 100 L 0 75 L 0 25 Z"
                fill="none"
                stroke="#d1d5db"
                strokeWidth="0.5"
                opacity="0.2"
              />
            </pattern>

            {/* Subtle wave pattern */}
            <pattern
              id="waves"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 0 100 Q 50 80 100 100 T 200 100"
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="0.8"
                opacity="0.15"
              />
              <path
                d="M 0 120 Q 50 100 100 120 T 200 120"
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="0.8"
                opacity="0.15"
              />
            </pattern>
          </defs>

          {/* Apply patterns with different opacities for depth */}
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#dots)" />
          <rect width="100%" height="100%" fill="url(#hexagons)" />
          <rect width="100%" height="100%" fill="url(#waves)" />

          {/* Subtle gradient overlay for depth */}
          <rect
            width="100%"
            height="100%"
            fill="url(#gradient)"
            opacity="0.05"
          />

          {/* Radial gradient definition */}
          <defs>
            <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.05" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="  w-full  bg-black/40 mx-auto px-4 py-6 pb-20 relative z-10">
        {/* Mobile View Toggle - Floating Button */}
        {isMobile && !isSettingsModalOpen && (
          <div className="fixed bottom-24 right-4 z-50">
            <div className="relative">
              {/* Toggle Button */}
              <button
                onClick={() => setShowTokens(!showTokens)}
                className="group bg-black/80 border border-white/10 text-white rounded-sm p-4 shadow-lg transition-all duration-200 hover:bg-black/90 hover:border-white/20 active:scale-95"
              >
                <Icon
                  icon={
                    showTokens
                      ? "material-symbols:chat"
                      : "material-symbols:token"
                  }
                  className="w-6 h-6"
                />
              </button>

              {/* Tooltip */}
              <div className="absolute -left-24 top-1/2 transform -translate-y-1/2 bg-black/90 text-white text-xs px-3 py-2 rounded-sm whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100 border border-white/10">
                Switch to {showTokens ? "Tweets" : "Tokens"}
              </div>
            </div>
          </div>
        )}

        <div className="flex max-w-6xl mx-auto flex-col mt-24 lg:flex-row gap-6">
          {/* Tweets List - 2/3 width on desktop, hidden on mobile when showTokens is true */}
          <div className={`lg:w-2/3 ${isMobile && showTokens ? "hidden" : ""}`}>
            <div className="tweets-section bg-black/40 border border-white/5 rounded-sm shadow-lg">
              <div className="tweets-container">
                <div className="tweets-list">
                  {tweets.length === 0 ? (
                    <div className="p-12 text-center  ">
                      <div className="mb-6">
                        <Icon
                          icon="line-md:twitter-x"
                          className="w-16 h-16 text-main-accent mx-auto opacity-40"
                        />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 empty-state-title font-tiktok text-main-text">
                        No tweets yet
                      </h3>
                      <p className="empty-state-message mb-6 text-main-light-text">
                        {isConnected
                          ? "Waiting for tweets to arrive..."
                          : "Connect to the X stream to see live tweets"}
                      </p>
                      {isConnected && isInitialLoading && (
                        <LoadingSpinner size="md" text="Loading tweets" />
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4  ">
                      {tweets.map((tweet) => (
                        <Tweet key={tweet.id_str} tweet={tweet} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tokens Section - 1/3 width on desktop, hidden on mobile when showTokens is false */}
          <div
            className={`lg:w-1/3 ${isMobile && !showTokens ? "hidden" : ""}`}
          >
            <div className="tokens-container">
              <TokensSection />
            </div>
          </div>
        </div>
      </div>
      <StatusMenu
        isConnected={isConnected}
        statusMessage={statusMessage}
        onToggleConnection={toggleConnection}
      />

      {/* Launch Token Modal */}
      <LaunchTokenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default TweetFeed;
