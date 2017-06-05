import state from '../state/state'
import houndsmorphosisOriginAndSizedUnit from '../../variations/houndsmorphosis/houndsmorphosisOriginAndSizedUnit'

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

const calculateSizedUnit = () => state.tileSize * state.unit

const standardOriginAndSizedUnit = ({ address }) => ({
	sizedUnit: calculateSizedUnit(),
	origin: adjustOrigin({ 
		origin: [ address[ 0 ] * state.tileSize, address[ 1 ] * state.tileSize ] 
	})
})

const calculateOriginAndSizedUnit = ({ address }) => {
	const originAndSizedUnitFunction = state.houndsmorphosisMode ? houndsmorphosisOriginAndSizedUnit : standardOriginAndSizedUnit
	return originAndSizedUnitFunction({ address })
}

export default {
	adjustOrigin,
	calculateSizedUnit,
	calculateOriginAndSizedUnit
}
