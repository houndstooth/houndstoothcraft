import { PropertyPath } from '../../utilities/types'

type SettingsFunctionObject = { settingsPath: PropertyPath, settingName: string, settingsFunction: {<T>(p: T): T} }

export default SettingsFunctionObject
