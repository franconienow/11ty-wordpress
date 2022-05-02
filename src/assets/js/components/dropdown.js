const initDropdowns = (elTarget = false) => {
  let allDropdowns;
  if (elTarget) {
    allDropdowns = elTarget.querySelectorAll(".dropdown__toggler");
  } else {
    allDropdowns = document.body.querySelectorAll(".dropdown__toggler");
  }
  allDropdowns.forEach((dropdownEl) => {
    makeDropdown(dropdownEl);
  });
};

const makeDropdown = (dropdownEl) => {
  dropdownEl.addEventListener("click", (event) => {
    event.preventDefault();
    const target = dropdownEl.nextSibling;
    if (!target.classList.contains("dropdown__target")) return;
    target.classList.toggle("active");
    toggleAriaAtt(dropdownEl);
  });
};

const toggleAriaAtt = (el) => {
  const value = el.getAttribute("aria-expanded");
  console.log(value);
  if (value == "false") {
    el.setAttribute("aria-expanded", "true");
  } else {
    el.setAttribute("aria-expanded", "false");
  }
};

export { initDropdowns, makeDropdown };
