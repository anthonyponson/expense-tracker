// Get DOM elements
const totalSalaryInput = document.querySelector('.total-salary')
const setTotalSalaryButton = document.querySelector('.set-total-salary-button')
const totalSalaryDisplay = document.querySelector('.total-salary-display')
const expenseNameInput = document.querySelector('.expense-name')
const expenseAmountInput = document.querySelector('.expense-amount')
const addExpenseButton = document.querySelector('.add-expense')
const expenseList = document.querySelector('.expense-list')
const totalExpensesDisplay = document.querySelector('.total-expenses')
const remainingBalanceDisplay = document.querySelector('.remaining-balance')

// Check if there is data in local storage
let expenses = JSON.parse(localStorage.getItem('expenses')) || []
let totalSalary = JSON.parse(localStorage.getItem('totalSalary')) || 0

// Display total salary and expenses on page load
totalSalaryDisplay.textContent = `$${totalSalary}`
displayExpenses()

// Add event listeners
setTotalSalaryButton.addEventListener('click', setTotalSalary)
addExpenseButton.addEventListener('click', addExpense)

// Set total salary
function setTotalSalary() {
  totalSalary = totalSalaryInput.value
  totalSalaryDisplay.textContent = `$${totalSalary}`
  localStorage.setItem('totalSalary', JSON.stringify(totalSalary))
  updateRemainingBalance()
}

// Add expense
function addExpense(event) {
  event.preventDefault()

  // Get expense name and amount
  const expenseName = expenseNameInput.value
  const expenseAmount = expenseAmountInput.value

  // Validate expense amount
  if (expenseAmount === '' || isNaN(expenseAmount)) {
    alert('Please enter a valid expense amount.')
    return
  }

  // Create expense object and add to expenses array
  const expense = { name: expenseName, amount: expenseAmount }
  expenses.push(expense)
  localStorage.setItem('expenses', JSON.stringify(expenses))

  // Clear input fields
  expenseNameInput.value = ''
  expenseAmountInput.value = ''

  // Display updated expenses and remaining balance
  displayExpenses()
  updateRemainingBalance()
}

// Display expenses
function displayExpenses() {
  // Clear expense list
  expenseList.innerHTML = ''

  // Calculate total expenses and display each expense
  let totalExpenses = 0
  expenses.forEach((expense, index) => {
    const li = document.createElement('li')
    li.innerHTML = `${expense.name}: $${expense.amount} <button class="delete-expense" data-delete-button=${index}>Delete</button>`
    expenseList.appendChild(li)
    totalExpenses += parseInt(expense.amount)
    const expensesTitle = document.createElement('h3')
    expenseList.appendChild(expensesTitle)
    expensesTitle.innerText = 'History'
  })

  // Display total expenses
  totalExpensesDisplay.textContent = `$${totalExpenses}`
}

// Update remaining balance
function updateRemainingBalance() {
  let remainingBalance =
    totalSalary - parseInt(totalExpensesDisplay.textContent.slice(1))
  remainingBalanceDisplay.textContent = `$${remainingBalance}`
}

// Delete expense
expenseList.addEventListener('click', deleteExpense)
function deleteExpense(event) {
  if (event.target.classList.contains('delete-expense')) {
    const expenseIndex = event.target.dataset.deleteButton
    expenses.splice(expenseIndex, 1)
    localStorage.setItem('expenses', JSON.stringify(expenses))
    displayExpenses()
    updateRemainingBalance()
  }
}
