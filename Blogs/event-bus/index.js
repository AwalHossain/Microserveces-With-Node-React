const express = require("express");
const cors = require('cors');
const bodyParser  = require('body-parser');
const {randomBytes}  = require('crypto');
const { default: axios } = require("axios");
const app = express();
app.use(bodyParser.json());
app.use(cors());


const events = [];

app.post("/events",async(req, res)=>{
    const event = req.body;

    events.push(event);
   
 await axios.post('http://localhost:4000/events', event);
 await axios.post('http://localhost:4001/events', event);
 await axios.post('http://localhost:4002/events', event);
 await axios.post('http://localhost:4003/events', event);

 return res.send({status: "OK"});
})


app.get("/events", (req, res)=>{
    console.log("isj ist");
    res.send(events);
})


app.listen(4005, ()=>{
    console.log(`Event-bus app is running on 4005`);
})