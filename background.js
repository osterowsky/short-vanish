// Listen for tab URL changes
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // Check if the URL has changed and includes "instagram"
  if (changeInfo.url) {
      if (changeInfo.url.includes("instagram.com")) {
        // Send a message to the content script
        chrome.tabs.sendMessage(tabId, { message: "instagram" });
      } else if (changeInfo.url.includes("youtube.com")) {
        chrome.tabs.sendMessage(tabId, { message: "youtube" });
      }
  }
});