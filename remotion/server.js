
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.post('/render', async (req, res) => {
  console.log('Render job', req.body.job_id);
  res.json({ status: 'queued', job_id: req.body.job_id });
});
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.listen(3001, () => console.log('Remotion on 3001'));
