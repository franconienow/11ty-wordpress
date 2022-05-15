import PostsLoader from "./posts-loader";

const initPostsLoader = () => {
  const toggler = document.querySelector("[data-load='posts']");
  if (toggler) {
    const wrapper = document.querySelector(".posts-grid");
    const loadSize = parseInt(toggler.dataset.loadSize);
    const postsLoader = new PostsLoader(wrapper, loadSize);
    toggler.addEventListener("click", async () => {
      await postsLoader.appendPosts();
      if (postsLoader.isFullyLoaded) {
        toggler.disabled = true;
        toggler.style.display = "none";
      }
    });
  }
};

export { initPostsLoader };
