var profileLoaded = false;
let profileSelector = "#web-user-menu > div > div.flex > div > a";
let profileMenuSelector = "#navbar_user_avatar > img";

function checkProfile() {
    let profileElement = document.querySelector(profileSelector);

    if (profileElement == null) {
        return false;
    }

    return true;
}

function scrapeProfile() {
    let profileElementSelector = profileSelector;
    let profileElement = document.querySelector(profileElementSelector);

    let href_split = profileElement.href.split("/");
    let profile = href_split[href_split.length - 1];

    return profile;
}

function checkProfileMenu() {
    let profileMenu = document.querySelector(profileMenuSelector);

    if (profileMenu == null) {
        return false;
    }

    return true;
}

function toggleProfileMenu() {
    let profileMenu = document.querySelector(profileMenuSelector);
    profileMenu.click();
}

function startProfileSearching() {
    let searchInterval = setInterval(() => {
        if (checkProfileMenu()) {
            clearInterval(searchInterval);
            toggleProfileMenu();
            
            let searchProfileInterval = setInterval(() => {
                if (checkProfile()) {
                    clearInterval(searchProfileInterval);
                    toggleProfileMenu();

                    let profile = scrapeProfile();
                    saveData("profile", profile);

                    profileLoaded = true;
                }
            });
        }
    });
}

function getProfile() {
    let profileStorage = loadData("profile");
    return profileStorage;
}

function setupProfile() {
    let profile = getProfile();
    if (profile == null) {
        startProfileSearching();
    } else {
        profileLoaded = true;
    }
}

