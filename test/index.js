"use strict";

let settings = [require("./settings/s_2"), require("./settings/s_1")];
let images   = ["images/a.png"];
//let images   = ["images/a.png", "images/b.png", "images/c.png",
// "images/d.png", "images/e.png"];
let copyList = require('./util/copier').copyList;
let imgUpTest = require('./src/img-up.test');
let imgUp = require('../index').ImgUp;

//test with all settings on all images

function main (s)
{
    if (s === 0)
        console.log("\x1b[43mstart testing :\x1b[0m");

    copyList(images, "images", "tmp", (errors)=>{
        if (errors) throw errors;
        test(settings[s]);
    });

    if (s === settings.length - 1)
        console.log("\x1b[42mend testing :)\x1b[0m");
    else
        main(s + 1)

}

function test(setting) {
    for (let i = images.length - 1 ; i >= 0 ; i--)
    {
        imgUpTest.save(images[i].replace("images", "tmp"), setting, imgUp,
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

main(0);




