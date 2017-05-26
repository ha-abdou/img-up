/**
 * Created by abdou on 25/05/17.
 */
module.exports =
    {
        baseDir: "static/",
        path: "static/images/${profileName}/${styleName}/${fileName}.${type}",
        default_url: "static/images/${profileName}/${styleName}/missing.png",
        profiles:
            {
                avatar:
                    {
                        styles:
                            {
                                medium: "300x300>",
                                thumb: "100x100>"
                            },
                        delete_origin: false,
                        type: "jpeg"
                    },
            }
    };