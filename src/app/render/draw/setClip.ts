import { applyViewForShape, Outline } from '../../../pattern'
import buildPath from './buildPath'
import clipPath from './clipPath'
import { Path } from './types'

const setClip: (_: { outline: Outline }) => void =
	({ outline }: { outline: Outline }): void => {
		const path: Path = applyViewForShape.default(outline)
		buildPath({ path })

		clipPath()
	}

export default setClip
