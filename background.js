chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  chrome.storage.local.get(['enablePlugin', 'instagramPlugin', 'youtubePlugin'], function(result) {
    if (result.enablePlugin === true) {
        // Check if the URL has changed and includes "instagram"
        if (changeInfo.url && changeInfo.url.includes("instagram.com") && result.instagramPlugin === true) {
          chrome.tabs.sendMessage(tabId, { message: "instagram" });
        } else if (changeInfo.url && changeInfo.url.includes("youtube.com") && result.youtubePlugin === true) {
          chrome.tabs.sendMessage(tabId, { message: "youtube" });
        }      
    }
  });
});