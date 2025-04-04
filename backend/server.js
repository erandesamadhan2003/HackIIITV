import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createServer } from 'node:http';

dotenv.config();

const app = express();
const server = createServer(app);

app.use(express.json());

const corsOption = {
    origin: `http://localhost:5173`,
    credentials: true,
  };
app.use(cors(corsOption));

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> {
    console.log(`Server is Running on the PORT ${PORT}`);
})