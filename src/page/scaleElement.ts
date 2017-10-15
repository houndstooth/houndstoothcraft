import { Dimensions, PageElement } from './types'

const scaleElement: { ({}: { element: PageElement, dimensions: Dimensions }): void } = ({ element, dimensions }) => {
	element.style.width = inPx(dimensions[ 0 ])
	element.style.height = inPx(dimensions[ 1 ])
}

const inPx = (pixelCount: number): string => `${pixelCount}px`

export default scaleElement
