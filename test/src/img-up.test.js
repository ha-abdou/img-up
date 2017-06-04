/**
 * Created by abdou on 26/05/17.
 */
"use strict";

let randomWords = require('random-words');
let randomParagraph = require('random-paragraph');
let fs = require('fs');
let readChunk = require('read-chunk');
let fileType = require('file-type');
let DataStore = require('nedb');
/*
let db = {};
db.images = new DataStore({ filename: 'db/images.db', autoload: true });
*/


function prepares (path , params)//todo
{
    for (let param in params)
    {
        if (params.hasOwnProperty(param))
        {
            path = path.replace(':' + param.toString(), params[param]);
        }
    }
    return (path);
}

function getExt(path)
{
    return (fileType(readChunk.sync(path, 0, 4100)).ext);
}

//check if the file exist and is in the correct folder
//check the return
//check if is save in database
class ImgUpTest
{

    static save (imagePath, setting, imgUp, callback)
    {
        try
        {
            let ins = new imgUp(setting);

            for (let profile in setting.profiles)
            {
                if (setting.profiles.hasOwnProperty(profile))
                {
                    let params;

                    params =
                        {
                            profile: profile,
                            fileName: randomWords(),
                            alt: randomParagraph(),
                            keyWords: randomWords(8),
                        };
                    ins.save(imagePath, params,
                        (err, img)=>{
                            if (err)
                            {
                                console.log("\x1b[45merror on save" +
                                    " image for test :(\x1b[0m");
                                throw err[0].err;
                            }
                            ImgUpTest.check(imagePath, img, params, setting);
                        });
                }
            }
        }
        catch (e)
        {
            callback(e);
        }
    }

    //if delete_origin ok todo src url
    //if all style how applied correctly ok
    //if type ok
    //if baseDir ok
    //check database
    static check (orgFilePath, img, params, setting)
    {
        let profile;
        let path;
        let type;

        profile = setting.profiles[params.profile];
        type = profile.type ? profile.type : getExt(orgFilePath);
        params.type = type;
        path = prepares(setting.path, {type: type, profileName: params.profile, fileName: params.fileName});
        if (profile.delete_origin === fs.existsSync(orgFilePath))
            throw "delete_origin error";
        ImgUpTest.checkStyles(path, params, setting, img);
        //todo start alt src key...
    }

    static checkStyles (path, params, setting, img)
    {
        let styles;

        styles = setting.profiles[params.profile].styles;
        for (let style in styles)
        {
            let _path;

            if (styles.hasOwnProperty(style))
            {
                _path = prepares(path, {styleName: style});
                if (!fs.existsSync(setting.baseDir + _path))
                {
                    throw "file not exist on: " + setting.baseDir + _path;
                }
                else if (getExt(setting.baseDir + _path) !== params.type)
                {
                    throw "file has wrong type: should be " + params.type +"\n" + setting.baseDir + _path;
                }
                else if (img[style].url !== _path)
                {
                    throw "file has wrong url : should be " + _path + "\n" + img[style].url;
                }
            }
        }
    }

}

module.exports = ImgUpTest;