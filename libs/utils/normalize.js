import numeral from 'numeral';
import { fixLink, fixSeoImage } from './pageProps';

export const normalizeDate = (dateString) => {
    const date = new Date(dateString);
    const stringDate = date.toLocaleDateString('hi-IN', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
    const [day, month, year] = stringDate.split('/');
    return {
        day,
        month,
        year
    };
};
// export const normalizePost = (post) => {
//     const objectDate = normalizeDate(post.date);
//     const retult = {
//         ...post,
//         url: `/${objectDate.year}/${objectDate.month}/${post.slug}`,
//         link: post.link.replace(process.env.NEXT_PUBLIC_API_URL, ''),
//         objectDate
//     };
//     return retult;
// };
export const normalizePost = (node) => {
    const objectDate = normalizeDate(node.date);
    const { likesCount = 0, viewCount: viewsCount = 0, content } = node;
    const post = {
        ...node,
        postId: node.id,
        id: node.databaseId,
        archiveUrl: `/${objectDate.year}/${objectDate.month}/${node.slug}`,
        link: node.uri.replace(process.env.NEXT_PUBLIC_API_URL, ''),
        objectDate,
        likesCountString: numeral(likesCount).format('0 a').trim(),
        viewsCountString: numeral(viewsCount).format('0 a').trim(),
        content: content ? fixLink(fixSeoImage(content)) : ''
    };
    return post;
};
