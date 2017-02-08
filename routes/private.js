/*
 * Private API router
 */
const express = require('express');
const router = express.Router();

// アクセス認証を判定するモジュール
const master = require('../modules/master');
const u = require('../modules/utils');

// ルータをrequire
const menu = require('./menu');

// 標準のログインID
// name: simochee
// password: abc5244

// アクセス認証
router.use((req, res, next) => {
    master.auth(req.body.password, req.body.name).then(() => {
        next();
    }).catch(() => {
        u.res.unauthorixed(res);
    });
});

// 認証のみ行う
router.route('/')
    .post((req, res) => {
        res.json({
            status: 'success'
        });
    });

// 献立関連
router.route('/menu')
    .post(menu.update);

const archive = require('./archive');
// アーカイブを登録
router.route('/archive/:year/:month/:status')
    .put(archive.put);

module.exports = router;