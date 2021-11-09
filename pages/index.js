import AnimateBlock from 'components/AnimateBlock';
import { Banner } from 'components/Banner';
import Paginate from 'components/Paginate';
import { useRouter } from 'next/dist/client/router';
import ArticleCard from '../components/ArticleCard';
import Container from '../components/Container';
import Layout from '../components/Layout';
import Masonry from '../components/Masonry';
import SideBar from '../components/SideBar';
import StickyColumn from '../components/StickyColumn';
import { getHomePageProps } from '../libs/utils/pageProps';
const VisibleAnimationArticleCard = (props) => {
    return (
        <AnimateBlock>
            <ArticleCard {...props} />
        </AnimateBlock>
    );
};
export default function Home({ pageProps }) {
    const router = useRouter();
    const { query } = router;
    const { pathDetail } = pageProps;
    const pageNodes = pageProps?.posts?.map((props, i) => {
        return <VisibleAnimationArticleCard key={i} {...props} />;
    });
    return (
        <Layout pageProps={pageProps}>
            {query.s && (
                <Banner
                    heading={`Search: ${query.s} `}
                    subHeading={
                        <div className="font-bold">
                            <a
                                className="text-[#888583]"
                                href="https://myrecvan.com/">
                                Home
                            </a>
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
                                Search: {query.s}
                            </span>
                        </div>
                    }
                />
            )}
            <Container className="flex flex-col lg:flex-row lg:space-x-[30px] py-16 lg:py-[110px] gap-y-16 items-start">
                <div className="space-y-6">
                    <Masonry className="space-y-6">{pageNodes}</Masonry>
                    {pathDetail.totalPages > 1 && (
                        <div className="flex items-center justify-center w-full">
                            <Paginate
                                initialPage={pathDetail.currentPage - 1}
                                scroll={false}
                                shallow={true}
                                pageCount={pathDetail.totalPages}
                                onPageChange={({ selected }) => {
                                    let path;
                                    if (Number(selected) === 0) {
                                        path = `/`;
                                    } else {
                                        path = `/page/${selected + 1}`;
                                    }
                                    router.push(path);
                                }}
                                hrefBuilder={(page) => {
                                    if (page === 1) return `/`;
                                    return `/page/${page}`;
                                }}
                            />
                        </div>
                    )}
                </div>

                <StickyColumn offsetTop={120} offsetBottom={20}>
                    <SideBar pageProps={pageProps} />{' '}
                </StickyColumn>
            </Container>
        </Layout>
    );
}

export async function getStaticProps(context) {
    return {
        props: getHomePageProps(context)
    };
}
