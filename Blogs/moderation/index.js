const express = require("express");
const bodyParser  = require('body-parser');
const { default: axios } = require("axios");

const app = express();
app.use(bodyParser.json());



app.post("/events", async (req, res)=>{
    const {type, content, id, postId} = req.body.data;

    if(type === 'CommentCreated'){
     const status = content.includes('orange') ? "Rejected": "approved";

        await axios.post('http://localhost:4005/events',{
            type:"CommentModerated",
            data:{
                id,
                postId,
                status,
                content
            }   
        })
    }

    res.send({status: "ok"});
})







app.listen(4003, ()=>{
    console.log(`Moderation app is running on 4003`);
})