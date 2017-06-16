/**
 * Created by abdou on 01/06/17.
 */
module.exports =
    {
        baseDir: "public/",
        path: "images/:profileName/:styleName/:fileName.:type",
        profiles:
            {
                avatar:
                    {
                        styles:
                            {
                                medium: "400x400>",
                                thumb: "100x100>"
                            },
                        source:
                            {
                                baseDir: "public/",
                                path: "images/sources/:fileName.:type",
                                style: "100%",
                                type: "jpg"
                            },
                        delete_origin: true,
                        type: "png"
                    },
            },
        dbSetting:
            {
                dataStore: "nedb",
                saveErrors: true,//todo
                params:
                    {
                        dataFiles: "db"
                    }
            }
    };
