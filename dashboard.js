document.addEventListener("DOMContentLoaded", function() {
    const loggedInUsername = localStorage.getItem("loggedIn");
    if (!loggedInUsername) {
        window.location.href = "index.html"; // Redirect to login if not logged in
        return;
    }

    const welcomeMessage = document.getElementById("welcomeMessage");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.username === loggedInUsername);

    if (user) {
        welcomeMessage.textContent = `Hello, ${user.name} (${user.department})!`;
    }

    const clockInButton = document.getElementById("clockInButton");
    const clockOutButton = document.getElementById("clockOutButton");

    // Load existing records
    const records = JSON.parse(localStorage.getItem(`clockRecords_${loggedInUsername}`)) || [];

    // Check if there's an ongoing session
    const lastRecord = records.length ? records[records.length - 1] : null;
    if (lastRecord && !lastRecord.clockOutTime) {
        clockInButton.style.display = "none";
        clockOutButton.style.display = "inline-block";
    } else {
        clockInButton.style.display = "inline-block";
        clockOutButton.style.display = "none";
    }

    // Clock In button logic
    clockInButton.addEventListener("click", function() {
        const clockInTime = new Date().toLocaleString();
        records.push({ id: user.id, name: user.name, department: user.department, clockInTime: clockInTime, clockOutTime: null });
        localStorage.setItem(`clockRecords_${loggedInUsername}`, JSON.stringify(records));
        clockInButton.style.display = "none";
        clockOutButton.style.display = "inline-block";
    });

    // Clock Out button logic
    clockOutButton.addEventListener("click", function() {
        const clockOutTime = new Date().toLocaleString();
        if (lastRecord) {
            lastRecord.clockOutTime = clockOutTime;
        }
        localStorage.setItem(`clockRecords_${loggedInUsername}`, JSON.stringify(records));
        clockInButton.style.display = "inline-block";
        clockOutButton.style.display = "none";
    });

    // Redirect to view-records.html on "View Records" tab click
    const tabViewRecords = document.getElementById("tabViewRecords");
    tabViewRecords.addEventListener("click", function() {
        window.location.href = "view-records.html";
    });

    // Handle logout
    document.getElementById("logoutButton").addEventListener("click", function() {
        localStorage.removeItem("loggedIn"); // Clear the session
        window.location.href = "index.html"; // Redirect to login
    });

    // Handle Change Password form
    const changePasswordContainer = document.getElementById("changePasswordContainer");
    const showChangePasswordButton = document.getElementById("showChangePasswordButton");

    showChangePasswordButton.addEventListener("click", function() {
        changePasswordContainer.style.display = "block";
    });

    document.getElementById("changePasswordForm").addEventListener("submit", function(e) {
        e.preventDefault();

        const currentPassword = document.getElementById("currentPassword").value;
        const newPassword = document.getElementById("newPassword").value;
        const confirmNewPassword = document.getElementById("confirmNewPassword").value;

        if (user.password !== currentPassword) {
            alert("Current password is incorrect.");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            alert("New passwords do not match.");
            return;
        }

        // Update password
        user.password = newPassword;
        localStorage.setItem("users", JSON.stringify(users));
        document.getElementById("passwordMessage").textContent = "Password changed successfully!";
    });
    
});

function clockIn() {
    const loggedInUser = localStorage.getItem("loggedIn");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.username === loggedInUser);
    const clockRecords = JSON.parse(localStorage.getItem(`clockRecords_${loggedInUser}`)) || [];

    const newRecord = {
        id: user.id,
        name: user.name,
        department: user.department,
        clockInTime: new Date().toLocaleString(),
        clockOutTime: null
    };

    clockRecords.push(newRecord);
    localStorage.setItem(`clockRecords_${loggedInUser}`, JSON.stringify(clockRecords));

    // Update UI or alert user
}

function clockIn() {
    const loggedInUser = localStorage.getItem("loggedIn");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.username === loggedInUser);
    const clockRecords = JSON.parse(localStorage.getItem(`clockRecords_${loggedInUser}`)) || [];

    const newRecord = {
        id: user.id,
        name: user.name,
        department: user.department,
        clockInTime: new Date().toLocaleString(),
        clockOutTime: null
    };

    clockRecords.push(newRecord);
    localStorage.setItem(`clockRecords_${loggedInUser}`, JSON.stringify(clockRecords));

    // Update UI or alert user
}

function clockOut() {
    const loggedInUser = localStorage.getItem("loggedIn");
    const clockRecords = JSON.parse(localStorage.getItem(`clockRecords_${loggedInUser}`)) || [];

    // Find the last record without a clock-out time
    const lastRecord = clockRecords.reverse().find(record => !record.clockOutTime);

    if (lastRecord) {
        lastRecord.clockOutTime = new Date().toLocaleString();
        localStorage.setItem(`clockRecords_${loggedInUser}`, JSON.stringify(clockRecords.reverse())); // Reverse again to maintain order
    }

    // Update UI or alert user
}


document.addEventListener("DOMContentLoaded", function() {
    const leaveForm = document.getElementById("leaveForm");
    const loggedInUser = localStorage.getItem("loggedIn");

    leaveForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const leaveType = document.getElementById("leaveType").value;
        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;

        const leaveRecord = {
            leaveType,
            startDate,
            endDate
        };

        const leaveRecords = JSON.parse(localStorage.getItem(`leaveRecords_${loggedInUser}`)) || [];
        leaveRecords.push(leaveRecord);
        localStorage.setItem(`leaveRecords_${loggedInUser}`, JSON.stringify(leaveRecords));

        document.getElementById("leaveMessage").textContent = "Leave request submitted successfully!";
        leaveForm.reset();
    });
});

