import { applyViewForShape, Outline } from '../../../pattern'
import { Color } from '../../../types'

import createPath from './createPath'
import fillPath from './fillPath'
import setupRenderStyle from './setupRenderStyle'
import { Path } from './types'

const MINIMUM_POLYGON_COORDINATE_COUNT: number = 3

const fill: (_: { outline: Outline, shapeColor: Color }) => void =
	({ outline, shapeColor }: { outline: Outline, shapeColor: Color }): void => {
		if (outline.length < MINIMUM_POLYGON_COORDINATE_COUNT) {
			return
		}

		const path: Path = applyViewForShape.default(outline)
		createPath({ path })

		setupRenderStyle({ shapeColor })
		fillPath()
	}

export default fill
