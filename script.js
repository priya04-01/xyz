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

const createAccountBtn = document.getElementById("createAccountBtn");
const depositAmountBtn = document.getElementById("depositAmountBtn");
const withdrawMoneyBtn = document.getElementById("withdrawMoneyBtn");
const checkBalanceBtn = document.getElementById("checkBalanceBtn");
const logoutBtn = document.getElementById("logoutBtn");

const createAccountForm = document.getElementById("createAccountForm");
const depositAmountForm = document.getElementById("depositAmountForm");
const withdrawMoneyForm = document.getElementById("withdrawMoneyForm");
const checkBalanceForm = document.getElementById("checkBalanceForm");

const formPlaceholder = document.getElementById("formPlaceholder");
const cancelBtns = document.querySelectorAll(".cancelBtn");

// Login Form Submission
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    loginSection.classList.add("hidden");
    adminSection.classList.remove("hidden");
  } else {
    alert("Invalid username or password");
  }
});

// Menu Button Handlers
createAccountBtn.addEventListener("click", () => {
  hideAllForms();
  formPlaceholder.classList.add("hidden");
  createAccountForm.classList.remove("hidden");
});

depositAmountBtn.addEventListener("click", () => {
  hideAllForms();
  formPlaceholder.classList.add("hidden");
  depositAmountForm.classList.remove("hidden");
});

withdrawMoneyBtn.addEventListener("click", () => {
  hideAllForms();
  formPlaceholder.classList.add("hidden");
  withdrawMoneyForm.classList.remove("hidden");
});

checkBalanceBtn.addEventListener("click", () => {
  hideAllForms();
  formPlaceholder.classList.add("hidden");
  checkBalanceForm.classList.remove("hidden");
});

logoutBtn.addEventListener("click", () => {
  loginSection.classList.remove("hidden");
  adminSection.classList.add("hidden");
  hideAllForms();
  formPlaceholder.classList.remove("hidden");
});

// Cancel Buttons
cancelBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    hideAllForms();
    formPlaceholder.classList.remove("hidden");
  });
});

// Create Account Form Submission
createAccountForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const accountNumber = document.getElementById("accountNumber").value;
  const accountHolder = document.getElementById("accountHolder").value;
  const initialBalance = parseFloat(document.getElementById("initialBalance").value);

  if (accountNumber && accountHolder && !isNaN(initialBalance)) {
    accounts.push({ accountNumber, accountHolder, balance: initialBalance });
    showResult(`Account created successfully for ${accountHolder}`);
    createAccountForm.reset();
  } else {
    showResult("Invalid input. Please try again.");
  }
});

// Deposit Amount Form Submission
depositAmountForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const accountNumber = document.getElementById("depositAccountNumber").value;
  const amount = parseFloat(document.getElementById("depositAmount").value);

  const account = accounts.find(acc => acc.accountNumber === accountNumber);
  if (account && !isNaN(amount) && amount > 0) {
    account.balance += amount;
    showResult(`Deposited $${amount} to account ${accountNumber}. New balance: $${account.balance}`);
    depositAmountForm.reset();
  } else {
    showResult("Invalid account number or amount.");
  }
});

// Withdraw Money Form Submission
withdrawMoneyForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const accountNumber = document.getElementById("withdrawAccountNumber").value;
  const amount = parseFloat(document.getElementById("withdrawAmount").value);

  const account = accounts.find(acc => acc.accountNumber === accountNumber);
  if (account && !isNaN(amount) && amount > 0 && amount <= account.balance) {
    account.balance -= amount;
    showResult(`Withdrawn $${amount} from account ${accountNumber}. New balance: $${account.balance}`);
    withdrawMoneyForm.reset();
  } else {
    showResult("Invalid account number, amount, or insufficient balance.");
  }
});

// Check Balance Form Submission
checkBalanceForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const accountNumber = document.getElementById("balanceAccountNumber").value;

  const account = accounts.find(acc => acc.accountNumber === accountNumber);
  if (account) {
    showResult(`Balance for account ${accountNumber}: $${account.balance}`);
    checkBalanceForm.reset();
  } else {
    showResult("Account not found.");
  }
});

// Helper Functions
function hideAllForms() {
  document.querySelectorAll(".operation-form").forEach((form) => {
    form.classList.add("hidden");
  });
}

function showResult(message) {
  output.classList.remove("hidden");
  result.textContent = message;
}