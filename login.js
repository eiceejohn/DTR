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

// Firebase configuration from your Firebase console
const firebaseConfig = {
    apiKey: "AIzaSyBxC8X4r5uodg8lNdn5z0XWhO8kkeBhM4s",
    authDomain: "cdasia-dtr.firebaseapp.com",
    projectId: "cdasia-dtr",
    storageBucket: "cdasia-dtr.appspot.com",
    messagingSenderId: "551203218755",
    appId: "1:551203218755:web:22feab6890273775de7bf6",
    measurementId: "G-WHGQK6N27X"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Initialize Firebase services
  const auth = firebase.auth();
  const db = firebase.firestore();


// Add a new user to Firestore
function addUserToFirestore(userId, userData) {
    db.collection('users').doc(userId).set(userData)
      .then(() => {
        console.log('User added to Firestore');
      })
      .catch((error) => {
        console.error('Error adding user:', error);
      });
  }
  
  // Fetch users from Firestore
  function getUsersFromFirestore() {
    db.collection('users').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    });
  }
  
  

