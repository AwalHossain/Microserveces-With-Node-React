const express = require("express");
const cors = require('cors');
const bodyParser  = require('body-parser');



const app = express();
app.use(bodyParser.json());
app.use(cors());


const posts = {};

app.get("/posts",()=>{
    res.send(posts)
})


app.post("/events", (req,res)=>{
    const {type, data} = req.body;

    if(type == "PostCreated"){
        const {id, title} = data;
        posts[id] = {
            id,
            title,
            comments: []
        }
    }

    if(type === "CommentCreated"){
        const {id, content, postID}  = data;
        const post = posts[postID];

        post.comments.push({id, content});
    }

    console.log(posts)
    res.send({status:"ok"})

})



app.listen(4002, ()=>{
    console.log(`Query app is running on 4002`);
})