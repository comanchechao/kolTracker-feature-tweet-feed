import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSettings } from "../../../contexts/SettingsContext";
import { useAuth } from "../../../components/AuthProvider";
import { useToastContext } from "../../../contexts/ToastContext";
import { useLoginModalContext } from "../../../contexts/LoginModalContext";
import TradingService from "../../../api/tradingService";

interface ActivityCardProps {
  activity: {
    id: string;
    name: string;
    avatar: string;
    action: string;
    amount: string;
    token: string;
    price: string;
    timestamp: string;
    type: "buy" | "sell";
    walletAddress: string;
    tokenAddress: string;
    transactionHash: string;
    solSpent: string;
  };
  isFirst: boolean;
}

const ActivityCard: React.FC<ActivityCardProps> = React.memo(
  ({ activity, isFirst }) => {
    const { quickBuyAmount, quickSellPercentage } = useSettings();
    const { user } = useAuth();
    const { showSuccess, showError } = useToastContext();
    const loginModalContext = useLoginModalContext();
    const [buyLoading, setBuyLoading] = useState(false);
    const [sellLoading, setSellLoading] = useState(false);

    const handleTokenClick = useCallback(() => {
      window.open(
        `https://dexscreener.com/solana/${activity.tokenAddress}`,
        "_blank"
      );
    }, [activity.tokenAddress]);

    const handleTransactionClick = useCallback(() => {
      window.open(
        `https://solscan.io/tx/${activity.transactionHash}`,
        "_blank"
      );
    }, [activity.transactionHash]);

    const handleBuyToken = useCallback(async () => {
      // Use the withAuth function to ensure the user is authenticated
      loginModalContext.withAuth(async () => {
        setBuyLoading(true);
        try {
          const result = await TradingService.buyToken(
            "0",
            activity.tokenAddress,
            quickBuyAmount
          );

          if (result.success) {
            console.log("Buy order successful:", result);
            const txSignature =
              (result as any).signature || (result as any).result?.signature;
            showSuccess(
              "Buy Order Placed",
              `Successfully placed buy order for ${quickBuyAmount} SOL of ${activity.token}`,
              undefined,
              txSignature
            );
          } else {
            console.log("Buy order failed:", result);
            showError(
              "Buy Order Failed",
              result.message || "Unknown error occurred"
            );
          }
        } catch (error: any) {
          console.error("Buy token error:", error);

          if (error.message === "Access token has expired") {
            showError(
              "Session Expired",
              "Your session has expired. Please log in again."
            );
          } else if (error.message === "Not enough balance") {
            showError(
              "Insufficient Balance",
              `You don't have enough balance to buy ${quickBuyAmount} SOL of ${activity.token}.`
            );
          } else {
            showError(
              "Buy Order Failed",
              error.message || "Failed to place buy order"
            );
          }
        } finally {
          setBuyLoading(false);
        }
      });
    }, [
      loginModalContext,
      user,
      activity.tokenAddress,
      activity.token,
      quickBuyAmount,
      showSuccess,
      showError,
    ]);

    const handleSellToken = useCallback(async () => {
      loginModalContext.withAuth(async () => {
        setSellLoading(true);
        try {
          console.log("Attempting to sell token:", {
            tokenAddress: activity.tokenAddress,
            percentage: quickSellPercentage,
          });

          const result = await TradingService.sellToken(
            "0",
            activity.tokenAddress,
            quickSellPercentage
          );

          if (result.success) {
            console.log("Sell order successful:", result);
            const txSignature =
              (result as any).signature || (result as any).result?.signature;
            showSuccess(
              "Sell Order Placed",
              `Successfully placed sell order for ${quickSellPercentage}% of ${activity.token}`,
              undefined,
              txSignature
            );
          } else {
            console.log("Sell order failed:", result);
            showError(
              "Sell Order Failed",
              result.message || "Unknown error occurred"
            );
          }
        } catch (error: any) {
          console.error("Sell token error:", error);

          if (error.message === "Access token has expired") {
            showError(
              "Session Expired",
              "Your session has expired. Please log in again."
            );
          } else if (error.message === "Not enough balance") {
            showError(
              "Insufficient Balance",
              `You don't have enough ${activity.token} to sell ${quickSellPercentage}%.`
            );
          } else {
            showError(
              "Sell Order Failed",
              error.message || "Failed to place sell order"
            );
          }
        } finally {
          setSellLoading(false);
        }
      });
    }, [
      loginModalContext,
      user,
      activity.tokenAddress,
      activity.token,
      quickSellPercentage,
      showSuccess,
      showError,
    ]);

    // Format timestamp to show how long ago
    const formatTimeAgo = (timestamp: string) => {
      if (timestamp === "now") return "now";

      const now = new Date();
      const activityTime = new Date(timestamp);
      const diffInSeconds = Math.floor(
        (now.getTime() - activityTime.getTime()) / 1000
      );

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
    };

    return (
      <div
        className={`relative bg-gradient-to-tl from-black/40 via-black/60 to-white/10 border border-white/10 rounded-sm p-3 transition-all duration-200 hover:bg-black/40 hover:border-white/20 overflow-hidden ${
          isFirst
            ? "!border-[var(--color-main-highlight)] border-opacity-30"
            : ""
        }`}
      >
        {/* Subtle accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-main-accent/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200"></div>

        <div className="relative z-10">
          {/* User Info Row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-sm flex-shrink-0">
                <img
                  src={activity.avatar}
                  alt={`${activity.name}'s avatar`}
                  className="w-full h-full rounded-sm object-cover border border-white/20"
                />
              </div>
              <div className="flex flex-col">
                <Link
                  to={`/accounts/${activity.walletAddress}`}
                  className="font-tiktok text-sm font-medium text-main-text hover:text-main-accent transition-colors duration-200 cursor-pointer"
                >
                  {activity.name}
                </Link>
                <span className="font-tiktok text-xs text-main-light-text">
                  {formatTimeAgo(activity.timestamp)}
                </span>
              </div>
            </div>
          </div>

          {/* Activity Content */}
          <div className="mb-3">
            <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm">
              <span className="font-tiktok text-main-light-text">
                {activity.action}
              </span>
              <span
                className={`font-tiktok cursor-pointer ${
                  activity.type === "buy" ? "text-green-400" : "text-red-400"
                }`}
                onClick={handleTransactionClick}
                title="View transaction on Solscan"
              >
                {activity.amount}
              </span>
              <span className="font-tiktok text-main-light-text">of</span>
              <span
                className="font-tiktok font-medium text-main-accent cursor-pointer hover:text-main-highlight transition-colors duration-200"
                onClick={handleTokenClick}
              >
                {activity.token}
              </span>
              <span className="font-tiktok text-main-light-text">at</span>
              <span className="font-tiktok font-medium text-main-highlight">
                {activity.price}
              </span>
              <span
                className={`font-tiktok text-xs ${
                  activity.type === "buy" ? "text-green-400" : "text-red-400"
                }`}
              >
                ({activity.solSpent})
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleBuyToken}
              disabled={buyLoading}
              className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-black/60 hover:bg-black/80 border border-white/20 hover:border-green-400/50 rounded-sm transition-all duration-200 cursor-pointer"
            >
              {buyLoading ? (
                <Icon
                  icon="eos-icons:loading"
                  className="w-3 h-3 text-green-400 animate-spin"
                />
              ) : (
                <Icon
                  icon="material-symbols:trending-up"
                  className="w-3 h-3 text-green-400"
                />
              )}
              <span className="font-tiktok text-xs text-main-text">
                {buyLoading ? "Buying..." : `Buy ${quickBuyAmount} SOL`}
              </span>
            </button>

            <button
              onClick={handleSellToken}
              disabled={sellLoading}
              className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-black/60 hover:bg-black/80 border border-white/20 hover:border-red-400/50 rounded-sm transition-all duration-200 cursor-pointer"
            >
              {sellLoading ? (
                <Icon
                  icon="eos-icons:loading"
                  className="w-3 h-3 text-red-400 animate-spin"
                />
              ) : (
                <Icon
                  icon="material-symbols:trending-down"
                  className="w-3 h-3 text-red-400"
                />
              )}
              <span className="font-tiktok text-xs text-main-text">
                {sellLoading ? "Selling..." : `Sell ${quickSellPercentage}%`}
              </span>
            </button>
          </div>

          {/* Transaction Link */}
          <div className="flex justify-end mt-2">
            <button
              onClick={handleTransactionClick}
              className="text-main-light-text hover:text-main-accent transition-colors duration-200 p-1"
              title="View transaction on Solscan"
            >
              <Icon icon="mdi:open-in-new" className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.activity === nextProps.activity &&
      prevProps.isFirst === nextProps.isFirst
    );
  }
);

export default ActivityCard;
