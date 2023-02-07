const express = require("express");
const cors = require('cors');
const bodyParser  = require('body-parser');
const {randomBytes}  = require('crypto');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const { default: axios } = require("axios");

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res)=>{
    
    return res.send(commentsByPostId[req.params.id]);
})

app.post("/posts/:id/comments",async (req, res)=>{
    const commentId  = randomBytes(4).toString('hex');
    const {content}  = req.body;
    const comments = commentsByPostId[req.params.id] || [];

   
    comments.push({id: commentId, content});
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
          id:commentId,
          content,
          postID: req.params.id,
        },
      });

    return res.status(201).send(commentsByPostId[req.params.id])
})



app.post("/events", (req, res)=>{
    console.log("Event Received", req.body.type);

    return res.send({});
});



app.listen(4000, ()=>{
    console.log(`Comments app is listenning on 4000`);
})