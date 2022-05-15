module.exports = (posts, catPages) => {
  const postsArr = [];

  for (const post of posts) {
    const postDate = new Date(post.date);
    postsArr.push({
      images: {
        webp: post.better_featured_image.media_details.sizes.medium_large
          .source_url,
        jpg: post.better_featured_image.media_details.sizes.medium_large
          .source_url,
        width:
          post.better_featured_image.media_details.sizes.medium_large.width,
        height:
          post.better_featured_image.media_details.sizes.medium_large.height,
      },
      title: post.title.rendered,
      date: post.date,
      localeDate: postDate.toLocaleDateString("pt-br"),
      excerpt: post.excerpt.rendered.slice(0, 150) + "...",
      id: post.id,
      categories: post.categories.map((categoryId) => {
        return catPages.find((page) => page.id == categoryId);
      }),
    });
  }
  return JSON.stringify(postsArr);
};
