const scaleElement = ({ element, dimensions }: { element: HTMLElement, dimensions: number[] }): void => {
	element.style.width = inPx(dimensions[ 0 ])
	element.style.height = inPx(dimensions[ 1 ])
}

const inPx = (pixelCount: number): string => `${pixelCount}px`

export default scaleElement
