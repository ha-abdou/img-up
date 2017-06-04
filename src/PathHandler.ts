/**
 * Created by abdou on 31/05/17.
 */
import * as mkdirp from "mkdirp";

export class PathHandler
{
	//todo rename path handler
	constructor ()
	{

	}

	static prepares (path: string, params: {})
	{
		for (let param in params)
		{
			if (params.hasOwnProperty(param))
			{
				path = path.replace(':' + param.toString(), params[param]);
			}
		}
		return (path);
	}

	static checkDir (path: string)
	{
		let tab: string[];

		tab = path.split('/');
		mkdirp.sync(path.substr(0, path.length - tab[tab.length -1].length));
	}
}
