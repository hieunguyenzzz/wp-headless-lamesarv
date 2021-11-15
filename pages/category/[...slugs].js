import { Banner } from 'components/Banner';
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
            <Banner
                heading={category.name}
                description={category.description}
                subHeading={
                    <div className="font-bold ">
                        <Link
                            className="text-opacity-50 hover:text-opacity-90 text-secondary"
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
                            className="text-opacity-50 hover:text-opacity-90 text-secondary"
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
                        <span className="breadcrumbs_item current text-secondary text-opacity-80">
                            {category.name}
                        </span>
                    </div>
                }
            />

            {!posts?.length && (
                <Container className="flex flex-col items-start py-8 lg:flex-row lg:space-x-8 gap-y-16">
                    <ResultEmpty search={query.s} />
                </Container>
            )}
            {posts?.length && (
                <Container className="flex flex-col lg:flex-row lg:space-x-[30px] py-8  gap-y-12 items-start">
                    <div className="flex-1 space-y-8">
                        {pageNodes}
                        {pathDetail.totalPages > 1 && (
                            <div className="flex items-center justify-center w-full">
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
                                            path = `/category/${
                                                pathDetail.params.slugs[0]
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
