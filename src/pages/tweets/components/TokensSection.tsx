import React from 'react';
import EmptyTokensState from '../../tokens/components/EmptyTokensState';

const TokensSection: React.FC = () => {
  return (
    <div className="tokens-section bg-gradient-to-br from-main-bg via-main-bg to-main-bg-dark rounded-xl border border-white/[0.1] p-4">
      <EmptyTokensState  />
    </div>
  );
};

export default TokensSection;