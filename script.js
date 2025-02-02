// Initialize an array of quote objects
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Do what you can, with what you have, where you are.", category: "Motivation" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" }
];

// Select DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');

// Function to display a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        quoteDisplay.innerHTML = "No quotes available. Add a new quote!";
        return;
    }

    // Get a random quote from the array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Display the quote and its category
    quoteDisplay.innerHTML = `
        <p>"${randomQuote.text}"</p>
        <em>— ${randomQuote.category}</em>
    `;
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

    if (newQuoteText === '' || newQuoteCategory === '') {
        alert('Please enter both a quote and a category!');
        return;
    }

    // Create a new quote object
    const newQuote = {
        text: newQuoteText,
        category: newQuoteCategory
    };

    // Add the new quote to the array
    quotes.push(newQuote);

    // Clear the input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    // Notify the user
    alert('Quote added successfully!');
}

// Event listener for the "Show New Quote" button
newQuoteButton.addEventListener('click', showRandomQuote);

// Display a random quote when the page loads
document.addEventListener('DOMContentLoaded', showRandomQuote);
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

// Update the addQuote function to save quotes to local storage
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
    saveQuotes(); // Save quotes to local storage

    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    alert('Quote added successfully!');
}

// Load quotes when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    showRandomQuote();
});

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
        alert('Quotes imported successfully!');
        showRandomQuote();
    };
    reader.readAsText(file);
}

// Add export and import buttons to the HTML
document.body.innerHTML += `
    <div>
        <button onclick="exportQuotes()">Export Quotes</button>
        <input type="file" id="importFile" accept=".json" onchange="importQuotes(event)" />
    </div>
`;