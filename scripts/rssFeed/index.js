require('dotenv').config();
const fs = require('fs');
var fetch = require('node-fetch');
var replaceall = require('replaceall');
const { API_URL, HOST_URL } = require('../const');

const rssFeedUrls = [
    `${API_URL}/feed`,
];
const rssFeedCreate = async (url) => {
    const res = await fetch(url);
    let text = await res.text();
    const apiUrl = new URL(API_URL);
    let newtext =replaceall(API_URL, HOST_URL, text);
    newtext = replaceall('//' + apiUrl.host, HOST_URL, newtext);
    const filename = 'public/' + url.replace(apiUrl.origin, '')+'.xml';
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
    rssFeedUrls.forEach(rssFeedCreate);
} catch (error) {
    console.error(error);
}
