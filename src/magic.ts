import * as im			from 'imagemagick';
import {PathHandler}	from "./PathHandler";
import {ImagePath}		from "./interfaces";

export class Magic
{
	constructor ()
	{

	}

	static applyStyles (path: ImagePath, styles: {}, callBack: (err, imagesPaths)=> any)
	{
		let stack: number;
		let imagesPaths: {};

		stack = 0;
		imagesPaths = {};
		for (let style in styles)
		{
			if (styles.hasOwnProperty(style))
			{
				stack++;
				this.applyStyle({src: path.src,
						dest: PathHandler.prepares(path.dest, {styleName: style}),
						baseDir: path.baseDir},
					styles[style],
					(err, newPath)=>{
						stack--;
						if (err) callBack(err, newPath);
						else
							imagesPaths[style] = newPath;
						if (stack === 0)
							callBack(null, imagesPaths);
					});
			}
		}
	}

	static applyStyle(path: ImagePath, style: string, callback: (err, newPath)=>any)
	{
		PathHandler.checkDir(path.baseDir + path.dest);
		Magic.resize(path.src, path.baseDir + path.dest, style,
			(err, imagePath)=>{
				if (err) callback({msg: "can't resize", err: err}, imagePath);
				else callback(null, {url: '/' + path.dest,
					path: path.baseDir + path.dest});
			});
	}

	static resize (filePath: string, path: string, params: any, callBack: Function)
	{
		im.convert([filePath, '-resize', params, path],
			function(err, stdout){
				callBack(err, stdout);
			});
	}

}