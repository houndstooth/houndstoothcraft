import { Address, applyViewForGrid, getAddresses, Grid } from '../../../pattern'
import { appState } from '../../appState'
import { PatternIdAsParam } from '../pattern'
import { executeTile } from '../tile'

const grid: (_: PatternIdAsParam) => void =
	({ patternId }: PatternIdAsParam): void => {
		applyViewForGrid.default()

		const addresses: Grid<Address> = getAddresses.default()
		setTileCount(addresses)

		addresses.forEach((row: Address[]): void => {
			row.forEach((address: Address): void => {
				executeTile.default({ address, patternId })
			})
		})
	}

const setTileCount: (_: Grid<Address>) => void =
	(addresses: Grid<Address>): void => {
		appState.execute.tileCount = addresses.reduce(
			(accumulator: number, row: Address[]): number =>
				accumulator + row.length,
			0,
		)
	}

export default grid
