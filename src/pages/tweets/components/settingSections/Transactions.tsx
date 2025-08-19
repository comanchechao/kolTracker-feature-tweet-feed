import React, { useState } from 'react';
import { Icon } from '@iconify/react';

interface TransactionsProps {
  isMobile: boolean;
}

const Transactions: React.FC<TransactionsProps> = ({ isMobile }) => {
  const [transactionProcessor, setTransactionProcessor] = useState<string>('astralane');
  const [tipAmount, setTipAmount] = useState<string>('0.001');

  return (
    <div className={`${isMobile ? 'px-2' : ''}`}>
      {/* Transaction Processing */}
      <div className={`bg-white/[0.03] rounded-lg border border-white/[0.1] mb-4 ${
        isMobile ? 'p-3' : 'p-4'
      }`}>
        <div className={`flex items-center justify-between ${
          isMobile ? 'mb-3' : 'mb-4'
        }`}>
          <h3 className={`font-medium text-main-text ${
            isMobile ? 'text-base' : 'text-sm'
          }`}>Transaction Processing</h3>
        </div>
        <p className={`text-main-light-text mb-4 ${
          isMobile ? 'text-sm leading-relaxed' : 'text-sm'
        }`}>Select the transaction processor and configure tip settings.</p>

        <div className="mb-4">
          <label className={`text-main-light-text mb-2 block ${
            isMobile ? 'text-sm font-medium' : 'text-sm'
          }`}>Transaction Processor</label>
          <div className="relative">
            <select
              value={transactionProcessor}
              onChange={(e) => setTransactionProcessor(e.target.value)}
              className={`w-full bg-white/[0.03] border border-white/[0.1] rounded-lg text-main-light-text appearance-none focus:outline-none focus:border-main-accent transition-colors duration-200 ${
                isMobile ? 'p-3 text-base' : 'p-2 text-sm'
              }`}
            >
              <option value="astralane">Astralane</option>
              <option value="jito">Jito</option>
              <option value="mev">MEV</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Icon icon="material-symbols:keyboard-arrow-down-rounded" className={`text-main-light-text ${
                isMobile ? 'w-6 h-6' : 'w-5 h-5'
              }`} />
            </div>
          </div>
          <div className={`flex items-center mt-1 text-main-accent ${
            isMobile ? 'text-sm' : 'text-xs'
          }`}>
            <span>Fastest</span>
          </div>
        </div>

        <div className="mb-4">
          <label className={`text-main-light-text mb-2 block ${
            isMobile ? 'text-sm font-medium' : 'text-sm'
          }`}>Tip Amount (SOL)</label>
          <input
            type="text"
            value={tipAmount}
            onChange={(e) => setTipAmount(e.target.value)}
            placeholder="0.001"
            className={`w-full bg-white/[0.03] border border-white/[0.1] rounded-lg text-main-light-text placeholder-main-light-text/50 appearance-none focus:outline-none focus:border-main-accent transition-colors duration-200 ${
              isMobile ? 'p-3 text-base' : 'p-2 text-sm'
            }`}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className={`flex items-center justify-center gap-1 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.1] rounded-lg text-main-light-text transition-colors duration-200 ${
          isMobile ? 'px-6 py-3 text-base touch-manipulation' : 'px-4 py-2 text-sm'
        }`}>
          <Icon icon="material-symbols:save" className={`${
            isMobile ? 'w-5 h-5' : 'w-4 h-4'
          }`} />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
};

export default Transactions;