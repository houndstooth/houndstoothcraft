import { PropertyPath } from '../utilities/types'

const settingPath: {
	({}: { settingsPath: PropertyPath, settingName: string }): string,
} = ({ settingsPath, settingName }) => `${settingsPath.join('.')}.${settingName}`

export default settingPath
