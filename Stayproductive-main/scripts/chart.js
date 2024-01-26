// Check loading
console.log("d3Script is created");

const d3Script = document.createElement("script");
d3Script.src = chrome.runtime.getURL("scripts/d3.v7.min.js");
document.head.appendChild(d3Script);
// Event listener for script load
d3Script.onload = function () {
  console.log("d3Script is loaded");
  // Example: Append an SVG element to the body
  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

  svg
    .append("circle")
    .attr("cx", 250)
    .attr("cy", 250)
    .attr("r", 50)
    .style("fill", "red");
};
