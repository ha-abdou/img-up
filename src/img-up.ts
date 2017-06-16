import {DB} 						from './db';
import {Setting, Image}				from "./interfaces";
import * as fs						from "fs";
import {makeImage}					from "./functions/makeImage";
import {extend}						from "./functions/extend";
import {StylesHandler}				from "./stylesHandler";

//todo check settings
//todo fileName unique
//todo edit fileName
export class ImgUp
{
	private db: DB;
	private styleHandler: StylesHandler;

	constructor (public settings: Setting)
	{
		this.db = new DB(settings.dbSetting);
		this.styleHandler = new StylesHandler(settings);
	}

	save (filePath: string, params: any, callback: (err, newImage)=>any,
		  toDB?: boolean)
	{
		let image:		Image;
		let tasks:		number;

		tasks = 2;
		image = makeImage({fileName: params.fileName, alt: params.alt, url: "",
			keyWords: params.keyWords, path: filePath, profile: params.profile});
		this.styleHandler.profile(filePath, params, callback,
			(imagesPaths)=>{save.call(this, imagesPaths);});
		this.styleHandler.source(this.settings.profiles[params.profile],
			filePath, params.fileName, callback,
			(src)=>{save.call(this, src);});
		function save (obj: {})
		{
			extend(image, obj);
			if (--tasks !== 0)
				return;
			if (toDB === false)
				callback(null, image);
			else
				this.db.images.save(image, callback);
			if (this.settings.profiles[params.profile].delete_origin)
				fs.unlinkSync(filePath);
		}
	}

	remove (id: string, callback: (err, num)=>any)
	{
		let tacks: number;

		tacks = 2;
		this.getById(id, (err, img)=>{
			if (err) return (callback(err, img));
			if (!img) return (callback("image don't exist.", img));
			this.db.images.remove(id, check);
			this.unlinkImage(img, check);
		});
		function check (err, x)
		{
			tacks--;
			if (--tacks !== 0)
				return;
			if (err)
				return (callback(err, x));
			callback(null, 1);
		}
	}

	update (id: string, path: string, params: any, callback: (err, num)=>any)
	{
		let fields: {};
		let styles: {};

		fields = {};
		styles = {};
		if (params.profile && path !== "")
		{
			console.log("------->");
			this.getById(id, (err, doc)=>{
				if (err) return (callback(err, doc));
				this.unlinkImage(doc, (err, newdoc)=>{
					if (err) return (callback(err, newdoc));
					this.save(path, params, (err, newImg)=>{
						if (err) return (callback(err, newImg));
						fields = {path: newImg.path, url: newImg.url};
						for (let i in newImg)
						{
							if (newImg.hasOwnProperty(i) && newImg[i].path)
								styles[i] = {path: newImg[i].path, url: newImg[i].url};
						}
						save.call(this);
					}, false);
				});
			});
		}
		else
			save.call(this);
		function save ()
		{
			if (params.keyWords)
				fields["keyWords"] = params.keyWords;
			if (params.alt)
				fields["alt"] = params.alt;
			this.db.images.update(id, fields, styles, callback)
		}
	}

	getById (id: string, callback: (err, image)=>any)
	{
		this.db.images.getById(id, callback);
	}

	getAll (callback: (err, images)=>any)
	{
		this.db.images.getAll(callback);
	}

	find (query: any, callback: (err, images)=>any)
	{
		this.db.images.find(query, callback);
	}

	private unlinkImage (img: Image, callback: (err, newImg)=>any)
	{
		let tacks: number;

		tacks = 1;
		fs.unlink(img.path, (err)=>{
			if (err) callback(err, img);
			img.path = "";
			img.url = "";
			check();
		});
		for (let i in img)
		{
			if (img.hasOwnProperty(i) && img[i].path)
			{
				tacks++;
				fs.unlink(img[i].path, (err)=>{
					if (err) callback(err, img);
					delete img[i];
					check();
				})
			}
		}
		function check ()
		{
			if (--tacks === 0)
				callback(null, img);
		}
	}
}
