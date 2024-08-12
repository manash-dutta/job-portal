// Async Function to delete a job
async function deleteJob(id) {
  const confirmDeletion = confirm("Are you sure you want to delete this Job?");
  if (confirmDeletion) {
    try {
      const response = await fetch(`/delete-job/${id}`, {
        method: "POST",
      });
      if (response.ok) {
        window.location.href = "/jobs";
      } else {
        console.error("Failed to delete the job");
      }
    } catch (error) {
      console.error("Error occured while deleting the Job:", error);
    }
  }
}

// Toogle Theme
const toggleSwitches = document.querySelectorAll(".toggle-check");

// Function to switch theme
const switchTheme = (theme) => {
  const htmlEl = document.documentElement; // Shortcut to <html>
  const toggleTextElements = document.querySelectorAll(".toggle-text");
  const toggleIconElements = document.querySelectorAll("#toggle-icon");

  htmlEl.setAttribute("data-bs-theme", theme);

  // Update text and icon based on theme
  toggleTextElements.forEach(textEl => 
    textEl.textContent = theme === "dark" ? "Dark Mode" : "Light Mode"
  );

  toggleIconElements.forEach(iconEl => {
    iconEl.classList.replace(
      theme === "dark" ? "fa-sun" : "fa-moon",
      theme === "dark" ? "fa-moon" : "fa-sun"
    );
  });

  // Ensure all toggle switches reflect the current theme
  toggleSwitches.forEach(switchEl => {
    switchEl.checked = theme === "dark";
  });

  // Save theme to localStorage
  localStorage.setItem("theme", theme);
};

// Check the stored theme on page load
document.addEventListener("DOMContentLoaded", () => {
  const storedTheme = localStorage.getItem("theme") || "light";
  switchTheme(storedTheme);
});

// Add event listeners for the toggle switches
toggleSwitches.forEach(toggleSwitch => {
  toggleSwitch.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-bs-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    switchTheme(newTheme);
  });
});

