const initDropdowns = (elTarget = false) => {
  let allDropdowns;
  if (elTarget) {
    allDropdowns = elTarget.querySelectorAll(".dropdown-toggler");
  } else {
    allDropdowns = document.body.querySelectorAll(".dropdown-toggler");
  }
  allDropdowns.forEach((dropdownEl) => {
    makeDropdown(dropdownEl);
  });
};

const makeDropdown = (dropdownEl) => {
  dropdownEl.addEventListener("click", (event) => {
    event.preventDefault();
    const target = dropdownEl.nextSibling;
    if (!target.classList.contains("dropdown-target")) return;
    target.classList.toggle("active");
  });
};

export { initDropdowns, makeDropdown };
