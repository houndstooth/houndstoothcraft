import { state } from '../state'
import { getTileOriginAndSize } from './getTileOriginAndSize'
import { tile } from './tile'
import { Address, GridAddressFunction } from './types'

const maybeTile: GridAddressFunction =
	({ gridAddress }: { gridAddress: Address }): void => {
		/* istanbul ignore next */
		const { tileOrigin = undefined, tileSize = undefined } = getTileOriginAndSize({ gridAddress }) || {}

		// tslint:disable:no-unused-expression no-void-expression
		tileOrigin && tileSize && tile({ gridAddress, tileOrigin, tileSize })

		state.tilesCompleted++
	}

export { maybeTile }
