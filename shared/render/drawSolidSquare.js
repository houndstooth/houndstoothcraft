import render from './render'
import { UNIT } from '../common/customize'
import scaleOrigin from '../utilities/scaleOrigin'
import rotateCoordinates from '../utilities/rotateCoordinates'

export default ({ origin, size, color, scaleFromCenter, rotation }) => {
	origin = scaleOrigin({ origin, scaleFromCenter })
	const sizedUnit = UNIT * size

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

	if (rotation) coordinates = rotateCoordinates({ origin, coordinates, rotation })

	render({ color, coordinates })
}