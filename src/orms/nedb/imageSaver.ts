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

	edit (id: string, fields: {alt?: string, keyWords?: string[]},
		  callback: (err, num)=>any)
	{
		fields['updateAt'] = new Date();
		this.db.update({ _id: id }, { $set: fields }, function (err, n) {
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

	update(param: { _id: string }, img: any, param3: {}, param4: (err, num) => any) {

	}
}
