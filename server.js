const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoutes = require("./routes/authRoutes")
const tasksRoutes = require("./routes/tasksRoutes")

dotenv.config()

const app = express()
app.use(express.json())

mongoose
 .connect(process.env.MONGO_URI)
 .then(()=> console.log("MONGODB BAĞLATISI BAŞARILI"))
 .catch((err)=> console.log("MONGODB BAĞLATI HATASI:",err))

 app.use("/api/auth",authRoutes)
 app.use("/api/tasks",tasksRoutes)

 const PORT = process.env.PORT || 5000;

 app.listen(PORT, ()=>{
    console.log(`Server ${PORT}portunda çalşıyor`)
 })