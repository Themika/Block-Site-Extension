let c1 = document.getElementById("navBar-ExtensionNameColor");
let c2 = document.getElementById("bodyColor");
let c3 = document.getElementById("bannerColor");
let c4 = document.getElementById("hoverColor");
let c5 = document.getElementById("textColor");
let resetButton = document.getElementById("resetButton");

const bodyStyle = getComputedStyle(document.body);

// Load colors from storage and apply them to the elements
chrome.storage.sync.get(["c1", "c2", "c3", "c4", "c5"], (result) => {
  document.body.style.setProperty("#f0f0f0" || "--c1", result.c1);
  document.body.style.setProperty("#ffffff" || "--c2", result.c2);
  document.body.style.setProperty("#3498db" || "--c3", result.c3);
  document.body.style.setProperty("#2980b9" || "--c4", result.c4);
  document.body.style.setProperty("#ffffff" || "--c5", result.c5);
});

c1.addEventListener("input", () => {
  let newColor = c1.value.trim();
  document.body.style.setProperty("--c1", newColor);
  chrome.storage.sync.set({ c1: newColor });
});

c2.addEventListener("input", () => {
  let newColor = c2.value.trim();
  document.body.style.setProperty("--c2", newColor);
  chrome.storage.sync.set({ c2: newColor });
});

c3.addEventListener("input", () => {
  let newColor = c3.value.trim();
  document.body.style.setProperty("--c3", newColor);
  chrome.storage.sync.set({ c3: newColor });
});

c4.addEventListener("input", () => {
  let newColor = c4.value.trim();
  document.body.style.setProperty("--c4", newColor);
  chrome.storage.sync.set({ c4: newColor });
});

c5.addEventListener("input", () => {
  let newColor = c5.value.trim();
  document.body.style.setProperty("--c5", newColor);
  chrome.storage.sync.set({ c5: newColor });
});

resetButton.addEventListener("click", () => {
  let defaultC1 = "#f0f0f0";
  let defaultC2 = "#ffffff";
  let defaultC3 = "#3498db";
  let defaultC4 = "#2980b9";
  let defaultC5 = "#ffffff";

  // Reset the colors in storage and update the UI
  chrome.storage.sync.set({
    c1: defaultC1,
    c2: defaultC2,
    c3: defaultC3,
    c4: defaultC4,
    c5: defaultC5,
  });

  // Update the UI immediately after resetting the colors
  c1.value = defaultC1;
  c2.value = defaultC2;
  c3.value = defaultC3;
  c4.value = defaultC4;
  c5.value = defaultC5;

  // Also update the CSS variables directly in the current document
  document.body.style.setProperty("--c1", defaultC1);
  document.body.style.setProperty("--c2", defaultC2);
  document.body.style.setProperty("--c3", defaultC3);
  document.body.style.setProperty("--c4", defaultC4);
  document.body.style.setProperty("--c5", defaultC5);
});
