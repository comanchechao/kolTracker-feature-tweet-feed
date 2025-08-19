import React, { useState } from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";
interface ApplicationProps {
  isMobile: boolean;
}
const Application: React.FC<ApplicationProps> = ({ isMobile }) => {
  const [pauseOnHover, setPauseOnHover] = useState(false);

  return (
    <div>
                {/* Feed Control */}
                <div className="bg-white/[0.03] rounded-lg p-4 border border-white/[0.1] mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Icon icon="material-symbols:rss-feed" className="w-5 h-5 text-main-accent" />
                      <h3 className="font-medium text-main-text">Feed Control</h3>
                    </div>
                  </div>

                  <div className={`flex justify-between items-center ${
                    isMobile ? 'mb-4' : 'mb-3'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className={`text-main-text ${
                        isMobile ? 'text-sm font-medium' : 'text-sm'
                      }`}>Pause on Hover</span>
                    </div>
                    <div className="flex items-center gap-2"> 
                      <span className={`text-main-light-text ${
                        isMobile ? 'text-sm' : 'text-sm'
                      }`}>{pauseOnHover ? 'Enabled' : 'Disabled'}</span>
                      <button
                        onClick={() => setPauseOnHover(!pauseOnHover)}
                        className={`relative inline-block rounded-full transition-colors duration-200 ${
              isMobile ? 'w-10 h-6 touch-manipulation' : 'w-10 h-6'
            } ${
              pauseOnHover ? 'bg-main-accent' : 'bg-white/10'
            }`}
                      >
                        <span
                          className={`absolute rounded-full bg-white transition-transform duration-200 transform ${
                isMobile ? 'top-0.5 left-0.5 w-5 h-5' : 'top-0.5 left-0.5 w-5 h-5'
              } ${
                pauseOnHover ? 'translate-x-4' : 'translate-x-0'
              }`}
                        ></span>
                      </button>
                    </div>
                  </div>
                  <p className={`text-main-light-text mb-4 ${
                    isMobile ? 'text-sm leading-relaxed' : 'text-xs'
                  }`}>Pause the feed when hovering over tweets or content</p>
                </div>

                {/* App Colors */}
                <div className="bg-white/[0.03] rounded-lg p-4 border border-white/[0.1] mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Icon icon="material-symbols:palette-outline" className="w-5 h-5 text-main-accent" />
                      <h3 className="font-medium text-main-text">App Colors</h3>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-main-text">Background</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          defaultValue="#292924"
                          className="w-24 p-1 bg-white/[0.03] border border-white/[0.1] rounded-lg text-main-light-text text-xs appearance-none focus:outline-none focus:border-main-accent transition-colors duration-200"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-main-light-text mb-2">Main app background color</p>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-main-text">Tweet Card</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          defaultValue="#000000"
                          className="w-24 p-1 bg-white/[0.03] border border-white/[0.1] rounded-lg text-main-light-text text-xs appearance-none focus:outline-none focus:border-main-accent transition-colors duration-200"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-main-light-text mb-2">Tweet card background color</p>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-main-text">Grid Lines</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          defaultValue="rgba(255, 255, 255, 0.025)"
                          className="w-24 p-1 bg-white/[0.03] border border-white/[0.1] rounded-lg text-main-light-text text-xs appearance-none focus:outline-none focus:border-main-accent transition-colors duration-200"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-main-light-text mb-2">Background grid pattern color</p>
                  </div>
                </div>
              </div>
  )
}
export default Application;