import { windowWrapper } from '../../app'
import { ReferencedGridAddress } from '../grid'
import thisPatternHasNotBeenCanceled from '../thisPatternHasNotBeenCanceled'
import maybeTile from './maybeTile'
import updateProgress from './updateProgress'

const asyncMaybeTile: (_: ReferencedGridAddress) => void =
	({ gridAddress, thisPatternRef }: ReferencedGridAddress): void => {
		windowWrapper.setTimeout(
			() => {
				if (thisPatternHasNotBeenCanceled(thisPatternRef)) {
					maybeTile({ gridAddress, thisPatternRef })
					updateProgress()
				}
			},
			0,
		)
	}

export default asyncMaybeTile
