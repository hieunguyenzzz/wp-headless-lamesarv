import { useRouter } from 'next/dist/client/router';
import ArticleCard from '../../components/ArticleCard';
import Container from '../../components/Container';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import Paginate from '../../components/Paginate';
import ResultEmpty from '../../components/ResultEmpty';
import SideBar from '../../components/SideBar';
import StickyColumn from '../../components/StickyColumn';
import cookedData from '../../data/cookedData.json';
import { getCategoryPageProps } from '../../libs/utils/pageProps';



export default function Category({ pageProps }) {
    const router = useRouter();
    const { category, posts = [], pathDetail } = pageProps;
    const { query } = useRouter();
    const pageNodes = posts?.map((props, i) => {
        // console.log({ props });
        return <ArticleCard key={i} {...props} />;
    });
    return (
        <Layout pageProps={pageProps}>
            <div className="py-9 bg-[#272726] text-white">
                <div className="content_wrap">
                    <div className="sc_layouts_column sc_layouts_column_align_center">
                        <Container>
                            <div className="flex flex-col items-center justify-center text-center mx-[12px] my-[9px]">
                                <div className="sc_layouts_title_title">
                                    <h1
                                        itemProp="headline"
                                        className="text-[27px] lg:text-[52px] xl:leading-[67px] font-bold leading-normal">
                                        {category.name}
                                    </h1>
                                </div>
                                <div className="lg:text-[18px] lg:leading-[22px]  ">
                                    <div className="font-bold">
                                        <Link
                                            className="text-[#888583]"
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
                                        <Link
                                            className="text-[#888583]"
                                            href="/">
                                            All Posts
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
                                        <span className="breadcrumbs_item current opacity-75">
                                            {category.name}
                                        </span>
                                    </div>
                                </div>{' '}
                            </div>
                        </Container>
                    </div>
                </div>
            </div>

            {!posts?.length && (
                <Container className="flex flex-col lg:flex-row lg:space-x-8 py-16 lg:py-[110px] gap-y-16 items-start">
                    <ResultEmpty search={query.s} />
                </Container>
            )}
            {posts?.length && (
                <Container className="flex flex-col lg:flex-row lg:space-x-[30px] py-16 lg:py-[110px] gap-y-16 items-start">
                    <div className="space-y-8 flex-1">
                        {pageNodes}
                        {pathDetail.totalPages > 1 && (
                            <div className="w-full flex justify-center items-center">
                                <Paginate
                                    initialPage={pathDetail.currentPage - 1}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    scroll={false}
                                    shallow={true}
                                    pageCount={pathDetail.totalPages}
                                    onPageChange={({ selected }) => {
                                        let path;
                                        if (Number(selected) === 0) {
                                            path = `/category/${pathDetail.params.slugs[0]}`;
                                        } else {
                                            path = `/category/${pathDetail.params.slugs[0]
                                                }/page/${selected + 1}`;
                                        }
                                        router.push(path);
                                    }}
                                    hrefBuilder={(page) => {
                                        if (page === 1)
                                            return `/category/${pathDetail.params.slugs[0]}`;
                                        return `/category/${pathDetail.params.slugs[0]}/page/${page}`;
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <StickyColumn offsetTop={120} offsetBottom={20}>
                        <SideBar pageProps={pageProps} />
                    </StickyColumn>
                </Container>
            )}
        </Layout>
    );
}


export async function getStaticProps(context) {
    return {
        props: getCategoryPageProps(context)
    };
}

export async function getStaticPaths() {
    const paths = cookedData.allPaths.category.map(
        ({ path }) => `/category${path}`
    );
    return {
        paths,
        fallback: false
    };
}