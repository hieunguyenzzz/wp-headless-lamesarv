import PageHomepage from 'components/PageHomepage';
import PageSearch from 'components/PageSearch';
import { useRouter } from 'next/router';
import { getHomePageProps } from '../libs/utils/pageProps';

export default function Home({ pageProps }) {
    const router = useRouter();
    if (router.query.s) {
        return <PageSearch pageProps={pageProps} />;
    }
    return <PageHomepage pageProps={pageProps} />;
}

export async function getStaticProps(context) {
    return {
        props: getHomePageProps(context)
    };
}
