import { useComment } from 'libs/hooks/post/useComment';
import { useState } from 'react';

const Comments = ({ post }) => {
    const [show, setShow] = useState();
    const {
        commentCount,
        comments = [],
        handleComment,
        loading
    } = useComment(post);
    return (
        <div>
            {!show && (
                <button
                    className="cursor-pointer justify-center w-full text-[17px] leading-[22px] pt-[1em] px-[2.65em] pb-[1.08em] font-heading hover:bg-secondary text-white bg-primary border-secondary rounded border hover:border-[color:#c0b9a8] font-bold flex items-center"
                    onClick={() => setShow(true)}>
                    Leave a Comment {commentCount && `( ${commentCount} )`}{' '}
                    <svg
                        className="text-xl transform rotate-90"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth={0}
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg">
                        <polyline strokeWidth={2} points="9 6 15 12 9 18" />
                    </svg>
                </button>
            )}
            {show && (
                <button
                    className="cursor-pointer justify-center w-full text-[17px] leading-[22px] pt-[1em] px-[2.65em] pb-[1.08em] font-heading hover:bg-secondary text-white bg-primary border-secondary rounded border hover:border-[color:#c0b9a8] font-bold flex items-center"
                    onClick={() => setShow(false)}>
                    Hide Comments{' '}
                    <svg
                        className="text-xl transform -rotate-90"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth={0}
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg">
                        <polyline strokeWidth={2} points="9 6 15 12 9 18" />
                    </svg>
                </button>
            )}
            <div className="mt-[5.5em] space-y-6" hidden={!show}>
                <h3 id="comments" className="text-3xl font-bold">
                    {commentCount} Comments
                </h3>
                <div className="space-y-4">
                    {comments?.nodes?.map(
                        (
                            {
                                author: {
                                    node: { name: authorName }
                                },
                                content,
                                date
                            },
                            i
                        ) => {
                            return (
                                <div key={i} className="flex">
                                    <div className="flex-1 w-0 overflow-hidden flex-row lg:flex  p-[2.5em] bg-[#c0b9a8] rounded">
                                        <div className="w-[15vw] h-[15vw] lg:w-24 lg:h-24 rounded-full relative mr-[1.5em] mb-[1.5em]">
                                            <img
                                                alt="author image"
                                                src="https://secure.gravatar.com/avatar/d7616fff4660f90fdf0fe16f6c0ac7ae?s=100&d=mm&r=g"
                                                srcSet="https://secure.gravatar.com/avatar/d7616fff4660f90fdf0fe16f6c0ac7ae?s=200&d=mm&r=g 2x"
                                                className="w-full h-full overflow-hidden rounded-full ocover"
                                                height={100}
                                                width={100}
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="relative flex flex-col flex-1 space-y-4 overflow-hidden">
                                            <div className="comment_info">
                                                <div className="comment_info_top">
                                                    <h6 className="inline text-[22px] font-bold mr-6">
                                                        {authorName}{' '}
                                                    </h6>
                                                    <div className="inline-block space-x-2 space-x-reverse text-xs">
                                                        <span className="hidden">
                                                            Posted
                                                        </span>
                                                        <span className="comment_date">
                                                            {new Date(
                                                                date
                                                            ).toLocaleString(
                                                                'en-US',
                                                                {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric'
                                                                }
                                                            )}
                                                        </span>
                                                        <span className="comment_time_label">
                                                            at
                                                        </span>
                                                        <span className="comment_time">
                                                            {new Date(
                                                                date
                                                            ).toLocaleString(
                                                                'en-US',
                                                                {
                                                                    hour: 'numeric',
                                                                    minute: 'numeric',
                                                                    hour12: true
                                                                }
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="break-words whitespace-pre-line">
                                                <div
                                                    className="prose prose-incard"
                                                    dangerouslySetInnerHTML={{
                                                        __html: content
                                                    }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>
                <div className="!mt-[5.8em] pt-[5.8em] border-t border-[#E5D8CE]">
                    <div className="comments_form">
                        <div id="respond" className="comment-respond">
                            <h3 className="text-3xl font-bold mb-[0.9em]">
                                Leave a Comment{' '}
                                <small>
                                    {/* <a
                                        rel="nofollow"
                                        id="cancel-comment-reply-link"
                                        href="/2021/02/how-to-make-your-new-camper-van-feel-like-home/#respond"
                                        style={{ display: 'none' }}
                                        className="inited">
                                        Cancel reply
                                    </a> */}
                                </small>
                            </h3>
                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const authorE =
                                        e.currentTarget.querySelector(
                                            '[name="author"]'
                                        );
                                    const contentE =
                                        e.currentTarget.querySelector(
                                            '[name="content"]'
                                        );
                                    const emailE =
                                        e.currentTarget.querySelector(
                                            '[name="email"]'
                                        );

                                    await handleComment({
                                        id: post.id,
                                        content: contentE.value,
                                        author: authorE.value,
                                        email: emailE.value
                                    });
                                    authorE.value = '';
                                    contentE.value = '';
                                    emailE.value = '';
                                    document
                                        .querySelector('#comments')
                                        ?.scrollIntoView({
                                            block: 'center',
                                            behavior: 'smooth'
                                        });
                                    return false;
                                }}
                                className="flex flex-wrap gap-x-6 gap-y-6">
                                <div className="w-full comments_field comments_author lg:flex-1">
                                    <label
                                        htmlFor="author"
                                        className="absolute opacity-0 pointer-events-none optional">
                                        Name
                                    </label>
                                    <span className="sc_form_field_wrap">
                                        <input
                                            required
                                            id="author"
                                            name="author"
                                            type="text"
                                            placeholder="Your Name"
                                            className="shadow-custom rounded focus:outline-none py-[16px] px-[24px] leading-[24px] block w-full"
                                        />
                                    </span>
                                </div>
                                <div className="w-full comments_field comments_email lg:flex-1">
                                    <label
                                        htmlFor="email"
                                        className="absolute opacity-0 pointer-events-none optional">
                                        E-mail
                                    </label>
                                    <span className="sc_form_field_wrap">
                                        <input
                                            required
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Your E-mail"
                                            className="shadow-custom rounded focus:outline-none py-[16px] px-[24px] leading-[24px] block w-full"
                                        />
                                    </span>
                                </div>
                                <div className="w-full comments_field comments_comment">
                                    <label
                                        htmlFor="comment"
                                        className="absolute opacity-0 pointer-events-none required">
                                        Comment
                                    </label>
                                    <span className="sc_form_field_wrap">
                                        <textarea
                                            required
                                            id="content"
                                            name="content"
                                            placeholder="Your Comment *"
                                            aria-required="true"
                                            rows={5}
                                            className="shadow-custom rounded focus:outline-none py-[16px] px-[24px] leading-[24px] block w-full"
                                            defaultValue={''}
                                        />
                                    </span>
                                </div>
                                <p className="form-submit">
                                    <button
                                        disabled={loading}
                                        name="submit"
                                        type="submit"
                                        className="cursor-pointer text-[17px] leading-[22px] pt-[1em] px-[2.65em] pb-[1.08em] font-heading hover:bg-[#c0b9a8] text-white bg-primary border-[color:#6f96c5] rounded border hover:border-[color:#c0b9a8] font-bold capitalize flex items-center">
                                        <div>Leave a Comment</div>
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
                                </p>
                            </form>{' '}
                        </div>
                        {/* #respond */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comments;
