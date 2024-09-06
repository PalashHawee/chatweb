//external imports
const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const path=require('path');
const cookieParser=require('cookie-parser');

//internal imports
const {notFoundHandler,errorHandler} = require('./middlewares/common/errorHandler')
const loginRouter=require('./router/loginRouter')
const usersRouter=require('./router/usersRouter')
const inboxRouter=require('./router/inboxRouter')


const app=express();
 dotenv.config();

// Connect to MongoDB

mongoose.connect(process.env.MONGO_CONNECTION_STRING, 
    {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log('Connected to MongoDB'))
.catch(err=>console.error(err));

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set view engine
app.set('view engine', 'ejs')

//set static assets
app.use(express.static(path.join(__dirname, 'public')));

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing settings
app.use('/',loginRouter)
app.use('/users',usersRouter)
app.use('/inbox',inboxRouter)

//404 handler
app.use(notFoundHandler);

//common error handler
app.use(errorHandler)

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
 });
