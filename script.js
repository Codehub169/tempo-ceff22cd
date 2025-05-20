// DOM Elements
const expenseForm = document.getElementById('expense-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const expenseList = document.getElementById('expense-list');
const totalAmountDisplay = document.getElementById('total-amount');
const noExpensesMessage = document.getElementById('no-expenses-message');
const clearAllButton = document.getElementById('clear-all-btn');

// Initialize expenses array from localStorage or as empty
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to render expenses to the UI
function renderExpenses() {
    // Clear current list
    expenseList.innerHTML = '';

    if (expenses.length === 0) {
        noExpensesMessage.style.display = 'block';
        clearAllButton.style.display = 'none'; // Hide clear all if no expenses
    } else {
        noExpensesMessage.style.display = 'none';
        clearAllButton.style.display = 'inline-block'; // Show clear all
        expenses.forEach(expense => {
            const listItem = document.createElement('li');
            
            // Expense details
            const expenseInfo = document.createElement('div');
            expenseInfo.classList.add('expense-info');

            const descriptionSpan = document.createElement('span');
            descriptionSpan.classList.add('expense-description');
            descriptionSpan.textContent = expense.description;

            const amountSpan = document.createElement('span');
            amountSpan.classList.add('expense-amount');
            amountSpan.textContent = `$${expense.amount.toFixed(2)}`;

            expenseInfo.appendChild(descriptionSpan);
            expenseInfo.appendChild(amountSpan);

            // Delete button
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'delete-btn');
            deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Delete';
            deleteButton.onclick = () => deleteExpense(expense.id);

            listItem.appendChild(expenseInfo);
            listItem.appendChild(deleteButton);
            expenseList.appendChild(listItem);
        });
    }
    updateTotal();
    saveExpenses();
}

// Function to update the total expenses display
function updateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalAmountDisplay.textContent = total.toFixed(2);
}

// Function to save expenses to localStorage
function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to add a new expense
function addExpense(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);

    // Basic validation
    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid description and amount.');
        return;
    }

    const newExpense = {
        id: Date.now(), // Simple unique ID using timestamp
        description: description,
        amount: amount
    };

    expenses.push(newExpense);
    
    renderExpenses();

    // Clear input fields
    descriptionInput.value = '';
    amountInput.value = '';
    descriptionInput.focus(); // Focus back on description for easy next entry
}

// Function to delete an expense by its ID
function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    renderExpenses();
}

// Function to clear all expenses
function clearAllExpenses() {
    if (expenses.length === 0) return; // Do nothing if no expenses
    if (confirm('Are you sure you want to delete all expenses? This action cannot be undone.')) {
        expenses = [];
        renderExpenses();
    }
}

// Event Listeners
expenseForm.addEventListener('submit', addExpense);
clearAllButton.addEventListener('click', clearAllExpenses);

// Initial render on page load
document.addEventListener('DOMContentLoaded', renderExpenses);
