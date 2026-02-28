export default async function handler(req, res) {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: 'Query parameter required' });
  }

  try {
    const response = await fetch(`https://prices.runescape.wiki/api/v1/osrs/search?q=${encodeURIComponent(q)}`);
    const data = await response.json();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'application/json');
    
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch from API' });
  }
}
