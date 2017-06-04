/**
 * Created by abdou on 25/05/17.
 */
"use strict";
import { PathHandler }		from './PathHandler';
import { Magic }			from './magic';
import * as fileType		from 'file-type';
import * as readChunk		from 'read-chunk';
import {Profile, Setting, Image}	from "./interfaces";
import * as fs				from "fs";
let DataStore = require('nedb');
let db = {
	images: new DataStore({
		filename: 'db/images.db',
		autoload: true
	})
};

//todo original photo
export class ImgUp
{

	constructor (public settings: Setting)
	{

	}

	save (filePath: string, params: any, callBack: Function)
	{
		let profile:	Profile;
		let path:		string;
		let image:		Image;

		image = <Image>{fileName: params.fileName, alt: params.alt,
				keyWords: params.keyWords, path: filePath};
		profile = this.settings.profiles[params.profile];
		path = PathHandler.prepares(this.settings.path,
			{
				type: profile.type ? profile.type : fileType(readChunk.sync(filePath, 0, 4100)).ext,
				profileName: params.profile,
				fileName: params.fileName
			});
		this.applyStyles(filePath, profile.styles, path,
			(errors, images)=>{
				if (errors.length > 0 ) callBack(errors, images);
				if (profile.delete_origin)
					fs.unlinkSync(filePath);
				image.createdAt = new Date();
				image.updateAt = new Date();
				db.images.insert(image, function (err, newDoc) {
					callBack(null, newDoc);
				});

			},
			(stl, img)=> {
				image[stl] = img;
			}
		);
	}
	applyStyles (filePath: string, styles: any, path: string, callBack: Function, eachTime: Function)
	{
		let stack: number;
		let errors: any;
		let images: {};

		stack = 0;
		errors = [];
		images = {};
		for (let style in styles)
		{
			if (styles.hasOwnProperty(style))
			{
				stack++;
				this.applyStyle(filePath, PathHandler.prepares(path, {styleName: style}),
					styles[style], (err, image)=>{
						stack--;
						if (err) errors.push({msg: "can't resize", err});
						else
						{
							images[style] = image;
							eachTime(style, image);
						}
						if (stack === 0)
							callBack(errors, images);
					});
			}
		}
	}

	applyStyle (filePath: string, newPath: string, style: any, callBack: Function)
	{
		PathHandler.checkDir(this.settings.baseDir + newPath);
		Magic.resize(filePath, this.settings.baseDir + newPath, style,
			(err, image)=>{
				if (err) callBack({msg: "can't resize", err: err}, image);
				else callBack(null, {url: newPath, path: this.settings.baseDir + newPath});
			});
	}

}