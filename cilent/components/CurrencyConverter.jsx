import { useState } from "react";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Make sure this points to your backend port
  const API_BASE = "http://localhost:3001";

  async function convert() {
    if (!amount || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`${API_BASE}/api/currency?amount=${encodeURIComponent(amount)}`);
      const json = await res.json();

      if (!res.ok || !json.ok) throw new Error(json.error || "Bad response from server");
      setResult(json.result);
    } catch (err) {
      console.error("Currency Fetch Error:", err.message);
      setError("Could not fetch currency data. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card">
      <h2 className="headingCurrency">💱 Currency Converter (INR → USD / EUR)</h2>

      <div className="row">
        <input
          type="number"
          value={amount}
          min="1"
          placeholder="Enter amount in INR"
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={convert}>Convert</button>
      </div>

      {loading && <p className="muted">Converting...</p>}
      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result">
          <p><strong>Input:</strong> ₹{amount} INR</p>
          <p><strong>USD:</strong> ${result.USD}</p>
          <p><strong>EUR:</strong> €{result.EUR}</p>
          <p className="muted">Rates source: Offline static</p>
        </div>
      )}
    </section>
  );
}
