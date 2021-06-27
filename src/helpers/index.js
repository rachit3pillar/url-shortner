import { EXPIRY_MINUTES } from "../config";

export const checkExpiration = (expiryDate) => {
  let currentDate = new Date();
  if (currentDate > expiryDate) {
    return true;
  }
  return false;
};

export const setExpiry = () => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + EXPIRY_MINUTES);
  return date;
};
