// Declare All Window Elements
const incomeAmount = document.getElementById("incomeAmount");
const incomeForm = document.getElementById("incomeForm");
const incomeEntered = document.getElementById("incomeEntered");
const balanceAmount = document.getElementById("balanceAmount");

const expForm = document.getElementById("expForm");
const expensesAmount = document.getElementById("expensesAmount");
const expValue = document.getElementById("expValue");
const displayExpenses = document.getElementById("displayExpenses");
const expenseForm = document.getElementById("expense-form");
const budgetform = document.getElementById("budgetform");

const editForm = document.getElementById("editForm");
const saveEdit = document.getElementById("saveEdit");
const editExpValue = document.getElementById("editExpValue");
const editExpNumber = document.getElementById("editExpNumber");

let expName = document.getElementById("expName");
let expNumber = document.getElementById("expNumber");

// For Modal Window
const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

let id = 0;
let details = []; // Store all the Expense Details

// Step 1: Call once Income Amount received from Modal
function callBudget() {
  budgetform.style.display = "block";
  expenseForm.style.display = "none";
}

// Step 2: Get Initial Expense
function addExpenses(name, number) {
  if (!name.length || !number.length) {
    expName.style.border = "1px solid #b80c09";
    expName.placeholder = "Please enter a value";
    expName.style.color = "#b80c09";

    expNumber.style.border = "1px solid #b80c09";
    expNumber.placeholder = "Please enter a value";
    expNumber.style.color = "#b80c09";

    setTimeout(() => {
      expName.style.color = "#495057";
      expName.style.border = "1px solid gray";
      expName.placeholder = "Please enter a value";

      expNumber.placeholder = "Please enter a value";
      expNumber.style.border = "1px solid gray";
      expNumber.style.color = "#495057";
    }, 3000);
  } else {
    const userExp = {
      id: id,
      name: name,
      number: parseInt(number),
    };
    details.push(userExp);
    displayExp(details);
    id++;
    expName.value = "";
    expNumber.value = "";
  }
}

// Step 3: Dispaly all the expense
function displayExp(details) {
  expValue.innerHTML = null;
  for (i = 0; i < details.length; i++) {
    expValue.innerHTML += `
    <div class="expValue" id="${details[i].id}">
      <div id="expTitleName" class="exp"><p>${details[i].name}</p></div>
      <div id="expValueAmount" class="exp"><p> <span>$ </span> ${details[i].number}</p></div>
      <div id="edite_delete">
        <p>
          <button id="${details[i].id}" onclick="editExpDetails(${details[i].id})"> <img src="image/edit.svg" width="15" alt=""  /></button> 
          <button id="${details[i].id}" onclick="delExpenseDetails(${details[i].id})"><img src="image/trash.svg" width="15" alt="" /></button>
        </p>
      </div>
    </div>
    <hr class="table-horizontal" />
  `;
  }
  calcExpenses();
  displayExpenses.style.display = "block";
}

// Step 4: Calculate Total Expense 
function calcExpenses() {
  let totalExp = 0;
  for (i = 0; i < details.length; i++) {
    totalExp = details[i].number + totalExp;
  }
  expensesAmount.innerText = totalExp;
  updateBalance();
}

// Step 5: Update the Balance
function updateBalance() {
  balanceAmount.innerText =
    parseInt(incomeEntered.innerText) - parseInt(expensesAmount.innerText);
}

// Listeners Function to get User Entered Income
function getincomeEntered(amount) {
  if (!amount) {
    incomeAmount.style.border = "1px solid #b80c09";
    incomeAmount.placeholder = "input can not be empty";
    incomeAmount.style.color = "#b80c09";
    setTimeout(() => {
      incomeAmount.style.color = "#495057";
      incomeAmount.style.border = "1px solid gray";
    }, 3000);
  } else {
    incomeEntered.innerText = amount;
    balanceAmount.innerText = amount;
    expenseForm.style.display = "block";
    budgetform.style.display = "none";
    editForm.style.display = "none";
    incomeAmount.value = "";
  }
}

// Listener Function to delete an expense
function delExpenseDetails(id) {
  let index = details.findIndex((item) => item.id === id);
  details.splice(index, 1);
  displayExp(details);
}

// Listener Function to edit an expense added
function editExpDetails(id) {
  expenseForm.style.display = "none";
  budgetform.style.display = "none";
  editForm.style.display = "block";
  details.findIndex((item) => {
    if (item.id === id) {
      editExpName.value = item.name;
      editExpNumber.value = item.number;
      saveEdit.children[2].id = item.id;
      modal.style.display = "block";
    }
  });
}

// Listener Function to get the expense value
function getExpValue(editExpName, editExpNumber, id) {
  edited = details.findIndex((obj) => obj.id == id);
  details[edited].name = editExpName;
  details[edited].number = parseInt(editExpNumber);
  displayExp(details);
}

// Show Clock in the screen
function timestamphome(){
  var date;
  date = new Date();
  var time = document.getElementById('timediv'); 
  time.innerHTML = `${date.toDateString()} - ${date.toLocaleTimeString()}`;
}

// Update Time in Intervals
var interval = setInterval(timestamphome, 1000);

// Listeners on Expense Submit
saveEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  getExpValue(editExpName.value, editExpNumber.value, saveEdit.children[2].id);
});

expForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addExpenses(expName.value, expNumber.value);
});

incomeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getincomeEntered(incomeAmount.value);
});

btn.onclick = function () {
  expName.value = "";
  expNumber.value = "";
  expenseForm.style.display = "block";
  editForm.style.display = "none";
  modal.style.display = "block";
};

// Close Button Handle
span.onclick = function () {
  modal.style.display = "none";
};

// Hide the popup when clicked outside
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};