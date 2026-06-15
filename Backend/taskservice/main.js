import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB }
from "./config/db.js";

import taskRoutes
from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

await connectDB();

app.use(
    "/tasks",
    taskRoutes
);

app.get(
    "/",
    (req,res)=>{
        res.json({
            service:
            "ACP Task Service Running"
        });
    }
);

const PORT =
process.env.PORT || 5000;

app.listen(
    PORT,
    ()=>{
        console.log(
            `Server Running On ${PORT}`
        );
    }
);