import Search from "./search";

const initSearch = () => {
  const search = document.querySelector(".search");
  if (search) {
    new Search(search);
  }
};

export { initSearch };
