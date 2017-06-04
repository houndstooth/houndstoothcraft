import state from '../state/state'
import houndsmorphosisOriginAndVector from '../../houndsmorphosis/houndsmorphosisOriginAndVector'

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

const calculateVector = () => [ state.vector[ 0 ] * state.unit, state.vector[ 1 ] * state.unit ]

const standardOriginAndVector = ({ address }) => ({
	vector: calculateVector(),
	origin: adjustOrigin({ 
		origin: [ address[ 0 ] * state.vector[ 0 ], address[ 1 ] * state.vector[ 1 ] ] 
	})
})

const calculateOriginAndVector = ({ address }) => {
	const originAndVectorFunction = state.houndsmorphosisMode ? houndsmorphosisOriginAndVector : standardOriginAndVector
	return originAndVectorFunction({ address })
}

export default {
	adjustOrigin,
	calculateVector,
	calculateOriginAndVector
}
