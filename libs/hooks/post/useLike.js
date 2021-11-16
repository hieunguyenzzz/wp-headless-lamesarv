import { useCallback, useState } from 'react';
import graphqlFetcher from '../../apis/graphqlFetcher';
const likeMutation = ` mutation likeMutation($id:Int) {
    postLike:updatePostLike(input:{id: $id}) {
      likes_count
    }
  }`;
const unLikeMutation = ` mutation unlikeMutation($id:Int) {
    postLike:updatePostUnlike(input:{id: $id}) {
      likes_count
    }
  }`;
export const useLike = (post) => {
    const [like, setLike] = useState(false);
    const [likesCount, setlikesCount] = useState();
    const handleLike = useCallback(async () => {
        const { postLike: { likes_count } = {} } = await graphqlFetcher(
            like ? unLikeMutation : likeMutation,
            {
                id: post.id
            }
        );
        setlikesCount(likes_count);
        setLike(!like);
    }, [like, post.id]);
    return {
        likesCount: likesCount || post.likesCount,
        onLike: handleLike,
        like
    };
};
