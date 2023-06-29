checkURL(window.location.href);

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.url) {
      checkURL(window.location.href)
    }
  });
  

function checkURL(url) {
    console.log("URL: " + url);
    if (url.includes("instagram.com")) {
        disableInstagram(url);
    }
}

// We disable whole reels on Instagram
function disableInstagram(url) {
    redirectURLs(url);
    hideReelsButtons();
}


// Section for blocking reels on Instagram
// ---------------------------------------

function hideReelsButtons() {
    var reelsLogo = document.querySelector('a[href="/reels/"]');
    // We get the 3rd parent node to not affect UI
    if (reelsLogo) {
        var parentDiv = reelsLogo.closest('div:not([class])');
        if (parentDiv) {
            parentDiv.hidden = true;
        }
        console.log(parentDiv);
    }
}

function redirectURLs(url) {
    if (url.includes("/reels/")) {
        window.location.href = "https://www.instagram.com/";
    }
}