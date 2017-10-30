import { Color, fill, getColor } from '../render'
import { SolidParams } from './types'

const solid: (_: SolidParams) => void =
	({ outline, shapeColorIndex }: SolidParams): void => {
		const shapeColor: Color = getColor({ index: shapeColorIndex || 0 })
		if (shapeColor.a === 0) {
			return
		}

		fill({ outline, shapeColor })
	}

export { solid }
