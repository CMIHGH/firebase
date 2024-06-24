// auth.js

// Firebase initialization is in firebase-config.js

// Handle Login
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            document.getElementById('login-error').innerText = error.message;
        });
});

// Handle Registration
document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            document.getElementById('register-error').innerText = error.message;
        });
});

// Handle Logout
function logout() {
    firebase.auth().signOut()
        .then(() => {
            window.location.href = 'login.html';
        })
        .catch((error) => {
            console.error('Error logging out: ', error);
        });
}

// Restrict access to Dashboard (dashboard.html)
firebase.auth().onAuthStateChanged((user) => {
    const dashboard = document.getElementById('dashboard');
    if (user && dashboard) {
        dashboard.src = 'YOUR_POWER_BI_EMBED_URL';
    } else if (!user && dashboard) {
        alert("You must be signed in to view the dashboard");
        window.location.href = 'login.html';
    }
});
