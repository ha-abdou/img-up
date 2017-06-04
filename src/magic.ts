/**
 * Created by abdou on 31/05/17.
 */
import * as im from 'imagemagick';

export class Magic
{
	constructor ()
	{

	}

	static resize (filePath: string, path: string, params: any, callBack: Function)
	{
		im.convert([filePath, '-resize', params, path],
			function(err, stdout){
				callBack(err, stdout);
			});
	}
}