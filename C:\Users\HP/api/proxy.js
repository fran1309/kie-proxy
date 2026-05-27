export default async function handler(req, res) {
  const targetUrl = 'https://api.kie.ai/api/v1/jobs/createTask';
  
  const response = await fetch(targetUrl, {
    method: 'POST',
    headers: {
      'Authorization': req.headers['authorization'] || '',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  });
  
  const text = await response.text();
  try {
    const data = JSON.parse(text);
    res.status(response.status).json(data);
  } catch(e) {
    res.status(response.status).send(text);
  }
}
