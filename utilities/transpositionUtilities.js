import state from '../state/state'
import getHoundsmorphosisOriginAndSizedUnit from '../variations/houndsmorphosis/getHoundsmorphosisOriginAndSizedUnit'

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

const offsetOrigin = ({ origin }) => {
	return [
		origin[ 0 ] += state.offsetOrigin[ 0 ],
		origin[ 1 ] += state.offsetOrigin[ 1 ]
	]
}

const adjustOrigin = ({ origin }) => {
	origin = scaleOrigin({ origin })
	if (state.offsetOrigin) origin = offsetOrigin({ origin })
	return origin
}

const getSizedUnit = () => state.tileSize * state.unit

const getStandardOriginAndSizedUnit = ({ address }) => ({
	sizedUnit: getSizedUnit(),
	origin: adjustOrigin({
		origin: [ address[ 0 ] * state.tileSize, address[ 1 ] * state.tileSize ]
	})
})

const getOriginAndSizedUnit = ({ address }) => {
	const originAndSizedUnitFunction = state.houndsmorphosisMode ? getHoundsmorphosisOriginAndSizedUnit : getStandardOriginAndSizedUnit
	return originAndSizedUnitFunction({ address })
}

export default {
	adjustOrigin,
	getSizedUnit,
	getOriginAndSizedUnit
}
