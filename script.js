const API_URL = "https://c2ca1b7a2dabe00a426fcc6ac3f9873b.serveo.net";

document.getElementById("startBtn").addEventListener("click", async () => {
    const apiKey = document.getElementById("apiKey").value;
    const secretKey = document.getElementById("secretKey").value;
    const symbol = document.getElementById("symbol").value;

    const res = await fetch(`${API_URL}/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: apiKey, secret_key: secretKey, symbol }),
    });

    const data = await res.json();
    alert(data.message);
});

document.getElementById("stopBtn").addEventListener("click", async () => {
    const res = await fetch(`${API_URL}/stop`, {
        method: "POST",
    });
    const data = await res.json();
    alert(data.message);
});
