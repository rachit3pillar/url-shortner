export const PORT = 4000;
export const MEMCACHE_PORT = 11321;
// export const MONGO_URI = 'mongodb://localhost:27017/tinyUrl';
export const MONGO_DATABASE =
  "mongodb+srv://url_shortner:ovJgksof0DJpwLEg@cluster0.2onfk.mongodb.net/longUrls?retryWrites=true&w=majority";
export const ENV = "dev";

// time in seconds, default set to 30 mins
export const SHORT_LINK_EXPIRE_DURATION = 30 * 60;
export const DEFAULT_CACHE_LIFETIME = 1 * 60;
export const DOMAIN = `http://localhost:${PORT}`;


export const EXPIRY_MINUTES = 1;
