"use strict";

module.exports = function (req, res)
{
    GLOBAL.imgUp.getById(req.params.id, (err, img)=>{
        if (err) return(res.end('err on get image'));
        if (img === null) return(res.end('image not found'));
        res.render('crud/viewOne', {img});
    })
};