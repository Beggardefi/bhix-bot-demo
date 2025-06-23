const SERVER_URL = "http://<YOUR_TERMUX_IP>:8000"; // Update with your local IP

async function startBot() {
  const wallet = document.getElementById("wallet").value;
  const apiKey = document.getElementById("apiKey").value;
  const secretKey = document.getElementById("secretKey").value;
  const symbol = document.getElementById("symbol").value;
  const strategy = document.getElementById("strategy").value;
  const market = document.getElementById("market").value;

  const response = await fetch(`${SERVER_URL}/start-bot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wallet, apiKey, secretKey, symbol, strategy, market })
  });

  const data = await response.json();
  alert(data.message);
  fetchLogs(wallet);
  fetchSummary(wallet);
}

async function stopBot() {
  const wallet = document.getElementById("wallet").value;

  const response = await fetch(`${SERVER_URL}/stop-bot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wallet })
  });

  const data = await response.json();
  alert(data.message);
}

async function fetchLogs(wallet) {
  const res = await fetch(`${SERVER_URL}/logs/${wallet}`);
  const text = await res.text();
  document.getElementById("logOutput").innerText = text;
}

async function fetchSummary(wallet) {
  try {
    const res = await fetch(`logs/${wallet}_summary.json`);
    const summary = await res.json();
    document.getElementById("summaryOutput").innerText = JSON.stringify(summary, null, 2);
  } catch {
    document.getElementById("summaryOutput").innerText = "No summary found.";
  }
}

// Live TradingView Widget
new TradingView.widget({
  "container_id": "tradingview_chart",
  "autosize": true,
  "symbol": "BINANCE:BTCUSDT",
  "interval": "15",
  "timezone": "Etc/UTC",
  "theme": "dark",
  "style": "1",
  "locale": "en",
  "toolbar_bg": "#1b1b2f",
  "enable_publishing": false,
  "allow_symbol_change": true,
  "hide_side_toolbar": false
});
