import { useCallback, useEffect, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

export const usePages = ({ search = null, fetcher }) => {
    const getKey = useCallback(
        (pageIndex, previousPageData) => {
            if (previousPageData && !previousPageData?.pageInfo?.hasNextPage)
                return null; // reached the end
            return [search, previousPageData?.pageInfo?.endCursor, fetcher]; // SWR key
        },
        [fetcher, search]
    );
    const { data, size, setSize } = useSWRInfinite(getKey, fetcher);
    useEffect(() => {}, [search, fetcher]);
    const isLoading = !data?.[size - 1];
    const hasNextPage = isLoading || data?.[size - 1]?.pageInfo?.hasNextPage;
    const isEmpty = data?.[0] && !data[0]?.nodes?.length;

    return useMemo(
        () => ({
            pages: data,
            size,
            isLoading,
            hasNextPage,
            isEmpty,
            onLoadMore: () => {
                !isLoading && setSize(size + 1);
            }
        }),
        [data, hasNextPage, isEmpty, isLoading, setSize, size]
    );
};
