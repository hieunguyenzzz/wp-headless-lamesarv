require('dotenv').config();
const fs = require('fs');
var fetch = require('node-fetch');
var replaceall = require('replaceall');
const { API_URL } = require('../const');
const sitemapUrls = [
    `https://${API_URL}/sitemap_index.xml`,
    `https://${API_URL}/post-sitemap.xml`,
    `https://${API_URL}/page-sitemap.xml`,
    `https://${API_URL}/e-landing-page-sitemap.xml`,
    `https://${API_URL}/category-sitemap.xml`,
    `https://${API_URL}/author-sitemap.xml`
];
const getSitemap = async (url) => {
    const res = await fetch(url);
    // console.log({ res });
    let text = await res.text();
    let newtext = replaceall(
        `https://${API_URL}`,
        process.env.NEXT_PUBLIC_HOST_URL,
        text
    );
    newtext = replaceall(
        `//${API_URL}`,
        process.env.NEXT_PUBLIC_HOST_URL,
        newtext
    );
    const filename = 'public/' + url.replace(`https://${API_URL}/`, '');
    fs.writeFile(filename, newtext, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(filename + ' writed!');
    });
    return newtext;
};
try {
    sitemapUrls.forEach(getSitemap);
} catch (error) {
    console.error(error);
}
