// tslint:disable:no-any no-unsafe-any

import { from } from '../../../utilities'

import getPatternSettingOrCreatePath from './getPatternSettingOrCreatePath'
import mapOverPattern from './mapOverPattern'
import { ComposePatternsParams, PatternMapFunctionParams } from './types'

const composePatterns: (_: ComposePatternsParams) => void =
	({ patternToBeMergedOnto, patternToMerge = {} }: ComposePatternsParams): void => {
		mapOverPattern({
			options: { patternToBeMergedOnto },
			pattern: patternToMerge,
			perLeaf,
		})
	}

const perLeaf: (_: PatternMapFunctionParams) => void =
	({ options, settingPath, settingName, settingValue }: PatternMapFunctionParams): void => {
		getPatternSettingOrCreatePath({
			pattern: options.patternToBeMergedOnto,
			settingPath,
		})[ from.SettingStep(settingName) ] = settingValue
	}

export default composePatterns
