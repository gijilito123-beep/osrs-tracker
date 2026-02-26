const https = require('https');

module.exports = (req, res) => {
  const { path } = req.query;
  
  if (!path) {
    return res.status(400).json({ error: 'Path requerido' });
  }

  const url = `https://prices.runescape.wiki/api/v1/osrs/${path}`;
  
  https.get(url, (response) => {
    let data = '';
    response.on('data', chunk => data += chunk);
    response.on('end', () => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(data);
    });
  }).on('error', (err) => {
    res.status(500).json({ error: err.message });
  });
};
