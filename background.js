chrome.storage.local.get(['enablePlugin', 'instagramPlugin', 'youtubePlugin'], function(result) {
  if (result.enablePlugin === true) {
    // Send a message to the chrome.tabs API to disable the plugin on the current tab if it meets the conditions
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
      // Check if the URL has changed and includes "instagram"
      if (changeInfo.url && changeInfo.url.includes("instagram.com") && result.instagramPlugin === true) {
        chrome.tabs.sendMessage(tabId, { message: "instagram" });
      } else if (changeInfo.url && changeInfo.url.includes("youtube.com") && result.youtubePlugin === true) {
        chrome.tabs.sendMessage(tabId, { message: "youtube" });
      }
    });
  }
});

