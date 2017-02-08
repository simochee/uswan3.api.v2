/*
 * Public API router
 */
const express = require('express');
const router = express.Router();

const menu = require('./menu');
const archive = require('./archive');
const search = require('./search');
const twitter = require('./twitter');

// 特定の月の献立を取得
router.route('/menu/:delay')
    .get(menu.get);
router.route('/menu/:year/:month')
    .get(menu.getMonthly);

// 献立のアーカイブをすべて取得
router.route('/menu/archive')
    .get(archive.get);
// 指定された年のアーカイブを取得
router.route('/menu/archive/:year')
    .get(archive.get);
// 指定された月がアーカイブに存在するか判定
// router.route('/menu/archive/:year/:month')
//     .get(archive.judge);

// 献立を検索
router.route('/search/:words/:start/:end')
    .get(search.period);



// フィードバックを送信
router.route('/feedback')
    .post(twitter.feedback);

module.exports = router;