// Get references to the HTML elements
const jokeTextEl = document.getElementById('joke-text');
const fetchButton = document.getElementById('fetch-button');

// The URL for the Joke API (single joke type)
const apiUrl = 'https://v2.jokeapi.dev/joke/Any?type=single';

// Asynchronous function to fetch and display a joke
async function fetchJoke() {
    // Show a loading message while we wait for the API
    jokeTextEl.textContent = 'Loading a new joke...';
    fetchButton.disabled = true; // Disable the button to prevent multiple requests

    try {
        // Fetch the data from the API
        const response = await fetch(apiUrl);
        
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Check if a joke was returned and display it
        if (data.joke) {
            jokeTextEl.textContent = data.joke;
        } else {
            // Handle cases where the API returns an error or no joke
            jokeTextEl.textContent = 'Oops! No joke found. Try again.';
        }
    } catch (error) {
        // Handle any network or parsing errors
        console.error('Error fetching joke:', error);
        jokeTextEl.textContent = 'Failed to fetch joke. Please check your network connection.';
    } finally {
        // Re-enable the button once the process is complete
        fetchButton.disabled = false;
    }
}

// Add an event listener to the button to trigger the fetchJoke function
fetchButton.addEventListener('click', fetchJoke);