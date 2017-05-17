import render from './render'
import { UNIT, STRIPE_ROTATION, BASE_STRIPE_DIAGONAL, STRIPE_COUNT } from '../common/customize'
import { MINOR_DIAGONAL_OFFSET, PRINCIPAL_DIAGONAL_OFFSET } from '../common/constants'
import rotateCoordinatesAboutPoint from '../utilities/rotateCoordinatesAboutPoint'
import scalePoint from '../utilities/scalePoint'
import iterator from '../utilities/iterator'

export default ({ origin, center, size, originColor, otherColor, scaleFromGridCenter, rotationAboutCenter, rotationAboutOrigin }) => {
	const sizedUnit = size * UNIT
	if (origin) {
		origin = scalePoint({ point: origin, scaleFromGridCenter })
		center = [
			origin[ 0 ] + sizedUnit / 2,
			origin[ 1 ] + sizedUnit / 2
		]
	} else if (center) {
		center = scalePoint({ point: center, scaleFromGridCenter })
		origin = [
			center[ 0 ] - sizedUnit / 2,
			center[ 1 ] - sizedUnit / 2
		]
	} else {
		console.log('neither origin nor center provided!')
	}

	let color
	let stripeWidthInTermsOfPerimeter = 2 / STRIPE_COUNT
	let currentPositionAlongPerimeter

	iterator(STRIPE_COUNT).forEach(i => {
		currentPositionAlongPerimeter = i * stripeWidthInTermsOfPerimeter
		color = i % 2 === 0 ? originColor : otherColor

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

		if ((currentPositionAlongPerimeter + stripeWidthInTermsOfPerimeter) <= 1) {

			coordinates.push([
				origin[ 0 ] + (currentPositionAlongPerimeter + stripeWidthInTermsOfPerimeter) * sizedUnit,
				origin[ 1 ]
			])
			coordinates.push([
				origin[ 0 ],
				origin[ 1 ] + (currentPositionAlongPerimeter + stripeWidthInTermsOfPerimeter) * sizedUnit
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
				origin[ 1 ] + (currentPositionAlongPerimeter - 1 + stripeWidthInTermsOfPerimeter) * sizedUnit
			])
			coordinates.push([
				origin[ 0 ] + (currentPositionAlongPerimeter - 1 + stripeWidthInTermsOfPerimeter) * sizedUnit,
				origin[ 1 ] + sizedUnit
			])
		}

		if (currentPositionAlongPerimeter <= 1) {
			if ((currentPositionAlongPerimeter + stripeWidthInTermsOfPerimeter) > 1) {
				coordinates.push([
					origin[ 0 ] ,
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

		if (rotationAboutCenter) {
			coordinates = rotateCoordinatesAboutPoint({ point: center, coordinates: coordinates, rotation: rotationAboutCenter })
		}

		if (rotationAboutOrigin) {
			coordinates = rotateCoordinatesAboutPoint({ point: origin, coordinates: coordinates, rotation: rotationAboutOrigin })
		}

		const offset = BASE_STRIPE_DIAGONAL === "MINOR" ? MINOR_DIAGONAL_OFFSET : PRINCIPAL_DIAGONAL_OFFSET
		const extraRotation = offset + STRIPE_ROTATION
		if (extraRotation !== 0) {
			coordinates = rotateCoordinatesAboutPoint({ point: center, coordinates: coordinates, rotation: extraRotation })
		}

		render({color, coordinates})
	})
}