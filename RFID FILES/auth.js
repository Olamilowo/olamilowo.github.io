// auth.js
document.addEventListener('DOMContentLoaded', () => {
    // Login Form Handler
    if (document.getElementById('loginForm')) {
      document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const storedUser = JSON.parse(localStorage.getItem('adminUser'));
  
        if (storedUser && username === storedUser.username && password === storedUser.password) {
          window.location.href = 'overview.html';
        } else {
          showError('Invalid username or password');
        }
      });
    }
  
    // Signup Form Handler
    if (document.getElementById('signupForm')) {
      document.getElementById('signupForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('newUsername').value;
        const password = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
  
        if (password !== confirmPassword) {
          showError('Passwords do not match');
          return;
        }
  
        if (localStorage.getItem('adminUser')) {
          showError('Admin account already exists');
          return;
        }
  
        localStorage.setItem('adminUser', JSON.stringify({ username, password }));
        window.location.href = 'login.html';
      });
    }
  });
  
  function showError(message) {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    setTimeout(() => errorElement.textContent = '', 3000);
  }