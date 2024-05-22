import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const API_KEY = process.env.API_KEY;
const port = 3001;
app.get("/hello", function (req, res) {
 const address=req.query.address

 const url=`https://api.openweathermap.org/data/2.5/weather?q=${address}&units=metric&appid=${API_KEY}`
});

app.listen(3000, () => {
  console.log(`server runnig on port ${port}`);
});
