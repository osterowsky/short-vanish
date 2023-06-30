// We disable reels on Instagram when user freshly open or reloads instagram page
disableReels(window.location.href);

// Listen for messages from the background script, when url changes
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.url) {
        disableReels(window.location.href);
    }
  });


// We disable reels on Instagram
function disableReels(url) {
    redirectURLs(url);
    hideButtons();
    hideFromFeed();
    // `MutationObserver` is used to detect when the unchanged reels button is added to the DOM, if it wasn't detected before
    startMutationObserver();
}

// Section for Mutation Observer
// ---------------------------------------
var mutationObserver;

function startMutationObserver() {
    var targetNode = document.querySelector('body');
    if (targetNode) {
        mutationObserver = new MutationObserver(function(mutationsList) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    var reelsButton = document.querySelector('a[href="/reels/"]');
                    if (reelsButton && !reelsButton.classList.contains('hidden-reels-button')) {
                        hideButtons();
                        stopMutationObserver(); // Stop the Mutation Observer
                        break;
                    }
                }
            }
        });

        var config = { childList: true, subtree: true };
        mutationObserver.observe(targetNode, config);
    }
}

function stopMutationObserver() {
    mutationObserver.disconnect();
}

// Section for blocking reels on Instagram
// ---------------------------------------

function hideButtons() {
    var reelsButton = document.querySelector('a[href="/reels/"]');
    // We get the 3rd parent node to not affect UI
    if (reelsButton) {
        var parentDiv = reelsButton.closest('div:not([class])');
        if (parentDiv) {
            parentDiv.hidden = true;
            reelsButton.classList.add('hidden-reels-button');
        }
    }
}

function redirectURLs(url) {
    if (url.includes("/reels/")) {
        window.location.href = "https://www.instagram.com/";
    }
}

function hideFromFeed() {

}