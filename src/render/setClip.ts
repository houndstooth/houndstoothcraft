import { Outline } from '../space'
import { applyViewForShape } from '../view'
import { buildPath } from './buildPath'
import { clipPath } from './clipPath'
import { Path } from './types'

const setClip: (_: { outline: Outline }) => void =
	({ outline }: { outline: Outline }): void => {
		const path: Path = applyViewForShape(outline)
		buildPath({ path })

		clipPath()
	}

export { setClip }
