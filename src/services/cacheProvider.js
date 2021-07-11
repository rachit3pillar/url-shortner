import NodeCache from "node-cache";
const nodeCache = new NodeCache();
import { DEFAULT_CACHE_LIFETIME } from "../config";

export const getValue = (key) => {
  return nodeCache.get(key);
};

export const setValue = (key, value, ttl = DEFAULT_CACHE_LIFETIME) => {
  return nodeCache.set(key, value, ttl);
};
