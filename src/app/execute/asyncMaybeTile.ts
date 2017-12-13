import { maybeTile, ReferencedAddress } from '../../pattern'
import { globalWrapper } from '../../utilities'
import thisPatternHasNotBeenCanceled from './thisPatternHasNotBeenCanceled'
import updateProgress from './updateProgress'

const asyncMaybeTile: (_: ReferencedAddress) => void =
	({ address, thisPatternRef }: ReferencedAddress): void => {
		globalWrapper.window.setTimeout(
			() => {
				if (thisPatternHasNotBeenCanceled(thisPatternRef)) {
					maybeTile.default({ address, thisPatternRef })
					updateProgress()
				}
			},
			0,
		)
	}

export default asyncMaybeTile
