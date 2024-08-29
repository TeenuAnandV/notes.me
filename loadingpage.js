// loading.js
window.onload = function() {
    // Simulate loading time before redirecting to the main page
    setTimeout(function() {
        window.location.href = 'main.html'; // Ensure this path is correct
    }, 1000); // 2 seconds loading time
};
