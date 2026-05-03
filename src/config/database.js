import dotenv from 'dotenv';
import {Sequelize} from 'sequelize';

dotenv.config();

//Create a new Sequelize instance


const sequelize = new Sequelize(
    process.env.DB_NAME || 'test',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: process.env.DB_DIALECT || 'mysql',
      port: process.env.DB_PORT || 3306,
      logging: process.env.NODE_ENV==='development'?console.log:false,
      define:{
            timestamps:false
        }
    })

//DB connection

const dbConnection = async () => {
    try{
        await sequelize.authenticate();
        console.log('DB connected');
    }catch(error){
        console.log('DB connection error', error);
    }
};

export {sequelize, dbConnection}
