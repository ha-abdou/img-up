import {Image} from "../../interfaces";
import * as Nedb from "nedb";

export class ImagesHandler
{
	constructor (private db: Nedb)
	{

	}

	save (image: Image, callback: Function)
	{
		image.createdAt = new Date();
		image.updateAt = image.createdAt;
		this.db.insert(image, (err, newDoc)=>{
			callback(err, newDoc);
		});
	}
/*
	edit (id: string, filds: {fileName?: string, alt?: string,
		keyWords?: string[], image?: string, url?: string})
	{
		let image: Image;

		image = <Image>{fileName: filds.fileName, alt: filds.alt, url: filds.url,
			keyWords: filds.keyWords};

	}
*/
	get (id: string, callback: Function)
	{
	}
}
