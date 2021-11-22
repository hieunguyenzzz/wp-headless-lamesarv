import { Banner } from 'components/Banner';
import TwoColumnsWithSidebar from 'components/TwoColumnsWithSidebar';
import Layout from '../Layout';
import Link from '../Link';

const StaticPage = ({ pageProps }) => {
    const { page } = pageProps;

    return (
        <Layout pageProps={pageProps}>
            <Banner
                heading={page.title}
                subHeading={
                    <div className="font-bold">
                        <Link
                            className="text-opacity-75 text-secondary hover:text-opacity-100"
                            href="/">
                            Home
                        </Link>
                        <span className="mx-[0.3em] opacity-75 text-2xl">
                            <svg
                                className="inline-block"
                                stroke="currentColor"
                                fill="none"
                                strokeWidth={0}
                                viewBox="0 0 24 24"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M14.526 6.10576C15.0265 6.33917 15.2667 6.88343 15.0625 7.3214L9.88541 18.4237C9.68118 18.8616 9.10985 19.0275 8.60931 18.7941C8.10877 18.5607 7.86857 18.0164 8.0728 17.5784L13.2499 6.47616C13.4541 6.03819 14.0254 5.87235 14.526 6.10576Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </span>
                        <span className="opacity-75 breadcrumbs_item current">
                            {page.title}
                        </span>
                    </div>
                }
            />
            <TwoColumnsWithSidebar pageProps={pageProps}>
                {page.content && (
                    <article
                        className="max-w-full prose"
                        dangerouslySetInnerHTML={{
                            __html: page.content
                                .replace(/-[0-9]{3}x[0-9]{3}\.jpg/g, '.jpg')
                                .replace(
                                    new RegExp(
                                        process.env.NEXT_PUBLIC_API_URL +
                                            'wp-content/uploads/',
                                        'g'
                                    ),
                                    'https://res.cloudinary.com/la-mesa-rv/image/upload/f_auto/v1/rec-van-assets/'
                                )
                                .replace(
                                    new RegExp(
                                        'https://myrecvan.com/wp-content/uploads/',
                                        'g'
                                    ),
                                    'https://res.cloudinary.com/la-mesa-rv/image/upload/f_auto/v1/rec-van-assets/'
                                )
                        }}
                    />
                )}
            </TwoColumnsWithSidebar>
        </Layout>
    );
};
export default StaticPage;
