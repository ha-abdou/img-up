module.exports =
    [
        {
            baseDir: "",
            path: "images/:profileName/:styleName/:fileName.:type",
            profiles:
                {
                    avatar:
                        {
                            styles:
                                {
                                    medium: "300x300>"
                                },
                            delete_origin: false
                        },
                },
        },
        {
            baseDir: "static/",
            path: "images/",
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
                                    baseDir: "static/",
                                    path: "source/",
                                    style: "100%",
                                    type: "jpeg"
                                },
                            delete_origin: true,
                            type: "jpeg"
                        },
                },
        }
    ];