var fetch = require('node-fetch');
const { API_URL, TOKEN } = require('../const');
const getAllDataQuery = `{
  generalSettings {
    title
    description
    url
    dateFormat
    language
    startOfWeek
    timeFormat
    timezone
  }
  allSettings {
    generalSettingsDateFormat
    generalSettingsDescription
    generalSettingsLanguage
    generalSettingsStartOfWeek
    generalSettingsTimeFormat
    generalSettingsTimezone
    generalSettingsTitle
    generalSettingsUrl
    readingSettingsPostsPerPage
    discussionSettingsDefaultCommentStatus
    discussionSettingsDefaultPingStatus
    writingSettingsDefaultCategory
    writingSettingsDefaultPostFormat
    writingSettingsUseSmilies
  }
  tags {
    nodes {
      id
      name
    }
  }
  menus {
    nodes {
      id
      databaseId
      name
      menuItems {
        edges {
          node {
            id
            label
            path
            parentId
          }
        }
      }
    }
  }
  menus {
    nodes {
      id
      databaseId
      name
      menuItems {
        edges {
          node {
            id
            label
            parentId
          }
        }
      }
    }
  }
  comments {
    nodes {
      id
      author {
        node {
          name
        }
      }
      approved
      commentedOn {
        node {
          link
          slug
          id
          ... on Post {
            id
            title
          }
        }
      }
    }
  }
  posts(first: 999999) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      cursor
      node {
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
        comments {
          edges {
            node {
              id
              content
            }
          }
        }
        date
      }
    }
  }
  categories(first: 9999) {
    nodes {
      id
      name
      slug
      link
      seo {
        fullHead
      }
    }
  }
  users(first: 9999) {
    nodes {
      slug
      name
      avatar {
        height
        size
        url
        width
      }
      seo {
        fullHead
      }
    }
  }
}
`;
async function fetcher({ query, variables = {} }) {
    const res = await fetch(API_URL + '/graphql ', {
        method: 'POST',
        body: JSON.stringify({
            query,
            variables: variables
        }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${TOKEN}`
        }
    });

    const { data } = await res.json();

    return data;
}
const getData = async () => {
    const result = await fetcher({
        query: getAllDataQuery
    });
    return result;
};
// getData().then(console.log);
module.exports = getData;
