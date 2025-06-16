const API_URL = "https://c2ca1b7a2dabe00a426fcc6ac3f9873b.serveo.net"; // ← replace with your live tunnel link

document.getElementById("botForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const apiKey = document.getElementById("apiKey").value;
  const secretKey = document.getElementById("secretKey").value;

  const res = await fetch(`${API_URL}/submit_keys`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key: apiKey, secret_key: secretKey }),
  });

  const data = await res.json();
  document.getElementById("status").innerText = data.message || "Submitted!";
});

function startBot() {
  fetch(`${API_URL}/start_bot`).then(() =>
    document.getElementById("status").innerText = "Bot Started"
  );
}

function stopBot() {
  fetch(`${API_URL}/stop_bot`).then(() =>
    document.getElementById("status").innerText = "Bot Stopped"
  );
}
