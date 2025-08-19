import React, { useState } from 'react';
import { Icon } from '@iconify/react';

interface NotificationsProps {
  isMobile: boolean;
}

const Notifications: React.FC<NotificationsProps> = ({ isMobile }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(75);

  return (
    <div className={`${isMobile ? 'px-2' : ''}`}>
      {/* Notifications Settings */}
      <div className={`bg-white/[0.03] rounded-lg border border-white/[0.1] mb-4 ${
        isMobile ? 'p-3' : 'p-4'
      }`}>
        <div className={`flex items-center justify-between ${
          isMobile ? 'mb-3 flex-row md:flex-col sm:flex-row gap-3 sm:gap-0' : 'mb-4'
        }`}>
          <div className="flex items-center gap-2">
            <Icon icon="material-symbols:notifications" className={`text-main-accent ${
              isMobile ? 'w-6 h-6' : 'w-5 h-5'
            }`} />
            <h3 className={`font-medium text-main-text ${
              isMobile ? 'text-base' : 'text-sm'
            }`}>Enable Notifications</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-main-light-text ${
              isMobile ? 'text-sm' : 'text-sm'
            }`}>{notificationsEnabled ? 'Enabled' : 'Disabled'}</span>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`relative inline-block rounded-full transition-colors duration-200 ${
              isMobile ? 'w-10 h-6 touch-manipulation' : 'w-10 h-6'
            } ${
              notificationsEnabled ? 'bg-main-accent' : 'bg-white/10'
            }`}
            >
              <span
                className={`absolute rounded-full bg-white transition-transform duration-200 transform ${
                isMobile ? 'top-0.5 left-0.5 w-5 h-5' : 'top-0.5 left-0.5 w-5 h-5'
              } ${
                notificationsEnabled ? 'translate-x-4' : 'translate-x-0'
              }`}
              ></span>
            </button>
          </div>
        </div>
        <p className={`text-main-light-text mb-2 ${
          isMobile ? 'text-sm leading-relaxed' : 'text-sm'
        }`}>Allow sound notifications for tracked accounts</p>
      </div>

      {/* Sound Settings */}
      <div className={`bg-white/[0.03] rounded-lg border border-white/[0.1] mb-4 ${
        isMobile ? 'p-3' : 'p-4'
      }`}>
        <div className={`flex items-center justify-between ${
          isMobile ? 'mb-3 flex-row md:flex-col sm:flex-row gap-3 sm:gap-0' : 'mb-4'
        }`}>
          <div className="flex items-center gap-2">
            <Icon icon="material-symbols:volume-up" className={`text-main-accent ${
              isMobile ? 'w-6 h-6' : 'w-5 h-5'
            }`} />
            <h3 className={`font-medium text-main-text ${
              isMobile ? 'text-base' : 'text-sm'
            }`}>Sound Settings</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-main-light-text ${
              isMobile ? 'text-sm' : 'text-sm'
            }`}>{soundEnabled ? 'Enabled' : 'Disabled'}</span>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`relative inline-block rounded-full transition-colors duration-200 ${
              isMobile ? 'w-10 h-6 touch-manipulation' : 'w-10 h-6'
            } ${
              soundEnabled ? 'bg-main-accent' : 'bg-white/10'
            }`}
            >
              <span
                className={`absolute rounded-full bg-white transition-transform duration-200 transform ${
                isMobile ? 'top-0.5 left-0.5 w-5 h-5' : 'top-0.5 left-0.5 w-5 h-5'
              } ${
                soundEnabled ? 'translate-x-4' : 'translate-x-0'
              }`}
              ></span>
            </button>
          </div>
        </div>

        {/* Volume Slider */}
        <div className={isMobile ? 'mb-4' : 'mb-4'}>
          <div className={`flex justify-between items-center ${
            isMobile ? 'mb-3' : 'mb-2'
          }`}>
            <span className={`text-main-light-text ${
              isMobile ? 'text-sm font-medium' : 'text-sm'
            }`}>Volume</span>
            <span className={`text-main-light-text ${
              isMobile ? 'text-sm font-medium' : 'text-sm'
            }`}>{volume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
            className={`w-full bg-white/10 rounded-lg appearance-none cursor-pointer ${
              isMobile ? 'h-2 touch-manipulation' : 'h-1'
            }`}
            style={{
              background: `linear-gradient(to right, #00d4ff 0%, #00d4ff ${volume}%, rgba(255,255,255,0.1) ${volume}%, rgba(255,255,255,0.1) 100%)`
            }}
          />
        </div>

        {/* Notification Sound Selection */}
        <div>
          <div className={`flex justify-between items-center ${
            isMobile ? 'mb-3' : 'mb-2'
          }`}>
            <span className={`text-main-light-text ${
              isMobile ? 'text-sm font-medium' : 'text-sm'
            }`}>Notification Sound</span>
          </div>
          <div className="relative">
            <select
              className={`w-full bg-white/[0.03] border border-white/[0.1] rounded-lg text-main-light-text appearance-none focus:outline-none focus:border-main-accent transition-colors duration-200 ${
                isMobile ? 'p-3 text-base touch-manipulation' : 'p-2 text-sm'
              }`}
            >
              <option value="default">Default</option>
              <option value="chime">Chime</option>
              <option value="bell">Bell</option>
              <option value="ping">Ping</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Icon icon="material-symbols:keyboard-arrow-down-rounded" className={`text-main-light-text ${
                isMobile ? 'w-6 h-6' : 'w-5 h-5'
              }`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;