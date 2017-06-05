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

		image = makeImage({fileName: params.fileName, alt: params.alt, url: "todo",
				keyWords: params.keyWords, path: filePath});
		profile = this.settings.profiles[params.profile];
		path = {src: filePath, baseDir: this.settings.baseDir, dest: ""};
		path.dest = PathHandler.prepares(this.settings.path,
			{
				type: profile.type ? profile.type : fileType(readChunk.sync(filePath, 0, 4100)).ext,
				profileName: params.profile,
				fileName: params.fileName
			});
		Magic.applyStyles(path , profile.styles,
			(err, imagesPaths)=>{
				if (err) callback(err, imagesPaths);
				if (profile.delete_origin)
					fs.unlinkSync(filePath);
				extend(image, imagesPaths);
				this.db.images.save(image, (err, newImage)=>{
					callback(err, newImage);
				})
			}
		);
	}
}
