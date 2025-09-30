// UI switching
const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const simulatorSection = document.getElementById('simulator-section');
const navLogin = document.getElementById('nav-login');
const navRegister = document.getElementById('nav-register');
const userDisplay = document.getElementById('user-display');
const reviveBtn = document.getElementById('revive-btn');
const reviveCount = document.getElementById('revive-count');
const logoutBtn = document.getElementById('logout-btn');

function showSection(section) {
  loginSection.classList.add('hidden');
  registerSection.classList.add('hidden');
  simulatorSection.classList.add('hidden');
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
  users[username] = { password: password, reviveCount: 0 };
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
  startSimulator(username);
};

function startSimulator(username) {
  showSection(simulatorSection);
  userDisplay.textContent = username;
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  reviveCount.textContent = users[username]?.reviveCount || 0;
}

// Revival simulator logic
reviveBtn.onclick = function() {
  let username = localStorage.getItem('currentUser');
  if (!username) return;
  let users = JSON.parse(localStorage.getItem('users') || '{}');
  users[username].reviveCount = (users[username].reviveCount || 0) + 1;
  localStorage.setItem('users', JSON.stringify(users));
  reviveCount.textContent = users[username].reviveCount;
};

// Logout
logoutBtn.onclick = function() {
  localStorage.removeItem('currentUser');
  showSection(loginSection);
};

// On load, check if user is logged in
window.onload = function() {
  let username = localStorage.getItem('currentUser');
  if (username && JSON.parse(localStorage.getItem('users') || '{}')[username]) {
    startSimulator(username);
  } else {
    showSection(loginSection);
  }
};
