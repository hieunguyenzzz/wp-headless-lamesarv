import { useMemo, useState } from 'react';
import useSWR, { mutate } from 'swr';
import graphqlFetcher from '../../apis/graphqlFetcher';
const commentsQuery = `query ($slug:ID!){
  post(id:$slug, idType: SLUG) {
  id
  title
  commentCount
  comments(first: 9999) {
      nodes {
        id
        author{
          node{
            name
          }
        }
        content
        parentId
        date
      }
  }
  }
}`;
const commentMutation = `mutation commentMutation($id:Int,$content:String,$author:String) {
  createComment(input: {
    commentOn: $id, 
    content: $content, 
    author: $author
  }) {
    success
    comment {
      id
      content
      author {
        node {
          name
        }
      }
    }
  }
}`;
export const useComment = (post) => {
  const [loading, setLoading] = useState();
  const key = useMemo(
    () => [
      commentsQuery,
      {
        slug: post.slug
      }
    ],
    [post.slug]
  );
  const { data } = useSWR(key, graphqlFetcher);
  const { post: { commentCount, comments } = {} } = data || {
    post: {
      commentCount: post.commentCount
    }
  };
  const handleComment = async ({ id, content, author }) => {
    setLoading(true);
    await graphqlFetcher(commentMutation, {
      id,
      content,
      author
    });
    await mutate(key);
    setLoading(false);
  };
  return {
    commentCount,
    comments,
    handleComment,
    loading
  };
};
