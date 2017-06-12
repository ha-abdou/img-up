import {PathHandler}				from './PathHandler';
import {Magic}						from './magic';
import {DB} 						from './db';
import {Profile, Setting, Image,
		ImagePath}    				from "./interfaces";
import * as fileType				from 'file-type';
import * as readChunk				from 'read-chunk';
import * as fs						from "fs";
import {makeImage}					from "./functions/makeImage";
import {extend}						from "./functions/extend";
import {StylesHandler}				from "./stylesHandler";

//todo check callbacks do else
//todo check settings
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
			if (err) callback(err, img);
			this.db.images.remove(id, (err, num)=>{
				if (err) callback(err, num);
				check();
			});
			this.unlinkImage(img, (err, img)=>{
				if (err) callback(err, img);
				check();
			});
		});
		function check ()
		{
			tacks--;
			if (tacks === 0)
				callback(null, 1);
		}
	}

	update (id: string, path: string, params: any, callback: (err, num)=>any)
	{
		//this.db.images.update(id, fields, styles, callback)
		let fields: any;
		let styles: {};

		fields = {};
		styles = null;
		if (params.profile)
		{
			this.getById(id, (err, doc)=>{
				if (err) return (callback(err, doc));
				this.unlinkImage(doc, (err, newdoc)=>{
					if (err) return (callback(err, newdoc));
					this.save(path, params, (err, newImg)=>{
						if (err) return (callback(err, newImg));
						fields.path = newImg.path;
						fields.url = newImg.url;
						styles = {};
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
				fields.keyWords = params.keyWords;
			if (params.alt)
				fields.alt = params.alt;
			this.db.images.update(id, fields, styles, (err, num)=>{
				callback(null, num);
			})
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
			tacks--;
			if (tacks === 0)
				callback(null, img);
		}
	}


}

/*
 if (profile.source)
 {
 Magic.applyStyle({
 src: filePath,
 dest: PathHandler.prepares(profile.source.path,
 {
 type: profile.source.type ? profile.source.type : fileType(readChunk.sync(filePath, 0, 4100)).ext,
 fileName: params.fileName
 }),
 baseDir: this.settings.baseDir
 }, profile.source.style, (err, newPath)=>{
 if (err) callback(err, newPath);
 else
 {
 image.path = newPath.path;
 image.url = newPath.url;
 save.call(this);
 }
 });
 }
module.exports =
	{
		baseDir: "",
		path: "static/staticImages/:type/:styleName/:profileName/:fileName",
		profiles:
			{
				avatar:
					{
						type: "png",
						styles:
							{
								medium: "300x300>",
								thumb: "100x100>"
							},
						source:
							{
								baseDir: "",
								path: "static/source/:fileName.:type",
								style: ".op"
							},
						delete_origin: false
					},
			},
		dbSetting:
			{
				dataStore: "nedb",
				saveErrors: true,
				params:
					{
						dataFiles: "db"
					}
			}
	};
*/
