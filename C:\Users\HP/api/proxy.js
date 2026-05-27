export default async function handler(req, res) {
  const path = req.url.replace('/api/proxy', '');
  const targetUrl = 'https://api.kie.ai' + path;
  
  const response = await fetch(targetUrl, {
    method: req.method,
    headers: {
      'Authorization': req.headers.authorization || '',
      'Content-Type': 'application/json'
    },
    body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
  });
  
  const data = await response.json();
  res.status(response.status).json(data);
}
