import MindsDB, { ConnectionOptions, Database } from 'mindsdb-js-sdk';

class MindsDBConnector {
  private connectionState: boolean = false;
  private options: ConnectionOptions

  constructor(
    options: ConnectionOptions
  ) {
    this.options = options;
    MindsDB.connect(options).then(() => {
      // connection function does not return success status
      // so we use a "get all" to check for good connection
      return MindsDB.Databases.getAllDatabases();
    }).then(() => {
      this.connectionState = true;
      console.log('Connected to MindsDB');
    }).catch(err => {
      console.error("FAILED to connect to MindsDB");
    })
  }

  async connect() {
    try {
      await MindsDB.connect(this.options);
      await MindsDB.Databases.getAllDatabases();

      console.log('Connected to MindsDB');
      this.connectionState = true;

      return true;

    } catch (err) {
      console.error('Failed to connect to MindsDB:', err);
      this.connectionState = false;

      return false;
    }
  }

  async getAllDatabases(): Promise<[Database[] | null, Error | null]> {
    if (!this.connectionState) {
      return [null, Error('Not Connected to MindsDB')]
    } else {
      try {
        if (this.connectionState) return [await MindsDB.Databases.getAllDatabases(), null]
      } catch (err) {
        return [null, err]
      }
    }
  }

  async getDatabase(name: string): Promise<[Database | null, Error | null]> {
    if (!this.connectionState) {
      return [null, Error('Not Connected to MindsDB')]
    } else {
      try {
        return [await MindsDB.Databases.getDatabase(name), null]
      } catch (err) {
        return [null, err]
      }
    }
  }
}

export default MindsDBConnector;