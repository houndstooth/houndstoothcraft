import { fill } from '../../app'
import { Color , getColor } from '../color'
import { SolidParams } from './types'

const solid: (_: SolidParams) => void =
	({ outline, shapeColorIndex }: SolidParams): void => {
		const shapeColor: Color = getColor({ index: shapeColorIndex })
		if (shapeColor.a === 0) {
			return
		}

		fill({ outline, shapeColor })
	}

export { solid }
