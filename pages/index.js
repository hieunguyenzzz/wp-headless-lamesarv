import PageHomepage from 'components/PageHomepage';
import { getHomePageProps } from '../libs/utils/pageProps';

export default function Home({ pageProps }) {
    return <PageHomepage pageProps={pageProps} />;
}

export async function getStaticProps(context) {
    return {
        props: getHomePageProps(context)
    };
}
