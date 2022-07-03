const express = require("express"); // import express module (simplifies routing/requests, among other things)
const { request } = require("http");
const app = express(); // create an instance of the express module (app is the conventional variable name used)
const fetch = require("node-fetch"); // import node-fetch (enables the fetch API to be used server-side)
const PORT = process.env.PORT || 5000; // use either the host env var port (PORT) provided by Heroku or the local port (5000) on your machine
const { Client } = require("podcast-api");

console.log("Starting");

const client = Client({
  apiKey: process.env.LISTEN_API_KEY || null,
});

app.get("/", (req, res) => {
  client
    .search({
      q: "elon musk",
    })
    //.then((res) => res.json()) // return a promise containing the response
    .then((json) => {
      //console.log(response.data);
      res.send(
        `<h1>Got a response - trying to figure out how to handle it!</h1><p>Received ${json.data.count} podcast details in ${json.data.took} seconds</p>`
      );
    })
    .catch((error) => {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            // Endpoint not exist or podcast / episode not exist
            break;
          case 401:
            // Wrong API key, or your account is suspended
            break;
          case 400:
            // Invalid parameters
            break;
          case 500:
            // Server-side error
            break;
          default:
            // Unknown errors
            break;
        }
      } else {
        // Failed to connect to Listen API servers
      }
      console.log(error);
    });
});
/*
app.get("/", (req, res) => {
  // send a get request to root directory ('/' is this file (app.js))
  fetch("http://www.boredapi.com/api/activity/") // fetch activity from bored API - https://www.boredapi.com/about
    .then((res) => res.json()) // return a promise containing the response
    .then((json) => res.send(`<h1>Today's Activity: ${json.activity}!</h1>`)) // extract the JSON body content from the response (specifically the activity value) and sends it to the client
    .catch(function (err) {
      // catch any errors
      console.log(err); // log errors to the console
    });
});
*/
app.listen(PORT, () => {
  // start server and listen on specified port
  console.log(`App is running on ${PORT}`); // confirm server is running and log port to the console
});
