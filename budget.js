const balance = document.querySelector(".budget__value");
const money_plus = document.querySelector(".budget__income--value");
const incomeList = document.querySelector("#income_list");
const expensesList = document.querySelector("#expenses_list");
const form = document.querySelector("#form");
const text = document.querySelector("#text");
const amount = document.querySelector("#amount");
const money_minus = document.querySelector(".budget__expenses--value");

const localStorageTransations = JSON.parse(localStorage.getItem("_transations"));

let transations =
  localStorage.getItem("_transations") !== null ? localStorageTransations : [];

//add transation
function addTransation(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    text.placeholder = "please add a text";
    text.style.backgroundColor = "#ccc";
    amount.placeholder = "please add amount";
    amount.style.backgroundColor = "#ccc";
  } else {
    const transation = {
      id: genenrateID(),
      text: text.value,
      amount: +amount.value,
    };
    transations.push(transation);
    addTransationDOM(transation);
    updateValues();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}
//generate id
function genenrateID() {
  return Math.floor(Math.random() * 100000000);
}

//add transations to dom list
function addTransationDOM(transation) {
  //get sign
  const sign = transation.amount < 0 ? "-" : "+";
  const item = document.createElement("div");
  //add class based on value
  item.classList.add(transation.amount < 0 ? "iteme-0" : "item-0");
  item.innerHTML = `<div class="${transation.amount < 0 ? "iteme__description" : "item__description"}">${transation.text}</div><div class="right"><div class="${transation.amount < 0 ? "iteme__value" : "item__value"}">${sign}${Math.abs(transation.amount)}</div><div class="item__delete"><button type="submit" class="${transation.amount < 0 ? "iteme__delete__btn" : "item__delete__btn"}" onclick="removeTransation(${transation.id})">x</button></div></div>`;
  transation.amount < 0 ? expensesList.appendChild(item) : incomeList.appendChild(item);

}
//update the balance
function updateValues() {
  const amounts = transations.map((transation) => transation.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}
//remove
function removeTransation(id) {
  transations = transations.filter((transation) => transation.id !== id);
  updateLocalStorage();
  init();
}

//updatelocal storage
function updateLocalStorage() {
  localStorage.setItem("_transations", JSON.stringify(transations));
}

//init
function init() {
  incomeList.innerHTML = "";
  expensesList.innerHTML = "";
  transations.forEach(addTransationDOM);
  updateValues();
}
init();

form.addEventListener("submit", addTransation);