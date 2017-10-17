import { PropertyPath } from '../utilities/types'

const settingPath: {
	({}: { settingName: string, settingsPath: PropertyPath }): string,
} = ({ settingName, settingsPath }) => `${settingsPath.join('.')}.${settingName}`

export default settingPath
