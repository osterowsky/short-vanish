// We disable reels on Instagram when user freshly open or reloads instagram page
disableInstagram(window.location.href);

// Listen for messages from the background script, when url changes slightly
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.url) {
        disableInstagram(window.location.href);
    }
  });


// We disable whole reels on Instagram
function disableInstagram(url) {
    console.log("URL: ", url)
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