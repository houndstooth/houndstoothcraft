import render from './render'
import { UNIT } from '../common/customize'
import scaleOrigin from '../utilities/scaleOrigin'

export default ({ origin, size, color, scaleFromCenter }) => {
	origin = scaleOrigin({ origin, scaleFromCenter })
	const sizedUnit = UNIT * size

	const coordinates = [
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

	render({ color, coordinates })
}