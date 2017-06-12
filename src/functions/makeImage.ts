import {Image} from "../interfaces";

export function makeImage (fields: {fileName?: string, alt?: string, path?: string,
	keyWords?: string[], url?: string, profile?: string}): Image
{
	let image: Image;

	image = <Image>{};
	if (fields.fileName)
		image.fileName = fields.fileName;
	if (fields.alt)
		image.alt = fields.alt;
	if (fields.path)
		image.path = fields.path;
	if (fields.keyWords)
		image.keyWords = fields.keyWords;
	if (fields.url)
		image.url = fields.url;
	if (fields.profile)
		image.profile = fields.profile;
	return (image);
}