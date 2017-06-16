"use strict";

module.exports = function (req, res)
{
    GLOBAL.imgUp.update (req.params.id, req.file && req.file.path ? req.file.path : "",
        {profile: 'avatar',fileName: req.body.name, alt: req.body.alt, keyWords: req.body.keyWords.split(",")},
        (err, num)=>{
            if (err) return (res.end('error on edit image'));
            if (num === 0) return (res.end('not image was edited'));
            res.redirect("../" + req.params.id);
        }
    )
};