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

//todo original photo
//todo check settings
export class ImgUp
{
	private db: DB;

	constructor (public settings: Setting)
	{
		this.db = new DB(settings.dbSetting);
	}

	save (filePath: string, params: any, callback: (err, newImage)=>any)
	{
		let profile:	Profile;
		let path:		ImagePath;
		let image:		Image;
		let tasks:		number;

		tasks = 2;
		image = makeImage({fileName: params.fileName, alt: params.alt, url: "todo",
				keyWords: params.keyWords, path: filePath});
		profile = this.settings.profiles[params.profile];
		path = this.imagePathHandler(filePath, profile, params);
		Magic.applyStyles(path , profile.styles,
			(err, imagesPaths)=>{
				if (err) callback(err, imagesPaths);
				else
				{
					extend(image, imagesPaths);
					save.call(this);
				}
			}
		);
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
		function save ()
		{
			tasks--;
			if (tasks !== 0)
				return;
			this.db.images.save(image, (err, newImage)=>{
				callback(err, newImage);
			});
			if (profile.delete_origin)
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
				if (err) callback(err, 0);
				check();
			});
			fs.unlink(img.path, (err)=>{
				if (err) callback(err, 0);
				check();
			});
			for (let i in img)
			{
				if (img.hasOwnProperty(i) && img[i].path)
				{
					tacks++;
					fs.unlink(img[i].path, (err)=>{
						if (err) callback(err, 0);
						check();
					})
				}
			}
		});
		function check ()
		{
			tacks--;
			if (tacks === 0)
				callback(null, 1);
		}
	}

	getById (id: string, callback: (err, image)=>any)
	{
		this.db.images.getById(id, callback);
	}

	private imagePathHandler (filePath: string, profile: Profile, params: any): ImagePath
	{
		return (
			{
				src: filePath,
				baseDir: this.settings.baseDir,
				dest: PathHandler.prepares(this.settings.path,
					{
						type: profile.type ? profile.type : fileType(readChunk.sync(filePath, 0, 4100)).ext,
						profileName: params.profile,
						fileName: params.fileName
					})
			}
		);
	}
}

/*
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
