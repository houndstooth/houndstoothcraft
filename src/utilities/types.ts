import { SettingsFunction } from '../execute'

type NullarySideEffector = () => void

type CouldBeSettingsFunctionObject = Array<{
	settingName: string,
	settingsFunction: SettingsFunction,
	settingsPath: string[],
}>

export {
	CouldBeSettingsFunctionObject,
	NullarySideEffector,
}
