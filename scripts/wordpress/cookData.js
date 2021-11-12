require('dotenv').config();
// var raw = require('./raw.json');
var defaultData = require('./app.json');
// console.log({ raw });
const normalizeDate = (dateString) => {
    const date = new Date(dateString);
    const stringDate = date.toLocaleDateString('hi-IN', {
        year: 'numeric',
        month: '2-digit',
        day: 'numeric'
    });
    const [day, month, year] = stringDate.split('/');
    return {
        day,
        month,
        year
    };
};
const normalize = (raw) => {
    // console.log({ raw });
    const {
        users: usersRaw,
        posts: postsRaw,
        categories: categoriesraw,
        comments,
        ...rest
    } = raw;
    const allPaths = {
        category: [],
        author: [],
        ['[...pages]']: []
    };
    const postEntities = {};
    const authorEntities = {};
    const cateEntities = {};
    const postsByYear = {};
    const postsByCategory = {};
    const postsByMonth = {};
    const postsByAuthor = {};
    const posts = postsRaw.edges.map(({ node }) => {
        const objectDate = normalizeDate(node.date);
        const post = {
            ...node,
            id: node.databaseId,
            archiveUrl: `/${objectDate.year}/${objectDate.month}/${node.slug}`,
            link: node.uri.replace(process.env.NEXT_PUBLIC_API_URL, ''),
            objectDate
        };
        return post;
    });

    const users = usersRaw.nodes;
    users.forEach((user) => {
        authorEntities[user.slug] = user;
    });

    const categories = raw.categories.nodes || [];
    categories.forEach((cate) => {
        cate.link = cate.link.replace(process.env.NEXT_PUBLIC_API_URL, '');
        cateEntities[cate.id] = cate;
        const { id, slug } = cate;
        const postsByCate = posts.filter((item) =>
            item.categories.edges.find(({ node: item }) => item.id === id)
        );
        const totalPages = Math.ceil(postsByCate.length / 10);
        const postsByPage = postsByCate.reduce((result, post, index) => {
            const page = Math.ceil(index / 10);
            result[page] = result[page] || [];
            result[page].push(post.id);
            return result;
        }, {});
        const paths = new Array(totalPages).fill(true).map((_, i) => {
            const page = i + 1;
            if (i === 0) {
                return {
                    currentPage: page,
                    path: `/${slug}`,
                    params: { slugs: [slug] },
                    posts: postsByPage[1],
                    totalPages
                };
            }
            return {
                currentPage: page,
                path: `/${slug}/page/${page}`,
                params: { slugs: [slug, 'page', String(page)] },
                posts: postsByPage[page],
                totalPages
            };
        });
        postsByCategory[slug] = posts.map((post) => post.id);
        allPaths.category = [...allPaths.category, ...paths];
    });

    posts.forEach((post) => {
        postEntities[post.id] = post;

        let yearKey = post.objectDate.year;
        postsByYear[yearKey] = postsByYear[yearKey] || [];
        postsByYear[yearKey].push(post.id);

        let monthKey = `${post.objectDate.year}/${post.objectDate.month}`;
        postsByMonth[monthKey] = postsByMonth[monthKey] || [];
        postsByMonth[monthKey].push(post.id);

        let authorKey = post.author.node.slug;
        postsByAuthor[authorKey] = postsByAuthor[authorKey] || [];
        postsByAuthor[authorKey].push(post.id);

        allPaths['[...pages]'].push({
            path: post.link,
            type: 'POST',
            params: { id: post.id, slug: post.slug }
        });
    });

    Object.keys(postsByYear).forEach((key) => {
        const posts = postsByYear[key];
        const path = `/${key}/`;
        allPaths['[...pages]'].push({
            path: path,
            type: 'YEAR',
            params: { year: key },
            posts
        });
    });
    Object.keys(postsByMonth).forEach((key) => {
        const [year, month] = key.split('/');
        const posts = postsByMonth[key];
        const path = `/${key}/`;
        allPaths['[...pages]'].push({
            path: path,
            type: 'MONTH',
            params: { year, month },
            posts
        });
    });
    const archives = Object.keys(postsByMonth).map((key) => {
        const [year, month] = key.split('/');
        return {
            year,
            month,
            url: key,
            dateString: new Date(year, month - 1).toLocaleDateString(
                undefined,
                { year: 'numeric', month: 'long' }
            )
        };
    });

    Object.keys(authorEntities).forEach((slug) => {
        const posts = postsByAuthor[slug];
        if (!posts) return;
        const totalPages = Math.ceil(posts.length / 10);
        const paths = new Array(totalPages).fill(true).map((_, i) => {
            const page = i + 1;
            if (i === 0) {
                return {
                    currentPage: page,
                    path: `/${slug}`,
                    params: { slugs: [slug] },
                    posts: postsByAuthor[slug].filter((key, index) => {
                        return Math.ceil(index / 10) === page;
                    }),
                    totalPages
                };
            }
            return {
                currentPage: page,
                path: `/${slug}/page/${page}`,
                params: { slugs: [slug, 'page', String(page)] },
                posts: postsByAuthor[slug].filter((key, index) => {
                    return Math.ceil(index / 10) === page;
                }),
                totalPages
            };
        });
        allPaths.author = [...allPaths.author, ...paths];
    });
    const recentPosts = posts.slice(0, 5);
    return {
        ...defaultData,
        mainMenu: rest.menus.nodes[0].menuItems.edges,
        allPaths,
        recentPosts,
        recentComments: comments.nodes,
        categories: categoriesraw.nodes,
        postEntities,
        cateEntities,
        postsByYear,
        authorEntities,
        postsByAuthor,
        postsByMonth,
        archives,
        postsByCategory,
        app: {
            mainMenu: rest.menus.nodes[0].menuItems.edges,
            generalSettings: rest.generalSettings
        }
    };
};
module.exports = normalize;
