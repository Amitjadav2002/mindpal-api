const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

// Load .env variables
dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());


app.post('/api/run-workflow', async (req, res) => {
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

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error forwarding request to Mindpal:', error.message);
    res.status(500).json({ error: 'Failed to reach Mindpal API.' });
  }
});

app.get('/api/workflow-result', async (req, res) => {
    
    const { run_id } = req.query;
  
    if (!run_id) {
      return res.status(400).json({ error: 'Missing run_id in query' });
    }
  
    try {
      const response = await axios.get(
        'https://api-v3.mindpal.io/api/workflow-run-result/retrieve-by-id',
        {
          params: { run_id },
          headers: {
            'accept': 'application/json',
            'x-api-key': process.env.MINDPAL_API_KEY
          }
        }
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error fetching workflow result:', error.message);
      res.status(500).json({ error: 'Failed to fetch workflow result' });
    }
  });

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
