import { windowWrapper } from '../../utilities'
import { ReferencedGridAddress } from '../grid'
import thisPatternHasNotBeenCanceled from '../thisPatternHasNotBeenCanceled'
import maybeTile from './maybeTile'
import updateProgress from './updateProgress'

const asyncMaybeTile: (_: ReferencedGridAddress) => void =
	({ gridAddress, thisPatternRef }: ReferencedGridAddress): void => {
		// tslint:disable-next-line:no-unsafe-any
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
