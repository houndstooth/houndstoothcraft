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

	if (state.shared.color.houndazzle.on) {
		iterator(substripeCount).forEach(substripeIndex => {
			drawShape({
				origin,
				center,
				color: substripeIndex % 2 === 1 ? color : dazzleColor,
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

const drawStripes = ({ sizedUnit, center, origin, rotationAboutCenter, colors, stripes, stripeCount, dazzleColors, orientations }) => {
	const { substripeCount } = state.shared.color.houndazzle
	const substripeUnit = sizedUnit / substripeCount
	const stripeUnit = sizedUnit * 2 / stripeCount

	stripes.forEach((currentPositionAlongPerimeter, stripeIndex) => {
		const nextPositionAlongPerimeter = stripes[ stripeIndex + 1 ] || 2
		if (state.shared.color.houndazzle.on) {
			const orientation = wrappedIndex({ array: orientations, index: stripeIndex })
			iterator(substripeCount).forEach(substripeIndex => {
				drawShape({
					origin,
					center,
					colors: substripeIndex % 2 === 0 ? colors : dazzleColors,
					rotationAboutCenter,
					sizedUnit,
					stripeIndex,
					substripeIndex,
					coordinatesFunction: calculateSubstripeStripeUnionCoordinates,
					coordinatesFunctionArguments: {
						currentPositionAlongPerimeter,
						nextPositionAlongPerimeter,
						substripeUnit,
						stripeUnit,
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
					scaleFromGridCenter,
					rotationAboutCenter
				}) => {
	const { unit, tileSize, stripeCount: stateStripeCount, color: stateColor } = state.shared

	size = size || tileSize
	const sizedUnit = size * unit

	const { calculateOriginAndCenter /*, isOnCanvas */ } = transpositionUtilities
	const { calculateColors, allColorsAreTheSame } = colorUtilities

	const { origin, center } = calculateOriginAndCenter({
		initialOrigin,
		initialCenter,
		scaleFromGridCenter,
		sizedUnit
	})

	// if (!isOnCanvas({ center, sizedUnit })) return

	colors = calculateColors({ origin: initialOrigin, colors, color: stateColor })

	const { color: stateDazzleColor, orientation: stateOrientation } = stateColor.houndazzle
	let dazzleColors
	dazzleColors = calculateColors({ origin: initialOrigin, colors: dazzleColors, color: stateDazzleColor })
	const orientations = gridUtilities.calculateSetForTile({ origin: initialOrigin, grid: stateOrientation })

	if (allColorsAreTheSame({ colors })) {
		const color = colors[ 0 ]
		const dazzleColor = dazzleColors[ 0 ]
		const orientation = orientations[ 0 ]
		if (color.a === 0 && !state.shared.color.houndazzle.on) return
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
		let stripeCount = stateStripeCount.baseCount
		if (stateStripeCount.ginghamChevronContinuum.on) {
			stripes = calculateGinghamChevronContinuumStripes({ origin: initialOrigin })
		}
		stripes = stripes || calculateStripes({ stripeCount })

		drawStripes({
			sizedUnit,
			center,
			origin,
			rotationAboutCenter,
			colors,
			stripes,
			stripeCount,
			dazzleColors,
			orientations
		})
	}
}
