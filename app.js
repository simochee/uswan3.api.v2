const express = require('express');
const app = express();

// body-parserを設定
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// サーバを起動
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// DBへ接続
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/uswan-api');

// CORSを許可する
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
});

// // Public API
const public = require('./routes/public');
app.use('/', public);

// // Private API
const private = require('./routes/private');
app.use('/private', private);

// Twitter services
// const twitter = require('./twitter');
// twitter.start();