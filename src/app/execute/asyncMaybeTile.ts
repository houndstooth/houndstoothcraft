import { maybeTile, ReferencedGridAddress } from '../../pattern'
import { windowWrapper } from '../dom'
import thisPatternHasNotBeenCanceled from './thisPatternHasNotBeenCanceled'
import updateProgress from './updateProgress'

const asyncMaybeTile: (_: ReferencedGridAddress) => void =
	({ gridAddress, thisPatternRef }: ReferencedGridAddress): void => {
		windowWrapper.setTimeout(
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
