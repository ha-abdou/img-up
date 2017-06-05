/**
 * Created by abdou on 25/05/17.
 */
module.exports =
    {
        baseDir: "",
        path: "static/staticImages/:type/:styleName/:profileName/:fileName",
        profiles:
            {
                avatar:
                    {
                        styles:
                            {
                                medium: "300x300>",
                                thumb: "100x100>"
                            },
                        delete_origin: false
                    },
            },
        dbSetting:
            {
                dataStore: "nedb",
                saveErrors: true,
                params:
                    {
                        dataFiles: "db"
                    }
            }
    };