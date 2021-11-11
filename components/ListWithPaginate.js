import { useRouter } from 'next/router';
import Masonry from './Masonry';
import Paginate from './Paginate';

function ListWithPaginate({
    items = [],
    totalPages,
    currentPage = 1,
    layout = 'masonry'
}) {
    const router = useRouter();
    let children;
    switch (layout) {
        case 'masonry':
            children = <Masonry className="space-y-6">{items}</Masonry>;
            break;
        default:
            children = items;
            break;
    }
    return (
        <div className="space-y-6">
            {children}
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
                            console.log({
                                pathname: path,
                                query: router.query
                            });
                            router.push({
                                pathname: path,
                                query: router.query
                            });
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
