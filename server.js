const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');

const app = express();
require('dotenv').config();
const PORT = process.env.PORT
const routes = require('./routes');

// MIDDLEWARE

// CORS

const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

//bodyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Expression Session - Authentication
app.use(session({
  store: new MongoStore({url:
  process.env.MONGODB_URI}),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2,
  }
}));

app.get('/', (req, res) => {
  res.send('<h1>THFS API</h1>');
});

app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/cast', routes.cast);
app.use('/api/v1/users', routes.users);
app.use('/api/v1/comments', routes.comments);

app.listen(process.env.PORT || 4000, () => console.log (`Server connected at http://localhost:${PORT}`));