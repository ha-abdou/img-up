import {DBSetting, Setting} from "./interfaces";
import {isEmptyObj} from "./functions/is";
import {TYPES} from "./counst";

//todo should be relative path
export function checkSettings (setting: Setting)
{
	if (!setting || isEmptyObj(setting))
		throw "Setting error: setting should not be empty object.";
	if (typeof setting.baseDir !== "string" )
		throw "Setting error: 'baseDir' should be typeof 'string'.";
	if (typeof setting.path !== "string" )
		throw "Setting error: 'path' should be typeof 'string'.";
	if (setting.profiles === undefined || isEmptyObj(setting.profiles))
		throw "Setting error: 'profiles' should not be empty object.";
	for (let profile in setting.profiles)
	{
		if (!setting.profiles.hasOwnProperty(profile)
			|| isEmptyObj(setting.profiles[profile]))
			throw "Setting error: 'profile' should not be empty object.";
		else if (setting.profiles.hasOwnProperty(profile))
		{
			if (setting.profiles[profile].styles === undefined
				|| isEmptyObj(setting.profiles[profile].styles))
				throw "Setting error: 'styles' should not be empty object.";
			for (let style in setting.profiles[profile].styles)
			{
				if (!setting.profiles[profile].styles.hasOwnProperty(style)
					|| typeof setting.profiles[profile].styles[style] !== "string")
					throw "Setting error: 'style' should be typeof 'string'.";
			}
			if (setting.profiles[profile].source !== undefined)
			{
				let source = setting.profiles[profile].source;

				if (typeof source.baseDir !== "string" )
					throw "Setting error: 'source.baseDir' should be typeof 'string'.";
				if (typeof source.path !== "string" )
					throw "Setting error: 'source.path' should be typeof 'string'.";
				if (typeof source.style !== "string" )
					throw "Setting error: 'source.style' should be typeof 'string'.";
				if (source.type !== undefined && TYPES.indexOf(source.type) < 0)
					throw "Setting error: 'source.type' unknown type.";
			}
			if (typeof setting.profiles[profile].delete_origin !== "boolean" )
				throw "Setting error: 'delete_origin' typeof boolean.";
			if (setting.profiles[profile].type !== undefined && TYPES.indexOf(setting.profiles[profile].type) < 0)
				throw "Setting error: 'profile.type' unknown type.";
		}
	}

}

export function checkNedbSetting (setting: DBSetting)
{
	if (setting.saveErrors !== undefined && typeof setting.saveErrors !== "boolean" )
		throw "DB setting error: 'saveErrors' should be typeof boolean";
	if (!setting.params)
		throw "DB setting error: 'params' are missing";
	if (typeof setting.params.dataFiles !== "string" )
		throw "DB setting error: 'dataFiles' should be typeof 'string'";
}