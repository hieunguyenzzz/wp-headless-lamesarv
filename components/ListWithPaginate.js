import { useRouter } from 'next/router';
import React from 'react';
import Masonry from './Masonry';
import Paginate from './Paginate';

function ListWithPaginate({ items, totalPages, currentPage }) {
    const router = useRouter();
    return (
        <div className="space-y-6">
            <Masonry className="space-y-6">{items}</Masonry>
            {totalPages > 1 && (
                <div className="flex items-center justify-center w-full">
                    <Paginate
                        initialPage={currentPage - 1}
                        scroll={false}
                        shallow={true}
                        pageCount={totalPages}
                        onPageChange={({ selected }) => {
                            let path;
                            if (Number(selected) === 0) {
                                path = `/`;
                            } else {
                                path = `/page/${selected + 1}`;
                            }
                            router.push(path);
                        }}
                        hrefBuilder={(page) => {
                            if (page === 1) return `/`;
                            return `/page/${page}`;
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default ListWithPaginate;
