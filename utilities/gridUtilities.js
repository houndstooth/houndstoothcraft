import maybeRealign from '../variations/gingham-chevron-continuum/maybeRealign'
import calculateHoundsmorphosisSupertile from '../variations/houndsmorphosis/calculateHoundsmorphosisSupertile'
import wrappedIndex from './wrappedIndex'
import state from '../state/state'

const calculateSetForTile = ({ address, config, gccOn }) => {
	let { set: setForPattern, assignment } = config || {}

	let fallbackOffset = 0
	if (!setForPattern) {
		setForPattern = state.colorConfig.set
		fallbackOffset = 1
	}

	assignment = assignment || state.colorConfig.assignment
	let { offset, mode, supertile, weave, flipGrain, switcheroo } = assignment

	offset = offset || state.colorConfig.assignment.offset
	const x = address[ 0 ] + offset[ 0 ]
	const y = address[ 1 ] + offset[ 1 ]

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
		if (state.houndsmorphosisMode) supertile = calculateHoundsmorphosisSupertile({ address })
		const supertileColumn = wrappedIndex({ array: supertile, index: x })
		const supertileEntry = wrappedIndex({ array: supertileColumn, index: y })
		setForTile = supertileEntry.map(index => wrappedIndex({ array: setForPattern, index: index + fallbackOffset }))
	}

	setForTile = flipGrain ? setForTile.reverse() : setForTile
	setForTile = switcheroo ? maybeSwitcheroo({ setForTile, address }) : setForTile
	setForTile = gccOn ? maybeRealign({ setForTile, address }) : setForTile

	return setForTile
}

const maybeSwitcheroo = ({ setForTile, address }) => {
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
	calculateSetForTile
}
