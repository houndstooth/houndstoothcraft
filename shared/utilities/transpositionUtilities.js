import state from '../state/state'
import houndsmorphosisTranspositionUtilities from '../../houndsmorphosis/houndsmorphosisTranspositionUtilities'

const scaleOrigin = ({ origin }) => {
	const { unit, canvasSize, scaleFromGridCenter } = state
	const canvasCenter = [ canvasSize / 2, canvasSize / 2 ]

	if (scaleFromGridCenter) {
		origin[ 0 ] -= canvasCenter[ 0 ]
		origin[ 1 ] -= canvasCenter[ 1 ]
	}

	origin[ 0 ] *= unit
	origin[ 1 ] *= unit

	if (scaleFromGridCenter) {
		origin[ 0 ] += canvasCenter[ 0 ]
		origin[ 1 ] += canvasCenter[ 1 ]
	}

	return origin
}

const maybeOffsetOrigin = ({ origin }) => {
	const offsetOrigin = state.offsetOrigin
	if (offsetOrigin) {
		origin[ 0 ] += offsetOrigin[ 0 ]
		origin[ 1 ] += offsetOrigin[ 1 ]
	}
	return origin
}

const adjustOrigin = ({ origin }) => {
	origin = scaleOrigin({ origin })
	return maybeOffsetOrigin({ origin })
}

const calculateOrigin = ({ address }) => {
	const { tileSize, offsetOrigin } = state
	let origin = [ address[ 0 ] * tileSize, address[ 1 ] * tileSize ]
	return adjustOrigin({ origin })
}

const calculateSizedUnit = ({ size }) => (size || state.tileSize) * state.unit

const calculateOriginAndSizedUnit = ({ address, size }) => {
	let sizedUnit, origin
	if (state.houndsmorphosisMode) {
		const { calculateHoundsmorphosisOrigin, calculateHoundsmorphosisSizedUnit } = houndsmorphosisTranspositionUtilities
		sizedUnit = calculateHoundsmorphosisSizedUnit({ address })
		origin = calculateHoundsmorphosisOrigin({ address })
	} else {
		sizedUnit = calculateSizedUnit({ size })
		origin = calculateOrigin({ address, sizedUnit })
	}
	return { origin, sizedUnit }
}

export default {
	adjustOrigin,
	calculateSizedUnit,
	calculateOriginAndSizedUnit
}
