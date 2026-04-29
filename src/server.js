import {dbConnection} from "./config/database.js";
import dotenv from "dotenv";
import express from "express";
import {syncModels} from "./model/index.js";
import bookRoutes from "./routes/book.routes.js";


dotenv.config();

const app = express();

app.use(express.json());
app.use(bookRoutes)


const startServer = async () => {
    await dbConnection();
    await syncModels();
    app.listen(process.env.PORT || 8080, () => {
        console.log('Server started on port 8080');

    })
};


startServer();