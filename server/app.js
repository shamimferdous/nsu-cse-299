const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const upload = require('express-fileupload');
app.use(express.static("./public"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }))
// app.use(upload());



//database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log(`Server established connection with MongoDB Atlas successfully...`)
});


//importing routers
const userRouter = require('./routes/users');
const driveRouter = require('./routes/drive');
const driveV2Router = require('./routes/driveV2');


//using routers
app.use('/api/users', userRouter);
app.use('/api/drive', driveRouter);
app.use('/api/driveV2', driveV2Router);


//firing server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server fired on port ${PORT}...`);
});