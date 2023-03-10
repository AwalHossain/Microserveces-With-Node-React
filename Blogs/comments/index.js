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

   
    comments.push({id: commentId, content, status: "pending"});
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
          id:commentId,
          content,
          postId: req.params.id,
          status: "pending"
        },
      });

    return res.status(201).send(commentsByPostId[req.params.id])
})



app.post("/events", async (req, res)=>{
    console.log("Event Received", req.body.type);

    const {type, data} = req.body;

    if(type === "CommentModerated"){
        const {id, postId, content, status}  = data;
        console.log("comment", data);
        const comments = commentsByPostId[postId];

      const comment = comments.find((comment)=>{
            return comment.id == id;
        })
        comment.status = status;
        console.log("cheick", status);
        await axios.post("http://localhost:4005/events",{
            type:"CommentUpdated",
            data:{
                id,
                postId,
                content,
                status
            }
        })

    }

    return res.send({});
});



app.listen(4000, ()=>{
    console.log(`Comments app is listenning on 4000`);
})