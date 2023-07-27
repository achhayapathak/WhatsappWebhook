// Import required modules
const express = require("express");
const body_parser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

// Load environment variables
const token = process.env.TOKEN;
const myToken = process.env.MYTOKEN;

// Create Express application
const app = express();

// Use body-parser middleware to parse incoming JSON data
app.use(body_parser.json());

// Define a route for the home page
app.get("/", (req, res) => {
  res.send("Starting point of our whatsapp bot");
});

// Define a route for the webhook verification
app.get("/webhook", (req, res) => {
  let mode = req.query["hub.mode"];
  let challenge = req.query["hub.challenge"];
  let token = req.query["hub.verify_token"];

  // Check if the provided mode and token match the expected values for subscription
  if (mode === "subscribe" && token === myToken) {
    // Send a challenge response to verify the webhook
    res.status(200).send(challenge);
  } else {
    // Return a 403 Forbidden status with a message for invalid tokens
    res.status(403).send("Subscription Failed: Invalid Token");
  }
});

// Define a route to handle incoming webhook events
app.post("/webhook", (req, res) => {
  let body = req.body;

  if (body.object) {
    if (
      body.entry &&
      body.entry[0].changes &&
      body.entry[0].changes[0].value.messages &&
      body.entry[0].changes[0].value.messages[0]
    ) {
      // Extract information from the incoming message payload
      let phone_id = body.entry[0].changes[0].value.metadata.phone_number_id;
      let from = body.entry[0].changes[0].value.messages[0].from;
      let msg = body.entry[0].changes[0].value.messages[0].text.body;

      // Send a response message using the axios library
      axios({
        method: "POST",
        url:
          "https://graph.facebook.com/v17.0/" +
          phone_id +
          "/messages?access_token=" +
          token,
        data: {
          messaging_product: "whatsapp",
          to: from,
          text: {
            body: "Your text was: " + msg,
          },
          headers: {
            "Content-Type": "application/json",
          },
        },
      }).then(() => {
          // Send a 200 OK status and a success message when the message is sent
          res.status(200).send("Message sent successfully");
        }).catch((error) => {
          // Send a 500 Internal Server Error status and an error message
          res.status(500).send("Error sending message");
        });
    } else {
      // Send a 400 Bad Request status and a message for invalid message data
      res.status(400).send("Invalid message data");
    }
  } else {
    // Send a 403 Forbidden status and a message for other errors
    res.status(403).send("Something went wrong");
  }
});

// Start the server on the specified port or default to 8080
app.listen(process.env.PORT || "8080", () => {
  console.log("Server Started");
});
