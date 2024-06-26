var sendIntervals = [];

async function sendStreakData() {
    let profile = getProfile();
    let server_domain = `https://leetclub-1-o4163817.deta.app`;

    profile = profile.toLowerCase();

    let create_profile_url = `/api/users/${profile}`;
    let streak_url = `/api/users/${profile}/streak`;
    let refresh_url = `/api/users/${profile}/refresh`;

    await fetch(`${server_domain}${create_profile_url}`).catch((err) => {
        console.log("Error creating data", err);
    });

    await fetch(`${server_domain}${streak_url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            streak: loadData("streak")
        })
    }).catch((err) => {
        console.log("Error sending data", err);
    });

    await fetch(`${server_domain}${refresh_url}`).catch((err) => {
        console.log("Error refreshing data", err);
    });
}

function waitAndSendStreak() {
    let interval = setInterval(async () => {
        let profile = loadData("profile");
        let streak = loadData("streak");

        if (profile && streak) {
            await sendStreakData();
            
            for (let i = 0; i < sendIntervals.length; i++) {
                clearInterval(sendIntervals[i]);
            }

            delete sendIntervals["sendStreak"];

            console.log("Sending data...", profile, streak);
            return;
        }
    }, 1000);
    
    sendIntervals.push(interval);
}

function send() {
    let last_sent = loadData("last_sent");

    if (!last_sent) {
        last_sent = new Date(0);
    } else {
        last_sent = new Date(last_sent);
    }

    let now = new Date();
    let time_diff = now - last_sent;

    let time_diff_minutes = time_diff / (1000 * 60);

    if (time_diff_minutes >= 4) {
        waitAndSendStreak();
        saveData("last_sent", now);
    }
}

