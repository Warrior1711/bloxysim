// UI switching
const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const accountSection = document.getElementById('account-section');
const navLogin = document.getElementById('nav-login');
const navRegister = document.getElementById('nav-register');
const userDisplay = document.getElementById('user-display');
const logoutBtn = document.getElementById('logout-btn');

function showSection(section) {
  loginSection.classList.add('hidden');
  registerSection.classList.add('hidden');
  accountSection.classList.add('hidden');
  section.classList.remove('hidden');
}

// Navigation
navLogin.onclick = () => showSection(loginSection);
navRegister.onclick = () => showSection(registerSection);

// Registration logic
document.getElementById('register-form').onsubmit = function(e) {
  e.preventDefault();
  let username = document.getElementById('register-username').value.trim();
  let password = document.getElementById('register-password').value;
  if (!username || !password) return alert('Fill all fields!');
  let users = JSON.parse(localStorage.getItem('users') || '{}');
  if (users[username]) return alert('Username already exists!');
  users[username] = { password: password };
  localStorage.setItem('users', JSON.stringify(users));
  alert('Account created! Please login.');
  showSection(loginSection);
};

// Login logic
document.getElementById('login-form').onsubmit = function(e) {
  e.preventDefault();
  let username = document.getElementById('login-username').value.trim();
  let password = document.getElementById('login-password').value;
  let users = JSON.parse(localStorage.getItem('users') || '{}');
  if (!users[username] || users[username].password !== password) {
    alert('Invalid credentials!');
    return;
  }
  localStorage.setItem('currentUser', username);
  showAccount(username);
};

function showAccount(username) {
  showSection(accountSection);
  userDisplay.textContent = username;
}

// Logout
logoutBtn.onclick = function() {
  localStorage.removeItem('currentUser');
  showSection(loginSection);
};

// On load, check if user is logged in
window.onload = function() {
  let username = localStorage.getItem('currentUser');
  if (username && JSON.parse(localStorage.getItem('users') || '{}')[username]) {
    showAccount(username);
  } else {
    showSection(loginSection);
  }
};
