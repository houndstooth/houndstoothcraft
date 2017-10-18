import { PropertyPath } from '../utilities/types'

const settingPath: (_: {
	settingName: string, settingsPath: PropertyPath,
}) => string = ({ settingName, settingsPath }) =>
	`${settingsPath.join('.')}.${settingName}`

export { settingPath }
