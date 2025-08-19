import { Icon } from "@iconify/react/dist/iconify.js";
interface AccountProps {}
const Account: React.FC<AccountProps> = () => {
  return (
    <div>
      {/* Account section */}
      <div className="bg-white/[0.03] rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 border border-white/[0.1]">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-main-accent/20 rounded-full flex items-center justify-center text-main-accent font-bold text-lg sm:text-xl flex-shrink-0">
            F
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold text-main-text truncate">
                Name
              </h3>
              <span className="px-2 py-0.5 bg-main-accent/20 text-main-accent text-xs rounded-full flex-shrink-0">
                Free
              </span>
            </div>
            <p className="text-sm text-main-light-text truncate">@username</p>
          </div>
          <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
            <button className="p-1 sm:p-1.5 rounded-full hover:bg-white/[0.06] text-main-light-text hover:text-main-accent transition-colors duration-200">
              <Icon
                icon="material-symbols:content-copy"
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
            </button>
            <button className="p-1 sm:p-1.5 rounded-full hover:bg-white/[0.06] text-main-light-text hover:text-main-accent transition-colors duration-200">
              <Icon
                icon="material-symbols:open-in-new"
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Referral Program */}
      <div className="bg-white/[0.03] rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 border border-white/[0.1]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 sm:gap-2">
            <Icon
              icon="material-symbols:share"
              className="w-4 h-4 sm:w-5 sm:h-5 text-main-accent flex-shrink-0"
            />
            <h3 className="text-sm sm:text-md font-bold text-main-text">
              Referral Program
            </h3>
          </div>
          <span className="px-2 py-0.5 bg-main-accent/20 text-main-accent text-xs rounded-full flex-shrink-0">
            5% reward
          </span>
        </div>
        <p className="text-xs sm:text-sm text-main-light-text mb-3">
          Share your referral link and earn 5% of all fees paid by users you
          refer!
        </p>

        <div className="flex items-center mb-2">
          <input
            type="text"
            value="https://hypeignite.io/@username"
            readOnly
            className="flex-1 bg-white/[0.03] border border-white/[0.1] rounded-l-lg py-1.5 sm:py-2 px-2 sm:px-3 text-main-light-text text-xs sm:text-sm focus:outline-none overflow-hidden text-ellipsis whitespace-nowrap"
          />
          <button className="bg-main-accent hover:bg-main-accent/90 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-r-lg transition-colors duration-200 flex items-center gap-1 whitespace-nowrap">
            <Icon
              icon="material-symbols:share"
              className="w-3 h-3 sm:w-4 sm:h-4"
            />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-white/[0.03] rounded-lg p-3 sm:p-4 border border-white/[0.1]">
          <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
            <Icon
              icon="material-symbols:token"
              className="w-4 h-4 sm:w-5 sm:h-5 text-main-accent flex-shrink-0"
            />
            <h3 className="text-xs sm:text-sm font-medium text-main-light-text">
              Tokens
            </h3>
          </div>
          <p className="text-lg sm:text-xl font-bold text-main-text">0</p>
        </div>

        <div className="bg-white/[0.03] rounded-lg p-3 sm:p-4 border border-white/[0.1]">
          <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
            <Icon
              icon="material-symbols:attach-money"
              className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0"
            />
            <h3 className="text-xs sm:text-sm font-medium text-main-light-text">
              Total Earned
            </h3>
          </div>
          <p className="text-lg sm:text-xl font-bold text-main-text">
            0.00 SOL
          </p>
        </div>

        <div className="bg-white/[0.03] rounded-lg p-3 sm:p-4 border border-white/[0.1]">
          <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
            <Icon
              icon="material-symbols:diamond"
              className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0"
            />
            <h3 className="text-xs sm:text-sm font-medium text-main-light-text">
              Claimable
            </h3>
          </div>
          <p className="text-lg sm:text-xl font-bold text-main-text">
            0.00 SOL
          </p>
        </div>
      </div>

      {/* Referrals */}
      <div className="bg-white/[0.03] rounded-lg p-4 sm:p-6 border border-white/[0.1] flex flex-col items-center justify-center">
        <Icon
          icon="material-symbols:people"
          className="w-10 h-10 sm:w-12 sm:h-12 text-main-light-text/30 mb-2"
        />
        <h3 className="text-sm sm:text-md font-bold text-main-text mb-1">
          No referrals yet
        </h3>
        <p className="text-xs sm:text-sm text-main-light-text">
          Share your link to start earning!
        </p>
      </div>
    </div>
  );
};
export default Account;
