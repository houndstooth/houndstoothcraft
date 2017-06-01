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
	const { currentPositionAlongPerimeter, nextPositionAlongPerimeter } = coordinatesFunctionArguments
	let coordinates = []

	if (currentPositionAlongPerimeter <= 1) {
		coordinates.push([
			origin[ 0 ] + currentPositionAlongPerimeter * sizedUnit,
			origin[ 1 ]
		])
	} else {
		coordinates.push([
			origin[ 0 ] + sizedUnit,
			origin[ 1 ] + (currentPositionAlongPerimeter - 1) * sizedUnit
		])
	}

	if ((nextPositionAlongPerimeter) <= 1) {
		coordinates.push([
			origin[ 0 ] + (nextPositionAlongPerimeter) * sizedUnit,
			origin[ 1 ]
		])
		coordinates.push([
			origin[ 0 ],
			origin[ 1 ] + (nextPositionAlongPerimeter) * sizedUnit
		])
	} else {
		if (currentPositionAlongPerimeter <= 1) {
			coordinates.push([
				origin[ 0 ] + sizedUnit,
				origin[ 1 ]
			])
		}

		coordinates.push([
			origin[ 0 ] + sizedUnit,
			origin[ 1 ] + (nextPositionAlongPerimeter - 1) * sizedUnit
		])
		coordinates.push([
			origin[ 0 ] + (nextPositionAlongPerimeter - 1) * sizedUnit,
			origin[ 1 ] + sizedUnit
		])
	}

	if (currentPositionAlongPerimeter <= 1) {
		if ((nextPositionAlongPerimeter) > 1) {
			coordinates.push([
				origin[ 0 ],
				origin[ 1 ] + sizedUnit
			])
		}
		coordinates.push([
			origin[ 0 ],
			origin[ 1 ] + currentPositionAlongPerimeter * sizedUnit
		])
	} else {
		coordinates.push([
			origin[ 0 ] + (currentPositionAlongPerimeter - 1) * sizedUnit,
			origin[ 1 ] + sizedUnit
		])
	}

	return coordinates
}

const drawShape = ({
	origin,
	center,
	colors,
	color,
	stripeIndex,
	substripeIndex,
	rotationAboutCenter,
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
	const { substripeCount } = state.shared.color.houndazzle
	const substripeUnit = sizedUnit / substripeCount

	if (state.shared.color.mode === 'HOUNDAZZLE') {
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
				coordinatesFunctionArguments: { substripeUnit, orientation }
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
	const { substripeCount } = state.shared.color.houndazzle
	const substripeUnit = sizedUnit / substripeCount

	stripes.forEach((currentPositionAlongPerimeter, stripeIndex) => {
		const nextPositionAlongPerimeter = stripes[ stripeIndex + 1 ] || 2
		if (state.shared.color.mode === 'HOUNDAZZLE') {
			const orientation = wrappedIndex({ array: orientations, index: stripeIndex })
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
						currentPositionAlongPerimeter,
						nextPositionAlongPerimeter,
						substripeUnit,
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
				coordinatesFunctionArguments: { currentPositionAlongPerimeter, nextPositionAlongPerimeter }
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
