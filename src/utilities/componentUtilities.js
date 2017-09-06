import { QUARTER_OF_CIRCLE_ROTATION } from '../constants'
import codeUtilities from './codeUtilities'
import rotationUtilities from './rotationUtilities'
import store from '../../store'

const getSetIndicesForTile = ({ gridAddress }) => {
	const assignment = store.mainHoundstooth.basePattern.colorSettings.assignment

	let setIndicesForTile = getSetIndices({	gridAddress, assignment })

	return maybeAdjustSetIndices({ assignment, gridAddress, setIndicesForTile })
}

const maybeAdjustSetIndices = ({ assignment, gridAddress, setIndicesForTile }) => {
	let { transformAssignedSet, flipGrain, switcheroo } = assignment

	if (flipGrain) setIndicesForTile = setIndicesForTile.reverse()
	if (switcheroo) setIndicesForTile = switcherooSet({ setForTile: setIndicesForTile, gridAddress })
	if (transformAssignedSet) setIndicesForTile = transformAssignedSet({ setForTile: setIndicesForTile, gridAddress })

	return setIndicesForTile
}

const getSetIndices = ({ gridAddress, assignment }) => {
	const { offsetAddress, assignmentMode, weave, supertile } = assignment

	const addressOffset = offsetAddress ? offsetAddress({ gridAddress }) : [ 0, 0 ]

	let getter
	if (assignmentMode === 'WEAVE') {
		getter = getByWeave
	}
	else if (assignmentMode === 'SUPERTILE') {
		getter = getBySupertile
	}
	return getter({ gridAddress, addressOffset, weave, supertile })
}

const getByWeave = ({ gridAddress, addressOffset, weave }) => {
	const { rows, columns } = weave
	const columnsIndex = codeUtilities.wrappedIndex({ array: columns, index: gridAddress[ 0 ] + addressOffset[ 0 ] })
	const rowsIndex = codeUtilities.wrappedIndex({ array: rows, index: gridAddress[ 1 ] + addressOffset[ 1 ] })
	return [ rowsIndex, columnsIndex ]
}

const getBySupertile = ({ gridAddress, addressOffset, supertile }) => {
	const supertileColumn = codeUtilities.wrappedIndex({
		array: supertile,
		index: gridAddress[ 0 ] + addressOffset[ 0 ],
	})
	return codeUtilities.wrappedIndex({ array: supertileColumn, index: gridAddress[ 1 ] + addressOffset[ 1 ] })
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

const adjustForBaseStripeDiagonal = ({ coordinates, tileOrigin, tileSize }) => {
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

export default {
	getSetIndicesForTile,
	adjustForBaseStripeDiagonal,
	getTileOriginAndSize,
	tileCenter,
}
