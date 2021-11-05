import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Container from './Container';
import Link from './Link';
export const Header = ({ pageProps }) => {
    const headerRef = useRef();
    const { basePath } = useRouter();
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
        return () => {};
    }, []);

    return (
        <>
            <header className="sticky top-0 z-10 pointer-events-none h-header">
                <div
                    ref={headerRef}
                    className={(() => {
                        let headerClass =
                            'h-header flex items-center transition-all';
                        if (!openMenu) {
                            switch (status) {
                                case 'reveal':
                                    headerClass =
                                        'flex items-center    transition-all transform translate-y-O';
                                    break;
                                case 'hide':
                                    headerClass =
                                        'flex items-center    transition-all transform translate-y-[-100%]';
                                    break;
                                case 'reset':
                                default:
                                    headerClass =
                                        'flex items-center    transition-all';
                                    break;
                            }
                        }

                        return headerClass;
                    })()}
                    style={
                        status !== 'reset'
                            ? {
                                  '--header-height': '74px'
                              }
                            : null
                    }>
                    <Container>
                        <div className="w-full h-full pointer-events-auto">
                            <div className="flex items-center justify-between w-full space-x-6 transition-all h-header">
                                <div
                                    className={`text-2xl ${
                                        status === 'reset' ? 'py-5' : 'py-2'
                                    } font-bold lg:text-[30.6px] h-full transition-all`}>
                                    <Link
                                        className="hover:text-[#a58858] max-h-full"
                                        href="/">
                                        <img
                                            className="h-full"
                                            src={basePath + '/logo.jpeg'}
                                            alt="logo"></img>
                                    </Link>
                                </div>
                                <div className="flex-1" />
                                <div className="hidden lg:block">
                                    <div>
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
                                                                label,
                                                                children
                                                            }
                                                        },
                                                        i
                                                    ) => {
                                                        if (children) {
                                                            return (
                                                                <li
                                                                    key={i}
                                                                    className="relative flex items-center py-2 h-header group">
                                                                    <Link
                                                                        className="hover:text-[#a58858]"
                                                                        href={
                                                                            path
                                                                        }>
                                                                        <span>
                                                                            {
                                                                                label
                                                                            }
                                                                        </span>
                                                                    </Link>
                                                                    <div className="absolute right-0 hidden gap-4 shadow top-header group-hover:block">
                                                                        <div className="flex flex-col gap-1 py-3 bg-white animated fadeIn">
                                                                            {children.map(
                                                                                (
                                                                                    {
                                                                                        node: {
                                                                                            path,
                                                                                            label
                                                                                        }
                                                                                    },
                                                                                    i
                                                                                ) => {
                                                                                    return (
                                                                                        <div
                                                                                            key={
                                                                                                i
                                                                                            }
                                                                                            className="inline-block px-10 font-bold hover:text-[#a58858] truncate">
                                                                                            <Link
                                                                                                href={
                                                                                                    path
                                                                                                }>
                                                                                                <span>
                                                                                                    {
                                                                                                        label
                                                                                                    }
                                                                                                </span>
                                                                                            </Link>
                                                                                        </div>
                                                                                    );
                                                                                }
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            );
                                                        }
                                                        return (
                                                            <li
                                                                key={i}
                                                                className="flex items-center py-2 h-header">
                                                                <Link
                                                                    className="hover:text-[#a58858]"
                                                                    href={path}>
                                                                    <span>
                                                                        {label}
                                                                    </span>
                                                                </Link>
                                                            </li>
                                                        );
                                                    }
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
                                                    action={basePath}
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
                                    <div className="flex items-center w-full group">
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
                                                'p-6 z-10 absolute  text-white top-0 right-0 text-3xl cursor-pointer  transform transition-all overflow-hidden',
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
                                            className={classNames(
                                                ` overflow-x-hidden text-white bg-[#720f21] overflow-y-auto transition-all fixed top-0 left-0 w-full h-screen transform origin-top  duration-300`,
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
                                                <div
                                                    className="lg:flex flex-col flex-wrap space-y-6 font-bold text-lg lg:text-[17px]"
                                                    style={{
                                                        touchAction: 'pan-x'
                                                    }}>
                                                    {pageProps.app.mainMenu.map(
                                                        (
                                                            {
                                                                node: {
                                                                    path,
                                                                    label,
                                                                    children
                                                                }
                                                            },
                                                            i
                                                        ) => {
                                                            if (children) {
                                                                return (
                                                                    <div
                                                                        className="inline-block w-full px-10 pointer-events-auto focus:pointer-events-none group"
                                                                        tabIndex={
                                                                            0
                                                                        }>
                                                                        <div className="w-full flex items-center font-bold text-2xl hover:text-[#a58858]">
                                                                            <div className="flex-1 py-1 text-left">
                                                                                <span className="font-bold capitalize ">
                                                                                    Details
                                                                                </span>
                                                                            </div>
                                                                            <div className="transform transition-transform rotate-90 text-white group-focus:-rotate-90 duration-300 ease-in-out text-[24px]">
                                                                                <svg
                                                                                    stroke="currentColor"
                                                                                    fill="none"
                                                                                    strokeWidth={
                                                                                        0
                                                                                    }
                                                                                    viewBox="0 0 24 24"
                                                                                    height="1em"
                                                                                    width="1em"
                                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                                    <polyline
                                                                                        strokeWidth={
                                                                                            2
                                                                                        }
                                                                                        points="9 6 15 12 9 18"
                                                                                    />
                                                                                </svg>
                                                                            </div>
                                                                        </div>
                                                                        <div className="h-0 -mt-4 overflow-hidden whitespace-pre-line transition-all pointer-events-auto group-focus:h-auto group-focus:block group-focus:mt-0">
                                                                            {children.map(
                                                                                (
                                                                                    {
                                                                                        node: {
                                                                                            path,
                                                                                            label
                                                                                        }
                                                                                    },
                                                                                    i
                                                                                ) => {
                                                                                    return (
                                                                                        <div
                                                                                            key={
                                                                                                i
                                                                                            }
                                                                                            className="inline-block mt-6 w-[28rem] pl-10 font-bold text-xl hover:text-[#a58858]">
                                                                                            <Link
                                                                                                href={
                                                                                                    path
                                                                                                }>
                                                                                                <span>
                                                                                                    {
                                                                                                        label
                                                                                                    }
                                                                                                </span>
                                                                                            </Link>
                                                                                        </div>
                                                                                    );
                                                                                }
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                            return (
                                                                <div
                                                                    key={i}
                                                                    className="inline-block w-[28rem] pl-10 font-bold text-2xl hover:text-[#a58858]">
                                                                    <Link
                                                                        href={
                                                                            path
                                                                        }>
                                                                        <span>
                                                                            {
                                                                                label
                                                                            }
                                                                        </span>
                                                                    </Link>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                    <div className="inline-block w-[28rem] pl-10 font-bold text-2xl hover:text-[#a58858]">
                                                        <Link href="https://www.recvan.com/?utm_source=Blog&utm_medium=Nav%20Link&utm_campaign=blogtraffic">
                                                            <span>
                                                                Shop Now
                                                            </span>
                                                        </Link>
                                                    </div>
                                                    <div className="px-10">
                                                        <form
                                                            role="search"
                                                            method="get"
                                                            className="flex overflow-hidden bg-white rounded shadow-custom"
                                                            action={basePath}
                                                            data-inited-keypress={
                                                                1
                                                            }>
                                                            <label className="flex-1">
                                                                <span className="screen-reader-text">
                                                                    Search for:
                                                                </span>
                                                                <input
                                                                    type="search"
                                                                    className="px-[24px] text-black  py-[16px] leading-[24px] w-full appearance-none focus:outline-none"
                                                                    placeholder="Search …"
                                                                    name="s"
                                                                />
                                                            </label>
                                                            <label className="bg-[#d85726]  text-white w-[56px] h-[56px] flex items-center justify-center flex-shrink-0 cursor-pointer">
                                                                <input
                                                                    hidden
                                                                    type="submit"
                                                                    className="hidden"
                                                                    defaultValue="Search"
                                                                />
                                                                <svg
                                                                    stroke="currentColor"
                                                                    fill="currentColor"
                                                                    strokeWidth={
                                                                        0
                                                                    }
                                                                    viewBox="0 0 512 512"
                                                                    height="1em"
                                                                    width="1em"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                                                                </svg>
                                                            </label>
                                                        </form>
                                                    </div>
                                                </div>
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
                                                    action={basePath}
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
                                <label
                                    htmlFor="search"
                                    className="cursor-pointer">
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
                            </div>
                        </div>
                    </Container>
                    <div className="absolute inset-0 z-[-1] border-b border-[#720f21] bg-white" />
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
                        )}>
                        <button
                            onClick={() => {
                                window.scrollTo({
                                    top: 0,
                                    left: 0,
                                    behavior: 'smooth'
                                });
                            }}
                            className="w-10 text-2xl  h-10 flex justify-center items-center text-white bg-[#720f21] hover:bg-[#c0b9a8] rounded border border-[color:#720f21] hover:border-[color:#c0b9a8]">
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
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                input#search+#searchModal{
                    display:none
                }
                input#search:checked+#searchModal{
                    display:block
                }
            `
                }}></style>
            <input id="search" type="checkbox" hidden></input>
            <div
                id="searchModal"
                className="fixed inset-0 z-20 w-full h-full bg-white bg-opacity-90 animated fadeIn">
                <div className="relative flex items-center justify-center w-full min-h-full isolate">
                    <label
                        className="absolute inset-0 w-full h-full"
                        htmlFor="search"></label>
                    <Container>
                        <form
                            role="search"
                            method="get"
                            className="relative flex items-center w-full max-w-2xl py-3 mx-auto space-x-3 text-2xl border-b-2 border-black"
                            action={basePath}
                            data-inited-keypress={1}>
                            <input type="hidden" name="post_types" hidden />
                            <div>
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
                            </div>
                            <input
                                type="text"
                                className="flex-1 block bg-transparent appearance-none search_field fill_inited focus:outline-none"
                                placeholder="Search"
                                name="s"
                            />
                        </form>
                    </Container>
                </div>
            </div>
        </>
    );
};
