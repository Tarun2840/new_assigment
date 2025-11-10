require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// -------------------- QUOTES API --------------------
const QUOTES = [
  { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
  { text: "You learn more from failure than from success.", author: "Unknown" },
  { text: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi" },
  { text: "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you.", author: "Steve Jobs" }
];

app.get('/api/quote', (req, res) => {
  try {
    const idx = Math.floor(Math.random() * QUOTES.length);
    res.json({ ok: true, quote: QUOTES[idx] });
  } catch (err) {
    console.error('Quote error:', err.message);
    res.status(500).json({ ok: false, error: 'Could not fetch quote.' });
  }
});

// -------------------- WEATHER API --------------------
// Example: /api/weather?city=London
app.get('/api/weather', async (req, res) => {
  try {
    const city = (req.query.city || 'London').trim();
    const key = process.env.OPENWEATHER_API_KEY;

    if (!key) {
      // Fallback mock data
      return res.json({
        ok: true,
        data: {
          city,
          temperature_c: 24.5,
          condition: "Partly Cloudy (mocked)"
        },
        note: "No API key found — returning mock weather data."
      });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${key}&units=metric`;
    const response = await axios.get(url);
    const weather = response.data;

    res.json({
      ok: true,
      data: {
        city: weather.name,
        temperature_c: weather.main.temp,
        condition: weather.weather[0].description
      }
    });
  } catch (err) {
    console.error('Weather error:', err.message);
    res.status(500).json({ ok: false, error: 'Could not fetch weather data.' });
  }
});

//currency
// --- Currency endpoint (Offline Guaranteed Version) ---
// Example: /api/currency?amount=100
app.get("/api/currency", (req, res) => {
  try {
    const amountRaw = req.query.amount;
    if (!amountRaw)
      return res.status(400).json({ ok: false, error: "Query param 'amount' is required." });

    const amount = Number(amountRaw);
    if (Number.isNaN(amount) || amount <= 0)
      return res.status(400).json({ ok: false, error: "Invalid amount." });

    // ✅ Completely offline static conversion rates
    // 1 INR = 0.012 USD, 1 INR = 0.011 EUR
    const INR_TO_USD = 1.20;
    const INR_TO_EUR = 1.10;

    const usd = (amount * INR_TO_USD).toFixed(4);
    const eur = (amount * INR_TO_EUR).toFixed(4);

    res.json({
      ok: true,
      input: { amount, base: "INR" },
      result: { USD: Number(usd), EUR: Number(eur) },
      source: "local-static",
      message: "Using offline conversion rates (no internet required)",
    });
  } catch (err) {
    console.error("❌ Currency conversion error:", err.message);
    res.status(500).json({ ok: false, error: "Currency conversion failed." });
  }
});


// -------------------- HEALTH CHECK --------------------
app.get('/', (req, res) => {
  res.send({ ok: true, message: 'InfoHub backend is running.' });
});

// -------------------- START SERVER --------------------
app.listen(PORT, () => {
  console.log(`✅ InfoHub server running at http://localhost:${PORT}`);
});
