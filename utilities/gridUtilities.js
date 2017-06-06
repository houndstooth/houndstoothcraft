import codeUtilities from './codeUtilities'
import state from '../state/state'

const getSetForTile = ({ address, config }) => {
	const { wrappedIndex } = codeUtilities

	let { set: setForGrid, assignment } = config || {}
	setForGrid = setForGrid || state.colorConfig.set
	assignment = assignment || state.colorConfig.assignment

	let { offsetAddress, offsetSetForGridIndex, transformAssignedSet, mode, supertile, weave, flipGrain, switcheroo } = assignment

	offsetSetForGridIndex = offsetSetForGridIndex || state.colorConfig.assignment.offsetSetForGridIndex
	offsetAddress = offsetAddress || state.colorConfig.assignment.offsetAddress
	mode = mode || state.colorConfig.assignment.mode
	supertile = supertile || state.colorConfig.assignment.supertile
	weave = weave || state.colorConfig.assignment.weave
	flipGrain = flipGrain || state.colorConfig.assignment.flipGrain
	switcheroo = switcheroo || state.colorConfig.assignment.switcheroo

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
		setForTile = supertileEntry.map(index => wrappedIndex({ array: setForGrid, index: index + setForGridIndexOffset }))
	}

	if (flipGrain) setForTile = setForTile.reverse()
	if (switcheroo) setForTile = switcherooSet({ setForTile, address })

	transformAssignedSet = transformAssignedSet || state.colorConfig.assignment.transformAssignedSet
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
