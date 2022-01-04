require('dotenv').config();
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const STORAGE_PATH =
    process.env.NEXT_PUBLIC_STORAGE_PATH || '/wp-content/uploads';
const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3000';
const EMAIL = 'bfidler@lamesarv.com';
const STORAGE_URL = process.env.NEXT_PUBLIC_WORDPRESS_STORAGE_URL;
const STORAGE_URL_2 = process.env.NEXT_PUBLIC_WORDPRESS_STORAGE_URL_2;
const CLOUDINARY_STORAGE_URL = process.env.NEXT_PUBLIC_CLOUDINARY_STORAGE_URL;
const TOKEN = process.env.TOKEN;
console.log('Config:');
console.log({
    TOKEN,
    API_URL,
    STORAGE_PATH,
    HOST_URL,
    EMAIL,
    STORAGE_URL,
    STORAGE_URL_2,
    CLOUDINARY_STORAGE_URL
});

module.exports = {
    TOKEN,
    API_URL,
    STORAGE_PATH,
    HOST_URL,
    EMAIL,
    STORAGE_URL,
    STORAGE_URL_2,
    CLOUDINARY_STORAGE_URL
};
