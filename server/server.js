const express = require('express');
const app = express();
const cors = require('cors')
const corsOptions = {
    origin: "http://localhost:5173"
} 

app.use(cors(corsOptions));

app.get('/api',(req, res)=>{
    res.json({1:['apple','ball','cat']})
})

app.listen(8080, ()=>{
    console.log('Server started on Port 8080')
})

