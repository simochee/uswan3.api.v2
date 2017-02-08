const moment = require('moment');

console.log(moment().set({
    year: 2016,
    month: 10,
    date: 30
}).format('YYYY-MM-DD'));

// const express = require('express');
// const app = express();
// const router = express.Router();

// const moment = require('moment');

// // 指定月の献立を取得
// router.route('/menu/:year/:month')
//     .get((req, res) => {
//         const year = req.params.year;
//         const month = req.params.month;

//         // MongoDBからデータを取得
//         // Menu.find({
//         //     "date": {
//         //         "$gte": ,
//         //         "$lte": ISODate()
//         //     }
//         // })
//     });

// app.use('/', router);

// app.listen(3000);