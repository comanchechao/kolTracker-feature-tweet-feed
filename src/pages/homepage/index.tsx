import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import ActivityFeed from "./components/ActivityFeed";
import { KOLService } from "../../api";
import { TradeData } from "../../types/api";
import { useWebSocket } from "../../hooks/useWebSocket";
import { WebSocketMessage } from "../../types/websocket";
import "../../css/index.css";
import Skeleton from "../../components/Skeleton";
import TrendingRibbon from "../../components/TrendingRibbon";
import Tweet from "../tweets/components/Tweet";
import LaunchTokenModal from "../tweets/components/LaunchTokenModal";
import TokensSection from "../tweets/components/TokensSection";
import {
  useTwitterWebSocket,
  TwitterTweetData,
} from "../../hooks/useTwitterWebSocket";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useIsMobile } from "../../hooks/useIsMobile";

const customAnimations = `
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
  
  .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
  .animate-slideInLeft { animation: slideInLeft 0.5s ease-out; }
`;

const formatAmount = (amount: number | string): string => {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(numAmount)) {
    return "0";
  }
  if (numAmount >= 1000000) {
    return `${(numAmount / 1000000).toFixed(1)}M`;
  } else if (numAmount >= 1000) {
    return `${(numAmount / 1000).toFixed(1)}K`;
  }
  return numAmount.toString();
};

const formatPrice = (price: number | string): string => {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(numPrice)) {
    return "$0.00";
  }
  if (numPrice < 0.001) {
    return `$${numPrice.toFixed(8)}`;
  } else if (numPrice < 1) {
    return `$${numPrice.toFixed(6)}`;
  }
  return `$${numPrice.toFixed(2)}`;
};

const formatTime = (timestamp: string | number): string => {
  const now = new Date();
  let timestampNum =
    typeof timestamp === "string" ? parseInt(timestamp, 10) : timestamp;

  if (timestampNum > now.getTime() * 1000) {
    timestampNum = Math.floor(timestampNum / 1000);
    console.log("🔄 Converted timestamp from microseconds:", timestampNum);
  }

  const tradeTime = new Date(timestampNum);

  if (isNaN(tradeTime.getTime())) {
    console.warn("❌ Invalid timestamp:", timestamp);
    return "Unknown time";
  }

  const diffInSeconds = Math.floor(
    (now.getTime() - tradeTime.getTime()) / 1000
  );

  let formattedTime;
  if (diffInSeconds < 0) {
    formattedTime = "now";
  } else if (diffInSeconds < 60) {
    formattedTime = `${Math.max(diffInSeconds, 1)}s ago`;
  } else if (diffInSeconds < 3600) {
    formattedTime = `${Math.floor(diffInSeconds / 60)}m ago`;
  } else if (diffInSeconds < 86400) {
    formattedTime = `${Math.floor(diffInSeconds / 3600)}h ago`;
  } else {
    formattedTime = `${Math.floor(diffInSeconds / 86400)}d ago`;
  }

  return formattedTime;
};

const formatSolAmount = (
  solAmount: number | string | undefined | null
): string => {
  if (solAmount === undefined || solAmount === null) {
    return "0 SOL";
  }

  let numAmount: number;
  if (typeof solAmount === "string") {
    numAmount = parseFloat(solAmount);
  } else {
    numAmount = solAmount;
  }

  if (isNaN(numAmount) || numAmount === 0) {
    return "0 SOL";
  }

  if (numAmount < 0.001) {
    return `${numAmount.toFixed(6)} SOL`;
  } else if (numAmount < 1) {
    return `${numAmount.toFixed(4)} SOL`;
  } else if (numAmount < 100) {
    return `${numAmount.toFixed(3)} SOL`;
  } else {
    return `${numAmount.toFixed(2)} SOL`;
  }
};

const HomePage: React.FC = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  const [tweets, setTweets] = useState<TwitterTweetData[]>([]);
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
  const [showTweetTokens, setShowTweetTokens] = useState(false);
  const isTweetMobile = useIsMobile();

  const activitiesMapRef = useRef<Map<string, any>>(new Map());

  // Use the new Twitter WebSocket hook
  const { isConnected: isTweetConnected, isConnecting: isTweetInitialLoading } =
    useTwitterWebSocket(
      (tweet: TwitterTweetData) => {
        setTweets((prevTweets) => [tweet, ...prevTweets].slice(0, 50)); // Keep only the latest 50 tweets
      },
      () => {
        // onConnect callback
        console.log("Twitter WebSocket connected");
      },
      () => {
        // onDisconnect callback
        console.log("Twitter WebSocket disconnected");
      }
    );

  const convertTradeToActivity = useCallback((trade: TradeData) => {
    if (!trade.transactionHash) {
      console.warn("⚠️ Skipping trade without transaction hash:", {
        username: trade.username,
        tradeType: trade.tradeType,
        tokenSymbol: trade.tokenSymbol,
        timestamp: trade.timestamp,
      });
      return null;
    }

    const activity = {
      id: trade.transactionHash,
      name: trade.username,
      avatar: trade.profileImage,
      action: trade.tradeType === "buy" ? "bought" : "sold",
      amount: formatAmount(trade.amount),
      token: trade.tokenSymbol || trade.tokenName,
      price: formatPrice(trade.price),
      timestamp: formatTime(trade.timestamp),
      type: trade.tradeType,
      walletAddress: trade.walletAddress,
      transactionHash: trade.transactionHash,
      tokenAddress: trade.tokenAddress,
      solSpent: formatSolAmount(trade.solSpent ?? 0),
    };

    // console.log("✅ Created activity:", {
    //   id: activity.id,
    //   name: activity.name,
    //   action: activity.action,
    //   token: activity.token,
    //   timestamp: activity.timestamp,
    // });

    return activity;
  }, []);

  const handleNewTrades = useCallback(
    (trades: TradeData[]) => {
      const newActivities = trades
        .map((trade) => convertTradeToActivity(trade))
        .filter(
          (activity): activity is NonNullable<typeof activity> =>
            activity !== null
        )
        .reverse();

      setActivities((prevActivities) => {
        const genuinelyNewActivities: any[] = [];

        newActivities.forEach((activity) => {
          if (!activitiesMapRef.current.has(activity.id)) {
            activitiesMapRef.current.set(activity.id, activity);
            genuinelyNewActivities.push(activity);
          }
        });

        if (genuinelyNewActivities.length === 0) {
          console.log("🚫 No new activities to add (all duplicates)");
          return prevActivities;
        }

        const updatedActivities = [
          ...genuinelyNewActivities,
          ...prevActivities,
        ].slice(0, 10);

        // console.log("✅ Updated activities with new entries:", {
        //   newCount: genuinelyNewActivities.length,
        //   totalCount: updatedActivities.length,
        //   newActivities: genuinelyNewActivities.map((a) => ({
        //     timestamp: a.timestamp,
        //     name: a.name,
        //     id: a.id,
        //     action: a.action,
        //     token: a.token,
        //   })),
        //   allTimestamps: updatedActivities.map((a) => a.timestamp),
        // });

        const newMap = new Map();
        updatedActivities.forEach((activity) => {
          newMap.set(activity.id, activity);
        });
        activitiesMapRef.current = newMap;

        return updatedActivities;
      });

      setLoading(false);
    },
    [convertTradeToActivity]
  );

  const handleWebSocketMessage = useCallback(
    (message: WebSocketMessage) => {
      // console.log("🔌 WebSocket message received:", {
      //   event: message.event,
      //   timestamp: message.timestamp,
      //   messageTime: message.timestamp
      //     ? new Date(message.timestamp).toISOString()
      //     : "no timestamp",
      // });

      if (message.event === "subscribe_copytrades" && message.data?.trades) {
        // console.log(
        //   "📥 Processing subscribe_copytrades with",
        //   message.data.trades.length,
        //   "trades"
        // );
        handleNewTrades(message.data.trades);
      } else if (
        message.event === "new_trade" &&
        message.tradeData?.tradeDataToBroadcast
      ) {
        // console.log("📥 Processing new_trade:", {
        //   username: message.tradeData.tradeDataToBroadcast.username,
        //   tradeType: message.tradeData.tradeDataToBroadcast.tradeType,
        //   tokenSymbol: message.tradeData.tradeDataToBroadcast.tokenSymbol,
        //   timestamp: message.tradeData.tradeDataToBroadcast.timestamp,
        //   transactionHash:
        //     message.tradeData.tradeDataToBroadcast.transactionHash,
        // });
        handleNewTrades([message.tradeData.tradeDataToBroadcast]);
      } else {
        console.log("🚫 WebSocket message not processed:", message.event);
      }
    },
    [handleNewTrades]
  );

  const { isConnected } = useWebSocket<WebSocketMessage>(
    handleWebSocketMessage,
    { subscribeCopyTrades: true, subscribeMarketCapUpdates: false }
  );

  const fetchRecentTrades = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await KOLService.getRecentTrades();

      if (!response || !response.success || !response.data) {
        console.warn("Invalid trades data received:", response);
        setError("Invalid data received from server");
        setActivities([]);
        return;
      }

      const formattedActivities = response.data
        .map(convertTradeToActivity)
        .filter(
          (activity): activity is NonNullable<typeof activity> =>
            activity !== null
        );
      const limitedActivities = formattedActivities.slice(0, 10);

      activitiesMapRef.current.clear();
      limitedActivities.forEach((activity) => {
        activitiesMapRef.current.set(activity.id, activity);
      });

      setActivities(limitedActivities);
    } catch (err) {
      console.error("Failed to fetch recent trades:", err);
      setError("Failed to load recent trades");
      setActivities([]);
    } finally {
      setLoading(false);
    }
  }, [convertTradeToActivity]);

  const memoizedActivities = useMemo(() => activities, [activities]);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = customAnimations;
    document.head.appendChild(styleSheet);

    if (!isConnected) {
      fetchRecentTrades();
    }

    let interval: NodeJS.Timeout | null = null;
    if (!isConnected) {
      interval = setInterval(() => {
        fetchRecentTrades();
      }, 30000);
    }

    if (feedRef.current) {
      gsap.fromTo(
        feedRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isConnected, fetchRecentTrades]);

  return (
    <>
      <div className="h-full w-screen main-grid-bg flex-1 min-h-0   p-4 bg-main-bg relative  ">
        {/* Simple background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-light-bg opacity-10 rounded-full"></div>
        </div>

        <TrendingRibbon />

        {/* Mobile View Toggle - Floating Button */}
        {isTweetMobile && (
          <div className="fixed bottom-20 right-4 z-50">
            <div className="relative">
              {/* Toggle Button */}
              <button
                onClick={() => setShowTweetTokens(!showTweetTokens)}
                className="group bg-black/80 border border-white/10 text-white rounded-sm p-4 shadow-lg transition-all duration-200 hover:bg-black/90 hover:border-white/20 active:scale-95"
              >
                <Icon
                  icon={
                    showTweetTokens
                      ? "material-symbols:chat"
                      : "material-symbols:token"
                  }
                  className="w-6 h-6"
                />
              </button>

              {/* Tooltip */}
              <div className="absolute -left-24 top-1/2 transform -translate-y-1/2 bg-black/90 text-white text-xs px-3 py-2 rounded-sm whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100 border border-white/10">
                Switch to {showTweetTokens ? "Tweets" : "Tokens"}
              </div>
            </div>
          </div>
        )}

        {/* Live Feed Section with Sidebar Layout */}
        <div className="relative z-10 h-full flex flex-col pt-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col">
            {/* Main Content and Activity Feed Sidebar */}
            <div className="flex gap-6   pb-8">
              {/* Main Content Area */}
              <div
                className={`flex-1 flex flex-col ${
                  isTweetMobile && showTweetTokens ? "hidden" : ""
                }`}
              >
                {loading ? (
                  <div className="space-y-4 h-full overflow-y-auto    ">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-main-dark p-4 rounded-lg shadow-lg flex items-center space-x-4 w-full"
                      >
                        <Skeleton
                          width="100%"
                          height={66}
                          className="rounded-full flex-shrink-0"
                        />
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-12   flex items-center justify-center">
                    <div>
                      <p className="text-red-400 font-tiktok mb-4">{error}</p>
                      <button
                        onClick={fetchRecentTrades}
                        className="px-6 py-2 bg-main-accent hover:bg-main-highlight text-main-bg font-tiktok rounded-xl transition-all duration-300"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/[0.03] border border-white/[0.1] rounded-sm p-6   flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4 flex-shrink-0">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            isTweetConnected ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></div>
                        <span className="font-tiktok text-xs text-main-light-text">
                          {isTweetConnected ? "Live" : "Offline"}
                        </span>
                      </div>
                    </div>

                    {/* Tweet Content - Scrollable */}
                    <div className="space-y-4  h-full overflow-y-auto no-scrollbar">
                      {tweets.length === 0 ? (
                        <div className="text-center py-8">
                          <div className="mb-4">
                            <Icon
                              icon="line-md:twitter-x"
                              className="w-12 h-12 text-main-accent mx-auto opacity-40"
                            />
                          </div>
                          <h4 className="text-lg font-bold mb-2 font-tiktok text-main-text">
                            No tweets yet
                          </h4>
                          <p className="text-sm text-main-light-text mb-4">
                            {isTweetConnected
                              ? "Waiting for tweets to arrive..."
                              : "Connect to the X stream to see live tweets"}
                          </p>
                          {isTweetConnected && isTweetInitialLoading && (
                            <LoadingSpinner size="sm" text="Loading tweets" />
                          )}
                        </div>
                      ) : (
                        tweets.map((tweet) => (
                          <Tweet key={tweet.tweetId} tweet={tweet} />
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Tokens Section - Show on mobile when toggled */}
              {isTweetMobile && showTweetTokens && (
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="tokens-container flex-1 overflow-y-auto no-scrollbar">
                    <TokensSection />
                  </div>
                </div>
              )}

              {/* Activity Feed Sidebar */}
              <div
                className={`hidden lg:block flex-shrink-0 ${
                  isTweetMobile && showTweetTokens ? "hidden" : ""
                }`}
              >
                {!loading && !error && (
                  <ActivityFeed
                    activities={memoizedActivities}
                    feedRef={feedRef}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Launch Token Modal */}
      <LaunchTokenModal
        isOpen={isLaunchModalOpen}
        onClose={() => setIsLaunchModalOpen(false)}
      />
    </>
  );
};

export default HomePage;
