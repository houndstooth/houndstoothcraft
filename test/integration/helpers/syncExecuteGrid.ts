import { grid, maybeTile } from '../../../src'

const syncExecuteGrid: (_: { thisPatternRef: number }) => void =
	({ thisPatternRef }: { thisPatternRef: number }): void => {
		grid.default({ gridTile: maybeTile.default, thisPatternRef })
	}

export default syncExecuteGrid
