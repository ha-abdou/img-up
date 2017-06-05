import {Image} from "../../interfaces";
import * as Nedb from "nedb";
import {makeImage} from "../../functions/makeImage";

export class ImagesHandler
{
	constructor (private db: Nedb)
	{

	}

	save (image: Image, callback: (err, newDoc)=>any)
	{
		image.createdAt = new Date();
		image.updateAt = image.createdAt;
		this.db.insert(image, (err, newDoc)=>{
			callback(err, newDoc);
		});
	}

	edit (id: string, fields: {fileName?: string, alt?: string, path?: string,
		keyWords?: string[], url?: string}, styles: {},
		  callback: (err, num)=>any)
	{
		let image: Image;

		image = makeImage(fields);
		image.updateAt = new Date();
		if (styles)
		{
			for (let style in styles)
			{
				if (styles.hasOwnProperty(style))
					image[style] = styles[style];
			}
		}
		this.db.update({ _id: id }, { $set: image }, function (err, n) {
			callback(err, n);
		});

	}

	getById (id: string, callback: (err, doc)=>any)
	{
		this.db.findOne({_id: id}, (err, doc)=> {
			callback(err, doc);
		});
	}

	remove(id: string, callback: (err, num)=>any)
	{
		this.db.remove({ _id: id }, {}, callback)
	}
}
