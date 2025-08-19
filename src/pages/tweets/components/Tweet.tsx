import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react"; 
import "../../../css/twitter.css";
import { motion } from "framer-motion"; 
import { Tweet as TweetMock } from "../../../services/twitterWebSocketService";
import ImageModal from "../../../components/ImageModal";
import LaunchTokenModal from "../../tweets/components/LaunchTokenModal";
import { useIsMobile } from "../../../hooks/useIsMobile";
import ImagePlaceholder from "../../../components/ImagePlaceholder";
import OptimizedImage from "./OptimizedImage";
interface TweetProps {
  tweet: TweetMock;
}

const Tweet: React.FC<TweetProps> = ({ tweet }) => {
  // Get the full text from extended_tweet if available, otherwise use the regular text
  const tweetText = tweet.extended_tweet
    ? tweet.extended_tweet.full_text
    : tweet.text;

  // State for image modal and launch token modal
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [isLaunchTokenModalOpen, setIsLaunchTokenModalOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const tweetRef = useRef<HTMLDivElement>(null);
  
  // Use Intersection Observer to detect when tweet is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Start loading when 10% of the tweet is visible
    );
    
    if (tweetRef.current) {
      observer.observe(tweetRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Set images as loaded when tweet becomes visible
  useEffect(() => {
    if (!isVisible) return;
    
    // OptimizedImage component will handle the actual image loading
    // and call setImagesLoaded via onLoad prop
  }, [isVisible]);
  
  // Check if viewing on mobile
  const isMobile = useIsMobile();

  // Get the tweet URL for the LaunchTokenModal
  const tweetUrl = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;

  // Format the tweet time to show how long ago it was posted
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    // Format the hour
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    
    // Calculate time ago
    if (isMobile) {
      // Mobile view - show only time ago without formatted time and dot
      if (diffInSeconds < 60) {
        return `${diffInSeconds}s ago`;
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes}m ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours}h ago`;
      } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days}d ago`;
      }
    } else {
      // Desktop view - show formatted time with dot
      if (diffInSeconds < 60) {
        return `${formattedTime} · ${diffInSeconds}s ago`;
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${formattedTime} · ${minutes}m ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${formattedTime} · ${hours}h ago`;
      } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `${formattedTime} · ${days}d ago`;
      }
    }
  };

  // Handle link clicks
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  // Process tweet text to render links, mentions, and hashtags
  const renderTweetText = (text: string) => {
    // Replace URLs with clickable links
    let processedText = text;

    // Process URLs if they exist
    if (
      tweet.entities &&
      tweet.entities.urls &&
      tweet.entities.urls.length > 0
    ) {
      tweet.entities.urls.forEach((urlEntity) => {
        processedText = processedText.replace(
          urlEntity.url,
          `<a href="${urlEntity.expanded_url}" target="_blank" rel="noopener noreferrer">${urlEntity.display_url}</a>`
        );
      });
    }

    // Process mentions if they exist
    if (
      tweet.entities &&
      tweet.entities.user_mentions &&
      tweet.entities.user_mentions.length > 0
    ) {
      tweet.entities.user_mentions.forEach((mention) => {
        const mentionText = `@${mention.screen_name}`;
        processedText = processedText.replace(
          mentionText,
          `<a href="https://twitter.com/${mention.screen_name}" target="_blank" rel="noopener noreferrer">${mentionText}</a>`
        );
      });
    }

    // Process hashtags if they exist
    if (
      tweet.entities &&
      tweet.entities.hashtags &&
      tweet.entities.hashtags.length > 0
    ) {
      tweet.entities.hashtags.forEach((hashtag) => {
        const hashtagText = `#${hashtag.text}`;
        processedText = processedText.replace(
          hashtagText,
          `<a href="https://twitter.com/hashtag/${hashtag.text}" target="_blank" rel="noopener noreferrer">${hashtagText}</a>`
        );
      });
    }

    return <div dangerouslySetInnerHTML={{ __html: processedText }} />;
  };

  return (
    <motion.div
      ref={tweetRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="tweet-panel bg-gradient-to-br from-main-bg to-main-bg-dark rounded-xl border border-white/[0.05] p-4 mb-4 hover:shadow-lg transition-all duration-200 relative">
        <div className="flex-1 items-start">
          {/* User Avatar */}
          <div className="flex flex-row">
            <img
              src={tweet.user.profile_image_url_https}
              alt={`${tweet.user.name}'s avatar`}
              className="tweet-avatar rounded-full border-2 border-main-accent border-opacity-20 shadow-glow"
            />

            <div className="flex items-center mb-1 ml-2 w-full justify-between">
              <div className="flex flex-col">


                <div className="flex flex-row flexfont-tiktok font-bold text-main-text neon-text">
                  <span>{tweet.user.name}</span><span>{tweet.user.verified && (
                    <div className="ml-1 mt-1">
                      <Icon
                        icon="mdi:check-decagram"
                        className="w-4 h-4 text-main-accent"
                      />
                    </div>
                  )}</span>
                </div>
                <div className="text-main-light-text font-tiktok dim-glow">
                  @{tweet.user.screen_name}
                </div>

              </div>
              <div className="">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsLaunchTokenModalOpen(true);
                  }}
                  className="flex items-center gap-1 md:px-3 md:py-1 px-2 py-2 text-xs font-medium text-white transition-all duration-200 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full hover:from-gray-700 hover:to-gray-800 hover:shadow-lg hover:scale-105 opacity-90 hover:opacity-100 shadow-md border border-gray-700"
                >
                  <Icon icon="mingcute:rocket-line" className="md:w-3 md:h-3 w-4 h-4" />
                  <span className="md:inline hidden">Launch Token</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tweet Text */}
          <div className="text-main-text mb-3 tweet-text font-tiktok crypto-text">
            {renderTweetText(tweetText)}
          </div>

          {/* Tweet Media (if any) */}
          {tweet.entities.media && tweet.entities.media.length > 0 && (
            <div
              className="mt-2 mb-3 rounded-xl overflow-hidden tweet-media relative group cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (tweet.entities.media) {
                  setCurrentImageUrl(
                    tweet.entities.media[0].media_url_https
                  );
                  setIsImageModalOpen(true);
                }
              }}
            >
              {/* Only load image when tweet is visible */}
              {isVisible && (
                <OptimizedImage
                  src={tweet.entities.media[0].media_url_https}
                  alt="Tweet media"
                  className="w-full h-48 object-cover rounded-xl border border-light-bg border-opacity-30"
                  priority={true}
                  onLoad={() => setImagesLoaded(true)}
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Icon
                    icon="mdi:fullscreen"
                    className="w-8 h-8 text-white drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Quoted Tweet (if any) */}
          {tweet.is_quote_status && tweet.quoted_status && (
            <div className="mt-2 mb-3 border border-light-bg border-opacity-50 rounded-xl p-3 hover:bg-light-bg hover:bg-opacity-10 transition-all duration-200">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-2">
                  <img
                    src={tweet.quoted_status.user.profile_image_url_https}
                    alt={`${tweet.quoted_status.user.name}'s avatar`}
                    className="w-8 h-8 rounded-full border border-light-bg border-opacity-30"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <div className="font-tiktok font-bold text-main-text text-sm">
                      {tweet.quoted_status.user.name}
                    </div>
                    <div className="ml-1 text-main-light-text text-xs font-tiktok hidden md:inline ">
                      @{tweet.quoted_status.user.screen_name}
                    </div>
                    {tweet.quoted_status.user.verified && (
                      <div className="ml-1 verified-badge bg-main-accent bg-opacity-10">
                        <Icon
                          icon="mdi:check-decagram"
                          className="w-3 h-3 text-main-accent"
                        />
                      </div>
                    )}
                  </div>
                  <div className="text-main-text text-sm tweet-text font-tiktok">
                    {renderTweetText(
                      tweet.quoted_status.extended_tweet
                        ? tweet.quoted_status.extended_tweet.full_text
                        : tweet.quoted_status.text
                    )}
                  </div>
                  {tweet.quoted_status.entities.media &&
                    tweet.quoted_status.entities.media.length > 0 && (
                      <div
                        className="mt-2 rounded-lg overflow-hidden tweet-media relative group cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (tweet.quoted_status?.entities.media) {
                            setCurrentImageUrl(
                              tweet.quoted_status.entities.media[0]
                                .media_url_https
                            );
                            setIsImageModalOpen(true);
                          }
                        }}
                      >
                        {/* Only load image when tweet is visible */}
                        {isVisible && (
                          <OptimizedImage
                            src={tweet.quoted_status.entities.media[0].media_url_https}
                            alt="Quoted tweet media"
                            className="w-full h-32 object-cover rounded-lg"
                            priority={true}
                            onLoad={() => setImagesLoaded(true)}
                          />
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Icon
                              icon="mdi:fullscreen"
                              className="w-6 h-6 text-white drop-shadow-lg"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          )}

          {/* Replied To Tweet (if any) */}
          {tweet.in_reply_to_status_id && tweet.replied_to_tweet && (
            <div className="mb-3 pt-2 border-t border-light-bg border-opacity-20">
              <div className="text-main-light-text text-xs mb-2 font-tiktok">
                <Icon
                  icon="mdi:reply"
                  className="w-3 h-3 inline-block mr-1"
                />
                Replying to <span className="text-main-accent">@{tweet.in_reply_to_screen_name}</span>
              </div>
              <div className="border-l-2 border-main-accent pl-3 py-1 reply-line">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-2">
                    <img
                      src={
                        tweet.replied_to_tweet.user.profile_image_url_https
                      }
                      alt={`${tweet.replied_to_tweet.user.name}'s avatar`}
                      className="w-6 h-6 rounded-full border border-light-bg border-opacity-30"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="font-tiktok font-bold text-main-text text-xs">
                        {tweet.replied_to_tweet.user.name}
                      </div>
                      <div className="ml-1 text-main-light-text text-xs font-tiktok">
                        @{tweet.replied_to_tweet.user.screen_name}
                      </div>
                    </div>
                    <div className="text-main-text text-xs tweet-text font-tiktok line-clamp-2 overflow-hidden">
                      {renderTweetText(
                        tweet.replied_to_tweet.extended_tweet
                          ? tweet.replied_to_tweet.extended_tweet.full_text
                          : tweet.replied_to_tweet.text
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Launch Token Button - Positioned in the top-right corner of the tweet */}


          {/* Tweet Stats (Read Only) with Date/Time */}
          <div className="flex text-main-light-text text-sm space-x-4 pt-2 border-t border-light-bg border-opacity-20">
            

            <div className="flex items-center hover:text-main-accent transition-colors duration-200">
              <Icon icon="mdi:comment-outline" className="w-4 h-4 mr-1" />
              <span>{Math.floor(Math.random() * 100)}</span>
            </div>

            <div className="flex items-center hover:text-main-accent transition-colors duration-200">
              <Icon icon="mdi:repeat" className="w-4 h-4 mr-1" />
              <span>{tweet.retweet_count}</span>
            </div>

            <div className="flex items-center hover:text-main-accent transition-colors duration-200">
              <Icon icon="mdi:heart-outline" className="w-4 h-4 mr-1" />
              <span>{tweet.favorite_count}</span>
            </div>

            <div className="flex items-center ml-auto text-main-accent">
              <div className="text-main-light-text text-sm font-tiktok dim-glow mr-2">
              {formatTimeAgo(tweet.created_at)}
            </div>
              <a
                href={tweetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block no-underline"
              >
                <Icon icon="mdi:open-in-new" className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Image Modal for fullscreen view */}
      <ImageModal
        isOpen={isImageModalOpen}
        imageUrl={currentImageUrl}
        onClose={() => setIsImageModalOpen(false)}
      />

      {/* Launch Token Modal */}
      <LaunchTokenModal
        isOpen={isLaunchTokenModalOpen}
        onClose={() => setIsLaunchTokenModalOpen(false)}
        initialTwitterUrl={tweetUrl}
      />
    </motion.div>
  );
};

export default Tweet;
