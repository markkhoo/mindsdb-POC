import MindsDB from 'mindsdb-js-sdk';
import env from './environment';

class MindsDBConnector {
  constructor() {
    // Initialize any necessary variables or configurations
  }

  async connectToMindsDB() {
    try {
      await MindsDB.connect({
        user: env.MINDSDB_USER,
        password: env.MINDSDB_PASS,
      });
      console.log('Connected to MindsDB');
      return true;
    } catch (error) {
      console.error('Failed to connect to MindsDB:', error.message);
      return false;
    }
  }

  async getDatabase(name: string) {
    try {
      return await MindsDB.Databases.getDatabase(name);
    } catch (error) {
      console.error('Failed to get database:', error.message);
    }
  }
}

export default MindsDBConnector;