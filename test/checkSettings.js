"use strict";

let assert = require('chai').assert;
let expect = require('chai').expect;
let ImgUp = require('../index').ImgUp;

describe('Init ImgUp', function()
{
    describe("#Check style and source settings", function ()
    {
        //todo errorType
        testSettings('./settings/badSettings', './settings/goodSettings', null);
    });

    describe("#Check database settings", function ()
    {
        //todo errorType
        testSettings('./settings/badNedbSettings',
            './settings/goodNedbSettings', null);
    });
});

function testSettings(bad, good, errorType)
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
                    (new ImgUp(badSettings[setting]))
                }).to.throw(errorType);
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