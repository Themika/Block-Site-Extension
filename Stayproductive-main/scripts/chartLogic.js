function loadChartJS(callback) {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("node_modules/chart.js/dist/chart.umd.js");
  script.onload = function () {
    callback();
  };
  (document.head || document.documentElement).appendChild(script);
}

function initChart(dayData) {
  const canvas = document.getElementById("myChart");

  if (!canvas) {
    console.error("Canvas element with ID 'myChart' not found.");
    return;
  }

  const ctx = canvas.getContext("2d");

  // Initialize your chart here
  function chartData(timeData) {
    return {
      labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      datasets: [
        {
          label: "# of hours saved per day",
          data: timeData,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          tension: 0.55,
        },
      ],
    };
  }

  chrome.storage.local.get("timeData", (data) => {
    new Chart(ctx, {
      type: "line",
      data: chartData(data.timeData),
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  });
}

if (document.readyState === "complete") {
  loadChartJS(initChart);
} else {
  window.onload = function () {
    loadChartJS(initChart);
  };
}
