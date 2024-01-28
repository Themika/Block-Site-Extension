function loadChartJS(callback) {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("node_modules/chart.js/dist/chart.umd.js");
  script.onload = function () {
    callback();
  };
  (document.head || document.documentElement).appendChild(script);
}

function initChart() {
  const canvas = document.getElementById("myChart");

  if (!canvas) {
    console.error("Canvas element with ID 'myChart' not found.");
    return;
  }

  const ctx = canvas.getContext("2d");

  // Initialize your chart here
  const chartData = {
    labels: [
      "Red",
      "Blue",
      "Yellow",
      "Green",
      "Purple",
      "Orange",
      "Hours Saved",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3, 5],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  new Chart(ctx, {
    type: "bar",
    data: chartData,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

if (document.readyState === "complete") {
  loadChartJS(initChart);
} else {
  window.onload = function () {
    loadChartJS(initChart);
  };
}
