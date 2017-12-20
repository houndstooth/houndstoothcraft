import { to } from '../../../utilities'
import { mapOverPattern } from '../../setting'
import createOverrideLeafNode from './createOverrideLeafNode'

const createOverrideNodes: () => void =
	(): void => {
		mapOverPattern.default({ perLeaf: createOverrideLeafNode, patternName: to.SettingStep('basePattern') })
		mapOverPattern.default({ perLeaf: createOverrideLeafNode, patternName: to.SettingStep('animationsPattern') })
		mapOverPattern.default({ perLeaf: createOverrideLeafNode, patternName: to.SettingStep('layersPattern') })
	}

export default createOverrideNodes
