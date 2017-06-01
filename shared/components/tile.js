import render from '../render/render'
import state from '../state/state'
import iterator from '../utilities/iterator'
import wrappedIndex from '../utilities/wrappedIndex'
import colorUtilities from '../utilities/colorUtilities'
import transpositionUtilities from '../utilities/transpositionUtilities'
import rotationUtilities from '../utilities/rotationUtilities'
import gridUtilities from '../utilities/gridUtilities'
import calculateStripes from '../utilities/calculateStripes'
import calculateHoundazzleSolidTileSubstripeCoordinates from '../../houndazzle/calculateHoundazzleSolidTileSubstripeCoordinates'
import calculateSubstripeStripeUnionCoordinates from '../../houndazzle/calculateSubstripeStripeUnionCoordinates'
import substripeModulus from '../../houndazzle/substripeModulus'

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
					   // need one or the other. origin when stripes, center when square.
					   origin,
					   center,

					   // optional, for maybe rotate
					   rotationAboutCenter,

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

	coordinates = rotationUtilities.maybeRotateCoordinates({ coordinates, center, origin, rotationAboutCenter })
	render({ color, coordinates })
}

const drawSquare = ({ sizedUnit, center, origin, rotationAboutCenter, colors, dazzleColors, dazzleOrientations }) => {
	const color = colors[ 0 ]
	const dazzleColor = dazzleColors[ 0 ]
	const orientation = dazzleOrientations[ 0 ]
	if (color.a === 0 && dazzleColor.a === 0) return

	if (state.shared.color.mode === 'HOUNDAZZLE') {
		const { substripeCount } = state.shared.color.houndazzle
		iterator(substripeCount).forEach(substripeIndex => {
			const maybeDazzleColor = substripeModulus({ substripeIndex, nonDazzle: color, dazzle: dazzleColor })
			drawShape({
				origin,
				center,
				color: maybeDazzleColor,
				rotationAboutCenter,
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
			center,
			color,
			rotationAboutCenter,
			sizedUnit,
			coordinatesFunction: calculateSquareCoordinates
		})
	}
}

const drawStripes = ({ sizedUnit, center, origin, rotationAboutCenter, colors, stripes, dazzleColors, dazzleOrientations }) => {
	stripes.forEach((stripeStart, stripeIndex) => {
		const stripeEnd = stripes[ stripeIndex + 1 ] || 2
		if (state.shared.color.mode === 'HOUNDAZZLE') {
			const orientation = wrappedIndex({ array: dazzleOrientations, index: stripeIndex })
			const { substripeCount } = state.shared.color.houndazzle
			iterator(substripeCount).forEach(substripeIndex => {
				const maybeDazzleColors = substripeModulus({ substripeIndex, nonDazzle: colors, dazzle: dazzleColors })
				drawShape({
					origin,
					center,
					colors: maybeDazzleColors,
					rotationAboutCenter,
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
				center,
				colors,
				rotationAboutCenter,
				sizedUnit,
				stripeIndex,
				coordinatesFunction: calculateStripeCoordinates,
				coordinatesFunctionArguments: { stripeStart, stripeEnd }
			})
		}
	})
}

export default ({
					origin: initialOrigin,
					center: initialCenter,
					size,
					colors,
					scaleFromGridCenter,
					rotationAboutCenter,
					dazzleColors,
					dazzleOrientations
				}) => {
	const { unit, tileSize, stripeCount: stateStripeCount, color: stateColor } = state.shared

	size = size || tileSize
	const sizedUnit = size * unit

	const { calculateOriginAndCenter /*, isOnCanvas */ } = transpositionUtilities
	const { origin, center } = calculateOriginAndCenter({
		initialOrigin,
		initialCenter,
		scaleFromGridCenter,
		sizedUnit
	})
	// if (!isOnCanvas({ center, sizedUnit })) return

	colors = colorUtilities.calculateColors({ origin: initialOrigin, colors, color: stateColor })

	dazzleColors = colorUtilities.calculateColors({
		origin: initialOrigin,
		colors: dazzleColors,
		color: stateColor.houndazzle.color
	})
	dazzleOrientations = dazzleOrientations || gridUtilities.calculateSetForTile({
			origin: initialOrigin,
			grid: stateColor.houndazzle.orientation,
			gccOn: stateStripeCount.mode === 'GINGHAM_CHEVRON_CONTINUUM'
		})

	const uniformTile = colorUtilities.tileIsUniform({ colors, dazzleColors, dazzleOrientations })
	const drawFunction = uniformTile ? drawSquare : drawStripes
	const drawArguments = { sizedUnit, center, origin, rotationAboutCenter, colors, dazzleColors, dazzleOrientations }
	if (!uniformTile) drawArguments.stripes = calculateStripes({
		stripeCount: stateStripeCount.baseCount,
		origin: initialOrigin
	})
	drawFunction(drawArguments)
}
