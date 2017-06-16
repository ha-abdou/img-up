"use strict";

module.exports = function (req, res)
{
    GLOBAL.imgUp.getAll((err, imgs)=>{
        if (err) return (res.end('error on get all images'));
        res.render('crud/all', {imgs});

    });
};