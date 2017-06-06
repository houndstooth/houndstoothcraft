import realignSetForGinghamChevronContinuum from '../variations/gingham-chevron-continuum/realignSetForGinghamChevronContinuum'
import codeUtilities from './codeUtilities'
import state from '../state/state'

const getSetForTile = ({ address, config, gccOn }) => {
	const { wrappedIndex } = codeUtilities
	let { set: setForPattern, assignment } = config || {}

	let fallbackOffset = 0
	if (!setForPattern) {
		setForPattern = state.colorConfig.set
		fallbackOffset = 1
	}

	assignment = assignment || state.colorConfig.assignment
	let { addressOffsetFunction, mode, supertile, weave, flipGrain, switcheroo } = assignment

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
			wrappedIndex({ array: setForPattern, index: rowsIndex }),
			wrappedIndex({ array: setForPattern, index: columnsIndex })
		]
	} else if (mode === 'SUPERTILE') {
		const supertileColumn = wrappedIndex({ array: supertile, index: x })
		const supertileEntry = wrappedIndex({ array: supertileColumn, index: y })
		setForTile = supertileEntry.map(index => wrappedIndex({ array: setForPattern, index: index + fallbackOffset }))
	}

	if (flipGrain) setForTile = setForTile.reverse()
	if (switcheroo) setForTile = switcherooSet({ setForTile, address })
	if (gccOn) setForTile = realignSetForGinghamChevronContinuum({ setForTile, address })

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
