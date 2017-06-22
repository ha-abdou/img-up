import {DBSetting}			from "../../interfaces";
import * as Nedb			from 'nedb';
import {ImagesHandler}		from "./imageSaver";
import {checkNedbSetting}	from "../../settingsChecker";

let db;

function connect (path): {}
{
	if (!db)
		db = {
			images: new Nedb({
				filename: path + '/images.db',
				autoload: true
			})
		};

	return (db);
}

export class NedbOrm
{
	public images: ImagesHandler;

	constructor (private setting: DBSetting)
	{
		checkNedbSetting(setting);
		connect(setting.params.dataFiles);
		this.images = new ImagesHandler(db.images);
	}

}
