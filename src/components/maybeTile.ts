import { getTileOriginAndSize } from './getTileOriginAndSize'
import { tile } from './tile'
import { Address } from './types'

const maybeTile: (_: { gridAddress: Address }) => void =
	({ gridAddress }: { gridAddress: Address }): void => {
		/* istanbul ignore next */
		const { tileOrigin = undefined, tileSize = undefined } = getTileOriginAndSize({ gridAddress }) || {}

		// tslint:disable:no-unused-expression no-void-expression
		tileOrigin && tileSize && tile({ gridAddress, tileOrigin, tileSize })
	}

export { maybeTile }
