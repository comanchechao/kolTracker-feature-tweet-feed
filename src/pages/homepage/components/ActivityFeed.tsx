import React, { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import ActivityCard from "./ActivityCard";
import gsap from "gsap";

interface Activity {
  id: string;
  name: string;
  avatar: string;
  action: string;
  amount: string;
  token: string;
  price: string;
  timestamp: string;
  type: "buy" | "sell";
  walletAddress: string;
  tokenAddress: string;
  transactionHash: string;
  solSpent: string;
}

interface ActivityFeedProps {
  activities: Activity[];
  feedRef: React.RefObject<HTMLDivElement>;
}

const ActivityFeed: React.FC<ActivityFeedProps> = React.memo(
  ({ activities, feedRef }) => {
    const localFeedRef = useRef<HTMLDivElement>(null);
    const prevActivitiesRef = useRef<Activity[]>([]);
    const newActivityIdsRef = useRef<Set<string>>(new Set());

    // Memoize the animation function
    const animateNewCards = useCallback((newActivityIds: string[]) => {
      newActivityIds.forEach((activityId) => {
        const newCardElement = document.getElementById(
          `activity-card-${activityId}`
        );
        if (newCardElement) {
          newCardElement.style.opacity = "0";
          newCardElement.style.transform = "translateY(10px)";

          gsap.to(newCardElement, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });
    }, []);

    useEffect(() => {
      const currentRef = feedRef?.current || localFeedRef.current;

      if (currentRef) {
        gsap.to(currentRef, {
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            currentRef.classList.remove("opacity-0");
            currentRef.classList.add("opacity-100");
          },
        });
      }
    }, [feedRef]);

    useEffect(() => {
      if (activities.length === 0) {
        prevActivitiesRef.current = [];
        newActivityIdsRef.current.clear();
        return;
      }

      if (prevActivitiesRef.current.length > 0) {
        const prevIds = new Set(prevActivitiesRef.current.map((a) => a.id));
        const newIds = activities
          .filter((activity) => !prevIds.has(activity.id))
          .map((activity) => activity.id);

        if (newIds.length > 0) {
          newActivityIdsRef.current = new Set(newIds);
          setTimeout(() => animateNewCards(newIds), 10);
        }
      }

      prevActivitiesRef.current = [...activities];
    }, [activities, animateNewCards]);

    const renderActivity = useCallback((activity: Activity, index: number) => {
      const isNewActivity = newActivityIdsRef.current.has(activity.id);

      return (
        <div
          key={activity.id}
          id={`activity-card-${activity.id}`}
          className={`transition-opacity duration-300 ${
            isNewActivity ? "opacity-0" : "opacity-100"
          }`}
        >
          <ActivityCard activity={activity} isFirst={index === 0} />
        </div>
      );
    }, []);

    return (
      <div className=" min-w-[320px]    w-full bg-white/[0.03] border border-white/[0.1] rounded-sm transition-all duration-500">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/60">
          <h2 className="font-algance text-lg text-main-text">
            Live KOL Activity
          </h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-tiktok text-xs text-main-light-text">
              Live
            </span>
          </div>
        </div>

        {/* Activity Cards Container */}
        <div
          ref={feedRef || localFeedRef}
          className="space-y-2 p-2  w-full overflow-y-auto opacity-0"
        >
          {activities.map(renderActivity)}
        </div>

        {/* Footer with View All Button */}
        <div className="p-4 border-t border-white/10 bg-black/40">
          <Link
            to="/leaderboard"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-main-accent/20 hover:bg-main-accent/30 border border-main-accent/50 hover:border-main-accent text-main-accent text-sm rounded-sm transition-all duration-300 cursor-pointer"
          >
            <span className="font-tiktok">View Full Leaderboard</span>
            <Icon icon="material-symbols:arrow-right-alt" className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.activities === nextProps.activities) {
      return true;
    }

    if (prevProps.activities.length !== nextProps.activities.length) {
      return false;
    }

    const prevIds = prevProps.activities.map((a) => a.id);
    const nextIds = nextProps.activities.map((a) => a.id);

    for (let i = 0; i < prevIds.length; i++) {
      if (prevIds[i] !== nextIds[i]) {
        return false;
      }
    }

    return true;
  }
);

export default ActivityFeed;
