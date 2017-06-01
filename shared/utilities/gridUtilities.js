import wrappedIndex from './wrappedIndex'
import maybeRealign from '../../gingham-chevron-continuum/maybeRealign'
import state from '../../shared/state/state'

const calculateSetForTile = ({ origin, grid, gccOn }) => {
	let { set, assignment } = grid || {}

	let fallbackOffset = 0
	if (!set) {
		set = state.shared.color.set
		fallbackOffset = 1
	}

	assignment = assignment || state.shared.color.assignment
	const { offset, mode, supertile, weave, flipGrain, switcheroo } = assignment

	const x = origin[ 0 ] + offset[ 0 ]
	const y = origin[ 1 ] + offset[ 1 ]

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
	setForTile = switcheroo ? maybeSwitcheroo({ setForTile, origin }) : setForTile
	setForTile = gccOn ? maybeRealign({ setForTile, origin }) : setForTile

	return setForTile
}

const maybeSwitcheroo = ({ setForTile, origin }) => {
	const xMod = origin[ 0 ] % 4
	const yMod = origin[ 1 ] % 4
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