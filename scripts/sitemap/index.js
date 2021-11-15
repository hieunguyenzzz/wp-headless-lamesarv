require('dotenv').config();
const fs = require('fs');
var fetch = require('node-fetch');
var replaceall = require('replaceall');
const { DOMAIN } = require('../const');
const sitemapUrls = [
    `https://${DOMAIN}/sitemap_index.xml`,
    `https://${DOMAIN}/post-sitemap.xml`,
    `https://${DOMAIN}/page-sitemap.xml`,
    `https://${DOMAIN}/e-landing-page-sitemap.xml`,
    `https://${DOMAIN}/category-sitemap.xml`,
    `https://${DOMAIN}/author-sitemap.xml`
];
const getSitemap = async (url) => {
    const res = await fetch(url);
    // console.log({ res });
    let text = await res.text();
    let newtext = replaceall(
        `https://${DOMAIN}`,
        process.env.NEXT_PUBLIC_HOST_URL,
        text
    );
    newtext = replaceall(
        `//${DOMAIN}`,
        process.env.NEXT_PUBLIC_HOST_URL,
        newtext
    );
    const filename = 'public/' + url.replace(`https://${DOMAIN}/`, '');
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
