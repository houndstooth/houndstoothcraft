import codeUtilities from '../utilities/codeUtilities'
import state from '../../state'

export default ({ gridAddress }) => {
	const assignment = state.mainHoundstooth.basePattern.colorSettings.assignment

	let tileColorIndices = getTileColorIndices({ gridAddress, assignment })

	return maybeAdjustTileColorIndices({ assignment, gridAddress, tileColorIndices })
}

const maybeAdjustTileColorIndices = ({ assignment, gridAddress, tileColorIndices }) => {
	let { transformTileColorIndices, flipGrain, switcheroo } = assignment

	if (flipGrain) tileColorIndices = tileColorIndices.reverse()
	if (switcheroo) tileColorIndices = applySwitcheroo({ tileColorIndices, gridAddress })
	if (transformTileColorIndices) tileColorIndices = transformTileColorIndices({ tileColorIndices, gridAddress })

	return tileColorIndices
}

const getTileColorIndices = ({ gridAddress, assignment }) => {
	const { offsetAddress, assignmentMode, weave, supertile } = assignment

	const addressOffset = offsetAddress ? offsetAddress({ gridAddress }) : [ 0, 0 ]

	let getter
	if (assignmentMode === 'WEAVE') {
		getter = getByWeave
	}
	else if (assignmentMode === 'SUPERTILE') {
		getter = getBySupertile
	}
	return getter({ gridAddress, addressOffset, weave, supertile })
}

const getByWeave = ({ gridAddress, addressOffset, weave }) => {
	const { rows, columns } = weave
	const columnsIndex = codeUtilities.wrappedIndex({ array: columns, index: gridAddress[ 0 ] + addressOffset[ 0 ] })
	const rowsIndex = codeUtilities.wrappedIndex({ array: rows, index: gridAddress[ 1 ] + addressOffset[ 1 ] })
	return [ rowsIndex, columnsIndex ]
}

const getBySupertile = ({ gridAddress, addressOffset, supertile }) => {
	const supertileColumn = codeUtilities.wrappedIndex({
		array: supertile,
		index: gridAddress[ 0 ] + addressOffset[ 0 ],
	})
	return codeUtilities.wrappedIndex({ array: supertileColumn, index: gridAddress[ 1 ] + addressOffset[ 1 ] })
}

const applySwitcheroo = ({ tileColorIndices, gridAddress }) => {
	const xMod = gridAddress[ 0 ] % 4
	const yMod = gridAddress[ 1 ] % 4
	if (
		(xMod === 1 && yMod === 1) ||
		(xMod === 3 && yMod === 3) ||
		(xMod === 2 && yMod === 0) ||
		(xMod === 0 && yMod === 2)
	) {
		return tileColorIndices.reverse()
	}

	return tileColorIndices
}
