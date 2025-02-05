const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expenseElement = document.getElementById("expense");
const historyElement = document.getElementById("history");
const transactionForm = document.getElementById("transaction-form");
const textInput = document.getElementById("text");
const amountInput = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (textInput.value.trim() === "" || amountInput.value.trim() === "") {
    alert("Please add a text and amount");
    return;
  }

  const transaction = {
    id: generateID(),
    text: textInput.value,
    amount: +amountInput.value,
  };

  transactions.push(transaction);
  updateLocalStorage();
  updateUI();
  textInput.value = "";
  amountInput.value = "";
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Update local storage
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Update UI
function updateUI() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);

  balanceElement.innerText = `$${total}`;
  incomeElement.innerText = `$${income}`;
  expenseElement.innerText = `$${expense}`;

  historyElement.innerHTML = transactions
    .map(
      (transaction) => `
      <li class="${transaction.amount > 0 ? "income" : "expense"}">
        ${transaction.text} <span>$${Math.abs(transaction.amount)}</span>
        <button onclick="deleteTransaction(${transaction.id})">x</button>
      </li>
    `
    )
    .join("");
}

// Delete transaction
function deleteTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  updateUI();
}

// Event listener
transactionForm.addEventListener("submit", addTransaction);

// Initial UI update
updateUI();