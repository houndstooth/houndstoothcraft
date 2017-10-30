import { Outline } from '../space'
import { applyView } from '../view'
import { buildFill } from './buildFill'
import { buildPath } from './buildPath'
import { fillPath } from './fillPath'
import { Color, Path } from './types'

const MINIMUM_POLYGON_COORDINATE_COUNT: number = 3

const fill: (_: { outline: Outline, shapeColor: Color }) => void =
	({ outline, shapeColor }: { outline: Outline, shapeColor: Color }): void => {
		if (outline.length < MINIMUM_POLYGON_COORDINATE_COUNT) {
			return
		}

		const path: Path = applyView(outline)
		buildPath({ path })

		buildFill({ shapeColor })
		fillPath()
	}

export { fill }
