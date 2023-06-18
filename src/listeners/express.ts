import express from 'express';
import MindsDBConnector from '../config/mindsdb';

// Create an instance of the MindsDBConnector
const mindsDB = new MindsDBConnector();
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
  const connection = await mindsDB.connectToMindsDB();

  if (connection) {
    res.status(200).json({ status: 'OK' });
  } else {
    res.status(500).json({ status: 'ERROR' });
  }
});

app.get('/database/:dbname', async (req, res) => {
  const dbName = req.params.dbname;
  const database = await mindsDB.getDatabase(dbName);

  console.log(database);

  res.status(200).json({ status: 'OK' });
});

export default app;