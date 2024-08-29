// loginpage.js
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const correctUsername = 'admin';
    const correctPassword = 'password';

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    if (username === correctUsername && password === correctPassword) {
        window.location.href = 'loadingpage.html';
    } else {
        // Show error message
        errorMessage.textContent = 'Invalid username or password';
        errorMessage.style.display = 'block';
    }
});
