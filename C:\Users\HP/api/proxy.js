export default async function handler(req, res) {
  const targetUrl = 'https://api.kie.ai/api/v1/jobs/createTask';
  
  // Passa tutti gli header di n8n a kie.ai (tranne host)
  const forwardHeaders = {};
  for (const [key, value] of Object.entries(req.headers)) {
    if (key.toLowerCase() !== 'host') {
      forwardHeaders[key] = value;
    }
  }
  forwardHeaders['content-type'] = 'application/json';

  const response = await fetch(targetUrl, {
    method: 'POST',
    headers: forwardHeaders,
    body: JSON.stringify(req.body)
  });
  
  const text = await response.text();
  try {
    res.status(response.status).json(JSON.parse(text));
  } catch(e) {
    res.status(response.status).send(text);
  }
}
