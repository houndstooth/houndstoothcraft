import { ReferencedAddress, tile } from '../../../pattern'
import { globalWrapper } from '../../../utilities'
import { thisPatternHasNotBeenCanceled } from '../pattern'
import updateProgress from './updateProgress'

const executeTile: (_: ReferencedAddress) => void =
	({ address, patternId }: ReferencedAddress): void => {
		globalWrapper.window.setTimeout(
			() => {
				if (thisPatternHasNotBeenCanceled.default(patternId)) {
					tile.default({ address })
					updateProgress()
				}
			},
			0,
		)
	}

export default executeTile
