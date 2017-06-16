
module.exports = function (req, res)
{
    GLOBAL.imgUp.save(
        req.file.path,
        {profile: 'avatar',fileName: req.body.name, alt: req.body.alt, keyWords: req.body.keyWords.split(",")},
        (errors, image)=>{
            if (errors) {console.log("----->\n" + errors); res.end('error' +
                ' see the console')}
            else
                res.redirect(image._id);
        });
};
