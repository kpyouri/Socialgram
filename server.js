const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const path = require('path');
const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB config
const db = require('./keys').mongoURI
//Connect to mongoDB
console.log(db);
mongoose
.connect(db)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport)

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

if (process.env.NODE_ENV === 'production') {
//set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const port = process.env.PORT || 7000;
app.listen(port,() => console.log(`Server running on port ${port}`));