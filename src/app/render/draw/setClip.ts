import { applyViewForShape, Outline } from '../../../pattern'

import clipPath from './clipPath'
import createPath from './createPath'
import { Path } from './types'

const setClip: (_: { outline: Outline }) => void =
	({ outline }: { outline: Outline }): void => {
		const path: Path = applyViewForShape.default(outline)
		createPath({ path })

		clipPath()
	}

export default setClip
