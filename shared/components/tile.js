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

					   // optional, for maybe rotate
					   rotation,

					   // need one or the other. colors when stripes, color when square.
					   colors,
					   color,

					   stripeIndex,
					   sizedUnit,
					   coordinatesFunction,
					   coordinatesFunctionArguments,
				   }) => {
	color = color || wrappedIndex({ array: colors, index: stripeIndex })
	if (color.a === 0) return

	let coordinates = coordinatesFunction({ origin, sizedUnit, coordinatesFunctionArguments })
	if (!coordinates) return

	const { maybeRotateCoordinates, calculateCenter } = rotationUtilities
	coordinates = maybeRotateCoordinates({ coordinates, center: calculateCenter({ origin, sizedUnit }), rotation })
	render({ color, coordinates })
}

const drawSquare = ({ sizedUnit, origin, rotation, colors, dazzle }) => {
	const color = colors[ 0 ]
	const dazzleColor = dazzle.colors[ 0 ]
	const orientation = dazzle.orientations[ 0 ]
	if (color.a === 0 && dazzleColor.a === 0) return

	if (state.shared.color.mode === 'HOUNDAZZLE') {
		const { substripeCount } = state.shared.color.houndazzle
		iterator(substripeCount).forEach(substripeIndex => {
			const maybeDazzleColor = substripeModulus({ substripeIndex, nonDazzle: color, dazzle: dazzleColor })
			drawShape({
				origin,
				color: maybeDazzleColor,
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
			color,
			rotation,
			sizedUnit,
			coordinatesFunction: calculateSquareCoordinates
		})
	}
}

const drawStripes = ({ sizedUnit, origin, rotation, colors, stripes, dazzle }) => {
	stripes.forEach((stripeStart, stripeIndex) => {
		const stripeEnd = stripes[ stripeIndex + 1 ] || 2
		if (state.shared.color.mode === 'HOUNDAZZLE') {
			const orientation = wrappedIndex({ array: dazzle.orientations, index: stripeIndex })
			const { substripeCount } = state.shared.color.houndazzle
			iterator(substripeCount).forEach(substripeIndex => {
				const maybeDazzleColors = substripeModulus({ substripeIndex, nonDazzle: colors, dazzle: dazzle.colors })
				drawShape({
					origin,
					colors: maybeDazzleColors,
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

export default ({
					address,
					size,
					colors,
					scaleFromGridCenter,
					rotation,
					initialDazzle
				}) => {
	const { unit, tileSize, stripeCountConfig, color } = state.shared

	size = size || tileSize
	const sizedUnit = size * unit

	const origin = transpositionUtilities.calculateOrigin({ address, scaleFromGridCenter, sizedUnit })

	colors = colorUtilities.calculateColors({ address, colors, color })

	const dazzle = calculateDazzleForTile({ address, initialDazzle })

	const uniformTile = colorUtilities.tileIsUniform({ colors, dazzle })
	const drawFunction = uniformTile ? drawSquare : drawStripes
	const drawArguments = { sizedUnit, origin, rotation, colors, dazzle }
	if (!uniformTile) drawArguments.stripes = calculateStripes({ stripeCount: stripeCountConfig.stripeCount, address })
	drawFunction(drawArguments)
}
