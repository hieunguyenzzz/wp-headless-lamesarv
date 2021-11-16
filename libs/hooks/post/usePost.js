import { postApi } from 'libs/apis';
import { useCMS } from 'libs/CMSProvider';
import { useMemo } from 'react';
import useSWR from 'swr';

export const usePost = () => {
    const { state } = useCMS();
    const { post } = state;
    const key = useMemo(
        () => [
            {
                postId: post.postId
            }
        ],
        [post.postId]
    );
    const { data, error } = useSWR(key, postApi);
    return useMemo(() => {
        return {
            post: data || post,
            error,
            isLoading: !error && !data
        };
    }, [data, error, post]);
};
