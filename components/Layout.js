import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import Container from './Container';
import Link from './Link';
const Header = ({ pageProps }) => {
    const headerRef = useRef();
    const [showUp, setShowUp] = useState();
    const [openMenu, setOpenMenu] = useState();
    const [status, setStatus] = useState('reset');
    useEffect(() => {
        const headerElement = headerRef.current;
        if (!headerElement) {
            return;
        }
        let currentScrollTop;
        let headerBounds;
        const hide = () => {
            setStatus('hide');
        };
        const reveal = () => {
            setStatus('reveal');
        };
        const reset = () => {
            setStatus('reset');
        };
        const onScrollHandler = () => {
            const offset = 300;
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > offset) {
                requestAnimationFrame(() => setShowUp(true));
            } else {
                requestAnimationFrame(() => setShowUp(false));
            }
            if (scrollTop < offset) {
                requestAnimationFrame(reset);
            } else {
                if (
                    scrollTop > currentScrollTop &&
                    scrollTop > headerBounds.bottom
                ) {
                    requestAnimationFrame(hide);
                } else if (
                    scrollTop < currentScrollTop &&
                    scrollTop > headerBounds.bottom
                ) {
                    requestAnimationFrame(reveal);
                } else if (headerBounds && scrollTop <= headerBounds.top) {
                    requestAnimationFrame(reset);
                }
            }

            currentScrollTop = scrollTop;
        };
        const createObserver = (element) => {
            let observer = new IntersectionObserver((entries, observer) => {
                headerBounds = entries[0].intersectionRect;
                observer.disconnect();
            });
            observer.observe(element);
        };
        window.addEventListener('scroll', onScrollHandler, false);
        createObserver(headerElement);
        return () => { };
    }, []);

    return (
        <>
            <header className=" sticky top-0 z-10 pointer-events-none">
                <div
                    ref={headerRef}
                    className={(() => {
                        let headerClass =
                            'h-header flex items-center text-white   transition-all';
                        if (!openMenu) {
                            switch (status) {
                                case 'reveal':
                                    headerClass =
                                        'h-[74px] flex items-center text-white   transition-all transform translate-y-O';
                                    break;
                                case 'hide':
                                    headerClass =
                                        'h-header flex items-center text-white   transition-all transform translate-y-[-100%]';
                                    break;
                                case 'reset':
                                default:
                                    headerClass =
                                        'h-header flex items-center text-white   transition-all';
                                    break;
                            }
                        }

                        return headerClass;
                    })()}>
                    <Container>
                        <div className="w-full h-full pointer-events-auto">
                            <div className="w-full flex items-center justify-between space-x-6 h-full">
                                <div className="text-2xl font-bold lg:text-[30.6px] ">
                                    <Link
                                        className="hover:text-[#a58858]"
                                        href="/">
                                        <span>My Rec Van</span>
                                    </Link>
                                </div>
                                <div className="flex-1" />
                                <div className="hidden lg:block">
                                    <div className="group">
                                        <nav
                                            itemScope="itemscope"
                                            itemType="https://schema.org/SiteNavigationElement">
                                            <ul
                                                className="lg:flex flex-wrap space-x-6 font-bold text-lg lg:text-[17px]"
                                                style={{
                                                    touchAction: 'pan-y'
                                                }}>
                                                {pageProps.app.mainMenu.map(
                                                    (
                                                        {
                                                            node: {
                                                                path,
                                                                label
                                                            }
                                                        },
                                                        i
                                                    ) => (
                                                        <li
                                                            key={i}
                                                            className="py-2">
                                                            <Link
                                                                className="hover:text-[#a58858]"
                                                                href={path}>
                                                                <span>
                                                                    {label}
                                                                </span>
                                                            </Link>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </nav>
                                    </div>
                                    <div className="hidden">
                                        <div className="">
                                            <div className="">
                                                <form
                                                    role="search"
                                                    method="get"
                                                    className="search_form"
                                                    action="/"
                                                    data-inited-keypress={1}>
                                                    <input
                                                        type="hidden"
                                                        defaultValue
                                                        name="post_types"
                                                    />
                                                    <input
                                                        type="text"
                                                        className="search_field fill_inited"
                                                        placeholder="Search"
                                                        defaultValue
                                                        name="s"
                                                    />
                                                    <button
                                                        aria-label="submit"
                                                        type="submit"
                                                        className="search_submit trx_addons_icon-search"
                                                    />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    hidden
                                    type="checkbox"
                                    id="openNav"
                                    name="openNav"
                                />
                                <div className="block lg:hidden">
                                    <div className="group w-full">
                                        <button
                                            onClick={() => {
                                                setOpenMenu(true);
                                            }}
                                            className="text-3xl">
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                strokeWidth={0}
                                                viewBox="0 0 512 512"
                                                height="1em"
                                                width="1em"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeMiterlimit={10}
                                                    strokeWidth={48}
                                                    d="M88 152h336M88 256h336M88 360h336"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setOpenMenu(false);
                                            }}
                                            htmlFor="openNav"
                                            className={classNames(
                                                'p-6 z-10 absolute top-0 right-0 text-3xl cursor-pointer  transform transition-all overflow-hidden',
                                                {
                                                    'opacity-0 pointer-events-none ':
                                                        !openMenu,
                                                    'opacity-100 pointer-events-auto':
                                                        openMenu
                                                }
                                            )}>
                                            <svg
                                                className={classNames(
                                                    'transform transition-all',
                                                    {
                                                        'opacity-0 pointer-events-none  rotate-45':
                                                            !openMenu,
                                                        'opacity-100 pointer-events-auto  rotate-0 ':
                                                            openMenu
                                                    }
                                                )}
                                                stroke="currentColor"
                                                fill="none"
                                                strokeWidth="0"
                                                viewBox="0 0 24 24"
                                                height="1em"
                                                width="1em"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                                                    fill="currentColor"></path>
                                            </svg>
                                        </button>
                                        <div
                                            style={{
                                                backgroundColor:
                                                    'rgb(39, 39, 38)'
                                            }}
                                            className={classNames(
                                                ` overflow-x-hidden overflow-y-auto transition-all fixed top-0 left-0 w-full h-screen transform origin-top  duration-300`,
                                                {
                                                    ' opacity-0 pointer-events-none  scale-y-0 ':
                                                        !openMenu,
                                                    'opacity-100 pointer-events-auto scale-y-100 ':
                                                        openMenu
                                                }
                                            )}>
                                            <div className="text-2xl font-bold lg:text-[30.6px] text-center mt-12">
                                                <Link
                                                    className="hover:text-[#a58858]"
                                                    href="/">
                                                    <span>My Rec Van</span>
                                                </Link>
                                            </div>
                                            <nav
                                                className="mt-12"
                                                itemScope="itemscope"
                                                itemType="https://schema.org/SiteNavigationElement">
                                                <ul
                                                    className="lg:flex flex-col flex-wrap space-y-6 font-bold text-lg lg:text-[17px]"
                                                    style={{
                                                        touchAction: 'pan-x'
                                                    }}>
                                                    <li className="inline-block w-[28rem] pl-10 font-bold text-2xl hover:text-[#a58858]">
                                                        <Link href="/category/news-and-reviews/">
                                                            <span>
                                                                News and Reviews
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="inline-block w-[28rem] pl-10 font-bold text-2xl hover:text-[#a58858]">
                                                        <Link href="/category/lifestyle/">
                                                            <span>
                                                                Lifestyle
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="inline-block w-[28rem] pl-10 font-bold text-2xl hover:text-[#a58858]">
                                                        <Link href="/category/tips/">
                                                            <span>Tips</span>
                                                        </Link>
                                                    </li>
                                                    <li className="inline-block w-[28rem] pl-10 font-bold text-2xl hover:text-[#a58858]">
                                                        <Link href="/category/travel/">
                                                            <span>Travel</span>
                                                        </Link>
                                                    </li>
                                                    <li className="inline-block w-[28rem] pl-10 font-bold text-2xl hover:text-[#a58858]">
                                                        <Link href="/gallery/">
                                                            <span>Gallery</span>
                                                        </Link>
                                                    </li>
                                                    <li className="inline-block w-[28rem] pl-10 font-bold text-2xl hover:text-[#a58858]">
                                                        <Link href="https://www.recvan.com/?utm_source=Blog&utm_medium=Nav%20Link&utm_campaign=blogtraffic">
                                                            <span>
                                                                Shop Now
                                                            </span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                    <div className="hidden">
                                        <div className="">
                                            <div className="">
                                                <form
                                                    role="search"
                                                    method="get"
                                                    className="search_form"
                                                    action="/"
                                                    data-inited-keypress={1}>
                                                    <input
                                                        type="hidden"
                                                        defaultValue
                                                        name="post_types"
                                                    />
                                                    <input
                                                        type="text"
                                                        className="search_field fill_inited"
                                                        placeholder="Search"
                                                        defaultValue
                                                        name="s"
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="search_submit trx_addons_icon-search"
                                                    />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                    <div
                        className="absolute inset-0 z-[-1]"
                        style={{ backgroundColor: 'rgb(39, 39, 38)' }}
                    />
                </div>
            </header>
            <div
                key="srollTopButton"
                style={{
                    padding: `env(safe-area-inset-top, 50px)
                    env(safe-area-inset-right, 50px)
                    env(safe-area-inset-bottom, 50px)
                    env(safe-area-inset-left, 50px)`
                }}
                className="fixed bottom-0 right-0 p-[2em] pointer-events-none z-10">
                <div className="p-[2em]">
                    <div
                        style={{
                            willChange: 'tranform'
                        }}
                        className={classNames(
                            'transition-all transform ease-in-out origin-bottom duration-200',
                            showUp
                                ? 'opacity-100 translate-y-0 pointer-events-auto'
                                : 'opacity-0 translate-y-8 pointer-events-none'
                        )}
                    >
                        <button onClick={() => {
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: 'smooth'
                            });
                        }} className="w-10 text-2xl text-white h-10 flex justify-center items-center bg-[#6f96c5] hover:bg-[#c0b9a8] rounded border border-[color:#6f96c5] hover:border-[color:#c0b9a8]">
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth={0}
                                viewBox="0 0 10 16"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    d="M10 10l-1.5 1.5L5 7.75 1.5 11.5 0 10l5-5 5 5z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
const Layout = ({ pageProps, children }) => {
    return (
        <div className="w-full fit flex flex-col">
            <Header pageProps={pageProps} />
            <main className="flex-1">
                <a className="hidden" href="#top">top</a>
                {children}
            </main>
            <footer className="bg-[#272726] min-h-[100px] text-white">
                <Container className=" pt-20 pb-12 flex flex-col lg:flex-row gap-y-12 gap-x-6">
                    <aside id="archives-2" className="flex-1 space-y-8">
                        <h5 className="font-bold text-2xl hover:text-[#a58858]">
                            Archives
                        </h5>
                        <ul className="flex flex-col space-y-3">
                            {pageProps.archives.map(
                                ({ dateString, url }, i) => {
                                    return (
                                        <li
                                            key={i}
                                            className="flex items-center transform transition-all hover:ml-4 duration-500 ease-in-out hover:text-[#a58858]">
                                            <div className="text-lg mr-1 text-[#8c8987]">
                                                <svg
                                                    stroke="currentColor"
                                                    fill="currentColor"
                                                    strokeWidth={0}
                                                    viewBox="0 0 8 16"
                                                    height="1em"
                                                    width="1em"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M7.5 8l-5 5L1 11.5 4.75 8 1 4.5 2.5 3l5 5z"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="inline-block font-bold text-lg  ">
                                                <Link href={'/' + url}>
                                                    {dateString}
                                                </Link>
                                            </span>
                                        </li>
                                    );
                                }
                            )}
                        </ul>
                    </aside>
                    <aside id="archives-2" className="flex-1 space-y-8">
                        <h5 className="font-bold text-2xl hover:text-[#a58858]">
                            Categories
                        </h5>
                        <ul className="flex flex-col space-y-3">
                            {pageProps.categories.map(({ name, link }, i) => {
                                if (link.includes('/category/gallery') || link.includes('/category/uncategorized'))
                                    return null
                                return (
                                    <li
                                        key={i}
                                        className="flex items-center transform transition-all hover:ml-4 duration-500 ease-in-out hover:text-[#a58858]">
                                        <div className="text-lg mr-1 text-[#8c8987]">
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                strokeWidth={0}
                                                viewBox="0 0 8 16"
                                                height="1em"
                                                width="1em"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M7.5 8l-5 5L1 11.5 4.75 8 1 4.5 2.5 3l5 5z"
                                                />
                                            </svg>
                                        </div>
                                        <span className="inline-block font-bold text-lg  ">
                                            <Link href={link}>{name}</Link>
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </aside>
                </Container>
                <Container className=" py-12 text-center text-[#888583] text-sm">
                    {pageProps.copyright}
                </Container>
            </footer>
        </div>
    );
};
export default Layout;
