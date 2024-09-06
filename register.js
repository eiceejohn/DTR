document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    const id = document.getElementById("registerID").value;
    const name = document.getElementById("registerName").value;
    const department = document.getElementById("registerDepartment").value;
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    // Basic validation
    if (!id || !name || !department || !username || !password) {
        document.getElementById("registerError").textContent = "Please fill in all fields.";
        document.getElementById("registerError").style.display = "block";
        return;
    }

    // Retrieve existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the username already exists
    if (users.some(user => user.username === username)) {
        document.getElementById("registerError").textContent = "Username already exists.";
        document.getElementById("registerError").style.display = "block";
        return;
    }

    // Save the new user
    users.push({ id, name, department, username, password });
    localStorage.setItem("users", JSON.stringify(users));

    // Redirect to login page
    window.location.href = "index.html";
});
