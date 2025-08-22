import React, { useState } from "react";
import {
  useTwitterWebSocket,
  TwitterTweetData,
} from "../../hooks/useTwitterWebSocket";
import Navbar from "./components/Navbar";
import "../../css/twitter.css";
import StatusMenu from "./components/StatusMenu";
import LaunchTokenModal from "./components/LaunchTokenModal";
import TokensSection from "./components/TokensSection";
import Tweet from "./components/Tweet";
import LoadingSpinner from "../../components/LoadingSpinner";
import DottedPattern from "../../components/DottedPattern";
import { useIsMobile } from "../../hooks/useIsMobile";
import { Icon } from "@iconify/react";

const TweetFeed: React.FC = () => {
  const [tweets, setTweets] = useState<TwitterTweetData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTokens, setShowTokens] = useState(false); // Mobile view toggle
  const isMobile = useIsMobile();
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const {
    isConnected,
    isConnecting: isInitialLoading,
    connect,
    disconnect,
  } = useTwitterWebSocket(
    (tweet: TwitterTweetData) => {
      setTweets((prevTweets) => [tweet, ...prevTweets].slice(0, 50));
    },
    () => {
      console.log("Twitter WebSocket connected");
    },
    () => {
      console.log("Twitter WebSocket disconnected");
    }
  );

  const toggleConnection = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <>
      <Navbar
        isSettingsModalOpen={isSettingsModalOpen}
        setIsSettingsModalOpen={setIsSettingsModalOpen}
      />
      {/* Dotted Background Pattern */}
      <DottedPattern opacity={0.02} />

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

        <div className="flex max-w-7xl mx-auto flex-col mt-24 lg:flex-row gap-6">
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
                    <div className="space-y-4 p-7  ">
                      {tweets.map((tweet) => (
                        <Tweet key={tweet.tweetId} tweet={tweet} />
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
        isTweetConnected={isConnected}
        onToggleTweetConnection={toggleConnection}
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
