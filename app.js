const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res) {
  var city = req.body.CityName;
  var query = city;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=9546c38112a6c8cac384305985e0a6b6";
  https.get(url, function(response) {
    response.on("data",function(data) {
      var weatherData = JSON.parse(data);
      var temp = weatherData.main.temp;
      var weatherDescriptions = weatherData.weather[0].description;
      var image = weatherData.weather[0].icon;
      var imageUrl = "http://openweathermap.org/img/wn/" + image + "@2x.png";
      res.write("<h1>The curennt temprature of "+ query+" is " + temp +" degrees Fahrenhiet.</h1>")
      res.write("<h2>The current weather description is " + weatherDescriptions +".</h2>")
      res.write("<img src=" +imageUrl +">")
      res.send();
    })
  });
})

app.listen(3000, function() {
  console.log("Your Server has started running");
})
