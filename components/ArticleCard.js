import { Image, Transformation } from 'cloudinary-react';
import Link from './Link';

export default function ArticleCard({
    featuredImage,
    title,
    categories,
    date,
    link,
    excerpt
}) {
    const href = link || '/';
    const imageUrl = featuredImage?.node?.sourceUrl;
    return (
        <article className="rounded shadow">
            <div className="w-full relative overflow-hidden group rounded-t">
                {imageUrl && <Image
                    width={featuredImage.node.mediaDetails.width}
                    height={featuredImage.node.mediaDetails.height}
                    cloudName="la-mesa-rv" publicId={"rec-van-assets/" + imageUrl.replace(
                        process.env.NEXT_PUBLIC_API_URL +
                        '/wp-content/uploads/',
                        ''
                    )} secure="true" upload_preset="rec-van-assets"
                    className="w-full object-contain bg-gray-100 transform transition-transform duration-1000 ease-in-out group-hover:scale-105 z-[-1]"
                    alt={featuredImage?.node?.altText}
                    loading="lazy" >
                    <Transformation width={featuredImage.node.mediaDetails.width} height={featuredImage.node.mediaDetails.height} crop="scale" />
                    <Transformation fetchFormat="auto" />
                </Image>}
                <div className="mask" />
                <Link
                    href={href}
                    aria-hidden="true"
                    className="absolute inset-0 "
                />
            </div>
            <div className="p-6 bg-[#c0b9a8] rounded-b">
                <div className="post_header entry-header">
                    <h3 className="text-xl lg:text-[30px] font-semibold hover:text-[#6f96c5] leading-tight">
                        <Link href={href} rel="bookmark">
                            {title}
                        </Link>
                    </h3>
                </div>
                <div className="post_content entry-content space-y-4">
                    <div className="post_meta space-x-3 space-x-reverse">
                        <span />
                        {categories?.edges?.map(({ node: cate }, i) => (
                            <span
                                key={i}
                                className="bg-white mt-3 py-1 rounded-lg px-3 text-[#122947] inline-block text-sm hover:text-white hover:bg-[#a58858]">
                                <Link
                                    href={`/category/${cate.slug}/`}
                                    rel="category tag">
                                    {cate.name}
                                </Link>
                            </span>
                        ))}
                        <span className="mt-3 inline-block text-sm ">
                            <Link
                                className="flex items-baseline hover:text-[#6f96c5]"
                                href={href}>
                                <span className="inline-block mr-1 self-center">
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
                                <span className="leading-none text-[13px] mt-px">
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
