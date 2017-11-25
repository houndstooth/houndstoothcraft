import { applyViewForShape, Color, Outline } from '../../pattern'
import { main as buildFill } from './buildFill'
import { main as buildPath } from './buildPath'
import { main as fillPath } from './fillPath'
import { Path } from './types'

const MINIMUM_POLYGON_COORDINATE_COUNT: number = 3

const fill: (_: { outline: Outline, shapeColor: Color }) => void =
	({ outline, shapeColor }: { outline: Outline, shapeColor: Color }): void => {
		if (outline.length < MINIMUM_POLYGON_COORDINATE_COUNT) {
			return
		}

		const path: Path = applyViewForShape.main(outline)
		buildPath({ path })

		buildFill({ shapeColor })
		fillPath()
	}

export { fill as main }
