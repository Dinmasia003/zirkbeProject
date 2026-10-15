/* ========================================
   SHARED LIGHT / DARK THEME
======================================== */

const themeToggle = document.getElementById("themeToggle");
const THEME_KEY = "theme";

/* Apply a theme */
function applyTheme(theme) {
    if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.removeAttribute("data-theme");
    }

    updateThemeLabel();
}

/* Update the toggle's accessibility label */
function updateThemeLabel() {
    if (!themeToggle) return;

    const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
}

/* Load the saved theme when this page opens */
const savedTheme = localStorage.getItem(THEME_KEY);
applyTheme(savedTheme === "dark" ? "dark" : "light");

/* Toggle the theme */
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isDark =
            document.documentElement.getAttribute("data-theme") === "dark";

        const newTheme = isDark ? "light" : "dark";

        localStorage.setItem(THEME_KEY, newTheme);
        applyTheme(newTheme);
    });
}

/* Synchronize theme changes across open tabs */
window.addEventListener("storage", (event) => {
    if (event.key === THEME_KEY) {
        applyTheme(event.newValue === "dark" ? "dark" : "light");
    }
});