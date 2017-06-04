/**
 * Created by abdou on 31/05/17.
 */

export interface Profile
{
	styles:			{},
	delete_origin?:	boolean,
	type:			string,
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
}

export interface Image
{
	id:			string,
	fileName:	string,
	path:		string,
	url:		string,
	alt:		string,
	keyWords:	string,
	[propName:	string]: any,
	createdAt:	Date,
	updateAt:	Date
}

