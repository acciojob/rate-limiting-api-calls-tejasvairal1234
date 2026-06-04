const fetchButton = document.getElementById("fetch-button");
const resultsDiv = document.getElementById("results");
const clickCountSpan = document.getElementById("click-count");

let clickCount = 0;
let apiCallTimestamps = [];
let resetTimer;

fetchButton.addEventListener("click", async () => {
  // Update click count
  clickCount++;
  clickCountSpan.textContent = clickCount;

  // Reset count after 10 seconds from latest click
  clearTimeout(resetTimer);
  resetTimer = setTimeout(() => {
    clickCount = 0;
    clickCountSpan.textContent = "0";
  }, 10000);

  const now = Date.now();

  // Keep only calls made in the last 10 seconds
  apiCallTimestamps = apiCallTimestamps.filter(
    (timestamp) => now - timestamp < 10000
  );

  // Rate limit: max 5 calls in 10 seconds
  if (apiCallTimestamps.length >= 5) {
    alert("Too many API calls. Please wait and try again.");
    return;
  }

  apiCallTimestamps.push(now);

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );

    const data = await response.json();

    resultsDiv.innerHTML += `
      <div>
        <p><strong>ID:</strong> ${data.id}</p>
        <p><strong>Title:</strong> ${data.title}</p>
        <p><strong>Completed:</strong> ${data.completed}</p>
        <hr>
      </div>
    `;
  } catch (error) {
    console.error(error);
    resultsDiv.innerHTML += "<p>Error fetching data.</p>";
  }
});