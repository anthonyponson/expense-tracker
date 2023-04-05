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

let totalSalary = localStorage.getItem('totalSalary') || 0
let expenses = JSON.parse(localStorage.getItem('expenses')) || []

totalSalaryDisplay.innerText = `Total Salary: ${totalSalary}`

setTotalSalaryButton.addEventListener('click', () => {
  totalSalary = parseInt(totalSalaryInput.value)
  totalSalaryDisplay.innerText = `Total salary: $${totalSalary}`
  localStorage.setItem('totalSalary', totalSalary)
  updateBalance()
})

