export const GET_POST_QUERY = `query GET_POST_QUERY( $id: ID! ){
    post( id: $id ){
    viewCount
    likesCount
    databaseId
    id
    link
    uri
    slug
    title
    content
    excerpt
    utmCampaign
    displayAdImage
    seo {
      fullHead
    }
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
`;
