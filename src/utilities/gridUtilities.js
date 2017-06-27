import codeUtilities from './codeUtilities'
import { COLOR_ASSIGNMENT, COLOR_SET } from '../defaults'

const getSetForTile = ({ address, config }) => {
	const { wrappedIndex } = codeUtilities

	let { set: setForGrid, assignment } = config || {}
	if (settings.initial.colorConfig) {
		setForGrid = setForGrid || settings.initial.colorConfig.set
		assignment = assignment || settings.initial.colorConfig.assignment
	}
	setForGrid = setForGrid || COLOR_SET
	assignment = assignment || COLOR_ASSIGNMENT

	let { offsetAddress, offsetSetForGridIndex, transformAssignedSet, mode, supertile, weave, flipGrain, switcheroo } = assignment

	offsetSetForGridIndex = offsetSetForGridIndex || COLOR_ASSIGNMENT.offsetSetForGridIndex
	offsetAddress = offsetAddress || COLOR_ASSIGNMENT.offsetAddress
	mode = mode || COLOR_ASSIGNMENT.mode
	supertile = supertile || COLOR_ASSIGNMENT.supertile
	weave = weave || COLOR_ASSIGNMENT.weave
	flipGrain = flipGrain || COLOR_ASSIGNMENT.flipGrain
	switcheroo = switcheroo || COLOR_ASSIGNMENT.switcheroo

	const setForGridIndexOffset = offsetSetForGridIndex ? offsetSetForGridIndex({ address }) : 0
	const addressOffset = offsetAddress ? offsetAddress({ address }) : [ 0, 0 ]

	let setForTile

	if (mode === 'WEAVE') {
		const { rows, columns } = weave
		const columnsIndex = wrappedIndex({ array: columns, index: address[ 0 ] + addressOffset[ 0 ] })
		const rowsIndex = wrappedIndex({ array: rows, index: address[ 1 ] + addressOffset[ 1 ] })
		setForTile = [
			wrappedIndex({ array: setForGrid, index: rowsIndex + setForGridIndexOffset }),
			wrappedIndex({ array: setForGrid, index: columnsIndex + setForGridIndexOffset })
		]
	} else if (mode === 'SUPERTILE') {
		const supertileColumn = wrappedIndex({ array: supertile, index: address[ 0 ] + addressOffset[ 0 ] })
		const supertileEntry = wrappedIndex({ array: supertileColumn, index: address[ 1 ] + addressOffset[ 1 ] })
		setForTile = supertileEntry.map(index => wrappedIndex({
			array: setForGrid,
			index: index + setForGridIndexOffset
		}))
	}

	if (flipGrain) setForTile = setForTile.reverse()
	if (switcheroo) setForTile = switcherooSet({ setForTile, address })

	transformAssignedSet = transformAssignedSet || COLOR_ASSIGNMENT.transformAssignedSet
	if (transformAssignedSet) {
		setForTile = transformAssignedSet({ setForTile, address })
	}

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
	getSetForTile
}
