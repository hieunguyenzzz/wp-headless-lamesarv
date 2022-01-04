require('dotenv').config();
const fs = require('fs');
var fetch = require('node-fetch');
var replaceall = require('replaceall');
const { API_URL, HOST_URL } = require('../const');

const sitemapUrls = [
    `${API_URL}/sitemap_index.xml`,
    `${API_URL}/post-sitemap.xml`,
    `${API_URL}/page-sitemap.xml`,
    `${API_URL}/e-landing-page-sitemap.xml`,
    `${API_URL}/category-sitemap.xml`,
    `${API_URL}/author-sitemap.xml`
];
const getSitemap = async (url) => {
    const res = await fetch(url);
    // console.log({ res });
    let text = await res.text();
    const apiUrl = new URL(API_URL);
    let newtext = replaceall(API_URL, HOST_URL, text);
    newtext = replaceall('//' + apiUrl.host, HOST_URL, newtext);
    const filename = 'public/' + url.replace(apiUrl.origin, '');
    fs.writeFile(filename, newtext, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(filename + ' writed!');
    });
    // console.log({ newtext });

    return newtext;
};
try {
    sitemapUrls.forEach(getSitemap);
} catch (error) {
    console.error(error);
}
