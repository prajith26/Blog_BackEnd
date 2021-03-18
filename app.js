const express = require('express');
// const bodyparser = require("body-parser");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
// app.use(bodyparser.json());
// app.use(express.urlencoded({extended:true}));
app.use(express.urlencoded({limit: '50mb'},{extended:true}));
app.use(express.json({limit: '50mb'}));

//Database Connection
const db_url="mongodb+srv://userone:userone@fsdfiles.jxcel.mongodb.net/BlogDb?retryWrites=true&w=majority";
mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (error)=>{
    if(!error)
    {
        console.log('Success - Database Connected.');
    }
    else{
        console.log('Error - Unable to connect Database.')
    }
});

const loginRouter = require('./src/routes/loginRoutes');
app.use('/login',loginRouter);

const registerRouter = require('./src/routes/registerRoutes');
app.use('/register',registerRouter);

const userRouter = require('./src/routes/userRoutes');
app.use('/user',userRouter);

const adminRouter = require('./src/routes/adminRoutes');
app.use('/admin',adminRouter);

const rootRouter = require('./src/routes/rootRoutes');
app.use('/root',rootRouter);

app.get('/',(req,res)=>{
    res.send('Invalid');
});


app.listen(port,(error)=>{
    if(!error)
    {
        console.log("Server Ready at "+port);
    }
    else
    {
        console.log("Error Occured");
    }
});