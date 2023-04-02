const totalSalaryInput = document.querySelector('.total-salary')
const setTotalSalaryButton = document.querySelector('.set-total-salary-button')
const totalSalaryDisplay = document.querySelector('.total-salary-display')
const expenseForm = document.querySelector('form')
const expenseNameInput = document.querySelector('.expense-name')
const expenseAmountInput = document.querySelector('.expense-amount')
const expenseList = document.querySelector('.expense-list')
const totalExpensesDisplay = document.querySelector('.total-expenses')
const remainingBalanceDisplay = document.querySelector('.remaining-balance')

let totalSalary = localStorage.getItem('totalSalary') || 0
let expenses = JSON.parse(localStorage.getItem('expenses')) || []

totalSalaryDisplay.innerText = `Total salary: $ ${totalSalary}`

setTotalSalaryButton.addEventListener('click', () => {
  totalSalary = parseInt(totalSalaryInput.value)
  totalSalaryDisplay.innerText = `Total Salary: $${totalSalary}`
  localStorage.setItem('totalSalary', totalSalary)
  updateBalance()
})

expenseForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const expenseName = expenseNameInput.value
  const expenseAmount = parseFloat(expenseAmountInput.value)
  if (!expenseName || !expenseAmount) {
    alert('please enter a both name and amount')
    return
  }
  expenses.push({ name: expenseName, amount: expenseAmount })
  localStorage.setItem('expenses', JSON.stringify(expenses))
  expenseNameInput.value = ''
  expenseAmountInput.value = ''
  updateBalance()
  renderExpenses()
})

function renderExpenses() {
  expenseList.innerHTML = ''
  const expenseTtilte = document.createElement('h3')
  expenseTtilte.classList.add('expense-ttilte')
  expenseList.appendChild(expenseTtilte)
  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i]
    const expenseItem = document.createElement('li')
    expenseItem.innerText = `${expense.name}: $${expense.amount} `

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('expense-delete')
    deleteButton.innerText = '❌'
    deleteButton.addEventListener('click', () => {
      expenses.splice(i, 1)
      localStorage.setItem('expenses', JSON.stringify(expenses))
      renderExpenses()
      updateBalance()
    })

    expenseList.appendChild(deleteButton)
    expenseList.appendChild(expenseItem)
  }
}

function updateBalance() {
  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  )
  const remainingBalance =  totalSalary - totalExpenses
  totalExpensesDisplay.innerText = `Total Expenses: $ ${totalExpenses}`
  remainingBalanceDisplay.innerText = `Remaining Balance: $ ${remainingBalance}`
  localStorage.setItem('remainingBalance', remainingBalance)
}

const remainingBalance = localStorage.getItem('remaingBalance')|| 0
remainingBalanceDisplay.innerText = `Remaining Balance: $ ${remainingBalance}`


renderExpenses()
updateBalance()
