import { maybeTile, ReferencedGridAddress } from '../../pattern'
import { globalWrapper } from '../../utilities'
import thisPatternHasNotBeenCanceled from './thisPatternHasNotBeenCanceled'
import updateProgress from './updateProgress'

const asyncMaybeTile: (_: ReferencedGridAddress) => void =
	({ gridAddress, thisPatternRef }: ReferencedGridAddress): void => {
		globalWrapper.window.setTimeout(
			() => {
				if (thisPatternHasNotBeenCanceled(thisPatternRef)) {
					maybeTile.default({ gridAddress, thisPatternRef })
					updateProgress()
				}
			},
			0,
		)
	}

export default asyncMaybeTile
