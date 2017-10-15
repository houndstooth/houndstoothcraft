import { PropertyPath } from '../../utilities/types'

type SettingsFunctionObject = { settingsPath: PropertyPath, settingName: string, settingsFunction: {(p: any): {}} }

export default SettingsFunctionObject
