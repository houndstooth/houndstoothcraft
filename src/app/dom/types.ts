// tslint:disable:no-any

import { ObjectOf } from '../../utilities'

enum _DimensionsBrand {}
type Dimensions = _DimensionsBrand & Px[]

interface DomState {
	canvasContainer: HTMLElement,
	descriptionsContainer: HTMLElement,
	effectToggles: ObjectOf<HTMLInputElement>,
	effectTogglesContainer: HTMLElement,
	frameInput: HTMLInputElement,
	houndstoothControls: HTMLElement,
	layersProgressBar: HTMLElement,
	mixedDownCanvas: HTMLCanvasElement,
	pauseButton: HTMLButtonElement,
	playButton: HTMLButtonElement,
	progressBar: HTMLElement,
	progressMessage: HTMLElement,
	rewindButton: HTMLButtonElement,
	snapshotButton: HTMLButtonElement,
}

interface Px extends Number {
	_PxBrand: any,
}

export {
	Dimensions,
	DomState,
	Px,
}
