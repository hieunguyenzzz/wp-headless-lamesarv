export const GTM_ID =
    process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || 'GTM-WH6KWR4';

export const pageview = (url) => {
    window.dataLayer.push({
        event: 'pageview',
        page: url
    });
};
