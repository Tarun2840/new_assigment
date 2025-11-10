// WeatherModule.jsx placeholder
import { useState } from 'react';


export default function WeatherModule() {
const [city, setCity] = useState('India');
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');


async function fetchWeather() {
setLoading(true);
setError('');
setData(null);
try {
const res = await fetch(`http://localhost:3001/api/weather?city=${encodeURIComponent(city)}`);
const json = await res.json();
if (!res.ok || !json.ok) throw new Error(json.error || 'Bad response');
setData(json.data);
} catch (err) {
setError(err.message || 'Could not load weather');
} finally {
setLoading(false);
}
}


return (
<section className="card">
<h2>Weather</h2>
<div className="row">
<input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City name" />
<button onClick={fetchWeather}>Get</button>
</div>


{loading && <p className="muted">Loading...</p>}
{error && <p className="error">{error}</p>}


{data && (
<div className="result">
<p><strong>City:</strong> {data.city}</p>
<p><strong>Temp:</strong> {data.temperature_c} °C</p>
<p><strong>Condition:</strong> {data.condition}</p>
{data.note && <p className="muted">(returned mocked data — add OPENWEATHER_API_KEY in server .env to get live data)</p>}
</div>
)}
</section>
);
}