import { initDropdowns } from "./dropdown";

const initNavbar = () => {
  const navbar = document.body.querySelector(".navbar");
  const navList = navbar.querySelector("ul.navbar__nav");
  const offcanvas = makeOffcanvasMenu(navList.cloneNode(true));
  document.body.appendChild(offcanvas);

  const offcanvasToggler = navbar.querySelector(".navbar__nav-toggler");
  offcanvasToggler.addEventListener("click", () => {
    offcanvas.classList.toggle("active");
  });
};

const makeOffcanvasMenu = (content) => {
  const el = document.createElement("div");
  el.classList.add("navbar__offcanvas");
  const header = makeOffcavasHeader(el);
  el.appendChild(content);
  el.appendChild(header);
  initDropdowns(el);
  return el;
};

const makeOffcavasHeader = (el) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("navbar__offcanvas-header");
  const button = document.createElement("button");
  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
    </svg>
  `
  button.classList.add("navbar__offcanvas-closebutton");
  button.addEventListener("click", () => {
    el.classList.toggle("active");
  });
  wrapper.appendChild(button);
  return wrapper;
};

export { initNavbar };
