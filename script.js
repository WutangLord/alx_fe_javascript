document.addEventListener("DOMContentLoaded", function () {
    const quotes = [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
        { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
        { text: "Do what you can, with what you have, where you are.", category: "Wisdom" }
    ];

    const quoteDisplay = document.getElementById("quoteDisplay");
    const newQuoteBtn = document.getElementById("newQuote");

    function showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quote = quotes[randomIndex];
        
        // Using innerHTML to ensure correct rendering
        quoteDisplay.innerHTML = `<p>"${quote.text}"</p><strong>- ${quote.category}</strong>`;
    }

    function addQuote() {
        const newQuoteText = document.getElementById("newQuoteText").value.trim();
        const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

        if (newQuoteText && newQuoteCategory) {
            quotes.push({ text: newQuoteText, category: newQuoteCategory });
            document.getElementById("newQuoteText").value = "";
            document.getElementById("newQuoteCategory").value = "";
            alert("Quote added successfully!");
        } else {
            alert("Please enter both a quote and a category.");
        }
    }

    newQuoteBtn.addEventListener("click", showRandomQuote);

    // Initial quote display
    showRandomQuote();
});
