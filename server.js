import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();
const app = express();

const API_KEY = process.env.API_KEY;
const port = 3001;

app.get("/", function (req, res) {
  const address = req.query.address; 

  if (!address) {
    return res.status(400).send("Please provide an address.");
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&units=metric&appid=${API_KEY}`;
  axios
    .get(url)
    .then((response) => {
      const data = response.data;
      const cityName = data.name;
      const temperature = data.main.temp;
      const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleString();

      const message = `City Name: ${cityName} <br> Temperature: ${temperature}&deg; C <br> Sunset Time: ${sunsetTime}`;

      // Read the HTML file and insert the message into it
      fs.readFile("index.html", "utf8", (err, htmlData) => {
        if (err) {
          console.log(err);
          return res.status(500).send("An error occurred while reading the HTML file.");
        }

        // Insert the message into a placeholder in the HTML file
        const updatedHtml = htmlData.replace("{{message}}", message);
        res.send(updatedHtml);
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error occurred while fetching the weather data.");
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
