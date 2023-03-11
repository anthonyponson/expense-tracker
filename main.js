// array to store expenses
let expenses = [];

// variable to store total salary
let totalSalary = 0;

// function to add expense
function addExpense() {
    // get input values
    let expenseName = document.getElementById("expense-name").value;
    let expenseAmount = document.getElementById("expense-amount").value;

    // create expense object
    let expense = {
        name: expenseName,
        amount: expenseAmount
    };


    // add expense to array
    expenses.push(expense);


    // display expenses
    displayExpenses();

    // clear form
    document.getElementById("expense-name").value = "";
    document.getElementById("expense-amount").value = "";

    // save expenses to local storage
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// function to delete expense
function deleteExpense(index) {
    // remove expense from array
    expenses.splice(index, 1);

    // display expenses
    displayExpenses();

    // save expenses to local storage
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// function to display expenses
function displayExpenses() {
    // get expense list element
    let expenseList = document.getElementById("expense-list");

    // clear expense list
    expenseList.innerHTML = "";

    // loop through expenses
    let totalExpenses = 0;
    for (let i = 0; i < expenses.length; i++) {
        // create expense element
        let expenseElement = document.createElement("li");
        expenseElement.innerText = expenses[i].name + ": $" + expenses[i].amount;

        // create delete button
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.onclick = function() { deleteExpense(i); };

        // append expense element and delete button to expense list
        expenseElement.appendChild(deleteButton);
        expenseList.appendChild(expenseElement);

        // add expense amount to total expenses
        totalExpenses += parseInt(expenses[i].amount);
    }

    // display total expenses
    document.getElementById("total-expenses").innerText = "$" + totalExpenses;

    // calculate remaining balance
    // let remainingBalance = totalSalary - totalExpenses;
    let remainingBalance = 0;
    if (!isNaN(totalSalary)) {
        remainingBalance = totalSalary - totalExpenses;
    }

    // display remaining balance
    document.getElementById("remaining-balance").innerText = "$" + remainingBalance;

    // save total expenses and remaining balance to local storage
    localStorage.setItem("totalExpenses", totalExpenses);
    localStorage.setItem("remainingBalance", remainingBalance);
}

// function to set total salary
function setTotalSalary() {
    // get input value
    let totalSalaryInput = document.getElementById("total-salary").value;

    // set total salary variable
    totalSalary = parseInt(totalSalaryInput);

    // display total salary
    document.getElementById("total-salary-display").innerText = "$" + totalSalary;

    // save total salary to local storage
    localStorage.setItem("totalSalary", totalSalary);
}

// add event listener to set total salary button
document.getElementById("set-total-salary-button").addEventListener("click", setTotalSalary);

// retrieve data from local storage on page load
if (localStorage.getItem("expenses")) {
    expenses = JSON.parse(localStorage.getItem("expenses"));
    displayExpenses();
}

if (localStorage.getItem("totalSalary")) {
    totalSalary = parseInt(localStorage.getItem("totalSalary"));
    document.getElementById("total-salary-display").innerText = "$" + totalSalary;
}
