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
export const normalizePost = (post) => {
    const objectDate = normalizeDate(post.date);
    const retult = {
        ...post,
        url: `/${objectDate.year}/${objectDate.month}/${post.slug}`,
        link: post.link.replace(process.env.NEXT_PUBLIC_API_URL, ''),
        objectDate
    };
    return retult;
};
