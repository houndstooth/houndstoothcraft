import wrappedIndex from './wrappedIndex'
import maybeRealign from '../../gingham-chevron-continuum/maybeRealign'
import state from '../../shared/state/state'

const calculateSetForTile = ({ address, grid, gccOn }) => {
	let { set, assignment } = grid || {}

	let fallbackOffset = 0
	if (!set) {
		set = state.shared.color.set
		fallbackOffset = 1
	}

	assignment = assignment || state.shared.color.assignment
	let { offset, mode, supertile, weave, flipGrain, switcheroo } = assignment

	offset = offset || state.shared.color.assignment.offset
	const x = address[ 0 ] + offset[ 0 ]
	const y = address[ 1 ] + offset[ 1 ]

	let setForTile

	if (mode === 'WEAVE') {
		const { rows, columns } = weave
		const columnsIndex = wrappedIndex({ array: columns, index: x + fallbackOffset })
		const rowsIndex = wrappedIndex({ array: rows, index: y + fallbackOffset })
		setForTile = [ set[ rowsIndex ], set[ columnsIndex ] ]
	} else if (mode === 'SUPERTILE') {
		const supertileColumn = wrappedIndex({ array: supertile, index: x + fallbackOffset })
		const supertileEntry = wrappedIndex({ array: supertileColumn, index: y + fallbackOffset })
		setForTile = supertileEntry.map(index => set[ index ])
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