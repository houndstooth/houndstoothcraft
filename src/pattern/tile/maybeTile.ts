import { incrementTilesCompleted } from '../../app'
import { ReferencedAddress } from '../grid'
import { patternState } from '../patternState'
import tile from './tile'

const maybeTile: (_: ReferencedAddress) => void =
	({ address }: ReferencedAddress): void => {
		/* istanbul ignore next */
		const {
			tileOrigin = undefined,
			tileSize = undefined,
		} = patternState.tileSettings.getTileOriginAndSize({ address }) || {}

		if (tileOrigin && tileSize) {
			tile({ address, tileOrigin, tileSize })
		}

		incrementTilesCompleted.default()
	}

export default maybeTile
