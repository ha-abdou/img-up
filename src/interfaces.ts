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
	path:			string,
	default_url?:	string,
	profiles:
		{
			[propName: string]: Profile
		},
}
