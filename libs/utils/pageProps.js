import graphqlFetcher from 'libs/apis/graphqlFetcher';
import {
    CLOUDINARY_STORAGE_URL,
    DOMAIN,
    HOST_URL,
    STORAGE_PATH,
    STORAGE_URL,
    STORAGE_URL_2
} from 'libs/const';
import { GET_PAGE_BY_ID } from 'libs/queries/page';
import replaceall from 'replaceall';
import data from '../../data/cookedData.json';
import { normalizePage } from './normalize';
import { getNextAndPrePosts, getRecommendationPosts } from './post';
import seo, { gallerySeo } from './seo';

export const fixLink = (seo) => {
    let fixedSeo;
    fixedSeo = replaceall(`http://${DOMAIN}`, HOST_URL, seo);
    fixedSeo = replaceall(`https://${DOMAIN}`, HOST_URL, fixedSeo);
    return fixedSeo;
};
export const fixSeoImage = (seo) => {
    let fixedSeo;
    fixedSeo = replaceall(STORAGE_URL, CLOUDINARY_STORAGE_URL, seo);
    fixedSeo = replaceall(STORAGE_URL_2, CLOUDINARY_STORAGE_URL, fixedSeo);
    fixedSeo = replaceall(
        `http://${DOMAIN}${STORAGE_PATH}`,
        CLOUDINARY_STORAGE_URL,
        fixedSeo
    );
    fixedSeo = replaceall(
        `https://${DOMAIN}${STORAGE_PATH}`,
        CLOUDINARY_STORAGE_URL,
        fixedSeo
    );

    fixedSeo = replaceall(`http://${DOMAIN}`, HOST_URL, fixedSeo);
    fixedSeo = replaceall(`https://${DOMAIN}`, HOST_URL, fixedSeo);
    fixedSeo = fixedSeo.replace(/-[0-9]{3,4}x[0-9]{2,4}\.jpg/g, '.jpg');

    return fixedSeo;
};
export const getAppProps = (context, cookedData = data) => {
    // console.log({ seo })
    return {
        seo: fixSeoImage(seo),
        recentPosts: cookedData.recentPosts,
        archives: cookedData.archives,
        categories: cookedData.categories,
        app: cookedData.app,
        copyright: cookedData.app.copyright
    };
};
export const getHomePageProps = (context, cookedData = data) => {
    // console.log({ context });
    const pathDetail =
        data.allPaths.homepage[Number(context.params?.slug || 1) - 1] || null;
    return {
        ...getAppProps(context, cookedData),
        pathDetail,
        posts: pathDetail?.posts.map((id) => data.postEntities[id]) || []
    };
};
export const getGalleryProps = (context, cookedData = data) => {
    return {
        ...getAppProps(context, cookedData),
        seo: fixSeoImage(gallerySeo)
    };
};
export const getPostPageProps = (pageDetail, cookedData = data) => {
    const {
        params: { id }
    } = pageDetail;
    const post = cookedData.postEntities[id];
    const { nextPost, prePost } = getNextAndPrePosts(post, cookedData);
    const recommendationPosts = getRecommendationPosts(post, cookedData);
    return {
        recommendationPosts,
        pageDetail,
        nextPost,
        // seo: fixSeoImage(post.seo.fullHead),
        prePost,
        post
    };
};

export const getArchivesPageProps = (pageDetail, cookedData = data) => {
    const {
        params: { year = null, month = null }
    } = pageDetail;
    let posts = month
        ? cookedData.postsByMonth[`${year}/${month}`].map(
              (postId) => cookedData.postEntities[postId]
          )
        : cookedData.postsByYear[year].map(
              (postId) => cookedData.postEntities[postId]
          );
    posts = posts.slice(0, 10);
    return {
        pageDetail,
        posts,
        year,
        month
    };
};
export const getCategoryPageProps = (context, cookedData = data) => {
    const {
        params: { slugs }
    } = context;
    const category = cookedData.categories.find(
        (item) => item.slug === slugs[0]
    );
    const [slug, sufix, page] = slugs;
    const path = page ? `/${slug}/${sufix}/${page}` : `/${slug}`;
    const pathDetail = cookedData.allPaths.category.find(
        (item) => item.path === path
    );
    // console.log({ pathDetail });
    const posts = pathDetail.posts.map((id) => cookedData.postEntities[id]);
    return {
        ...getAppProps(context, cookedData),
        pathDetail,
        posts,
        category,
        seo: fixSeoImage(category.seo.fullHead)
    };
};

export const getAuthorPageProps = (context, cookedData = data) => {
    const {
        params: { slugs }
    } = context;
    const [slug, sufix, page] = slugs;
    const author = cookedData.authorEntities[slug];
    const path = page ? `/${slug}/${sufix}/${page}` : `/${slug}`;
    const pathDetail = cookedData.allPaths.author.find(
        (item) => item.path === path
    );
    const posts = pathDetail.posts.map((id) => cookedData.postEntities[id]);
    return {
        ...getAppProps(context, cookedData),
        pathDetail,
        posts,
        postCount: cookedData.postsByAuthor[slug].length,
        author,
        seo: fixSeoImage(author.seo.fullHead)
    };
};

export const getDynamicPageProps = (context, cookedData = data) => {
    const { params } = context;
    const path = '/' + params.pages.join('/') + '/';
    const pageDetail = cookedData.allPaths['[...pages]'].find((page) => {
        // console.log([page.path, path])
        return page.path === path;
    });
    switch (pageDetail?.type) {
        case 'MONTH':
        case 'YEAR': {
            return {
                ...getAppProps(context, cookedData),
                ...getArchivesPageProps(pageDetail)
            };
        }
        case 'POST': {
            return {
                ...getAppProps(context, cookedData),
                ...getPostPageProps(pageDetail)
            };
        }
        default:
            return null;
    }
};

export const getStaticPageProps = async (context, cookedData = data) => {
    const { params } = context;
    const path = '/' + params.pages.join('/');
    const staticPage = cookedData.allPaths.pages.find((page) => {
        return page.path === path;
    });
    if (staticPage) {
        const { page } = await graphqlFetcher(GET_PAGE_BY_ID, {
            id: staticPage.id
        });
        const normalizedData = normalizePage(page);
        return {
            props: {
                ...getAppProps(context),
                seo: normalizedData.seo,
                page: normalizedData
            }
        };
    }
    return null;
};
