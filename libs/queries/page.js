export const GET_PAGE_BY_ID = `query GET_PAGE($id:ID!){
    page(id:$id) {
        id
        title
        content
        slug
        seo {
            fullHead
        }
        date
        author {
            node {
            id
            name
            slug
            }
        }
        featuredImage {
            node {
            id
            altText
            sourceUrl
            mediaDetails {
                width
                height
            }
            }
        }
    }
}`;
export const GET_PAGE_PATHS = `query GET_PAGE_PATHS{
    pages(first:99999){
        nodes{
            id
            title
            content
            slug
        }
    }
}`;
