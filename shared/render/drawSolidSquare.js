import { UNIT } from '../common/customize'
import render from './render'

export default ({ origin, size, color }) => {
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