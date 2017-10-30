import { Outline } from '../space'
import { applyView } from '../view'
import { buildPath } from './buildPath'
import { clipPath } from './clipPath'
import { Path } from './types'

const setClip: (_: { outline: Outline }) => void =
	({ outline }: { outline: Outline }): void => {
		const path: Path = applyView(outline)
		buildPath({ path })

		clipPath()
	}

export { setClip }
