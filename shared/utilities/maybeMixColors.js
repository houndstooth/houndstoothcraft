import { GINGHAM_MODE } from '../common/customize'
import mixColors from './mixColors'

export default ({ colors }) => {
	let mixedColors = []
	if (GINGHAM_MODE) {
		mixedColors[ 0 ] = mixColors(colors[ 0 ], colors[ 1 ])
		mixedColors[ 1 ] = mixedColors[ 0 ]
	} else {
		mixedColors = colors
	}
	return mixedColors
}