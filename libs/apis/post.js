import { normalizePost } from '../utils/normalize';
import fetcher from './fetcher';

export const postsApi = async (search, endCursor) => {
    const data = await fetcher({
        query: `{
      posts(first: 10 ${endCursor ? ', after:"' + endCursor + '"' : ''} ${
            search ? ', where:{search:"' + search + '"}' : ''
        }) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          cursor
          node {
            id
            link
            slug
            title
            excerpt
            utmCampaign
            displayAdImage
            featuredImage {
              node {
                id
                altText
                sourceUrl     
                mediaDetails{
                  width
                  height
               }   
              }
            }
            categories {
              edges {
                node {
                  id
                  name
                  slug
                }
              }
            }
            date
          }
        }
      }
    }`
    });
    return {
        pageInfo: data?.posts?.pageInfo,
        nodes: data?.posts?.edges?.map(({ node }) => normalizePost(node))
    };
};
export const postsByOffsetApi = async ({ search = '', offset = 0 }) => {
    const data = await fetcher({
        query: `{
      posts(where: {search:"${search}", offsetPagination: { size: 10,offset:${offset} }}) {
        pageInfo {
          offsetPagination {
            total
          }
        }
        edges {
          cursor
          node {
            id
            link
            slug
            title
            excerpt
            utmCampaign
            displayAdImage
            featuredImage {
              node {
                id
                altText
                sourceUrl     
                mediaDetails{
                  width
                  height
               }   
              }
            }
            categories {
              edges {
                node {
                  id
                  name
                  slug
                }
              }
            }
            date
          }
        }
      }
    }`
    });
    return {
        pageInfo: data?.posts?.pageInfo,
        nodes: data?.posts?.edges?.map(({ node }) => normalizePost(node))
    };
};
export const postsByDateApi = async (first = 10, endCursor, year, month) => {
    const data = await fetcher({
        query: `query GET_POSTS($first: Int, $endCursor: String, $dateQuery: DateQueryInput) {
        posts(first: $first, after: $endCursor , where: {dateQuery: $dateQuery}) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            cursor
            node {
              id
              link
              slug
              title
              excerpt
              utmCampaign
              displayAdImage
              featuredImage {
                node {
                  id
                  altText
                  sourceUrl
                  mediaDetails{
                    width
                    height
                  }   
                }
              }
              categories {
                edges {
                  node {
                    id
                    name
                    slug
                  }
                }
              }
              date
            }
          }
        }
      }`,
        variables: {
            first,
            endCursor,
            dateQuery: {
                year: year && Number(year),
                month: month && Number(month)
            }
        }
    });
    return {
        pageInfo: data?.posts?.pageInfo,
        nodes: data?.posts?.edges?.map(({ node }) => normalizePost(node))
    };
};
