const enablePlugin = document.getElementById("enablePlugin");
const instagramPlugin = document.getElementById("enableInstagram");
const youtubePlugin = document.getElementById("enableYoutube");

  enablePlugin.addEventListener("change", function() {
    // Store the checkbox state in the Storage API
    const isChecked = enablePlugin.checked;
    instagramPlugin.checked = isChecked;
    youtubePlugin.checked = isChecked;
  
    // Store the checkbox states in the Storage API
    chrome.storage.local.set({
      'enablePlugin': isChecked,
      'instagramPlugin': isChecked,
      'youtubePlugin': isChecked
    });  
});

  instagramPlugin.addEventListener("change", function() {
    // Store the checkbox state of instagram in the Storage API
    const isChecked = instagramPlugin.checked;
    chrome.storage.local.set({
      'instagramPlugin': isChecked
    });
  });

  youtubePlugin.addEventListener("change", function() {
    // Store the checkbox state of youtube in the Storage API
    const isChecked = youtubePlugin.checked;
    chrome.storage.local.set({
      'youtubePlugin': isChecked
    });
  });

  document.addEventListener("DOMContentLoaded", function() {
    // Get the checkbox state from the Storage API and set the initial checkbox state
    chrome.storage.local.get(['enablePlugin', 'instagramPlugin', 'youtubePlugin'], function(result) {
      enablePlugin.checked = result.enablePlugin || false;
      instagramPlugin.checked = result.instagramPlugin || false;
      youtubePlugin.checked = result.youtubePlugin || false;
    });
  });