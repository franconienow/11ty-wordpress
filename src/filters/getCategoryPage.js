module.exports = (catId, pages) => {
  for (const page of pages) {
    if (page.id == catId) {
      return page;
    }
  }
};
