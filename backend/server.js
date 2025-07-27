import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"
import mongoose from "mongoose"
import { connectdb } from "./database/db.js"
import authroute from "./routes/Auth.route.js"
import router from "./routes/Announcement.route.js"
import Adminroute from "./routes/Admin.route.js"

dotenv.config();

const app = express()

const port = process.env.PORT
const __dirname = path.resolve();

app.use(cors({
    origin:process.env.ORIGIN,
    methods: ["GET","POST","PUT","PATCH","DELETE"],
    credentials:true,

}))

app.use(cookieParser())
app.use(express.json())

app.use('/api/auth',authroute)
app.use('/api/Admin',Adminroute)
app.use('/api/announcements',router)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/frontend", "dist", "index.html"));
  });
}



const server = app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`) 
    connectdb()
})

