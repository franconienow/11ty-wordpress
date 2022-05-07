module.exports = (posts, catList, curId) => {
  const relatedPosts = [];
  for (const curCategory of catList) {
    for (const post of posts) {
      if (post.categories.includes(curCategory) && post.id != curId) {
        if (!relatedPosts.map((rPost) => rPost.id).includes(post.id)) {
          relatedPosts.push(post);
        }
      }
    }
  }

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  if (relatedPosts.length > 0) {
    const shuffled = shuffleArray(Array.from(relatedPosts));
    return shuffled.slice(0, 2);
  }

  return false;

  // TODO: Testar shuffle
};
