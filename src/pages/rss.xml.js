import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { profile } from '../data/profile';

export async function GET(context) {
	const posts = await getCollection('blog', ({ data }) => !data.draft);
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		customData: `<language>zh-CN</language><managingEditor>${profile.email} (${profile.author})</managingEditor>`,
		items: posts
			.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
			.map((post) => ({
				...post.data,
				link: `/blog/${post.id}/`,
				categories: post.data.tags,
			})),
	});
}
