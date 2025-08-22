import React from "react";
import EmptyTokensState from "../../tokens/components/EmptyTokensState";

const TokensSection: React.FC = () => {
  return (
    <div className="  backdrop-blur-xl bg-white/[0.05] 30 border border-white/10 rounded-sm p-6 shadow-lg  ">
      <EmptyTokensState />
    </div>
  );
};

export default TokensSection;
