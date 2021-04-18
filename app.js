const mongoose = require('mongoose'); // third party -- 
const express = require('express'); // third party --
const bodyParser = require('body-parser'); // core module --
const cors = require('cors')

 require('./database/db');
const user_route = require('./routes/user_route');
const product_route =require('./routes/product_route');
const bodytype_route = require('./routes/bodytype_route');

//////////////////////// 
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended : false}))
app.use(user_route);
app.use(product_route);
app.use(bodytype_route)




app.listen(90);