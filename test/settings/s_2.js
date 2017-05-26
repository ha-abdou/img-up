/**
 * Created by abdou on 25/05/17.
 */
module.exports =
    {
        baseDir: "",
        path: "staticImages/${type}/${styleName}/${profileName}/${fileName}",
        profiles:
            {
                avatar:
                    {
                        styles:
                            {
                                medium: "300x300>",
                                thumb: "100x100>"
                            },
                        delete_origin: true,
                        type: "png"
                    },
            }
    };