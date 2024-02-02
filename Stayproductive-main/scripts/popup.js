var WebsiteUrl; //Stores the URL of the currently active tab
var WebsiteHostName; //Stores the hostname of the currently active tab's URL.
let hoursSaved = 0; // move this line inside the event listener
let timeData = Array.from({ length: 7 }, () => 0); // Initialize timeData for each day
let monday = false;
//Gets the current tab and adds the current tab and changes teh WebsiteHostName
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  WebsiteUrl = tabs[0].url;
  WebsiteHostName = new URL(tabs[0].url).hostname;

  document.getElementById("url").innerText = WebsiteHostName;
});

//Dynamic popup
function ShowError(text) {
  var div = document.createElement("div");
  div.setAttribute("id", "ERRORcontainer");
  div.innerHTML = `
                <div class="ERROR">
                    <p>${text}</p>     
                </div>`;
  document.getElementsByClassName("bottomItem")[0].appendChild(div);

  setTimeout(() => {
    document.getElementById("ERRORcontainer").remove();
  }, 3000);
}

document.getElementById("btn").addEventListener("click", () => {
  if (WebsiteUrl.toLowerCase().includes("chrome://")) {
    ShowError("You cannot block a chrome URL");
  } else {
    chrome.storage.local.get("timeData", (data) => {
      const d = new Date();
      let day = d.getDay();
      console.log(day);
      day = day === 0 ? 6 : day - 1; // Adjust to make Monday the first day

      // Check if there is existing data for the current day
      if (!data.timeData) {
        // If no data at all, initialize it
        data.timeData = Array.from({ length: 7 }, () => 0);
      }
      if (day === 0 && !data.resetDone) {
        data.timeData = Array.from({ length: 7 }, () => 0);
        data.resetDone = true;

        // Update the timeData array and set the resetDone flag in storage
        chrome.storage.local.set({ timeData: data.timeData, resetDone: true });
      }

      hoursSaved += 2;
      data.timeData[day] += hoursSaved;
      // Update the timeData array in storage
      chrome.storage.local.set({ timeData: data.timeData });

      console.log(data.timeData);
      console.log(data.timeData[day]);
      updateChart(data.timeData[day]);

      chrome.storage.local.get("BlockedUrls", (data) => {
        if (data.BlockedUrls === undefined) {
          chrome.storage.local.set({
            BlockedUrls: [{ status: "In_Progress", url: WebsiteHostName }],
          });
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
              from: "popup",
              subject: "startTimer",
            });
          });

          setTimeout(() => {
            var then = new Date();
            then.setHours(24, 0, 0, 0);
            const blockTill = then.getTime();

            chrome.storage.local.set({
              BlockedUrls: [
                {
                  status: "BLOCKED",
                  url: WebsiteHostName,
                  BlockTill: blockTill,
                },
              ],
            });

            // Update the chart after blocking the URL
            updateChart(timeData[day]);
          }, 5000);
        } else {
          if (
            data.BlockedUrls.some(
              (e) => e.url === WebsiteHostName && e.status === "In_Progress"
            )
          ) {
            ShowError("This URL will be completely blocked after some time");
          } else if (
            data.BlockedUrls.some(
              (e) => e.url === WebsiteHostName && e.status === "BLOCKED"
            )
          ) {
            ShowError("This URL is Blocked completely");
          } else {
            chrome.storage.local.set({
              BlockedUrls: [
                ...data.BlockedUrls,
                { status: "In_Progress", url: WebsiteHostName },
              ],
            });

            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
              chrome.tabs.sendMessage(tabs[0].id, {
                from: "popup",
                subject: "startTimer",
              });
            });

            setTimeout(() => {
              chrome.storage.local.get("BlockedUrls", (data) => {
                data.BlockedUrls.forEach((e, index) => {
                  if (e.url === WebsiteHostName && e.status === "In_Progress") {
                    var arr = data.BlockedUrls.splice(index, 1);

                    var then = new Date();
                    then.setHours(24, 0, 0, 0);
                    const blockTill = then.getTime();

                    chrome.storage.local.set({
                      BlockedUrls: [
                        ...arr,
                        {
                          status: "BLOCKED",
                          url: WebsiteHostName,
                          BlockTill: blockTill,
                        },
                      ],
                    });

                    // Update the chart after blocking the URL
                    updateChart(timeData[day]);
                  }
                });
              });
            }, 5000);
          }
        }
      });
    });
  }
});
// Function to update the chart
function updateChart(dayData) {
  chrome.storage.local.get("BlockedUrls", (data) => {
    setTimeout(() => {
      chrome.storage.local.get("timeData", (data) => {
        initChart(dayData);
      });
    }, 5000);
  });
}
