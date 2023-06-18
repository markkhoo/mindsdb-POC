import express from 'express';
import env from '../config/environment';
import MindsDBConnector from '../config/mindsdb';

// Create an instance of the MindsDBConnector
const mindsDB = new MindsDBConnector({ user: env.MINDSDB_USER, password: env.MINDSDB_PASS });
const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Hello World!',
    status: 'OK' 
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.get('/connect', async (req, res) => {
  const connection = await mindsDB.connect();

  if (connection) {
    res.status(200).json({ success: true, message: 'Connected to MindsDB' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to connect to MindsDB' });
  }
});

app.get('/databases', async (req, res) => {
  const [databases, error] = await mindsDB.getAllDatabases();

  if (error) res.status(500).json({ success: false, data: error });

  res.status(200).json({ success: true, data: databases });
})

app.get('/database/:dbname', async (req, res) => {
  const [database , error] = await mindsDB.getDatabase(req.params.dbname);

  if (error) res.status(500).json({ success: false, data: error });

  res.status(200).json({ success: true, data: database });
});

export default app;