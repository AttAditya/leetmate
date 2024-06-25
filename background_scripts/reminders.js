function remindStreak() {
    let options = {
        title: "LeetCode Daily Streak Reminder",
        message: "Don't forget to solve today's daily problem!",
        type: "basic",
        iconUrl: "/images/LeetMate.png",
        buttons: [{title: "Hello World"}]
    };

    chrome.notifications.create(options);
}

chrome.action.setBadgeText({text: ""});
// setTimeout(() => {
//     chrome.action.setBadgeText({text: "!!!"});
//     remindStreak();
// }, 1000);