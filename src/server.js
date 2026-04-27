import {dbConnection} from "./config/database.js";
import dotenv from "dotenv";
import app from "express/lib/application.js";
import {syncModels} from "./model/index.js";


dotenv.config();


const startServer = async () => {
    await dbConnection();
    await syncModels();
    app.listen(process.env.PORT || 8080, () => {
        console.log('Server started on port 8080');

    })
};


startServer();