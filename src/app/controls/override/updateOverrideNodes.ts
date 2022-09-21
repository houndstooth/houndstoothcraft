import { to } from '../../../utilities'
import { DEFAULT_BASE_PATTERN, mapOverPattern } from '../../setting'

import updateOverrideLeafNode from './updateOverrideLeafNode'

const updateOverrideNodes: () => void =
	(): void => {
		mapOverPattern.default({
			pattern: DEFAULT_BASE_PATTERN,
			patternName: to.SettingStep('basePattern'),
			perLeaf: updateOverrideLeafNode,
		})
		mapOverPattern.default({
			pattern: DEFAULT_BASE_PATTERN,
			patternName: to.SettingStep('animationsPattern'),
			perLeaf: updateOverrideLeafNode,
		})
		mapOverPattern.default({
			pattern: DEFAULT_BASE_PATTERN,
			patternName: to.SettingStep('layersPattern'),
			perLeaf: updateOverrideLeafNode,
		})
	}

export default updateOverrideNodes
