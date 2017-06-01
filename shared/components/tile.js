import render from '../render/render'
import state from '../state/state'
import iterator from '../utilities/iterator'
import wrappedIndex from '../utilities/wrappedIndex'
import colorUtilities from '../utilities/colorUtilities'
import transpositionUtilities from '../utilities/transpositionUtilities'
import rotationUtilities from '../utilities/rotationUtilities'
import gridUtilities from '../utilities/gridUtilities'
import calculateStripes from '../utilities/calculateStripes'
import calculateGinghamChevronContinuumStripes from '../../gingham-chevron-continuum/calculateGinghamChevronContinuumStripes'
import calculateHoundazzleSolidTileSubstripeCoordinates from '../../houndazzle/calculateHoundazzleSolidTileSubstripeCoordinates'
import calculateSubstripeStripeUnionCoordinates from '../../houndazzle/calculateSubstripeStripeUnionCoordinates'
import substripeModulus from '../../houndazzle/substripeModulus'

const calculateSquareCoordinates = ({ center, sizedUnit }) => {
	const halfSizedUnit = sizedUnit / 2
	return [
		[ center[ 0 ] - halfSizedUnit, center[ 1 ] - halfSizedUnit ],
		[ center[ 0 ] + halfSizedUnit, center[ 1 ] - halfSizedUnit ],
		[ center[ 0 ] + halfSizedUnit, center[ 1 ] + halfSizedUnit ],
		[ center[ 0 ] - halfSizedUnit, center[ 1 ] + halfSizedUnit ]
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
	origin, //need
	center, //need
	colors,
	color,
	stripeIndex,
	substripeIndex,
	rotationAboutCenter, //need
	sizedUnit,
	coordinatesFunction,
	coordinatesFunctionArguments,
}) => {
	color = color || wrappedIndex({ array: colors, index: stripeIndex })
	if (color.a === 0) return

	let coordinates = coordinatesFunction({ origin, center, stripeIndex, substripeIndex, sizedUnit, coordinatesFunctionArguments })
	if (!coordinates) return

	coordinates = rotationUtilities.maybeRotateCoordinates({ coordinates, center, origin, rotationAboutCenter })
	render({ color, coordinates })
}

const drawSquare = ({ sizedUnit, center, origin, rotationAboutCenter, color, dazzleColor, orientation }) => {
	if (state.shared.color.mode === 'HOUNDAZZLE') {
		const { substripeCount } = state.shared.color.houndazzle
		iterator(substripeCount).forEach(substripeIndex => {
			const maybeDazzleColor = substripeModulus({ substripeIndex, nonDazzle: color, dazzle: dazzleColor })
			drawShape({
				origin,
				center,
				color: maybeDazzleColor,
				substripeIndex,
				rotationAboutCenter,
				sizedUnit,
				coordinatesFunction: calculateHoundazzleSolidTileSubstripeCoordinates,
				coordinatesFunctionArguments: {
					substripeUnit: sizedUnit / substripeCount,
					orientation
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

const drawStripes = ({ sizedUnit, center, origin, rotationAboutCenter, colors, stripes, dazzleColors, orientations }) => {
	stripes.forEach((stripeStart, stripeIndex) => {
		const stripeEnd = stripes[ stripeIndex + 1 ] || 2
		if (state.shared.color.mode === 'HOUNDAZZLE') {
			const orientation = wrappedIndex({ array: orientations, index: stripeIndex })
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
					substripeIndex,
					coordinatesFunction: calculateSubstripeStripeUnionCoordinates,
					coordinatesFunctionArguments: {
						stripeStart,
						stripeEnd,
						substripeUnit: sizedUnit / substripeCount,
						orientation
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
	dazzleColors,
	dazzleOrientations,
	scaleFromGridCenter,
	rotationAboutCenter
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

	const { calculateColors, allColorsAreTheSame } = colorUtilities
	colors = calculateColors({ origin: initialOrigin, colors, color: stateColor })

	const gccOn = stateStripeCount.mode === 'GINGHAM_CHEVRON_CONTINUUM'
	const { calculateSetForTile } = gridUtilities
	const { color: stateDazzleColor, orientation: stateOrientation } = stateColor.houndazzle
	dazzleColors = calculateColors({ origin: initialOrigin, colors: dazzleColors, color: stateDazzleColor })
	dazzleOrientations = dazzleOrientations || calculateSetForTile({ origin: initialOrigin, grid: stateOrientation, gccOn })

	if (allColorsAreTheSame({ colors })) {
		const color = colors[ 0 ]
		const dazzleColor = dazzleColors[ 0 ]
		const orientation = dazzleOrientations[ 0 ]
		if (color.a === 0 && state.shared.color.mode !== 'HOUNDAZZLE') return
		drawSquare({
			sizedUnit,
			center,
			origin,
			rotationAboutCenter,
			color,
			dazzleColor,
			orientation
		})
	} else {
		let stripes
		if (gccOn) stripes = calculateGinghamChevronContinuumStripes({ origin: initialOrigin })
		stripes = stripes || calculateStripes({ stripeCount: stateStripeCount.baseCount })

		drawStripes({
			sizedUnit,
			center,
			origin,
			rotationAboutCenter,
			colors,
			stripes,
			dazzleColors,
			orientations: dazzleOrientations
		})
	}
}
