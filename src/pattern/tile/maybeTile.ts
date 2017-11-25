import { state } from '../../state'
import { ReferencedGridAddress } from '../grid'
import { main as getTileOriginAndSize } from './getTileOriginAndSize'
import { main as tile } from './tile'

const maybeTile: (_: ReferencedGridAddress) => void =
	({ gridAddress }: ReferencedGridAddress): void => {
		/* istanbul ignore next */
		const { tileOrigin = undefined, tileSize = undefined } = getTileOriginAndSize({ gridAddress }) || {}

		// tslint:disable:no-unused-expression no-void-expression
		tileOrigin && tileSize && tile({ gridAddress, tileOrigin, tileSize })

		state.tilesCompleted++
	}

export { maybeTile as main }
