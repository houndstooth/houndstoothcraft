import { fill } from '../../app'
import { Color } from '../../types'
import { getColor } from '../color'
import { SolidParams } from './types'

const solid: (_: SolidParams) => void =
	({ outline, shapeColorIndex }: SolidParams): void => {
		const shapeColor: Color = getColor.default({ index: shapeColorIndex })
		if (shapeColor.a === 0) {
			return
		}

		fill.default({ outline, shapeColor })
	}

export default solid
