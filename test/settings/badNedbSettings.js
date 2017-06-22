module.exports =
	[
		{
			err: "DB setting error: unknown dataStore name",
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
                                            medium: "300x300>"
                                        },
                                    delete_origin: true,
                                    type: "png"
                                },
                        },
                    dbSetting:
                        {
                            dataStore: "ned",
                            saveErrors: true,
                            params:
                                {
                                    dataFiles: "db"
                                }
                        }
                },
		},
        {
            err: "DB setting error: 'saveErrors' should be typeof boolean",
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
                                            medium: "300x300>"
                                        },
                                    delete_origin: true,
                                    type: "png"
                                },
                        },
                    dbSetting:
                        {
                            dataStore: "nedb",
                            saveErrors: "",
                            params:
                                {
                                    dataFiles: "db"
                                }
                        }
                },
        },
        {
            err: "DB setting error: 'params' are missing",
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
                                            medium: "300x300>"
                                        },
                                    delete_origin: true,
                                    type: "png"
                                },
                        },
                    dbSetting:
                        {
                            dataStore: "nedb",
                            saveErrors: true,
                        }
                },
        },
        {
            err: "DB setting error: 'dataFiles' should be typeof 'string'",
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
                                            medium: "300x300>"
                                        },
                                    delete_origin: true,
                                    type: "png"
                                },
                        },
                    dbSetting:
                        {
                            dataStore: "nedb",
                            saveErrors: true,
                            params:
                                {
                                }
                        }
                }
        },
	];