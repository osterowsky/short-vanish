// We disable shorts on Youtube when user freshly open or reloads youtube page
disableShorts(window.location.href);

// Listen for messages from the background script, when url changes
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.message === 'youtube') {
        disableShorts(window.location.href);
    }
  });


// We disable shorts on Youtube
function disableShorts(url) {
    redirectURLs(url);
    hideButtons();
    // `MutationObserver` is used to detect when the unchanged shorts button is added to the DOM, if it wasn't detected before
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
                    var shortsButton = document.querySelectorAll('a[title="Shorts"]');
                    console.log(shortsButton.length)
                    if (shortsButton.length > 1) {
                            shortsButton.forEach(function (button) {
                                hideButton(button);
                            });
                            stopMutationObserver();
                            break;
                    } else if (shortsButton.length === 1) {
                            hideButton(shortsButton[0])
                            if (window.location.href.includes("youtube.com/watch?")) {
                                stopMutationObserver();
                                break;
                            }
                    }
                }
            }
        });

        var config = { childList: true, subtree: true };
        mutationObserver.observe(targetNode, config);
    }
}

function stopMutationObserver() {
    console.log("disconnecting");
    mutationObserver.disconnect();
}

// Section for blocking shorts on Youtube
// ---------------------------------------

function hideButtons() {
    var shortsButton = document.querySelectorAll('a[title="Shorts"]');
    // We get the 3rd parent node to not affect UI    
    if (shortsButton.length > 0) {
        shortsButton.forEach(function (button) {
           hideButton(button);
        });
    }
    
}

function hideButton(button) {
    button.hidden = true;
    button.classList.add('hidden-shorts-button');
}
 
function redirectURLs(url) {
    if (url.includes("/shorts/")) {
        window.location.href = "https://www.youtube.com/";
    }
}