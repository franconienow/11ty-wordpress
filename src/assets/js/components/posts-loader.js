export default class PostsLoader {
  constructor(wrapper, loadSize) {
    this.wrapper = wrapper;
    this.loadSize = loadSize;
    this.postListPosition = this.wrapper.childElementCount;
    this.isFullyLoaded = false;
    if (!PostsLoader._instance) {
      PostsLoader._instance = this;
    }
    return PostsLoader._instance;
  }

  async getPosts() {
    const data = await fetch("/posts-list.json");
    const json = await data.json();
    return json;
  }

  renderPostsCategories(categories) {
    let str = "";
    for (const category of categories) {
      str += `<a class="tag tag--secondary" href="${category.url}">${category.title}</a>`;
    }
    return str;
  }

  renderPost(post) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("card");
    wrapper.innerHTML = `
      <div class="card__header">
        <picture>
          <source type="image/webp" srcset="${post.images.webp}">
          <source type="image/jpg" srcset="${post.images.jpg}">
          <img
            class="card__img"
            src="${post.images.jpg}"
            alt="${post.title}"
            width="${post.images.width}"
            height="${post.images.height}"
            loading="lazy"
          >
        </picture>
      </div>
      <div class="card__body">
        <h3 class="card__title">${post.title}</h3>
        <time class="card__date" datetime="${post.date}">${
      post.localeDate
    }</time>
        <div class="card__excerpt">${post.excerpt}</div>
        <div class="card__categories">${this.renderPostsCategories(
          post.categories
        )}</div>
      </div>
      <a href="/posts/${post.id}" class="card__link-overlay"></a>
    `;
    return wrapper;
  }

  updatePostListPosition() {
    this.postListPosition += this.loadSize;
  }

  async appendPosts() {
    const posts = await this.getPosts();
    const slicedPosts = [];
    for (let index = 0; index < posts.length; index++) {
      if (
        index >= this.postListPosition &&
        index < this.postListPosition + this.loadSize
      ) {
        if (index == posts.length - 1) {
          this.isFullyLoaded = true;
        }
        slicedPosts.push(posts[index]);
      }
    }
    const postsHtmlArr = slicedPosts.map((post) => this.renderPost(post));
    postsHtmlArr.forEach((postHtml) => {
      this.wrapper.appendChild(postHtml);
    });
    this.updatePostListPosition();
  }
}
