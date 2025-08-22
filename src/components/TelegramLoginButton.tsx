import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useAuth } from "./AuthProvider";
import { useToastContext } from "../contexts/ToastContext";

const TelegramLoginButton: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { showWarning, showInfo } = useToastContext();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTelegramLogin = async () => {
    if (isAuthenticated && user?.authMethod === "wallet") {
      showWarning(
        "Wallet Authentication Active",
        "Please sign out from your wallet authentication first, then you can sign in with Telegram."
      );
      return;
    }

    if (isAuthenticated && user?.authMethod === "telegram") {
      return;
    }

    if (isAuthenticated && user?.authMethod === "telegram") {
      showInfo(
        "Already Authenticated",
        "You are already signed in with Telegram."
      );
      return;
    }

    setIsProcessing(true);
    try {
      window.open(
        "https://t.me/cherrysniperbot?start=login_cherry_tracker",
        "_blank"
      );
      showInfo(
        "Telegram Login",
        "Opening Telegram bot. Please follow the instructions to complete your login."
      );
    } catch (error) {
      console.error("Error opening Telegram login:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isAuthenticated && user?.authMethod === "telegram") {
    return null;
  }

  return (
    <button
      onClick={handleTelegramLogin}
      disabled={isProcessing}
      className="flex items-center gap-3 px-5 py-2 bg-black/60 hover:bg-black/80 border border-white/20 hover:border-white/30 rounded-sm transition-all duration-200 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <Icon
        icon="logos:telegram"
        className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-all duration-300"
      />
      <span className="font-tiktok text-sm text-main-text group-hover:text-blue-400 transition-colors duration-300">
        {isProcessing ? "Opening..." : "Login with Telegram"}
      </span>
    </button>
  );
};

export default TelegramLoginButton;
