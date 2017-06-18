module.exports =
	[
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
		},
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
							dataFiles: "/db"
						}
				}
		},
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
							dataFiles: ""
						}
				}
		},
	];