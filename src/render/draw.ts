import { Context } from '../page'
import { Outline } from '../space'
import { applyView } from '../view'
import { fill } from './fill'
import { Color } from './types'
import { Path } from './types/Path'

const MINIMUM_POLYGON_COORDINATE_COUNT = 3

const draw: (_: {
	context: Context, outline: Outline, shapeColor: Color,
}) => void = ({ context, outline, shapeColor }) => {
	if (outline.length < MINIMUM_POLYGON_COORDINATE_COUNT) {
		return
	}
	const path: Path = applyView(outline)

	fill({ context, shapeColor, path })
}

export { draw }
