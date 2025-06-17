const apiBase = "https://c2ca1b7a2dabe00a426fcc6ac3f9873b.serveo.net"; // replace if changed

// Generate temporary wallet-like ID (you can replace with real wallet logic later)
const wallet = "demo_" + Math.random().toString(36).substring(2, 10);

document.getElementById("botForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent page reload

  const apiKey = document.getElementById("apiKey").value.trim();
  const secretKey = document.getElementById("secretKey").value.trim();
  const symbol = document.getElementById("symbol").value;

  if (!apiKey || !secretKey || !symbol) {
    return updateStatus("Please fill all fields before submitting.");
  }

  fetch(`${apiBase}/start-bot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ wallet, apiKey, secretKey, symbol }),
  })
    .then((res) => res.json())
    .then((data) => {
      updateStatus(data.message || "Bot started.");
    })
    .catch((err) => {
      updateStatus("Error starting bot: " + err.message);
    });
});

function startBot() {
  const apiKey = document.getElementById("apiKey").value.trim();
  const secretKey = document.getElementById("secretKey").value.trim();
  const symbol = document.getElementById("symbol").value;

  if (!apiKey || !secretKey || !symbol) {
    return updateStatus("Missing fields to start bot.");
  }

  fetch(`${apiBase}/start-bot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ wallet, apiKey, secretKey, symbol }),
  })
    .then((res) => res.json())
    .then((data) => {
      updateStatus(data.message || "Bot started.");
      fetchLogs(); // 🚀 Show logs immediately after start
    })
    .catch((err) => {
      updateStatus("Error: " + err.message);
    });
}

function stopBot() {
  fetch(`${apiBase}/stop-bot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ wallet }),
  })
    .then((res) => res.json())
    .then((data) => {
      updateStatus(data.message || "Bot stopped.");
    })
    .catch((err) => {
      updateStatus("Error: " + err.message);
    });
}

function updateStatus(msg) {
  document.getElementById("status").innerText = msg;
}

function fetchLogs() {
  fetch(`${apiBase}/logs/${wallet}`)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("logOutput").innerText = data || "No logs yet.";
    })
    .catch((err) => {
      document.getElementById("logOutput").innerText = "Error loading logs.";
    });
}

setInterval(fetchLogs, 10000); // fetch logs every 10 seconds
