"use strict";

let express = require('express');
let router = express.Router();
let multer  = require('multer');
let upload = multer({ dest: 'uploads/' });

router.get('/', function(req, res, next) {
    require("../controllers/crud/all")(req, res);
});

router.get('/new', function(req, res, next) {
    res.render('crud/create', {});
});

router.post('/new', upload.single('image'), function(req, res, next)
{
    require("../controllers/crud/create")(req, res);
});

router.get('/:id/edit', function(req, res, next)
{
    GLOBAL.imgUp.getById(req.params.id, (err, img)=>{
        if (err) return(res.end('err on get image'));
        if (img === null) return(res.end('image not found'));
        res.render('crud/edit', {img});
    });
});

router.post('/:id/edit', upload.single('image'), function(req, res, next) {
    require("../controllers/crud/update")(req, res);

});

router.get('/:id/remove', function(req, res, next) {
    require("../controllers/crud/remove")(req, res);
});

router.get('/:id', function(req, res, next) {
    require("../controllers/crud/viewOne")(req, res);
});

module.exports = router;
