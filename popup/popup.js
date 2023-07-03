const enablePlugin = document.getElementById("enablePlugin");

  enablePlugin.addEventListener("change", function() {
    // Store the checkbox state in the Storage API
    localStorage.setItem("enablePlugin", enablePlugin.checked);
  });

  document.addEventListener("DOMContentLoaded", function() {
    // Get the checkbox state from the Storage API and set the initial checkbox state
    const enablePluginState = localStorage.getItem("enablePlugin");
    enablePlugin.checked = enablePluginState === "true" || false;
  });