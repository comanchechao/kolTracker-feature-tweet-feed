import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { createPortal } from "react-dom";
import "../../../css/twitter.css";
import { motion } from "framer-motion";
import { Tweet as TweetMock } from "../../../services/twitterWebSocketService";
import ImageModal from "../../../components/ImageModal";
import LaunchTokenModal from "../../tweets/components/LaunchTokenModal";
import { useIsMobile } from "../../../hooks/useIsMobile";
import OptimizedImage from "./OptimizedImage";
import { useToastContext } from "../../../contexts/ToastContext";

// Function to convert strings to initials or abbreviated forms
const convertToAbbreviation = (text: string): string => {
  if (!text || text.trim().length === 0) return "";

  let cleanText = text.trim();

  // Remove @ and # prefixes from words
  cleanText = cleanText.replace(/[@#]/g, "");

  const words = cleanText.split(/\s+/).filter((word) => word.length > 0);

  // For 1-2 words, keep them clean but uppercase
  if (words.length <= 2) {
    const combined = words.join("").toUpperCase();
    // If the combined result is too long (more than 8 characters), use initials
    if (combined.length > 8) {
      return words.map((word) => word.charAt(0).toUpperCase()).join("");
    }
    return combined;
  }

  // For 3+ words, use initials
  return words.map((word) => word.charAt(0).toUpperCase()).join("");
};

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
  const [showLaunchTokenModal, setShowLaunchTokenModal] = useState(false);
  const [modalInitialValues, setModalInitialValues] = useState({
    tokenName: "",
    tokenSymbol: "",
  });
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const tweetRef = useRef<HTMLDivElement>(null);

  // State for text selection context menu
  const [selectedText, setSelectedText] = useState("");
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });

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

  // Toast context for error messages
  const { showError } = useToastContext();

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
    const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;

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
        return `${minutes}m ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours}h ago`;
      } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days}d ago`;
      }
    }
  };

  // Handle link clicks
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  // Handle context menu option selection
  const handleContextMenuOption = (option: string) => {
    console.log(`Selected option: ${option} for text: "${selectedText}"`);
    setShowContextMenu(false);

    const abbreviation = convertToAbbreviation(selectedText);

    switch (option) {
      case "Auto":
        // Open LaunchTokenModal with selected text as Name and abbreviation as Symbol
        setModalInitialValues({
          tokenName: selectedText,
          tokenSymbol: abbreviation,
        });
        setShowLaunchTokenModal(true);
        break;
      case "Full":
        // Open LaunchTokenModal with selected text as Name and abbreviation as Symbol
        setModalInitialValues({
          tokenName: selectedText,
          tokenSymbol: abbreviation,
        });
        setShowLaunchTokenModal(true);
        break;
      case "Rapid":
        // Show error toast message
        showError("Token Deployment", "Failed to create token deployment");
        break;
      case "Name":
        // Open LaunchTokenModal with only Name filled
        setModalInitialValues({ tokenName: selectedText, tokenSymbol: "" });
        setShowLaunchTokenModal(true);
        break;
      default:
        break;
    }

    window.getSelection()?.removeAllRanges();
  };

  // Handle selection changes and close context menu when clicking elsewhere
  useEffect(() => {
    let selectionTimer: NodeJS.Timeout;
    let mouseUpTimer: NodeJS.Timeout;

    const handleClickOutside = (e: MouseEvent) => {
      // Only hide context menu if clicking outside the context menu itself
      const target = e.target as Element;
      if (target && !target.closest(".context-menu")) {
        setShowContextMenu(false);
      }
    };

    const showContextMenuForSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length >= 2) {
        const selectedText = selection.toString().trim();
        // Only show context menu if text length is between 2 and 100 characters
        if (selectedText.length >= 2 && selectedText.length <= 100) {
          const tweetElement = tweetRef.current;
          if (
            tweetElement &&
            selection.anchorNode &&
            tweetElement.contains(selection.anchorNode)
          ) {
            setSelectedText(selectedText);
            // Update final position based on selection bounds
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            setContextMenuPosition({ x: rect.right + 10, y: rect.bottom + 5 });
            setShowContextMenu(true);
          }
        }
      } else if (selection && selection.toString().trim().length === 0) {
        // Only hide menu if selection is completely empty and we're not in the middle of selecting
        // Add a small delay to prevent flickering during selection
        setTimeout(() => {
          const currentSelection = window.getSelection();
          if (
            currentSelection &&
            currentSelection.toString().trim().length === 0
          ) {
            setShowContextMenu(false);
          }
        }, 150);
      }
    };

    const handleSelectionChange = () => {
      // Debounce selection changes to improve performance
      clearTimeout(selectionTimer);
      selectionTimer = setTimeout(showContextMenuForSelection, 100);
    };

    const handleGlobalMouseUp = (e: MouseEvent) => {
      // Debounce mouse up events to improve performance
      clearTimeout(mouseUpTimer);
      mouseUpTimer = setTimeout(showContextMenuForSelection, 50);
    };

    const handleGlobalMouseDown = (e: MouseEvent) => {
      // Only hide context menu if clicking outside the context menu and outside the tweet
      const target = e.target as Element;
      const tweetElement = tweetRef.current;

      if (
        target &&
        !target.closest(".context-menu") &&
        tweetElement &&
        !tweetElement.contains(target)
      ) {
        setShowContextMenu(false);
      }
    };

    document.addEventListener("mouseup", handleGlobalMouseUp);
    document.addEventListener("mousedown", handleGlobalMouseDown);
    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      clearTimeout(selectionTimer);
      clearTimeout(mouseUpTimer);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("mousedown", handleGlobalMouseDown);
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

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

    return (
      <div
        dangerouslySetInnerHTML={{ __html: processedText }}
        style={{ userSelect: "text" }}
      />
    );
  };

  return (
    <motion.div
      ref={tweetRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="    border bg-gradient-to-tl from-black/40 via-black/60 to-white/10 border-white/10 rounded-sm p-6 mb-4 transition-all duration-200 hover:bg-black/40 hover:border-white/20 relative overflow-hidden">
        {/* Subtle accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-main-accent/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200"></div>

        <div className="relative z-10 flex-1 items-start">
          {/* User Avatar */}
          <div className="flex flex-row">
            <div className="relative">
              <img
                src={tweet.user.profile_image_url_https}
                alt={`${tweet.user.name}'s avatar`}
                className="tweet-avatar rounded-sm border border-white/20 shadow-lg"
              />
            </div>

            <div className="flex items-center mb-3 ml-4 w-full justify-between">
              <div className="flex flex-col">
                <div className="flex flex-row items-center font-tiktok font-bold text-main-text">
                  <span className="text-lg">{tweet.user.name}</span>
                  {tweet.user.verified && (
                    <div className="ml-2 mt-1">
                      <Icon
                        icon="mdi:check-decagram"
                        className="w-5 h-5 text-main-accent"
                      />
                    </div>
                  )}
                </div>
                <div className="text-main-light-text font-tiktok text-sm">
                  @{tweet.user.screen_name}
                </div>
              </div>
              <div className="">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowLaunchTokenModal(true);
                  }}
                  className="flex items-center gap-2 md:px-4 md:py-2 px-3 py-2 text-sm font-medium text-white transition-all duration-200 bg-black/60 hover:bg-black/80 border border-white/20 hover:border-white/30 rounded-sm"
                >
                  <Icon
                    icon="mingcute:rocket-line"
                    className="md:w-4 md:h-4 w-5 h-5"
                  />
                  <span className="md:inline hidden">Launch Token</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tweet Text */}
          <div className="text-main-text mb-4 tweet-text font-tiktok text-sm leading-relaxed">
            {renderTweetText(tweetText)}
          </div>

          {/* Tweet Media (if any) */}
          {tweet.entities.media && tweet.entities.media.length > 0 && (
            <div
              className="mt-3 mb-4 rounded-sm overflow-hidden items-center justify-center tweet-media relative group cursor-pointer border border-white/10"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (tweet.entities.media) {
                  setCurrentImageUrl(tweet.entities.media[0].media_url_https);
                  setIsImageModalOpen(true);
                }
              }}
            >
              {/* Only load image when tweet is visible */}
              {isVisible && (
                <OptimizedImage
                  src={tweet.entities.media[0].media_url_https}
                  alt="Tweet media"
                  className="h-full max-h-72 object-cover rounded-sm border border-white/10 transition-transform duration-200  "
                  priority={true}
                  onLoad={() => setImagesLoaded(true)}
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Icon
                    icon="mdi:fullscreen"
                    className="w-10 h-10 text-white drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Quoted Tweet (if any) */}
          {tweet.is_quote_status && tweet.quoted_status && (
            <div className="mt-3 mb-4 border border-white/10 rounded-sm p-4 hover:bg-white/5 transition-all duration-200 bg-black/20">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <img
                    src={tweet.quoted_status.user.profile_image_url_https}
                    alt={`${tweet.quoted_status.user.name}'s avatar`}
                    className="w-10 h-10 rounded-sm border border-white/20"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <div className="font-tiktok font-bold text-main-text text-sm">
                      {tweet.quoted_status.user.name}
                    </div>
                    <div className="ml-2 text-main-light-text text-xs font-tiktok hidden md:inline">
                      @{tweet.quoted_status.user.screen_name}
                    </div>
                    {tweet.quoted_status.user.verified && (
                      <div className="ml-2 verified-badge bg-main-accent/20">
                        <Icon
                          icon="mdi:check-decagram"
                          className="w-4 h-4 text-main-accent"
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
                        className="mt-3 rounded-sm overflow-hidden tweet-media relative group cursor-pointer border border-white/10"
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
                            src={
                              tweet.quoted_status.entities.media[0]
                                .media_url_https
                            }
                            alt="Quoted tweet media"
                            className="h-full max-h-36 object-cover rounded-sm transition-transform duration-200  "
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
                </div>
              </div>
            </div>
          )}

          {/* Replied To Tweet (if any) */}
          {tweet.in_reply_to_status_id && tweet.replied_to_tweet && (
            <div className="mb-4 pt-3 border-t border-white/10">
              <div className="text-main-light-text text-xs mb-3 font-tiktok">
                <Icon icon="mdi:reply" className="w-4 h-4 inline-block mr-2" />
                Replying to{" "}
                <span className="text-main-accent">
                  @{tweet.in_reply_to_screen_name}
                </span>
              </div>
              <div className="border-l-2 border-main-accent/50 pl-4 py-2 reply-line">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <img
                      src={tweet.replied_to_tweet.user.profile_image_url_https}
                      alt={`${tweet.replied_to_tweet.user.name}'s avatar`}
                      className="w-8 h-8 rounded-sm border border-white/20"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="font-tiktok font-bold text-main-text text-xs">
                        {tweet.replied_to_tweet.user.name}
                      </div>
                      <div className="ml-2 text-main-light-text text-xs font-tiktok">
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

          {/* Tweet Stats (Read Only) with Date/Time */}
          <div className="flex text-main-light-text text-sm space-x-6 pt-4 border-t border-white/10">
            <div className="flex items-center hover:text-main-accent transition-colors duration-200 group">
              <Icon
                icon="mdi:comment-outline"
                className="w-5 h-5 mr-2    transition-transform duration-200"
              />
              <span>{Math.floor(Math.random() * 100)}</span>
            </div>

            <div className="flex items-center hover:text-main-accent transition-colors duration-200 group">
              <Icon
                icon="mdi:repeat"
                className="w-5 h-5 mr-2    transition-transform duration-200"
              />
              <span>{tweet.retweet_count}</span>
            </div>

            <div className="flex items-center hover:text-main-accent transition-colors duration-200 group">
              <Icon
                icon="mdi:heart-outline"
                className="w-5 h-5 mr-2    transition-transform duration-200"
              />
              <span>{tweet.favorite_count}</span>
            </div>

            <div className="flex items-center ml-auto text-main-accent">
              <div className="text-main-light-text text-sm font-tiktok mr-3">
                {formatTimeAgo(tweet.created_at)}
              </div>
              <a
                href={tweetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block no-underline   transition-transform duration-200"
              >
                <Icon icon="mdi:open-in-new" className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Text Selection Context Menu - Rendered as Portal */}
      {showContextMenu &&
        createPortal(
          <div
            className="fixed z-[9999] bg-black/90 rounded-sm border border-white/20 shadow-lg p-1 context-menu"
            style={{
              left: contextMenuPosition.x,
              top: contextMenuPosition.y - 60,
              transform: "translateX(-50%)",
              pointerEvents: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-1">
              <button
                onClick={() => handleContextMenuOption("Auto")}
                className="flex items-center gap-1 px-3 py-2 text-sm text-main-text hover:bg-white/10 rounded-sm transition-colors duration-200"
              >
                <Icon icon="mdi:auto-fix" className="w-4 h-4" />
                Auto
              </button>
              <button
                onClick={() => handleContextMenuOption("Rapid")}
                className="flex items-center gap-1 px-3 py-2 text-sm text-main-text hover:bg-white/10 rounded-sm transition-colors duration-200"
              >
                <Icon icon="mdi:flash" className="w-4 h-4" />
                Rapid
              </button>
              <button
                onClick={() => handleContextMenuOption("Full")}
                className="flex items-center gap-1 px-3 py-2 text-sm text-main-text hover:bg-white/10 rounded-sm transition-colors duration-200"
              >
                <Icon icon="mdi:fullscreen" className="w-4 h-4" />
                Full
              </button>
              <button
                onClick={() => handleContextMenuOption("Name")}
                className="flex items-center gap-1 px-3 py-2 text-sm text-main-text hover:bg-white/10 rounded-sm transition-colors duration-200"
              >
                <Icon icon="mdi:account" className="w-4 h-4" />
                Name
              </button>
            </div>
          </div>,
          document.body
        )}

      {/* Image Modal for fullscreen view */}
      <ImageModal
        isOpen={isImageModalOpen}
        imageUrl={currentImageUrl}
        onClose={() => setIsImageModalOpen(false)}
      />

      {/* Launch Token Modal */}
      <LaunchTokenModal
        isOpen={showLaunchTokenModal}
        onClose={() => {
          setShowLaunchTokenModal(false);
          setModalInitialValues({ tokenName: "", tokenSymbol: "" });
        }}
        initialTwitterUrl={tweetUrl}
        initialTokenName={modalInitialValues.tokenName}
        initialTokenSymbol={modalInitialValues.tokenSymbol}
        images={[
          ...(tweet?.entities?.media?.[0]?.media_url_https ? [tweet.entities.media[0].media_url_https] : []),
          ...(tweet.user.profile_image_url_https && [tweet.user.profile_image_url_https]),  
          ...(tweet?.quoted_status?.entities?.media?.[0]?.media_url_https ? [tweet?.quoted_status?.entities?.media[0]?.media_url_https] : []),
          ...(tweet?.quoted_status?.user?.profile_image_url_https ? [tweet?.quoted_status?.user?.profile_image_url_https] : []),
          ...(tweet?.replied_to_tweet?.user?.profile_image_url_https ? [tweet?.replied_to_tweet?.user?.profile_image_url_https] : []),
        ]}
      />
    </motion.div>
  );
};

export default Tweet;
