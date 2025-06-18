const apiBase = "https://c2ca1b7a2dabe00a426fcc6ac3f9873b.serveo.net"; // replace if changed
      const apiBase = "https://your-serveo-link.serveo.net"; // Replace with actual backend

const wallet = "demo_" + Math.random().toString(36).substring(2, 10);

// Handle form submission
document.getElementById("botForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const apiKey = document.getElementById("apiKey").value.trim();
  const secretKey = document.getElementById("secretKey").value.trim();
  const symbol = document.getElementById("symbol").value;
  const strategy = document.getElementById("strategy").value;
  const market = document.getElementById("market").value;

  if (!apiKey || !secretKey || !symbol || !strategy || !market) {
    return updateStatus("⚠️ Please fill all fields before submitting.");
  }

  // Start bot
  fetch(`${apiBase}/start-bot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wallet, apiKey, secretKey, symbol, strategy, market }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        alert(data.message);
        updateStatus("✅ Bot connected and started.");
        fetchLogs();
      } else {
        updateStatus("❌ Unexpected response from server.");
      }
    })
    .catch((err) => {
      updateStatus("❌ Error: " + err.message);
    });
});

// Stop bot
function stopBot() {
  fetch(`${apiBase}/stop-bot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wallet }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message || "Bot stopped.");
      updateStatus("🛑 Bot stopped.");
    })
    .catch((err) => {
      updateStatus("❌ Error stopping bot: " + err.message);
    });
}

function updateStatus(msg) {
  document.getElementById("status").innerText = msg;
}

function fetchLogs() {
  fetch(`${apiBase}/logs/${wallet}`)
    .then((res) => {
      if (!res.ok) throw new Error("Log fetch failed");
      return res.text();
    })
    .then((data) => {
      document.getElementById("logOutput").innerText = data || "📄 No logs yet.";
    })
    .catch((err) => {
      document.getElementById("logOutput").innerText = "⚠️ Error loading logs.";
    });
}

// Auto-update logs every 10 seconds
setInterval(fetchLogs, 10000);
