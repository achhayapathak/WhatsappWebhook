const express = require('express');
const body_parser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const token = process.env.TOKEN;
const myToken = "Achhaya";

const app = express();

app.use(body_parser.json());

app.get('/', (req, res) => {
    console.log("home");
    res.send("Starting point of our whatsapp bot")
});

app.get('/webhook', (req, res) => {
    let mode = req.query["hub.mode"];
    let challenge = req.query["hub.challenge"];
    let token = req.query["hub.verify_token"];
  
    console.log(mode + challenge + token);
  
    if (mode === "subscribe" && token === myToken) {
      console.log("success");
      res.status(200).send(challenge);
    } else {
      console.log("subscription failed");
      res.status(403).send("Subscription Failed: Invalid Token");
    }
  });
  


app.post("/webhook", (req, res) => {
    let body = req.body;
    console.log(JSON.stringify(body));
    
    if(body.object) {
        if(
            body.entry &&
            body.entry[0].changes &&
            body.entry[0].changes[0].value.messages &&
            body.entry[0].changes[0].value.messages[0]
            ) {
                let phone_id = body.entry[0].changes[0].value.metadata.phone_number_id; 
                let from = body.entry[0].changes[0].value.messages[0].from; 
                let msg = body.entry[0].changes[0].value.messages[0].text.body; 
                
                axios({
                    method: "POST",
                    url: "https://graph.facebook.com/v17.0/" + phone_id + "/messages?access_token=" + token,
                    data: {
                        messaging_product: "whatsapp",
                        to: from,
                        text: {
                            body: "Your text was: " + msg 
                        },
                        headers: {
                            "Content-Type" : "application/json"
                        }
                    }
                });
                
                console.log("Message sent successfully");
                res.status(200);

            } 
    } else {
        console.log("Something went wrong")
        res.status(403);
    }

});

    
    
app.listen(process.env.PORT || '8080', () => {
    console.log("Server Started");
})