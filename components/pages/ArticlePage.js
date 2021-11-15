import Avartar from 'components/Avartar';
import Tag from 'components/Tag';
import { insertViewCount } from 'libs/apis';
import { usePost } from 'libs/hooks/post/usePost';
import { useEffect } from 'react';
import { CLOUDINARY_UPLOAD_PRESET, EMAIL, HOST_URL } from '../../libs/const';
import { useLike } from '../../libs/hooks/post/useLike';
import Container from '../Container';
import Layout from '../Layout';
import Link from '../Link';
import SideBar from '../SideBar';
import StickyColumn from '../StickyColumn';

const ArticlePage = ({ pageProps }) => {
    const { post } = usePost();
    const { prePost, nextPost } = pageProps;
    const { featuredImage } = post;
    const shareUrl = encodeURI(HOST_URL + post.link);
    const shareUrls = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURI(
            post.title
        )}&url=${encodeURI(shareUrl)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(
            shareUrl
        )}`,
        email: `mailto:${EMAIL}?subject=${encodeURI(
            post.title
        )}&body=${shareUrl}`
    };
    const imageUrl = featuredImage?.node?.sourceUrl;
    const { likesCount, onLike } = useLike(post);
    useEffect(() => {
        insertViewCount({ postId: post.id });
    }, [post.id]);
    const author = post.author?.node;
    return (
        <Layout pageProps={pageProps}>
            <div className="pb-10 lg:pb-[3.8em] text-[18px] flex flex-col justify-end items-end">
                <div className="relative w-full min-h-[280px] lg:min-h-[500px] lg:h-[calc(100vh-var(--header-height))] py-5 lg:py-12 flex items-end">
                    {imageUrl && (
                        <div
                            className="mx-auto z-[-1] absolute top-0 left-0 w-full h-full overflow-hidden"
                            itemScope="itemscope"
                            itemProp="image"
                            itemType="https://schema.org/ImageObject">
                            <meta itemProp="width" content />
                            <meta itemProp="height" content />
                            <img
                                width={770}
                                height={434}
                                src={imageUrl.replace(
                                    process.env.NEXT_PUBLIC_API_URL +
                                        '/wp-content/uploads/',
                                    'https://res.cloudinary.com/la-mesa-rv/image/upload/f_auto/' +
                                        CLOUDINARY_UPLOAD_PRESET +
                                        '/'
                                )}
                                className="w-full bg-gray-100 h-full object-cover bg-gray-100 transform transition-transform duration-1000 ease-in-out group-hover:scale-105 z-[-1]"
                                alt={featuredImage?.node?.altText}
                                loading="lazy"
                                srcSet={`${imageUrl.replace(
                                    process.env.NEXT_PUBLIC_API_URL +
                                        '/wp-content/uploads/',
                                    'https://res.cloudinary.com/la-mesa-rv/image/upload/f_auto/' +
                                        CLOUDINARY_UPLOAD_PRESET +
                                        '/'
                                )} 1440w,${imageUrl.replace(
                                    process.env.NEXT_PUBLIC_API_URL +
                                        '/wp-content/uploads/',
                                    'https://res.cloudinary.com/la-mesa-rv/image/upload/f_auto/' +
                                        CLOUDINARY_UPLOAD_PRESET +
                                        '/'
                                )} 1170w, 
                            ${imageUrl.replace(
                                process.env.NEXT_PUBLIC_API_URL +
                                    '/wp-content/uploads/',
                                'https://res.cloudinary.com/la-mesa-rv/image/upload/w_770,f_auto/' +
                                    CLOUDINARY_UPLOAD_PRESET +
                                    '/'
                            )} 770w, 
                            ${imageUrl.replace(
                                process.env.NEXT_PUBLIC_API_URL +
                                    '/wp-content/uploads/',
                                'https://res.cloudinary.com/la-mesa-rv/image/upload/w_370,f_auto/' +
                                    CLOUDINARY_UPLOAD_PRESET +
                                    '/'
                            )} 370w, 
                            ${imageUrl.replace(
                                process.env.NEXT_PUBLIC_API_URL +
                                    '/wp-content/uploads/',
                                'https://res.cloudinary.com/la-mesa-rv/image/upload/w_270,f_auto/' +
                                    CLOUDINARY_UPLOAD_PRESET +
                                    '/'
                            )} 270w`}
                                sizes="100vw"
                            />
                        </div>
                    )}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#000000a8] to-transparent"></div>
                    <Container className="relative">
                        <div className="flex flex-col items-start text-left text-white ">
                            <div className="mb-[0.5em] flex flex-wrap gap-3 xl:gap-[19px] ]">
                                {post.categories?.edges?.map(
                                    ({ node: cate }, i) => (
                                        <Tag
                                            key={i}
                                            href={`/category/${cate.slug}/`}
                                            label={cate.name}
                                            className="inline-block px-3 py-1 text-sm text-white bg-opacity-100 rounded bg-primary hover:bg-secondary"
                                        />
                                    )
                                )}
                            </div>
                            <h1
                                style={{
                                    textShadow: '2px 1px black'
                                }}
                                className="text-2xl md:text-3xl text-white lg:text-4xl font-bold xl:text-[54px] !leading-tight max-w-[80%] "
                                itemProp="headline">
                                {post.title}
                            </h1>
                            <div className="mt-[1.65em] gap-6 lg:gap-6 text-sm flex flex-wrap items-baseline">
                                <Link
                                    className="flex items-center font-bold text-white hover:text-opacity-70"
                                    rel="author"
                                    href={`/author/${post.author.node.slug}`}>
                                    <span className="inline-block mr-1 align-middle ">
                                        <div className="h-[13px] w-[28px] inline-flex items-center relative">
                                            <Avartar
                                                author={post?.author?.node}
                                            />
                                        </div>
                                    </span>
                                    <span className="truncate post_author_name">
                                        {post.author.node.name}
                                    </span>
                                </Link>{' '}
                                <span className="inline-block text-sm ">
                                    <span className="flex items-baseline leading-[15px]">
                                        <span className="self-center inline-block mr-1 text-[15px]">
                                            <svg
                                                stroke="currentColor"
                                                fill="none"
                                                strokeWidth={2}
                                                viewBox="0 0 24 24"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                height="1em"
                                                width="1em"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <circle
                                                    cx={12}
                                                    cy={12}
                                                    r={10}
                                                />
                                                <polyline points="12 6 12 12 16 14" />
                                            </svg>
                                        </span>
                                        <span className="leading-[15px] font-bold">
                                            {new Date(
                                                post.date
                                            ).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </span>
                                </span>
                            </div>{' '}
                        </div>
                    </Container>
                </div>
                <Container className="flex mt-[2em] lg:mt-[3.8em] flex-col lg:flex-row lg:space-x-[30px]  gap-y-16    items-start">
                    <div className="flex-1">
                        <article
                            className="max-w-full prose"
                            dangerouslySetInnerHTML={{
                                __html: post.content
                                    .replace(/-[0-9]{3}x[0-9]{3}\.jpg/g, '.jpg')
                                    .replace(
                                        new RegExp(
                                            process.env.NEXT_PUBLIC_API_URL +
                                                'wp-content/uploads/',
                                            'g'
                                        ),
                                        'https://res.cloudinary.com/la-mesa-rv/image/upload/f_auto/v1/' +
                                            CLOUDINARY_UPLOAD_PRESET +
                                            '/'
                                    )
                                    .replace(
                                        new RegExp(
                                            'https://myrecvan.com/wp-content/uploads/',
                                            'g'
                                        ),
                                        'https://res.cloudinary.com/la-mesa-rv/image/upload/f_auto/v1/' +
                                            CLOUDINARY_UPLOAD_PRESET +
                                            '/'
                                    )
                            }}
                        />
                        <div className="space-y-[2.5em] py-[2.5em]">
                            <div className="border-t border-[#E5D8CE] w-full" />
                            <div className="flex flex-wrap items-baseline justify-between space-y-3">
                                <div className="cursor-pointer group">
                                    <button
                                        onClick={() => {
                                            onLike();
                                        }}
                                        className="inline-flex rounded w-[46px] h-[46px] bg-[#E5D8CE] align-middle mr-[12px] text-[#720f21] group-hover:text-white  justify-center items-center">
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth={0}
                                            viewBox="0 0 512 512"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M349.6 64c-36.4 0-70.7 16.7-93.6 43.9C233.1 80.7 198.8 64 162.4 64 97.9 64 48 114.2 48 179.1c0 79.5 70.7 143.3 177.8 241.7L256 448l30.2-27.2C393.3 322.4 464 258.6 464 179.1 464 114.2 414.1 64 349.6 64zm-80.8 329.3l-4.2 3.9-8.6 7.8-8.6-7.8-4.2-3.9c-50.4-46.3-94-86.3-122.7-122-28-34.7-40.4-63.1-40.4-92.2 0-22.9 8.4-43.9 23.7-59.3 15.2-15.4 36-23.8 58.6-23.8 26.1 0 52 12.2 69.1 32.5l24.5 29.1 24.5-29.1c17.1-20.4 43-32.5 69.1-32.5 22.6 0 43.4 8.4 58.7 23.8 15.3 15.4 23.7 36.5 23.7 59.3 0 29-12.5 57.5-40.4 92.2-28.8 35.7-72.3 75.7-122.8 122z" />
                                        </svg>
                                    </button>
                                    <span className="mr-2 group-hover:text-[#720f21]">
                                        {likesCount}
                                    </span>
                                    <span className="mr-2 group-hover:text-[#720f21]">
                                        likes
                                    </span>
                                </div>
                                <div className="flex flex-wrap space-x-2">
                                    <a
                                        target="popup"
                                        onClick={() => {
                                            window.open(
                                                shareUrls.twitter,
                                                'popup',
                                                'width=600,height=600'
                                            );
                                            return false;
                                        }}
                                        href={shareUrls.twitter}
                                        className="text-white inline-flex justify-center items-center rounded w-[46px] h-[46px] bg-[#26A1D8] hover:bg-[#E5D8CE] cursor-pointer align-middle ">
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth={0}
                                            viewBox="0 0 512 512"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M496 109.5a201.8 201.8 0 01-56.55 15.3 97.51 97.51 0 0043.33-53.6 197.74 197.74 0 01-62.56 23.5A99.14 99.14 0 00348.31 64c-54.42 0-98.46 43.4-98.46 96.9a93.21 93.21 0 002.54 22.1 280.7 280.7 0 01-203-101.3A95.69 95.69 0 0036 130.4c0 33.6 17.53 63.3 44 80.7A97.5 97.5 0 0135.22 199v1.2c0 47 34 86.1 79 95a100.76 100.76 0 01-25.94 3.4 94.38 94.38 0 01-18.51-1.8c12.51 38.5 48.92 66.5 92.05 67.3A199.59 199.59 0 0139.5 405.6a203 203 0 01-23.5-1.4A278.68 278.68 0 00166.74 448c181.36 0 280.44-147.7 280.44-275.8 0-4.2-.11-8.4-.31-12.5A198.48 198.48 0 00496 109.5z" />
                                        </svg>
                                    </a>
                                    <a
                                        target="popup"
                                        onClick={() => {
                                            window.open(
                                                shareUrls.facebook,
                                                'popup',
                                                'width=600,height=600'
                                            );
                                            return false;
                                        }}
                                        href={shareUrls.facebook}
                                        className="text-white inline-flex justify-center items-center rounded w-[46px] h-[46px] bg-[#23528F] hover:bg-[#E5D8CE] cursor-pointer align-middle ">
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth={0}
                                            viewBox="0 0 320 512"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                                        </svg>
                                    </a>
                                    <a
                                        href={`mailto:${EMAIL}?subject=Why%20Your%20Van%20Needs%20a%20Fall%20Cleaning&body=https%3A%2F%2Fmyrecvan.com%2F2021%2F09%2Fwhy-your-van-needs-a-fall-cleaning%2F`}
                                        className="text-white inline-flex justify-center items-center rounded w-[46px] h-[46px] bg-[#720f21] hover:bg-[#E5D8CE] cursor-pointer align-middle ">
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth={0}
                                            viewBox="0 0 1024 1024"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0 0 68.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z" />
                                        </svg>
                                    </a>
                                    <a
                                        onClick={(e) => {
                                            const target = e.currentTarget;
                                            const tooltopE =
                                                target.querySelector('div');
                                            if (
                                                !tooltopE.hasAttribute('hidden')
                                            ) {
                                                return false;
                                            }
                                            navigator.clipboard
                                                .writeText(shareUrl)
                                                .then(() => {
                                                    // console.log(target);
                                                    if (!target) return;
                                                    const tooltopE =
                                                        target.querySelector(
                                                            'div'
                                                        );
                                                    tooltopE.removeAttribute(
                                                        'hidden'
                                                    );
                                                    setTimeout(() => {
                                                        if (!tooltopE) return;

                                                        tooltopE.setAttribute(
                                                            'hidden',
                                                            true
                                                        );
                                                    }, 3000);
                                                });
                                            return false;
                                        }}
                                        className="text-white inline-flex justify-center  group relative items-center rounded w-[46px] h-[46px] bg-[#720f21] hover:bg-[#E5D8CE] cursor-pointer align-middle ">
                                        <div
                                            hidden
                                            className="absolute text-black transition-opacity opacity-0 pointer-events-none bottom-full group-hover:opacity-100">
                                            Copied!
                                        </div>
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth={0}
                                            viewBox="0 0 24 24"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.465,11.293c1.133-1.133,3.109-1.133,4.242,0L13.414,12l1.414-1.414l-0.707-0.707c-0.943-0.944-2.199-1.465-3.535-1.465 S7.994,8.935,7.051,9.879L4.929,12c-1.948,1.949-1.948,5.122,0,7.071c0.975,0.975,2.255,1.462,3.535,1.462 c1.281,0,2.562-0.487,3.536-1.462l0.707-0.707l-1.414-1.414l-0.707,0.707c-1.17,1.167-3.073,1.169-4.243,0 c-1.169-1.17-1.169-3.073,0-4.243L8.465,11.293z" />
                                            <path d="M12,4.929l-0.707,0.707l1.414,1.414l0.707-0.707c1.169-1.167,3.072-1.169,4.243,0c1.169,1.17,1.169,3.073,0,4.243 l-2.122,2.121c-1.133,1.133-3.109,1.133-4.242,0L10.586,12l-1.414,1.414l0.707,0.707c0.943,0.944,2.199,1.465,3.535,1.465 s2.592-0.521,3.535-1.465L19.071,12c1.948-1.949,1.948-5.122,0-7.071C17.121,2.979,13.948,2.98,12,4.929z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="border-t border-[#E5D8CE] w-full" />
                            <div className="grid grid-cols-2 gap-6">
                                {(({ post }) =>
                                    post && (
                                        <Link
                                            href={post.link}
                                            className="lg:flex col-start-1 col-end-2 lg:space-x-4 hover:text-[#720f21]">
                                            <div className="relative lg:max-w-[118px] w-full flex-shrink-0 mb-5">
                                                <div className="w-full pt-[70%] lg:pt-[100%]" />
                                                <img
                                                    loading="lazy"
                                                    className="absolute inset-0 object-cover w-full h-full overflow-hidden rounded"
                                                    src={post?.featuredImage?.node?.sourceUrl.replace(
                                                        process.env
                                                            .NEXT_PUBLIC_API_URL +
                                                            '/wp-content/uploads/',
                                                        'https://res.cloudinary.com/la-mesa-rv/image/upload/w_270,f_auto/' +
                                                            CLOUDINARY_UPLOAD_PRESET +
                                                            '/'
                                                    )}></img>
                                            </div>
                                            <div className="flex flex-col space-y-3">
                                                <div className="flex items-center space-x-1 font-bold text-[#720f21]">
                                                    <div className="height-[20px]">
                                                        <svg
                                                            className="transform rotate-180"
                                                            stroke="currentColor"
                                                            fill="currentColor"
                                                            strokeWidth={0}
                                                            viewBox="0 0 320 512"
                                                            height="1em"
                                                            width="1em"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                                                        </svg>
                                                    </div>
                                                    <div className="leading-[20px]">
                                                        Previous
                                                    </div>
                                                </div>
                                                <h6 className="font-bold">
                                                    {post.title}
                                                </h6>
                                            </div>
                                        </Link>
                                    ))({ post: prePost })}
                                {(({ post }) =>
                                    post && (
                                        <Link
                                            href={post.link}
                                            className="lg:flex col-start-2 col-end-3 lg:space-x-4 hover:text-[#720f21] flex-row-reverse lg:space-x-reverse">
                                            <div className="relative lg:max-w-[118px] w-full flex-shrink-0 mb-5">
                                                <div className="w-full pt-[70%] lg:pt-[100%]" />
                                                {post?.featuredImage?.node
                                                    ?.sourceUrl && (
                                                    <img
                                                        loading="lazy"
                                                        className="absolute inset-0 object-cover w-full h-full overflow-hidden rounded"
                                                        src={post?.featuredImage?.node?.sourceUrl.replace(
                                                            process.env
                                                                .NEXT_PUBLIC_API_URL +
                                                                '/wp-content/uploads/',
                                                            'https://res.cloudinary.com/la-mesa-rv/image/upload/w_270,f_auto/' +
                                                                CLOUDINARY_UPLOAD_PRESET +
                                                                '/'
                                                        )}></img>
                                                )}
                                            </div>
                                            <div className="flex flex-col items-end space-y-3 text-right">
                                                <div className="flex items-center space-x-1 space-x-reverse flex-row-reverse font-bold text-[#720f21]">
                                                    <div className="height-[20px]">
                                                        <svg
                                                            stroke="currentColor"
                                                            fill="currentColor"
                                                            strokeWidth={0}
                                                            viewBox="0 0 320 512"
                                                            height="1em"
                                                            width="1em"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                                                        </svg>
                                                    </div>
                                                    <div className="leading-[20px]">
                                                        Next
                                                    </div>
                                                </div>
                                                <h6 className="font-bold">
                                                    {post.title}
                                                </h6>
                                            </div>
                                        </Link>
                                    ))({
                                    post: nextPost
                                })}
                            </div>
                        </div>
                        <div
                            className="p-6 lg:p-12 bg-[#ffdabc] rounded flex gap-6 lg:gap-8"
                            itemProp="author"
                            itemScope="itemscope"
                            itemType="https://schema.org/Person">
                            <div
                                className="w-[120px] h-[120px] rounded-full mb-[1em] relative overflow-hidden"
                                itemProp="image">
                                <div className="h-[120px] w-[120px] inline-flex items-center relative">
                                    <Avartar size={120} />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h4
                                    className="font-heading text-[25px] font-bold"
                                    itemProp="name">
                                    <span>{author.name}</span>
                                </h4>
                                <Link
                                    href={`/author/${post.author.node.slug}`}
                                    className="font-bold author_bio text-[#720f21] hover:text-base"
                                    itemProp="description">
                                    View all Posts
                                </Link>
                            </div>
                        </div>
                        {/* <Comments post={post} /> */}
                        <section className="my-[2.5em] p-[20px] lg:p-[30px] shadow rounded">
                            <h3 className="text-[22px] mb-[1em] font-bold">
                                You May Also Like
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2  gap-[20px] lg:gap-[30px] items-center">
                                {pageProps.recommendationPosts?.map(
                                    (post, i) => (
                                        <div key={i} className="col-span-1">
                                            <div className="flex items-center space-x-4">
                                                <div className="relative max-w-[35%] lg:max-w-[118px] w-full flex-shrink-0 mb-5">
                                                    <div className="w-full pt-[70%]" />
                                                    <img
                                                        className="absolute inset-0 object-cover w-full h-full overflow-hidden rounded"
                                                        loading="lazy"
                                                        src={post?.featuredImage?.node?.sourceUrl.replace(
                                                            process.env
                                                                .NEXT_PUBLIC_API_URL +
                                                                '/wp-content/uploads/',
                                                            'https://res.cloudinary.com/la-mesa-rv/image/upload/w_270,f_auto/' +
                                                                CLOUDINARY_UPLOAD_PRESET +
                                                                '/'
                                                        )}></img>
                                                </div>
                                                <div className="post_header entry-header">
                                                    <h6 className="font-bold hover:text-[#720f21]">
                                                        <Link href={post.link}>
                                                            {post.title}
                                                        </Link>
                                                    </h6>
                                                    <div className="mb-[1em] mt-3 flex flex-wrap gap-2">
                                                        {post.categories?.edges?.map(
                                                            (
                                                                { node: cate },
                                                                i
                                                            ) => (
                                                                <Tag
                                                                    key={i}
                                                                    href={`/category/${cate.slug}/`}
                                                                    label={
                                                                        cate.name
                                                                    }
                                                                    rel="category tag"></Tag>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                            {/* /.swiper-wrapper || .columns_wrap */}{' '}
                        </section>
                    </div>
                    <StickyColumn offsetTop={120} offsetBottom={20}>
                        <SideBar pageProps={pageProps} />
                    </StickyColumn>
                </Container>
            </div>
        </Layout>
    );
};
export default ArticlePage;
