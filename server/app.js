const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const upload = require('express-fileupload');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(upload());



//database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log(`Server established connection with MongoDB Atlas successfully...`)
});


//importing routers
const userRouter = require('./routes/users');


//using routers
app.use('/api/users', userRouter);


//firing server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server fired on port ${PORT}...`);
});