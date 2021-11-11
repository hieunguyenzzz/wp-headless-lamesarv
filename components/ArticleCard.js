import classNames from 'classnames';
import { Image, Transformation } from 'cloudinary-react';
import { CLOUDINARY_UPLOAD_PRESET } from 'libs/const';
import { useState } from 'react';
import Avartar from './Avartar';
import Link from './Link';
import Tag from './Tag';
export default function ArticleCard({
    featuredImage,
    title,
    categories,
    date,
    link,
    excerpt,
    author,
    likesCountString,
    viewsCountString
}) {
    const href = link || '/';
    const imageUrl = featuredImage?.node?.sourceUrl;
    const [imageLoaded, setImageLoaded] = useState(false);
    return (
        <article className="rounded shadow">
            <div className="relative w-full overflow-hidden bg-gray-100 rounded-t group">
                {imageUrl && (
                    <Image
                        width={featuredImage.node.mediaDetails.width}
                        height={featuredImage.node.mediaDetails.height}
                        cloudName="la-mesa-rv"
                        publicId={
                            CLOUDINARY_UPLOAD_PRESET +
                            '/' +
                            imageUrl.replace(
                                process.env.NEXT_PUBLIC_API_URL +
                                    '/wp-content/uploads/',
                                ''
                            )
                        }
                        secure="true"
                        onLoad={() => {
                            setImageLoaded(true);
                        }}
                        upload_preset={CLOUDINARY_UPLOAD_PRESET}
                        className={classNames(
                            'w-full object-contain transform transition-all duration-1000 ease-in-out group-hover:scale-105 z-[-1]',
                            imageLoaded ? 'opacity-100' : 'opacity-0'
                        )}
                        alt={featuredImage?.node?.altText}
                        loading="lazy">
                        <Transformation
                            width={featuredImage.node.mediaDetails.width}
                            height={featuredImage.node.mediaDetails.height}
                            crop="scale"
                        />
                        <Transformation fetchFormat="auto" />
                    </Image>
                )}
                <div className="mask" />
                <Link
                    href={href}
                    aria-hidden="true"
                    className="absolute inset-0 "
                />
            </div>
            <div className="p-6 bg-white rounded-b">
                <div className="post_header entry-header">
                    <h3 className="text-xl lg:text-[30px] font-semibold hover:text-[#720f21] leading-tight">
                        <Link href={href} rel="bookmark">
                            {title}
                        </Link>
                    </h3>
                </div>
                <div className="space-y-4 post_content entry-content">
                    <div className="flex flex-wrap items-baseline gap-3 mt-3">
                        {categories?.edges?.map(({ node: cate }, i) => (
                            <Tag
                                key={i}
                                href={`/category/${cate.slug}/`}
                                label={cate.name}
                                rel="category tag"></Tag>
                        ))}
                        <span className="inline-block text-sm ">
                            <Link
                                className="flex items-baseline hover:text-[#720f21] leading-[15px]"
                                href={href}>
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
                                        <circle cx={12} cy={12} r={10} />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                </span>
                                <span className="text-[13px] leading-[15px] font-bold">
                                    {new Date(date).toLocaleDateString(
                                        'en-US',
                                        {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        }
                                    )}
                                </span>
                            </Link>
                        </span>
                        <span className="inline-block text-sm ">
                            <Link
                                className="flex items-baseline hover:text-[#720f21] leading-[15px]"
                                href={href}>
                                <span className="self-center inline-block mr-1 text-[15px]">
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth={0}
                                        viewBox="0 0 576 512"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z" />
                                    </svg>
                                </span>
                                <span className="text-[13px] leading-[15px] font-bold">
                                    {`${viewsCountString} Views`}
                                </span>
                            </Link>
                        </span>
                        <span className="inline-block text-sm ">
                            <Link
                                className="flex items-baseline hover:text-[#720f21] leading-[15px]"
                                href={href}>
                                <span className="self-center inline-block mr-1 text-[15px]">
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
                                </span>
                                <span className="text-[13px] leading-[15px] font-bold">
                                    {`${likesCountString} Likes`}
                                </span>
                            </Link>
                        </span>
                        {author && (
                            <span className="inline-block text-sm ">
                                <Link
                                    className="flex items-baseline hover:text-[#720f21] leading-[15px]"
                                    href={`/author/${author.node.slug}/`}>
                                    <div className="h-[13px] w-[28px] inline-flex items-center relative mr-1">
                                        <Avartar author={author} />
                                    </div>
                                    <span className="text-[13px] font-bold  leading-[15px]">
                                        {author.node.name}
                                    </span>
                                </Link>
                            </span>
                        )}
                    </div>
                    <div
                        className="whitespace-pre-line"
                        dangerouslySetInnerHTML={{
                            __html: excerpt.replace('&nbsp; ', '')
                        }}></div>
                </div>
            </div>
        </article>
    );
}
