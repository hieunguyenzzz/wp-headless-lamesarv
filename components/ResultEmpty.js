import Link from './Link';

const ResultEmpty = ({ search }) => {
    return (
        <div className="py-4 w-full lg:flex ">
            <h1 className="text-[70px] lg:text-[7em] leading-[1.05em] text-center tracking-[0]  font-bold w-full lg:w-1/2">
                No results
            </h1>
            <div className="flex-1 lg:pl-[90px] text-center lg:text-left pt-[1.2em] lg:pt-0">
                <h3 className="text-[25px] lg:text-[2.000em] leading-tight font-bold">
                    {`We're sorry, but your search "`}
                    {search}
                    {`" did not match`}{' '}
                </h3>
                <p className="mt-4 mb-6">
                    {`Can't find what you need? Take a moment and do a search
                    below or start from`}{' '}
                    <Link className="text-[#720f21]" href="/">
                        our homepage
                    </Link>
                    .{' '}
                </p>
                <div className="">
                    <div className="">
                        <form
                            role="search"
                            method="get"
                            className="flex bg-white rounded shadow-custom overflow-hidden"
                            action="/"
                            data-inited-keypress={1}>
                            <label className="flex-1">
                                <span className="screen-reader-text">
                                    Search for:
                                </span>
                                <input
                                    type="search"
                                    className="px-[24px] py-[16px] leading-[24px] w-full appearance-none focus:outline-none"
                                    placeholder="Search …"
                                    name="s"
                                />
                            </label>
                            <label className="bg-[#720f21] text-white w-[56px] h-[56px] flex items-center justify-center flex-shrink-0 cursor-pointer">
                                <input
                                    hidden
                                    type="submit"
                                    className="hidden"
                                    defaultValue="Search"
                                />
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth={0}
                                    viewBox="0 0 512 512"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                                </svg>
                            </label>
                        </form>
                    </div>
                </div>{' '}
            </div>
        </div>
    );
};
export default ResultEmpty;
