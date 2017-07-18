import codeUtilities from './codeUtilities'
import { COLOR_ASSIGNMENT, COLOR_SET } from '../defaults'

const getSetForTile = ({ address, settings }) => {
	const { wrappedIndex } = codeUtilities

	let { set: setForGrid, assignment } = settings || {}

	setForGrid = setForGrid || COLOR_SET
	assignment = assignment || COLOR_ASSIGNMENT

	let { offsetAddress, offsetSetForGridIndex, transformAssignedSet, assignmentMode, supertile, weave, flipGrain, switcheroo } = assignment

	const addressOffset = offsetAddress ? offsetAddress({ address }) : [ 0, 0 ]
	const setForGridIndexOffset = offsetSetForGridIndex ? offsetSetForGridIndex({ address }) : 0
	assignmentMode = assignmentMode || COLOR_ASSIGNMENT.assignmentMode
	supertile = supertile || COLOR_ASSIGNMENT.supertile
	weave = weave || COLOR_ASSIGNMENT.weave
	let setForTile
	if (assignmentMode === 'WEAVE') {
		const { rows, columns } = weave
		const columnsIndex = wrappedIndex({ array: columns, index: address[ 0 ] + addressOffset[ 0 ] })
		const rowsIndex = wrappedIndex({ array: rows, index: address[ 1 ] + addressOffset[ 1 ] })
		setForTile = [
			wrappedIndex({ array: setForGrid, index: rowsIndex + setForGridIndexOffset }),
			wrappedIndex({ array: setForGrid, index: columnsIndex + setForGridIndexOffset }),
		]
	}
	else if (assignmentMode === 'SUPERTILE') {
		const supertileColumn = wrappedIndex({ array: supertile, index: address[ 0 ] + addressOffset[ 0 ] })
		const supertileEntry = wrappedIndex({ array: supertileColumn, index: address[ 1 ] + addressOffset[ 1 ] })
		setForTile = supertileEntry.map(index => wrappedIndex({
			array: setForGrid,
			index: index + setForGridIndexOffset,
		}))
	}

	if (flipGrain) setForTile = setForTile.reverse()
	if (switcheroo) setForTile = switcherooSet({ setForTile, address })
	if (transformAssignedSet) setForTile = transformAssignedSet({ setForTile, address })

	return setForTile
}

const switcherooSet = ({ setForTile, address }) => {
	const xMod = address[ 0 ] % 4
	const yMod = address[ 1 ] % 4
	if (
		(xMod === 1 && yMod === 1) ||
		(xMod === 3 && yMod === 3) ||
		(xMod === 2 && yMod === 0) ||
		(xMod === 0 && yMod === 2)
	) {
		return setForTile.reverse()
	}

	return setForTile
}

export default {
	getSetForTile,
}
