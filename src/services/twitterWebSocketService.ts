import { EventEmitter } from 'events';

// Sample tweet data structure based on Twitter PowerTrack API
export interface TwitterUser {
  id: number;
  id_str: string;
  name: string;
  screen_name: string;
  location: string;
  url: string;
  description: string;
  protected: boolean;
  verified: boolean;
  followers_count: number;
  friends_count: number;
  listed_count: number;
  favourites_count: number;
  statuses_count: number;
  created_at: string;
  profile_image_url_https: string;
  profile_banner_url: string;
}

export interface TweetEntities {
  hashtags: Array<{ text: string; indices: number[] }>;
  urls: Array<{
    url: string;
    expanded_url: string;
    display_url: string;
    indices: number[];
    unwound?: {
      url: string;
      status: number;
      title: string;
      description: string;
    };
  }>;
  user_mentions: Array<{
    screen_name: string;
    name: string;
    id: number;
    id_str: string;
    indices: number[];
  }>;
  symbols: any[];
  media?: Array<{
    id: number;
    id_str: string;
    indices: number[];
    media_url: string;
    media_url_https: string;
    url: string;
    display_url: string;
    expanded_url: string;
    type: string;
    sizes: {
      thumb: { w: number; h: number; resize: string };
      small: { w: number; h: number; resize: string };
      medium: { w: number; h: number; resize: string };
      large: { w: number; h: number; resize: string };
    };
  }>;
}

export interface ExtendedTweet {
  full_text: string;
  display_text_range: number[];
  entities: TweetEntities;
}

export interface Tweet {
  created_at: string;
  id: number;
  id_str: string;
  text: string;
  source: string;
  truncated: boolean;
  user: TwitterUser;
  extended_tweet?: ExtendedTweet;
  entities: TweetEntities;
  retweet_count: number;
  favorite_count: number;
  favorited: boolean;
  retweeted: boolean;
  possibly_sensitive?: boolean;
  lang: string;
  timestamp_ms: string;
  in_reply_to_status_id?: number;
  in_reply_to_status_id_str?: string;
  in_reply_to_user_id?: number;
  in_reply_to_user_id_str?: string;
  in_reply_to_screen_name?: string;
  quoted_status_id?: number;
  quoted_status_id_str?: string;
  quoted_status?: Tweet;
  is_quote_status?: boolean;
  replied_to_tweet?: Tweet;
}

// Sample user data
const sampleUsers: TwitterUser[] = [
  {
    id: 6253282,
    id_str: '6253282',
    name: 'William Shatner',
    screen_name: 'WilliamShatner',
    location: 'San Francisco, CA',
    url: 'https://developer.x.com',
    description: 'The Real X API. Tweets about API changes, service issues and our Developer Platform.',
    protected: false,
    verified: true,
    followers_count: 6172196,
    friends_count: 12,
    listed_count: 13003,
    favourites_count: 31,
    statuses_count: 3650,
    created_at: 'Wed May 23 06:01:13 +0000 2007',
    profile_image_url_https: 'https://pbs.twimg.com/profile_images/1478179341582299138/2paPd3Uk_400x400.jpg',
    profile_banner_url: 'https://pbs.twimg.com/profile_banners/6253282/1497491515'
  },
  {
    id: 783214,
    id_str: '783214',
    name: 'JEFFREY',
    screen_name: 'Lowkeytycoon1',
    location: 'everywhere',
    url: 'https://x.com',
    description: 'what\'s happening?!',
    protected: false,
    verified: true,
    followers_count: 67540612,
    friends_count: 48,
    listed_count: 90882,
    favourites_count: 6229,
    statuses_count: 14456,
    created_at: 'Tue Feb 20 14:35:54 +0000 2007',
    profile_image_url_https: 'https://pbs.twimg.com/profile_images/1955358549766193152/slHPNSMj_400x400.jpg',
    profile_banner_url: 'https://pbs.twimg.com/profile_banners/783214/1675101807'
  },
  {
    id: 11348282,
    id_str: '11348282',
    name: 'superfates',
    screen_name: 'deepfates',
    location: 'Mars & Earth',
    url: 'https://x.com/elonmusk',
    description: 'Owner of X',
    protected: false,
    verified: true,
    followers_count: 181400000,
    friends_count: 220,
    listed_count: 120000,
    favourites_count: 21500,
    statuses_count: 35000,
    created_at: 'Tue Jun 02 20:12:29 +0000 2009',
    profile_image_url_https: 'https://pbs.twimg.com/profile_images/1946272447189106689/XbIjiaT-_400x400.png',
    profile_banner_url: 'https://pbs.twimg.com/profile_banners/11348282/1690158342'
  }
];

// Sample tweet content templates
const tweetTemplates = [
  'Just released our new {feature} for developers! Check it out at {url}',
  'Excited to announce {feature} is now available for all users! {url}',
  'We\'re working on improving {feature}. Stay tuned for updates!',
  'Have you tried our new {feature} yet? Let us know what you think!',
  'Important update: {feature} will be deprecated on {date}. Migrate to {newFeature} now.',
  'Join us for a live webinar about {feature} on {date}. Register here: {url}',
  'Thanks to everyone who participated in our {feature} beta test. Your feedback was invaluable!',
  'Breaking: We\'ve just shipped {feature} to production. {url}',
  'Looking for feedback on our experimental {feature}. Try it out and let us know!',
  'Today marks one year since we launched {feature}. Thanks for your support!'
];

// Sample reply templates
const replyTemplates = [
  'Thanks for your interest in {feature}! Let me know if you have any questions.',
  'We appreciate your feedback on {feature}. We\'re constantly working to improve it.',
  'Have you checked out our documentation on {feature}? It might help: {url}',
  'Great point about {feature}! We\'ll consider that for our next update.',
  'Sorry to hear you\'re having trouble with {feature}. Please DM us for support.',
  'That\'s an interesting use case for {feature}! Would love to hear more about it.',
  'We\'re aware of that issue with {feature} and working on a fix. Thanks for your patience!',
  'Glad to hear you\'re enjoying {feature}! Stay tuned for more updates soon.',
  'You\'re right about {feature}. We\'ll add that to our roadmap for consideration.',
  'Have you tried the latest version of {feature}? It addresses many of the issues you mentioned.'
];

// Sample quote tweet templates
const quoteTweetTemplates = [
  'This is huge for our {feature} users! {url}',
  'An important update about {feature} that you should know about.',
  'Exciting news for everyone using {feature}! Check it out.',
  'Our team has been working hard on {feature} and it shows!',
  'This is exactly why we built {feature} the way we did.',
  'Great insights about {feature} here that are worth sharing.',
  'If you\'re using {feature}, you\'ll want to see this announcement.',
  'This perfectly illustrates the power of {feature} in real-world scenarios.',
  'A perfect example of how {feature} can transform your workflow.',
  'This is the kind of feedback that helps us improve {feature} for everyone.'
];

// Features to randomly insert into templates
const features = [
  'API v2', 'OAuth 2.0', 'webhook subscriptions', 'filtered stream', 'PowerTrack API',
  'engagement analytics', 'media upload', 'direct messages', 'tweet metrics', 'user lookup',
  'tweet search', 'trend analysis', 'geo targeting', 'ad analytics', 'audience insights'
];

// Sample URLs to randomly insert into templates
const urls = [
  'https://developer.x.com/docs',
  'https://developer.x.com/forum/announcements',
  'https://blog.x.com/engineering',
  'https://x.com/i/events/special-announcement',
  'https://developer.x.com/products/new-feature'
];

// Sample image URLs to randomly insert into tweets
const imageUrls = [
  'https://picsum.photos/800/450',  // Landscape format
  'https://picsum.photos/600/800',   // Portrait format
  'https://picsum.photos/700/700',   // Square format
  'https://picsum.photos/900/500',   // Wide landscape
  'https://picsum.photos/500/900'    // Tall portrait
];

// Dates to randomly insert into templates
const dates = [
  'January 15, 2024',
  'February 28, 2024',
  'March 10, 2024',
  'April 22, 2024',
  'May 30, 2024',
  'June 15, 2024',
  'July 8, 2024',
  'August 17, 2024',
  'September 5, 2024',
  'October 12, 2024',
  'November 20, 2024',
  'December 3, 2024'
];

// Generate a random tweet
const generateRandomTweet = (isReply = false, isQuote = false, originalTweet?: Tweet): Tweet => {
  const user = sampleUsers[Math.floor(Math.random() * sampleUsers.length)];
  let templateIndex, text;
  const feature = features[Math.floor(Math.random() * features.length)];
  const url = urls[Math.floor(Math.random() * urls.length)];
  const date = dates[Math.floor(Math.random() * dates.length)];
  const newFeature = features[Math.floor(Math.random() * features.length)];
  
  // Determine which template to use based on tweet type
  if (isReply && originalTweet) {
    templateIndex = Math.floor(Math.random() * replyTemplates.length);
    text = replyTemplates[templateIndex];
  } else if (isQuote && originalTweet) {
    templateIndex = Math.floor(Math.random() * quoteTweetTemplates.length);
    text = quoteTweetTemplates[templateIndex];
  } else {
    templateIndex = Math.floor(Math.random() * tweetTemplates.length);
    text = tweetTemplates[templateIndex];
  }
  
  // Replace placeholders
  text = text
    .replace('{feature}', feature)
    .replace('{url}', url)
    .replace('{date}', date)
    .replace('{newFeature}', newFeature);
  
  // Truncate if longer than 140 chars and set truncated flag
  const truncated = text.length > 140;
  const shortText = truncated ? text.substring(0, 137) + '...' : text;
  
  // Current timestamp
  const now = new Date();
  const timestamp = now.getTime().toString();
  const createdAt = now.toUTCString();
  
  // Generate random tweet ID
  const id = Math.floor(Math.random() * 10000000000000000);
  const id_str = id.toString();
  
  // Create entities
  const entities: TweetEntities = {
    hashtags: [],
    urls: [],
    user_mentions: [],
    symbols: []
  };
  
  // Add URL entity if the tweet contains a URL
  if (text.includes('http')) {
    const urlStartIndex = text.indexOf('http');
    const urlEndIndex = text.indexOf(' ', urlStartIndex) > -1 ? 
      text.indexOf(' ', urlStartIndex) : text.length;
    const tweetUrl = text.substring(urlStartIndex, urlEndIndex);
    
    entities.urls.push({
      url: tweetUrl,
      expanded_url: tweetUrl,
      display_url: tweetUrl.replace('https://', '').substring(0, 15) + '...',
      indices: [urlStartIndex, urlEndIndex]
    });
  }
  
  // Randomly add an image (30% chance for regular tweets, 50% for quotes)
  const shouldAddImage = isQuote ? Math.random() < 0.5 : Math.random() < 0.3;
  if (shouldAddImage) {
    const imageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
    // Add a random seed to prevent caching
    const uniqueImageUrl = `${imageUrl}?seed=${Math.floor(Math.random() * 1000)}`;
    
    if (!entities.media) {
      entities.media = [];
    }
    
    entities.media.push({
      id: Math.floor(Math.random() * 10000000000000),
      id_str: Math.floor(Math.random() * 10000000000000).toString(),
      indices: [text.length, text.length + 23],
      media_url: uniqueImageUrl,
      media_url_https: uniqueImageUrl,
      url: uniqueImageUrl,
      display_url: 'pic.twitter.com/abc123',
      expanded_url: uniqueImageUrl,
      type: 'photo',
      sizes: {
        thumb: { w: 150, h: 150, resize: 'crop' },
        small: { w: 340, h: 340, resize: 'fit' },
        medium: { w: 600, h: 600, resize: 'fit' },
        large: { w: 1024, h: 1024, resize: 'fit' }
      }
    });
  }
  
  // Create the tweet object
  const tweet: Tweet = {
    created_at: createdAt,
    id: id,
    id_str: id_str,
    text: shortText,
    source: '<a href="https://developer.x.com" rel="nofollow">X API</a>',
    truncated: truncated,
    user: user,
    entities: entities,
    retweet_count: Math.floor(Math.random() * 1000),
    favorite_count: Math.floor(Math.random() * 5000),
    favorited: false,
    retweeted: false,
    possibly_sensitive: false,
    lang: 'en',
    timestamp_ms: timestamp
  };
  
  // Add extended_tweet if truncated
  if (truncated) {
    tweet.extended_tweet = {
      full_text: text,
      display_text_range: [0, text.length],
      entities: entities
    };
  }
  
  // Add reply fields if this is a reply
  if (isReply && originalTweet) {
    tweet.in_reply_to_status_id = originalTweet.id;
    tweet.in_reply_to_status_id_str = originalTweet.id_str;
    tweet.in_reply_to_user_id = originalTweet.user.id;
    tweet.in_reply_to_user_id_str = originalTweet.user.id_str;
    tweet.in_reply_to_screen_name = originalTweet.user.screen_name;
    tweet.replied_to_tweet = originalTweet;
    
    // Add mention of the original tweet author
    if (!text.includes(`@${originalTweet.user.screen_name}`)) {
      const mention = {
        screen_name: originalTweet.user.screen_name,
        name: originalTweet.user.name,
        id: originalTweet.user.id,
        id_str: originalTweet.user.id_str,
        indices: [0, originalTweet.user.screen_name.length + 1]
      };
      tweet.entities.user_mentions.push(mention);
    }
  }
  
  // Add quote fields if this is a quote
  if (isQuote && originalTweet) {
    tweet.quoted_status_id = originalTweet.id;
    tweet.quoted_status_id_str = originalTweet.id_str;
    tweet.quoted_status = originalTweet;
    tweet.is_quote_status = true;
  }
  
  return tweet;
};

class TwitterWebSocketService extends EventEmitter {
  private connected: boolean = false;
  private intervalId: NodeJS.Timeout | null = null;
  private initialTweetsLoaded: boolean = false;
  
  constructor() {
    super();
  }
  
  // Generate a batch of initial tweets
  private generateInitialTweets(count: number = 5): Tweet[] {
    const tweets: Tweet[] = [];
    const recentTweets: Tweet[] = [];
    
    for (let i = 0; i < count; i++) {
      // For initial batch, mostly regular tweets with some replies/quotes
      const tweetType = Math.random();
      let tweet: Tweet;
      
      if (tweetType < 0.8 || recentTweets.length === 0) {
        // 80% chance of regular tweet for initial batch, or always if no recent tweets
        tweet = generateRandomTweet();
      } else if (tweetType < 0.9) {
        // 10% chance of reply
        const originalTweet = recentTweets[Math.floor(Math.random() * recentTweets.length)];
        tweet = generateRandomTweet(true, false, originalTweet);
      } else {
        // 10% chance of quote
        const originalTweet = recentTweets[Math.floor(Math.random() * recentTweets.length)];
        tweet = generateRandomTweet(false, true, originalTweet);
      }
      
      // Add to recent tweets for potential replies/quotes
      recentTweets.unshift(tweet);
      tweets.push(tweet);
    }
    
    return tweets;
  }
  
  // Connect to the simulated WebSocket
  connect() {
    if (this.connected) return;
    
    this.connected = true;
    this.emit('connect');
    
    // Keep track of recent tweets to create replies and quotes
    const recentTweets: Tweet[] = [];
    const maxRecentTweets = 5;
    
    // First, emit a batch of initial tweets after a short delay
    setTimeout(() => {
      if (!this.initialTweetsLoaded && this.connected) {
        const initialTweets = this.generateInitialTweets(5);
        this.emit('initialTweets', initialTweets);
        
        // Add these to recent tweets for future replies/quotes
        initialTweets.forEach(tweet => {
          recentTweets.unshift(tweet);
          if (recentTweets.length > maxRecentTweets) {
            recentTweets.pop();
          }
        });
        
        this.initialTweetsLoaded = true;
      }
    }, 1500); // Wait 1.5 seconds before loading initial tweets
    
    // Then simulate receiving additional tweets every few seconds
    this.intervalId = setInterval(() => {
      // Decide if this should be a regular tweet, reply, or quote
      const tweetType = Math.random();
      let tweet: Tweet;
      
      if (tweetType < 0.7 || recentTweets.length === 0) {
        // 70% chance of regular tweet, or always if no recent tweets
        tweet = generateRandomTweet();
      } else if (tweetType < 0.85) {
        // 15% chance of reply
        const originalTweet = recentTweets[Math.floor(Math.random() * recentTweets.length)];
        tweet = generateRandomTweet(true, false, originalTweet);
      } else {
        // 15% chance of quote
        const originalTweet = recentTweets[Math.floor(Math.random() * recentTweets.length)];
        tweet = generateRandomTweet(false, true, originalTweet);
      }
      
      // Add to recent tweets and trim if needed
      recentTweets.unshift(tweet);
      if (recentTweets.length > maxRecentTweets) {
        recentTweets.pop();
      }
      
      this.emit('tweet', tweet);
    }, 3000 + Math.random() * 5000); // Random interval between 3-8 seconds
    
    // Simulate occasional connection status messages
    setTimeout(() => {
      this.emit('status', { type: 'info', message: 'Connection established to Twitter stream' });
    }, 1000);
  }
  
  // Disconnect from the simulated WebSocket
  disconnect() {
    if (!this.connected) return;
    
    this.connected = false;
    this.initialTweetsLoaded = false;
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    this.emit('disconnect');
    this.emit('status', { type: 'info', message: 'Disconnected from Twitter stream' });
  }
  
  // Check if connected
  isConnected() {
    return this.connected;
  }
  
  // Get a single random tweet (for testing)
  getRandomTweet() {
    return generateRandomTweet();
  }
}

// Export a singleton instance
export const twitterWebSocketService = new TwitterWebSocketService();
export default twitterWebSocketService;