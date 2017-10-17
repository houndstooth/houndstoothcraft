import { PropertyPath } from '../../utilities/types'

interface SettingsFunctionObject { settingName: string, settingsFunction: <T>(p: T) => T, settingsPath: PropertyPath }

export default SettingsFunctionObject
