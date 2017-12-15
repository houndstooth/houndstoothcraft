// tslint:disable:no-any

import { ObjectOf } from '../../utilities'
import { PatternMapFunctionParams, SettingPath } from '../settings'

interface AppendOverrideNodeParams {
	options: OverrideOptions,
	overrideNode: HTMLElement,
	settingPath: SettingPath
}

interface CreateOverrideParams extends PatternMapFunctionParams {
	options: OverrideOptions,
}

enum _DimensionsBrand {}
type Dimensions = _DimensionsBrand & Px[]

interface DomState {
	canvasContainer: HTMLElement,
	descriptionsContainer: HTMLElement,
	effectToggles: ObjectOf<HTMLInputElement>,
	effectTogglesContainer: HTMLElement,
	frameInput: HTMLInputElement,
	layersProgressBar: HTMLElement,
	mixedDownCanvas: HTMLCanvasElement,
	overridesContainer: HTMLElement,
	pauseButton: HTMLButtonElement,
	playButton: HTMLButtonElement,
	progressBar: HTMLElement,
	progressMessage: HTMLElement,
	rewindButton: HTMLButtonElement,
	snapshotButton: HTMLButtonElement,
}

interface OverrideOptions {
	grandparents: HTMLElement[],
	parent: HTMLElement,
	patternName: string,
}

interface Px extends Number {
	_PxBrand: any,
}

export {
	AppendOverrideNodeParams,
	CreateOverrideParams,
	Dimensions,
	DomState,
	OverrideOptions,
	Px,
}
