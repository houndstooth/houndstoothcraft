import { maybeTile, ReferencedAddress } from '../../../pattern'
import { globalWrapper } from '../../../utilities'
import thisFrameHasNotBeenCanceled from '../thisFrameHasNotBeenCanceled'
import updateProgress from './updateProgress'

const asyncMaybeTile: (_: ReferencedAddress) => void =
	({ address, frameId }: ReferencedAddress): void => {
		globalWrapper.window.setTimeout(
			() => {
				if (thisFrameHasNotBeenCanceled(frameId)) {
					maybeTile.default({ address, frameId })
					updateProgress()
				}
			},
			0,
		)
	}

export default asyncMaybeTile
