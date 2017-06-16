"use strict";

module.exports = function (req, res)
{
    GLOBAL.imgUp.remove(req.params.id, (err, num)=>{
        if (err) return (res.end('error on delete image'));
        if (num === 0) return (res.end('not image was deleted'));
        res.redirect('../');
    });
};