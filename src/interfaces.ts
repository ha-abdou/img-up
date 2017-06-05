
export interface Profile
{
	styles:			{},
	delete_origin?:	boolean,
	type:			string,
}

export interface DBSetting
{
	dataStore: string,
	saveErrors?: boolean,
	params:
		{
			dataFiles?:	string,
			login?:		string,
			password?:	string,
			hostname?:	string
		}
}

export interface Setting
{
	baseDir?:		string,
	dbBaseDir?:		string,
	path:			string,
	default_url?:	string,
	profiles:
		{
			[propName: string]: Profile
		},
	dbSetting?: DBSetting;
}

export interface Image
{
	_id:		string,
	fileName:	string,
	path:		string,
	url:		string,
	alt:		string,
	keyWords:	string[],
	[propName:	string]: any,
	createdAt:	Date,
	updateAt:	Date
}

export interface ImagePath
{
	src:		string,
	dest:		string,
	baseDir:	string
}

