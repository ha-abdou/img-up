/**
 * Created by abdou on 26/05/17.
 */
"use strict";

class ImgUpTest
{

    static save (image, setting, imgUp, callback)
    {
        //check if the file exist and is in the correct folder
        //check the return
        //check if is save in database
        try
        {
            let ins = new imgUp(setting);

            //todo make file
            ins.save(image, {profile: 'avatar', fileName: 'test'}, ()=>{});
        }
        catch (e)
        {
            callback(e);
        }
    }
}

module.exports = ImgUpTest;