const serverUrl = "https://c2ca1b7a2dabe00a426fcc6ac3f9873b.serveo.net";

const statusElement = document.getElementById("status");

function startBot() {
  const apiKey = document.getElementById("apiKey").value.trim();
  const secretKey = document.getElementById("secretKey").value.trim();
  const symbol = document.getElementById("symbol").value;

  if (!apiKey || !secretKey || !symbol) {
    statusElement.innerText = "All fields are required!";
    return;
  }

  fetch(`${serverUrl}/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      api_secret: secretKey,
      symbol: symbol
    }),
  })
    .then((res) => res.text())
    .then((data) => {
      statusElement.innerText = data;
      startLogPolling(apiKey);
    })
    .catch((err) => {
      console.error(err);
      statusElement.innerText = "Failed to start the bot.";
    });
}

function stopBot() {
  const apiKey = document.getElementById("apiKey").value.trim();
  if (!apiKey) {
    statusElement.innerText = "API key is required to stop the bot.";
    return;
  }

  fetch(`${serverUrl}/stop`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key: apiKey }),
  })
    .then((res) => res.text())
    .then((data) => {
      statusElement.innerText = data;
      stopLogPolling();
    })
    .catch((err) => {
      console.error(err);
      statusElement.innerText = "Failed to stop the bot.";
    });
}

let logInterval = null;

function startLogPolling(apiKey) {
  stopLogPolling(); // Clear any existing polling
  logInterval = setInterval(() => {
    fetch(`${serverUrl}/logs/${apiKey}`)
      .then((res) => res.text())
      .then((logs) => {
        statusElement.innerText = logs || "Bot started. Waiting for trades...";
      })
      .catch((err) => {
        console.error(err);
        statusElement.innerText = "Error fetching logs.";
      });
  }, 5000);
}

function stopLogPolling() {
  if (logInterval) {
    clearInterval(logInterval);
    logInterval = null;
  }
}
