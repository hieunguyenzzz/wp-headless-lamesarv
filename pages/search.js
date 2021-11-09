import AnimateBlock from 'components/AnimateBlock';
import { Banner } from 'components/Banner';
import { useRouter } from 'next/dist/client/router';
import ArticleCard from '../components/ArticleCard';
import Container from '../components/Container';
import Layout from '../components/Layout';
import Masonry from '../components/Masonry';
import ResultEmpty from '../components/ResultEmpty';
import SideBar from '../components/SideBar';
import StickyColumn from '../components/StickyColumn';
import { postsApi } from '../libs/apis';
import { usePages } from '../libs/hooks/usePages';
import { getAppProps } from '../libs/utils/pageProps';
const VisibleAnimationArticleCard = (props) => {
    return (
        <AnimateBlock>
            <ArticleCard {...props} />
        </AnimateBlock>
    );
};
export default function Home({ pageProps }) {
    const { query } = useRouter();
    const { pages, onLoadMore, isLoading, hasNextPage, isEmpty } = usePages({
        fetcher: postsApi,
        search: query.s
    });
    const pageNodes =
        pages || query.s
            ? pages
                  ?.flatMap((data) => {
                      return data?.nodes?.map((props) => {
                          return props;
                      });
                  })
                  .map((props, i) => (
                      <VisibleAnimationArticleCard key={i} {...props} />
                  ))
            : pageProps?.recentPosts?.map((props, i) => {
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
            {isEmpty && (
                <Container className="flex flex-col lg:flex-row lg:space-x-8 py-16 lg:py-[110px] gap-y-16 items-start">
                    <ResultEmpty search={query.s} />
                </Container>
            )}
            {!isEmpty && (
                <Container className="flex flex-col lg:flex-row lg:space-x-[30px] py-16 lg:py-[110px] gap-y-16 items-start">
                    <div className="space-y-6">
                        <Masonry className="space-y-6">{pageNodes}</Masonry>
                        {hasNextPage && (
                            <div className="flex justify-center">
                                <button
                                    className="text-white font-heading bg-[#720f21] hover:bg-[#c0b9a8] rounded border border-[color:#720f21] hover:border-[color:#c0b9a8] text-lg font-bold capitalize py-[1.04em] px-[2.65em] flex items-center"
                                    onClick={onLoadMore}>
                                    <span>Load More</span>
                                    <div
                                        className={
                                            isLoading
                                                ? 'transition-all opacity-100 ml-0 pl-3 pointer-events-none'
                                                : 'transition-all opacity-0 ml-[-44px] pl-3'
                                        }>
                                        <svg
                                            className="w-5 h-5 mr-3 animate-spin"
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth={0}
                                            version="1.1"
                                            viewBox="0 0 16 16"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 2c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2s-2-0.895-2-2zM12.359 8c0 0 0 0 0 0 0-0.906 0.735-1.641 1.641-1.641s1.641 0.735 1.641 1.641c0 0 0 0 0 0 0 0.906-0.735 1.641-1.641 1.641s-1.641-0.735-1.641-1.641zM10.757 12.243c0-0.821 0.665-1.486 1.486-1.486s1.486 0.665 1.486 1.486c0 0.821-0.665 1.486-1.486 1.486s-1.486-0.665-1.486-1.486zM6.654 14c0-0.743 0.603-1.346 1.346-1.346s1.346 0.603 1.346 1.346c0 0.743-0.603 1.346-1.346 1.346s-1.346-0.603-1.346-1.346zM2.538 12.243c0-0.673 0.546-1.219 1.219-1.219s1.219 0.546 1.219 1.219c0 0.673-0.546 1.219-1.219 1.219s-1.219-0.546-1.219-1.219zM0.896 8c0-0.61 0.494-1.104 1.104-1.104s1.104 0.494 1.104 1.104c0 0.61-0.494 1.104-1.104 1.104s-1.104-0.494-1.104-1.104zM2.757 3.757c0 0 0 0 0 0 0-0.552 0.448-1 1-1s1 0.448 1 1c0 0 0 0 0 0 0 0.552-0.448 1-1 1s-1-0.448-1-1zM14.054 3.757c0 1-0.811 1.811-1.812 1.811s-1.812-0.811-1.812-1.811c0-1.001 0.811-1.811 1.812-1.811s1.812 0.811 1.812 1.811z" />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>

                    <StickyColumn offsetTop={120} offsetBottom={20}>
                        <SideBar pageProps={pageProps} />{' '}
                    </StickyColumn>
                </Container>
            )}
        </Layout>
    );
}

export async function getStaticProps() {
    return {
        props: getAppProps()
    };
}
