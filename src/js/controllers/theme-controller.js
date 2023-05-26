// toggle theme
const themeToggler = (id) => {
  const themeToggler = document.querySelector(id);
  themeToggler.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
};

export { themeToggler };
