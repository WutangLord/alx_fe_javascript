// Initialize an array of quote objects
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Do what you can, with what you have, where you are.", category: "Motivation" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" }
];

// Select DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const categoryFilter = document.getElementById('categoryFilter');

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Load quotes from local storage
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
}

// Display a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        quoteDisplay.innerHTML = "No quotes available. Add a new quote!";
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `
        <p>"${randomQuote.text}"</p>
        <em>— ${randomQuote.category}</em>
    `;
}

// Add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

    if (newQuoteText === '' || newQuoteCategory === '') {
        alert('Please enter both a quote and a category!');
        return;
    }

    const newQuote = {
        text: newQuoteText,
        category: newQuoteCategory
    };

    quotes.push(newQuote);
    saveQuotes();
    populateCategories();
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    alert('Quote added successfully!');
}

// Populate categories in the dropdown
function populateCategories() {
    const categories = [...new Set(quotes.map(quote => quote.category))];
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(category => {
        categoryFilter.innerHTML += `<option value="${category}">${category}</option>`;
    });
}

// Filter quotes based on the selected category
function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
    displayQuotes(filteredQuotes);
}

// Display filtered quotes
function displayQuotes(quotesToDisplay) {
    quoteDisplay.innerHTML = quotesToDisplay.map(quote => `
        <p>"${quote.text}"</p>
        <em>— ${quote.category}</em>
    `).join('');
}

// Export quotes to a JSON file
function exportQuotes() {
    const data = JSON.stringify(quotes);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Import quotes from a JSON file
function importQuotes(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        const importedQuotes = JSON.parse(e.target.result);
        quotes = importedQuotes;
        saveQuotes();
        populateCategories();
        alert('Quotes imported successfully!');
        showRandomQuote();
    };
    reader.readAsText(file);
}

// Fetch quotes from the server (simulated)
async function fetchQuotesFromServer() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data.map(post => ({ text: post.title, category: 'Server' }));
}

// Sync local quotes with server quotes
async function syncQuotes() {
    const serverQuotes = await fetchQuotesFromServer();
    const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    const mergedQuotes = [...localQuotes, ...serverQuotes];
    quotes = [...new Map(mergedQuotes.map(quote => [quote.text, quote])).values()]; // Remove duplicates
    saveQuotes();
    populateCategories();
    alert('Quotes synced with server!');
    showRandomQuote();
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    populateCategories();
    showRandomQuote();
});

// Event listener for the "Show New Quote" button
newQuoteButton.addEventListener('click', showRandomQuote);