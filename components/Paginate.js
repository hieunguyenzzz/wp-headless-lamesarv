import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';

export default function Paginate(props) {
    return (
        <ReactPaginate
            disableInitialCallback
            marginPagesDisplayed={2}
            nextLabel={
                <div className="w-[40px] h-[40px] flex justify-center items-center text-black bg-white font-body shadow-custom hover:text-white hover:bg-[#720f21] rounded transition-all">
                    <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth={0}
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg">
                        <polyline strokeWidth={2} points="9 6 15 12 9 18" />
                    </svg>
                </div>
            }
            previousLabel={
                <div className="w-[40px] h-[40px] flex justify-center items-center text-black bg-white font-body shadow-custom hover:text-white hover:bg-[#720f21] rounded transition-all">
                    <svg
                        className="transform rotate-180"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth={0}
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg">
                        <polyline strokeWidth={2} points="9 6 15 12 9 18" />
                    </svg>
                </div>
            }
            pageLinkClassName="w-[40px] h-[40px] flex  justify-center items-center "
            activeClassName="!text-white !bg-[#720f21]"
            pageRangeDisplayed={2}
            containerClassName="flex items-center justify-between gap-4 flex-wrap "
            pageClassName="text-black bg-white font-body shadow-custom hover:text-white hover:bg-[#720f21] rounded transition-all"
            {...props}
        />
    );
}
export const RouterPaginate = (props) => {
    const { query, push, pathname } = useRouter();
    const { page, ...rest } = query;
    return (
        <Paginate
            initialPage={Number(page - 1)}
            disableInitialCallback
            onPageChange={({ selected }) => {
                push({
                    pathname,
                    scroll: props.scroll,
                    shallow: props.shallow,

                    query: {
                        ...rest,
                        ...(selected
                            ? {
                                  page: Number(selected) + 1
                              }
                            : {})
                    }
                });
            }}
            {...props}
        />
    );
};
