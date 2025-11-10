// Main Next.js page placeholder (see doc)
import { useState } from 'react';
import WeatherModule from '../components/WeatherModule';
import CurrencyConverter from '../components/CurrencyConverter';
import QuoteGenerator from '../components/QuoteGenerator';


export default function Home() {
const [tab, setTab] = useState('Weather');
const tabs = ['Weather', 'Currency', 'Quotes'];


return (
<div className="container">
<header className="header">
<h1>InfoHub</h1>
<p className="sub">Weather • INR → USD/EUR • Motivational Quotes</p>
</header>


<nav className="tabs">
{tabs.map((t) => (
<button key={t} className={t === tab ? 'tab active' : 'tab'} onClick={() => setTab(t)}>{t}</button>
))}
</nav>


<main className="main">
{tab === 'Weather' && <WeatherModule />}
{tab === 'Currency' && <CurrencyConverter />}
{tab === 'Quotes' && <QuoteGenerator />}
</main>


<footer className="footer">Built for ByteXL • Simple InfoHub demo</footer>
</div>
);
}