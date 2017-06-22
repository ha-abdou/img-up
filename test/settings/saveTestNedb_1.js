module.exports =
    {
        baseDir: "test/",
        path: "static/:profileName/:styleName/:fileName.:type",
        profiles:
            {
                avatar:
                    {
                        styles:
                            {
                                medium: "300x300>",
                            },
                        source:
                            {
                                baseDir: "test/",
                                path: "static/:fileName.:type",
                                style: "100%",
                                type: "jpeg"
                            },
                        delete_origin: true,
                        type: "jpeg"
                    },
            }
    };
