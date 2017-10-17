import { PropertyPath } from '../../utilities/types'

type SettingsFunctionObject = { settingName: string, settingsFunction: {<T>(p: T): T}, settingsPath: PropertyPath }

export default SettingsFunctionObject
