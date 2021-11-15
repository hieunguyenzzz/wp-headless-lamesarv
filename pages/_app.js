import htmlParser from 'html-react-parser';
import CMSProvider from 'libs/CMSProvider';
import { GTM_ID, pageview } from 'libs/gtm';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';
import defaultSeo from '../data/seo';
import '../styles/globals.css';
function MyApp({ Component, pageProps }) {
    // console.log({ pageProps });
    const yoastHead = htmlParser(pageProps.seo || defaultSeo);
    const router = useRouter();
    useEffect(() => {
        if (process.env.NODE_ENV !== 'production') {
            return;
        }
        router.events.on('routeChangeComplete', pageview);
        return () => {
            router.events.off('routeChangeComplete', pageview);
        };
    }, [router.events]);
    return (
        <CMSProvider key={router.asPath} pageProps={pageProps}>
            <>
                {/* Google Tag Manager - Global base code */}
                {process.env.NODE_ENV === 'production' && (
                    <Script
                        id="google-tag-gtm"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer', '${GTM_ID}');
                `
                        }}
                    />
                )}
                <Head>{yoastHead}</Head>
                <Component pageProps={pageProps} />
            </>
        </CMSProvider>
    );
}
export default MyApp;
