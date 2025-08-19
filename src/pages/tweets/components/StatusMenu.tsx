import React from "react";

interface StatusMenuProps {
  isConnected: boolean;
  statusMessage: string;
  onToggleConnection: () => void;
}

const StatusMenu: React.FC<StatusMenuProps> = ({
  isConnected,
  statusMessage,
  onToggleConnection,
}) => {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full z-40">
      <div className="flex items-center justify-between space-x-4 mx-8   bg-black/80 hover:bg-black/90 border border-white/10 hover:border-white/20 px-6 py-2 transition-all duration-200 shadow-lg rounded-sm">
        {/* Status Message */}
        <div className="flex items-center space-x-2">
          <span className="font-tiktok text-xs text-main-light-text">
            {statusMessage}
          </span>
        </div>

        {/* Twitter Connection Status */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div
              className={`w-4 h-4 rounded-sm transition-all duration-200 ${
                isConnected ? "bg-green-400" : "bg-red-400"
              }`}
            >
              {isConnected && (
                <div className="absolute inset-0 bg-main-accent rounded-sm animate-ping opacity-40"></div>
              )}
            </div>
          </div>
          <span className="font-tiktok text-xs text-main-light-text">
            {isConnected ? "X Connected" : "X Disconnected"}
          </span>
          <button
            onClick={onToggleConnection}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white transition-all duration-200 bg-black/60 hover:bg-black/80 border border-white/20 hover:border-white/30 rounded-sm"
          >
            {isConnected ? "Disconnect" : "Connect"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusMenu;
