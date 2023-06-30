// Listen for tab URL changes
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // Check if the URL has changed and includes "instagram"
  if (changeInfo.url && changeInfo.url.includes("instagram.com")) {
    // Send a message to the content script
    chrome.tabs.sendMessage(tabId, { url: changeInfo.url });
  }
});