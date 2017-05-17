import render from './render'
import { UNIT } from '../common/customize'
import scalePoint from '../utilities/scalePoint'
import rotateCoordinatesAboutPoint from '../utilities/rotateCoordinatesAboutPoint'

export default ({ origin, center, size, color, scaleFromGridCenter, rotationAboutCenter, rotationAboutOrigin }) => {
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

	let coordinates = [
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

	if (rotationAboutCenter) coordinates = rotateCoordinatesAboutPoint({ point: center, coordinates, rotation: rotationAboutCenter })
	if (rotationAboutOrigin) coordinates = rotateCoordinatesAboutPoint({ point: origin, coordinates, rotation: rotationAboutOrigin })

	render({ color, coordinates })
}