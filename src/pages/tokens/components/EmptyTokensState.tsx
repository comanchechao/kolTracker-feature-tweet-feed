import React from 'react';

interface EmptyTokensStateProps {
  message?: string;
}

const EmptyTokensState: React.FC<EmptyTokensStateProps> = ({ 
  message = 'No tokens available at the moment.'
}) => {
  return (
    <div className="p-8 text-center empty-state">
      <div className="flex justify-center mb-4">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 9H9V15H15V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h3 className="text-xl font-bold mb-2 empty-state-title font-tiktok">No tokens yet</h3>
      <p className="empty-state-message">{message}</p>
    </div>
  );
};

export default EmptyTokensState;