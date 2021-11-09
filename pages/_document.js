// eslint-disable-next-line @next/next/no-document-import-in-page
import { GTM_ID } from 'libs/gtm';
import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="en-US">
                <Head>
                    <meta charSet="UTF-8" />
                    <meta name="format-detection" content="telephone=no" />
                    <link rel="profile" href="//gmpg.org/xfn/11" />
                    <meta
                        name="robots"
                        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin="true"
                    />
                    <link
                        property="stylesheet"
                        rel="stylesheet"
                        id="tripster-font-google_fonts-css"
                        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&subset=latin,latin-ext&display=optional"
                        type="text/css"
                        media="all"
                    />
                    <link
                        property="stylesheet"
                        rel="stylesheet"
                        id="tripster-font-Museo-css"
                        href="https://secureservercdn.net/166.62.112.107/hkc.b8a.myftpupload.com/wp-content/themes/tripster/skins/default/css/font-face/Museo/stylesheet.css?time=1632649223"
                        type="text/css"
                        media="all"
                    />
                </Head>
                <body>
                    <noscript>
                        <iframe
                            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                            height="0"
                            width="0"
                            style={{ display: 'none', visibility: 'hidden' }}
                        />
                    </noscript>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
