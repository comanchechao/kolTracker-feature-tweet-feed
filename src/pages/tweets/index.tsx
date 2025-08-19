import React, { useState, useEffect } from 'react'; 
import twitterWebSocketService, { Tweet as TweetType } from '../../services/twitterWebSocketService';
import PageLayout from '../../layouts/PageLayout';
import Navbar from './components/Navbar';
import '../../css/twitter.css';
import StatusMenu from './components/StatusMenu';
import LaunchTokenModal from './components/LaunchTokenModal';
import TokensSection from './components/TokensSection';
import Tweet from './components/Tweet';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useIsMobile } from '../../hooks/useIsMobile';
import { Icon } from '@iconify/react';

const TweetFeed: React.FC = () => {
  const [tweets, setTweets] = useState<TweetType[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
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
      setTweets(prevTweets => [tweet, ...prevTweets].slice(0, 50)); // Keep only the latest 50 tweets
    };

    // Handle connection status
    const handleConnect = () => {
      setIsConnected(true);
      setIsInitialLoading(true);
      setStatusMessage('Connected to Twitter stream');
    };

    // Handle disconnection
    const handleDisconnect = () => {
      setIsConnected(false);
      setIsInitialLoading(false);
      setStatusMessage('Disconnected from Twitter stream');
    };

    // Handle status messages
    const handleStatus = (status: { type: string; message: string }) => {
      setStatusMessage(status.message);
    };

    // Register event listeners
    twitterWebSocketService.on('initialTweets', handleInitialTweets);
    twitterWebSocketService.on('tweet', handleNewTweet);
    twitterWebSocketService.on('connect', handleConnect);
    twitterWebSocketService.on('disconnect', handleDisconnect);
    twitterWebSocketService.on('status', handleStatus);

    // Connect to the service
    connectToTwitter();

    // Clean up event listeners on unmount
    return () => {
      twitterWebSocketService.off('initialTweets', handleInitialTweets);
      twitterWebSocketService.off('tweet', handleNewTweet);
      twitterWebSocketService.off('connect', handleConnect);
      twitterWebSocketService.off('disconnect', handleDisconnect);
      twitterWebSocketService.off('status', handleStatus);
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
      <Navbar isSettingsModalOpen={isSettingsModalOpen} setIsSettingsModalOpen={setIsSettingsModalOpen} />
      <PageLayout>
        <div className="container mx-auto px-4 py-8 pb-16">
          {/* Mobile View Toggle - Floating Button */}
          {isMobile && !isSettingsModalOpen && (
            <div className="absolute bottom-20 right-4 z-50">
              <div className="relative"> 
                
                {/* Toggle Button */}
                <button
                  onClick={() => setShowTokens(!showTokens)}
                  className="group bg-main-accent hover:bg-main-accent/90 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Icon 
                    icon={showTokens ? "material-symbols:chat" : "material-symbols:token"} 
                    className="w-6 h-6" 
                  />
                </button>
                
                {/* Tooltip */}
                <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100">
                  Switch to {showTokens ? 'Tweets' : 'Tokens'}
                </div>
              </div>
            </div>
          )}
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Tweets List - 2/3 width on desktop, hidden on mobile when showTokens is true */}
            <div className={`md:w-2/3 ${isMobile && showTokens ? 'hidden' : ''}`}>
                <div className="tweets-section bg-gradient-to-br from-main-bg via-main-bg to-main-bg-dark rounded-xl border border-white/[0.1] p-4">
              <div className="tweets-container">
                <div className="tweets-list"> 
                  {tweets.length === 0 ? (
                    <div className="p-8 text-center empty-state">
                      <h3 className="text-xl font-bold mb-2 empty-state-title font-tiktok">No tweets yet</h3>
                      <p className="empty-state-message mb-4">
                        {isConnected 
                          ? 'Waiting for tweets to arrive...'
                          : 'Connect to the Twitter stream to see live tweets'}
                      </p>
                      {isConnected && isInitialLoading && (
                        <LoadingSpinner size="md" text="Loading tweets" />
                      )}
                    </div>
                  ) : (
                    tweets.map(tweet => (
                      <Tweet 
                        key={tweet.id_str} 
                        tweet={tweet} 
                      />
                    ))
                  )}
                </div>
                </div>
              </div>
            </div>
            
            {/* Tokens Section - 1/3 width on desktop, hidden on mobile when showTokens is false */}
            <div className={`md:w-1/3 ${isMobile && !showTokens ? 'hidden' : ''}`}>
              <div className="tokens-container">
                <TokensSection />
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
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