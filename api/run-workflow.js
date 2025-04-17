import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await axios.post(
      'https://api-v3.mindpal.io/api/workflow/run?workflow_id=67f8293957be881abb66f28b',
      req.body.data,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.MINDPAL_API_KEY
        }
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to reach Mindpal API' });
  }
}