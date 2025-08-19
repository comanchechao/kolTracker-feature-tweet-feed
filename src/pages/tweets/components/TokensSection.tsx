import React from "react";
import EmptyTokensState from "../../tokens/components/EmptyTokensState";

const TokensSection: React.FC = () => {
  return (
    <div className="  bg-black/30 border border-white/10 rounded-sm p-6 shadow-lg backdrop-blur-0">
      <EmptyTokensState />
    </div>
  );
};

export default TokensSection;
