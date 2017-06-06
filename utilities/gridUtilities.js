import codeUtilities from './codeUtilities'
import state from '../state/state'

const getSetForTile = ({ address, config }) => {
	const { wrappedIndex } = codeUtilities
	let { set: setForGrid, assignment } = config || {}

	let fallbackOffset = 0
	if (!setForGrid) {
		setForGrid = state.colorConfig.set
		fallbackOffset = 1
	}

	assignment = assignment || state.colorConfig.assignment
	let { addressOffsetFunction, transformAssignedSet, mode, supertile, weave, flipGrain, switcheroo } = assignment

	let x = address[ 0 ]
	let y = address[ 1 ]
	addressOffsetFunction = addressOffsetFunction || state.colorConfig.assignment.addressOffsetFunction
	if (addressOffsetFunction) {
		const addressOffset = addressOffsetFunction({ address })
		x += addressOffset[ 0 ]
		y += addressOffset[ 1 ]
	}

	let setForTile

	if (mode === 'WEAVE') {
		const { rows, columns } = weave
		const columnsIndex = wrappedIndex({ array: columns, index: x + fallbackOffset })
		const rowsIndex = wrappedIndex({ array: rows, index: y + fallbackOffset })
		setForTile = [
			wrappedIndex({ array: setForGrid, index: rowsIndex }),
			wrappedIndex({ array: setForGrid, index: columnsIndex })
		]
	} else if (mode === 'SUPERTILE') {
		const supertileColumn = wrappedIndex({ array: supertile, index: x })
		const supertileEntry = wrappedIndex({ array: supertileColumn, index: y })
		setForTile = supertileEntry.map(index => wrappedIndex({ array: setForGrid, index: index + fallbackOffset }))
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
