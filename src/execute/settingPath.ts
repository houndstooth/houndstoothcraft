import { PropertyPath } from '../utilities/types'

type SettingPath = { ({}: { settingsPath: PropertyPath, settingName: string }): string }
const settingPath: SettingPath = ({ settingsPath, settingName }) => `${settingsPath.join('.')}.${settingName}`

export default settingPath
