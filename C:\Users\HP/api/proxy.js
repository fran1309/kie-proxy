export default async function handler(req, res) {
  const targetUrl = 'https://api.kie.ai' + req.url;
  
  let body = undefined;
  if (req.method !== 'GET') {
    body = JSON.stringify(req.body);
  }

  const response = await fetch(targetUrl, {
    method: req.method,
    headers: {
      'Authorization': req.headers['authorization'] || '',
      'Content-Type': 'application/json'
    },
    body: body
  });
  
  const data = await response.json();
  res.status(response.status).json(data);
}
