import * as dotenv from 'dotenv';
import * as fs from 'fs';

const nodeEnv = process.env.NODE_ENV || 'dev';
const envPath = `.env.${nodeEnv}`;
let data = process.env;

export default () => {
  try {
    if (fs.existsSync(envPath)) {
      data = dotenv.parse(fs.readFileSync(envPath));
    }
    return {
      nodeEnv: nodeEnv,
      serverPort: parseInt(data.SERVER_PORT, 10),
      database: {
        dbType: data.DB_TYPE,
        dbHost: data.DB_HOST,
        dbPort: parseInt(data.DB_PORT, 10),
        dbUserName: data.DB_USER_NAME,
        dbPassword: data.DB_PASSWORD,
        dbName: data.DB_NAME,
        dbSynchronize: data.DB_SYNCHRONIZE === 'true',
      },
    };
  } catch (e) {
    console.log(`Configuration error: ${e.toString()}`);
  }
};
