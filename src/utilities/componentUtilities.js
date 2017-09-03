import { QUARTER_OF_CIRCLE_ROTATION } from '../constants'
import codeUtilities from './codeUtilities'
import rotationUtilities from './rotationUtilities'
import store from '../../store'

const getSetIndicesForTile = ({ gridAddress, settings }) => {
	const { wrappedIndex } = codeUtilities

	let { assignment } = settings || {}
	const currentAssignment = store.mainHoundstooth.basePattern.colorSettings.assignment
	assignment = assignment || currentAssignment

	let { offsetAddress, transformAssignedSet, assignmentMode, supertile, weave, flipGrain, switcheroo } = assignment

	const addressOffset = offsetAddress ? offsetAddress({ gridAddress }) : [ 0, 0 ]
	assignmentMode = assignmentMode || currentAssignment.assignmentMode
	supertile = supertile || currentAssignment.supertile
	weave = weave || currentAssignment.weave
	let setIndicesForTile
	if (assignmentMode === 'WEAVE') {
		const { rows, columns } = weave
		const columnsIndex = wrappedIndex({ array: columns, index: gridAddress[ 0 ] + addressOffset[ 0 ] })
		const rowsIndex = wrappedIndex({ array: rows, index: gridAddress[ 1 ] + addressOffset[ 1 ] })
		setIndicesForTile = [ rowsIndex, columnsIndex ]
	}
	else if (assignmentMode === 'SUPERTILE') {
		const supertileColumn = wrappedIndex({ array: supertile, index: gridAddress[ 0 ] + addressOffset[ 0 ] })
		setIndicesForTile = wrappedIndex({ array: supertileColumn, index: gridAddress[ 1 ] + addressOffset[ 1 ] })
	}

	if (flipGrain) setIndicesForTile = setIndicesForTile.reverse()
	if (switcheroo) setIndicesForTile = switcherooSet({ setForTile: setIndicesForTile, gridAddress })
	if (transformAssignedSet) setIndicesForTile = transformAssignedSet({ setForTile: setIndicesForTile, gridAddress })

	return setIndicesForTile
}

const switcherooSet = ({ setForTile, gridAddress }) => {
	const xMod = gridAddress[ 0 ] % 4
	const yMod = gridAddress[ 1 ] % 4
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

const tileCenter = ({ tileOrigin, tileSize }) => ([
	tileOrigin[ 0 ] + tileSize / 2,
	tileOrigin[ 1 ] + tileSize / 2,
])

const rotateCoordinatesAboutTileCenter = ({ coordinates, tileOrigin, tileSize }) => {
	if (store.mainHoundstooth.basePattern.stripeSettings.baseStripeDiagonal === 'PRINCIPAL') {
		coordinates = rotationUtilities.rotateCoordinatesAboutPoint({
			point: tileCenter({ tileOrigin, tileSize }),
			coordinates,
			rotation: QUARTER_OF_CIRCLE_ROTATION,
		})
	}

	return coordinates
}

const getStandardTileOriginAndSize = ({ gridAddress }) => {
	const tileSize = store.mainHoundstooth.basePattern.tileSettings.tileSizeSetting
	return {
		tileOrigin: [ gridAddress[ 0 ] * tileSize, gridAddress[ 1 ] * tileSize ],
		tileSize,
	}
}

const getTileOriginAndSize = ({ gridAddress }) => {
	const getTileOriginAndSize = store.mainHoundstooth.basePattern.tileSettings.getTileOriginAndSize || getStandardTileOriginAndSize
	return getTileOriginAndSize({ gridAddress })
}

const distanceFromZeroZeroAddress = ({ gridAddress }) => {
	return gridAddress.reduce((a, b) => Math.abs(a) + Math.abs(b), 0)
}

export default {
	getSetIndicesForTile,
	rotateCoordinatesAboutTileCenter,
	getTileOriginAndSize,
	distanceFromZeroZeroAddress,
	tileCenter,
}
