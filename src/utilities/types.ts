import { SettingsFunction } from '../execute'

type NullarySideEffector = () => void

type CouldBeSettingsFunctionObject = Array<{
	settingName: string,
	settingsFunction: SettingsFunction<any>,
	settingsPath: string[],
}>

export {
	CouldBeSettingsFunctionObject,
	NullarySideEffector,
}
