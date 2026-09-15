// cards is a value which is array of objects each object is the card of the history contains text field and value and amout field and value we retrive all cards and calculate the balance, income and expense from it.
let historyOfTransactions = JSON.parse(localStorage.getItem("cards")) || [];
// const historyOfTransactions = [
//   {text: "Medicine", amount: -920},
// ]

const totalBalance = document.querySelector(".balance-span");
const totalIncome = document.querySelector(".income-span");
const totalExpense = document.querySelector(".expense-span");
const historyDiv = document.querySelector(".history");

const textDetailInput = document.querySelector("#text-detail");
const amountInput = document.querySelector("#amount-input");
const addTransactionBtn = document.querySelector("#add-transaction");

function saveToLocalStorage() {
  localStorage.setItem("cards", JSON.stringify(historyOfTransactions));
}

function updateBalance() {
  const amountArray = historyOfTransactions.map((card) => {
    return card.amount;
  });
  const total = amountArray.reduce((acc, cur) => acc + cur, 0).toFixed(2);

  const income = amountArray
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amountArray
      .filter((item) => item < 0)
      .reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2);

  totalBalance.textContent = `${total}`;
  totalIncome.textContent = `${income}`;
  totalExpense.textContent = `${expense}`;
}

function renderHTML() {
  historyDiv.innerHTML = "";
  historyOfTransactions.forEach((card) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.dataset.id = card.id;
    if (card.amount > 0) {
      cardDiv.classList.add("income");
    } else {
      cardDiv.classList.add("expense");
    }

    const textSpan = document.createElement("span");
    textSpan.classList.add("title");
    textSpan.textContent = card.text;

    const amountSpan = document.createElement("span");
    amountSpan.classList.add("amount");
    amountSpan.textContent = card.amount;

    const delBtn = document.createElement("button");
    delBtn.classList.add("delBtn");
    delBtn.textContent = "Delete";

    cardDiv.append(textSpan, amountSpan, delBtn);
    historyDiv.append(cardDiv);
  });
}

function addCard() {
  if (textDetailInput.value === "" || amountInput.value === "") {
    return alert("Enter the appropriate detials in fields.");
  }
  const text = textDetailInput.value;
  const amount = Number(amountInput.value);
  historyOfTransactions.push({ id: Date.now(), text, amount });
  saveToLocalStorage();
  updateBalance();
  renderHTML();

  textDetailInput.value = "";
  amountInput.value = "";
}

function delCard(e) {
  if (e.target.classList.contains("delBtn")) {
    const parentCard = e.target.parentElement;
    const cardId = Number(parentCard.dataset.id);

    historyOfTransactions = historyOfTransactions.filter((item) => {
      return item.id !== cardId;
    });
    saveToLocalStorage();
    updateBalance();
    renderHTML();
  }
}
addTransactionBtn.addEventListener("click", addCard);
historyDiv.addEventListener("click", delCard);
updateBalance();
renderHTML();
