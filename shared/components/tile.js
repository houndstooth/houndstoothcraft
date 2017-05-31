import render from '../render/render'
import state from '../state/state'
import iterator from '../utilities/iterator'
import colorUtilities from '../utilities/colorUtilities'
import transpositionUtilities from '../utilities/transpositionUtilities'
import rotationUtilities from '../utilities/rotationUtilities'
import calculateStripes from '../utilities/calculateStripes'
import calculateGinghamChevronContinuumStripes from '../../gingham-chevron-continuum/calculateGinghamChevronContinuumStripes'
import calculateHoundazzleSolidTileSubstripeCoordinates from '../../houndazzle/calculateHoundazzleSolidTileSubstripeCoordinates'
import calculateSubstripeStripeUnionCoordinates from '../../houndazzle/calculateSubstripeStripeUnionCoordinates'

const calculateSquareCoordinates = ({ center, sizedUnit }) => {
	const halfSizedUnit = sizedUnit / 2
	return [
		[
			center[ 0 ] - halfSizedUnit,
			center[ 1 ] - halfSizedUnit
		],
		[
			center[ 0 ] + halfSizedUnit,
			center[ 1 ] - halfSizedUnit
		],
		[
			center[ 0 ] + halfSizedUnit,
			center[ 1 ] + halfSizedUnit
		],
		[
			center[ 0 ] - halfSizedUnit,
			center[ 1 ] + halfSizedUnit
		]
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
					   stripeIndex,
					   substripeIndex,
					   rotationAboutCenter,
					   sizedUnit,
					   coordinatesFunction,
					   coordinatesFunctionArguments
				   }) => {
	const color = colorUtilities.calculateColor({ colors, stripeIndex, substripeIndex })
	if (color.a === 0) return

	let coordinates = coordinatesFunction({ origin, center, stripeIndex, substripeIndex, sizedUnit, coordinatesFunctionArguments })
	if (!coordinates) return

	coordinates = rotationUtilities.maybeRotateCoordinates({ coordinates, center, origin, rotationAboutCenter })
	render({ color, coordinates })
}

const drawSquare = ({ sizedUnit, center, origin, rotationAboutCenter, color }) => {
	const { fadeColors, colorsAreTheSameHue } = colorUtilities
	const colors = fadeColors({ colors: state.shared.color.colors })

	const underlyingColor = colorsAreTheSameHue({ colorOne: color, colorTwo: state.shared.color.colors[ 1 ] }) ? 1 : 0
	const { substripeCount } = state.shared.color.houndazzle
	const substripeUnit = sizedUnit / substripeCount

	if (state.shared.color.houndazzle.on) {
		iterator(substripeCount).forEach(substripeIndex => {
			drawShape({
				origin,
				center,
				colors,
				stripeIndex: underlyingColor,
				substripeIndex,
				rotationAboutCenter,
				sizedUnit,
				underlyingColor,
				coordinatesFunction: calculateHoundazzleSolidTileSubstripeCoordinates,
				coordinatesFunctionArguments: { substripeUnit, underlyingColor }
			})
		})
	} else {
		drawShape({
			origin,
			center,
			colors: [ color, color ],
			rotationAboutCenter,
			sizedUnit,
			coordinatesFunction: calculateSquareCoordinates,
		})
	}
}

const drawStripes = ({ sizedUnit, center, origin, rotationAboutCenter, colors, stripes, stripeCount }) => {
	const { substripeCount } = state.shared.color.houndazzle
	const substripeUnit = sizedUnit / substripeCount
	const stripeUnit = sizedUnit * 2 / stripeCount
	const { calculateColor, colorsAreTheSameHue } = colorUtilities

	const colorOne = calculateColor({ colors, stripeIndex: 0 })
	const colorTwo = state.shared.color.colors[ 0 ]
	const underlyingColor = colorsAreTheSameHue({ colorOne, colorTwo }) ? 0 : 1

	stripes.forEach((currentPositionAlongPerimeter, stripeIndex) => {
		const nextPositionAlongPerimeter = stripes[ stripeIndex + 1 ] || 2
		if (state.shared.color.houndazzle.on) {
			iterator(substripeCount).forEach(substripeIndex => {
				drawShape({
					origin,
					center,
					colors,
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
						underlyingColor
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
	const { unit, tileSize, stripeCount: stateStripeCount } = state.shared

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

	colors = calculateColors({ origin: initialOrigin, colors })

	if (allColorsAreTheSame({ colors })) {
		const color = colors[ 0 ]
		if (color.a === 0 && !state.shared.color.houndazzle.on) return
		drawSquare({
			sizedUnit,
			center,
			origin,
			rotationAboutCenter,
			color
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
			stripeCount
		})
	}
}
