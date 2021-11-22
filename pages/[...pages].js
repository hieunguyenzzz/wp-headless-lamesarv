import StaticPage from 'components/pages/StaticPage';
import { postApi } from 'libs/apis';
import ArchivePage from '../components/pages/ArchivePage';
import ArticlePage from '../components/pages/ArticlePage';
import cookedData from '../data/cookedData.json';
import {
    fixSeoImage,
    getDynamicPageProps,
    getStaticPageProps
} from '../libs/utils/pageProps';

export default function Pages(props) {
    switch (props?.pageProps?.pageDetail?.type) {
        case 'POST':
            return <ArticlePage {...props} />;
        case 'YEAR':
        case 'MONTH':
            return <ArchivePage {...props} />;
        default:
            return <StaticPage {...props} />;
    }
}

export async function getStaticProps(context) {
    const result = await getStaticPageProps(context);
    if (result) {
        return result;
    }
    const props = getDynamicPageProps(context);
    switch (props.pageDetail.type) {
        case 'POST':
            props.post = await postApi({
                postId: props.pageDetail.params.postId
            });
            props.seo = fixSeoImage(props.post.seo.fullHead);
            break;
        case 'YEAR':
        case 'MONTH':
        default:
            break;
    }
    return {
        props
    };
}

export async function getStaticPaths() {
    const pages = cookedData.allPaths['[...pages]'];
    let paths = pages.map(({ path }) => path);
    cookedData.allPaths.pages.forEach((page) => {
        if (page.path === '/gallery') {
            return;
        }
        paths.push(page.path);
    });
    return {
        paths,
        fallback: false
    };
}
