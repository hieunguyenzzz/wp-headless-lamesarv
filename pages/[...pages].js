import ArchivePage from '../components/pages/ArchivePage';
import ArticlePage from '../components/pages/ArticlePage';
import cookedData from '../data/cookedData.json';
import { getDynamicPageProps } from '../libs/utils/pageProps';


export default function Pages(props) {
    switch (props.pageProps.pageDetail.type) {
        case 'POST':
            return <ArticlePage {...props} />;
        case 'YEAR':
        case 'MONTH':
            return <ArchivePage {...props} />;
        default:
            break;
    }
}


export async function getStaticProps(context) {
    return {
        props: getDynamicPageProps(context)
    }
}


export async function getStaticPaths() {
    const pages = cookedData.allPaths['[...pages]'];
    let paths = pages.map(({ path }) => path);
    return {
        paths,
        fallback: false
    };
}