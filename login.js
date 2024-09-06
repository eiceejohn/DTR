// Check if admin account exists, if not, create one
const users = JSON.parse(localStorage.getItem("users")) || [];

// Function to create a default admin account
function createAdminAccount() {
    if (!users.some(user => user.username === "admin")) {
        users.push({
            id: "admin001",
            username: "admin",
            password: "admin123", // Use a strong password in production
            name: "Admin User",
            department: "Administration",
            role: "admin" // Admin role
        });
        localStorage.setItem("users", JSON.stringify(users));
    }
}

// Run the function to ensure the admin account is created
createAdminAccount();

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const users = JSON.parse(localStorage.getItem("users")) || [];

    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem("loggedIn", username);
            if (user.role === "admin") {
                window.location.href = "admin-dashboard.html"; // Redirect admin to admin dashboard
            } else {
                window.location.href = "dashboard.html"; // Redirect regular users to their dashboard
            }
        } else {
            alert("Invalid username or password");
        }
    });
});

