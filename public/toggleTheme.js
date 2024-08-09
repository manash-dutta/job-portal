// Toogle Theme
const toggleSwitches = document.querySelectorAll(".toggle-check");

toggleSwitches.forEach((toggleSwitch) => {
  toggleSwitch.addEventListener("click", () => {
    const htmlEl = document.querySelector("html");
    const currentTheme = htmlEl.getAttribute("data-bs-theme");
    const toggleTextElements = document.querySelectorAll(".toggle-text");
    const toggleIconElements = document.querySelectorAll("#toggle-icon");

    // Toggle the theme
    if (currentTheme === "light") {
      htmlEl.setAttribute("data-bs-theme", "dark");
      toggleTextElements.forEach((toggleText) => {
        toggleText.textContent = "Dark Mode";
      });
      toggleIconElements.forEach((toggleIcon) => {
        toggleIcon.classList.replace("fa-sun", "fa-moon");
      });
    } else {
      htmlEl.setAttribute("data-bs-theme", "light");
      toggleTextElements.forEach((toggleText) => {
        toggleText.textContent = "Light Mode";
      });
      toggleIconElements.forEach((toggleIcon) => {
        toggleIcon.classList.replace("fa-moon", "fa-sun");
      });
    }

    // Ensuring all toggle switches reflect the current theme
    toggleSwitches.forEach((switchEl) => {
      switchEl.checked = currentTheme === "light";
    });
  });
});
