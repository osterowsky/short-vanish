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
    redirectURLs(url);
    hideReelsButtons();
    startMutationObserver();
}

// Mutation Observer function
var mutationObserver;

function startMutationObserver() {
    var targetNode = document.querySelector('body');
    if (targetNode) {
        mutationObserver = new MutationObserver(function(mutationsList) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    var reelsLogo = document.querySelector('a[href="/reels/"]');
                    if (reelsLogo && !reelsLogo.classList.contains('hidden-reels-logo')) {
                        hideReelsButtons();
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

function hideReelsButtons() {
    var reelsLogo = document.querySelector('a[href="/reels/"]');
    // We get the 3rd parent node to not affect UI
    if (reelsLogo) {
        var parentDiv = reelsLogo.closest('div:not([class])');
        if (parentDiv) {
            parentDiv.hidden = true;
            reelsLogo.classList.add('hidden-reels-logo');
        }
    }
}

function redirectURLs(url) {
    if (url.includes("/reels/")) {
        window.location.href = "https://www.instagram.com/";
    }
}