// Init theme
// check preferred scheme on users device
const initTheme = () => {
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme == "dark") {
    document.body.classList.toggle("dark");
  } else if (currentTheme == "light") {
    document.body.classList.toggle("light");
  } else if (prefersDarkScheme.matches) {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.toggle("light");
    localStorage.setItem("theme", "light");
  }
};

// toggle theme
const themeToggler = () => {
  const themeToggler = document.querySelector("#themeToggler");
  themeToggler.addEventListener("click", () => {
    const currentTheme = document.body.classList.contains("dark")
      ? "dark"
      : "light";
    if (currentTheme === "dark") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  });
};

export { themeToggler, initTheme };
