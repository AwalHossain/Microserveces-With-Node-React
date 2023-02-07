const express = require("express");
const cors = require('cors');
const bodyParser  = require('body-parser');



const app = express();
app.use(bodyParser.json());
app.use(cors());





app.listen(4002, ()=>{
    console.log(`Query app is running on 4002`);
})