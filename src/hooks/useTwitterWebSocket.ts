import { useState, useEffect, useRef, useCallback } from "react";

const TWITTER_WEBSOCKET_URL = "wss://monitor.cherrypump.com/tw";

export interface TwitterTweetData {
  tweetId: string;
  username: string;
  displayName: string;
  profileImage: string;
  createdAt: string;
  text: string;
  views: string;
  engagement: {
    favorites: number;
    retweets: number;
    replies: number;
    quoteTweets: number;
  };
  source: string;
  userId: string;
  bio: string;
  userCreatedAt: string;
  followers: number;
  following: number;
  tweetCount: number;
  favorites: number;
  verified: string;
  affiliatedWith: string | null;
  links: string[];
  mediaUrl: string | null;
  category: string;
  priority: string;
  quotedTweet: any | null;
  type: string;
  timestamp: number;
  delaySeconds: number;
}

export interface TwitterWebSocketMessage {
  event: string;
  tweetData?: TwitterTweetData;
  source: string;
}

export const useTwitterWebSocket = (
  onTweet: (tweet: TwitterTweetData) => void,
  onConnect?: () => void,
  onDisconnect?: () => void
) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;
  const baseReconnectDelay = 1000;

  const onTweetRef = useRef(onTweet);
  onTweetRef.current = onTweet;

  const onConnectRef = useRef(onConnect);
  onConnectRef.current = onConnect;

  const onDisconnectRef = useRef(onDisconnect);
  onDisconnectRef.current = onDisconnect;

  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const data: TwitterWebSocketMessage = JSON.parse(event.data);
      console.log("Twitter WebSocket message received:", data);

      if (data.event === "new_tweet" && data.tweetData) {
        onTweetRef.current(data.tweetData);
      }
    } catch (error) {
      console.error("Error parsing Twitter WebSocket message:", error);
      console.log("Raw message data:", event.data);
    }
  }, []);

  const connect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      return;
    }

    if (socketRef.current) {
      socketRef.current.close();
    }

    setIsConnecting(true);
    console.log("Attempting to connect to:", TWITTER_WEBSOCKET_URL);
    const socket = new WebSocket(TWITTER_WEBSOCKET_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Twitter WebSocket connected");
      setIsConnected(true);
      setIsConnecting(false);
      reconnectAttemptsRef.current = 0;

      socket.send(JSON.stringify({ event: "subscribe_tweets" }));

      if (onConnectRef.current) {
        onConnectRef.current();
      }
    };

    socket.onmessage = handleMessage;

    socket.onclose = (event) => {
      console.log("Twitter WebSocket disconnected", event.code, event.reason);
      console.log("Close event details:", {
        code: event.code,
        reason: event.reason,
        wasClean: event.wasClean,
      });
      setIsConnected(false);
      setIsConnecting(false);

      if (
        event.code !== 1000 &&
        reconnectAttemptsRef.current < maxReconnectAttempts
      ) {
        const delay =
          baseReconnectDelay * Math.pow(2, reconnectAttemptsRef.current);
        console.log(
          `Attempting to reconnect in ${delay}ms (attempt ${
            reconnectAttemptsRef.current + 1
          }/${maxReconnectAttempts})`
        );

        reconnectTimeoutRef.current = setTimeout(() => {
          reconnectAttemptsRef.current++;
          connect();
        }, delay);
      } else if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
        console.error("Max reconnection attempts reached. Giving up.");
      }

      if (onDisconnectRef.current) {
        onDisconnectRef.current();
      }
    };

    socket.onerror = (error) => {
      console.error("Twitter WebSocket error:", error);
      console.error("WebSocket readyState:", socket.readyState);
      console.error("WebSocket URL:", TWITTER_WEBSOCKET_URL);
      setIsConnected(false);
      setIsConnecting(false);
    };
  }, [handleMessage]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (socketRef.current) {
      socketRef.current.close(1000, "Manual disconnect");
    }
  }, []);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      if (socketRef.current) {
        socketRef.current.close(1000, "Component unmounting");
      }
    };
  }, [connect]);

  return {
    isConnected,
    isConnecting,
    connect,
    disconnect,
  };
};
