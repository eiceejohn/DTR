document.addEventListener("DOMContentLoaded", function() {
    const clockRecordsBody = document.getElementById("clockRecordsBody");
    const leaveRecordsBody = document.getElementById("leaveRecordsBody");
    const loggedInUser = localStorage.getItem("loggedIn");
    const users = JSON.parse(localStorage.getItem("users")) || [];

    function renderRecords() {
        // Clear previous data
        clockRecordsBody.innerHTML = "";
        leaveRecordsBody.innerHTML = "";

        users.forEach(user => {
            const clockRecords = JSON.parse(localStorage.getItem(`clockRecords_${user.username}`)) || [];
            const leaveRecords = JSON.parse(localStorage.getItem(`leaveRecords_${user.username}`)) || [];

            clockRecords.forEach((record, index) => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.department}</td>
                    <td>${record.clockInTime || "N/A"}</td>
                    <td>${record.clockOutTime || "N/A"}</td>
                    <td><button class="deleteClockRecordButton" data-index="${index}">Delete</button></td>
                `;

                clockRecordsBody.appendChild(row);
            });

            leaveRecords.forEach((record, index) => {
                console.log('Leave Record:', record); // Debugging log to check the record
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.department}</td>
                    <td>${record.leaveType}</td>
                    <td>${record.startDate}</td>
                    <td>${record.endDate}</td>
                    <td>${record.numberOfDays || "N/A"}</td> <!-- Ensure numberOfDays is correctly shown -->
                    <td><button class="deleteLeaveRecordButton" data-index="${index}">Delete</button></td>
                `;

                leaveRecordsBody.appendChild(row);
            });
        });

        // Attach event listeners to delete buttons
        document.querySelectorAll(".deleteClockRecordButton").forEach(button => {
            button.addEventListener("click", function() {
                const index = this.getAttribute("data-index");
                deleteClockRecord(index);
            });
        });

        document.querySelectorAll(".deleteLeaveRecordButton").forEach(button => {
            button.addEventListener("click", function() {
                const index = this.getAttribute("data-index");
                deleteLeaveRecord(index);
            });
        });
    }

    function deleteClockRecord(index) {
        users.forEach(user => {
            const clockRecords = JSON.parse(localStorage.getItem(`clockRecords_${user.username}`)) || [];
            if (index >= 0 && index < clockRecords.length) {
                clockRecords.splice(index, 1);
                localStorage.setItem(`clockRecords_${user.username}`, JSON.stringify(clockRecords));
                renderRecords();
            }
        });
    }

    function deleteLeaveRecord(index) {
        users.forEach(user => {
            const leaveRecords = JSON.parse(localStorage.getItem(`leaveRecords_${user.username}`)) || [];
            if (index >= 0 && index < leaveRecords.length) {
                leaveRecords.splice(index, 1);
                localStorage.setItem(`leaveRecords_${user.username}`, JSON.stringify(leaveRecords));
                renderRecords();
            }
        });
    }

    // Initial rendering of records
    renderRecords();

    // Handle back button
    document.getElementById("backButton").addEventListener("click", function() {
        window.location.href = "dashboard.html"; // Redirect to dashboard
    });
});

document.getElementById('printButton').addEventListener('click', function() {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Reference the clock records table and convert it to a worksheet
    const clockTable = document.getElementById('clockRecordsTable');
    const clockWorksheet = XLSX.utils.table_to_sheet(clockTable);
    XLSX.utils.book_append_sheet(workbook, clockWorksheet, 'Clock Records');

    // Reference the leave records table and convert it to a worksheet
    const leaveTable = document.getElementById('leaveRecordsTable');
    const leaveWorksheet = XLSX.utils.table_to_sheet(leaveTable);
    XLSX.utils.book_append_sheet(workbook, leaveWorksheet, 'Leave Records');

    // Export the workbook to a binary string
    const excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

    // Create a Blob from the binary string
    const blob = new Blob([s2ab(excelFile)], { type: "application/octet-stream" });

    // Create a link element
    const link = document.createElement('a');
    
    // Set the download attribute with a filename
    link.href = URL.createObjectURL(blob);
    link.download = 'Records.xlsx';
    
    // Append link to body
    document.body.appendChild(link);
    
    // Trigger the download by clicking the link
    link.click();
    
    // Remove link from body
    document.body.removeChild(link);
    
    // After downloading, automatically open the print dialog
    window.print();
});

// Function to convert string to array buffer
function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
}
