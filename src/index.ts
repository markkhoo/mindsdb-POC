import app from './listeners/express';
import MindsDBConnector from './config/mindsdb';

console.log("App is starting...");

app.listen(3003, () => {
  console.log(`Express running on port: ${3003}`);
});

// Create an instance of the MindsDBConnector
const mindsDB = new MindsDBConnector();

// Connect to MindsDB
mindsDB.connectToMindsDB();

mindsDB.getDatabase("models")