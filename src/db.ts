import {DBSetting} from "./interfaces";
import {NedbOrm} from "./orms/nedb/nedbOrm";
import {ImagesHandler as NedbImagesHandler} from "./orms/nedb/imageSaver";

export class DB
{
	private orm:	NedbOrm;
	public  images:	NedbImagesHandler;

	constructor (public setting: DBSetting)
	{
		if (setting.dataStore === "nedb")
			this.orm = new NedbOrm(setting);
		else
			throw "DB setting error: unknown dataStore name";
		this.images = this.orm.images;
	}
}
