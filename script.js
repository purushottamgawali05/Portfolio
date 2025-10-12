const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// PDF download with error handling
function downloadPDFSafe(pdfPath, fileName) {
  try {
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = fileName || "document.pdf";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log("PDF download initiated");
  } catch (error) {
    console.error("Error downloading PDF:", error);
    alert("Failed to download PDF");
  }
}

// Default: Dark Mode Permanently
document.body.classList.add("dark-mode");

// Hide or disable theme toggle button completely
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.style.display = "none"; // 👈 hides the toggle button
  // OR, if you want to keep it visible but inactive:
  // themeToggle.disabled = true;
  // themeToggle.title = "Dark mode is permanently enabled";
}
