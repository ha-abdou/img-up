import {Image}		from "../../interfaces";
import * as Nedb	from "nedb";
import {extend}		from "../../functions/extend";

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

	remove(id: string, callback: (err, num)=>any)
	{
		this.db.remove({ _id: id }, {}, callback)
	}

	update(id: string, fields: {}, styles: {[propName: string]: {path: string, url: string}},
		   callback: (err, doc)=>any)
	{
		let set: {};
		let unset: {};

		set = {updateAt: new Date()};
		unset = {};
		extend(set, styles);
		extend(set, fields);
		this.getById(id, (err, img)=>{
			if (err) return (callback(err, img));
			for (let i in img)
			{
				if (img.hasOwnProperty(i) && img[i].path && !set.hasOwnProperty(i))
					unset[i] = true;
			}
			this.db.update({_id: id}, {$unset: unset, $set: set}, {}, callback);
		});
	}

	getById (id: string, callback: (err, doc)=>any)
	{
		this.db.findOne({_id: id}, (err, doc)=> {
			callback(err, doc);
		});
	}

	getAll (callback: (err, docs)=>any)
	{
		this.db.find({}, callback);
	}
}
