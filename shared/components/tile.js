import state from '../state/state'
import colorUtilities from '../utilities/colorUtilities'
import transpositionUtilities from '../utilities/transpositionUtilities'
import calculateStripes from '../utilities/calculateStripes'
import houndazzleShapeWrapper from '../../houndazzle/houndazzleShapeWrapper'
import calculateDazzleForTile from '../../houndazzle/calculateDazzleForTile'
import shape from './shape'
import square from '../shapes/square'
import stripe from '../shapes/stripe'

const uniformTile = ({ sizedUnit, origin, rotation, colors, dazzle }) => {
	const shapeArguments = { origin, colors, rotation, sizedUnit }
	if (state.shared.colorConfig.mode === 'HOUNDAZZLE') {
		shapeArguments.dazzle = dazzle
		houndazzleShapeWrapper(shapeArguments)
	} else {
		shapeArguments.coordinatesFunction = square
		shape(shapeArguments)
	}
}

const stripedTile = ({ sizedUnit, origin, rotation, colors, stripes, dazzle }) => {
	stripes.forEach((stripeStart, stripeIndex) => {
		const stripeEnd = stripes[ stripeIndex + 1 ] || 2
		const coordinatesFunctionArguments = { stripeStart, stripeEnd }
		const shapeArguments = { origin, colors, rotation, sizedUnit, stripeIndex, coordinatesFunctionArguments }
		if (state.shared.colorConfig.mode === 'HOUNDAZZLE') {
			shapeArguments.dazzle = dazzle
			houndazzleShapeWrapper(shapeArguments)
		} else {
			shapeArguments.coordinatesFunction = stripe
			shape(shapeArguments)
		}
	})
}

export default ({ address, size, colors, rotation, initialDazzle }) => {
	const { stripeCountConfig, colorConfig } = state.shared

	const { calculateSizedUnit, calculateOrigin } = transpositionUtilities
	const sizedUnit = calculateSizedUnit({ size })
	const origin = calculateOrigin({ address, sizedUnit })

	const { calculateColors, isTileUniform } = colorUtilities
	colors = calculateColors({ address, colors, colorConfig })

	const dazzle = calculateDazzleForTile({ address, initialDazzle })

	const tileIsUniform = isTileUniform({ colors, dazzle })
	const tileFunction = tileIsUniform ? uniformTile : stripedTile
	const tileArguments = { sizedUnit, origin, rotation, colors, dazzle }
	if (!tileIsUniform) tileArguments.stripes = calculateStripes({ stripeCount: stripeCountConfig.stripeCount, address })
	tileFunction(tileArguments)
}
