// We disable shorts on Youtube when user freshly open or reloads youtube page
chrome.storage.local.get('enablePlugin', function(result) {
    if (result.enablePlugin === true) {
        disableShorts(window.location.href);    
    }
});
  
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
    window.location.href.includes("youtube.com/results?") || window.location.href.includes("youtube.com/watch?") ? hideSections('ytd-reel-shelf-renderer') : hideSections('ytd-rich-shelf-renderer[is-shorts=""]');
}

// Section for Mutation Observer
// ---------------------------------------
var mutationObserver;

function startMutationObserver(target) {
    var targetNode = document.querySelector('body');
    if (targetNode) {
        mutationObserver = new MutationObserver(function(mutationsList) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    var shortsButtons = document.querySelectorAll('a[title="Shorts"]:not(.hidden-shorts-button)');
                    if (shortsButtons.length > 0) {
                            shortsButtons.forEach(function (button) {
                                hideButton(button);
                        });
                    }

                    var shortsSections = document.querySelectorAll(target+':not(.hidden-shorts-section)');
                    if (shortsSections.length > 0) {
                        shortsSections.forEach(function (section) {
                            hideSection(section);
                        });
                    }
                }
            }
        });

        var config = { childList: true, subtree: true };
        mutationObserver.observe(targetNode, config);

        // Checks if we are in parts of youtube where there is no need to observe for shorts buttons
        if (window.location.href.includes("studio.youtube.com")) {
            stopMutationObserver();
        }
    }
}

function stopMutationObserver() {
    mutationObserver.disconnect();
}

// Section for blocking shorts on Youtube
// ---------------------------------------
 
function redirectURLs(url) {
    if (url.includes("/shorts/")) {
        window.location.href = "https://www.youtube.com/";
    }
}

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

function hideSections(target) {
    var shortsSections = document.querySelectorAll(target);
    if (shortsSections.length > 0) {
        shortsSections.forEach(function (section) {
            hideSection(section);
        });
    }
    startMutationObserver(target);
}

function hideSection(section) {
    section.hidden = true;
    section.classList.add('hidden-shorts-section');
}