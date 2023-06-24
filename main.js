// Get HTML elements
const totalSalaryInput = document.querySelector('.total-salary')
const setTotalSalaryButton = document.querySelector('.set-total-salary-button')
const totalSalaryDisplay = document.querySelector('.total-salary-display')
const expenseForm = document.querySelector('form')
const expenseNameInput = document.querySelector('.expense-name')
const expenseAmountInput = document.querySelector('.expense-amount')
const expenseList = document.querySelector('.expense-list')
const totalExpensesDisplay = document.querySelector('.total-expenses')
const remainingBalanceDisplay = document.querySelector('.remaining-balance')

// Initialize total salary and expenses from local storage
let totalSalary = localStorage.getItem('totalSalary') || 0
let expenses = JSON.parse(localStorage.getItem('expenses')) || []

// Display total salary
totalSalaryDisplay.innerText = `Total Salary: $${totalSalary}`

// Set total salary
setTotalSalaryButton.addEventListener('click', () => {
  totalSalary = parseInt(totalSalaryInput.value)
  totalSalaryDisplay.innerText = `Total Salary: $${totalSalary}`
  localStorage.setItem('totalSalary', totalSalary)
  updateBalance()
})

// Add expense
expenseForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const expenseName = expenseNameInput.value
  const expenseAmount = parseFloat(expenseAmountInput.value)
  if (!expenseName || !expenseAmount) {
    alert('Please enter both an expense name and an amount.')
    return
  }
  expenses.push({ name: expenseName, amount: expenseAmount })
  localStorage.setItem('expenses', JSON.stringify(expenses))
  expenseNameInput.value = ''
  expenseAmountInput.value = ''
  renderExpenses()
  updateBalance()
})

// Render expenses
function renderExpenses() {
  expenseList.innerHTML = ''
const expenseTtilte = document.createElement('h3')
expenseTtilte.innerText = 'History'
expenseList.appendChild(expenseTtilte)

expenses.forEach(expense => {
  const expenseItem = document.createElement('li')
  expenseItem.innerText = `${expense.name}: $${expense.amount}`
  const deleteButton = document.createElement('button')
  deleteButton.classList.add('expense-delete')
  deleteButton.innerText = '❌'
  deleteButton.addEventListener('click', () => {
    expenses = expenses.filter(item => item !== expense)
    localStorage.setItem('expenses', JSON.stringify(expenses))
    renderExpenses()
    updateBalance()
  })
  expenseItem.appendChild(deleteButton)
  expenseList.appendChild(expenseItem)
 })

}

// Update balance
function updateBalance() {
  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  )
  const remainingBalance = totalSalary - totalExpenses
  totalExpensesDisplay.textContent = `Total Expenses: $${totalExpenses}`
  remainingBalanceDisplay.textContent = `Remaining Balance: $${remainingBalance}`
  localStorage.setItem('remainingBalance', remainingBalance)
}

// Initialize balance
const remainingBalance = localStorage.getItem('remainingBalance') || 0
remainingBalanceDisplay.textContent = `Remaining Balance: $${remainingBalance}`

// Render initial expenses
renderExpenses()

// Update balance on load
updateBalance()
