const enablePlugin = document.getElementById("enablePlugin");

  enablePlugin.addEventListener("change", function() {
    // Store the checkbox state in the Storage API
    chrome.storage.local.set({ 'enablePlugin':  enablePlugin.checked});
  });

  document.addEventListener("DOMContentLoaded", function() {
    // Get the checkbox state from the Storage API and set the initial checkbox state
    chrome.storage.local.get('enablePlugin', function(result) {
      enablePlugin.checked = result.enablePlugin || false;
    });
  });