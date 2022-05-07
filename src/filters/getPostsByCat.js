module.exports = (posts, catId) => {
  return posts.filter((post) => post.categories.includes(catId));
};
