const sites = [
  { name: "Google", url: "https://google.com", category: "Productivity" },
  { name: "YouTube", url: "https://youtube.com", category: "Learning" },
  { name: "ChatGPT", url: "https://chat.openai.com", category: "Productivity" },
  { name: "GitHub", url: "https://github.com", category: "Coding" },
  { name: "GeeksforGeeks", url: "https://geeksforgeeks.org", category: "Coding" },
  { name: "LeetCode", url: "https://leetcode.com", category: "Coding" },
  { name: "Codeforces", url: "https://codeforces.com", category: "Coding" },
  { name: "LinkedIn", url: "https://linkedin.com", category: "Productivity" },
  { name: "NPTEL", url: "https://nptel.ac.in", category: "Learning" },
  { name: "Internshala", url: "https://internshala.com", category: "Internships" }
];

const siteList = document.getElementById("siteList");
const search = document.getElementById("search");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let focusMode = false;

// Render websites
function renderSites(filter = "All") {
  siteList.innerHTML = "";

  const searchText = search.value.toLowerCase();

  sites.forEach(site => {
    if (filter !== "All" && site.category !== filter) return;
    if (!site.name.toLowerCase().includes(searchText)) return;

    const favClass = favorites.includes(site.name) ? "❤️" : "🤍";

    siteList.innerHTML += `
      <a class="site" href="${site.url}" target="_blank">
        <span>${site.name}</span>
        <span class="fav" onclick="toggleFav('${site.name}')">${favClass}</span>
      </a>
    `;
  });
}

// Favorite toggle
function toggleFav(name) {
  if (favorites.includes(name)) {
    favorites = favorites.filter(f => f !== name);
  } else {
    favorites.push(name);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderSites();
}

// Theme toggle
const themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Search filter
search.addEventListener("keyup", () => renderSites());

// Buttons
document.getElementById("allBtn").addEventListener("click", () => renderSites("All"));
document.getElementById("codingBtn").addEventListener("click", () => renderSites("Coding"));
document.getElementById("learningBtn").addEventListener("click", () => renderSites("Learning"));
document.getElementById("internBtn").addEventListener("click", () => renderSites("Internships"));

document.getElementById("focusBtn").addEventListener("click", () => {
  focusMode = !focusMode;
  if (focusMode) {
    alert("Focus Mode Enabled: Only Learning sites will show");
    renderSites("Learning");
  } else {
    alert("Focus Mode Disabled");
    renderSites("All");
  }
});

// Initial render
renderSites();
