//your JS code here. If required.
const btn = document.getElementById("fetchBtn");
const clickCountEl = document.getElementById("clickCount");
const results = document.getElementById("results");

let clickCount = 0;
let requestsInWindow = 0;
let queue = [];
let resetTimer = null;

// Fetch data from API
function fetchData() {
  return fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json())
    .then((data) => {
      const div = document.createElement("div");

      div.innerHTML = `
        <p>ID: ${data.id}</p>
        <p>Title: ${data.title}</p>
        <p>Completed: ${data.completed}</p>
        <hr>
      `;

      results.appendChild(div);
    });
}

// Process queued requests after 10 seconds
function processQueue() {
  const pending = [...queue];
  queue = [];
  requestsInWindow = 0;

  pending.forEach(() => {
    requestsInWindow++;
    fetchData();
  });
}

btn.addEventListener("click", () => {
  clickCount++;
  clickCountEl.textContent = clickCount;

  // Reset click count after 10 seconds
  clearTimeout(resetTimer);

  resetTimer = setTimeout(() => {
    clickCount = 0;
    clickCountEl.textContent = 0;
  }, 10000);

  if (requestsInWindow < 5) {
    requestsInWindow++;
    fetchData();

    // Start 10-second window on first request
    if (requestsInWindow === 1) {
      setTimeout(processQueue, 10000);
    }
  } else {
    queue.push(true);
  }
});