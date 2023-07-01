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

    // We check if we are in the results page or in the feed page to hide correct short sections
    window.location.href.includes("youtube.com/results?") ? hideFromResults() : hideFromFeed();

    // `MutationObserver` is used to detect when the unchanged shorts button is added to the DOM, if it wasn't detected before
    startMutationObserver();

}

// Section for Mutation Observer for Shorts Buttons
// ---------------------------------------
var mutationObserver;

function startMutationObserver() {

    var targetNode = document.querySelector('body');
    if (targetNode) {
        mutationObserver = new MutationObserver(function(mutationsList) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    var shortsButtons = document.querySelectorAll('a[title="Shorts"]');
                    console.log(shortsButtons.length)
                    if (shortsButtons.length > 1) {
                            shortsButtons.forEach(function (button) {
                                hideButton(button);
                            });
                            stopMutationObserver();
                            break;
                    } else if (shortsButtons.length === 1) {
                            hideButton(shortsButtons[0])
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

        // Checks if we are in parts of youtube where there are no buttons
        if (window.location.href.includes("studio.youtube.com")) {
            stopMutationObserver();
        }
    }
}

function stopMutationObserver() {
    mutationObserver.disconnect();
}

// Section for Feed Mutation Observer
// ---------------------------------------

var feedMutationObserver;

function startFeedMutationObserver(target) {

    var targetNode = document.querySelector('body');
    if (targetNode) {
        mutationObserver = new MutationObserver(function(mutationsList) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    var shortsSections = document.querySelectorAll(target+':not(.hidden-shorts-section)');
                    if (shortsSections.length > 0) {
                        shortsSections.forEach(function (section) {
                            hideShortsSection(section);
                        });
                    }
                }        
            }
        });

        var config = { childList: true, subtree: true };
        mutationObserver.observe(targetNode, config);
}}

function stopFeedMutationObserver() {
    mutationObserver.disconnect();
}

// Section for blocking shorts on Youtube
// ---------------------------------------

function hideButtons() {
    var shortsButtons = document.querySelectorAll('a[title="Shorts"]');
    // We get the 3rd parent node to not affect UI    
    if (shortsButtons.length > 0) {
        shortsButtons.forEach(function (button) {
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

function hideFromFeed() {
    var target = 'ytd-rich-shelf-renderer[is-shorts=""]';
    var shortsSections = document.querySelectorAll(target);
    if (shortsSections.length > 0) {
        shortsSections.forEach(function (section) {
            hideShortsSection(section);
        });
    }
    startFeedMutationObserver(target);
}

function hideFromResults() {
    var target = 'ytd-reel-shelf-renderer';
    var shortsSections = document.querySelectorAll(target);
    if (shortsSections.length > 0) {
        shortsSections.forEach(function (section) {
           hideShortsSection(section);
        });
    }
    startFeedMutationObserver(target);
}

function hideShortsSection(section) {
    section.hidden = true;
    section.classList.add('hidden-shorts-section');
}