import React from 'react';
import { Icon } from '@iconify/react';

interface MyFeedProps {
}

const MyFeed: React.FC<MyFeedProps> = () => {
  return (
    <div>
      {/* Search input */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon icon="material-symbols:search" className="w-4 h-4 text-main-light-text" />
        </div>
        <input
          type="text"
          placeholder="Search your feed..."
          className="w-full pl-10 pr-4 py-2 bg-white/[0.03] border border-white/[0.1] rounded-lg text-main-light-text focus:outline-none focus:border-main-accent transition-colors duration-200"
        />
      </div>

      {/* User list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {[
          {
            id: 6253282,
            screen_name: 'WilliamShatner',
            name: 'William Shatner',
            profile_image_url_https: 'https://pbs.twimg.com/profile_images/1478179341582299138/2paPd3Uk_400x400.jpg',
            followers: '6.1M',
            verified: true
          },
          {
            id: 783214,
            screen_name: 'Lowkeytycoon1',
            name: 'JEFFREY',
            profile_image_url_https: 'https://pbs.twimg.com/profile_images/1955358549766193152/slHPNSMj_400x400.jpg',
            followers: '67.5M',
            verified: true
          },
          {
            id: 11348282,
            screen_name: 'deepfates',
            name: 'superfates',
            profile_image_url_https: 'https://pbs.twimg.com/profile_images/1946272447189106689/XbIjiaT-_400x400.png',
            followers: '181.4M',
            verified: true
          },
          {
            id: 44196397,
            screen_name: '_littlepop',
            name: 'Little Pop',
            profile_image_url_https: 'https://pbs.twimg.com/profile_images/1478179341582299138/2paPd3Uk_400x400.jpg',
            followers: '2.3M',
            verified: false
          },
          {
            id: 937482,
            screen_name: 'b__s',
            name: 'B.S.',
            profile_image_url_https: 'https://pbs.twimg.com/profile_images/1955358549766193152/slHPNSMj_400x400.jpg',
            followers: '542K',
            verified: true
          },
          {
            id: 8372651,
            screen_name: 'bolivian',
            name: 'Bolivian',
            profile_image_url_https: 'https://pbs.twimg.com/profile_images/1946272447189106689/XbIjiaT-_400x400.png',
            followers: '1.2M',
            verified: false
          }
        ].map((user) => (
          <div key={user.id} className="flex items-center justify-between p-2 sm:p-3 hover:bg-white/[0.03] rounded-lg transition-colors duration-200 border border-white/[0.05]">
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
              <img
                src={user.profile_image_url_https}
                alt={user.name}
                className="w-7 h-7 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <p className="text-xs sm:text-sm font-medium text-main-text truncate">{user.screen_name}</p>
                  {user.verified && (
                    <Icon icon="material-symbols:verified" className="w-3 h-3 sm:w-4 sm:h-4 text-main-accent flex-shrink-0" />
                  )}
                </div>
                <p className="text-[10px] sm:text-xs text-main-light-text truncate">{user.followers} followers</p>
              </div>
            </div>
            <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
              <button className="p-1 sm:p-1.5 rounded-full hover:bg-white/[0.06] text-main-light-text hover:text-main-accent transition-colors duration-200">
                <Icon icon="material-symbols:notifications" className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <button className="p-1 sm:p-1.5 rounded-full hover:bg-white/[0.06] text-main-light-text hover:text-red-400 transition-colors duration-200">
                <Icon icon="material-symbols:delete-outline" className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button className="p-1 rounded-full bg-white/[0.03] hover:bg-white/[0.06] text-main-light-text transition-colors duration-200">
          <Icon icon="material-symbols:chevron-left" className="w-5 h-5" />
        </button>
        <span className="px-3 py-1 rounded-md bg-white/[0.06] text-main-accent text-sm">1</span>
        <button className="p-1 rounded-full bg-white/[0.03] hover:bg-white/[0.06] text-main-light-text transition-colors duration-200">
          <Icon icon="material-symbols:chevron-right" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MyFeed;