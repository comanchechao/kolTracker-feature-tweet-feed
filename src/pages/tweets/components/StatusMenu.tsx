import React from "react";

interface StatusMenuProps {
  isConnected: boolean;
  statusMessage: string;
  onToggleConnection: () => void;
}

const StatusMenu: React.FC<StatusMenuProps> = ({ 
  isConnected, 
  statusMessage, 
  onToggleConnection 
}) => {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full z-40">
      <div className="flex items-center justify-between space-x-3 backdrop-blur-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.15] hover:border-main-accent/40 px-6 py-2 transition-all duration-500 shadow-2xl shadow-black/20">
        {/* Status Message */}
        <div className="flex items-center space-x-2">
          <span className="font-tiktok text-xs text-main-light-text">
            {statusMessage}
          </span>
        </div>

        {/* Twitter Connection Status */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                isConnected
                  ? "bg-green-400  shadow-[0_0_8px_rgba(29,161,242,0.6)]"
                  : "bg-red-400 shadow-[0_0_8px_rgba(239,68,68,0.6)]"
              }`}
            >
              {isConnected && (
                <div className="absolute inset-0 bg-main-accent rounded-full animate-ping opacity-40"></div>
              )}
            </div>
          </div>
          <span className="font-tiktok text-xs text-main-light-text">
            {isConnected ? "Twitter Connected" : "Twitter Disconnected"}
          </span>
          <button 
            onClick={onToggleConnection}
            className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-white transition-all duration-200 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full hover:from-gray-700 hover:to-gray-800 hover:shadow-lg hover:scale-105 opacity-90 hover:opacity-100 shadow-md border border-gray-700"
          >
            {isConnected ? "Disconnect" : "Connect"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusMenu;