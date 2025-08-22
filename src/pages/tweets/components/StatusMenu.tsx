import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useWebSocket } from "../../../hooks/useWebSocket";
import { WebSocketMessage } from "../../../types/websocket";

interface StatusMenuProps {
  isTweetConnected: boolean;
   onToggleTweetConnection: () => void;
}

const StatusMenu: React.FC<StatusMenuProps> = ({
  isTweetConnected,
   onToggleTweetConnection,
}) => {
  const [solPrice, setSolPrice] = useState<number | null>(null);

  const handleWebSocketMessage = () => {};

  const { isConnected: isWebSocketConnected } = useWebSocket<WebSocketMessage>(
    handleWebSocketMessage
  );

  useEffect(() => {
    const fetchSolPrice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
        );
        const data = await response.json();
        setSolPrice(data.solana.usd);
      } catch (error) {
        console.error("Error fetching SOL price:", error);
      }
    };

    fetchSolPrice();
    const interval = setInterval(fetchSolPrice, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full z-40">
      <div className="flex items-center justify-between space-x-4 mx-8 bg-black  hover:bg-black/90 border border-white/10 hover:border-white/20 px-6 py-2 transition-all duration-200 shadow-lg rounded-sm">
        {/* Status Message */}
        <div className="flex items-center space-x-4">
         
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-white/10">
              <Icon
                icon="token-branded:solana"
                className="text-main-accent w-3 h-3"
              />
            </div>
            <span className="font-tiktok text-xs text-main-light-text">
              SOL
            </span>
            <span className="font-tiktok text-xs text-main-accent font-semibold">
              ${solPrice ? solPrice.toFixed(2) : "---"}
            </span>
          </div>{" "}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div
                className={`w-3 h-3 rounded-sm transition-all duration-300 ${
                  isWebSocketConnected
                    ? "bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                    : "bg-red-400 shadow-[0_0_8px_rgba(239,68,68,0.6)]"
                }`}
              >
                {isWebSocketConnected && (
                  <div className="absolute inset-0 bg-green-400 rounded-sm animate-ping opacity-40"></div>
                )}
              </div>
            </div>
            <span className="font-tiktok text-xs text-main-light-text">
              {isWebSocketConnected ? "Live" : "Offline"}
            </span>
          </div>
        </div>

        {/* SOL Price */}

        {/* Divider */}
        <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>

        {/* WebSocket Status */}

        {/* Divider */}
        <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>

        {/* Twitter Connection Status */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div
              className={`w-4 h-4 rounded-sm transition-all duration-200 ${
                isTweetConnected ? "bg-green-400" : "bg-red-400"
              }`}
            >
              {isTweetConnected && (
                <div className="absolute inset-0 bg-main-accent rounded-sm animate-ping opacity-40"></div>
              )}
            </div>
          </div>
          <span className="font-tiktok text-xs text-main-light-text">
            {isTweetConnected ? "X Connected" : "X Disconnected"}
          </span>
          <button
            onClick={onToggleTweetConnection}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white transition-all duration-200 bg-black/60 hover:bg-black/80 border border-white/20 hover:border-white/30 rounded-sm"
          >
            {isTweetConnected ? "Disconnect" : "Connect"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusMenu;
