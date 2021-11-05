import classNames from 'classnames';
import { Image, Transformation } from 'cloudinary-react';
import { useRouter } from 'next/router';
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
    author
}) {
    const { basePath } = useRouter();
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
                            'rec-van-assets/' +
                            imageUrl.replace(
                                process.env.NEXT_PUBLIC_API_URL +
                                    '/wp-content/uploads/',
                                ''
                            )
                        }
                        secure="true"
                        onLoad={(props) => {
                            console.log({ props });
                            setImageLoaded(true);
                        }}
                        upload_preset="rec-van-assets"
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
                    <div className="flex flex-wrap items-baseline gap-3 post_meta">
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
                                href={`/author/${author.node.slug}/`}>
                                <div className="h-[13px] w-[28px] inline-flex items-center relative mr-1">
                                    <Avartar author={author} />
                                </div>
                                <span className="text-[13px] font-bold  leading-[15px]">
                                    {author.node.name}
                                </span>
                            </Link>
                        </span>
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
