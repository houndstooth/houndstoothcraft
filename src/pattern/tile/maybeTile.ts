import { appState } from '../../app'
import { ReferencedGridAddress } from '../grid'
import getTileOriginAndSize from './getTileOriginAndSize'
import tile from './tile'

const maybeTile: (_: ReferencedGridAddress) => void =
	({ gridAddress }: ReferencedGridAddress): void => {
		/* istanbul ignore next */
		const { tileOrigin = undefined, tileSize = undefined } = getTileOriginAndSize({ gridAddress }) || {}

		if (tileOrigin && tileSize) {
			tile({ gridAddress, tileOrigin, tileSize })
		}

		appState.execute.tilesCompleted++
	}

export default maybeTile
