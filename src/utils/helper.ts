import CryptoJS from "crypto-js";

export const SECRET_KEY = "SECRET_PASSWORD";

export const decryptPassword = (encryptedPassword: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY);
  const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
  return originalPassword;
};

export const PAGE_SIZE = 8;

export const PAGE_URL = {
  SIGNUP : '/signup',
  LOGIN: '/login',
  HOME: '/',
  CHANGE_PASSWORD: '/change-password',
  EDIT_PROFILE: '/edit-profile',
  PRODUCTS: '/products'
}
