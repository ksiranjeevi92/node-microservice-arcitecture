const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cookieParser  =require('cookie-parser');
const expressValidator = require('express-validator');
const cors  = require('cors');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const app = express();

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log('database connected'));

app.use(expressValidator());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

//routes
app.use('/api',authRoute);
app.use('/api',userRoute);
app.use('/api', categoryRoute);
app.use('/api', productRoute);
// app.get('/', (req,res) => {
//     res.send('Hello from node')
// });


const port = process.env.PORT || 8000

app.listen(port,() => {
    console.log(`Sever is runnng on ${port}`);
});

