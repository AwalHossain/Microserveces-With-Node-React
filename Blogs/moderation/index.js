const express = require("express");
const bodyParser  = require('body-parser');
const { default: axios } = require("axios");

const app = express();
app.use(bodyParser.json());



app.post("/events", async (req, res)=>{
    const {type,data} = req.body;
    
    // console.log(req.body,"hunts");
    if(type == "CommentCreated"){
        const { content, id, postId} = data;
     const status = content.includes('orange') ? "Rejected": "approved";
     console.log(postId,"id is work");
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