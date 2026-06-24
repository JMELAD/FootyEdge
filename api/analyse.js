// api/analyse.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Method not allowed' } });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: { message: 'GROQ_API_KEY is not set in Vercel' } });
  }

  try {
    const { messages } = req.body || {};
    if (!messages) {
      return res.status(400).json({ error: { message: 'No messages provided' } });
    }

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'qwen/qwen3.6-27b',
        messages: messages,
        temperature: 0.5,
        max_tokens: 2000
      })
    });

    const data = await groqResponse.json();
    return res.status(groqResponse.status).json(data);

  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
}
