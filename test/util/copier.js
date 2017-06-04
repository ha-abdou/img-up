/**
 * Created by abdou on 26/05/17.
 */
"use strict";

let fs = require('fs');

function copyList(list, src, dest, callback)
{
    let stack;
    let errors;

    errors = [];
    stack = 0;
    for (let i = list.length - 1; i >= 0 ; i--)
    {
        stack++;
        copyFile(list[i], list[i].replace(src, dest), (err)=>{
            stack--;
            if (err) errors.push(err);
            if (stack === 0) callback(errors.length > 0 ? errors : null);
        });
    }
}

function copyFile(source, target, callback)
{
    let cbCalled;

    cbCalled = false;
    let rd = fs.createReadStream(source);
    rd.on("error", function(err) {
        done(err);
    });
    let wr = fs.createWriteStream(target);
    wr.on("error", function(err) {
        done(err);
    });
    wr.on("close", function(ex) {
        done();
    });
    rd.pipe(wr);
    function done(err) {
        if (!cbCalled) {
            callback(err);
            cbCalled = true;
        }
    }
}

module.exports.copyFile =  copyFile;
module.exports.copyList =  copyList;