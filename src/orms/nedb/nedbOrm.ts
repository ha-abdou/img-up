import {Image} from "../../interfaces";
import * as Nedb from 'nedb';
import {ImagesHandler} from "./imageSaver";

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

	constructor (private dataFilesPath: string)
	{
		connect(dataFilesPath);
		this.images = new ImagesHandler(db.images);
	}
/*
	saveImage (image: Image, callback: Function)
	{
		image.createdAt = new Date();
		image.updateAt = image.createdAt;
		db.images.insert(image, (err, newDoc)=>{
			callback(err, newDoc);
		});
	}

	edit (id: string, filds: {fileName?: string, alt?: string,
		keyWords?: string[], image?: string})
	{
	}

	get (id: string)
	{
	}
	*/
}
