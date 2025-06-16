const API_URL = "https://c2ca1b7a2dabe00a426fcc6ac3f9873b.serveo.net";  // your serveo/ngrok link

document.getElementById("startBtn").addEventListener("click", async () => {
    const apiKey = document.getElementById("apiKey").value;
    const secretKey = document.getElementById("secretKey").value;
    const symbol = document.getElementById("symbol").value;
    const status = document.getElementById("status");

    if (!apiKey || !secretKey || !symbol) {
        status.textContent = "Please fill all fields.";
        return;
    }

    try {
        const res = await fetch(`${API_URL}/start`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ api_key: apiKey, secret_key: secretKey, symbol }),
        });

        const data = await res.json();
        status.textContent = data.message || "Bot started.";
    } catch (err) {
        status.textContent = "Error starting bot.";
        console.error(err);
    }
});

document.getElementById("stopBtn").addEventListener("click", async () => {
    const status = document.getElementById("status");

    try {
        const res = await fetch(`${API_URL}/stop`, {
            method: "POST",
        });
        const data = await res.json();
        status.textContent = data.message || "Bot stopped.";
    } catch (err) {
        status.textContent = "Error stopping bot.";
        console.error(err);
    }
});
