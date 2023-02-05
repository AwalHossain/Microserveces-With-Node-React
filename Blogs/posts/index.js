const express = require("express");
const cors = require('cors');
const bodyParser  = require('body-parser');
const {randomBytes}  = require('crypto');
const app = express();
app.use(bodyParser.json());
app.use(cors());


const posts = {};

app.get("/posts", (req, res)=>{
    
    return res.send(posts);
})

app.post("/posts", (req, res)=>{
    const id  = randomBytes(4).toString('hex');
    const {content}  = req.body;

    posts[id] = {
        id,
        content
    }

    return res.status(201).send(posts[id])
})


app.listen(4000, ()=>{
    console.log(`This app is listenning on 4000`);
})