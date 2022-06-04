export default class Search {
  constructor(el) {
    this.el = el;
    this.input = el.querySelector(".search__input");
    this.inputClose = el.querySelector(".search__close-icon");
    this.results = this.createResults();
    this.el.appendChild(this.results);
    this.addListeners();
  }

  addListeners() {
    this.el.addEventListener("click", () => {
      this.revealInput();
    });
    this.inputClose.addEventListener("click", (event) => {
      event.stopPropagation();
      this.el.classList.remove("active");
    });
    this.input.addEventListener("input", async () => {
      const results = await this.search(this.input.value);
      this.renderResults(results);
    });
  }

  revealInput() {
    this.el.classList.add("active");
  }

  unveilInput() {
    this.el.classList.remove("active");
  }

  createResults() {
    const node = document.createElement("div");
    node.classList.add("search__results");
    return node;
  }

  renderResults(resultsArr) {
    this.results.innerHTML = "";
    if (!resultsArr || resultsArr.length == 0) {
      this.results.classList.remove("active");
      return;
    }
    for (const result of resultsArr) {
      const node = document.createElement("a");
      node.href = "/posts/" + result.id;
      node.classList.add("search__result");
      node.innerHTML = result.title;
      this.results.appendChild(node);
    }
    this.results.classList.add("active");
  }

  async search(str) {
    if (!str) return;
    const data = await fetch("/posts-list.json");
    const json = await data.json();
    const results = [];
    for (const post of json) {
      if (post.title.toLowerCase().indexOf(str.toLowerCase()) != -1) {
        results.push({
          title: post.title,
          id: post.id,
        });
      }
    }
    return results;
  }
}
