const domain = import.meta.env.WP_DOMAIN
const apiURL = `${domain}/wp-json/wp/v2`

export const getPageInfo = async (slug: string) => {
    const response = await fetch(`${apiURL}/pages?slug=${slug}`)
    if (!response.ok) {
        throw new Error(`Error fetching page info: ${response.statusText}`)
    }
    const [data] = await response.json()
    const { title: { rendered: title }, content: { rendered: content } } = data
    return { title, content }
}

export const getAllPostSlugs = async () => {
    const response = await fetch(`${apiURL}/posts?per_page=100`)
    if (!response.ok) {
        throw new Error(`Error fetching post slugs: ${response.statusText}`)
    }
    const results = await response.json()
    if (!results.length) throw new Error('No posts found')
    const slugs = results.map((post: any) => post.slug)
    console.log(slugs)
    return slugs
}

export const getLatestPosts = async ({ perPage = 10 }: { perPage?: number } = {}) => {
    const response = await fetch(`${apiURL}/posts?per_page=${perPage}&_embed`)
    if (!response.ok) {
        throw new Error(`Error fetching latest posts: ${response.statusText}`)
    }
    const results = await response.json()
    if (!results.length) throw new Error('No posts found')

    const posts = results.map((post: any) => {
        const {
            title: { rendered: title },
            excerpt: { rendered: excerpt },
            content: { rendered: content },
            date,
            slug
        } = post
        const featuredImage = post._embedded['wp:featuredmedia'][0].source_url

        const tags = post._embedded['wp:term']?.[1]?.map((tag: any) => ({
            id: tag.id,
            name: tag.name,
            slug: tag.slug,
            link: tag.link
        })) || []

        const formattedDate = new Intl.DateTimeFormat('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).format(new Date(date))

        return { title, excerpt, content, date: formattedDate, slug, featuredImage, tags }
    })
    return posts
}

export const getPostInfo = async (slug: string) => {
    const response = await fetch(`${apiURL}/posts?slug=${slug}&_embed=1`);
    if (!response.ok) {
        throw new Error(`Error fetching post info: ${response.statusText}`);
    }

    const [data] = await response.json();

    const {
        title: { rendered: title },
        content: { rendered: content },
        date,
        excerpt: { rendered: excerpt },
    } = data;

    const tags = data._embedded?.['wp:term']?.[1]?.map((tag: any) => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
        link: tag.link,
    })) || [];

    const formattedDate = new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }).format(new Date(date));

    return { title, content, date: formattedDate, excerpt, tags };
};

