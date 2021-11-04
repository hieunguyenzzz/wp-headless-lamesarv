import { fixImageUrl } from 'libs/utils/cloudinary';
import { useRouter } from 'next/router';
import { useNewsletter } from '../libs/hooks/useNewsletter';
import Link from './Link';
const NewsletterForm = () => {
    const { loading, onSubmit, success } = useNewsletter();
    if (success)
        return (
            <p className="whitespace-pre-line text-[#008000]">
                {`Your subscription was successful! Kindly check your mailbox and confirm your subscription. If you don't see the email within a few minutes, check the spam/junk folder.`}
            </p>
        );
    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                const emailElement = e.currentTarget.querySelector(
                    '[name="esfpx_email"]'
                );
                const nameElement = e.currentTarget.querySelector(
                    '[name="esfpx_name"]'
                );
                await onSubmit(emailElement.value, nameElement.value);
                emailElement.value = '';
                nameElement.value = '';
                return false;
            }}>
            <h5 className="font-bold text-xl hover:text-[#a58858] pb-[18px] mb-[18px] relative">
                Join Our La Mesa RV’s Newsletter – RVs, Recipes, Travel & Tips
                <span className="bg-[#E5D8CE] absolute bottom-0 left-[14px] w-[11px] h-[5px] rounded"></span>
                <span className="bg-[#E5D8CE] absolute bottom-0 left-0 w-[11px] h-[5px] rounded"></span>
            </h5>
            <div className="mb-[11px]">
                <label>
                    Name*
                    <br />
                    <input
                        type="text"
                        name="esfpx_name"
                        className="shadow-custom rounded focus:outline-none py-[16px] px-[24px] leading-[24px] lg:w-[216px]"
                        required="required"
                    />
                </label>
            </div>
            <div className="mb-[11px]">
                <label>
                    Email*
                    <br />
                    <input
                        className="shadow-custom rounded focus:outline-none py-[16px] px-[24px] leading-[24px] lg:w-[216px]"
                        type="email"
                        name="esfpx_email"
                        required="required"
                    />
                </label>
            </div>

            <button
                type="submit"
                className="cursor-pointer text-[17px] leading-[22px] pt-[1em] px-[2.65em] pb-[1.08em] font-heading hover:bg-[#c0b9a8] text-white bg-[#720f21] border-[color:#720f21] rounded border hover:border-[color:#c0b9a8] font-bold capitalize flex items-center">
                Stay informed
                <div
                    className={
                        loading
                            ? 'transition-all opacity-100 ml-0 pl-3 pointer-events-none'
                            : 'transition-all opacity-0 ml-[-44px] pl-3'
                    }>
                    <svg
                        className="w-5 h-5 mr-3 animate-spin"
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        version="1.1"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 2c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2s-2-0.895-2-2zM12.359 8c0 0 0 0 0 0 0-0.906 0.735-1.641 1.641-1.641s1.641 0.735 1.641 1.641c0 0 0 0 0 0 0 0.906-0.735 1.641-1.641 1.641s-1.641-0.735-1.641-1.641zM10.757 12.243c0-0.821 0.665-1.486 1.486-1.486s1.486 0.665 1.486 1.486c0 0.821-0.665 1.486-1.486 1.486s-1.486-0.665-1.486-1.486zM6.654 14c0-0.743 0.603-1.346 1.346-1.346s1.346 0.603 1.346 1.346c0 0.743-0.603 1.346-1.346 1.346s-1.346-0.603-1.346-1.346zM2.538 12.243c0-0.673 0.546-1.219 1.219-1.219s1.219 0.546 1.219 1.219c0 0.673-0.546 1.219-1.219 1.219s-1.219-0.546-1.219-1.219zM0.896 8c0-0.61 0.494-1.104 1.104-1.104s1.104 0.494 1.104 1.104c0 0.61-0.494 1.104-1.104 1.104s-1.104-0.494-1.104-1.104zM2.757 3.757c0 0 0 0 0 0 0-0.552 0.448-1 1-1s1 0.448 1 1c0 0 0 0 0 0 0 0.552-0.448 1-1 1s-1-0.448-1-1zM14.054 3.757c0 1-0.811 1.811-1.812 1.811s-1.812-0.811-1.812-1.811c0-1.001 0.811-1.811 1.812-1.811s1.812 0.811 1.812 1.811z" />
                    </svg>
                </div>
            </button>
        </form>
    );
};
const fixAdimage = (url) => url.replace(/-[0-9]{3}x[0-9]{3}\.jpg/g, '.jpg');
function SideBar({ pageProps }) {
    const {
        query: { utm_campaign }
    } = useRouter();
    let displayAdImage =
        !!pageProps?.post?.displayAdImage &&
        pageProps?.post?.displayAdImage !== '0' &&
        fixImageUrl(pageProps?.post?.displayAdImage);
    const showAdImage =
        displayAdImage &&
        utm_campaign &&
        utm_campaign === pageProps?.post?.utmCampaign;
    // console.log({ displayAdImage, utm_campaign, post: pageProps?.post?.utmCampaign, })
    if (showAdImage) {
        displayAdImage = fixAdimage(displayAdImage);
    }
    return (
        <div className="w-full lg:w-[300px] lg:h-full  flex-shrink-0  space-y-[30px] space-y-reverse">
            <a
                id="sidebar_skip_link_anchor"
                className="fixed top-0 left-0 opacity-0 pointer-events-none"
                href="#sidebar_skip_link_anchor">
                sidebar_skip_link_anchor
            </a>
            <aside className="flex-1 p-8 shadow">
                <h5 className="font-bold text-xl hover:text-[#a58858] pb-[18px] mb-[18px] relative">
                    Locations
                    <span className="bg-[#E5D8CE] absolute bottom-0 left-[14px] w-[11px] h-[5px] rounded"></span>
                    <span className="bg-[#E5D8CE] absolute bottom-0 left-0 w-[11px] h-[5px] rounded"></span>
                </h5>
                <ul className="flex flex-col space-y-3">
                    <div className="text-[#720f21] space-y-4">
                        <p>
                            <a
                                href="https://www.lamesarv.com/california-motorhome-dealer"
                                target="_blank"
                                rel="noopener noreferrer">
                                CALIFORNIA
                            </a>
                        </p>
                        <p>
                            <a
                                href="https://www.lamesarv.com/florida-motorhome-dealer"
                                target="_blank"
                                rel="noopener noreferrer">
                                FLORIDA
                            </a>
                        </p>
                        <p>
                            <a
                                href="https://www.lamesarv.com/arizona-motorhome-dealer"
                                target="_blank"
                                rel="noopener noreferrer">
                                ARIZONA
                            </a>
                        </p>
                        <p>
                            <a
                                href="https://www.lamesarv.com/new-mexico-motorhome-dealer"
                                target="_blank"
                                rel="noopener noreferrer">
                                NEW MEXICO
                            </a>
                        </p>
                    </div>
                </ul>
            </aside>
            {showAdImage && (
                <aside className="">
                    <img
                        className="w-full"
                        src={displayAdImage}
                        alt={displayAdImage}></img>
                </aside>
            )}
            <aside className="p-8 shadow widget widget_email-subscribers-form">
                <div>
                    <NewsletterForm />
                </div>
            </aside>
            <aside className="flex-1 p-8 shadow">
                <h5 className="font-bold text-xl hover:text-[#a58858] pb-[18px] mb-[18px] relative">
                    RV Lifestyle
                    <span className="bg-[#E5D8CE] absolute bottom-0 left-[14px] w-[11px] h-[5px] rounded"></span>
                    <span className="bg-[#E5D8CE] absolute bottom-0 left-0 w-[11px] h-[5px] rounded"></span>
                </h5>
                <ul className="flex flex-col space-y-3">
                    {pageProps.recentPosts?.map(({ title, link }, i) => {
                        if (i >= 5) {
                            return null;
                        }
                        return (
                            <li
                                key={i}
                                className="flex items-start transform leading-[29px] transition-all duration-500 ease-in-out ">
                                <div className="mr-1 text-sm h-[29px] flex items-center">
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
                                <span className="inline-block font-bold hover:text-[#720f21] ">
                                    <Link href={link}>{title}</Link>
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </aside>
        </div>
    );
}
export default SideBar;
