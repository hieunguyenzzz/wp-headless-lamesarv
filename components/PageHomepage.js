import AnimateBlock from './AnimateBlock';
import ArticleCard from './ArticleCard';
import Layout from './Layout';
import ListWithPaginate from './ListWithPaginate';
import TwoColumnsWithSidebar from './TwoColumnsWithSidebar';
const VisibleAnimationArticleCard = (props) => {
    return (
        <AnimateBlock>
            <ArticleCard {...props} imageRatio={null} />
        </AnimateBlock>
    );
};
function PageHomepage({ pageProps }) {
    const { pathDetail } = pageProps;
    const pageNodes = pageProps?.posts?.map((props, i) => {
        return <VisibleAnimationArticleCard key={i} {...props} />;
    });
    return (
        <Layout pageProps={pageProps}>
            <TwoColumnsWithSidebar pageProps={pageProps}>
                <div className="flex-1 w-full">
                    <div className="w-full space-y-6">
                        <ListWithPaginate
                            layout="masonry"
                            {...{
                                items: pageNodes,
                                totalPages: pathDetail?.totalPages,
                                currentPage: pathDetail?.currentPage
                            }}
                        />
                    </div>
                </div>
            </TwoColumnsWithSidebar>
        </Layout>
    );
}

export default PageHomepage;
