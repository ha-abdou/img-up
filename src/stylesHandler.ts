import {ImagePath, Profile, Setting}	from "./interfaces";
import {Magic}							from "./magic";
import {PathHandler}					from "./PathHandler";
import * as readChunk					from 'read-chunk';
import * as fileType					from 'file-type';

export class StylesHandler
{
	constructor (public settings: Setting)
	{

	}

	profile (filePath: string, params: any, error: (err, n)=>any,
			 success: (res)=>any)
	{
		let profile:	Profile;
		let path:		ImagePath;

		profile = this.settings.profiles[params.profile];
		path =
			{
				src: filePath,
				baseDir: this.settings.baseDir,
				dest: PathHandler.prepares(this.settings.path,
					{
						type: profile.type ? profile.type :
							fileType(readChunk.sync(filePath, 0, 4100)).ext,
						profileName: params.profile,
						fileName: params.fileName
					})
			};
		Magic.applyStyles(path , profile.styles,
			(err, imagesPaths)=>{
				if (err) return (error(err, imagesPaths));
				success(imagesPaths);
			}
		);
	}

	source (profile: Profile, filePath: string, fileName: string,
				   error: (err, n)=>any, success: (res)=>any)
	{
		if (profile.source)
		{
			Magic.applyStyle({
				src: filePath,
				dest: PathHandler.prepares(profile.source.path,
					{
						type: profile.source.type ? profile.source.type :
							fileType(readChunk.sync(filePath, 0, 4100)).ext,
						fileName: fileName
					}),
				baseDir: this.settings.baseDir
			}, profile.source.style, (err, newPath)=>{
				if (err) return (error(err, null));
				success(newPath);
			});
		}
	}
}