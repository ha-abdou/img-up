"use strict";

let assert = require('chai').assert;
let expect = require('chai').expect;
let ImgUp  = require('../index').ImgUp;
let rimraf = require('rimraf');

describe('ImgUp.save()', function()
{
    describe("#nedb as dataStore", function ()
    {
        describe("##test 1:", function ()
        {
            testSave(require('./settings/saveTestNedb_1'),
                'test/data/images/img.jpg');
        });
    });
});

function testSave(setting, imgPath)
{
    let imgUp;

    it("should init without errors", function ()
    {
        imgUp = new ImgUp(setting);
    });

    it("should return error: invalid path", function (done)
    {
        imgUp.save("", {}, (err, img)=> {
            if (err)
                assert.equal(err.msg, "Image path error", "should not save empty" +
                    " string path.");
            else
                assert.equal(null, "Image path error", "should not save empty" +
                    " string path.");
            assert.isNull(img, "should not save the image.");
            done();
        });
    });

    //test with params
    //

    it('Remove tmp files:', function (done)
    {
        rimraf('db', ()=>{
            done();
        });
    });
}
