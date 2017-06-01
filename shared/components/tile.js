import render from '../render/render'
import state from '../state/state'
import iterator from '../utilities/iterator'
import wrappedIndex from '../utilities/wrappedIndex'
import colorUtilities from '../utilities/colorUtilities'
import transpositionUtilities from '../utilities/transpositionUtilities'
import rotationUtilities from '../utilities/rotationUtilities'
import calculateStripes from '../utilities/calculateStripes'
import calculateHoundazzleSolidTileSubstripeCoordinates from '../../houndazzle/calculateHoundazzleSolidTileSubstripeCoordinates'
import calculateSubstripeStripeUnionCoordinates from '../../houndazzle/calculateSubstripeStripeUnionCoordinates'
import substripeModulus from '../../houndazzle/substripeModulus'
import calculateDazzleForTile from '../../houndazzle/calculateDazzleForTile'

const calculateSquareCoordinates = ({ origin, sizedUnit }) => {
	return [
		[
			origin[ 0 ],
			origin[ 1 ]
		],
		[
			origin[ 0 ] + sizedUnit,
			origin[ 1 ]
		],
		[
			origin[ 0 ] + sizedUnit,
			origin[ 1 ] + sizedUnit
		],
		[
			origin[ 0 ],
			origin[ 1 ] + sizedUnit
		]
	]
}

const calculateStripeCoordinates = ({ origin, sizedUnit, coordinatesFunctionArguments }) => {
	const { stripeStart, stripeEnd } = coordinatesFunctionArguments
	let coordinates = []

	if (stripeStart <= 1) {
		coordinates.push([
			origin[ 0 ] + stripeStart * sizedUnit,
			origin[ 1 ]
		])
	} else {
		coordinates.push([
			origin[ 0 ] + sizedUnit,
			origin[ 1 ] + (stripeStart - 1) * sizedUnit
		])
	}

	if (stripeEnd <= 1) {
		coordinates.push([
			origin[ 0 ] + stripeEnd * sizedUnit,
			origin[ 1 ]
		])
		coordinates.push([
			origin[ 0 ],
			origin[ 1 ] + stripeEnd * sizedUnit
		])
	} else {
		if (stripeStart <= 1) {
			coordinates.push([
				origin[ 0 ] + sizedUnit,
				origin[ 1 ]
			])
		}

		coordinates.push([
			origin[ 0 ] + sizedUnit,
			origin[ 1 ] + (stripeEnd - 1) * sizedUnit
		])
		coordinates.push([
			origin[ 0 ] + (stripeEnd - 1) * sizedUnit,
			origin[ 1 ] + sizedUnit
		])
	}

	if (stripeStart <= 1) {
		if (stripeEnd > 1) {
			coordinates.push([
				origin[ 0 ],
				origin[ 1 ] + sizedUnit
			])
		}
		coordinates.push([
			origin[ 0 ],
			origin[ 1 ] + stripeStart * sizedUnit
		])
	} else {
		coordinates.push([
			origin[ 0 ] + (stripeStart - 1) * sizedUnit,
			origin[ 1 ] + sizedUnit
		])
	}

	return coordinates
}

const drawShape = ({
					   origin,
					   rotation,
					   colors,
					   stripeIndex,
					   sizedUnit,
					   coordinatesFunction,
					   coordinatesFunctionArguments,
				   }) => {
	const color = wrappedIndex({ array: colors, index: stripeIndex })
	if (color.a === 0) return

	let coordinates = coordinatesFunction({ origin, sizedUnit, coordinatesFunctionArguments })
	if (!coordinates) return

	const { maybeRotateCoordinates, calculateCenter } = rotationUtilities
	coordinates = maybeRotateCoordinates({ coordinates, center: calculateCenter({ origin, sizedUnit }), rotation })
	render({ color, coordinates })
}

const drawSquare = ({ sizedUnit, origin, rotation, colors, dazzle }) => {
	if (state.shared.colorConfig.mode === 'HOUNDAZZLE') {
		const { substripeCount } = state.shared.colorConfig.houndazzle
		const orientation = dazzle.orientations[ 0 ]
		iterator(substripeCount).forEach(substripeIndex => {
			drawShape({
				origin,
				colors: substripeModulus({ substripeIndex, nonDazzle: colors, dazzle: dazzle.colors }),
				rotation,
				sizedUnit,
				coordinatesFunction: calculateHoundazzleSolidTileSubstripeCoordinates,
				coordinatesFunctionArguments: {
					substripeUnit: sizedUnit / substripeCount,
					orientation,
					substripeIndex
				}
			})
		})
	} else {
		drawShape({
			origin,
			colors,
			rotation,
			sizedUnit,
			coordinatesFunction: calculateSquareCoordinates
		})
	}
}

const drawStripes = ({ sizedUnit, origin, rotation, colors, stripes, dazzle }) => {
	stripes.forEach((stripeStart, stripeIndex) => {
		const stripeEnd = stripes[ stripeIndex + 1 ] || 2
		if (state.shared.colorConfig.mode === 'HOUNDAZZLE') {
			const orientation = wrappedIndex({ array: dazzle.orientations, index: stripeIndex })
			const { substripeCount } = state.shared.colorConfig.houndazzle
			iterator(substripeCount).forEach(substripeIndex => {
				drawShape({
					origin,
					colors: substripeModulus({ substripeIndex, nonDazzle: colors, dazzle: dazzle.colors }),
					rotation,
					sizedUnit,
					stripeIndex,
					coordinatesFunction: calculateSubstripeStripeUnionCoordinates,
					coordinatesFunctionArguments: {
						stripeStart,
						stripeEnd,
						substripeUnit: sizedUnit / substripeCount,
						orientation,
						substripeIndex
					}
				})
			})
		} else {
			drawShape({
				origin,
				colors,
				rotation,
				sizedUnit,
				stripeIndex,
				coordinatesFunction: calculateStripeCoordinates,
				coordinatesFunctionArguments: { stripeStart, stripeEnd }
			})
		}
	})
}

export default ({ address, size, colors, rotation, initialDazzle }) => {
	const { stripeCountConfig, colorConfig } = state.shared

	const { calculateSizedUnit, calculateOrigin } = transpositionUtilities
	const sizedUnit = calculateSizedUnit({ size })
	const origin = calculateOrigin({ address, sizedUnit })

	const { calculateColors, tileIsUniform } = colorUtilities
	colors = calculateColors({ address, colors, colorConfig })

	const dazzle = calculateDazzleForTile({ address, initialDazzle })

	const uniformTile = tileIsUniform({ colors, dazzle })
	const drawFunction = uniformTile ? drawSquare : drawStripes
	const drawArguments = { sizedUnit, origin, rotation, colors, dazzle }
	if (!uniformTile) drawArguments.stripes = calculateStripes({ stripeCount: stripeCountConfig.stripeCount, address })
	drawFunction(drawArguments)
}
