var currentURL = window.location.href;
if (currentURL.includes("instagram.com")) {
    disableReels();
}

// We disable whole reels on Instagram
function disableReels() {
    redirectURLS();
    hideReelsButton();
}



// Section for blocking reels on Instagram
function hideReelsButton() {
    var reelsLogo = document.querySelector('a[href="/reels/"]');
    // We get the 3rd parent node to not affect UI 
    if (reelsLogo) {
        var parentDiv = reelsLogo.closest('div:not([class])');
        if (parentDiv) {
            parentDiv.style.display = 'none';
        }   
    }
}

function redirectURLS() {
    if (currentURL.includes("/reels/")) {
        window.location.href = "https://www.instagram.com/";
    }
}