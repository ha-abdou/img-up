"use strict";

let expect  = require('chai').expect;
let ImgUp   = require('../index').ImgUp;
let rimraf  = require('rimraf');

describe('Init ImgUp', function()
{
    describe("#Check style and source settings", function ()
    {
        testSettings('./settings/badSettings', './settings/goodSettings');
        it('Remove tmp files:', function (done) {
            rimraf('db', ()=>{
                done();
            });
        })
    });
    describe("#Check database settings", function ()
    {
        describe("##NEDB:", function ()
        {
            testSettings('./settings/badNedbSettings', './settings/goodNedbSettings');
            it('Remove tmp files:', function (done) {
                rimraf('db', ()=>{
                    done();
                });
            })
        });
    });
});

function testSettings(bad, good)
{
    let badSettings = require(bad);
    let goodSettings = require(good);

    for (let setting in badSettings)
    {
        if (badSettings.hasOwnProperty(setting))
        {
            it("should trow error", function ()
            {
                expect(function ()
                {
                    (new ImgUp(badSettings[setting].set))
                }).to.throw(badSettings[setting].err);
            });
        }
    }

    for (let setting in goodSettings)
    {
        if (goodSettings.hasOwnProperty(setting))
        {
            it("should not throw error", function ()
            {
                expect(function ()
                {
                    (new ImgUp(goodSettings[setting]))
                }).to.not.throw();
            });
        }
    }
}
