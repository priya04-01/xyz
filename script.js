// Simulated admin credentials
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

// Simulated bank data
let accounts = [];

// DOM Elements
const loginSection = document.getElementById("loginSection");
const loginForm = document.getElementById("loginForm");
const adminSection = document.getElementById("adminSection");
const output = document.getElementById("output");
const result = document.getElementById("result");
const errorDiv = document.getElementById("error");

// Menu Buttons
const createAccountBtn = document.getElementById("createAccountBtn");
const depositAmountBtn = document.getElementById("depositAmountBtn");
const withdrawMoneyBtn = document.getElementById("withdrawMoneyBtn");
const checkBalanceBtn = document.getElementById("checkBalanceBtn");
const viewAllAccountsBtn = document.getElementById("viewAllAccountsBtn");
const logoutBtn = document.getElementById("logoutBtn");

// Forms
const createAccountForm = document.getElementById("createAccountForm");
const depositAmountForm = document.getElementById("depositAmountForm");
const withdrawMoneyForm = document.getElementById("withdrawMoneyForm");
const checkBalanceForm = document.getElementById("checkBalanceForm");
const formPlaceholder = document.getElementById("formPlaceholder");

// Initialize - Hide all forms and show placeholder
function initializeForms() {
  document.querySelectorAll(".operation-form").forEach(form => form.classList.add("hidden"));
  formPlaceholder.classList.remove("hidden");
  output.classList.add("hidden");
  loginForm.reset();
}

initializeForms();

// Login Form Submission
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    loginSection.classList.add("hidden");
    adminSection.classList.remove("hidden");
    document.querySelector(".container").classList.add("expanded");
    initializeForms(); // Reset forms on login
  } else {
    showError("Invalid username or password");
  }
});

// Menu Button Handlers
function showForm(formToShow) {
  document.querySelectorAll(".operation-form").forEach(form => form.classList.add("hidden"));
  formPlaceholder.classList.add("hidden");
  formToShow.classList.remove("hidden");
}

createAccountBtn.addEventListener("click", () => showForm(createAccountForm));
depositAmountBtn.addEventListener("click", () => showForm(depositAmountForm));
withdrawMoneyBtn.addEventListener("click", () => showForm(withdrawMoneyForm));
checkBalanceBtn.addEventListener("click", () => showForm(checkBalanceForm));

// View All Accounts
viewAllAccountsBtn.addEventListener("click", () => {
  hideAllForms();
  if (accounts.length === 0) {
    showResult("No accounts found.");
  } else {
    const accountList = accounts.map(acc => 
      `Account: ${acc.accountNumber}, Holder: ${acc.accountHolder}, Balance: $${acc.balance}`
    ).join("<br>");
    showResult(`All Accounts:<br>${accountList}`);
  }
});

// Logout Functionality
logoutBtn.addEventListener("click", () => {
  adminSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
  document.querySelector(".container").classList.remove("expanded");
  initializeForms();
});

// Cancel Buttons
document.querySelectorAll(".cancelBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    hideAllForms();
    formPlaceholder.classList.remove("hidden");
  });
});

// Form Submissions
createAccountForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const accountNumber = document.getElementById("accountNumber").value;
  const accountHolder = document.getElementById("accountHolder").value;
  const initialBalance = parseFloat(document.getElementById("initialBalance").value);

  if (accounts.some(acc => acc.accountNumber === accountNumber)) {
    showResult("Account number already exists!");
    return;
  }

  if (accountNumber && accountHolder && !isNaN(initialBalance)) {
    accounts.push({ accountNumber, accountHolder, balance: initialBalance });
    showResult(`Account created for ${accountHolder} ($${initialBalance})`);
    createAccountForm.reset();
  } else {
    showResult("Invalid input!");
  }
});

depositAmountForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const accountNumber = document.getElementById("depositAccountNumber").value;
  const amount = parseFloat(document.getElementById("depositAmount").value);
  const account = accounts.find(acc => acc.accountNumber === accountNumber);

  if (account && !isNaN(amount) && amount > 0) {
    account.balance += amount;
    showResult(`Deposited $${amount}. New balance: $${account.balance}`);
    depositAmountForm.reset();
  } else {
    showResult("Invalid account or amount!");
  }
});

withdrawMoneyForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const accountNumber = document.getElementById("withdrawAccountNumber").value;
  const amount = parseFloat(document.getElementById("withdrawAmount").value);
  const account = accounts.find(acc => acc.accountNumber === accountNumber);

  if (account && !isNaN(amount) && amount > 0 && amount <= account.balance) {
    account.balance -= amount;
    showResult(`Withdrew $${amount}. New balance: $${account.balance}`);
    withdrawMoneyForm.reset();
  } else {
    showResult("Invalid withdrawal!");
  }
});

checkBalanceForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const accountNumber = document.getElementById("balanceAccountNumber").value;
  const account = accounts.find(acc => acc.accountNumber === accountNumber);

  if (account) {
    showResult(`Balance for ${account.accountHolder}: $${account.balance}`);
    checkBalanceForm.reset();
  } else {
    showResult("Account not found!");
  }
});

// Helper Functions
function hideAllForms() {
  document.querySelectorAll(".operation-form").forEach(form => form.classList.add("hidden"));
  formPlaceholder.classList.remove("hidden");
}

function showResult(message) {
  output.classList.remove("hidden");
  result.innerHTML = message;
}

function showError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
  setTimeout(() => errorDiv.classList.add("hidden"), 3000);
}
