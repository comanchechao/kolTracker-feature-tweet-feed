import React from "react";

interface EmptyTokensStateProps {
  message?: string;
}

const EmptyTokensState: React.FC<EmptyTokensStateProps> = ({
  message = "Your tokens will appear here",
}) => {
  return (
    <div className="p-8 text-center">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-black/40 border border-white/10 rounded-sm flex items-center justify-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-main-accent"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 9H9V15H15V9Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3 font-tiktok text-main-text">
        No tokens yet
      </h3>
      <p className="text-main-light-text text-sm font-tiktok mb-6">{message}</p>
      <button className="px-4 py-2 bg-black/60 hover:bg-black/80 border border-white/20 hover:border-white/30 text-white text-sm font-medium rounded-sm transition-all duration-200 flex items-center gap-2 mx-auto">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 6L12 2L8 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 2V15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Refresh
      </button>
    </div>
  );
};

export default EmptyTokensState;
