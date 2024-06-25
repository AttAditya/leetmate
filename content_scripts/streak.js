var streakLoaded = false;
let streakSelector = "#leetcode-navbar > div > div div[data-headlessui-state] span";

function checkStreakElementValidity() {
    let streakElement = document.querySelector(streakSelector);

    if (streakElement == null) {
        return false;
    }

    for (let char of streakElement.innerText) {
        if (!"0123456789".includes(char)) {
            return false;
        }
    }

    return streakElement.innerText != "0";
}

function scrapeStreak() {
    let streakElement = document.querySelector(streakSelector);
    let streak = streakElement.innerText;

    return streak;
}

function startStreakSearching() {
    let searchInterval = setInterval(() => {
        if (checkStreakElementValidity()) {
            clearInterval(searchInterval);

            let streak = scrapeStreak();
            saveData("streak", streak);
            
            streakLoaded = true;
        }
    });
}

function setupStreak() {
    startStreakSearching();
}

