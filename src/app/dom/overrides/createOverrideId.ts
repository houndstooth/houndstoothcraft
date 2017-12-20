import { concatFullSettingPath, FullSettingPath } from '../../settings'

const createOverrideId: (_: FullSettingPath) => string =
	({ patternName, settingName, settingPath }: FullSettingPath): string =>
		concatFullSettingPath.default({ patternName, settingName, settingPath }).join('-')

export default createOverrideId
