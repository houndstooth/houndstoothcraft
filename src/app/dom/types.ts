// tslint:disable:no-any

enum _DimensionsBrand {}
type Dimensions = _DimensionsBrand & Px[]

interface Px extends Number {
	_PxBrand: any,
}

interface DomState {
	canvasContainer: HTMLElement,
	descriptionsContainer: HTMLElement,
	effectToggles: { [_: string ]: HTMLInputElement },
	frameInput: HTMLInputElement,
	layersProgressBar: HTMLElement,
	pauseButton: HTMLButtonElement,
	playButton: HTMLButtonElement,
	progressBar: HTMLElement,
	progressMessage: HTMLElement,
	rewindButton: HTMLButtonElement,
	snapshotButton: HTMLButtonElement,
}

export {
	Dimensions,
	DomState,
	Px,
}
