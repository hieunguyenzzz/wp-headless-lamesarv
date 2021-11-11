import PageHomepage from 'components/PageHomepage';
import cookedData from '../../data/cookedData.json';
import { getHomePageProps } from '../../libs/utils/pageProps';

export default function Home({ pageProps }) {
    return <PageHomepage pageProps={pageProps} />;
}

export async function getStaticProps(context) {
    return {
        props: getHomePageProps(context)
    };
}

export async function getStaticPaths() {
    const paths = cookedData.allPaths.homepage.map(
        ({ path }) => `/page${path}`
    );
    return {
        paths,
        fallback: false
    };
}
