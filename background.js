// Listen for tab URL changes
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // Check if the URL has changed
    if (changeInfo.url) {
      // Send a message to the content script
      chrome.tabs.sendMessage(tabId, { url: changeInfo.url });
    }
  });