module.exports =
    [
        {
            err: "Setting error: setting should not be empty object.",
            set: {},
        },
        {
            err: "Setting error: 'baseDir' should be typeof 'string'.",
            set:
                {
                    baseDir: 1
                },
        },
        {
            err: "Setting error: 'path' should be typeof 'string'.",
            set:
                {
                    baseDir: "",
                    path: 1,
                },
        },
        {
            err: "Setting error: 'path' should be typeof 'string'.",
            set:
                {
                    baseDir: "static/",
                    profiles: {}
                },
        },
        {
            err: "Setting error: 'profiles' should not be empty object.",
            set:
                {
                    baseDir: "static/",
                    path: "images/:profileName/:styleName/:fileName.:type",
                    profiles: {}
                },
        },
        {
            err: "Setting error: 'profile' should not be empty object.",
            set:
                {
                    baseDir: "static/",
                    path: "images/:profileName/:styleName/:fileName.:type",
                    profiles:
                        {
                            avatar:
                                {},
                        }
                },
        },
        {
            err: "Setting error: 'styles' should not be empty object.",
            set:
                {
                    baseDir: "static/",
                    path: "images/:profileName/:styleName/:fileName.:type",
                    profiles:
                        {
                            avatar:
                                {
                                    styles: {},
                                    source: {}
                                },
                        }
                },
        },
        {
            err: "Setting error: 'style' should be typeof 'string'.",
            set:
                {
                    baseDir: "static/",
                    path: "images/:profileName/:styleName/:fileName.:type",
                    profiles:
                        {
                            avatar:
                                {
                                    styles:
                                        {
                                            medium: 1,
                                        }
                                },
                        }
                },
        },
        {
            err: "Setting error: 'source.baseDir' should be typeof 'string'.",
            set:
                {
                    baseDir: "static/",
                    path: "images/:profileName/:styleName/:fileName.:type",
                    profiles:
                        {
                            avatar:
                                {
                                    styles:
                                        {
                                            medium: "300x300>",
                                            thumb: "100x100>"
                                        },
                                    source:
                                        {
                                            baseDir: 1
                                        }
                                },
                        }
                },
        },
        {
            err: "Setting error: 'source.path' should be typeof 'string'.",
            set:
                {
                    baseDir: "static/",
                    path: "images/:profileName/:styleName/:fileName.:type",
                    profiles:
                        {
                            avatar:
                                {
                                    styles:
                                        {
                                            medium: "300x300>",
                                            thumb: "100x100>"
                                        },
                                    source:
                                        {
                                            baseDir: "static/",
                                            path: 1,
                                        }
                                },
                        }
                },
        },
        {
            err: "Setting error: 'source.style' should be typeof 'string'.",
            set:
                {
                    baseDir: "static/",
                    path: "images/:profileName/:styleName/:fileName.:type",
                    profiles:
                        {
                            avatar:
                                {
                                    styles:
                                        {
                                            medium: "300x300>",
                                            thumb: "100x100>"
                                        },
                                    source:
                                        {
                                            baseDir: "static/",
                                            path: "source/:fileName.:type",
                                            style: 0,
                                        }
                                }
                        }
                },
        },
        {
            err: "Setting error: 'source.type' unknown type.",
            set:
                {
                    baseDir: "static/",
                    path: "images/:profileName/:styleName/:fileName.:type",
                    profiles:
                        {
                            avatar:
                                {
                                    styles:
                                        {
                                            medium: "300x300>",
                                            thumb: "100x100>"
                                        },
                                    source:
                                        {
                                            baseDir: "static/",
                                            path: "source/:fileName.:type",
                                            style: "100%",
                                            type: "ffff"
                                        }
                                },
                        }
                },
        },
        {
            err: "Setting error: 'delete_origin' typeof boolean.",
            set:
                {
                    baseDir: "static/",
                    path: "images/:profileName/:styleName/:fileName.:type",
                    profiles:
                        {
                            avatar:
                                {
                                    styles:
                                        {
                                            medium: "300x300>",
                                            thumb: "100x100>"
                                        },
                                    source:
                                        {
                                            baseDir: "static/",
                                            path: "source/:fileName.:type",
                                            style: "100%",
                                            type: "jpg"
                                        },
                                    delete_origin: "ee",
                                    type: "png"
                                },
                        }
                },
        },
        {
            err: "Setting error: 'profile.type' unknown type.",
            set:
                {
                    baseDir: "static/",
                    path: "images/:profileName/:styleName/:fileName.:type",
                    profiles:
                        {
                            avatar:
                                {
                                    styles:
                                        {
                                            medium: "300x300>",
                                            thumb: "100x100>"
                                        },
                                    source:
                                        {
                                            baseDir: "static/",
                                            path: "source/:fileName.:type",
                                            style: "100%",
                                            type: "jpg"
                                        },
                                    delete_origin: true,
                                    type: "ferdrrg"
                                },
                        },
                },
        },
        /*
        s{
            err: "Setting error: 'baseDir' should be relative path.",
            set:
                {
                    baseDir: "/static/",
                    path: "images/:profileName/:styleName/:fileName.:type",
                    profiles:
                        {
                            avatar:
                                {
                                    styles:
                                        {
                                            medium: "300x300>",
                                            thumb: "100x100>"
                                        },
                                    source:
                                        {
                                            baseDir: "static/",
                                            path: "source/:fileName.:type",
                                            style: "100%",
                                            type: "jpg"
                                        },
                                    delete_origin: true,
                                    type: "png"
                                },
                        }
                },
        },
        {
            err: "Setting error: 'source.baseDir' should be relative path.",
            set:
                {
                    baseDir: "static/",
                    path: "images/:profileName/:styleName/:fileName.:type",
                    profiles:
                        {
                            avatar:
                                {
                                    styles:
                                        {
                                            medium: "300x300>",
                                            thumb: "100x100>"
                                        },
                                    source:
                                        {
                                            baseDir: "/static/",
                                            path: "source/:fileName.:type",
                                            style: "100%",
                                            type: "jpg"
                                        },
                                    delete_origin: true,
                                    type: "png"
                                },
                        }
                },
        },
        {
            err: "Setting error: 'source.path' should be relative path.",
            set:
                {
                    baseDir: "static/",
                    path: "images/:profileName/:styleName/:fileName.:type",
                    profiles:
                        {
                            avatar:
                                {
                                    styles:
                                        {
                                            medium: "300x300>",
                                            thumb: "100x100>"
                                        },
                                    source:
                                        {
                                            baseDir: "static/",
                                            path: "/source/:fileName.:type",
                                            style: "100%",
                                            type: "jpg"
                                        },
                                    delete_origin: true,
                                    type: "png"
                                },
                        }
                },
        },
        {
            err: "Setting error: 'path' should be relative path.",
            set:
                {
                    baseDir: "static/",
                    path: "/images/:profileName/:styleName/:fileName.:type",
                    profiles:
                        {
                            avatar:
                                {
                                    styles:
                                        {
                                            medium: "300x300>",
                                            thumb: "100x100>"
                                        },
                                    source:
                                        {
                                            baseDir: "static/",
                                            path: "source/:fileName.:type",
                                            style: "100%",
                                            type: "jpg"
                                        },
                                    delete_origin: true,
                                    type: "png"
                                },
                        },
                }
        },*/
    ];