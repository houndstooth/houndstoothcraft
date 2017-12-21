import { maybeTile, ReferencedAddress } from '../../../pattern'
import { globalWrapper } from '../../../utilities'
import thisPatternHasNotBeenCanceled from '../thisPatternHasNotBeenCanceled'
import updateProgress from './updateProgress'

const asyncMaybeTile: (_: ReferencedAddress) => void =
	({ address, patternId }: ReferencedAddress): void => {
		globalWrapper.window.setTimeout(
			() => {
				if (thisPatternHasNotBeenCanceled(patternId)) {
					maybeTile.default({ address, patternId })
					updateProgress()
				}
			},
			0,
		)
	}

export default asyncMaybeTile
