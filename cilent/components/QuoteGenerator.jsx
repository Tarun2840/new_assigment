// QuoteGenerator.jsx placeholder
import { useState } from 'react';


export default function QuoteGenerator(){
const [quote, setQuote] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');


async function loadQuote(){
setLoading(true); setError(''); setQuote(null);
try{
const res = await fetch('http://localhost:3001/api/quote');
const json = await res.json();
if(!res.ok || !json.ok) throw new Error(json.error || 'Bad response');
setQuote(json.quote);
}catch(err){
setError(err.message || 'Could not get quote');
}finally{ setLoading(false); }
}


return (
<section className="card">
<h2>Motivational Quote</h2>
<div className="row">
<button onClick={loadQuote}>New Quote</button>
</div>


{loading && <p className="muted">Loading...</p>}
{error && <p className="error">{error}</p>}


{quote && (
<div className="result">
<blockquote>“{quote.text}”</blockquote>
<p className="muted">— {quote.author || 'Unknown'}</p>
</div>
)}
</section>
);
}