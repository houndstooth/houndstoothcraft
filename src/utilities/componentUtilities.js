import { QUARTER_OF_CIRCLE_ROTATION } from '../constants'
import codeUtilities from './codeUtilities'
import rotationUtilities from './rotationUtilities'
import store from '../../store'

const getSetForTile = ({ address, settings }) => {
	const { wrappedIndex } = codeUtilities

	let { set: setForGrid, assignment } = settings || {}

	setForGrid = setForGrid || store.currentState.mainHoundstooth.basePattern.colorSettings.set
	const currentAssignment = store.currentState.mainHoundstooth.basePattern.colorSettings.assignment
	assignment = assignment || currentAssignment

	let { offsetAddress, offsetSetForGridIndex, transformAssignedSet, assignmentMode, supertile, weave, flipGrain, switcheroo } = assignment

	const addressOffset = offsetAddress ? offsetAddress({ address }) : [ 0, 0 ]
	const setForGridIndexOffset = offsetSetForGridIndex ? offsetSetForGridIndex({ address }) : 0
	assignmentMode = assignmentMode || currentAssignment.assignmentMode
	supertile = supertile || currentAssignment.supertile
	weave = weave || currentAssignment.weave
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

const rotateShapeAboutShapeCenter = ({ coordinates, zoomedAndScrolledTileOrigin, zoomedTileSize }) => {
	if (store.currentState.mainHoundstooth.basePattern.stripeSettings.baseStripeDiagonal === 'PRINCIPAL') {
		coordinates = rotationUtilities.rotateCoordinatesAboutPoint({
			point: [
				zoomedAndScrolledTileOrigin[ 0 ] + zoomedTileSize / 2,
				zoomedAndScrolledTileOrigin[ 1 ] + zoomedTileSize / 2,
			],
			coordinates: coordinates,
			rotation: QUARTER_OF_CIRCLE_ROTATION,
		})
	}

	return coordinates
}

const getStandardTileOriginAndSize = ({ address }) => {
	const tileSize = store.currentState.mainHoundstooth.basePattern.tileSettings.tileSizeSetting
	return {
		tileOrigin: [ address[ 0 ] * tileSize, address[ 1 ] * tileSize ],
		tileSize,
	}
}

const getTileOriginAndSize = ({ address }) => {
	const getTileOriginAndSize = store.currentState.mainHoundstooth.basePattern.tileSettings.getTileOriginAndSize || getStandardTileOriginAndSize
	return getTileOriginAndSize({ address })
}

export default {
	getSetForTile,
	rotateShapeAboutShapeCenter,
	getTileOriginAndSize,
}
