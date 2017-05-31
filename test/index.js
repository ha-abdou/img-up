"use strict";

let settings = [require("./settings/s_1"),require("./settings/s_2")];
let images   = ["images/a.png", "images/b.png", "images/c.png", "images/d.png", "images/e.png"];
let copyList = require('./util/copier').copyList;
let imgUpTest = require('./src/img-up.test');
let imgUp = require('../index').ImgUp;

//test with all settings on all images

copyList(images, "images", "tmp", (errors)=>{
    if (errors) throw errors;
    console.log("\x1b[43mstart testing :\x1b[0m");
    testSave();
});

function testSave ()
{
    for (let s = settings.length - 1 ; s >= 0 ; s--)
    {
        for (let i = images.length - 1 ; i >= 0 ; i--)
        {
            imgUpTest.save(images[i].replace("images", "tmp"), settings[s], imgUp,
                (err) =>
                {
                    if (err)
                    {
                        console.error("\x1b[41msave test fail :(\x1b[0m");
                        throw err;
                    }
                    else
                    {
                        //todo check edit
                        //todo check the database
                        //todo check delete
                        //todo check the database
                    }
                }
            );
        }
    }
    console.log("\x1b[42mend testing :)\x1b[0m");
}




