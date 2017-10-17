import { Dimension, PageElement } from './types'

const scaleElement: { ({}: { dimensions: Dimension[], element: PageElement }): void } = ({ dimensions, element }) => {
	element.style.width = inPx(dimensions[ 0 ])
	element.style.height = inPx(dimensions[ 1 ])
}

const inPx = (pixelCount: Dimension): string => `${pixelCount}px`

export default scaleElement
