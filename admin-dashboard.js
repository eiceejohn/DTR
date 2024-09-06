document.addEventListener("DOMContentLoaded", function() {
    const allRecordsBody = document.getElementById("allRecordsBody");
    const users = JSON.parse(localStorage.getItem("users")) || [];

    function renderAllRecords() {
        allRecordsBody.innerHTML = ""; // Clear the table

        users.forEach(user => {
            const records = JSON.parse(localStorage.getItem(`clockRecords_${user.username}`)) || [];

            records.forEach(record => {
                const row = document.createElement("tr");

                const idCell = document.createElement("td");
                idCell.textContent = user.id;
                row.appendChild(idCell);

                const nameCell = document.createElement("td");
                nameCell.textContent = user.name;
                row.appendChild(nameCell);

                const departmentCell = document.createElement("td");
                departmentCell.textContent = user.department;
                row.appendChild(departmentCell);

                const clockInCell = document.createElement("td");
                clockInCell.textContent = record.clockInTime || "N/A";
                row.appendChild(clockInCell);

                const clockOutCell = document.createElement("td");
                clockOutCell.textContent = record.clockOutTime || "N/A";
                row.appendChild(clockOutCell);

                // Add delete button
                const actionsCell = document.createElement("td");
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", function() {
                    deleteRecord(user.username, record);
                });
                actionsCell.appendChild(deleteButton);
                row.appendChild(actionsCell);

                allRecordsBody.appendChild(row);
            });
        });
    }

    function deleteRecord(username, recordToDelete) {
        const records = JSON.parse(localStorage.getItem(`clockRecords_${username}`)) || [];
        const updatedRecords = records.filter(record => 
            record.clockInTime !== recordToDelete.clockInTime || 
            record.clockOutTime !== recordToDelete.clockOutTime
        );
        localStorage.setItem(`clockRecords_${username}`, JSON.stringify(updatedRecords));
        renderAllRecords();
    }

    // Initial rendering of all records
    renderAllRecords();

    // Handle logout
    document.getElementById("logoutButton").addEventListener("click", function() {
        localStorage.removeItem("loggedIn"); // Clear the session
        window.location.href = "index.html"; // Redirect to login
    });
});
